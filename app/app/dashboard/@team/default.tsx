/**
 * Default fallback for the @team slot
 * 
 * This is rendered when navigating to a sub-route (like /dashboard/page-views)
 * and refreshing the page. It ensures the @team slot always has content to display.
 */
export default function DefaultTeam() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Team Members
        </h2>
        <span className="text-sm text-gray-500">@team slot (default)</span>
      </div>
      
      <p className="text-gray-600 text-sm bg-yellow-50 border border-yellow-200 rounded p-3">
        This is the <strong>default fallback</strong> for the @team slot, displayed 
        during hard navigation when the active state cannot be determined.
      </p>
    </div>
  );
}
