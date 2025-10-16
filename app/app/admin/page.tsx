/**
 * Admin Main Page
 * 
 * This is the main content area. The layout will conditionally render
 * either @user or @admin slot below based on the user's role.
 */
export default function AdminPage() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Role-Based Dashboard
      </h2>
      <div className="space-y-3 text-gray-600">
        <p>
          This page demonstrates <strong>conditional rendering</strong> with parallel routes.
        </p>
        <p>
          The layout conditionally renders either the <code className="bg-gray-100 px-2 py-1 rounded text-sm">@admin</code> or{" "}
          <code className="bg-gray-100 px-2 py-1 rounded text-sm">@user</code> slot based on the user's role.
        </p>
        <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded p-4">
          <p className="text-sm text-indigo-800">
            <strong>💡 Try refreshing the page</strong> - The role alternates every second, so you'll see
            different content based on whether the current second is even (admin) or odd (user).
          </p>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          <p className="font-medium text-gray-800">Use cases for conditional parallel routes:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Role-based dashboards (admin vs user views)</li>
            <li>Subscription tiers (free vs premium features)</li>
            <li>A/B testing different UI layouts</li>
            <li>Feature flags for gradual rollouts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
