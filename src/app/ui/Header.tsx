"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between w-full bg-gray-800 p-6 text-white fixed top-0 z-10">
      <h1 className="text-3xl font-bold">
        <Link href="/">Cotação de Ações</Link>
      </h1>
      <nav className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-lg">Olá, {user.username}</span>
            <button
              onClick={logout}
              className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link
              href="/register"
              className="px-5 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors"
            >
              Cadastrar
            </Link>
            <Link
              href="/login"
              className="px-5 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors"
            >
              Entrar
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
