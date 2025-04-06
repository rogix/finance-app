"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/app/types";

const USERS_KEY = "users";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

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
    <div className="container mx-auto">
      <section className="flex flex-col p-10 min-h-96 mt-40 bg-cyan-900 rounded-2xl w-96 mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Cadastrar</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label>Usuário:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label>E-mail:</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
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
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
            type="submit"
          >
            Cadastrar
          </button>
        </form>
        {message && <p>{message}</p>}
        <p className="mt-4 text-center">
          Já possui conta?{" "}
          <a
            href="/login"
            className="text-cyan-500 hover:underline font-bold text-sm"
          >
            Login
          </a>
        </p>
      </section>
    </div>
  );
}
