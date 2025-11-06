// src/AlunoLayout.tsx
import React, { useState } from "react";
import { StudentSidebar } from "./components/StudentSidebar";
import { StudentDashboardPage } from "./components/StudentDashboardPage";
import { MinhasTrilhasPage } from "./components/MinhasTrilhasPage";
import { CriarTrilhaIAPage } from "./components/CriarTrilhaIAPage";
import { ProgressoAlunoPage } from "./components/ProgressoAlunoPage";
import { ChatAlunoPage } from "./components/ChatAlunoPage";
import { ConfiguracaoAluno } from "./components/ConfiguracaoAluno";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";

export function AlunoLayout() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "progresso":
        return <ProgressoAlunoPage />;
      case "dashboard":
        return <StudentDashboardPage />;
      case "trilhas":
        return <MinhasTrilhasPage />;
      case "criar-trilha":
        return <CriarTrilhaIAPage />;
      case "chat":
        return <ChatAlunoPage />;
      case "configuracoes":
        return <ConfiguracaoAluno />;
      default:
        return <StudentDashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070716] text-white">
      {/* Sidebar fixa no desktop */}
      <div className="hidden lg:block fixed top-0 left-0 h-full w-64">
        <StudentSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>

      {/* Menu Mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 p-4 bg-[#070716]/90 backdrop-blur-md border-b border-[#A8C5FF]/10 flex items-center justify-between">
        <h2 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent font-semibold text-lg">
          EstudaAI
        </h2>
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 rounded-xl bg-[#A8C5FF]/10 text-[#A8C5FF] hover:bg-[#A8C5FF]/20 transition-colors">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-[#070716] border-r border-[#A8C5FF]/10">
            <StudentSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Conteúdo principal */}
      <main className="lg:ml-64 p-6 lg:p-8 pt-20 lg:pt-8 transition-all">
        <div className="max-w-7xl mx-auto">{renderPage()}</div>
      </main>

      {/* Fundo decorativo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#6A00FF]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#002B8E]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-[#C7A3FF]/10 to-transparent rounded-full blur-3xl" />
      </div>
    </div>
  );
}
