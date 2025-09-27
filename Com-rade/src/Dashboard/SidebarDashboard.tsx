"use client";

import * as React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import {
  IconDashboard,
  IconShield,
  IconChartBar,
  IconFileText,
  IconSettings,
  IconLogout,
  IconBell,
  IconSearch,
  IconUser,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LogoutModal } from "@/components/LogoutModal";

const menuItems = [
  {
    title: "Dashboard",
    icon: IconDashboard,
    url: "/dashboard",
    isActive: true,
  },
  {
    title: "Users",
    icon: IconUser,
    url: "/dashboard/users",
  },
  {
    title: "Analytics",
    icon: IconChartBar,
    url: "/dashboard/analytics",
  },
  {
    title: "Reports",
    icon: IconFileText,
    url: "/dashboard/reports",
  },
  {
    title: "Security",
    icon: IconShield,
    url: "/dashboard/security",
  },
  {
    title: "Settings",
    icon: IconSettings,
    url: "/dashboard/settings",
  },
];

export const SidebarDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    logout();
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <IconShield className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Comrade</span>
              <span className="truncate text-xs text-muted-foreground">
                Military Platform
              </span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={item.isActive}
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogoutClick}>
                <IconLogout />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <IconSearch className="h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-[100px] lg:w-[300px]"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <IconBell className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <IconUser className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.username}</span>
                <span className="truncate text-xs text-muted-foreground">
                  Administrator
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Empty Dashboard Content */}
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <IconDashboard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-muted-foreground mb-2">
                Dashboard
              </h2>
              <p className="text-muted-foreground">
                Welcome to your dashboard. Content will be added here.
              </p>
            </div>
          </div>
        </div>
      </SidebarInset>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </SidebarProvider>
  );
};
