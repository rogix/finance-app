"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { User } from "@/app/types";

type UseAuthOptions = {
  redirectProtected?: boolean;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectProtected = false } = options || {};
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const logout = useCallback(() => {
    localStorage.removeItem("session");
    setUser(null);
    router.push("/login");
  }, [router]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const sessionStr = localStorage.getItem("session");
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session.expiresAt > Date.now()) {
          setUser(session.user);

          const timeout = session.expiresAt - Date.now();
          timer = setTimeout(() => {
            logout();
          }, timeout);

          return () => {
            clearTimeout(timer);
          };
        }
      } catch (error) {
        console.error("Error parsing session", error);
      }
    }
    setUser(null);

    if (redirectProtected && !["/", "/login", "/register"].includes(pathname)) {
      router.push("/login");
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [logout, pathname, redirectProtected, router]);



  return { user, logout };
}