"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface AnalyticsLayoutProps {
  children: ReactNode;
}

/**
 * Analytics Slot Layout with Tab Groups
 * 
 * This layout demonstrates tab groups within a parallel slot.
 * Users can navigate between /dashboard/page-views and /dashboard/visitors
 * without affecting other parallel slots (@team and children).
 */
export default function AnalyticsLayout({ children }: AnalyticsLayoutProps) {
  const pathname = usePathname();

  const tabs = [
    { name: "Page Views", href: "/dashboard/page-views" },
    { name: "Visitors", href: "/dashboard/visitors" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Analytics</h2>
          <span className="text-sm text-gray-500">@analytics slot</span>
        </div>
        
        {/* Tab Navigation */}
        <nav className="flex gap-1 px-6">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-b-2 border-blue-700"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">{children}</div>

      <p className="px-6 pb-4 text-xs text-gray-500 bg-gray-50 mx-6 mb-6 p-3 rounded">
        This is a <strong>tab group</strong> within the{" "}
        <code className="bg-gray-200 px-1 rounded">@analytics</code> slot.
        Navigation between tabs doesn't affect the @team slot or main content.
      </p>
    </div>
  );
}
