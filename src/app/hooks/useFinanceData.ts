"use client";
import { useState, useEffect } from "react";

export type Quote = {
    id: string;
    name: string;
    type: "currency" | "stock";
    price: number;
    variation: number;
};

export type PricePoint = {
    timestamp: number;
    price: number;
};

export function useFinanceData() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [priceHistory, setPriceHistory] = useState<Record<string, PricePoint[]>>({});

    async function fetchFinanceData() {
        try {
            const res = await fetch("api/finance");
            if (!res.ok) {
                throw new Error(`Erro na requisição: ${res.status}`);
            }
            const data = await res.json();
            const quotesArray: Quote[] = [];

            if (data.results?.currencies) {
                const currencies = data.results.currencies;
                for (const key in currencies) {
                    if (key === "source") continue;
                    const currency = currencies[key];
                    if (
                        currency &&
                        currency.buy !== undefined &&
                        currency.variation !== undefined
                    ) {
                        quotesArray.push({
                            id: key,
                            name: currency.name,
                            type: "currency",
                            price: currency.buy,
                            variation: currency.variation,
                        });
                    }
                }
            }

            if (data.results?.stocks) {
                const stocks = data.results.stocks;
                for (const key in stocks) {
                    const stock = stocks[key];
                    if (
                        stock &&
                        stock.points !== undefined &&
                        stock.variation !== undefined
                    ) {
                        quotesArray.push({
                            id: key,
                            name: stock.name,
                            type: "stock",
                            price: stock.points,
                            variation: stock.variation,
                        });
                    }
                }
            }

            const limitedQuotes = quotesArray.slice(0, 10);
            setQuotes(limitedQuotes);

            setPriceHistory((prevHistory) => {
                const newHistory = { ...prevHistory };
                const timestamp = Date.now();
                limitedQuotes.forEach((q) => {
                    if (newHistory[q.id]) {
                        newHistory[q.id] = [
                            ...newHistory[q.id],
                            { timestamp, price: q.price },
                        ];
                    } else {
                        newHistory[q.id] = [{ timestamp, price: q.price }];
                    }
                });
                return newHistory;
            });
            setError(null);
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Erro ao buscar dados:", err);
                setError(err.message);
            } else {
                console.error("Erro ao buscar dados:", err);
                setError("Erro ao buscar dados.");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFinanceData();
        const interval = setInterval(fetchFinanceData, 60000);
        return () => clearInterval(interval);
    }, []);

    return { quotes, loading, error, priceHistory };
}