/**
 * Dashboard Main Page
 * 
 * This is the main content (children prop) of the dashboard.
 * It's rendered alongside the @team and @analytics parallel slots.
 */
export default function DashboardPage() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Welcome to the Dashboard
      </h2>
      <div className="space-y-3 text-gray-600">
        <p>
          This is the main dashboard page content (the implicit <code className="bg-gray-100 px-2 py-1 rounded text-sm">children</code> slot).
        </p>
        <p>
          Below you can see two parallel slots rendering simultaneously:
        </p>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li><strong>@team slot</strong> - Shows team members</li>
          <li><strong>@analytics slot</strong> - Shows analytics with navigable tabs</li>
        </ul>
        <p className="mt-4 text-sm bg-blue-50 border border-blue-200 rounded p-3">
          <strong>💡 Key Concept:</strong> Parallel routes allow multiple pages to be rendered 
          in the same layout simultaneously. Each slot can have its own loading states, error 
          boundaries, and independent navigation.
        </p>
      </div>
    </div>
  );
}
