import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeCheck, Clock, X, Send, Eye, MousePointer, Calendar, Edit, Trash2 } from "lucide-react";
import { Campaign, CampaignStats } from "@shared/schema";

const statusIcons: Record<string, React.ReactNode> = {
  draft: <Edit size={16} className="mr-1.5 text-slate-500" />,
  scheduled: <Calendar size={16} className="mr-1.5 text-amber-500" />,
  sent: <BadgeCheck size={16} className="mr-1.5 text-green-500" />,
  active: <Clock size={16} className="mr-1.5 text-blue-500" />
};

interface CampaignCardProps {
  campaign: Campaign;
  stats?: CampaignStats;
}

function CampaignCard({ campaign, stats }: CampaignCardProps) {
  const formatDateTime = (date: Date | null | string) => {
    if (!date) return 'Not scheduled';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'scheduled': return 'Scheduled';
      case 'sent': return 'Sent';
      case 'active': return 'Active';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-slate-100 text-slate-800';
      case 'scheduled': return 'bg-amber-100 text-amber-800';
      case 'sent': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };
  
  const openRate = stats ? ((stats.openCount / stats.sentCount) * 100).toFixed(1) : '-';
  const clickRate = stats ? ((stats.clickCount / stats.sentCount) * 100).toFixed(1) : '-';
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-slate-900">{campaign.name}</h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center ${getStatusColor(campaign.status)}`}>
            {statusIcons[campaign.status]}
            {getStatusLabel(campaign.status)}
          </span>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          {campaign.subject}
        </p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-slate-50 rounded">
            <div className="flex items-center justify-center text-primary-600 mb-1">
              <Send size={14} className="mr-1" />
            </div>
            <div className="text-sm font-medium">
              {stats?.sentCount || '0'}
            </div>
            <div className="text-xs text-slate-500">Sent</div>
          </div>
          
          <div className="text-center p-2 bg-slate-50 rounded">
            <div className="flex items-center justify-center text-primary-600 mb-1">
              <Eye size={14} className="mr-1" />
            </div>
            <div className="text-sm font-medium">
              {openRate}%
            </div>
            <div className="text-xs text-slate-500">Opens</div>
          </div>
          
          <div className="text-center p-2 bg-slate-50 rounded">
            <div className="flex items-center justify-center text-primary-600 mb-1">
              <MousePointer size={14} className="mr-1" />
            </div>
            <div className="text-sm font-medium">
              {clickRate}%
            </div>
            <div className="text-xs text-slate-500">Clicks</div>
          </div>
        </div>
        
        <div className="text-xs text-slate-500 mb-4">
          {campaign.status === 'scheduled' ? (
            <span>Scheduled for {formatDateTime(campaign.scheduledAt)}</span>
          ) : campaign.status === 'sent' ? (
            <span>Sent on {formatDateTime(campaign.sentAt)}</span>
          ) : campaign.status === 'active' ? (
            <span>Automation is active</span>
          ) : (
            <span>Last modified on {formatDateTime(campaign.createdAt)}</span>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Link href={`/campaigns/${campaign.id}`}>
            <a className="flex-1 py-1 px-3 text-xs font-medium bg-primary-600 text-white rounded hover:bg-primary-700 flex items-center justify-center">
              {campaign.status === 'draft' ? 'Edit' : 'View Report'}
            </a>
          </Link>
          <Link href={`/campaigns/${campaign.id}/duplicate`}>
            <a className="py-1 px-3 text-xs font-medium bg-white text-slate-700 border border-slate-300 rounded hover:bg-slate-50">
              Duplicate
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Campaigns() {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Parse filter from URL if any
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const filterParam = urlParams.get("filter");
  const [activeTab, setActiveTab] = useState(filterParam || "all");
  
  const { data: campaigns, isLoading: campaignsLoading } = useQuery({
    queryKey: ['/api/campaigns'],
  });
  
  const { data: allStats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/dashboard/summary'],
    enabled: !campaignsLoading && !!campaigns,
  });
  
  const isLoading = campaignsLoading || statsLoading;
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Update URL with filter
    if (value === "all") {
      setLocation("/campaigns");
    } else {
      setLocation(`/campaigns?filter=${value}`);
    }
  };
  
  const filteredCampaigns = campaigns?.filter((campaign: Campaign) => {
    switch (activeTab) {
      case "draft":
        return campaign.status === "draft";
      case "scheduled":
        return campaign.status === "scheduled";
      case "sent":
        return campaign.status === "sent";
      case "active":
        return campaign.status === "active";
      default:
        return true;
    }
  });
  
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <button 
          className="bg-primary-600 text-white p-3 rounded-full shadow-lg"
          onClick={toggleSidebar}
        >
          <i className="material-icons">menu</i>
        </button>
      </div>
      
      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        {/* Content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-6 md:px-6 lg:px-8">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Email Campaigns</h1>
                <p className="text-slate-500 mt-1">Create and manage your email campaigns</p>
              </div>
              <Link href="/campaigns/new">
                <Button>
                  <i className="material-icons text-sm mr-1">add</i>
                  Create Campaign
                </Button>
              </Link>
            </div>
            
            <Tabs 
              defaultValue={activeTab} 
              onValueChange={handleTabChange}
              className="mb-6"
            >
              <TabsList>
                <TabsTrigger value="all">All Campaigns</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-4">
                {isLoading ? (
                  // Loading skeleton
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(6).fill(0).map((_, idx) => (
                      <div key={idx} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden p-5">
                        <div className="flex justify-between items-start mb-3">
                          <Skeleton className="h-6 w-32" />
                          <Skeleton className="h-5 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-full mb-4" />
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {Array(3).fill(0).map((_, i) => (
                            <div key={i} className="text-center p-2 bg-slate-50 rounded">
                              <Skeleton className="h-4 w-4 mx-auto mb-1 rounded-full" />
                              <Skeleton className="h-4 w-8 mx-auto mb-1" />
                              <Skeleton className="h-3 w-12 mx-auto" />
                            </div>
                          ))}
                        </div>
                        <Skeleton className="h-3 w-40 mb-4" />
                        <div className="flex space-x-2">
                          <Skeleton className="flex-1 h-8 rounded" />
                          <Skeleton className="h-8 w-20 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredCampaigns?.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                      <X size={24} className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No campaigns found</h3>
                    <p className="text-slate-500 mb-6">
                      {activeTab === "all" 
                        ? "You haven't created any campaigns yet." 
                        : `You don't have any ${activeTab} campaigns.`}
                    </p>
                    <Link href="/campaigns/new">
                      <Button>Create your first campaign</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCampaigns?.map((campaign: Campaign) => (
                      <CampaignCard 
                        key={campaign.id} 
                        campaign={campaign}
                        stats={allStats?.campaignStats?.find((s: any) => s.campaignId === campaign.id)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
