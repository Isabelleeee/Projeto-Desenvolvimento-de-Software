// src/components/ExplorarTrilhasPage.tsx

import { useState } from "react";
import { Search, Clock, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "./ui/input"; //
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"; //
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"; //

// --- (Dados de exemplo) ---
const trilhasDisponiveis = [
  { id: 1, titulo: 'Introdução ao Python', descricao: 'Aprenda os fundamentos...', categoria: 'Programação', duracao: '40 horas', nivel: 'Iniciante', autor: 'Especialista EstudaAI', autorAvatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&fit=crop' },
  { id: 2, titulo: 'Machine Learning Básico', descricao: 'Conceitos fundamentais...', categoria: 'IA', duracao: '60 horas', nivel: 'Intermediário', autor: 'Especialista EstudaAI', autorAvatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&fit=crop' },
];
// --- (Fim dos dados de exemplo) ---

export function ExplorarTrilhasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('todas');
  const trilhasFiltradas = trilhasDisponiveis; // (Adicione sua lógica de filtro aqui)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">Explorar Trilhas</h1>
        <p className="text-gray-400 mt-2">Encontre seu próximo desafio.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input type="search" placeholder="Buscar por título..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 rounded-2xl border-[#A8C5FF]/10 bg-white/5 text-white placeholder:text-gray-500" />
        </div>
        <Select value={filterCategoria} onValueChange={setFilterCategoria}>
          <SelectTrigger className="md:w-[200px] rounded-2xl border-[#A8C5FF]/10 bg-white/5 text-white">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent className="bg-[#0A0A1E]/90 backdrop-blur-md border-[#A8C5FF]/20 text-white">
            <SelectItem value="todas">Todas as Categorias</SelectItem>
            <SelectItem value="Programação">Programação</SelectItem>
            <SelectItem value="IA">Inteligência Artificial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trilhasFiltradas.map((trilha) => (
          <Link key={trilha.id} to={`/trilha/${trilha.id}`}
            className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10 hover:shadow-xl hover:shadow-[#6A00FF]/20 hover:border-[#A8C5FF]/20 transition-all flex flex-col justify-between">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#A8C5FF]/20 text-[#A8C5FF] text-sm">{trilha.categoria}</span>
              <h4 className="text-white mt-4 mb-2">{trilha.titulo}</h4>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{trilha.descricao}</p>
            </div>
            <div className="space-y-3 pt-4 border-t border-[#A8C5FF]/10">
              <div className="flex items-center gap-2 text-sm text-gray-300"><Clock size={16} className="text-[#A8C5FF]" /><span>{trilha.duracao}</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-300"><BarChart3 size={16} className="text-[#A8C5FF]" /><span>{trilha.nivel}</span></div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Avatar className="h-6 w-6"><AvatarImage src={trilha.autorAvatar} /><AvatarFallback>{trilha.autor.charAt(0)}</AvatarFallback></Avatar>
                <span>{trilha.autor}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}