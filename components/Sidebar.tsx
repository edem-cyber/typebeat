// ... (previous imports)

export function Sidebar() {
  // ... (previous state and constants)

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      toast.success("Successfully logged out!");
      router.push("/login");
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Logout failed. Please try again.");
    }
  };

  // ... (rest of the component remains the same)
}

// ... (rest of the file remains the same)