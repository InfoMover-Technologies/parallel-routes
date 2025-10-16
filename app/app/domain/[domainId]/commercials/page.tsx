"use client";

import { use } from "react";
import { useDashboard } from "@/app/providers/DashboardProvider";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  PiggyBank,
  Receipt,
  CreditCard,
  Lock,
  AlertCircle,
} from "lucide-react";
import { getDomainById } from "@/lib/data/mock-data";
import { getAccessRights } from "@/lib/types/dashboard";

interface CommercialsPageProps {
  params: Promise<{ domainId: string }>;
}

/**
 * Domain Commercials Page
 * 
 * Shows financial and commercial data for the domain.
 * Access restricted based on user role.
 */
export default function CommercialsPage({ params }: CommercialsPageProps) {
  const { domainId } = use(params);
  const { currentUser } = useDashboard();
  const domain = getDomainById(domainId);
  const accessRights = getAccessRights(currentUser.role);

  if (!domain) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Domain not found</h1>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const showFinancials = accessRights.canViewFinancials;

  // If user doesn't have financial access, show restricted view
  if (!showFinancials) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{domain.name} - Commercials</h1>
          <p className="text-muted-foreground mt-1">Financial information for this domain</p>
        </div>

        <Alert>
          <Lock className="h-4 w-4" />
          <AlertDescription>
            You don't have permission to view financial information. Contact your administrator for access.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Limited Access</CardTitle>
            <CardDescription>
              Your current role ({currentUser.role}) has restricted access to commercial data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                The following roles have access to commercial information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>CEO - Full financial access</li>
                <li>COO - Full financial access</li>
                <li>Domain Head - Domain-level financial access</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const profit = domain.stats.totalRevenue - domain.stats.totalCost;
  const profitTrend = domain.stats.profitMargin > 20 ? "positive" : "warning";

  // Calculate project financial summaries
  const projectFinancials = domain.projects.map(project => ({
    id: project.id,
    name: project.name,
    budget: project.budget,
    spent: project.spent,
    revenue: project.revenue || 0,
    profit: (project.revenue || 0) - project.spent,
    budgetUtilization: project.stats.budgetUtilization,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{domain.name} - Commercials</h1>
            <p className="text-muted-foreground mt-1">Financial overview and commercial metrics</p>
          </div>
          <Badge variant="outline" className="text-sm">
            {currentUser.role}
          </Badge>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(domain.stats.totalRevenue)}
          description="Domain revenue"
          icon={DollarSign}
        />
        <StatCard
          title="Total Cost"
          value={formatCurrency(domain.stats.totalCost)}
          description="Operating costs"
          icon={Receipt}
        />
        <StatCard
          title="Net Profit"
          value={formatCurrency(profit)}
          description={profitTrend === "positive" ? "Healthy margin" : "Needs attention"}
          icon={profitTrend === "positive" ? TrendingUp : TrendingDown}
        />
        <StatCard
          title="Profit Margin"
          value={`${domain.stats.profitMargin.toFixed(1)}%`}
          description="Net margin"
          icon={PiggyBank}
        />
      </div>

      {/* Profit Margin Alert */}
      {profitTrend === "warning" && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Profit margin is below 20%. Consider reviewing project costs and resource allocation.
          </AlertDescription>
        </Alert>
      )}

      {/* Project Financial Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Project Financial Summary</CardTitle>
          <CardDescription>Budget utilization and revenue per project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectFinancials.map((project) => (
              <div key={project.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Budget: {formatCurrency(project.budget)}
                    </p>
                  </div>
                  <Badge 
                    variant={project.budgetUtilization > 90 ? "destructive" : "default"}
                  >
                    {project.budgetUtilization}% utilized
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Budget Utilization</span>
                      <span className="font-medium">{project.budgetUtilization}%</span>
                    </div>
                    <Progress value={project.budgetUtilization} />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Spent</p>
                      <p className="font-semibold text-sm">{formatCurrency(project.spent)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                      <p className="font-semibold text-sm text-green-600">
                        {formatCurrency(project.revenue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Profit</p>
                      <p className={`font-semibold text-sm ${project.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(project.profit)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Margin</p>
                      <p className="font-semibold text-sm">
                        {project.revenue > 0 ? `${((project.profit / project.revenue) * 100).toFixed(1)}%` : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Sources</CardTitle>
            <CardDescription>Where the money comes from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Project Revenue</span>
                <span className="font-semibold">{formatCurrency(domain.stats.totalRevenue)}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground text-sm">
                <span>Active Projects</span>
                <span>{domain.stats.activeProjects} projects</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground text-sm">
                <span>Avg per Project</span>
                <span>
                  {formatCurrency(domain.stats.totalRevenue / domain.stats.totalProjects)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Structure</CardTitle>
            <CardDescription>Where the money goes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Operating Costs</span>
                <span className="font-semibold">{formatCurrency(domain.stats.totalCost)}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground text-sm">
                <span>Team Size</span>
                <span>{domain.stats.totalMembers} members</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground text-sm">
                <span>Avg per Member</span>
                <span>
                  {formatCurrency(domain.stats.totalCost / domain.stats.totalMembers)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Utilization Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Utilization Impact</CardTitle>
          <CardDescription>How efficiently resources are being used</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Current Utilization Rate</p>
                <p className="text-2xl font-bold">{domain.stats.utilizationRate}%</p>
              </div>
              <CreditCard className="h-8 w-8 text-muted-foreground" />
            </div>
            <Progress value={domain.stats.utilizationRate} />
            <p className="text-sm text-muted-foreground">
              {domain.stats.utilizationRate >= 80 
                ? "Excellent utilization. Team resources are being used efficiently."
                : domain.stats.utilizationRate >= 60
                ? "Good utilization. Some room for improvement in resource allocation."
                : "Low utilization. Consider reassigning resources or taking on more projects."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
