import { useState, useEffect } from "react";
import { AdminSidebar } from "./components/AdminSidebar";
import { DashboardPage } from "./components/DashboardPage";
import { TrilhasPage } from "./components/TrilhasPage";
import { CategoriasPage } from "./components/CategoriasPage";
import { UsuariosPage } from "./components/UsuariosPage";
import { RelatoriosPage } from "./components/RelatoriosPage";
import { ChatIAPage } from "./components/ChatIAPage";
import { ConfiguracoesPage } from "./components/ConfiguracoesPage";
import { Menu, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";
import { Button } from "./components/ui/button";

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [user, setUser] = useState<any>(null);

  // ===============================
  // 🔹 Buscar dados do usuário logado
  // ===============================
  useEffect(() => {
    const token = localStorage.getItem("api_token");
    if (!token) return;

    fetch("http://127.0.0.1:8000/api/user-profile/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch(() => console.error("Erro ao buscar perfil do usuário"));
  }, []);

  // ===============================
  // 🚪 Logout
  // ===============================
  const handleLogout = async () => {
    const token = localStorage.getItem("api_token");

    try {
      if (token) {
        await fetch("http://127.0.0.1:8000/api/logout/", {
          method: "POST",
          headers: { Authorization: `Token ${token}` },
          credentials: "include",
        });
      }
    } catch (err) {
      console.error("Erro no logout:", err);
    } finally {
      localStorage.removeItem("api_token");
      window.location.href = "http://localhost:3000/"; // Volta pra tela de login
    }
  };

  // ===============================
  // 📄 Renderização das páginas
  // ===============================
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "trilhas":
        return <TrilhasPage />;
      case "categorias":
        return <CategoriasPage />;
      case "usuarios":
        return <UsuariosPage />;
      case "relatorios":
        return <RelatoriosPage />;
      case "chat":
        return <ChatIAPage />;
      case "configuracoes":
        return <ConfiguracoesPage />;
      default:
        return <DashboardPage />;
    }
  };

  // ===============================
  // 🎨 Layout principal
  // ===============================
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

      {/* Top Bar */}
      <div className="fixed top-0 right-0 left-0 lg:left-64 z-40 flex items-center justify-start p-4 bg-[#0A0A1E]/80 border-b border-[#A8C5FF]/10 backdrop-blur-md">
          <div className="text-[#A8C5FF]">
            {user ? (
              <p className="text-sm md:text-base">
                👋 Olá, <strong>{user.username}</strong> ({user.is_staff ? "Administrador" : "Estudante"})
              </p>
            ) : (
              <p className="text-sm text-[#A8C5FF]/60">Carregando usuário...</p>
            )}
          </div>
        </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-6 lg:p-8 pt-24 lg:pt-16">
        <div className="max-w-7xl mx-auto">{renderPage()}</div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#6A00FF]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#002B8E]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-[#C7A3FF]/10 to-transparent rounded-full blur-3xl" />
      </div>
    </div>
  );
}
