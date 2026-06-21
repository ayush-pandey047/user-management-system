import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserStats } from '@/hooks/useUsers';
import { Users, UserCheck, UserX } from 'lucide-react';

const DashboardPage = () => {
  const { data: stats, isLoading } = useUserStats();

  const cards = [
    { label: 'Total Users', value: stats?.total, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Active Users', value: stats?.active, icon: UserCheck, color: 'text-green-600 bg-green-50' },
    { label: 'Deleted Users', value: stats?.deleted, icon: UserX, color: 'text-red-600 bg-red-50' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">Dashboard</h2>
      <p className="text-muted-foreground mb-6">Overview of your user base</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
              <div className={`p-2 rounded-lg ${c.color}`}>
                <c.icon size={18} />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-3xl font-bold">{c.value ?? 0}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;