import { useState } from "react";
import { User, Lock, Bell, Shield, Save } from "lucide-react";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function ConfiguracoesPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="bg-gradient-to-r from-[#A8C5FF] to-[#C7A3FF] bg-clip-text text-transparent">
          Configurações
        </h1>
        <p className="text-gray-400 mt-2">Gerencie suas preferências e configurações do sistema</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Profile Section */}
        <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#6A00FF]/30 to-[#C7A3FF]/30">
              <User className="text-white" size={24} />
            </div>
            <h3 className="text-white">Perfil do Administrador</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20 ring-2 ring-[#A8C5FF]/30">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <button className="px-4 py-2 rounded-xl bg-[#A8C5FF]/10 text-[#A8C5FF] hover:bg-[#A8C5FF]/20 transition-colors text-sm">
                Alterar Foto
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Nome Completo</label>
                <Input
                  defaultValue="Administrador"
                  className="rounded-xl border-[#A8C5FF]/20 bg-white/5 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">E-mail</label>
                <Input
                  defaultValue="admin@estudaai.com"
                  type="email"
                  className="rounded-xl border-[#A8C5FF]/20 bg-white/5 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Cargo</label>
              <Input
                defaultValue="Administrador do Sistema"
                className="rounded-xl border-[#A8C5FF]/20 bg-white/5 text-white"
              />
            </div>
          </div>
        </div>

        {/* Security Section */}
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

            <div className="pt-4 border-t border-[#A8C5FF]/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">Autenticação de Dois Fatores</p>
                  <p className="text-xs text-gray-400 mt-1">Adicione uma camada extra de segurança</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
        </div>

        {/* Permissions Section */}
        <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#6A00FF]/30 to-[#C7A3FF]/30">
              <Shield className="text-white" size={24} />
            </div>
            <h3 className="text-white">Permissões de Acesso</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-[#A8C5FF]/5">
              <div>
                <p className="text-sm text-white">Permitir criação de trilhas por alunos</p>
                <p className="text-xs text-gray-400 mt-1">Alunos poderão criar trilhas personalizadas</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-[#A8C5FF]/5">
              <div>
                <p className="text-sm text-white">Aprovação manual de trilhas</p>
                <p className="text-xs text-gray-400 mt-1">Trilhas criadas precisam de aprovação</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-[#A8C5FF]/5">
              <div>
                <p className="text-sm text-white">Permitir comentários entre alunos</p>
                <p className="text-xs text-gray-400 mt-1">Alunos podem interagir nas trilhas</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-[#A8C5FF]/10 shadow-lg shadow-[#6A00FF]/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[#6A00FF]/30 to-[#C7A3FF]/30">
              <Bell className="text-white" size={24} />
            </div>
            <h3 className="text-white">Preferências do Sistema</h3>
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

        {/* Save Button */}
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
    </div>
  );
}
