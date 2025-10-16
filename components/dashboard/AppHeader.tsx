"use client";

import { Bell, Search, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useDashboard } from "@/app/providers/DashboardProvider";
import { UserRole } from "@/lib/types/dashboard";
import { SidebarTrigger } from "@/components/ui/sidebar";

/**
 * App Header
 * 
 * Top navigation bar with breadcrumbs, search, notifications, and user menu
 */
export function AppHeader() {
  const { currentUser, setCurrentRole, currentBusiness, viewLevel } = useDashboard();

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "CEO":
      case "COO":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-300";
      case "DomainHead":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-300";
      case "ProjectManager":
        return "bg-green-500/10 text-green-700 dark:text-green-300";
      case "Developer":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-300";
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger />
      
      {/* Breadcrumb/Context */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{currentBusiness.name}</span>
        <span>/</span>
        <span>{viewLevel}</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects, teams, members..."
            className="pl-8 h-9"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-9">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>
                  {currentUser.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-medium">{currentUser.name}</span>
                <Badge variant="secondary" className={`text-xs ${getRoleColor(currentUser.role)}`}>
                  {currentUser.role}
                </Badge>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
              Switch Role (Demo)
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleRoleChange("CEO")}>
              <Badge className={`mr-2 ${getRoleColor("CEO")}`}>CEO</Badge>
              CEO View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleChange("COO")}>
              <Badge className={`mr-2 ${getRoleColor("COO")}`}>COO</Badge>
              COO View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleChange("DomainHead")}>
              <Badge className={`mr-2 ${getRoleColor("DomainHead")}`}>DH</Badge>
              Domain Head View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleChange("ProjectManager")}>
              <Badge className={`mr-2 ${getRoleColor("ProjectManager")}`}>PM</Badge>
              Project Manager View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRoleChange("Developer")}>
              <Badge className={`mr-2 ${getRoleColor("Developer")}`}>DEV</Badge>
              Developer View
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
