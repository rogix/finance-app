"use client";
import { useState, useEffect, useCallback } from "react";
import { INTERVAL_FETCH_TIME, MAX_ITEMS } from "@/app/config/constants";

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

    function processCurrencies(currencies: Record<string, { name: string; buy: number; variation: number }>) {
        const result: Quote[] = [];
        for (const key in currencies) {
            if (key === "source") continue;
            const currency = currencies[key];
            if (currency && currency.buy !== undefined && currency.variation !== undefined) {
                result.push({
                    id: key,
                    name: currency.name,
                    type: "currency",
                    price: currency.buy,
                    variation: currency.variation,
                });
            }
        }
        return result;
    }

    function processStocks(stocks: Record<string, { name: string; points: number; variation: number }>) {
        const result: Quote[] = [];
        for (const key in stocks) {
            const stock = stocks[key];
            if (stock && stock.points !== undefined && stock.variation !== undefined) {
                result.push({
                    id: key,
                    name: stock.name,
                    type: "stock",
                    price: stock.points,
                    variation: stock.variation,
                });
            }
        }
        return result;
    }

    const fetchFinanceData = useCallback(async () => {
        try {
            const res = await fetch("api/finance");
            if (!res.ok) {
                throw new Error(`Erro na requisição: ${res.status}`);
            }
            const data = await res.json();
            let quotesArray: Quote[] = [];

            if (data.results?.currencies) {
                quotesArray = quotesArray.concat(processCurrencies(data.results.currencies));
            }
            if (data.results?.stocks) {
                quotesArray = quotesArray.concat(processStocks(data.results.stocks));
            }

            const limitedQuotes = quotesArray.slice(0, MAX_ITEMS);
            setQuotes(limitedQuotes);

            setPriceHistory((prevHistory) => {
                const newHistory = { ...prevHistory };
                const timestamp = Date.now();
                limitedQuotes.forEach((q) => {
                    const entry = { timestamp, price: q.price };
                    newHistory[q.id] = newHistory[q.id] ? [...newHistory[q.id], entry] : [entry];
                });
                return newHistory;
            });

            setError(null);
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Erro ao buscar dados.";
            console.error("Erro ao buscar dados:", err);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    } , []);

    useEffect(() => {
        fetchFinanceData();
        const interval = setInterval(fetchFinanceData, INTERVAL_FETCH_TIME);
        return () => clearInterval(interval);
    }, [fetchFinanceData]);

    return { quotes, loading, error, priceHistory };
}