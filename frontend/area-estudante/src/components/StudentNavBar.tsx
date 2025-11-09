// src/components/StudentNavbar.tsx

import { LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
// Assumindo que seu 'avatar' está em src/components/ui/avatar
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"; 

export function StudentNavbar() {
  return (
    // Estilo baseado no header mobile do seu App.tsx
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 bg-[#0A0A1E]/90 backdrop-blur-md border-b border-[#A8C5FF]/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo (com gradiente) */}
        <Link to="/dashboard">
          <h2 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent text-2xl">
            EstudaAI
          </h2>
        </Link>
        
        {/* Links de Navegação */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
            Meu Painel
          </Link>
          <Link to="/explorar" className="text-gray-300 hover:text-white transition-colors">
            Explorar Trilhas
          </Link>
          <Link to="/chat" className="text-gray-300 hover:text-white transition-colors">
            Assistente IA
          </Link>
        </div>

        {/* Perfil e Sair (Estilo do seu AdminSidebar.tsx) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[#A8C5FF]/10 text-[#A8C5FF]">
            <Avatar className="h-8 w-8 ring-2 ring-[#A8C5FF]/30">
              {/* (Troque pela foto real do aluno) */}
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" /> 
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <span className="text-sm text-white hidden md:block">(Nome Aluno)</span>
          </div>
          <button className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}