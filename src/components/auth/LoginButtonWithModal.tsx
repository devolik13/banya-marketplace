"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { LoginModal } from "@/components/auth/LoginModal";

export const LoginButtonWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleNavigateToSignup = () => {
    setIsModalOpen(false);
    router.push("/signup");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (user) {
    return (
      <Button
        onClick={handleLogout}
        variant="outline"
        size="sm"
        className="inline-flex items-center gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors"
      >
        <LogOut className="h-4 w-4" />
        Выйти
      </Button>
    );
  }

  return (
    <>
      <Button
        onClick={handleLogin}
        size="sm"
        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <LogIn className="h-4 w-4" />
        Войти
      </Button>

      <LoginModal
        open={isModalOpen}
        onClose={closeModal}
        onSignup={handleNavigateToSignup}
      />
    </>
  );
};