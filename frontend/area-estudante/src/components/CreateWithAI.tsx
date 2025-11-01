import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Sparkles, CheckCircle2, Circle } from "lucide-react";

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export function CreateWithAI() {
  const [objective, setObjective] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTrail, setGeneratedTrail] = useState<Step[] | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simula geração de trilha pela IA
    setTimeout(() => {
      setGeneratedTrail([
        {
          id: "1",
          title: "Fundamentos do Python",
          description: "Sintaxe básica, variáveis, tipos de dados e operadores",
          completed: false,
        },
        {
          id: "2",
          title: "Estruturas de Controle",
          description: "If/else, loops e estruturas condicionais",
          completed: false,
        },
        {
          id: "3",
          title: "Funções e Módulos",
          description: "Criação de funções reutilizáveis e organização de código",
          completed: false,
        },
        {
          id: "4",
          title: "Manipulação de Arquivos",
          description: "Leitura e escrita de arquivos, trabalho com CSV e JSON",
          completed: false,
        },
        {
          id: "5",
          title: "Bibliotecas para Automação",
          description: "Selenium, Beautiful Soup e outras ferramentas",
          completed: false,
        },
        {
          id: "6",
          title: "Projeto Prático",
          description: "Automação de tarefas repetitivas do dia a dia",
          completed: false,
        },
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h1>Criar Trilha com IA</h1>
        </div>
        <p className="text-muted-foreground">
          Descreva seus objetivos de aprendizado e nossa IA criará uma trilha personalizada para você
        </p>
      </div>

      <Card className="p-6 mb-6">
        <label htmlFor="objective" className="block mb-3">
          Descreva seu objetivo de aprendizado
        </label>
        <Textarea
          id="objective"
          placeholder="Exemplo: Quero aprender Python para automação de tarefas no trabalho..."
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          className="min-h-32 mb-4"
        />
        <Button
          className="w-full gap-2"
          onClick={handleGenerate}
          disabled={!objective || isGenerating}
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Gerando trilha...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Gerar Trilha com IA
            </>
          )}
        </Button>
      </Card>

      {generatedTrail && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2>Trilha Personalizada Gerada</h2>
              <p className="text-muted-foreground">Python para Automação</p>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              {generatedTrail.length} etapas
            </Badge>
          </div>

          {generatedTrail.map((step, index) => (
            <Card key={step.id} className="p-5 hover:shadow-md transition-all border-l-4 border-l-primary/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {step.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-muted-foreground">Etapa {index + 1}</span>
                  </div>
                  <h3 className="mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </Card>
          ))}

          <Button className="w-full mt-6" size="lg">
            Salvar e Começar Trilha
          </Button>
        </div>
      )}
    </div>
  );
}
