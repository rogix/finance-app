"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { useFinanceData, Quote } from "@/app/hooks/useFinanceData";
import PriceChart from "@/app/components/PriceChart";
import Header from "@/app/components/Header";
import Loading from "@/app/components/Loader";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { quotes, loading, error, priceHistory } = useFinanceData();
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const router = useRouter();

  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, router, authLoading]);

  if (authLoading || !user) {
    return null;
  }

  const handleSelectQuote = (quote: Quote) => {
    setSelectedQuote(quote);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="container mx-auto py-8 px-5">
        {loading && <Loading />}
        {error && <p className="text-center text-red-500">Erro: {error}</p>}
        {!loading && !error && (
          <div className="flex flex-col md:flex-row gap-8">
            <section className="md:w-1/3 bg-gray-800 shadow rounded p-4">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-700">
                Cotações
              </h2>
              <ul className="space-y-3 max-h-96 overflow-y-auto">
                {quotes.map((quote) => (
                  <li
                    key={quote.id}
                    className="p-3 border border-gray-700 rounded cursor-pointer hover:bg-gray-700 transition"
                    onClick={() => handleSelectQuote(quote)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{quote.name}</span>
                      <span
                        className={`text-sm ${
                          quote.variation > 0
                            ? "text-green-500"
                            : quote.variation < 0
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        {quote.variation > 0 ? "+" : ""}
                        {quote.variation}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-300">
                      Preço:{" "}
                      <span className="font-medium">
                        {quote.price.toFixed(2)}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>
            <section className="md:w-2/3 bg-gray-800 shadow rounded p-6">
              {selectedQuote ? (
                <>
                  <div className="mb-4 border-b pb-2 border-gray-700">
                    <h2 className="text-2xl font-semibold">
                      Detalhes – {selectedQuote.name}
                    </h2>
                    <p className="mt-2 text-gray-300">
                      Preço atual:{" "}
                      <span
                        className={`font-medium ${
                          selectedQuote.variation > 0
                            ? "text-green-500"
                            : selectedQuote.variation < 0
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        {selectedQuote.price.toFixed(2)} (
                        {selectedQuote.variation > 0 ? "+" : ""}
                        {selectedQuote.variation})
                      </span>
                    </p>
                  </div>
                  <PriceChart
                    data={priceHistory[selectedQuote.id] || []}
                    selectedQuote={selectedQuote}
                  />
                </>
              ) : (
                <p className="text-center text-gray-300">
                  Selecione um item para ver detalhes
                </p>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
