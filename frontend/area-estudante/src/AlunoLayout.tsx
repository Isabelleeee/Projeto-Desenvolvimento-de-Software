import { useEffect, useState } from "react";
import {
  LogOut,
  Home,
  BookOpen,
  MessageSquare,
  Sparkles,
  Settings,
  BarChart3,
  Award,
} from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

interface UserData {
  username: string;
  email: string;
}

export function AlunoLayout() {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Buscar dados do aluno autenticado
  useEffect(() => {
    const token = localStorage.getItem("api_token");
    if (!token) return;

    fetch("http://127.0.0.1:8000/api/test-auth/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Usuário não autenticado");
        const data = await res.json();
        setUser({
          username: data.username || "Aluno",
          email: data.email || "aluno@estudaai.com",
        });
      })
      .catch(() => setUser(null));
  }, []);

  // 🔸 Função de logout
  const handleLogout = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("api_token")}`,
        },
        credentials: "include",
      });
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    } finally {
      localStorage.removeItem("api_token");
      window.location.href = "http://localhost:3000/";
    }
  };

  // 🔹 Itens da barra lateral
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/" },
    { id: "explorar", label: "Explorar Trilhas", icon: BookOpen, path: "/explorar" },
    { id: "criar-trilha", label: "Criar Trilha com IA", icon: Sparkles, path: "/criar-trilha" },
    { id: "chat", label: "Chat com IA", icon: MessageSquare, path: "/chat" },
    { id: "progresso", label: "Meu Progresso", icon: BarChart3, path: "/progresso" },
    { id: "certificados", label: "Certificados", icon: Award, path: "/certificados" },
    { id: "configuracoes", label: "Configurações", icon: Settings, path: "/configuracoes" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A1E] text-white flex">
      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 flex flex-col border-r border-[#A8C5FF]/10 bg-[#0A0A1E]/80 backdrop-blur-xl">
        {/* Logo */}
        <div className="p-6 border-b border-[#A8C5FF]/10">
          <h2 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent text-xl font-semibold">
            EstudaAI
          </h2>
          <p className="text-xs text-gray-400 mt-1">Painel do Estudante</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              location.pathname === item.path.replace(/\/$/, "");

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left ${
                  isActive
                    ? "bg-gradient-to-r from-[#6A00FF]/30 to-[#C7A3FF]/30 text-white shadow-lg shadow-[#6A00FF]/20"
                    : "text-gray-400 hover:bg-[#A8C5FF]/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Perfil e Logout */}
        <div className="p-4 border-t border-[#A8C5FF]/10">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-[#6A00FF]/10 to-[#C7A3FF]/10">
            <div className="flex-1">
              <div className="text-sm text-white">{user?.username || "Aluno"}</div>
              <div className="text-xs text-gray-400">{user?.email || "aluno@estudaai.com"}</div>
            </div>

            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-[#C7A3FF] transition-colors"
              title="Sair"
              aria-label="Sair"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* ===== CONTEÚDO ===== */}
      <main className="flex-1 p-6 md:ml-64">
        <Outlet />
      </main>

      {/* ===== FUNDO ===== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[#6A00FF]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#002B8E]/20 to-transparent rounded-full blur-3xl" />
      </div>
    </div>
  );
}
