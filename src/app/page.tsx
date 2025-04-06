export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Cotação de ações</h1>
        <p className="text-center sm:text-left">
          Acesse a cotação de ações em tempo real e fique por dentro do mercado
          financeiro.
        </p>
        <div className="flex flex-col gap-[16px]">
          <a
            className="flex items-center gap-2 px-[16px] py-[8px] bg-[#0070f3] text-white rounded-md hover:bg-[#005bb5] transition-colors duration-200"
            href="/register"
          >
            Cadastrar
          </a>
          <a
            className="flex items-center gap-2 px-[16px] py-[8px] bg-[#0070f3] text-white rounded-md hover:bg-[#005bb5] transition-colors duration-200"
            href="/login"
          >
            Entrar
          </a>
        </div>
        <p className="text-center sm:text-left">
          Já possui uma conta? Faça login para acessar sua conta e acompanhar
          suas ações favoritas.
        </p>
        <p className="text-center sm:text-left">
          Não possui uma conta? Cadastre-se agora mesmo e comece a investir no
          mercado financeiro.
        </p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 px-[16px] py-[8px] bg-[#0070f3] text-white rounded-md hover:bg-[#005bb5] transition-colors duration-200"
          href="/dashboard"
        >
          Dashboard
        </a>
        <a
          className="flex items-center gap-2 px-[16px] py-[8px] bg-[#0070f3] text-white rounded-md hover:bg-[#005bb5] transition-colors duration-200"
          href="/api/auth/logout"
        >
          Logout
        </a>
      </footer>
    </div>
  );
}
