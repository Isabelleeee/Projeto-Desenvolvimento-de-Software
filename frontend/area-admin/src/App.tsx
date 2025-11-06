import { useState } from "react";
import { AdminSidebar } from "./components/AdminSidebar";
import { DashboardPage } from "./components/DashboardPage";
import { TrilhasPage } from "./components/TrilhasPage";
import { CategoriasPage } from "./components/CategoriasPage";
import { UsuariosPage } from "./components/UsuariosPage";
import { RelatoriosPage } from "./components/RelatoriosPage";
import { ChatIAPage } from "./components/ChatIAPage";
import { ConfiguracoesPage } from "./components/ConfiguracoesPage";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'trilhas':
        return <TrilhasPage />;
      case 'categorias':
        return <CategoriasPage />;
      case 'usuarios':
        return <UsuariosPage />;
      case 'relatorios':
        return <RelatoriosPage />;
      case 'chat':
        return <ChatIAPage />;
      case 'configuracoes':
        return <ConfiguracoesPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A1E]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 p-4 bg-[#0A0A1E]/90 backdrop-blur-md border-b border-[#A8C5FF]/10">
        <div className="flex items-center justify-between">
          <h2 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
            EstudaAI Admin
          </h2>
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-xl bg-[#A8C5FF]/10 text-[#A8C5FF] hover:bg-[#A8C5FF]/20 transition-colors">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 bg-[#0A0A1E] border-[#A8C5FF]/10">
              <AdminSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-6 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#6A00FF]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#002B8E]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-[#C7A3FF]/10 to-transparent rounded-full blur-3xl" />
      </div>
    </div>
  );
}
