import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  user: ReactNode;
  admin: ReactNode;
}

/**
 * Admin Layout with Conditional Rendering
 * 
 * This layout demonstrates conditional rendering using parallel routes.
 * Based on a simulated user role, it renders either the @user or @admin slot.
 * 
 * In a real application, you would check actual authentication/authorization.
 */
export default function AdminLayout({
  children,
  user,
  admin,
}: AdminLayoutProps) {
  // Simulated role check - in production, this would come from your auth system
  // For demo purposes, we'll randomly select a role
  const role = getSimulatedUserRole();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Area - Conditional Rendering Demo
          </h1>
          <p className="text-gray-600">
            This demonstrates conditional rendering based on user role
          </p>
          <div className="mt-3 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="text-sm font-medium text-gray-700">
              Current Role:
            </span>
            <span
              className={`text-sm font-bold px-3 py-1 rounded ${
                role === "admin"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {role.toUpperCase()}
            </span>
          </div>
        </header>

        {/* Main content */}
        <div className="mb-6">{children}</div>

        {/* Conditionally render slot based on role */}
        <div className="mt-6">
          {role === "admin" ? (
            <>
              <div className="mb-4 bg-purple-50 border border-purple-200 p-4 rounded-lg">
                <p className="text-sm text-purple-800">
                  <strong>🔐 Rendering @admin slot</strong> - User has admin privileges
                </p>
              </div>
              {admin}
            </>
          ) : (
            <>
              <div className="mb-4 bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>👤 Rendering @user slot</strong> - Standard user view
                </p>
              </div>
              {user}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Simulates user role for demo purposes
 * In production, this would come from your authentication system
 */
function getSimulatedUserRole(): "admin" | "user" {
  // Alternate between roles based on timestamp seconds
  // This makes it easy to test both views by refreshing
  const seconds = new Date().getSeconds();
  return seconds % 2 === 0 ? "admin" : "user";
}
