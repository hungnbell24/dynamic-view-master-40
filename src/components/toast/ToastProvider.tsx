
import React from "react";
import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "@/components/theme/ThemeProvider";

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const { theme } = useTheme();
  
  return (
    <>
      <SonnerToaster
        theme={theme as "light" | "dark" | "system"}
        className="toaster group"
        position="top-right"
        toastOptions={{
          classNames: {
            toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
            description: "group-[.toast]:text-muted-foreground",
            actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
            cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
            success: "group toast group-[.toaster]:bg-dashboard-green/90 group-[.toaster]:text-white group-[.toaster]:border-dashboard-green/50 group-[.toaster]:shadow-lg",
            error: "group toast group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground group-[.toaster]:border-destructive/50 group-[.toaster]:shadow-lg",
          },
        }}
        richColors
      />
      {children}
    </>
  );
}
