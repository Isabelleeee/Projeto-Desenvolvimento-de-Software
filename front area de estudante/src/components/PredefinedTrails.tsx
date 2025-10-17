import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BookOpen, Code, Database, Brain, Calculator, Lightbulb } from "lucide-react";

interface Trail {
  id: string;
  title: string;
  description: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  icon: any;
  totalSteps: number;
}

const predefinedTrails: Trail[] = [
  {
    id: "1",
    title: "Matemática Básica",
    description: "Fundamentos de matemática essenciais para qualquer área",
    level: "Iniciante",
    icon: Calculator,
    totalSteps: 10,
  },
  {
    id: "2",
    title: "Lógica de Programação",
    description: "Aprenda os conceitos fundamentais da programação",
    level: "Iniciante",
    icon: Lightbulb,
    totalSteps: 12,
  },
  {
    id: "3",
    title: "Estruturas de Dados",
    description: "Domine estruturas de dados e algoritmos essenciais",
    level: "Intermediário",
    icon: Database,
    totalSteps: 15,
  },
  {
    id: "4",
    title: "Python Fundamentals",
    description: "Aprenda Python do zero até o nível intermediário",
    level: "Iniciante",
    icon: Code,
    totalSteps: 14,
  },
  {
    id: "5",
    title: "Machine Learning Básico",
    description: "Introdução aos conceitos de aprendizado de máquina",
    level: "Avançado",
    icon: Brain,
    totalSteps: 20,
  },
  {
    id: "6",
    title: "Desenvolvimento Web",
    description: "HTML, CSS e JavaScript para criar sites modernos",
    level: "Iniciante",
    icon: BookOpen,
    totalSteps: 18,
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Iniciante":
      return "bg-green-100 text-green-700 border-green-200";
    case "Intermediário":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Avançado":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

interface PredefinedTrailsProps {
  onNavigate: (page: string) => void;
}

export function PredefinedTrails({ onNavigate }: PredefinedTrailsProps) {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="mb-2">Trilhas Pré-definidas</h1>
        <p className="text-muted-foreground">
          Escolha uma trilha criada por especialistas e comece sua jornada de aprendizado
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {predefinedTrails.map((trail) => {
          const Icon = trail.icon;
          return (
            <Card key={trail.id} className="p-6 hover:shadow-lg transition-all hover:border-primary/40 cursor-pointer group">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mb-2">{trail.title}</h3>
                <p className="text-muted-foreground mb-4">{trail.description}</p>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className={getLevelColor(trail.level)}>
                  {trail.level}
                </Badge>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{trail.totalSteps} etapas</span>
              </div>

              <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Iniciar Trilha
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
