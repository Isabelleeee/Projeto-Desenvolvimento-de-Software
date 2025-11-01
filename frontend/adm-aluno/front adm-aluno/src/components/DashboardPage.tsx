import { BookOpen, Users, CheckCircle, TrendingUp, Plus } from "lucide-react";
import { Progress } from "./ui/progress";

export function DashboardPage() {
  const stats = [
    {
      title: 'Trilhas Ativas',
      value: '24',
      icon: BookOpen,
      color: 'from-[#A8C5FF] to-[#002B8E]',
      progress: 75
    },
    {
      title: 'Usuários Cadastrados',
      value: '342',
      icon: Users,
      color: 'from-[#C7A3FF] to-[#6A00FF]',
      progress: 85
    },
    {
      title: 'Trilhas Concluídas',
      value: '156',
      icon: CheckCircle,
      color: 'from-[#A8C5FF] to-[#6A00FF]',
      progress: 65
    },
    {
      title: 'Média de Engajamento',
      value: '87%',
      icon: TrendingUp,
      color: 'from-[#002B8E] to-[#C7A3FF]',
      progress: 87
    }
  ];

  const recentTrilhas = [
    { titulo: 'Introdução ao Python', categoria: 'Programação', tipo: 'Pré-definida', data: '2025-10-28', status: 'Ativa' },
    { titulo: 'Machine Learning Básico', categoria: 'IA', tipo: 'Personalizada', data: '2025-10-27', status: 'Ativa' },
    { titulo: 'Design Thinking', categoria: 'Design', tipo: 'Pré-definida', data: '2025-10-26', status: 'Ativa' },
    { titulo: 'Gestão de Projetos', categoria: 'Negócios', tipo: 'Personalizada', data: '2025-10-25', status: 'Ativa' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-400 mt-2">Bem-vindo ao painel administrativo do EstudaAI</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10 hover:shadow-xl hover:shadow-[#6A00FF]/20 hover:border-[#A8C5FF]/20 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                  <h3 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
                    {stat.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color}`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
              <div className="space-y-2">
                <Progress value={stat.progress} className="h-2" />
                <p className="text-xs text-gray-500">{stat.progress}% do objetivo</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Trails Table */}
      <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white">Últimas Trilhas Criadas</h3>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white hover:shadow-lg hover:shadow-[#6A00FF]/30 transition-all">
            <Plus size={18} />
            Nova Trilha
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#A8C5FF]/10">
                <th className="text-left py-3 px-4 text-sm text-gray-400">Título</th>
                <th className="text-left py-3 px-4 text-sm text-gray-400">Categoria</th>
                <th className="text-left py-3 px-4 text-sm text-gray-400">Tipo</th>
                <th className="text-left py-3 px-4 text-sm text-gray-400">Data</th>
                <th className="text-left py-3 px-4 text-sm text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-sm text-gray-400">Ações</th>
              </tr>
            </thead>
            <tbody>
              {recentTrilhas.map((trilha, index) => (
                <tr key={index} className="border-b border-[#A8C5FF]/5 hover:bg-[#A8C5FF]/5 transition-colors">
                  <td className="py-4 px-4 text-white">{trilha.titulo}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full bg-[#C7A3FF]/20 text-[#C7A3FF] text-sm">
                      {trilha.categoria}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-300 text-sm">{trilha.tipo}</td>
                  <td className="py-4 px-4 text-gray-400 text-sm">{trilha.data}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                      {trilha.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-[#A8C5FF] hover:text-[#C7A3FF] text-sm transition-colors">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
