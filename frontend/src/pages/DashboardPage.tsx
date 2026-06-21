import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserStats } from '@/hooks/useUsers';
import { Users, UserCheck, UserX } from 'lucide-react';

const DashboardPage = () => {
  const { data: stats, isLoading } = useUserStats();

  const cards = [
    { label: 'Total Users', value: stats?.total, icon: Users, accent: 'bg-indigo-50 text-indigo-600', bar: 'bg-indigo-500' },
    { label: 'Active Users', value: stats?.active, icon: UserCheck, accent: 'bg-emerald-50 text-emerald-600', bar: 'bg-emerald-500' },
    { label: 'Deleted Users', value: stats?.deleted, icon: UserX, accent: 'bg-rose-50 text-rose-600', bar: 'bg-rose-500' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-1">Dashboard</h2>
      <p className="text-muted-foreground mb-8">Overview of your user base</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {cards.map((c) => (
          <Card key={c.label} className="relative overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className={`absolute top-0 left-0 w-full h-1 ${c.bar}`} />
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
              <div className={`p-2.5 rounded-xl ${c.accent}`}>
                <c.icon size={18} strokeWidth={2.3} />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-9 w-20" />
              ) : (
                <div className="text-4xl font-extrabold tracking-tight">{c.value ?? 0}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;