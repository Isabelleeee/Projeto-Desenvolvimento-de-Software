// src/components/TrilhaDetalhePage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Play, BookOpen, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

interface Etapa {
  id: number;
  titulo: string;
  descricao: string;
  ordem: number;
  video_url?: string;
  conteudo_texto?: string;
}

interface Trilha {
  id: number;
  titulo: string;
  descricao: string;
  categoria?: { nome: string };
  tipo?: string;
  etapas: Etapa[];
}

export function TrilhaDetalhePage() {
  const { id } = useParams();
  const [trilha, setTrilha] = useState<Trilha | null>(null);
  const [etapaSelecionada, setEtapaSelecionada] = useState<Etapa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/trilhas/`)
      .then((res) => res.json())
      .then((data) => {
        const t = data.find((trilha: Trilha) => trilha.id === Number(id));
        setTrilha(t);
        if (t?.etapas?.length) setEtapaSelecionada(t.etapas[0]);
      })
      .catch((err) => console.error("Erro ao carregar trilha:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-gray-400 p-6">Carregando trilha...</p>;
  if (!trilha) return <p className="text-gray-400 p-6">Trilha não encontrada.</p>;

  return (
    <div className="p-8 text-white space-y-10">
      <div>
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
          {trilha.titulo}
        </h1>
        <p className="text-gray-400 mt-2">{trilha.descricao}</p>
        <p className="text-xs text-[#A8C5FF] mt-1">
          Categoria: {trilha.categoria?.nome || "Sem categoria"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Etapas */}
        <div className="md:col-span-1 bg-[#0F0F2E]/60 border border-[#A8C5FF]/10 rounded-2xl p-4 space-y-3 h-fit">
          <h2 className="text-lg font-semibold mb-3">Etapas</h2>
          {trilha.etapas?.length ? (
            trilha.etapas.map((etapa) => (
              <button
                key={etapa.id}
                onClick={() => setEtapaSelecionada(etapa)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  etapaSelecionada?.id === etapa.id
                    ? "bg-gradient-to-r from-[#6A00FF]/30 to-[#C7A3FF]/30 text-white"
                    : "text-gray-400 hover:bg-[#A8C5FF]/5 hover:text-white"
                }`}
              >
                <BookOpen size={18} />
                <span className="text-sm">{etapa.titulo}</span>
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Nenhuma etapa cadastrada.</p>
          )}
        </div>

        {/* Conteúdo da Etapa */}
        <div className="md:col-span-2 bg-[#0F0F2E]/40 border border-[#A8C5FF]/10 rounded-3xl p-6 backdrop-blur-xl">
          {etapaSelecionada ? (
            <>
              <h3 className="text-2xl font-semibold mb-4">{etapaSelecionada.titulo}</h3>
              <p className="text-gray-300 mb-4">{etapaSelecionada.descricao}</p>

              {etapaSelecionada.video_url ? (
                <video
                  src={etapaSelecionada.video_url}
                  controls
                  className="w-full rounded-2xl mb-6 border border-[#A8C5FF]/10"
                />
              ) : (
                <div className="aspect-video w-full bg-[#1A1A3F] flex items-center justify-center rounded-2xl mb-6 border border-[#A8C5FF]/10">
                  <Play className="text-[#C7A3FF]" size={48} />
                </div>
              )}

              {etapaSelecionada.conteudo_texto && (
                <div className="text-gray-200 whitespace-pre-wrap leading-relaxed bg-[#11112A]/50 p-4 rounded-xl border border-[#A8C5FF]/10 mb-6">
                  {etapaSelecionada.conteudo_texto}
                </div>
              )}

              <Button
                className="bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white rounded-xl px-6 py-2 hover:shadow-lg hover:shadow-[#6A00FF]/30 transition-all"
                onClick={() => alert(`Etapa "${etapaSelecionada.titulo}" concluída!`)}
              >
                <CheckCircle2 size={18} className="mr-2" />
                Marcar como concluída
              </Button>
            </>
          ) : (
            <p className="text-gray-400">Selecione uma etapa para ver o conteúdo.</p>
          )}
        </div>
      </div>
    </div>
  );
}
