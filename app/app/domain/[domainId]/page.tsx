"use client";

import { use } from "react";
import { useDashboard } from "@/app/providers/DashboardProvider";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  Users,
  Briefcase,
  Target,
} from "lucide-react";
import { getDomainById } from "@/lib/data/mock-data";
import { getAccessRights } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DomainPageProps {
  params: Promise<{ domainId: string }>;
}

/**
 * Domain Dashboard Page
 * 
 * Shows domain-level metrics and all projects/teams under this domain
 */
export default function DomainPage({ params }: DomainPageProps) {
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{domain.name}</h1>
        <p className="text-muted-foreground mt-1">{domain.description}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Projects"
          value={`${domain.stats.activeProjects} / ${domain.stats.totalProjects}`}
          description="In this domain"
          icon={Briefcase}
        />
        <StatCard
          title="Team Members"
          value={domain.stats.totalMembers}
          description={`In ${domain.stats.totalTeams} teams`}
          icon={Users}
        />
        {showFinancials && (
          <>
            <StatCard
              title="Total Revenue"
              value={formatCurrency(domain.stats.totalRevenue)}
              description="Domain revenue"
              icon={DollarSign}
            />
            <StatCard
              title="Profit Margin"
              value={`${domain.stats.profitMargin.toFixed(1)}%`}
              description={`${domain.stats.utilizationRate}% utilization`}
              icon={TrendingUp}
            />
          </>
        )}
        {!showFinancials && (
          <StatCard
            title="Utilization"
            value={`${domain.stats.utilizationRate}%`}
            description="Team capacity"
            icon={Target}
          />
        )}
      </div>

      {/* Projects in Domain */}
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>All projects under this domain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {domain.projects.map((project) => (
              <Link key={project.id} href={`/app/project/${project.id}`}>
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {project.description}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={project.status === "Active" ? "default" : "secondary"}
                        className={cn(
                          project.status === "Active" && "bg-green-500",
                          project.status === "Planning" && "bg-blue-500"
                        )}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.stats.completionRate}%</span>
                      </div>
                      <Progress value={project.stats.completionRate} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Team</p>
                        <p className="font-medium">{project.teamMembers.length} members</p>
                      </div>
                      {showFinancials && (
                        <div>
                          <p className="text-muted-foreground">Budget</p>
                          <p className="font-medium">{project.stats.budgetUtilization}%</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Teams in Domain */}
      <Card>
        <CardHeader>
          <CardTitle>Teams</CardTitle>
          <CardDescription>All teams under this domain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {domain.teams.map((team) => (
              <Link key={team.id} href={`/app/team/${team.id}`}>
                <Card className="hover:bg-accent transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <CardDescription>{team.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Members</span>
                        <span className="font-medium">{team.members.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Avg Productivity</span>
                        <span className="font-medium text-green-600">
                          {team.stats.avgProductivity}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Hours This Month</span>
                        <span className="font-medium">{team.stats.totalHoursThisMonth}h</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
