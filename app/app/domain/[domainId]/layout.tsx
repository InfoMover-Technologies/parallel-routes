"use client";

import { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { use } from "react";
import { usePathname } from "next/navigation";

interface DomainLayoutProps {
  children: ReactNode;
  params: Promise<{ domainId: string }>;
}

/**
 * Domain Layout with Tab Navigation
 * 
 * Provides tab navigation for domain views:
 * - Overview: Default view with role-specific metrics
 * - Commercials: Financial and commercial data
 */
export default function DomainLayout({ children, params }: DomainLayoutProps) {
  const { domainId } = use(params);
  const pathname = usePathname();
  
  // Determine active tab from pathname
  const activeTab = pathname.includes('/commercials') ? 'commercials' : 'overview';

  return (
    <div className="p-6 space-y-6">
      {/* Tab Navigation */}
      <Tabs value={activeTab} className="w-full">
        <TabsList>
          <Link href={`/app/domain/${domainId}/overview`}>
            <TabsTrigger value="overview">
              Overview
            </TabsTrigger>
          </Link>
          <Link href={`/app/domain/${domainId}/commercials`}>
            <TabsTrigger value="commercials">
              Commercials
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>

      {/* Tab Content */}
      <div>{children}</div>
    </div>
  );
}
