// src/components/StudentDashboardPage.tsx
import { BookOpen, Sparkles } from "lucide-react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

export function StudentDashboardPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Bloco invisível para empurrar o conteúdo */}
      <div className="h-24 md:h-32"></div>

      <div className="space-y-10 px-8">
        {/* Cabeçalho */}
        <div className="mb-6">
          <div className="h-20"></div>
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
            Bem-vindo ao EstudaAI
          </h1>
          <p className="text-gray-400 mt-2">
            Continue seus estudos ou inicie uma nova trilha de aprendizagem.
          </p>
        </div>

        {/* Seção de ações principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="rounded-3xl border border-[#A8C5FF]/10 bg-white/5 backdrop-blur-xl p-6 shadow-lg shadow-[#6A00FF]/10 hover:scale-[1.01] transition-transform">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Escolher Trilha Pré-definida
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Explore trilhas criadas por especialistas em diversas áreas.
                </p>
              </div>
              <BookOpen className="text-[#A8C5FF]" size={26} />
            </div>
            <Button className="w-fit bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white rounded-xl px-6 py-2 hover:shadow-lg hover:shadow-[#6A00FF]/30 transition-all">
              Explorar Trilhas
            </Button>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-[#A8C5FF]/10 bg-white/5 backdrop-blur-xl p-6 shadow-lg shadow-[#6A00FF]/10 hover:scale-[1.01] transition-transform">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Criar Trilha com IA
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Descreva seus objetivos e deixe a IA criar uma trilha
                  personalizada.
                </p>
              </div>
              <Sparkles className="text-[#C7A3FF]" size={26} />
            </div>
            <Button className="w-fit bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white rounded-xl px-6 py-2 hover:shadow-lg hover:shadow-[#6A00FF]/30 transition-all">
              Criar com IA
            </Button>
          </div>
        </div>

        {/* BLOCO INVISÍVEL PRA EMPURRAR PRA BAIXO */}
        <div className="h-20 md:h-28"></div>

        {/* Trilhas Ativas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Minhas Trilhas Ativas
            </h2>
            <button className="text-sm text-[#A8C5FF] hover:text-[#C7A3FF] transition-colors">
              Ver todas
            </button>
          </div>

          {/* Cards das trilhas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                nome: "Lógica de Programação",
                etapas: "8 de 12 etapas concluídas",
                progresso: 65,
              },
              {
                nome: "Estruturas de Dados",
                etapas: "4 de 15 etapas concluídas",
                progresso: 30,
              },
              {
                nome: "Python para Automação",
                etapas: "5 de 10 etapas concluídas",
                progresso: 45,
              },
            ].map((t, i) => (
              <div
                key={i}
                className="rounded-3xl border border-[#A8C5FF]/10 bg-white/5 backdrop-blur-xl p-6 shadow-lg shadow-[#6A00FF]/10 flex flex-col justify-between hover:scale-[1.01] transition-transform"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white">{t.nome}</h3>
                  <p className="text-sm text-gray-400 mt-1">{t.etapas}</p>

                  {/* Barra de progresso lilás claro */}
                  <div className="mt-4 bg-[#1A1A2E] h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${t.progresso}%`,
                        backgroundColor: "#a5a5f0",
                      }}
                    ></div>
                  </div>

                  <p className="text-sm text-[#A8C5FF] mt-2">{t.progresso}%</p>
                </div>

                <Button className="mt-6 w-full bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white rounded-xl hover:shadow-lg hover:shadow-[#6A00FF]/30 transition-all">
                  Continuar
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
