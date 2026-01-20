export default function StatCard({ title, value, icon, color = 'blue', trend }) {
  const colorClasses = {
    blue: 'bg-info/10 text-info',
    green: 'bg-success/10 text-success',
    yellow: 'bg-warning/10 text-warning',
    red: 'bg-error/10 text-error',
    purple: 'bg-secondary/10 text-secondary',
    indigo: 'bg-primary/10 text-primary',
  };

  return (
    <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-['Satoshi'] text-sm text-base-content/70 mb-1">{title}</p>
          <h3 className="font-['Satoshi'] text-3xl font-bold text-base-content mb-2">
            {value}
          </h3>
          {trend && (
            <p className={`font-['Satoshi'] text-xs ${trend.isPositive ? 'text-success' : 'text-error'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value} from last month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}