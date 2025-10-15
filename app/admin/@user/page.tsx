/**
 * User Slot Page
 * 
 * This page is displayed when the user has standard user privileges.
 * Rendered in the @user parallel slot.
 */
export default function UserDashboard() {
  const userFeatures = [
    { name: "View Reports", icon: "📊", available: true },
    { name: "Export Data", icon: "📥", available: true },
    { name: "Create Projects", icon: "📁", available: true },
    { name: "Team Collaboration", icon: "👥", available: true },
    { name: "User Management", icon: "⚙️", available: false },
    { name: "System Settings", icon: "🔧", available: false },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">User Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Standard user view with limited access</p>
        </div>
        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold">
          @user slot
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Active Projects</p>
          <p className="text-3xl font-bold text-blue-700">12</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Tasks Completed</p>
          <p className="text-3xl font-bold text-green-700">47</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Available Features</h3>
        <div className="space-y-2">
          {userFeatures.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${
                feature.available
                  ? "bg-green-50 border border-green-200"
                  : "bg-gray-50 border border-gray-200 opacity-60"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <span
                  className={`font-medium ${
                    feature.available ? "text-gray-800" : "text-gray-500"
                  }`}
                >
                  {feature.name}
                </span>
              </div>
              {feature.available ? (
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                  AVAILABLE
                </span>
              ) : (
                <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-2 py-1 rounded">
                  LOCKED
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>ℹ️ User Access Level:</strong> You have standard user privileges. 
          Some administrative features are restricted.
        </p>
      </div>
    </div>
  );
}
