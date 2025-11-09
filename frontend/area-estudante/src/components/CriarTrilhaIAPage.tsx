import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export function CriarTrilhaIAPage() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trilhaGerada, setTrilhaGerada] = useState<any | null>(null);

  const handleGerarTrilha = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setTrilhaGerada(null);

    try {
      const token =
          localStorage.getItem("estudaai_token") ||
          sessionStorage.getItem("estudaai_token") ||
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("estudaai_token="))
            ?.split("=")[1];

      if (!token) {
        alert("⚠️ Token ausente. Faça login novamente.");
        setIsLoading(false);
        return;
      }

      const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

      const res = await fetch(`${API_BASE}/gerar-trilha-ia/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      // 🧩 Corrige erro de resposta HTML (mesma lógica do login)
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Erro ao conectar com o servidor.");
      }

      if (res.ok) {
        setTrilhaGerada(data);
      } else {
        console.error("Erro IA:", data);
        alert(data.detail || data.error || "Erro ao gerar trilha com IA.");
      }
    } catch (error: any) {
      console.error("Erro de rede:", error);
      alert(error.message || "Erro ao conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center px-8">
      <div className="flex flex-col w-full max-w-3xl space-y-8 text-center">
        <div>
          <Sparkles size={48} className="text-[#C7A3FF] mx-auto mb-4" />
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
            Crie sua Trilha Personalizada
          </h1>
          <p className="text-gray-400 mt-2">
            Descreva seu objetivo e deixe nossa IA montar o plano de estudos.
          </p>
        </div>

        <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10">
          <label htmlFor="prompt-ia" className="block text-white text-lg mb-3">
            Meu objetivo é...
          </label>
          <Textarea
            id="prompt-ia"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Quero aprender React com IA."
            className="rounded-2xl border-[#A8C5FF]/10 bg-white/5 text-white min-h-[150px]"
          />

          <Button
            onClick={handleGerarTrilha}
            disabled={isLoading || !prompt}
            className="w-full mt-6 py-6 rounded-2xl text-lg bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white hover:shadow-lg hover:shadow-[#6A00FF]/30 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <div className="flex items-center gap-2"><Sparkles size={20}/> Gerar Trilha</div>}
          </Button>
        </div>

        {trilhaGerada && (
          <div className="p-6 rounded-3xl bg-white/5 border border-[#A8C5FF]/10 text-left">
            <h2 className="text-xl font-semibold text-[#C7A3FF] mb-2">
              {trilhaGerada.titulo}
            </h2>
            <p className="text-gray-300 mb-4">{trilhaGerada.descricao}</p>
            <div className="space-y-3">
              {trilhaGerada.etapas?.map((etapa: any, i: number) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5">
                  <h3 className="text-white font-medium">
                    {etapa.ordem}. {etapa.titulo}
                  </h3>
                  <p className="text-gray-400 text-sm">{etapa.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}