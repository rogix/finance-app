import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthRedirect() {
    const router = useRouter();

    useEffect(() => {
        const sessionStr = localStorage.getItem("session");
        if (sessionStr) {
            try {
                const session = JSON.parse(sessionStr);
                if (session.expiresAt > Date.now()) {
                    router.push("/dashboard");
                }
            } catch (error) {
                console.error("Error parsing session", error);
            }
        }
    }, [router]);
}