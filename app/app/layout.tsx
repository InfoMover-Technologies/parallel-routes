import { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { AppHeader } from "@/components/dashboard/AppHeader";
import { DashboardProvider } from "@/app/providers/DashboardProvider";

interface AppLayoutProps {
  children: ReactNode;
}

/**
 * Main App Layout
 * 
 * Provides the core app structure with:
 * - Dashboard context provider
 * - Collapsible sidebar navigation
 * - Top header with user menu
 * - Content area for child routes
 */
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <DashboardProvider>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </DashboardProvider>
  );
}
