import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Campaign, CampaignStats } from "@shared/schema";

interface CampaignRowProps {
  campaign: Campaign;
  stats?: CampaignStats;
}

function CampaignRow({ campaign, stats }: CampaignRowProps) {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };
  
  const getIconClass = (name: string) => {
    if (name.includes('Newsletter')) return 'bg-primary-100 text-primary-600';
    if (name.includes('Promotion')) return 'bg-purple-100 text-purple-600';
    if (name.includes('Update')) return 'bg-amber-100 text-amber-600';
    if (name.includes('Welcome')) return 'bg-sky-100 text-sky-600';
    return 'bg-slate-100 text-slate-600';
  };
  
  const getIconName = (name: string) => {
    if (name.includes('Newsletter')) return 'email';
    if (name.includes('Promotion')) return 'card_giftcard';
    if (name.includes('Update')) return 'insights';
    if (name.includes('Welcome')) return 'auto_awesome';
    return 'schedule';
  };
  
  const formatDate = (date: Date | string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className={`flex-shrink-0 h-8 w-8 rounded ${getIconClass(campaign.name)} flex items-center justify-center`}>
            <i className="material-icons text-sm">{getIconName(campaign.name)}</i>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-slate-900">{campaign.name}</div>
            <div className="text-sm text-slate-500">
              {campaign.totalRecipients ? `${campaign.totalRecipients} recipients` : campaign.status === 'active' ? 'Automated' : '-'}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(campaign.status)}`}>
          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
        {stats ? `${((stats.openCount / stats.sentCount) * 100).toFixed(1)}%` : '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
        {stats ? `${((stats.clickCount / stats.sentCount) * 100).toFixed(1)}%` : '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
        {campaign.status === 'active' ? 'Ongoing' : formatDate(campaign.sentAt || campaign.scheduledAt)}
      </td>
    </tr>
  );
}

export default function RecentCampaigns() {
  const { data: campaigns, isLoading: campaignsLoading } = useQuery({
    queryKey: ['/api/campaigns'],
  });
  
  // Fetch stats for each campaign
  const { data: allStats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/dashboard/summary'],
    enabled: !campaignsLoading && !!campaigns,
  });
  
  const isLoading = campaignsLoading || statsLoading;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden lg:col-span-2">
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">Recent Campaigns</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Campaign</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Open Rate</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Click Rate</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Sent</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {isLoading ? (
              // Loading skeletons
              Array(5).fill(0).map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Skeleton className="h-8 w-8 rounded" />
                      <div className="ml-4">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24 mt-1" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-12" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-12" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-24" />
                  </td>
                </tr>
              ))
            ) : (
              campaigns?.slice(0, 5).map((campaign: any) => (
                <CampaignRow 
                  key={campaign.id} 
                  campaign={campaign}
                  stats={allStats?.campaignStats?.find((s: any) => s.campaignId === campaign.id)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
        <Link href="/campaigns">
          <div className="text-sm text-primary-600 hover:text-primary-700 font-medium cursor-pointer">View all campaigns</div>
        </Link>
      </div>
    </div>
  );
}
