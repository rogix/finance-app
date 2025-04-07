"use client";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const sessionStr = localStorage.getItem("session");
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session.expiresAt > Date.now()) {
          setUser(session.user);
          return;
        }
      } catch (error) {
        console.error("Error parsing session", error);
      }
    }
    setUser(null);

    if (
      redirectProtected &&
      !["/", "/login", "/register"].includes(pathname)
    ) {
      router.push("/");
    }
  }, [pathname, redirectProtected, router]);

  const logout = () => {
    localStorage.removeItem("session");
    setUser(null);
    router.push("/");
  };

  return { user, logout };
}
