import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export function CriarTrilhaIAPage() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGerarTrilha = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Trilha criada com sucesso! (Simulação)");
    }, 2000);
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center px-8">
      {/* 🔹 BLOCO INVISÍVEL ENTRE SIDEBAR E CONTEÚDO */}
      <div className="w-20"></div>

      {/* 🔹 CONTEÚDO PRINCIPAL */}
      <div className="flex flex-col w-full max-w-3xl space-y-8 text-center">
        {/* Cabeçalho */}
        <div>
          <div className="h-20"></div>
          <Sparkles size={48} className="text-[#C7A3FF] mx-auto mb-4" />
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
            Crie sua Trilha Personalizada
          </h1>
          <p className="text-gray-400 mt-2">
            Descreva seu objetivo e deixe nossa IA montar o plano de estudos.
          </p>
        </div>

        {/* Caixa principal */}
        <div className="rounded-3xl p-6 lg:p-8 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10 text-left">
          <label htmlFor="prompt-ia" className="block text-white text-lg mb-3">
            Meu objetivo é...
          </label>
          <Textarea
            id="prompt-ia"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Quero aprender a criar aplicativos web com React e Django."
            className="rounded-2xl border-[#A8C5FF]/10 bg-white/5 text-white placeholder:text-gray-500 min-h-[150px] text-base"
          />
          <Button
            onClick={handleGerarTrilha}
            disabled={isLoading || !prompt}
            className="w-full mt-6 py-6 rounded-2xl text-lg bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white hover:shadow-lg hover:shadow-[#6A00FF]/30 transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Sparkles size={20} /> Gerar Trilha
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
