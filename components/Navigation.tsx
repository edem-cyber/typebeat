"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Generate', href: '/generate' },
    { name: 'My Beats', href: '/my-beats' },
    { name: 'Explore', href: '/explore' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <Button variant="default">Get started - free</Button>
    </nav>
  );
};

export default Navigation;