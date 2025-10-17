import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { PlayCircle, Plus, Sparkles, Library } from "lucide-react";

interface Trail {
  id: string;
  name: string;
  progress: number;
  totalSteps: number;
  completedSteps: number;
}

const activeTrails: Trail[] = [
  {
    id: "1",
    name: "Lógica de Programação",
    progress: 65,
    totalSteps: 12,
    completedSteps: 8,
  },
  {
    id: "2",
    name: "Estruturas de Dados",
    progress: 30,
    totalSteps: 15,
    completedSteps: 4,
  },
  {
    id: "3",
    name: "Python para Automação",
    progress: 45,
    totalSteps: 10,
    completedSteps: 5,
  },
];

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="mb-2">Bem-vindo ao EstudaAI</h1>
        <p className="text-muted-foreground">
          Continue seus estudos ou inicie uma nova trilha de aprendizagem
        </p>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("predefined")}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Library className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2">Escolher Trilha Pré-definida</h3>
              <p className="text-muted-foreground mb-4">
                Explore trilhas criadas por especialistas em diversas áreas
              </p>
              <Button variant="outline" className="w-full">
                Explorar Trilhas
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-primary/5 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("create")}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-secondary/10 rounded-xl">
              <Sparkles className="w-6 h-6 text-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2">Criar Trilha com IA</h3>
              <p className="text-muted-foreground mb-4">
                Descreva seus objetivos e deixe a IA criar uma trilha personalizada
              </p>
              <Button variant="outline" className="w-full">
                Criar com IA
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2>Minhas Trilhas Ativas</h2>
        <Button variant="ghost" size="sm" onClick={() => onNavigate("progress")}>
          Ver todas
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {activeTrails.map((trail) => (
          <Card key={trail.id} className="p-6 hover:shadow-md transition-all hover:border-primary/30">
            <div className="mb-4">
              <h3 className="mb-2">{trail.name}</h3>
              <p className="text-muted-foreground">
                {trail.completedSteps} de {trail.totalSteps} etapas concluídas
              </p>
            </div>
            <Progress value={trail.progress} className="mb-4 h-2" />
            <div className="flex items-center justify-between">
              <span className="text-primary">{trail.progress}%</span>
              <Button size="sm" className="gap-2">
                <PlayCircle className="w-4 h-4" />
                Continuar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
