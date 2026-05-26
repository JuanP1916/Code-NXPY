import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { Home, Users, ShoppingCart, BarChart, Menu, LogOut } from 'lucide-react';
import { useState } from 'react';

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Panel Principal', icon: Home },
    { path: '/clients', label: 'Clientes', icon: Users },
    { path: '/sales', label: 'Ventas', icon: ShoppingCart },
    { path: '/reports', label: 'Reportes', icon: BarChart },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:block w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-xl">
        {/* Logo/Header */}
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="font-bold text-xl text-white">N</span>
            </div>
            <div>
              <div className="font-bold text-lg">NEXUMPYME</div>
              <div className="text-xs text-blue-200">Gestión empresarial</div>
            </div>
          </div>
        </div>
        
        {/* Nav */}
        <nav className="p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 mb-2 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-green-500 text-white shadow-lg' 
                    : 'text-blue-100 hover:bg-blue-700'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 w-64 p-4 border-t border-blue-700">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full rounded-lg text-blue-100 hover:bg-blue-700 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-20">
        <button
          className="p-3 bg-blue-900 text-white rounded-lg shadow-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gradient-to-b from-blue-900 to-blue-800 z-10 p-4 pt-20">
          <nav>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-4 mb-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-green-500 text-white' 
                      : 'text-blue-100 hover:bg-blue-700'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-4 w-full rounded-lg text-blue-100 hover:bg-blue-700 transition-all mt-4 border-t border-blue-700"
          >
            <LogOut size={20} />
            <span className="font-medium">Cerrar sesión</span>
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}