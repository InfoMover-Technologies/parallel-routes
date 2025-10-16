/**
 * Mock Data for Dashboard
 * 
 * Comprehensive sample data for testing the multi-level dashboard system
 */

import {
  Business,
  Domain,
  Project,
  Team,
  User,
  TeamMember,
  Sprint,
  Task,
  Risk,
  DomainStats,
  ProjectStats,
  TeamStats,
  BusinessStats,
} from "@/lib/types/dashboard";

// ============================================================================
// Users
// ============================================================================

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "CEO",
    joinedAt: new Date("2020-01-15"),
  },
  {
    id: "u2",
    name: "Michael Torres",
    email: "michael.torres@company.com",
    role: "COO",
    joinedAt: new Date("2020-03-20"),
  },
  {
    id: "u3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    role: "DomainHead",
    joinedAt: new Date("2021-02-10"),
  },
  {
    id: "u4",
    name: "James Wilson",
    email: "james.wilson@company.com",
    role: "DomainHead",
    joinedAt: new Date("2021-05-18"),
  },
  {
    id: "u5",
    name: "Priya Sharma",
    email: "priya.sharma@company.com",
    role: "ProjectManager",
    joinedAt: new Date("2021-08-01"),
  },
  {
    id: "u6",
    name: "David Kim",
    email: "david.kim@company.com",
    role: "ProjectManager",
    joinedAt: new Date("2022-01-15"),
  },
  {
    id: "u7",
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
    role: "Developer",
    joinedAt: new Date("2022-03-20"),
  },
  {
    id: "u8",
    name: "Maria Garcia",
    email: "maria.garcia@company.com",
    role: "Developer",
    joinedAt: new Date("2022-06-10"),
  },
  {
    id: "u9",
    name: "Chris Anderson",
    email: "chris.anderson@company.com",
    role: "Developer",
    joinedAt: new Date("2022-09-05"),
  },
  {
    id: "u10",
    name: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    role: "Developer",
    joinedAt: new Date("2023-01-12"),
  },
];

// ============================================================================
// Teams
// ============================================================================

const mockTeamMembers: TeamMember[] = [
  {
    id: "tm1",
    userId: "u7",
    userName: "Alex Johnson",
    role: "Developer",
    email: "alex.johnson@company.com",
    joinedAt: new Date("2022-03-20"),
    hoursClockedThisMonth: 152,
    tasksCompleted: 24,
    productivity: 92,
  },
  {
    id: "tm2",
    userId: "u8",
    userName: "Maria Garcia",
    role: "Developer",
    email: "maria.garcia@company.com",
    joinedAt: new Date("2022-06-10"),
    hoursClockedThisMonth: 148,
    tasksCompleted: 21,
    productivity: 88,
  },
  {
    id: "tm3",
    userId: "u9",
    userName: "Chris Anderson",
    role: "Developer",
    email: "chris.anderson@company.com",
    joinedAt: new Date("2022-09-05"),
    hoursClockedThisMonth: 156,
    tasksCompleted: 26,
    productivity: 95,
  },
  {
    id: "tm4",
    userId: "u10",
    userName: "Lisa Thompson",
    role: "Developer",
    email: "lisa.thompson@company.com",
    joinedAt: new Date("2023-01-12"),
    hoursClockedThisMonth: 144,
    tasksCompleted: 19,
    productivity: 85,
  },
];

export const mockTeams: Team[] = [
  {
    id: "team1",
    name: "Alpha Squad",
    description: "Full-stack development team",
    domainId: "domain1",
    leadId: "u5",
    members: [mockTeamMembers[0], mockTeamMembers[1]],
    createdAt: new Date("2022-01-15"),
    stats: {
      totalMembers: 2,
      avgProductivity: 90,
      totalHoursThisMonth: 300,
      activeProjects: 2,
    },
  },
  {
    id: "team2",
    name: "Beta Force",
    description: "Backend specialists",
    domainId: "domain1",
    leadId: "u6",
    members: [mockTeamMembers[2]],
    createdAt: new Date("2022-03-20"),
    stats: {
      totalMembers: 1,
      avgProductivity: 95,
      totalHoursThisMonth: 156,
      activeProjects: 1,
    },
  },
  {
    id: "team3",
    name: "Gamma Team",
    description: "Frontend experts",
    domainId: "domain2",
    leadId: "u5",
    members: [mockTeamMembers[3]],
    createdAt: new Date("2022-06-01"),
    stats: {
      totalMembers: 1,
      avgProductivity: 85,
      totalHoursThisMonth: 144,
      activeProjects: 1,
    },
  },
  {
    id: "team4",
    name: "Delta Unit",
    description: "DevOps and infrastructure",
    domainId: "domain2",
    leadId: "u6",
    members: [mockTeamMembers[0]],
    createdAt: new Date("2022-08-15"),
    stats: {
      totalMembers: 1,
      avgProductivity: 92,
      totalHoursThisMonth: 152,
      activeProjects: 2,
    },
  },
];

// ============================================================================
// Tasks & Sprints
// ============================================================================

const mockTasks: Task[] = [
  {
    id: "task1",
    title: "Implement user authentication",
    description: "Add JWT-based auth system",
    assigneeId: "u7",
    status: "InProgress",
    priority: "High",
    storyPoints: 8,
    estimatedHours: 20,
    actualHours: 15,
  },
  {
    id: "task2",
    title: "Design database schema",
    description: "Create ERD for new features",
    assigneeId: "u8",
    status: "Done",
    priority: "High",
    storyPoints: 5,
    estimatedHours: 12,
    actualHours: 10,
  },
  {
    id: "task3",
    title: "Setup CI/CD pipeline",
    description: "Configure GitHub Actions",
    assigneeId: "u9",
    status: "InProgress",
    priority: "Medium",
    storyPoints: 5,
    estimatedHours: 16,
    actualHours: 12,
  },
];

const mockSprints: Sprint[] = [
  {
    id: "sprint1",
    name: "Sprint 24 - Auth & Security",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-14"),
    totalStoryPoints: 34,
    completedStoryPoints: 28,
    tasks: mockTasks,
  },
];

// ============================================================================
// Projects
// ============================================================================

const mockRisks: Risk[] = [
  {
    id: "risk1",
    title: "Third-party API dependency",
    severity: "Medium",
    probability: 0.4,
    impact: "Could delay feature delivery by 1 week",
    mitigation: "Prepare fallback implementation",
  },
  {
    id: "risk2",
    title: "Resource availability",
    severity: "Low",
    probability: 0.2,
    impact: "Minor sprint goal adjustments",
    mitigation: "Cross-train team members",
  },
];

export const mockProjects: Project[] = [
  {
    id: "proj1",
    name: "HireTalentt Platform",
    description: "AI-powered talent marketplace connecting businesses with freelancers",
    domainId: "domain1",
    status: "Active",
    startDate: new Date("2023-06-01"),
    budget: 250000,
    spent: 175000,
    revenue: 320000,
    profit: 145000,
    currentSprint: mockSprints[0],
    teamMembers: [mockTeamMembers[0], mockTeamMembers[1]],
    risks: [mockRisks[0]],
    stats: {
      completionRate: 72,
      onTimeDelivery: 85,
      budgetUtilization: 70,
      teamVelocity: 32,
      activeAnomalies: 2,
    },
  },
  {
    id: "proj2",
    name: "Logistics Optimizer",
    description: "Route optimization and fleet management system",
    domainId: "domain1",
    status: "Active",
    startDate: new Date("2023-09-15"),
    budget: 180000,
    spent: 145000,
    revenue: 220000,
    profit: 75000,
    teamMembers: [mockTeamMembers[2]],
    risks: [mockRisks[1]],
    stats: {
      completionRate: 65,
      onTimeDelivery: 90,
      budgetUtilization: 81,
      teamVelocity: 28,
      activeAnomalies: 1,
    },
  },
  {
    id: "proj3",
    name: "FinTech Payment Gateway",
    description: "Secure payment processing platform",
    domainId: "domain2",
    status: "Active",
    startDate: new Date("2023-04-01"),
    budget: 320000,
    spent: 285000,
    revenue: 450000,
    profit: 165000,
    teamMembers: [mockTeamMembers[3]],
    risks: [],
    stats: {
      completionRate: 88,
      onTimeDelivery: 95,
      budgetUtilization: 89,
      teamVelocity: 35,
      activeAnomalies: 0,
    },
  },
  {
    id: "proj4",
    name: "Healthcare Portal",
    description: "Patient management and telemedicine platform",
    domainId: "domain3",
    status: "Active",
    startDate: new Date("2023-08-01"),
    budget: 280000,
    spent: 198000,
    revenue: 340000,
    profit: 142000,
    teamMembers: [mockTeamMembers[0], mockTeamMembers[1]],
    risks: [mockRisks[0], mockRisks[1]],
    stats: {
      completionRate: 70,
      onTimeDelivery: 82,
      budgetUtilization: 71,
      teamVelocity: 30,
      activeAnomalies: 3,
    },
  },
  {
    id: "proj5",
    name: "E-Commerce Platform",
    description: "Multi-vendor marketplace with AI recommendations",
    domainId: "domain4",
    status: "Planning",
    startDate: new Date("2024-02-01"),
    budget: 350000,
    spent: 45000,
    teamMembers: [mockTeamMembers[2]],
    risks: [],
    stats: {
      completionRate: 15,
      onTimeDelivery: 100,
      budgetUtilization: 13,
      teamVelocity: 25,
      activeAnomalies: 0,
    },
  },
];

// ============================================================================
// Domains
// ============================================================================

export const mockDomains: Domain[] = [
  {
    id: "domain1",
    name: "Logistics & Supply Chain",
    description: "Transportation and logistics management solutions",
    businessId: "biz1",
    projects: [mockProjects[0], mockProjects[1]],
    teams: [mockTeams[0], mockTeams[1]],
    stats: {
      totalProjects: 2,
      activeProjects: 2,
      totalTeams: 2,
      totalMembers: 3,
      totalRevenue: 540000,
      totalCost: 320000,
      profitMargin: 40.7,
      utilizationRate: 87,
    },
  },
  {
    id: "domain2",
    name: "Financial Services",
    description: "Banking and payment solutions",
    businessId: "biz1",
    projects: [mockProjects[2]],
    teams: [mockTeams[2]],
    stats: {
      totalProjects: 1,
      activeProjects: 1,
      totalTeams: 1,
      totalMembers: 1,
      totalRevenue: 450000,
      totalCost: 285000,
      profitMargin: 36.7,
      utilizationRate: 92,
    },
  },
  {
    id: "domain3",
    name: "Healthcare Solutions",
    description: "Medical and healthcare technology",
    businessId: "biz1",
    projects: [mockProjects[3]],
    teams: [mockTeams[0]],
    stats: {
      totalProjects: 1,
      activeProjects: 1,
      totalTeams: 1,
      totalMembers: 2,
      totalRevenue: 340000,
      totalCost: 198000,
      profitMargin: 41.8,
      utilizationRate: 85,
    },
  },
  {
    id: "domain4",
    name: "E-Commerce & Retail",
    description: "Online marketplace and retail solutions",
    businessId: "biz1",
    projects: [mockProjects[4]],
    teams: [mockTeams[3]],
    stats: {
      totalProjects: 1,
      activeProjects: 0,
      totalTeams: 1,
      totalMembers: 1,
      totalRevenue: 0,
      totalCost: 45000,
      profitMargin: 0,
      utilizationRate: 45,
    },
  },
];

// ============================================================================
// Businesses
// ============================================================================

export const mockBusinesses: Business[] = [
  {
    id: "biz1",
    name: "TechSolutions Inc.",
    description: "Leading software development services company",
    domains: mockDomains,
  },
  {
    id: "biz2",
    name: "Global Innovators Ltd.",
    description: "International technology consulting firm",
    domains: [],
  },
];

// ============================================================================
// Business Statistics
// ============================================================================

export const mockBusinessStats: BusinessStats = {
  totalDomains: 4,
  totalProjects: 5,
  activeProjects: 4,
  totalTeams: 4,
  totalMembers: 10,
  totalRevenue: 1330000,
  totalCost: 848000,
  totalProfit: 482000,
  avgProfitMargin: 36.2,
  topPerformingDomains: [
    {
      domainId: "domain3",
      domainName: "Healthcare Solutions",
      profitMargin: 41.8,
      revenue: 340000,
      projectCount: 1,
    },
    {
      domainId: "domain1",
      domainName: "Logistics & Supply Chain",
      profitMargin: 40.7,
      revenue: 540000,
      projectCount: 2,
    },
    {
      domainId: "domain2",
      domainName: "Financial Services",
      profitMargin: 36.7,
      revenue: 450000,
      projectCount: 1,
    },
  ],
};

// ============================================================================
// Helper Functions
// ============================================================================

export function getBusinessById(id: string): Business | undefined {
  return mockBusinesses.find((b) => b.id === id);
}

export function getDomainById(id: string): Domain | undefined {
  return mockDomains.find((d) => d.id === id);
}

export function getProjectById(id: string): Project | undefined {
  return mockProjects.find((p) => p.id === id);
}

export function getTeamById(id: string): Team | undefined {
  return mockTeams.find((t) => t.id === id);
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find((u) => u.id === id);
}

export function getProjectsByDomainId(domainId: string): Project[] {
  return mockProjects.filter((p) => p.domainId === domainId);
}

export function getTeamsByDomainId(domainId: string): Team[] {
  return mockTeams.filter((t) => t.domainId === domainId);
}

// Default current user for demo
export const currentUser: User = mockUsers[0]; // CEO by default
