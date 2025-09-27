"use client";

import { Search, ChevronDown, Menu, X, Settings, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LogoutModal } from "@/components/LogoutModal";

const navigationTabs = [
  { name: "Channel", active: true },
  { name: "Map", active: false },
  { name: "Chat", active: false },
  { name: "Announcement", active: false },
  { name: "Manage", active: false },
];

const sidebarAvatars = [
  "/gaming-house-icon.jpg",
  "/food-dish-icon.jpg",
  "/husky-dog-avatar.jpg",
  "/person-with-glasses.png",
  "/bulldog-avatar.jpg",
  "/white-cat-avatar.jpg",
  "/golden-retriever.png",
  "/diverse-person-avatars.png",
];

const channels = [
  {
    id: 1,
    name: "Alpha",
    avatar: "/gaming-house-icon.jpg",
    online: 35,
    members: 50,
    lastSeen: "5:30 pm, September 26, 2024",
  },
  {
    id: 2,
    name: "Bravo",
    avatar: "/food-dish-icon.jpg",
    online: 28,
    members: 45,
    lastSeen: "4:15 pm, September 26, 2024",
  },
  {
    id: 3,
    name: "Charlie",
    avatar: "/husky-dog-avatar.jpg",
    online: 42,
    members: 60,
    lastSeen: "6:00 pm, September 26, 2024",
  },
  {
    id: 4,
    name: "Delta",
    avatar: "/person-with-glasses.png",
    online: 19,
    members: 35,
    lastSeen: "3:45 pm, September 26, 2024",
  },
  {
    id: 5,
    name: "Echo",
    avatar: "/bulldog-avatar.jpg",
    online: 33,
    members: 48,
    lastSeen: "5:20 pm, September 26, 2024",
  },
  {
    id: 6,
    name: "Foxtrot",
    avatar: "/white-cat-avatar.jpg",
    online: 25,
    members: 40,
    lastSeen: "4:30 pm, September 26, 2024",
  },
  {
    id: 7,
    name: "Golf",
    avatar: "/golden-retriever.png",
    online: 38,
    members: 55,
    lastSeen: "5:45 pm, September 26, 2024",
  },
  {
    id: 8,
    name: "Hotel",
    avatar: "/diverse-person-avatars.png",
    online: 22,
    members: 38,
    lastSeen: "3:20 pm, September 26, 2024",
  },
];

export const SidebarDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-background">
        <div className="flex items-center px-4 py-3">
          <div className="flex items-center gap-2 space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 hover:bg-accent"
              title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex items-center space-x-8 ml-8">
            {navigationTabs.map((tab) => (
              <button
                key={tab.name}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  tab.active
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-16"
          } bg-background border-r border-border transition-all duration-300 flex flex-col`}
        >
          <div className="flex-1">
            <div
              className={`flex ${
                sidebarOpen
                  ? "flex-col space-y-3 py-4 px-2 transition-all"
                  : "flex-col items-center py-4 space-y-3 transition-all"
              }`}
            >
              {sidebarAvatars.map((avatar, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    sidebarOpen
                      ? "space-x-3 p-2 m-0 rounded-lg hover:bg-accent cursor-pointer transition-all"
                      : "p-2 m-0 rounded-lg hover:bg-accent cursor-pointer transition-all"
                  }`}
                >
                  <Avatar className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                    <AvatarImage src={avatar || "/placeholder.svg"} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  {sidebarOpen && (
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        Channel {index + 1}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Active now
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Profile Section */}
          <div
            className={`border-t border-border ${sidebarOpen ? "p-4" : "p-2"}`}
          >
            <div
              className={`flex items-center ${
                sidebarOpen ? "space-x-3" : "flex-col space-y-2"
              }`}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src="/person-with-glasses.png" />
                <AvatarFallback>
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              {sidebarOpen && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {user?.username || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              )}
              <div
                className={`flex ${
                  sidebarOpen ? "space-x-1" : "flex-col space-y-1"
                }`}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-accent"
                  title="Settings"
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-accent"
                  onClick={handleLogoutClick}
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Find a Channel"
                className="pl-10 bg-background border-border w-full"
              />
            </div>
            <Button
              variant="ghost"
              className="text-muted-foreground self-start sm:self-auto"
            >
              <span className="mr-2 hidden sm:inline">Last active</span>
              <span className="mr-2 sm:hidden">Filter</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Channel Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="bg-card border border-border rounded-lg p-4 hover:bg-accent transition-all duration-200 cursor-pointer hover:shadow-md hover:border-primary/20 group"
              >
                <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="relative flex-shrink-0">
                    <Avatar className="h-14 w-14 sm:h-12 sm:w-12">
                      <AvatarImage src={channel.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">
                        {channel.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-card group-hover:border-accent transition-colors"></div>
                  </div>
                  <div className="flex-1 min-w-0 w-full">
                    <h3 className="font-semibold text-foreground mb-2 text-lg sm:text-base">
                      {channel.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm">
                          {channel.online} online
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm">
                          {channel.members} members
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      <p className="hidden sm:block">
                        Last seen: {channel.lastSeen}
                      </p>
                      <p className="sm:hidden">Active • {channel.lastSeen}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};
