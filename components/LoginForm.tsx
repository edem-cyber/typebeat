"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle email/password login
  };

  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    try {
      setIsCallbackModalOpen(true);
      const response = await fetch(`/api/auth/login/${provider}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`${provider} login failed`);
      }

      const data = await response.json();
      console.log('Redirecting to:', data.url); // Log the URL
      window.location.href = data.url;
    } catch (error) {
      setIsCallbackModalOpen(false);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      toast.error(`${provider} login failed. Please try again.`);
    }
  };

  return (
    <div>
      <h2>Welcome back to AI Beats</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Email and Password Fields */}
        <button type="button" onClick={() => handleOAuthLogin('google')}>
          Sign in with Google
        </button>
      </form>

      <Dialog open={isCallbackModalOpen} onOpenChange={setIsCallbackModalOpen}>
        <DialogContent>
          <h2>Processing Login</h2>
          <p>Please wait while we complete your login...</p>
          {/* You can add a loading spinner here */}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};