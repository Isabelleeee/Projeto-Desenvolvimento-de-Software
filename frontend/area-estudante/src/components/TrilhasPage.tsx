import { useState } from "react";
import { Plus, Search, Edit, Trash2, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";

export function TrilhasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const trilhas = [
    {
      id: 1,
      titulo: 'Introdução ao Python',
      descricao: 'Aprenda os fundamentos da linguagem Python',
      categoria: 'Programação',
      tipo: 'Pré-definida',
      duracao: '40 horas',
      data: '2025-10-28',
      progresso: 75
    },
    {
      id: 2,
      titulo: 'Machine Learning Básico',
      descricao: 'Conceitos fundamentais de aprendizado de máquina',
      categoria: 'IA',
      tipo: 'Personalizada',
      duracao: '60 horas',
      data: '2025-10-27',
      progresso: 45
    },
    {
      id: 3,
      titulo: 'Design Thinking',
      descricao: 'Metodologia para inovação centrada no usuário',
      categoria: 'Design',
      tipo: 'Pré-definida',
      duracao: '30 horas',
      data: '2025-10-26',
      progresso: 90
    },
    {
      id: 4,
      titulo: 'Gestão de Projetos',
      descricao: 'Aprenda a gerenciar projetos com eficiência',
      categoria: 'Negócios',
      tipo: 'Personalizada',
      duracao: '50 horas',
      data: '2025-10-25',
      progresso: 60
    },
    {
      id: 5,
      titulo: 'React Avançado',
      descricao: 'Técnicas avançadas de desenvolvimento em React',
      categoria: 'Programação',
      tipo: 'Pré-definida',
      duracao: '45 horas',
      data: '2025-10-24',
      progresso: 30
    },
    {
      id: 6,
      titulo: 'UX/UI Design',
      descricao: 'Fundamentos de design de experiência do usuário',
      categoria: 'Design',
      tipo: 'Personalizada',
      duracao: '35 horas',
      data: '2025-10-23',
      progresso: 80
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
            Gerenciar Trilhas de Aprendizagem
          </h1>
          <p className="text-gray-400 mt-2">Visualize, edite e crie trilhas personalizadas</p>
        </div>
      </div>

      {/* Search and Create */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Buscar trilhas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 rounded-2xl border-[#A8C5FF]/10 bg-white/5 backdrop-blur-xl text-white placeholder:text-gray-500"
          />
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white hover:shadow-lg hover:shadow-[#6A00FF]/30 transition-all whitespace-nowrap">
              <Plus size={20} />
              Nova Trilha
            </button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl bg-[#0A0A1E]/95 backdrop-blur-xl border-[#A8C5FF]/20 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
                Criar Nova Trilha
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Título</label>
                <Input placeholder="Ex: Introdução ao JavaScript" className="rounded-xl border-[#A8C5FF]/20 bg-white/5 text-white placeholder:text-gray-500" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Descrição</label>
                <Textarea placeholder="Descreva o conteúdo da trilha..." className="rounded-xl border-[#A8C5FF]/20 bg-white/5 text-white placeholder:text-gray-500 min-h-24" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Categoria</label>
                  <Select>
                    <SelectTrigger className="rounded-xl border-[#A8C5FF]/20 bg-white/5 text-white">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A0A1E] border-[#A8C5FF]/20">
                      <SelectItem value="programacao">Programação</SelectItem>
                      <SelectItem value="ia">IA</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="negocios">Negócios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Tipo</label>
                  <Select>
                    <SelectTrigger className="rounded-xl border-[#A8C5FF]/20 bg-white/5 text-white">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0A0A1E] border-[#A8C5FF]/20">
                      <SelectItem value="predefinida">Pré-definida</SelectItem>
                      <SelectItem value="personalizada">Personalizada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Duração Estimada</label>
                <Input placeholder="Ex: 40 horas" className="rounded-xl border-[#A8C5FF]/20 bg-white/5 text-white placeholder:text-gray-500" />
              </div>
              <button 
                onClick={() => setIsDialogOpen(false)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white hover:shadow-lg hover:shadow-[#6A00FF]/30 transition-all mt-4"
              >
                Salvar Trilha
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Trails Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trilhas.map((trilha) => (
          <div
            key={trilha.id}
            className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10 hover:shadow-xl hover:shadow-[#6A00FF]/20 hover:border-[#A8C5FF]/20 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-[#C7A3FF]/20 text-[#C7A3FF] text-xs">
                {trilha.categoria}
              </span>
              <span className="text-xs text-gray-500">{trilha.data}</span>
            </div>

            <h4 className="text-white mb-2">{trilha.titulo}</h4>
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{trilha.descricao}</p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock size={16} className="text-[#A8C5FF]" />
                <span>{trilha.duracao}</span>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Progresso Geral</span>
                  <span>{trilha.progresso}%</span>
                </div>
                <Progress value={trilha.progresso} className="h-2" />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-[#A8C5FF]/10">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-[#A8C5FF]/10 text-[#A8C5FF] hover:bg-[#A8C5FF]/20 transition-colors">
                <Edit size={16} />
                Editar
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                <Trash2 size={16} />
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
