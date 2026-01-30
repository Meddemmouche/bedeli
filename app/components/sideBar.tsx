"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Lock, Bell, Palette, Globe, HelpCircle } from 'lucide-react';

const settingsItems = [
  {
    name: 'Profile',
    href: '/settings/profile',
    icon: User,
    description: 'Manage your personal information'
  },
  {
    name: 'Security',
    href: '/settings/security',
    icon: Lock,
    description: 'Password and authentication'
  },
  {
    name: 'Notifications',
    href: '/settings/notifications',
    icon: Bell,
    description: 'Email and push preferences'
  },
  {
    name: 'Appearance',
    href: '/settings/appearance',
    icon: Palette,
    description: 'Theme and display settings'
  },
  {
    name: 'Language',
    href: '/settings/language',
    icon: Globe,
    description: 'Language and region'
  },
  {
    name: 'Help',
    href: '/settings/help',
    icon: HelpCircle,
    description: 'Support and FAQs'
  },
];

export default function SideBar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
      <nav className="space-y-1">
        {settingsItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-start gap-3 px-4 py-3 rounded-lg transition-colors
                ${isActive 
                  ? 'bg-red-50 text-red-600 border-l-4 border-red-600' 
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isActive ? 'text-red-600' : 'text-gray-500'}`} />
              <div className="flex-1 min-w-0">
                <p className={`font-medium ${isActive ? 'text-red-600' : 'text-gray-900'}`}>
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}