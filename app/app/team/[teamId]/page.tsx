"use client";

import { use } from "react";
import { useDashboard } from "@/app/providers/DashboardProvider";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users,
  Clock,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { getTeamById, getDomainById } from "@/lib/data/mock-data";

interface TeamPageProps {
  params: Promise<{ teamId: string }>;
}

/**
 * Team Dashboard Page
 * 
 * Shows team details, member information, and statistics
 */
export default function TeamPage({ params }: TeamPageProps) {
  const { teamId } = use(params);
  const { currentUser } = useDashboard();
  const team = getTeamById(teamId);

  if (!team) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Team not found</h1>
      </div>
    );
  }

  const domain = getDomainById(team.domainId);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{domain?.name}</span>
          <span>/</span>
          <span>Teams</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{team.name}</h1>
          <p className="text-muted-foreground mt-1">{team.description}</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Team Size"
          value={team.stats.totalMembers}
          description="Active members"
          icon={Users}
        />
        <StatCard
          title="Avg Productivity"
          value={`${team.stats.avgProductivity}%`}
          description="Team average"
          icon={TrendingUp}
        />
        <StatCard
          title="Hours This Month"
          value={`${team.stats.totalHoursThisMonth}h`}
          description="Total logged"
          icon={Clock}
        />
        <StatCard
          title="Active Projects"
          value={team.stats.activeProjects}
          description="Currently working on"
          icon={CheckCircle2}
        />
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            All members of this team • Created {team.createdAt.toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {team.members.map((member) => (
              <Card key={member.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="text-lg">
                          {member.userName.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{member.userName}</h3>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary">{member.role}</Badge>
                          <span className="text-xs text-muted-foreground">
                            Joined {member.joinedAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Hours This Month</p>
                      <p className="text-lg font-semibold">{member.hoursClockedThisMonth}h</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tasks Completed</p>
                      <p className="text-lg font-semibold">{member.tasksCompleted}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Productivity</p>
                      <p className="text-lg font-semibold text-green-600">
                        {member.productivity}%
                      </p>
                    </div>
                  </div>

                  {member.currentTask && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-medium mb-2">Current Task</p>
                      <div className="bg-accent/50 rounded-lg p-3">
                        <p className="text-sm font-medium">{member.currentTask.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {member.currentTask.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {member.currentTask.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {member.currentTask.actualHours}h / {member.currentTask.estimatedHours}h
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Information for Developers */}
      {currentUser.role === "Developer" && (
        <Card>
          <CardHeader>
            <CardTitle>Your Team Membership</CardTitle>
            <CardDescription>Details about your participation in this team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">{team.createdAt.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">
                    {Math.floor((new Date().getTime() - team.createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30))} months
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">Team Role</p>
                <Badge className="mt-1">{currentUser.role}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
