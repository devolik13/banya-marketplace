"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSignup: () => void;
}

export const LoginModal = ({ open, onClose, onSignup }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      onClose();
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-accent to-card p-6">
          <DialogHeader className="space-y-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full mx-auto">
              <LogIn className="h-6 w-6 text-primary-foreground" />
            </div>
            <DialogTitle className="text-2xl font-semibold text-center text-foreground">
              Добро пожаловать
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите ваш email"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Пароль
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите ваш пароль"
                className="w-full"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Вход...</span>
                </div>
              ) : (
                'Войти'
              )}
            </Button>

            <div className="text-center pt-4">
              <span className="text-sm text-muted-foreground">Нет аккаунта? </span>
              <button
                type="button"
                onClick={onSignup}
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 hover:underline"
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};