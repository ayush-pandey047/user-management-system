import { Outlet, NavLink } from 'react-router-dom';
import { Users, LayoutDashboard, UserCog } from 'lucide-react';

const MainLayout = () => {
  const navItem = (to: string, label: string, Icon: any) => (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          isActive
            ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/30'
            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
        }`
      }
    >
      <Icon size={18} strokeWidth={2.2} />
      {label}
    </NavLink>
  );

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col p-4 gap-1">
        <div className="flex items-center gap-2.5 px-3 py-4 mb-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/30">
            <UserCog size={19} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight">User Management</h1>
            <p className="text-xs text-muted-foreground">Admin Console</p>
          </div>
        </div>
        {navItem('/', 'Dashboard', LayoutDashboard)}
        {navItem('/users', 'Users', Users)}
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-auto animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;