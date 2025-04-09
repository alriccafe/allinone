import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartData {
  name: string;
  openRate: number;
  clickRate: number;
}

interface CampaignPerformanceChartProps {
  data: ChartData[];
  loading?: boolean;
}

export function CampaignPerformanceChart({ data, loading = false }: CampaignPerformanceChartProps) {
  if (loading) {
    return (
      <div className="chart-container flex-1 animate-pulse bg-slate-100 rounded-md"></div>
    );
  }
  
  return (
    <div className="chart-container flex-1">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `${value}%`} />
          <Tooltip formatter={(value) => [`${value}%`, '']} />
          <Bar dataKey="openRate" fill="hsl(238 94% 53%)" name="Open Rate" />
          <Bar dataKey="clickRate" fill="hsl(199 89% 48%)" name="Click Rate" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface AudienceGrowthChartProps {
  data: Array<{ date: string; subscribers: number }>;
  loading?: boolean;
}

export function AudienceGrowthChart({ data, loading = false }: AudienceGrowthChartProps) {
  if (loading) {
    return (
      <div className="chart-container flex-1 animate-pulse bg-slate-100 rounded-md"></div>
    );
  }
  
  return (
    <div className="chart-container flex-1">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="subscribers" fill="rgba(129, 140, 248, 0.2)" stroke="hsl(238 94% 53%)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
