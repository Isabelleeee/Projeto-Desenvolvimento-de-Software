import { useState } from "react";
import { Plus, Code, Palette, Briefcase, Brain, BookOpen, Sparkles, Edit2, Check } from "lucide-react";

export function CategoriasPage() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const [categorias, setCategorias] = useState([
    { id: 1, nome: 'Programação', icon: Code, color: 'from-[#A8C5FF] to-[#002B8E]', count: 12 },
    { id: 2, nome: 'Design', icon: Palette, color: 'from-[#C7A3FF] to-[#6A00FF]', count: 8 },
    { id: 3, nome: 'Negócios', icon: Briefcase, color: 'from-[#002B8E] to-[#A8C5FF]', count: 6 },
    { id: 4, nome: 'IA', icon: Brain, color: 'from-[#6A00FF] to-[#C7A3FF]', count: 10 },
    { id: 5, nome: 'Marketing', icon: Sparkles, color: 'from-[#A8C5FF] to-[#C7A3FF]', count: 5 },
    { id: 6, nome: 'Educação', icon: BookOpen, color: 'from-[#002B8E] to-[#6A00FF]', count: 7 },
  ]);

  const startEditing = (id: number, nome: string) => {
    setEditingId(id);
    setEditValue(nome);
  };

  const saveEdit = (id: number) => {
    setCategorias(categorias.map(cat => 
      cat.id === id ? { ...cat, nome: editValue } : cat
    ));
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
            Categorias de Trilhas
          </h1>
          <p className="text-gray-400 mt-2">Organize suas trilhas por categorias temáticas</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((categoria) => {
          const Icon = categoria.icon;
          const isEditing = editingId === categoria.id;

          return (
            <div
              key={categoria.id}
              className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10 hover:shadow-xl hover:shadow-[#6A00FF]/20 hover:border-[#A8C5FF]/20 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${categoria.color}`}>
                  <Icon className="text-white" size={28} />
                </div>
                
                <div className="flex-1">
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1 px-3 py-1 rounded-lg border border-[#A8C5FF]/30 bg-white/5 text-white outline-none focus:border-[#A8C5FF]"
                        autoFocus
                      />
                      <button
                        onClick={() => saveEdit(categoria.id)}
                        className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <h4 className="text-white">{categoria.nome}</h4>
                      <button
                        onClick={() => startEditing(categoria.id, categoria.nome)}
                        className="p-2 rounded-lg text-[#A8C5FF] hover:bg-[#A8C5FF]/10 transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                    </div>
                  )}
                  <p className="text-sm text-gray-400 mt-1">{categoria.count} trilhas</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#A8C5FF]/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Uso</span>
                  <span className="text-[#A8C5FF]">{Math.round((categoria.count / 48) * 100)}%</span>
                </div>
                <div className="mt-2 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${categoria.color} rounded-full`}
                    style={{ width: `${(categoria.count / 48) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* Add New Category Card */}
        <button className="rounded-3xl p-6 border-2 border-dashed border-[#A8C5FF]/20 bg-white/5 backdrop-blur-xl hover:bg-[#A8C5FF]/5 hover:border-[#A8C5FF]/40 transition-all flex flex-col items-center justify-center gap-3 min-h-[200px]">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#A8C5FF]/30 to-[#C7A3FF]/30">
            <Plus className="text-white" size={28} />
          </div>
          <h4 className="text-white">Nova Categoria</h4>
          <p className="text-sm text-gray-400 text-center">
            Adicione uma nova categoria de trilha
          </p>
        </button>
      </div>

      {/* Stats */}
      <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10">
        <h3 className="text-white mb-6">Estatísticas de Categorias</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Total de Categorias</p>
            <p className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
              {categorias.length}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Total de Trilhas</p>
            <p className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
              {categorias.reduce((acc, cat) => acc + cat.count, 0)}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Média por Categoria</p>
            <p className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
              {Math.round(categorias.reduce((acc, cat) => acc + cat.count, 0) / categorias.length)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
