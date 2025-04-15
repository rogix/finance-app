"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/app/types";
import Link from "next/link";
import { useAuthRedirect } from "@/app/hooks/useAuthRedirect";

const USERS_KEY = "users";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useAuthRedirect();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usersStr = localStorage.getItem(USERS_KEY);
    const users: User[] = usersStr ? JSON.parse(usersStr) : [];

    if (users.some((u) => u.email === email || u.username === username)) {
      setMessage("Usuário ou e-mail já cadastrado.");
      return;
    }

    const newUser: User = { username, email, password };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setMessage("Cadastro realizado com sucesso! Redirecionando para login...");
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-5">
      <section className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Cadastrar
        </h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Usuário:</label>
            <input
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">E-mail:</label>
            <input
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Cadastrar
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-300">{message}</p>}
        <p className="mt-6 text-center">
          Já possui conta?{" "}
          <a
            href="/login"
            className="text-cyan-400 hover:underline font-semibold"
          >
            Login
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
