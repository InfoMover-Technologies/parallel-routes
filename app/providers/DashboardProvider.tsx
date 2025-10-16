"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import {
  Business,
  Domain,
  Project,
  Team,
  User,
  UserRole,
  ViewLevel,
  DashboardContext as DashboardContextType,
} from "@/lib/types/dashboard";
import {
  mockBusinesses,
  currentUser as defaultUser,
} from "@/lib/data/mock-data";

interface DashboardProviderProps {
  children: React.ReactNode;
}

interface DashboardProviderValue extends DashboardContextType {
  setCurrentBusiness: (business: Business) => void;
  setCurrentUser: (user: User) => void;
  setCurrentRole: (role: UserRole) => void;
  setCurrentDomain: (domain: Domain | undefined) => void;
  setCurrentProject: (project: Project | undefined) => void;
  setCurrentTeam: (team: Team | undefined) => void;
  setViewLevel: (level: ViewLevel) => void;
}

const DashboardContext = createContext<DashboardProviderValue | undefined>(
  undefined
);

/**
 * Dashboard Provider
 * 
 * Manages global dashboard state including current business, user, role,
 * and navigation context (domain, project, team).
 */
export function DashboardProvider({ children }: DashboardProviderProps) {
  const [currentBusiness, setCurrentBusiness] = useState<Business>(
    mockBusinesses[0]
  );
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  const [currentDomain, setCurrentDomain] = useState<Domain | undefined>();
  const [currentProject, setCurrentProject] = useState<Project | undefined>();
  const [currentTeam, setCurrentTeam] = useState<Team | undefined>();
  const [viewLevel, setViewLevel] = useState<ViewLevel>("Everything");

  // Allow role switching for demo purposes
  const setCurrentRole = useCallback((role: UserRole) => {
    setCurrentUser((prev) => ({ ...prev, role }));
  }, []);

  const value: DashboardProviderValue = {
    currentBusiness,
    currentUser,
    currentDomain,
    currentProject,
    currentTeam,
    viewLevel,
    setCurrentBusiness,
    setCurrentUser,
    setCurrentRole,
    setCurrentDomain,
    setCurrentProject,
    setCurrentTeam,
    setViewLevel,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

/**
 * Hook to access dashboard context
 */
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
