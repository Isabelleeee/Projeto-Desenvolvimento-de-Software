// src/components/StudentDashboardPage.tsx
import { useEffect, useState } from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface Categoria {
  id: number;
  nome: string;
}

interface Etapa {
  id: number;
  titulo: string;
  descricao: string;
  ordem: number;
}

interface Trilha {
  id: number;
  titulo: string;
  descricao: string;
  categoria: Categoria;
  tipo: string;
  etapas?: Etapa[];
}

export function StudentDashboardPage() {
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("estudaai_token"); // ✅ chave corrigida
    const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

    const fetchTrilhas = async () => {
      try {
        const res = await fetch(`${API_BASE}/trilhas/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Token ${token}` } : {}),
          },
        });

        if (!res.ok) throw new Error(`Erro ${res.status} ao buscar trilhas`);

        const data = await res.json();

        // ✅ Corrige caso o backend use paginação
        const lista = Array.isArray(data) ? data : data.results || [];
        setTrilhas(lista);
      } catch (err: any) {
        console.error("❌ Erro ao carregar trilhas:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrilhas();
  }, []);

  return (
    <div className="flex flex-col w-full">
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

        {/* Ações principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            <Button
              className="w-fit bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white rounded-xl px-6 py-2 hover:shadow-lg hover:shadow-[#6A00FF]/30 transition-all"
              onClick={() => (window.location.href = "/explorar")}
            >
              Explorar Trilhas
            </Button>
          </div>

          <div className="rounded-3xl border border-[#A8C5FF]/10 bg-white/5 backdrop-blur-xl p-6 shadow-lg shadow-[#6A00FF]/10 hover:scale-[1.01] transition-transform">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Criar Trilha com IA
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Descreva seus objetivos e deixe a IA criar uma trilha personalizada.
                </p>
              </div>
              <Sparkles className="text-[#C7A3FF]" size={26} />
            </div>
            <Button className="w-fit bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white rounded-xl px-6 py-2 hover:shadow-lg hover:shadow-[#6A00FF]/30 transition-all">
              Criar com IA
            </Button>
          </div>
        </div>

        {/* Trilhas disponíveis */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Trilhas Disponíveis</h2>

          {loading ? (
            <p className="text-gray-400">Carregando trilhas...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : trilhas.length === 0 ? (
            <p className="text-gray-400">Nenhuma trilha encontrada.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trilhas.map((t) => (
                <div
                  key={t.id}
                  className="rounded-3xl border border-[#A8C5FF]/10 bg-white/5 backdrop-blur-xl p-6 shadow-lg shadow-[#6A00FF]/10 hover:scale-[1.01] transition-transform flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white">{t.titulo}</h3>
                    <p className="text-sm text-gray-400 mt-1">{t.descricao}</p>
                    <p className="text-xs text-[#A8C5FF] mt-2">
                      Categoria: {t.categoria?.nome || "Sem categoria"}
                    </p>
                    {t.etapas && t.etapas.length > 0 && (
                      <ul className="text-xs text-gray-300 mt-2 list-disc list-inside">
                        {t.etapas.map((e) => (
                          <li key={e.id}>{e.titulo}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <Button
                    onClick={() => (window.location.href = `/trilha/${t.id}`)}
                    className="mt-6 w-full bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white rounded-xl hover:shadow-lg hover:shadow-[#6A00FF]/30 transition-all"
                  >
                    Iniciar Trilha
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
