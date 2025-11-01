import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Progress as ProgressBar } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Trophy, TrendingUp, BookOpen, CheckCircle } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface Trail {
  id: string;
  name: string;
  progress: number;
  status: "Em andamento" | "Concluída";
  totalSteps: number;
  completedSteps: number;
}

export function Progress() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/estudante/meu-progresso/", {
      credentials: "include", // necessário para enviar cookies/session
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição: " + response.statusText);
        }
        return response.json();
      })
      .then((data: Trail[]) => {
        setTrails(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const overallProgress = trails.length
    ? Math.round(
        trails.reduce((acc, trail) => acc + trail.progress, 0) / trails.length
      )
    : 0;

  const chartData = [
    { name: "Concluído", value: overallProgress, color: "#6366f1" },
    { name: "Restante", value: 100 - overallProgress, color: "#e5e7eb" },
  ];

  const completedTrails = trails.filter((t) => t.status === "Concluída").length;
  const activeTrails = trails.filter((t) => t.status === "Em andamento").length;

  if (loading) return <p>Carregando progresso...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h2>Acompanhe sua evolução e conquistas</h2>
      <Card>
        {/* Adapte o layout conforme seu design */}
        <p>Total de trilhas concluídas: {completedTrails}</p>
        <p>Trilhas em andamento: {activeTrails}</p>

        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              dataKey="value"
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              fill="#8884d8"
              paddingAngle={5}
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <ul>
          {trails.map((trail) => (
            <li key={trail.id}>
              <h3>{trail.name}</h3>
              <p>
                Progresso: {trail.progress}% - Status: {trail.status}
              </p>
              <p>
                {trail.completedSteps} de {trail.totalSteps} etapas concluídas
              </p>
              <ProgressBar value={trail.progress} />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
