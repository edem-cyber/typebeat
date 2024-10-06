"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NavbarMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border p-4 flex justify-between items-center">
      {navItems.map((item, index) => (
        <Link key={item.name} href={item.href} className="relative px-3 py-2">
          <span
            className={cn(
              "text-sm font-medium transition-colors",
              pathname === item.href
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            {item.name}
          </span>
          {pathname === item.href && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
              layoutId="navbar-indicator"
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 30,
              }}
            />
          )}
        </Link>
      ))}
    </nav>
  );
};

const navItems = [
  { name: "Home", href: "/" },
  { name: "Generate", href: "/generate" },
  { name: "My Beats", href: "/my-beats" },
  { name: "Explore", href: "/explore" },
  { name: "About", href: "/about" },
];

export default NavbarMenu;