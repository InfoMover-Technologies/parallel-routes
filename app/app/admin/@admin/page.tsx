/**
 * Admin Slot Page
 * 
 * This page is displayed when the user has administrator privileges.
 * Rendered in the @admin parallel slot.
 */
export default function AdminDashboard() {
  const adminFeatures = [
    { name: "View Reports", icon: "📊", available: true },
    { name: "Export Data", icon: "📥", available: true },
    { name: "Create Projects", icon: "📁", available: true },
    { name: "Team Collaboration", icon: "👥", available: true },
    { name: "User Management", icon: "⚙️", available: true },
    { name: "System Settings", icon: "🔧", available: true },
    { name: "Security Controls", icon: "🔐", available: true },
    { name: "Analytics Dashboard", icon: "📈", available: true },
  ];

  const systemStats = [
    { label: "Total Users", value: "1,247", icon: "👥", color: "purple" },
    { label: "System Uptime", value: "99.9%", icon: "⚡", color: "green" },
    { label: "Active Sessions", value: "342", icon: "🔌", color: "blue" },
    { label: "API Requests", value: "28.5K", icon: "🔄", color: "orange" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Administrator Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Full system access and control</p>
        </div>
        <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg text-sm font-semibold">
          @admin slot
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {systemStats.map((stat, index) => {
          const colorClasses = {
            purple: "bg-purple-50 text-purple-700",
            green: "bg-green-50 text-green-700",
            blue: "bg-blue-50 text-blue-700",
            orange: "bg-orange-50 text-orange-700",
          };
          return (
            <div key={index} className={`${colorClasses[stat.color as keyof typeof colorClasses]} p-4 rounded-lg`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{stat.icon}</span>
                <p className="text-xs font-medium">{stat.label}</p>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Administrator Features</h3>
        <div className="grid grid-cols-2 gap-2">
          {adminFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors"
            >
              <span className="text-xl">{feature.icon}</span>
              <span className="font-medium text-gray-800">{feature.name}</span>
              <span className="ml-auto text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">
                ACTIVE
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p className="text-sm text-purple-800">
          <strong>🔐 Administrator Access Level:</strong> You have full system privileges with 
          access to all features including user management, system settings, and security controls.
        </p>
      </div>

      <div className="mt-4 flex gap-3">
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
          Manage Users
        </button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
          System Settings
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
          Security Logs
        </button>
      </div>
    </div>
  );
}
