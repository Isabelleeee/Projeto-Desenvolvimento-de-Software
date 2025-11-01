import { useState } from "react";
import { User, Lock, Bell, Save } from "lucide-react";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function ConfiguracaoAluno() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="h-10"></div>
        <h1 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
          Configurações
        </h1>
        <p className="text-gray-400 mt-2">
          Gerencie suas preferências e informações de conta
        </p>
      </div>

      {/* Perfil do Aluno */}
      <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-[#6A00FF]/30 to-[#C7A3FF]/30">
            <User className="text-white" size={24} />
          </div>
          <h3 className="text-white">Perfil do Aluno</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 ring-2 ring-[#A8C5FF]/30">
              <AvatarImage src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <button className="px-4 py-2 rounded-xl bg-[#A8C5FF]/10 text-[#A8C5FF] hover:bg-[#A8C5FF]/20 transition-colors text-sm">
              Alterar Foto
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Nome Completo</label>
              <Input
                defaultValue="Aluno EstudaAI"
                className="rounded-xl border-[#A8C5FF]/20 bg-white/5 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">E-mail</label>
              <Input
                defaultValue="aluno@estudaai.com"
                type="email"
                className="rounded-xl border-[#A8C5FF]/20 bg-white/5 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Curso / Trilha Atual</label>
            <Input
              defaultValue="Engenharia da Computação"
              className="rounded-xl border-[#A8C5FF]/20 bg-white/5 text-white"
            />
          </div>
        </div>
      </div>

      {/* Segurança */}
      <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-[#6A00FF]/30 to-[#C7A3FF]/30">
            <Lock className="text-white" size={24} />
          </div>
          <h3 className="text-white">Segurança</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Senha Atual</label>
            <Input
              type="password"
              placeholder="••••••••"
              className="rounded-xl border-[#A8C5FF]/20 bg-white/5 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Nova Senha</label>
              <Input
                type="password"
                placeholder="••••••••"
                className="rounded-xl border-[#A8C5FF]/20 bg-white/5 text-white placeholder:text-gray-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Confirmar Senha</label>
              <Input
                type="password"
                placeholder="••••••••"
                className="rounded-xl border-[#A8C5FF]/20 bg-white/5 text-white placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preferências do Sistema */}
      <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-[#6A00FF]/30 to-[#C7A3FF]/30">
            <Bell className="text-white" size={24} />
          </div>
          <h3 className="text-white">Preferências</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-[#A8C5FF]/5">
            <div>
              <p className="text-sm text-white">Modo Escuro</p>
              <p className="text-xs text-gray-400 mt-1">Ative o tema escuro da interface</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-[#A8C5FF]/5">
            <div>
              <p className="text-sm text-white">Notificações Push</p>
              <p className="text-xs text-gray-400 mt-1">Receba notificações em tempo real</p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-[#A8C5FF]/5">
            <div>
              <p className="text-sm text-white">Notificações por E-mail</p>
              <p className="text-xs text-gray-400 mt-1">Receba resumos diários por e-mail</p>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-[#A8C5FF]/5">
            <div>
              <p className="text-sm text-white">Salvamento Automático</p>
              <p className="text-xs text-gray-400 mt-1">Salvar alterações automaticamente</p>
            </div>
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-3 rounded-2xl border border-[#A8C5FF]/20 text-gray-300 hover:bg-[#A8C5FF]/5 transition-colors">
          Cancelar
        </button>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#6A00FF] to-[#C7A3FF] text-white hover:shadow-lg hover:shadow-[#6A00FF]/30 transition-all">
          <Save size={20} />
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
