import { useState } from "react";
import { Search, Eye, Filter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Progress } from "./ui/progress";

export function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('todos');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const usuarios = [
    {
      id: 1,
      nome: 'Ana Silva',
      email: 'ana.silva@email.com',
      tipo: 'Aluno',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      trilhasAndamento: 3,
      progressoMedio: 75,
      ultimaAtividade: '2 horas atrás',
      trilhas: [
        { nome: 'Python Básico', progresso: 80 },
        { nome: 'Machine Learning', progresso: 60 },
        { nome: 'Design Thinking', progresso: 85 },
      ]
    },
    {
      id: 2,
      nome: 'Carlos Santos',
      email: 'carlos.santos@email.com',
      tipo: 'Aluno',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      trilhasAndamento: 2,
      progressoMedio: 45,
      ultimaAtividade: '1 dia atrás',
      trilhas: [
        { nome: 'React Avançado', progresso: 40 },
        { nome: 'UX/UI Design', progresso: 50 },
      ]
    },
    {
      id: 3,
      nome: 'Mariana Costa',
      email: 'mariana.costa@email.com',
      tipo: 'Administrador',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      trilhasAndamento: 5,
      progressoMedio: 92,
      ultimaAtividade: '30 min atrás',
      trilhas: [
        { nome: 'Gestão de Projetos', progresso: 95 },
        { nome: 'Python Básico', progresso: 100 },
        { nome: 'Marketing Digital', progresso: 85 },
        { nome: 'Análise de Dados', progresso: 90 },
        { nome: 'Liderança', progresso: 90 },
      ]
    },
    {
      id: 4,
      nome: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      tipo: 'Aluno',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      trilhasAndamento: 1,
      progressoMedio: 30,
      ultimaAtividade: '3 dias atrás',
      trilhas: [
        { nome: 'JavaScript Básico', progresso: 30 },
      ]
    },
    {
      id: 5,
      nome: 'Juliana Ferreira',
      email: 'juliana.ferreira@email.com',
      tipo: 'Aluno',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      trilhasAndamento: 4,
      progressoMedio: 65,
      ultimaAtividade: '5 horas atrás',
      trilhas: [
        { nome: 'Design Thinking', progresso: 70 },
        { nome: 'Photoshop Avançado', progresso: 55 },
        { nome: 'Branding', progresso: 75 },
        { nome: 'Figma para Iniciantes', progresso: 60 },
      ]
    },
  ];

  const filteredUsers = usuarios.filter(user => {
    const matchesSearch = user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'todos' || user.tipo.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
          Gerenciar Usuários
        </h1>
        <p className="text-gray-400 mt-2">Visualize e gerencie todos os alunos do sistema</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 rounded-2xl border-[#A8C5FF]/10 bg-white/5 backdrop-blur-xl text-white placeholder:text-gray-500"
          />
        </div>
        
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-48 h-12 rounded-2xl border-[#A8C5FF]/10 bg-white/5 backdrop-blur-xl text-white">
            <div className="flex items-center gap-2">
              <Filter size={18} />
              <SelectValue placeholder="Filtrar" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-[#0A0A1E] border-[#A8C5FF]/20">
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="aluno">Alunos</SelectItem>
            <SelectItem value="administrador">Administradores</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <div className="rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#6A00FF]/20 to-[#C7A3FF]/20">
                <th className="text-left py-4 px-6 text-sm text-white">Nome</th>
                <th className="text-left py-4 px-6 text-sm text-white">E-mail</th>
                <th className="text-left py-4 px-6 text-sm text-white">Tipo</th>
                <th className="text-left py-4 px-6 text-sm text-white">Trilhas</th>
                <th className="text-left py-4 px-6 text-sm text-white">Progresso</th>
                <th className="text-left py-4 px-6 text-sm text-white">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-[#A8C5FF]/10 hover:bg-[#A8C5FF]/5 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-[#A8C5FF]/20">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.nome.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-white">{user.nome}</div>
                        <div className="text-xs text-gray-500">{user.ultimaAtividade}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-300 text-sm">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      user.tipo === 'Administrador'
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {user.tipo}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-300 text-sm">{user.trilhasAndamento}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className="h-full bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] rounded-full"
                          style={{ width: `${user.progressoMedio}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-300 whitespace-nowrap">{user.progressoMedio}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#A8C5FF]/10 text-[#A8C5FF] hover:bg-[#A8C5FF]/20 transition-colors text-sm"
                    >
                      <Eye size={16} />
                      Ver Perfil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Profile Modal */}
      <Dialog open={selectedUser !== null} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="rounded-3xl bg-[#0A0A1E]/95 backdrop-blur-xl border-[#A8C5FF]/20 max-w-2xl">
          {selectedUser && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 ring-2 ring-[#A8C5FF]/30">
                    <AvatarImage src={selectedUser.avatar} />
                    <AvatarFallback>{selectedUser.nome.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
                      {selectedUser.nome}
                    </DialogTitle>
                    <p className="text-sm text-gray-400">{selectedUser.email}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#6A00FF]/20 to-[#C7A3FF]/20 border border-[#A8C5FF]/10">
                    <p className="text-sm text-gray-400">Trilhas Ativas</p>
                    <p className="text-white mt-1">{selectedUser.trilhasAndamento}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#6A00FF]/20 to-[#C7A3FF]/20 border border-[#A8C5FF]/10">
                    <p className="text-sm text-gray-400">Progresso Médio</p>
                    <p className="text-white mt-1">{selectedUser.progressoMedio}%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#6A00FF]/20 to-[#C7A3FF]/20 border border-[#A8C5FF]/10">
                    <p className="text-sm text-gray-400">Última Atividade</p>
                    <p className="text-white mt-1 text-sm">{selectedUser.ultimaAtividade}</p>
                  </div>
                </div>

                {/* Trilhas em Andamento */}
                <div>
                  <h4 className="text-white mb-4">Trilhas em Andamento</h4>
                  <div className="space-y-3">
                    {selectedUser.trilhas.map((trilha: any, index: number) => (
                      <div key={index} className="p-4 rounded-2xl bg-white/5 border border-[#A8C5FF]/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-white">{trilha.nome}</span>
                          <span className="text-sm text-gray-400">{trilha.progresso}%</span>
                        </div>
                        <Progress value={trilha.progresso} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
