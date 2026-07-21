"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/Auth/AuthContext";

/**
 * Provides the shared authentication and redirect behaviour for admin pages.
 * Individual pages can focus on their own data and UI once access is ready.
 */
export const useAdminAccess = () => {
  const { isAuthenticated, isAuthReady } = useAuth();
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang === "en" ? "en" : "ch";

  useEffect(() => {
    if (isAuthReady && !isAuthenticated) {
      router.replace(`/${lang}/admin`);
    }
  }, [isAuthReady, isAuthenticated, lang, router]);

  return { isAuthenticated, isAuthReady, lang, router };
};
