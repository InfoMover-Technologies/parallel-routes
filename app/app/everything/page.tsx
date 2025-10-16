"use client";

import { useDashboard } from "@/app/providers/DashboardProvider";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Building2, 
  DollarSign, 
  FolderKanban, 
  TrendingUp, 
  Users,
  Briefcase,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { mockBusinessStats, mockDomains, mockProjects } from "@/lib/data/mock-data";
import { getAccessRights } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils";

/**
 * Everything (Business-Level) Dashboard
 * 
 * Role-based business overview showing:
 * - CEO/COO: Complete business performance, domain comparisons, high-level metrics
 * - Domain Heads: Domain performance with drill-down capabilities
 * - Project Managers: Portfolio of projects they manage with team statistics
 * - Developers: All projects and teams they are associated with
 */
export default function EverythingPage() {
  const { currentUser } = useDashboard();
  const accessRights = getAccessRights(currentUser.role);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // CEO/COO View
  if (currentUser.role === "CEO" || currentUser.role === "COO") {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Business Overview</h1>
          <p className="text-muted-foreground mt-1">
            Complete performance metrics across all domains
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(mockBusinessStats.totalRevenue)}
            description="Across all domains"
            icon={DollarSign}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Total Profit"
            value={formatCurrency(mockBusinessStats.totalProfit)}
            description={`${mockBusinessStats.avgProfitMargin.toFixed(1)}% margin`}
            icon={TrendingUp}
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard
            title="Active Projects"
            value={`${mockBusinessStats.activeProjects} / ${mockBusinessStats.totalProjects}`}
            description="Across all domains"
            icon={Briefcase}
          />
          <StatCard
            title="Total Team Members"
            value={mockBusinessStats.totalMembers}
            description={`In ${mockBusinessStats.totalTeams} teams`}
            icon={Users}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Domain Performance</CardTitle>
            <CardDescription>
              Profitability and performance across all business domains
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockBusinessStats.topPerformingDomains.map((domain) => (
                <div key={domain.domainId} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {domain.domainName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {domain.projectCount} projects • {formatCurrency(domain.revenue)} revenue
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">
                        {domain.profitMargin.toFixed(1)}%
                      </p>
                      <p className="text-xs text-muted-foreground">profit margin</p>
                    </div>
                  </div>
                  <Progress value={domain.profitMargin} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Domains</CardTitle>
            <CardDescription>Detailed breakdown by domain</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Domain</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Teams</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Profit Margin</TableHead>
                  <TableHead>Utilization</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDomains.map((domain) => (
                  <TableRow key={domain.id}>
                    <TableCell className="font-medium">{domain.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {domain.stats.activeProjects} active
                      </Badge>
                    </TableCell>
                    <TableCell>{domain.stats.totalTeams}</TableCell>
                    <TableCell>{formatCurrency(domain.stats.totalRevenue)}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "font-medium",
                        domain.stats.profitMargin > 35 ? "text-green-600" : "text-yellow-600"
                      )}>
                        {domain.stats.profitMargin.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={domain.stats.utilizationRate} className="h-2 w-16" />
                        <span className="text-sm">{domain.stats.utilizationRate}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Developer View
  const developerProjects = mockProjects.filter((p) => p.status === "Active").slice(0, 3);
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Overview</h1>
        <p className="text-muted-foreground mt-1">
          Projects and teams you're associated with
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Active Projects"
          value={developerProjects.length}
          description="Currently working on"
          icon={Briefcase}
        />
        <StatCard
          title="Teams"
          value={2}
          description="Member of"
          icon={Users}
        />
        <StatCard
          title="Tasks Completed"
          value={24}
          description="This month"
          icon={CheckCircle2}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Projects</CardTitle>
          <CardDescription>Projects you have access to</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {developerProjects.map((project) => {
              const domain = mockDomains.find((d) => d.id === project.domainId);
              return (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription>{domain?.name}</CardDescription>
                      </div>
                      <Badge>{project.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.stats.completionRate}%</span>
                      </div>
                      <Progress value={project.stats.completionRate} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
