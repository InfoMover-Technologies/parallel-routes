import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  team: ReactNode;
  analytics: ReactNode;
  projects: ReactNode;


}

/**
 * Dashboard Layout with Parallel Routes
 * 
 * This layout demonstrates basic parallel routes by accepting three props:
 * - children: The main page content (implicit @children slot)
 * - team: Content from the @team slot
 * - analytics: Content from the @analytics slot
 * 
 * All three are rendered simultaneously on the same page.
 */
export default function DashboardLayout({
  children,
  projects,
  team,
  analytics,

}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard - Parallel Routes Demo
          </h1>
          <p className="text-gray-600">
            This page demonstrates parallel routes with @team and @analytics slots
          </p>
        </header>

        {/* Main content (children) */}
        <div className="mb-6">
          {children}
        </div>

        <div className="mb-6">
          {projects}
        </div>


        {/* Parallel slots rendered side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* @team slot */}
          <div>{team}</div>

          {/* @analytics slot */}
          <div>{analytics}</div>
        </div>
      </div>
    </div>
  );
}
