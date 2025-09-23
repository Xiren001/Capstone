"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpenIcon, InfoIcon, LifeBuoyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
// Simple logo component for the navbar
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 324 323"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="88.1023"
        y="144.792"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 88.1023 144.792)"
        fill="currentColor"
      />
      <rect
        x="85.3459"
        y="244.537"
        width="151.802"
        height="36.5788"
        rx="18.2894"
        transform="rotate(-38.5799 85.3459 244.537)"
        fill="currentColor"
      />
    </svg>
  );
};

// Hamburger icon component
const HamburgerIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);
// Types
export interface Navbar02NavItem {
  href?: string;
  label: string;
  submenu?: boolean;
  type?: "description" | "simple" | "icon";
  items?: Array<{
    href: string;
    label: string;
    description?: string;
    icon?: string;
  }>;
}
export interface Navbar02Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: Navbar02NavItem[];
  signInText?: string;
  signInHref?: string;
  ctaText?: string;
  ctaHref?: string;
  onSignInClick?: () => void;
  onCtaClick?: () => void;
}
// Default navigation links
const defaultNavigationLinks: Navbar02NavItem[] = [
  { href: "/overview", label: "Overview" },
  {
    label: "Mission",
    submenu: true,
    type: "description",
    items: [
      {
        href: "/overview",
        label: "Overview",
        description:
          "Comrade is a secure, cross-platform communication and GPS system designed for the Philippine Army's internal coordination.",
      },
      {
        href: "/objectives",
        label: "Objectives",
        description:
          "Real-time field coordination. Decentralized, resilient ops, Encrypted voice & data.",
      },
      {
        href: "/users",
        label: "Users",
        description:
          "Infantry Units, Commanders, Support Teams, Dispatch/Control Center.",
      },
    ],
  },
  {
    label: "Tech Stack",
    submenu: true,
    type: "simple",
    items: [
      { href: "/frontend", label: "Frontend" },
      { href: "/backend", label: "Backend" },
      { href: "/security", label: "Security" },
      { href: "/infra", label: "Infra" },
    ],
  },
  {
    label: "Docs",
    submenu: true,
    type: "icon",
    items: [
      {
        href: "/getting-started",
        label: "Getting Started",
        icon: "BookOpenIcon",
      },
      { href: "/tutorials", label: "Tutorials", icon: "LifeBuoyIcon" },
      { href: "/about-us", label: "About Us", icon: "InfoIcon" },
    ],
  },
];
export const Navbar02 = React.forwardRef<HTMLElement, Navbar02Props>(
  (
    {
      className,
      logo = <Logo />,
      logoHref = "#",
      navigationLinks = defaultNavigationLinks,
      signInText = "Sign In",
      signInHref = "#signin",
      ctaText = "Secure Access",
      ctaHref = "/login",
      onSignInClick,
      onCtaClick,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();
    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768); // 768px is md breakpoint
        }
      };
      checkWidth();
      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      return () => {
        resizeObserver.disconnect();
      };
    }, []);
    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    return (
      <header
        ref={combinedRef}
        className={cn(
          "sticky top-0 z-50 w-full bg-transparent border-b lg:py-2 supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline",
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center w-full gap-2 px-2">
            {/* Mobile menu trigger */}
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-64 p-1">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-0">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index} className="w-full">
                          {link.submenu ? (
                            <>
                              <div className="text-muted-foreground px-2 py-1.5 text-xs font-medium">
                                {link.label}
                              </div>
                              <ul>
                                {link.items?.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <Link
                                      to={item.href}
                                      className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </>
                          ) : (
                            <Link
                              to={link.href || "#"}
                              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer no-underline"
                            >
                              {link.label}
                            </Link>
                          )}
                          {/* Add separator between different types of items */}
                          {index < navigationLinks.length - 1 &&
                            ((!link.submenu &&
                              navigationLinks[index + 1].submenu) ||
                              (link.submenu &&
                                !navigationLinks[index + 1].submenu) ||
                              (link.submenu &&
                                navigationLinks[index + 1].submenu &&
                                link.type !==
                                  navigationLinks[index + 1].type)) && (
                              <div
                                role="separator"
                                aria-orientation="horizontal"
                                className="bg-border -mx-1 my-1 h-px w-full"
                              />
                            )}
                        </NavigationMenuItem>
                      ))}
                      <div
                        role="separator"
                        aria-orientation="horizontal"
                        className="bg-border -mx-1 my-1 h-px w-full"
                      />
                      <div className="p-2">
                        <Button
                          size="sm"
                          className="w-full text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(ctaHref);
                            if (onCtaClick) onCtaClick();
                          }}
                        >
                          {ctaText}
                        </Button>
                      </div>
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}
            {/* Main nav */}
            <div className="flex items-center justify-between w-full gap-6">
              <Link
                to="/"
                className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors cursor-pointer"
              >
                <div className="text-2xl">{logo}</div>
                <span className="highrise text-xl tracking-wide sm:inline-block">
                  Comrade
                </span>
              </Link>
              {/* Navigation menu */}
              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        {link.submenu ? (
                          <>
                            <NavigationMenuTrigger>
                              {link.label}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              {link.type === "description" &&
                              link.label === "Mission" ? (
                                <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                  <div className="row-span-3">
                                    <NavigationMenuLink asChild>
                                      <Link
                                        to="/overview"
                                        className="flex h-full w-full select-none flex-col justify-center items-center text-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md cursor-pointer"
                                      >
                                        <div className="mb-3 text-xl font-medium">
                                          Com-rade
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                          Secure communication and GPS system
                                          for the Philippine Army's internal
                                          coordination.
                                        </p>
                                      </Link>
                                    </NavigationMenuLink>
                                  </div>
                                  {link.items?.map((item, itemIndex) => (
                                    <ListItem
                                      key={itemIndex}
                                      title={item.label}
                                      to={item.href}
                                      type={link.type}
                                    >
                                      {item.description}
                                    </ListItem>
                                  ))}
                                </div>
                              ) : link.type === "simple" ? (
                                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                  {link.items?.map((item, itemIndex) => (
                                    <ListItem
                                      key={itemIndex}
                                      title={item.label}
                                      to={item.href}
                                      type={link.type}
                                    >
                                      {item.description}
                                    </ListItem>
                                  ))}
                                </div>
                              ) : link.type === "icon" ? (
                                <div className="grid w-[400px] gap-3 p-4">
                                  {link.items?.map((item, itemIndex) => (
                                    <ListItem
                                      key={itemIndex}
                                      title={item.label}
                                      to={item.href}
                                      icon={item.icon}
                                      type={link.type}
                                    >
                                      {item.description}
                                    </ListItem>
                                  ))}
                                </div>
                              ) : (
                                <div className="grid gap-3 p-4">
                                  {link.items?.map((item, itemIndex) => (
                                    <ListItem
                                      key={itemIndex}
                                      title={item.label}
                                      to={item.href}
                                      type={link.type}
                                    >
                                      {item.description}
                                    </ListItem>
                                  ))}
                                </div>
                              )}
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href || "#"}
                              className={cn(
                                navigationMenuTriggerStyle(),
                                "cursor-pointer"
                              )}
                            >
                              {link.label}
                            </Link>
                          </NavigationMenuLink>
                        )}
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}
              {!isMobile && (
                <Button
                  size="sm"
                  className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(ctaHref);
                    if (onCtaClick) onCtaClick();
                  }}
                >
                  {ctaText}
                </Button>
              )}
            </div>
          </div>
          {/* Right side */}
          {/* <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              onClick={(e) => {
                e.preventDefault();
                if (onSignInClick) onSignInClick();
              }}
            >
              {signInText}
            </Button> 
          </div>*/}
        </div>
      </header>
    );
  }
);
Navbar02.displayName = "Navbar02";
// ListItem component for navigation menu items
const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & {
    title: string;
    icon?: string;
    type?: "description" | "simple" | "icon";
    children?: React.ReactNode;
  }
>(({ className, title, children, icon, type, to, ...props }, ref) => {
  const renderIconComponent = (iconName?: string) => {
    if (!iconName) return null;
    switch (iconName) {
      case "BookOpenIcon":
        return <BookOpenIcon className="h-5 w-5" />;
      case "LifeBuoyIcon":
        return <LifeBuoyIcon className="h-5 w-5" />;
      case "InfoIcon":
        return <InfoIcon className="h-5 w-5" />;
      default:
        return null;
    }
  };
  return (
    <NavigationMenuLink asChild>
      <Link
        ref={ref}
        to={to || "#"}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer",
          className
        )}
        {...props}
      >
        {type === "icon" && icon ? (
          <div className="flex items-start space-x-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              {renderIconComponent(icon)}
            </div>
            <div className="space-y-1">
              <div className="text-base font-medium leading-tight">{title}</div>
              {children && (
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {children}
                </p>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="text-base font-medium leading-none">{title}</div>
            {children && (
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            )}
          </>
        )}
      </Link>
    </NavigationMenuLink>
  );
});

ListItem.displayName = "ListItem";
export { Logo, HamburgerIcon };
