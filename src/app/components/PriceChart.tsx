"use client";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PricePoint } from "../hooks/useFinanceData";

type PriceChartProps = {
  data: PricePoint[];
  selectedQuote: {
    id: string;
    name: string;
    price: number;
    variation: number;
  } | null;
};

export default function PriceChart({ data, selectedQuote }: PriceChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="p-4 bg-gray-700 rounded">
        <p className="text-center text-gray-300">
          Sem dados para exibir o gráfico.
        </p>
      </div>
    );
  }

  const formattedData = data.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    price: point.price,
  }));

  return (
    <div className="p-4 bg-gray-700 rounded shadow">
      <h3 className="text-lg font-semibold mb-3 text-gray-100">
        Evolução de Preços – {selectedQuote?.name}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
          <XAxis dataKey="time" stroke="#D1D5DB" />
          <YAxis domain={["auto", "auto"]} stroke="#D1D5DB" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              color: "#F9FAFB",
            }}
            labelStyle={{ color: "#F9FAFB" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#06B6D4"
            strokeWidth={2}
            dot={{ r: 3, fill: "#06B6D4" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
