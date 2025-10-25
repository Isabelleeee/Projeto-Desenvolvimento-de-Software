import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BookOpen, Code, Database, Brain, Calculator, Lightbulb, HelpCircle } from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api/trilhas/";

interface ApiTrail {
  id: number;
  titulo: string;
  descricao: string;
  categoria: { nome: string } | null;
  duracao_estimada: number;
}

interface Trail {
  id: string;
  title: string;
  description: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  icon: any;
  totalSteps: number;
}

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
  const [trails, setTrails] = useState<Trail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`Falha ao buscar trilhas: ${response.statusText}`);
        }

        const apiData: ApiTrail[] = await response.json();

        const formattedTrails: Trail[] = apiData.map(apiTrail => {
          let icon = HelpCircle;
          if (apiTrail.categoria?.nome?.toLowerCase().includes("programa")) icon = Code;
          if (apiTrail.categoria?.nome?.toLowerCase().includes("matem")) icon = Calculator;
          if (apiTrail.categoria?.nome?.toLowerCase().includes("dados")) icon = Database;
          if (apiTrail.categoria?.nome?.toLowerCase().includes("web")) icon = BookOpen;
          if (apiTrail.categoria?.nome?.toLowerCase().includes("machine") || apiTrail.categoria?.nome?.toLowerCase().includes("ia")) icon = Brain;

          let level: "Iniciante" | "Intermediário" | "Avançado" = "Iniciante";
          if (apiTrail.duracao_estimada > 60) level = "Intermediário";
          if (apiTrail.duracao_estimada > 120) level = "Avançado";

          const totalSteps = apiTrail.duracao_estimada > 0 ? Math.max(5, Math.round(apiTrail.duracao_estimada / 15)) : 5;

          return {
            id: String(apiTrail.id),
            title: apiTrail.titulo,
            description: apiTrail.descricao,
            level: level,
            icon: icon,
            totalSteps: totalSteps,
          };
        });

        setTrails(formattedTrails);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Ocorreu um erro desconhecido";
        setError(errorMessage);
        console.error("Erro ao buscar ou processar trilhas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrails();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Carregando trilhas...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">Erro ao carregar trilhas: {error}</div>;
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="mb-2">Trilhas Pré-definidas</h1>
        <p className="text-muted-foreground">
          Escolha uma trilha criada por especialistas e comece sua jornada de aprendizado
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trails.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">Nenhuma trilha encontrada.</p>
        ) : (
          trails.map((trail) => {
            const Icon = trail.icon;
            return (
              <Card key={trail.id} className="p-6 hover:shadow-lg transition-all hover:border-primary/40 cursor-pointer group flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="mb-2 line-clamp-2">{trail.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{trail.description}</p>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className={`${getLevelColor(trail.level)} text-xs px-2 py-0.5`}>
                      {trail.level}
                    </Badge>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-muted-foreground text-xs">{trail.totalSteps} etapas</span>
                  </div>
                </div>

                <Button className="w-full mt-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Iniciar Trilha
                </Button>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}