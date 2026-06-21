import { Outlet, NavLink } from 'react-router-dom';
import { Users, LayoutDashboard } from 'lucide-react';

const MainLayout = () => {
  const navItem = (to: string, label: string, Icon: any) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'
        }`
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col p-4 gap-1">
        <div className="px-4 py-4 mb-2">
          <h1 className="text-lg font-bold">User Management</h1>
        </div>
        {navItem('/', 'Dashboard', LayoutDashboard)}
        {navItem('/users', 'Users', Users)}
      </aside>
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;