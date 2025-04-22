import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard,
  LineChart,
  Users,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import { useAnalytics } from '../../context/AnalyticsContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}


const platformIcons: Record<string, React.ReactNode> = {
  twitter: <Twitter className="h-5 w-5 mr-3" />,
  facebook: <Facebook className="h-5 w-5 mr-3" />,
  instagram: <Instagram className="h-5 w-5 mr-3" />,
  linkedin: <Linkedin className="h-5 w-5 mr-3" />
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { platforms, selectedPlatform, setSelectedPlatform } = useAnalytics();
  
  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };
  
  return (
    <>
      {}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      
      
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-xl transition-transform duration-300 ease-in-out transform
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:z-0 lg:shadow-none lg:translate-x-0
        `}
      >
        <div className="h-full flex flex-col">
          
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white p-1 rounded mr-2">
                <LineChart className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold">SocialMetrics</h1>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                  onClick={onClose}
                >
                  <LayoutDashboard className="h-5 w-5 mr-3" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/analytics"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                  onClick={onClose}
                >
                  <LineChart className="h-5 w-5 mr-3" />
                  <span>Analytics</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/audience"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                  onClick={onClose}
                >
                  <Users className="h-5 w-5 mr-3" />
                  <span>Audience</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/reports"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                  onClick={onClose}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  <span>Reports</span>
                </Link>
              </li>
            </ul>
            
            
            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Platforms
              </h3>
              <ul className="mt-2 space-y-1">
                {platforms.map((platform) => (
                  <li key={platform.id}>
                    <button
                      className={`w-full flex items-center px-2 py-2 text-sm rounded-md ${
                        selectedPlatform === platform.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                      }`}
                      onClick={() => handlePlatformSelect(platform.id)}
                    >
                      {platformIcons[platform.id]}
                      <span>{platform.name}</span>
                      {!platform.connected && (
                        <span className="ml-auto text-xs text-gray-500 px-1.5 py-0.5 bg-gray-100 rounded">
                          Disconnected
                        </span>
                      )}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    className="w-full flex items-center px-2 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    <span className="ml-8">+ Add Platform</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
          
          
          <div className="border-t p-4">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/settings"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                  onClick={onClose}
                >
                  <Settings className="h-5 w-5 mr-3" />
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                  onClick={onClose}
                >
                  <HelpCircle className="h-5 w-5 mr-3" />
                  <span>Help & Support</span>
                </Link>
              </li>
              <li>
                <button
                  className="w-full flex items-center px-2 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Log Out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;