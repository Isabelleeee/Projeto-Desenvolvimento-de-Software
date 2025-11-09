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

const trails: Trail[] = [
  { id: "1", name: "Lógica de Programação", progress: 65, status: "Em andamento", totalSteps: 12, completedSteps: 8 },
  { id: "2", name: "Estruturas de Dados", progress: 30, status: "Em andamento", totalSteps: 15, completedSteps: 4 },
  { id: "3", name: "Python para Automação", progress: 45, status: "Em andamento", totalSteps: 10, completedSteps: 5 },
  { id: "4", name: "HTML e CSS Básico", progress: 100, status: "Concluída", totalSteps: 8, completedSteps: 8 },
  { id: "5", name: "JavaScript Fundamentals", progress: 100, status: "Concluída", totalSteps: 14, completedSteps: 14 },
];

const overallProgress = Math.round(trails.reduce((acc, t) => acc + t.progress, 0) / trails.length);

const chartData = [
  { name: "Concluído", value: overallProgress, color: "#6A00FF" },
  { name: "Restante", value: 100 - overallProgress, color: "#2A2A40" },
];

export function ProgressoAlunoPage() {
  const completedTrails = trails.filter((t) => t.status === "Concluída").length;
  const activeTrails = trails.filter((t) => t.status === "Em andamento").length;

  return (
    <div className="flex min-h-screen bg-[#0A0A1E] text-white">
      {/* 🔹 BLOCO INVISÍVEL LATERAL */}
      <div className="w-40 h-full"></div>

      {/* 🔹 CONTEÚDO PRINCIPAL */}
      <div className="flex-1 px-8 py-10">
        <div className="h-10"></div>
        <div className="text-center mb-10">
          <TrendingUp size={40} className="text-[#C7A3FF] mx-auto mb-3" />
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
            Meu Progresso
          </h1>
          <p className="text-gray-400 mt-2">Acompanhe sua evolução e conquistas</p>
          <div className="h-10"></div>
        </div>

        {/* Cards resumo */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 bg-white/5 border border-[#A8C5FF]/10 backdrop-blur-xl shadow-lg shadow-[#6A00FF]/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#6A00FF]/20 rounded-lg">
                <Trophy className="w-5 h-5 text-[#C7A3FF]" />
              </div>
              <span className="text-gray-300">Progresso Geral</span>
            </div>
            <div className="text-3xl">{overallProgress}%</div>
          </Card>

          <Card className="p-6 bg-white/5 border border-[#A8C5FF]/10 backdrop-blur-xl shadow-lg shadow-[#6A00FF]/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-gray-300">Concluídas</span>
            </div>
            <div className="text-3xl">{completedTrails}</div>
          </Card>

          <Card className="p-6 bg-white/5 border border-[#A8C5FF]/10 backdrop-blur-xl shadow-lg shadow-[#6A00FF]/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-gray-300">Em Andamento</span>
            </div>
            <div className="text-3xl">{activeTrails}</div>
          </Card>

          <Card className="p-6 bg-white/5 border border-[#A8C5FF]/10 backdrop-blur-xl shadow-lg shadow-[#6A00FF]/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <BookOpen className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-gray-300">Total de Trilhas</span>
            </div>
            <div className="text-3xl">{trails.length}</div>
          </Card>
          <div className="h-10"></div>
        </div>

        {/* Gráfico + Detalhamento */}
        <div className="grid gap-6 mb-8 lg:grid-cols-3">
          {/* Gráfico */}
          <Card className="p-6 lg:col-span-1 bg-white/5 border border-[#A8C5FF]/10 backdrop-blur-xl shadow-lg shadow-[#6A00FF]/10">
            <h2 className="mb-6 text-lg text-[#C7A3FF] font-semibold">Progresso Geral</h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <div className="text-3xl mb-1 text-white">{overallProgress}%</div>
              <p className="text-gray-400">Concluído</p>
            </div>
          </Card>

          {/* Detalhamento */}
          <Card className="p-6 lg:col-span-2 bg-white/5 border border-[#A8C5FF]/10 backdrop-blur-xl shadow-lg shadow-[#6A00FF]/10">
            <h2 className="mb-6 text-lg text-[#C7A3FF] font-semibold">Detalhamento por Trilha</h2>
            <div className="space-y-4">
              {trails.map((trail) => (
                <div key={trail.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="mb-1 text-white">{trail.name}</h4>
                      <p className="text-gray-400 text-sm">
                        {trail.completedSteps} de {trail.totalSteps} etapas
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        trail.status === "Concluída"
                          ? "bg-green-500/20 text-green-300 border-green-500/20"
                          : "bg-blue-500/20 text-blue-300 border-blue-500/20"
                      }`}
                    >
                      {trail.status}
                    </Badge>
                  </div>
                  {/* 🔹 Aqui muda a cor da barra */}
                  <ProgressBar value={trail.progress} className="h-2 bg-[#1A1A2E]" style={{ backgroundColor: "#FFFFFF" }} />
                  <div className="text-right text-gray-400 text-sm">{trail.progress}%</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
