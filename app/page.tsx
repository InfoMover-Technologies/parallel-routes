import Link from "next/link";

/**
 * Home Page - Parallel Routes PoC
 * 
 * This page serves as the navigation hub for all parallel routes examples.
 */
export default function Home() {
  const examples = [
    {
      title: "Multi-Level Enterprise Dashboard",
      description: "Complete role-based dashboard with hierarchical navigation and business intelligence",
      href: "/app",
      features: [
        "Collapsible sidebar with business/domain/project/team hierarchy",
        "Role-based access control (CEO, PM, Developer, etc.)",
        "Real-time metrics and KPIs",
        "Comprehensive mock data for realistic testing",
      ],
      color: "from-indigo-500 to-purple-500",
      icon: "🏢",
    },
    {
      title: "Dashboard with Parallel Slots",
      description: "Two parallel slots (@team and @analytics) rendering simultaneously with tab navigation",
      href: "/dashboard",
      features: [
        "Basic parallel routes with @team and @analytics slots",
        "Tab groups within @analytics slot",
        "Independent navigation per slot",
        "Default.tsx fallbacks for unmatched routes",
      ],
      color: "from-blue-500 to-cyan-500",
      icon: "📊",
    },
    {
      title: "Admin Area - Conditional Rendering",
      description: "Role-based dashboard that conditionally renders @user or @admin slot",
      href: "/admin",
      features: [
        "Conditional slot rendering based on user role",
        "Different dashboards for user vs admin",
        "Simulated role switching on refresh",
        "Real-world use case example",
      ],
      color: "from-purple-500 to-pink-500",
      icon: "🔐",
    },
    {
      title: "Photo Gallery - Modal with Intercepting Routes",
      description: "Photo gallery with modal overlay using intercepting routes for seamless UX",
      href: "/gallery",
      features: [
        "Modal pattern with @modal slot",
        "Intercepting routes with (.) convention",
        "Shareable URLs that work in both contexts",
        "Browser back/forward navigation support",
      ],
      color: "from-green-500 to-emerald-500",
      icon: "📷",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="relative">
        <div className="max-w-7xl mx-auto px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Next.js Parallel Routes
            </h1>
            <p className="text-xl text-purple-200 mb-2">
              Proof of Concept Implementation
            </p>
            <p className="text-purple-300 max-w-2xl mx-auto">
              Explore comprehensive examples demonstrating parallel routes, intercepting routes,
              conditional rendering, and tab groups in Next.js App Router.
            </p>
          </div>

          {/* Examples Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {examples.map((example, index) => (
              <Link
                key={index}
                href={example.href}
                className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:scale-[1.02] transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${example.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                
                <div className="relative">
                  <div className="text-5xl mb-4">{example.icon}</div>
                  
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {example.title}
                  </h2>
                  
                  <p className="text-purple-200 text-sm mb-4">
                    {example.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {example.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span className="text-purple-100">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-purple-300 group-hover:text-white transition-colors font-medium">
                    <span>Explore Example</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Key Concepts */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">
              📚 Key Concepts Demonstrated
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-200 mb-3">
                  Parallel Routes
                </h3>
                <ul className="space-y-2 text-sm text-purple-100">
                  <li>• Named slots with @folder convention</li>
                  <li>• Simultaneous rendering of multiple pages</li>
                  <li>• Independent navigation and state</li>
                  <li>• Default.tsx fallbacks for unmatched routes</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-200 mb-3">
                  Intercepting Routes
                </h3>
                <ul className="space-y-2 text-sm text-purple-100">
                  <li>• (.) convention for same-level interception</li>
                  <li>• Modal patterns with shareable URLs</li>
                  <li>• Soft vs hard navigation handling</li>
                  <li>• Catch-all routes for cleanup</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-200 mb-3">
                  Tab Groups
                </h3>
                <ul className="space-y-2 text-sm text-purple-100">
                  <li>• Layouts within parallel slots</li>
                  <li>• Independent sub-navigation</li>
                  <li>• State preservation across tabs</li>
                  <li>• Client-side tab switching</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-purple-200 mb-3">
                  Conditional Rendering
                </h3>
                <ul className="space-y-2 text-sm text-purple-100">
                  <li>• Role-based UI rendering</li>
                  <li>• Multiple slots for different contexts</li>
                  <li>• Dynamic layout composition</li>
                  <li>• Flexible user experiences</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-purple-300 text-sm">
            <p>
              Built with Next.js 14+ App Router • TypeScript • Tailwind CSS • Shadcn/ui
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
