/**
 * Default fallback for the main children slot
 * 
 * This is rendered when Next.js cannot determine the active state
 * for the children slot during a hard navigation (page refresh).
 * 
 * Without this file, navigating to /dashboard/page-views or /dashboard/visitors
 * and refreshing would cause a 404 error for the children slot.
 */
export default function DefaultDashboard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Welcome to the Dashboard
      </h2>
      <div className="space-y-3 text-gray-600">
        <p>
          This is the <strong>default fallback</strong> for the children slot.
        </p>
        <p className="text-sm bg-yellow-50 border border-yellow-200 rounded p-3">
          <strong>⚠️ Note:</strong> You're seeing this because you refreshed on a sub-route. 
          This default.tsx prevents a 404 error when Next.js can't determine the active 
          state of the main content during a hard navigation.
        </p>
      </div>
    </div>
  );
}
