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
  {
    id: "1",
    name: "Lógica de Programação",
    progress: 65,
    status: "Em andamento",
    totalSteps: 12,
    completedSteps: 8,
  },
  {
    id: "2",
    name: "Estruturas de Dados",
    progress: 30,
    status: "Em andamento",
    totalSteps: 15,
    completedSteps: 4,
  },
  {
    id: "3",
    name: "Python para Automação",
    progress: 45,
    status: "Em andamento",
    totalSteps: 10,
    completedSteps: 5,
  },
  {
    id: "4",
    name: "HTML e CSS Básico",
    progress: 100,
    status: "Concluída",
    totalSteps: 8,
    completedSteps: 8,
  },
  {
    id: "5",
    name: "JavaScript Fundamentals",
    progress: 100,
    status: "Concluída",
    totalSteps: 14,
    completedSteps: 14,
  },
];

const overallProgress = Math.round(
  trails.reduce((acc, trail) => acc + trail.progress, 0) / trails.length
);

const chartData = [
  { name: "Concluído", value: overallProgress, color: "#6366f1" },
  { name: "Restante", value: 100 - overallProgress, color: "#e5e7eb" },
];

export function Progress() {
  const completedTrails = trails.filter((t) => t.status === "Concluída").length;
  const activeTrails = trails.filter((t) => t.status === "Em andamento").length;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="mb-2">Meu Progresso</h1>
        <p className="text-muted-foreground">Acompanhe sua evolução e conquistas</p>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <span className="text-muted-foreground">Progresso Geral</span>
          </div>
          <div className="text-3xl">{overallProgress}%</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-muted-foreground">Concluídas</span>
          </div>
          <div className="text-3xl">{completedTrails}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-muted-foreground">Em Andamento</span>
          </div>
          <div className="text-3xl">{activeTrails}</div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-muted-foreground">Total de Trilhas</span>
          </div>
          <div className="text-3xl">{trails.length}</div>
        </Card>
      </div>

      <div className="grid gap-6 mb-8 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-1">
          <h2 className="mb-6">Progresso Geral</h2>
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
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4">
            <div className="text-3xl mb-1">{overallProgress}%</div>
            <p className="text-muted-foreground">Concluído</p>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h2 className="mb-6">Detalhamento por Trilha</h2>
          <div className="space-y-4">
            {trails.map((trail) => (
              <div key={trail.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="mb-1">{trail.name}</h4>
                    <p className="text-muted-foreground">
                      {trail.completedSteps} de {trail.totalSteps} etapas
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      trail.status === "Concluída"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-blue-100 text-blue-700 border-blue-200"
                    }
                  >
                    {trail.status}
                  </Badge>
                </div>
                <ProgressBar value={trail.progress} className="h-2" />
                <div className="text-right text-muted-foreground">{trail.progress}%</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
