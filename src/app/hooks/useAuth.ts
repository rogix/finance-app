"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, deleteSession } from "@/app/lib/session";
import { User } from "@/app/types";

export function useAuth() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const session = getSession();
        if (!session || session.expiresAt < Date.now()) {
            deleteSession();
            router.push("/login");
        } else {
            setUser(session.user);
            const remainingTime = session.expiresAt - Date.now();
            const timer = setTimeout(() => {
                alert("Sessão expirada. Você será deslogado.");
                deleteSession();
                router.push("/login");
            }, remainingTime);
            return () => clearTimeout(timer);
        }
    }, [router]);

    const logout = () => {
        deleteSession();
        router.push("/login");
    };

    return { user, logout };
}