// src/components/MinhasTrilhasPage.tsx
import { BookOpen, Brain, Code, Database, Cpu, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export function MinhasTrilhasPage() {
  const trilhas = [
    {
      titulo: "Matemática Básica",
      descricao: "Fundamentos de matemática essenciais para qualquer área.",
      nivel: "Iniciante",
      etapas: 10,
      icone: <BookOpen className="text-[#A8C5FF]" size={26} />,
    },
    {
      titulo: "Lógica de Programação",
      descricao: "Aprenda os conceitos fundamentais da programação.",
      nivel: "Iniciante",
      etapas: 12,
      icone: <Code className="text-[#C7A3FF]" size={26} />,
    },
    {
      titulo: "Estruturas de Dados",
      descricao: "Domine estruturas de dados e algoritmos essenciais.",
      nivel: "Intermediário",
      etapas: 15,
      icone: <Database className="text-[#A8C5FF]" size={26} />,
    },
    {
      titulo: "Python Fundamentals",
      descricao: "Aprenda Python do zero até o nível intermediário.",
      nivel: "Iniciante",
      etapas: 14,
      icone: <Cpu className="text-[#C7A3FF]" size={26} />,
    },
    {
      titulo: "Machine Learning Básico",
      descricao: "Introdução aos conceitos de aprendizado de máquina.",
      nivel: "Avançado",
      etapas: 20,
      icone: <Brain className="text-[#A8C5FF]" size={26} />,
    },
    {
      titulo: "Desenvolvimento Web",
      descricao: "HTML, CSS e JavaScript para criar sites modernos.",
      nivel: "Iniciante",
      etapas: 18,
      icone: <Sparkles className="text-[#C7A3FF]" size={26} />,
    },
  ];

  return (
    <div className="flex flex-col w-full px-8 py-10">
      <div className="h-20"></div>

      <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent mb-4">
        Trilhas Pré-definidas
      </h1>
      <p className="text-gray-400 mb-10">
        Escolha uma trilha criada por especialistas e comece sua jornada de aprendizagem.
      </p>
      <div className="h-9"></div>

      {/* Primeira linha */}
      <div className="flex justify-center items-stretch">
        <TrilhaCard trilha={trilhas[0]} />
        <div className="w-10"></div>
        <TrilhaCard trilha={trilhas[1]} />
        <div className="w-10"></div>
        <TrilhaCard trilha={trilhas[2]} />
      </div>

      <div className="h-20"></div>

      {/* Segunda linha */}
      <div className="flex justify-center items-stretch">
        <TrilhaCard trilha={trilhas[3]} />
        <div className="w-10"></div>
        <TrilhaCard trilha={trilhas[4]} />
        <div className="w-10"></div>
        <TrilhaCard trilha={trilhas[5]} />
      </div>

      <div className="h-20"></div>
    </div>
  );
}

/* 🔹 Card isolado */
function TrilhaCard({ trilha }: any) {
  const getNivelStyle = (nivel: string) => {
    switch (nivel) {
      case "Iniciante":
        return {
          backgroundColor: "rgba(34,197,94,0.15)", // verde
          color: "#4ADE80",
          border: "1px solid rgba(74,222,128,0.3)",
        };
      case "Intermediário":
        return {
          backgroundColor: "rgba(255,216,77,0.2)", // amarelo
          color: "#FFD84D",
          border: "1px solid rgba(255,216,77,0.3)",
        };
      case "Avançado":
        return {
          backgroundColor: "rgba(239,68,68,0.15)", // vermelho
          color: "#F87171",
          border: "1px solid rgba(239,68,68,0.3)",
        };
      default:
        return {};
    }
  };

  return (
    <div className="flex-1 rounded-3xl border border-[#A8C5FF]/10 bg-white/5 backdrop-blur-xl p-6 shadow-lg shadow-[#6A00FF]/10 hover:scale-[1.01] transition-transform h-full flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-4">
          {trilha.icone}
          <span
            className="text-xs px-3 py-1 rounded-full font-medium"
            style={getNivelStyle(trilha.nivel)}
          >
            {trilha.nivel}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-white">{trilha.titulo}</h3>
        <p className="text-sm text-gray-400 mt-2">{trilha.descricao}</p>

        <div className="flex items-center justify-between mt-4 text-gray-400 text-sm">
          <span>{trilha.etapas} etapas</span>
        </div>
      </div>

      <Button className="mt-6 w-full bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white rounded-xl hover:shadow-lg hover:shadow-[#6A00FF]/30 transition-all">
        Iniciar Trilha
      </Button>
    </div>
  );
}
