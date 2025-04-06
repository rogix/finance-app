"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSession } from "@/app/lib/session";
import { User } from "@/app/types";

const USERS_KEY = "users";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

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

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usersStr = localStorage.getItem(USERS_KEY);
    const users: User[] = usersStr ? JSON.parse(usersStr) : [];

    const user = users.find(
      (u) =>
        (u.email === identifier || u.username === identifier) &&
        u.password === password
    );
    if (!user) {
      setError("Credenciais inválidas.");
      return;
    }

    createSession(user);
    router.push("/dashboard");
  };

  return (
    <div className="container mx-auto">
      <section className="flex flex-col p-10 h-96 mt-40 bg-cyan-900 rounded-2xl w-96 mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label>E-mail ou Usuário:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="mt-4 bg-cyan-500 text-white p-2 px-6 rounded"
            type="submit"
          >
            Entrar
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p className="mt-2">
          Não possui conta?{" "}
          <a
            href="/register"
            className="text-cyan-500 hover:underline font-bold text-sm"
          >
            Cadastrar
          </a>
        </p>
      </section>
    </div>
  );
}
