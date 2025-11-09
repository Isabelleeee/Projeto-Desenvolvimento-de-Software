import { useEffect, useState } from "react";
import { Plus, Search, Edit, Trash2, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";

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
  etapas: Etapa[];
}

export function TrilhasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Buscar trilhas reais do backend
  useEffect(() => {
    const token = localStorage.getItem("estudaai_token");
    const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

    const fetchTrilhas = async () => {
      try {
        const res = await fetch(`${API_BASE}/trilhas/`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Token ${token}` } : {}),
          },
        });
        if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
        const data = await res.json();
        setTrilhas(Array.isArray(data) ? data : data.results || []);
      } catch (err: any) {
        console.error("Erro ao carregar trilhas:", err);
        setError("Falha ao carregar trilhas.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrilhas();
  }, []);

  // 🗑️ Excluir trilha
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("estudaai_token");
    const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

    if (!confirm("Tem certeza que deseja excluir esta trilha?")) return;

    try {
      const res = await fetch(`${API_BASE}/trilhas/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
      });
      if (res.ok) {
        alert("Trilha excluída com sucesso!");
        setTrilhas(trilhas.filter((t) => t.id !== id));
      } else {
        alert("Erro ao excluir trilha.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 📝 Editar trilha
  const handleEdit = async (id: number) => {
    const token = localStorage.getItem("estudaai_token");
    const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";
    const novaDescricao = prompt("Digite a nova descrição da trilha:");
    if (!novaDescricao) return;

    try {
      const res = await fetch(`${API_BASE}/trilhas/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ descricao: novaDescricao }),
      });
      if (res.ok) {
        alert("Trilha atualizada!");
        window.location.reload();
      } else {
        alert("Erro ao atualizar trilha.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const trilhasFiltradas = trilhas.filter((t) =>
    t.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
            Minhas Trilhas de Aprendizagem
          </h1>
          <p className="text-gray-400 mt-2">
            Visualize e gerencie suas trilhas personalizadas
          </p>
        </div>
      </div>

      {/* Search and Create */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            type="text"
            placeholder="Buscar trilhas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 rounded-2xl border-[#A8C5FF]/10 bg-white/5 backdrop-blur-xl text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Trilhas */}
      {loading ? (
        <p className="text-gray-400">Carregando trilhas...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : trilhasFiltradas.length === 0 ? (
        <p className="text-gray-400">Nenhuma trilha encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trilhasFiltradas.map((trilha) => (
            <div
              key={trilha.id}
              className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10 hover:shadow-xl hover:shadow-[#6A00FF]/20 hover:border-[#A8C5FF]/20 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#C7A3FF]/20 text-[#C7A3FF] text-xs">
                  {trilha.categoria?.nome || "Sem categoria"}
                </span>
              </div>

              <h4 className="text-white mb-2">{trilha.titulo}</h4>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                {trilha.descricao}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Clock size={16} className="text-[#A8C5FF]" />
                  <span>{trilha.etapas.length} etapas</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Progresso</span>
                    <span>{(trilha.etapas.length || 0) * 10}%</span>
                  </div>
                  <Progress value={(trilha.etapas.length || 0) * 10} className="h-2" />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-[#A8C5FF]/10">
                <button
                  onClick={() => handleEdit(trilha.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-[#A8C5FF]/10 text-[#A8C5FF] hover:bg-[#A8C5FF]/20 transition-colors"
                >
                  <Edit size={16} />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(trilha.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={16} />
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
