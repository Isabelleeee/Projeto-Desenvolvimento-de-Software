import { Download, TrendingUp, Users, BookOpen, Clock } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function RelatoriosPage() {
  const categoriaData = [
    { nome: 'Programação', alunos: 145, cor: '#A8C5FF' },
    { nome: 'Design', alunos: 98, cor: '#6A00FF' },
    { nome: 'IA', alunos: 127, cor: '#C7A3FF' },
    { nome: 'Negócios', alunos: 76, cor: '#002B8E' },
    { nome: 'Marketing', alunos: 54, cor: '#8B5CF6' },
  ];

  const trilhasData = [
    { nome: 'Python Básico', acessos: 156 },
    { nome: 'React Avançado', acessos: 134 },
    { nome: 'Machine Learning', acessos: 127 },
    { nome: 'UX/UI Design', acessos: 112 },
    { nome: 'Design Thinking', acessos: 98 },
  ];

  const tempoData = [
    { mes: 'Mai', horas: 24 },
    { mes: 'Jun', horas: 28 },
    { mes: 'Jul', horas: 32 },
    { mes: 'Ago', horas: 29 },
    { mes: 'Set', horas: 35 },
    { mes: 'Out', horas: 38 },
  ];

  const metricas = [
    {
      titulo: 'Total de Trilhas',
      valor: '48',
      icon: BookOpen,
      mudanca: '+12%',
      positivo: true
    },
    {
      titulo: 'Tempo Médio por Aluno',
      valor: '32h',
      icon: Clock,
      mudanca: '+8%',
      positivo: true
    },
    {
      titulo: 'Taxa de Conclusão',
      valor: '68%',
      icon: TrendingUp,
      mudanca: '+15%',
      positivo: true
    },
    {
      titulo: 'Alunos Ativos',
      valor: '342',
      icon: Users,
      mudanca: '+23%',
      positivo: true
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
            Relatórios e Estatísticas
          </h1>
          <p className="text-gray-400 mt-2">Análise detalhada do desempenho do sistema</p>
        </div>

        <div className="flex gap-3">
          <Select defaultValue="outubro">
            <SelectTrigger className="w-40 rounded-2xl border-[#A8C5FF]/10 bg-white/5 backdrop-blur-xl text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#0A0A1E] border-[#A8C5FF]/20">
              <SelectItem value="outubro">Outubro</SelectItem>
              <SelectItem value="setembro">Setembro</SelectItem>
              <SelectItem value="agosto">Agosto</SelectItem>
            </SelectContent>
          </Select>

          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white hover:shadow-lg hover:shadow-[#6A00FF]/30 transition-all">
            <Download size={18} />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricas.map((metrica, index) => {
          const Icon = metrica.icon;
          return (
            <div
              key={index}
              className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#6A00FF]/30 to-[#C7A3FF]/30">
                  <Icon className="text-white" size={24} />
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs ${
                  metrica.positivo ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {metrica.mudanca}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-1">{metrica.titulo}</p>
              <h3 className="text-white">{metrica.valor}</h3>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alunos por Categoria */}
        <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10">
          <h3 className="text-white mb-6">Alunos por Categoria</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoriaData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ nome, percent }) => `${nome} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="alunos"
              >
                {categoriaData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.cor} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(10, 10, 30, 0.95)', 
                  border: '1px solid rgba(168, 197, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Trilhas Mais Acessadas */}
        <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10">
          <h3 className="text-white mb-6">Trilhas Mais Acessadas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trilhasData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#A8C5FF" opacity={0.1} />
              <XAxis dataKey="nome" tick={{ fontSize: 12, fill: '#9CA3AF' }} angle={-15} textAnchor="end" height={80} />
              <YAxis tick={{ fill: '#9CA3AF' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(10, 10, 30, 0.95)', 
                  border: '1px solid rgba(168, 197, 255, 0.2)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="acessos" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A8C5FF" />
                  <stop offset="100%" stopColor="#6A00FF" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tempo Médio de Conclusão */}
      <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10">
        <h3 className="text-white mb-6">Tempo Médio de Conclusão (Últimos 6 Meses)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tempoData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#A8C5FF" opacity={0.1} />
            <XAxis dataKey="mes" tick={{ fill: '#9CA3AF' }} />
            <YAxis label={{ value: 'Horas', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} tick={{ fill: '#9CA3AF' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(10, 10, 30, 0.95)', 
                border: '1px solid rgba(168, 197, 255, 0.2)',
                borderRadius: '12px',
                color: '#fff'
              }}
            />
            <Bar dataKey="horas" fill="url(#colorGradient2)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="colorGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C7A3FF" />
                <stop offset="100%" stopColor="#6A00FF" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl p-6 bg-gradient-to-br from-[#6A00FF]/20 to-[#C7A3FF]/20 border border-[#A8C5FF]/10">
          <p className="text-sm text-gray-300 mb-2">Taxa de Engajamento</p>
          <h3 className="text-white mb-1">87%</h3>
          <p className="text-xs text-gray-400">+5% vs. mês anterior</p>
        </div>
        <div className="rounded-3xl p-6 bg-gradient-to-br from-[#6A00FF]/20 to-[#C7A3FF]/20 border border-[#A8C5FF]/10">
          <p className="text-sm text-gray-300 mb-2">Novos Alunos (30 dias)</p>
          <h3 className="text-white mb-1">67</h3>
          <p className="text-xs text-gray-400">+23% vs. mês anterior</p>
        </div>
        <div className="rounded-3xl p-6 bg-gradient-to-br from-[#6A00FF]/20 to-[#C7A3FF]/20 border border-[#A8C5FF]/10">
          <p className="text-sm text-gray-300 mb-2">Certificados Emitidos</p>
          <h3 className="text-white mb-1">156</h3>
          <p className="text-xs text-gray-400">+15% vs. mês anterior</p>
        </div>
      </div>
    </div>
  );
}
