"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  ChevronDown,
  ChevronRight,
  FolderKanban,
  LayoutDashboard,
  Users,
  Briefcase,
  FlaskConical,
  ImageIcon,
  ShieldCheck,
  GalleryVerticalEnd,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useDashboard } from "@/app/providers/DashboardProvider";
import { mockBusinesses } from "@/lib/data/mock-data";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * App Sidebar
 * 
 * Collapsible sidebar with:
 * - Sticky business switcher at top
 * - "Everything" business-level view
 * - Hierarchical domain navigation (Domain → Projects → Teams)
 * - Demo routes section for PoC demos
 */
export function AppSidebar() {
  const pathname = usePathname();
  const {
    currentBusiness,
    setCurrentBusiness,
    setViewLevel,
    setCurrentDomain,
    setCurrentProject,
    setCurrentTeam,
  } = useDashboard();

  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(
    new Set(currentBusiness.domains.map((d) => d.id))
  );

  const toggleDomain = (domainId: string) => {
    setExpandedDomains((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(domainId)) {
        newSet.delete(domainId);
      } else {
        newSet.add(domainId);
      }
      return newSet;
    });
  };

  const handleBusinessChange = (businessId: string) => {
    const business = mockBusinesses.find((b) => b.id === businessId);
    if (business) {
      setCurrentBusiness(business);
    }
  };

  const handleEverythingClick = () => {
    setViewLevel("Everything");
    setCurrentDomain(undefined);
    setCurrentProject(undefined);
    setCurrentTeam(undefined);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        {/* Sticky Business Switcher */}
        <div className="px-2 py-2">
          <Select
            value={currentBusiness.id}
            onValueChange={handleBusinessChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  <span className="truncate">{currentBusiness.name}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {mockBusinesses.map((business) => (
                <SelectItem key={business.id} value={business.id}>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {business.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Everything (Business Level) */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/app/everything")}
                onClick={handleEverythingClick}
              >
                <Link href="/app/everything">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Everything</span>
                  <Badge variant="secondary" className="ml-auto">
                    {currentBusiness.domains.length}
                  </Badge>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Hierarchical Domain Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Domains</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {currentBusiness.domains.map((domain) => {
                const isExpanded = expandedDomains.has(domain.id);
                const isDomainActive = isActive(`/app/domain/${domain.id}`);

                return (
                  <SidebarMenuItem key={domain.id}>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleDomain(domain.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      <SidebarMenuButton
                        asChild
                        isActive={isDomainActive}
                        className="flex-1"
                        onClick={() => {
                          setViewLevel("Domain");
                          setCurrentDomain(domain);
                          setCurrentProject(undefined);
                          setCurrentTeam(undefined);
                        }}
                      >
                        <Link href={`/app/domain/${domain.id}`}>
                          <FolderKanban className="h-4 w-4" />
                          <span className="truncate">{domain.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </div>

                    {isExpanded && (
                      <SidebarMenuSub>
                        {/* Projects under domain */}
                        {domain.projects.length > 0 && (
                          <>
                            <SidebarMenuSubItem>
                              <div className="text-xs text-muted-foreground px-2 py-1 font-medium">
                                Projects
                              </div>
                            </SidebarMenuSubItem>
                            {domain.projects.map((project) => (
                              <SidebarMenuSubItem key={project.id}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isActive(
                                    `/app/project/${project.id}`
                                  )}
                                  onClick={() => {
                                    setViewLevel("Project");
                                    setCurrentDomain(domain);
                                    setCurrentProject(project);
                                    setCurrentTeam(undefined);
                                  }}
                                >
                                  <Link href={`/app/project/${project.id}`}>
                                    <Briefcase className="h-4 w-4" />
                                    <span className="truncate">
                                      {project.name}
                                    </span>
                                    <Badge
                                      variant="outline"
                                      className={cn(
                                        "ml-auto text-xs",
                                        project.status === "Active" &&
                                          "border-green-500 text-green-700",
                                        project.status === "Planning" &&
                                          "border-blue-500 text-blue-700",
                                        project.status === "OnHold" &&
                                          "border-yellow-500 text-yellow-700"
                                      )}
                                    >
                                      {project.status}
                                    </Badge>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </>
                        )}

                        {/* Teams under domain */}
                        {domain.teams.length > 0 && (
                          <>
                            <SidebarMenuSubItem>
                              <div className="text-xs text-muted-foreground px-2 py-1 font-medium mt-2">
                                Teams
                              </div>
                            </SidebarMenuSubItem>
                            {domain.teams.map((team) => (
                              <SidebarMenuSubItem key={team.id}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isActive(`/app/team/${team.id}`)}
                                  onClick={() => {
                                    setViewLevel("Team");
                                    setCurrentDomain(domain);
                                    setCurrentProject(undefined);
                                    setCurrentTeam(team);
                                  }}
                                >
                                  <Link href={`/app/team/${team.id}`}>
                                    <Users className="h-4 w-4" />
                                    <span className="truncate">{team.name}</span>
                                    <Badge
                                      variant="secondary"
                                      className="ml-auto text-xs"
                                    >
                                      {team.members.length}
                                    </Badge>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </>
                        )}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Demo Routes Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Demo Routes (PoC)</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/app/dashboard")}
                  tooltip="Dashboard with Parallel Slots"
                >
                  <Link href="/app/dashboard">
                    <FlaskConical className="h-4 w-4" />
                    <span>Dashboard Demo</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/app/admin")}
                  tooltip="Admin Area - Conditional Rendering"
                >
                  <Link href="/app/admin">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Admin Demo</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/app/gallery")}
                  tooltip="Photo Gallery - Modal with Intercepting Routes"
                >
                  <Link href="/app/gallery">
                    <GalleryVerticalEnd className="h-4 w-4" />
                    <span>Photo Gallery Demo</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <ImageIcon className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
