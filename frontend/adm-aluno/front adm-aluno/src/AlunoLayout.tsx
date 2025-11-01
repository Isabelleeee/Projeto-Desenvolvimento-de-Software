// src/AlunoLayout.tsx
import React, { useState } from "react";
import { StudentSidebar } from "./components/StudentSidebar";
import { StudentDashboardPage } from "./components/StudentDashboardPage";
import { MinhasTrilhasPage } from "./components/MinhasTrilhasPage";
import { CriarTrilhaIAPage } from "./components/CriarTrilhaIAPage"; 
import { ProgressoAlunoPage } from "./components/ProgressoAlunoPage";// ✅ novo import
import { ChatAlunoPage } from "./components/ChatAlunoPage";
import { ConfiguracaoAluno } from "./components/ConfiguracaoAluno";

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
      case "criar-trilha": // ✅ novo caso adicionado
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
    <div className="flex min-h-screen bg-[#070716] text-white">
      {/* Sidebar fixa à esquerda */}
      <div className="fixed left-0 top-0 h-full">
        <StudentSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>

      {/* Área principal à direita */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{renderPage()}</div>
      </main>
    </div>
  );
}
