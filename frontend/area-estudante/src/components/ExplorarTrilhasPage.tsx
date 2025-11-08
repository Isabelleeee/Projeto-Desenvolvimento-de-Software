// src/components/ExplorarTrilhasPage.tsx
import { useEffect, useState } from "react";
import { Search, Clock, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Categoria {
  id: number;
  nome: string;
}

interface Trilha {
  id: number;
  titulo: string;
  descricao: string;
  categoria: Categoria;
  tipo: string;
  duracao_estimada?: number;
}

export function ExplorarTrilhasPage() {
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("todas");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("estudaai_token"); // ✅ chave corrigida
    const API_BASE =
      import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

    const fetchTrilhas = async () => {
      try {
        const res = await fetch(`${API_BASE}/trilhas/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Token ${token}` } : {}),
          },
        });

        if (!res.ok)
          throw new Error(`Erro ao buscar trilhas (HTTP ${res.status})`);

        const data = await res.json();

        // ✅ Corrige paginação automática
        const lista = Array.isArray(data) ? data : data.results || [];
        setTrilhas(lista);
      } catch (err: any) {
        console.error("❌ Erro ao carregar trilhas:", err);
        setError(err.message || "Erro desconhecido ao carregar trilhas");
      } finally {
        setLoading(false);
      }
    };

    fetchTrilhas();
  }, []);

  const trilhasFiltradas = trilhas.filter((t) => {
    const matchTitulo = t.titulo
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchCategoria =
      filterCategoria === "todas" || t.categoria?.nome === filterCategoria;
    return matchTitulo && matchCategoria;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
          Explorar Trilhas
        </h1>
        <p className="text-gray-400 mt-2">
          Encontre seu próximo desafio e continue aprendendo!
        </p>
      </div>

      {/* 🔍 Filtros */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            type="search"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 rounded-2xl border-[#A8C5FF]/10 bg-white/5 text-white placeholder:text-gray-500"
          />
        </div>

        <Select value={filterCategoria} onValueChange={setFilterCategoria}>
          <SelectTrigger className="md:w-[200px] rounded-2xl border-[#A8C5FF]/10 bg-white/5 text-white">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent className="bg-[#0A0A1E]/90 backdrop-blur-md border-[#A8C5FF]/20 text-white">
            <SelectItem value="todas">Todas as Categorias</SelectItem>
            {[...new Set(trilhas.map((t) => t.categoria?.nome))].map(
              (cat, i) =>
                cat && (
                  <SelectItem key={i} value={cat}>
                    {cat}
                  </SelectItem>
                )
            )}
          </SelectContent>
        </Select>
      </div>

      {/* 📦 Cards de trilhas */}
      {loading ? (
        <p className="text-gray-400">Carregando trilhas...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : trilhasFiltradas.length === 0 ? (
        <p className="text-gray-400">Nenhuma trilha encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trilhasFiltradas.map((trilha) => (
            <Link
              key={trilha.id}
              to={`/trilha/${trilha.id}`}
              className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10 hover:shadow-xl hover:shadow-[#6A00FF]/20 hover:border-[#A8C5FF]/20 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="px-3 py-1 rounded-full bg-[#A8C5FF]/20 text-[#A8C5FF] text-sm">
                  {trilha.categoria?.nome || "Sem categoria"}
                </span>
                <h4 className="text-white mt-4 mb-2">{trilha.titulo}</h4>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {trilha.descricao}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#A8C5FF]/10 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#A8C5FF]" />
                  <span>{trilha.duracao_estimada || 60} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 size={16} className="text-[#A8C5FF]" />
                  <span>
                    {trilha.tipo === "PRE" ? "Pré-definida" : "Personalizada"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
