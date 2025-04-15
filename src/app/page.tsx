"use client";

import Header from "@/app/components/Header";
import Link from "next/link";
import { useAuthRedirect } from "@/app/hooks/useAuthRedirect";

export default function Home() {
  useAuthRedirect();

  return (
    <>
      <Header />

      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center text-center pt-40">
        <div className="px-6 py-12 relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Acesse cotações em tempo real
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Fique por dentro do mercado financeiro e faça investimentos mais
            informados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
            >
              Cadastrar
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 border border-cyan-600 text-cyan-600 rounded-md hover:bg-cyan-600 hover:text-white transition-colors"
            >
              Entrar
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#1F2937"
              fillOpacity="1"
              d="M0,256L48,250.7C96,245,192,235,288,218.7C384,203,480,181,576,170.7C672,160,768,160,864,165.3C960,171,1056,181,1152,181.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>
    </>
  );
}
