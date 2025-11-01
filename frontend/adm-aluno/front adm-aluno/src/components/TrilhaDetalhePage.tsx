// src/components/TrilhaDetalhePage.tsx

import { useParams } from "react-router-dom";
import { Clock } from "lucide-react";
import { Progress } from "./ui/progress"; //
import { Checkbox } from "./ui/checkbox"; //
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

// --- (Dados de exemplo) ---
const trilhaDetalhe = {
  id: 1, titulo: 'Introdução ao Python', descricao: 'Aprenda os fundamentos da linguagem...', progresso: 40, duracao: '40 horas',
  modulos: [
    { id: 'm1', titulo: 'Módulo 1: Fundamentos',
      etapas: [
        { id: 'e1', nome: 'O que é Python?', concluida: true },
        { id: 'e2', nome: 'Instalando o Ambiente', concluida: true },
        { id: 'e3', nome: 'Variáveis e Tipos de Dados', concluida: false },
      ]
    },
    { id: 'm2', titulo: 'Módulo 2: Estruturas de Controle',
      etapas: [{ id: 'e4', nome: 'Condicionais (if/else)', concluida: false }]
    },
  ]
};
// --- (Fim dos dados de exemplo) ---

export function TrilhaDetalhePage() {
  const { id: trilhaId } = useParams(); // Pega o ID da URL
  const trilha = trililhaDetalhe; // (Busque no backend usando o trilhaId)

  return (
    <div className="space-y-8">
      <div className="rounded-3xl p-6 lg:p-8 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10">
        <h1 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent mb-3">{trilha.titulo}</h1>
        <p className="text-gray-400 mt-2 max-w-3xl">{trilha.descricao}</p>
        <div className="flex items-center gap-4 mt-4 text-gray-300">
          <div className="flex items-center gap-2"><Clock size={16} className="text-[#A8C5FF]" /><span>{trilha.duracao}</span></div>
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-400 mb-1"><span>Progresso</span><span>{trilha.progresso}%</span></div>
          <Progress value={trilha.progresso} className="h-3" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-white text-2xl">Conteúdo da Trilha</h2>
        <Accordion type="single" collapsible defaultValue="m1" className="w-full">
          {trilha.modulos.map((modulo) => (
            <AccordionItem key={modulo.id} value={modulo.id} className="rounded-2xl bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10 mb-4 px-6">
              <AccordionTrigger className="text-white text-lg hover:no-underline">{modulo.titulo}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-4">
                  {modulo.etapas.map((etapa) => (
                    <div key={etapa.id} className="flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-[#A8C5FF]/10">
                      <Checkbox id={`etapa-${etapa.id}`} checked={etapa.concluida} className="data-[state=checked]:bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] border-[#A8C5FF]/30"/>
                      <label htmlFor={`etapa-${etapa.id}`} className={`text-sm ${etapa.concluida ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                        {etapa.nome}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}