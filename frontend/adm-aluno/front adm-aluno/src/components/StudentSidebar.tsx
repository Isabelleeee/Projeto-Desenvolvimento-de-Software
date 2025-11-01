// src/components/StudentSidebar.tsx
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  MessageSquare,
  Settings,
  LogOut,
  TrendingUp
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface StudentSidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function StudentSidebar({ currentPage, onPageChange }: StudentSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "trilhas", label: "Minhas Trilhas", icon: BookOpen },
    { id: "criar-trilha", label: "Criar Trilha com IA", icon: Sparkles },
    { id: "progresso", label: "Meu Progresso", icon: TrendingUp },
    { id: "chat", label: "Chat com IA", icon: MessageSquare },
    { id: "configuracoes", label: "Configurações", icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 flex flex-col border-r border-[#A8C5FF]/10 bg-[#0A0A1E]/80 backdrop-blur-xl">
      {/* Logo */}
      <div className="p-6 border-b border-[#A8C5FF]/10">
        <h2 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent text-2xl">
          EstudaAI
        </h2>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[#6A00FF]/30 to-[#C7A3FF]/30 text-white shadow-lg shadow-[#6A00FF]/20"
                  : "text-gray-400 hover:bg-[#A8C5FF]/5 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Perfil do Aluno */}
      <div className="p-4 border-t border-[#A8C5FF]/10">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-[#6A00FF]/20 to-[#C7A3FF]/20">
          <Avatar className="h-10 w-10 ring-2 ring-[#A8C5FF]/30">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-sm text-white">Aluno</div>
            <div className="text-xs text-gray-400">aluno@estudaai.com</div>
          </div>
          <button className="text-gray-400 hover:text-[#C7A3FF] transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
