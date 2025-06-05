import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, PlusSquare, Heart, Compass } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Define navigation items
const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/library', label: 'Your Library', icon: Library },
];

const playlistItems = [
    // Example, these would likely be dynamic
  { href: '/playlist/liked', label: 'Liked Songs', icon: Heart },
  { href: '/playlist/create', label: 'Create Playlist', icon: PlusSquare },
  { href: '/discover', label: 'Discover Weekly', icon: Compass, isEmphasized: true }, // Example for "Doraemon's Weekly Mix"
];

const Sidebar: React.FC = () => {
  console.log("Rendering Sidebar");
  const location = useLocation();

  return (
    <aside className="w-60 bg-neutral-900 text-neutral-300 p-4 flex flex-col space-y-6 h-screen fixed top-0 left-0">
      {/* Placeholder for App Logo/Name */}
      <div className="text-2xl font-bold text-white mb-6 px-2">
        MusicApp
        {/* Consider Doraemon-themed logo here */}
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2.5 rounded-md font-medium text-sm hover:bg-neutral-700 hover:text-white transition-colors",
              location.pathname === item.href ? "bg-neutral-700 text-white" : "text-neutral-400"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="space-y-1 pt-4 border-t border-neutral-700">
         {playlistItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2.5 rounded-md font-medium text-sm hover:bg-neutral-700 hover:text-white transition-colors",
              location.pathname === item.href ? "bg-neutral-700 text-white" : "text-neutral-400",
              item.isEmphasized ? "text-blue-400 hover:text-blue-300" : "" // Doraemon blue for emphasis
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Potentially add user profile / settings at the bottom */}
      <div className="mt-auto">
        {/* Example: Install App button or User Profile Link */}
      </div>
    </aside>
  );
}

export default Sidebar;