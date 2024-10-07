"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { IconHome, IconMusic, IconSearch, IconSettings, IconLogout } from '@tabler/icons-react';
import { api } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  user: any;
  onPageChange: (page: string) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ user, onPageChange }) => {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    setIsLogoutDialogOpen(true);
  };

  const confirmLogout = async () => {
    try {
      await api.auth.signOut();
      setIsLogoutDialogOpen(false);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const links = [
    { label: 'Home', href: '/', icon: <IconHome />, onClick: () => onPageChange('home') },
    { label: 'My Beats', href: '/my-beats', icon: <IconMusic />, onClick: () => onPageChange('my-beats') },
    { label: 'Explore', href: '/explore', icon: <IconSearch />, onClick: () => onPageChange('explore') },
    { label: 'Settings', href: '/settings', icon: <IconSettings />, onClick: () => onPageChange('settings') },
    { label: 'Logout', href: '#', icon: <IconLogout />, onClick: handleLogout },
  ];

  return (
    <>
      <Sidebar>
        <SidebarBody>
          {links.map((link) => (
            <SidebarLink key={link.label} link={link} onClick={link.onClick} />
          ))}
        </SidebarBody>
      </Sidebar>
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You will need to sign in again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
