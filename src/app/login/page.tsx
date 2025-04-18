"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSession } from "@/app/lib/session";
import { User } from "@/app/types";
import { useAuthRedirect } from "@/app/hooks/useAuthRedirect";

const USERS_KEY = "users";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useAuthRedirect();

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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-5">
      <section className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">
              E-mail ou Usuário:
            </label>
            <input
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Senha:</label>
            <input
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full p-3 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors"
            type="submit"
          >
            Entrar
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <p className="mt-6 text-center">
          Não possui conta?{" "}
          <a
            href="/register"
            className="text-cyan-400 hover:underline font-semibold"
          >
            Cadastrar
          </a>
        </p>
        <p className="mt-5 text-center">
          <Link
            href="/"
            className="text-yellow-700 hover:underline font-semibold"
          >
            Voltar para a página inicial
          </Link>
        </p>
      </section>
    </div>
  );
}
