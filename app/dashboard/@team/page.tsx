/**
 * Team Slot Page
 * 
 * This page is rendered in the @team parallel slot.
 * It displays team member information.
 */
export default function TeamPage() {
  const teamMembers = [
    { id: 1, name: "Sarah Johnson", role: "Product Manager", status: "online" },
    { id: 2, name: "Michael Chen", role: "Senior Developer", status: "online" },
    { id: 3, name: "Emily Davis", role: "UX Designer", status: "away" },
    { id: 4, name: "James Wilson", role: "DevOps Engineer", status: "offline" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Team Members
        </h2>
        <span className="text-sm text-gray-500">@team slot</span>
      </div>
      
      <div className="space-y-3">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-gray-800">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  member.status === "online"
                    ? "bg-green-500"
                    : member.status === "away"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                }`}
              />
              <span className="text-xs text-gray-500 capitalize">
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded">
        This content is from the <code className="bg-gray-200 px-1 rounded">@team</code> parallel slot.
        It renders independently alongside other slots.
      </p>
    </div>
  );
}
