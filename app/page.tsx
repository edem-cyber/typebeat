"use client";

import { useState, useEffect } from 'react';
import { Sidebar, SidebarLink } from '@/components/ui/sidebar';
import { useRouter } from 'next/navigation';
import { IconLogin, IconLogin2, IconLogout, IconMusic, IconSearch, IconSettings } from '@tabler/icons-react';

const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check user authentication status (this is just a placeholder)
    const checkAuth = async () => {
      // Replace with your actual authentication check logic
      const response = await fetch('/api/auth/check'); // Example API call
      const user = await response.json();
      setIsLoggedIn(user.isLoggedIn);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login'); // Redirect to login page after logout
  };

  const links = isLoggedIn
    ? [
        { label: 'My Beats', href: '/my-beats', icon: <IconMusic /> },
        { label: 'Explore', href: '/explore', icon: <IconSearch /> },
        { label: 'Settings', href: '/settings', icon: <IconSettings /> },
        { label: 'Logout', href: '#', icon: <IconLogout />, onClick: handleLogout },
      ]
    : [
        { label: 'Login', href: '/login', icon: <IconLogin /> },
        { label: 'Signup', href: '/signup', icon: <IconLogin2 /> },
      ];

  return (
    <Sidebar>
      {links.map((link) => (
        <SidebarLink key={link.label} link={link} />
      ))}
    </Sidebar>
  );
};

export default MainPage;