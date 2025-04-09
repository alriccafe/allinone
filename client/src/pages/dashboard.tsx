import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import StatCard from "@/components/dashboard/stats-card";
import RecentCampaigns from "@/components/dashboard/recent-campaigns";
import QuickActions from "@/components/dashboard/quick-actions";
import { CampaignPerformanceChart, AudienceGrowthChart } from "@/components/dashboard/chart-container";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { data: summaryData, isLoading } = useQuery({
    queryKey: ['/api/dashboard/summary'],
  });
  
  const campaignPerformanceData = [
    { name: "Apr 10", openRate: 40, clickRate: 60 },
    { name: "Apr 17", openRate: 60, clickRate: 75 },
    { name: "Apr 24", openRate: 30, clickRate: 45 },
    { name: "May 1", openRate: 70, clickRate: 50 },
    { name: "May 8", openRate: 80, clickRate: 65 },
    { name: "May 15", openRate: 65, clickRate: 85 }
  ];
  
  const audienceGrowthData = [
    { date: "Jan", subscribers: 5200 },
    { date: "Feb", subscribers: 5800 },
    { date: "Mar", subscribers: 6400 },
    { date: "Apr", subscribers: 7100 },
    { date: "May", subscribers: 8623 }
  ];
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
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
            {/* Dashboard Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
              <p className="text-slate-500 mt-1">Welcome back. Here's what's happening with your campaigns.</p>
            </div>
            
            {/* Date Range Selector */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm border border-slate-200 shadow-sm">
                <span className="text-slate-500 mr-2">Last 30 days</span>
                <i className="material-icons text-slate-400 text-sm">arrow_drop_down</i>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50">
                  <i className="material-icons text-slate-400 mr-1 text-sm">file_download</i>
                  Export
                </button>
                <button className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700">
                  <i className="material-icons mr-1 text-sm">add</i>
                  Create Campaign
                </button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon="email"
                iconBgColor="bg-sky-100"
                iconColor="text-sky-600"
                title="Total Sent"
                value={isLoading ? "..." : `${summaryData?.totalSent || 0}`}
                changeValue={12.5}
                loading={isLoading}
              />
              
              <StatCard
                icon="visibility"
                iconBgColor="bg-primary-100"
                iconColor="text-primary-600"
                title="Open Rate"
                value={isLoading ? "..." : `${summaryData?.openRate || 0}%`}
                changeValue={3.2}
                loading={isLoading}
              />
              
              <StatCard
                icon="mouse"
                iconBgColor="bg-purple-100"
                iconColor="text-purple-600"
                title="Click Rate"
                value={isLoading ? "..." : `${summaryData?.clickRate || 0}%`}
                changeValue={-1.8}
                loading={isLoading}
              />
              
              <StatCard
                icon="people"
                iconBgColor="bg-amber-100"
                iconColor="text-amber-600"
                title="Subscribers"
                value={isLoading ? "..." : `${summaryData?.totalContacts || 0}`}
                changeValue={8.1}
                loading={isLoading}
              />
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Campaign Performance Chart */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 col-span-2 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-900">Campaign Performance</h2>
                  <div className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-600">
                    <span className="mr-1">Last 6 campaigns</span>
                    <i className="material-icons text-slate-400 text-xs">arrow_drop_down</i>
                  </div>
                </div>
                
                <CampaignPerformanceChart data={campaignPerformanceData} loading={isLoading} />
                
                <div className="flex justify-center mt-4 space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
                    <span className="text-sm text-slate-600">Open Rate</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-sky-500 rounded-full mr-2"></div>
                    <span className="text-sm text-slate-600">Click Rate</span>
                  </div>
                </div>
              </div>
              
              {/* Audience Growth */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-slate-900">Audience Growth</h2>
                  <button className="text-slate-400 hover:text-slate-500">
                    <i className="material-icons">more_vert</i>
                  </button>
                </div>
                
                <AudienceGrowthChart data={audienceGrowthData} loading={isLoading} />
                
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Total Growth</span>
                    <span className="text-sm font-semibold text-slate-900">+2,345 subscribers</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <div className="mt-3 text-sm text-green-600 flex items-center">
                    <i className="material-icons text-xs mr-1">trending_up</i>
                    <span>32% growth this month</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Campaigns & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <RecentCampaigns />
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
