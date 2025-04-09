import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: string;
  iconBgColor: string;
  iconColor: string;
  title: string;
  value: string;
  changeValue?: number;
  changeText?: string;
  loading?: boolean;
}

export default function StatCard({
  icon,
  iconBgColor,
  iconColor,
  title,
  value,
  changeValue,
  changeText = "vs last month",
  loading = false,
}: StatCardProps) {
  const isPositiveChange = changeValue && changeValue > 0;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
      <div className="flex items-center">
        <div className={cn("rounded-full p-3", iconBgColor)}>
          <i className={cn("material-icons", iconColor)}>{icon}</i>
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-slate-500">{title}</h3>
          {loading ? (
            <div className="h-8 w-24 bg-slate-200 animate-pulse rounded mt-1"></div>
          ) : (
            <p className="text-2xl font-bold text-slate-900">{value}</p>
          )}
        </div>
      </div>
      {changeValue !== undefined && (
        <div className="mt-4 flex items-center">
          <span 
            className={cn(
              "text-sm font-medium flex items-center",
              isPositiveChange ? "text-green-500" : "text-red-500"
            )}
          >
            <i className="material-icons text-xs mr-1">
              {isPositiveChange ? "arrow_upward" : "arrow_downward"}
            </i>
            {Math.abs(changeValue).toFixed(1)}%
          </span>
          <span className="text-slate-500 text-sm ml-2">{changeText}</span>
        </div>
      )}
    </div>
  );
}
