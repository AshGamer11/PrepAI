import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, BookOpen, Layers, PlusCircle, Settings, LogOut, Zap } from 'lucide-react';
import clsx from 'clsx';

function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Interview', path: '/interview', icon: PlusCircle },
    { name: 'Feedback Report', path: '/feedback', icon: History },
    { name: 'Practice Hub', path: '/practice', icon: BookOpen },
    { name: 'Resources', path: '/resources', icon: Layers },
  ];

  return (
    <aside className="w-64 bg-[#0A0A0E] border-r border-surfaceBorder flex flex-col justify-between h-full py-6">
      <div>
        {/* Brand / Profile */}
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-lg text-white">
            JD
          </div>
          <div>
            <h2 className="text-white font-semibold leading-tight">John Doe</h2>
            <span className="text-xs text-textMuted">john@student.edu</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-4">
          <div className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-2 px-2">Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-textMuted hover:text-white hover:bg-surface"
                )}
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="px-4 flex flex-col gap-2">
        <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-medium text-sm hover:opacity-90 transition-opacity mb-4">
          <Zap size={16} /> Upgrade Plan
        </button>

        <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-textMuted hover:text-white transition-colors">
          <Settings size={18} /> Settings
        </button>
        <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-textMuted hover:text-danger transition-colors">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
