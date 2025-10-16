"use client";

import { use } from "react";
import { useDashboard } from "@/app/providers/DashboardProvider";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DollarSign, 
  TrendingUp, 
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { getProjectById, getDomainById } from "@/lib/data/mock-data";
import { getAccessRights } from "@/lib/types/dashboard";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

/**
 * Project Dashboard Page
 * 
 * Shows project details, sprint info, team members, and tasks
 */
export default function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = use(params);
  const { currentUser } = useDashboard();
  const project = getProjectById(projectId);
  const accessRights = getAccessRights(currentUser.role);

  if (!project) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Project not found</h1>
      </div>
    );
  }

  const domain = getDomainById(project.domainId);
  const showFinancials = accessRights.canViewFinancials;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{domain?.name}</span>
          <span>/</span>
          <span>Projects</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <p className="text-muted-foreground mt-1">{project.description}</p>
          </div>
          <Badge className="text-sm">{project.status}</Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Completion"
          value={`${project.stats.completionRate}%`}
          description="Overall progress"
          icon={CheckCircle2}
        />
        <StatCard
          title="Team Size"
          value={project.teamMembers.length}
          description="Active members"
          icon={Users}
        />
        {showFinancials && (
          <>
            <StatCard
              title="Budget Used"
              value={`${project.stats.budgetUtilization}%`}
              description={`${formatCurrency(project.spent)} of ${formatCurrency(project.budget)}`}
              icon={DollarSign}
            />
            <StatCard
              title="Profit"
              value={project.profit ? formatCurrency(project.profit) : "N/A"}
              description={project.revenue ? `${formatCurrency(project.revenue)} revenue` : ""}
              icon={TrendingUp}
            />
          </>
        )}
        {!showFinancials && (
          <StatCard
            title="On-Time Delivery"
            value={`${project.stats.onTimeDelivery}%`}
            description="Delivery performance"
            icon={Clock}
          />
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Sprint */}
        {project.currentSprint && (
          <Card>
            <CardHeader>
              <CardTitle>{project.currentSprint.name}</CardTitle>
              <CardDescription>
                {project.currentSprint.startDate.toLocaleDateString()} - {project.currentSprint.endDate.toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Sprint Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {project.currentSprint.completedStoryPoints} / {project.currentSprint.totalStoryPoints} points
                  </span>
                </div>
                <Progress 
                  value={(project.currentSprint.completedStoryPoints / project.currentSprint.totalStoryPoints) * 100} 
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Tasks</p>
                {project.currentSprint.tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-2 rounded-lg bg-accent/50">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {task.estimatedHours}h estimated • {task.actualHours}h actual
                      </p>
                    </div>
                    <Badge variant={
                      task.status === "Done" ? "default" : 
                      task.status === "InProgress" ? "secondary" : 
                      "outline"
                    }>
                      {task.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>People working on this project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {member.userName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.userName}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{member.productivity}%</p>
                    <p className="text-xs text-muted-foreground">productivity</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risks */}
      {project.risks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Active Risks
            </CardTitle>
            <CardDescription>Potential issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.risks.map((risk) => (
                <div key={risk.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium">{risk.title}</h4>
                    <Badge variant={
                      risk.severity === "Critical" ? "destructive" :
                      risk.severity === "High" ? "default" :
                      "secondary"
                    }>
                      {risk.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Impact:</strong> {risk.impact}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Mitigation:</strong> {risk.mitigation}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
