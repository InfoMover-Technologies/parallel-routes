/**
 * Dashboard Types and Interfaces
 * 
 * Defines the data model for the multi-level dashboard system
 */

// ============================================================================
// User Roles
// ============================================================================

export type UserRole = 
  | "Developer"
  | "ProjectManager"
  | "DomainHead"
  | "CEO"
  | "COO";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  joinedAt: Date;
}

// ============================================================================
// Business Entity
// ============================================================================

export interface Business {
  id: string;
  name: string;
  logo?: string;
  description: string;
  domains: Domain[];
}

// ============================================================================
// Domain Entity
// ============================================================================

export interface Domain {
  id: string;
  name: string;
  description: string;
  businessId: string;
  projects: Project[];
  teams: Team[];
  stats: DomainStats;
}

export interface DomainStats {
  totalProjects: number;
  activeProjects: number;
  totalTeams: number;
  totalMembers: number;
  totalRevenue: number;
  totalCost: number;
  profitMargin: number;
  utilizationRate: number;
}

// ============================================================================
// Project Entity
// ============================================================================

export interface Project {
  id: string;
  name: string;
  description: string;
  domainId: string;
  status: ProjectStatus;
  startDate: Date;
  endDate?: Date;
  budget: number;
  spent: number;
  revenue?: number;
  profit?: number;
  currentSprint?: Sprint;
  teamMembers: TeamMember[];
  risks: Risk[];
  stats: ProjectStats;
}

export type ProjectStatus = 
  | "Planning"
  | "Active"
  | "OnHold"
  | "Completed"
  | "Cancelled";

export interface Sprint {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  totalStoryPoints: number;
  completedStoryPoints: number;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  status: TaskStatus;
  priority: Priority;
  storyPoints: number;
  estimatedHours: number;
  actualHours: number;
}

export type TaskStatus = 
  | "Todo"
  | "InProgress"
  | "InReview"
  | "Done"
  | "Blocked";

export type Priority = "Low" | "Medium" | "High" | "Critical";

export interface Risk {
  id: string;
  title: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  probability: number;
  impact: string;
  mitigation: string;
}

export interface ProjectStats {
  completionRate: number;
  onTimeDelivery: number;
  budgetUtilization: number;
  teamVelocity: number;
  activeAnomalies: number;
}

// ============================================================================
// Team Entity
// ============================================================================

export interface Team {
  id: string;
  name: string;
  description: string;
  domainId: string;
  leadId: string;
  members: TeamMember[];
  createdAt: Date;
  stats: TeamStats;
}

export interface TeamMember {
  id: string;
  userId: string;
  userName: string;
  role: UserRole;
  email: string;
  avatar?: string;
  joinedAt: Date;
  hoursClockedThisMonth: number;
  tasksCompleted: number;
  currentTask?: Task;
  productivity: number;
}

export interface TeamStats {
  totalMembers: number;
  avgProductivity: number;
  totalHoursThisMonth: number;
  activeProjects: number;
}

// ============================================================================
// Developer-Specific Data
// ============================================================================

export interface DeveloperTimeEntry {
  id: string;
  developerId: string;
  taskId: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  screenshots: Screenshot[];
  appUsage: AppUsage[];
}

export interface Screenshot {
  id: string;
  timestamp: Date;
  url: string;
  activityLevel: number;
}

export interface AppUsage {
  appName: string;
  duration: number;
  category: string;
  productive: boolean;
}

// ============================================================================
// Dashboard Context
// ============================================================================

export interface DashboardContext {
  currentBusiness: Business;
  currentUser: User;
  currentDomain?: Domain;
  currentProject?: Project;
  currentTeam?: Team;
  viewLevel: ViewLevel;
}

export type ViewLevel = "Everything" | "Domain" | "Project" | "Team";

// ============================================================================
// Statistics Aggregations
// ============================================================================

export interface BusinessStats {
  totalDomains: number;
  totalProjects: number;
  activeProjects: number;
  totalTeams: number;
  totalMembers: number;
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  avgProfitMargin: number;
  topPerformingDomains: DomainPerformance[];
}

export interface DomainPerformance {
  domainId: string;
  domainName: string;
  profitMargin: number;
  revenue: number;
  projectCount: number;
}

// ============================================================================
// Access Control
// ============================================================================

export interface AccessRights {
  canViewFinancials: boolean;
  canViewAllProjects: boolean;
  canViewAllTeams: boolean;
  canManageTeam: boolean;
  canManageDomain: boolean;
  allowedDomainIds: string[];
  allowedProjectIds: string[];
  allowedTeamIds: string[];
}

export function getAccessRights(role: UserRole): AccessRights {
  switch (role) {
    case "CEO":
    case "COO":
      return {
        canViewFinancials: true,
        canViewAllProjects: true,
        canViewAllTeams: true,
        canManageTeam: true,
        canManageDomain: true,
        allowedDomainIds: [],
        allowedProjectIds: [],
        allowedTeamIds: [],
      };
    case "DomainHead":
      return {
        canViewFinancials: true,
        canViewAllProjects: true,
        canViewAllTeams: true,
        canManageTeam: true,
        canManageDomain: true,
        allowedDomainIds: [], // Would be populated with specific domains
        allowedProjectIds: [],
        allowedTeamIds: [],
      };
    case "ProjectManager":
      return {
        canViewFinancials: false, // Can be overridden
        canViewAllProjects: false,
        canViewAllTeams: false,
        canManageTeam: false,
        canManageDomain: false,
        allowedDomainIds: [],
        allowedProjectIds: [], // Would be populated with specific projects
        allowedTeamIds: [],
      };
    case "Developer":
      return {
        canViewFinancials: false,
        canViewAllProjects: false,
        canViewAllTeams: false,
        canManageTeam: false,
        canManageDomain: false,
        allowedDomainIds: [],
        allowedProjectIds: [], // Would be populated with specific projects
        allowedTeamIds: [], // Would be populated with specific teams
      };
  }
}
