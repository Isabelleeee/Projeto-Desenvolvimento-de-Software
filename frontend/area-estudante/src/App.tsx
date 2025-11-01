import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { PredefinedTrails } from "./components/PredefinedTrails";
import { CreateWithAI } from "./components/CreateWithAI";
import { Progress } from "./components/Progress";
import { ChatWithAI } from "./components/ChatWithAI";
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import {
  Home,
  Library,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Settings,
  Menu,
  GraduationCap,
} from "lucide-react";

type Page = "dashboard" | "predefined" | "create" | "progress" | "chat" | "settings";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Início", icon: Home },
    { id: "predefined", label: "Trilhas Pré-definidas", icon: Library },
    { id: "create", label: "Criar com IA", icon: Sparkles },
    { id: "progress", label: "Meu Progresso", icon: TrendingUp },
    { id: "chat", label: "Chat com IA", icon: MessageSquare },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentPage} />;
      case "predefined":
        return <PredefinedTrails onNavigate={setCurrentPage} />;
      case "create":
        return <CreateWithAI />;
      case "progress":
        return <Progress />;
      case "chat":
        return <ChatWithAI />;
      case "settings":
        return (
          <div className="p-6 md:p-8 max-w-7xl mx-auto">
            <h1 className="mb-2">Configurações</h1>
            <p className="text-muted-foreground">Em breve...</p>
          </div>
        );
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 border-r bg-card">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="mb-0">EstudaAI</h2>
              <p className="text-muted-foreground">Sistema de Trilhas</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Button
                    variant={currentPage === item.id ? "secondary" : "ghost"}
                    className={`w-full justify-start gap-3 ${
                      currentPage === item.id
                        ? "bg-primary/10 text-primary hover:bg-primary/20"
                        : ""
                    }`}
                    onClick={() => setCurrentPage(item.id as Page)}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="truncate">João da Silva</p>
              <p className="text-muted-foreground truncate">Estudante</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r flex flex-col">
            <div className="p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="mb-0">EstudaAI</h2>
                  <p className="text-muted-foreground">Sistema de Trilhas</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4">
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <Button
                        variant={currentPage === item.id ? "secondary" : "ghost"}
                        className={`w-full justify-start gap-3 ${
                          currentPage === item.id
                            ? "bg-primary/10 text-primary hover:bg-primary/20"
                            : ""
                        }`}
                        onClick={() => {
                          setCurrentPage(item.id as Page);
                          setSidebarOpen(false);
                        }}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-4 border-t">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="truncate">João da Silva</p>
                  <p className="text-muted-foreground truncate">Estudante</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden border-b bg-card p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h2 className="mb-0">EstudaAI</h2>
          </div>
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
              JD
            </AvatarFallback>
          </Avatar>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{renderPage()}</div>
      </main>
    </div>
  );
}
