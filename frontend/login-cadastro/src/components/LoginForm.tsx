import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { ParticleLogo } from "./ParticleLogo";
import { AIThinkingMessage } from "./AIThinkingMessage";

interface LoginFormProps {
  onSwitchToSignup?: () => void;
}

export function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [isStaff, setIsStaff] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [showAiMessage, setShowAiMessage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignup, setIsSignup] = useState(false);

  const isFormValid =
    email.length > 0 &&
    password.length > 0 &&
    (!isSignup || (username && confirmPassword && password === confirmPassword));

  // -------------------------
  // 🎭 Mensagens da IA
  // -------------------------
  useEffect(() => {
    if (emailFocused) {
      setAiMessage("Digite seu e-mail cadastrado...");
      setShowAiMessage(true);
    } else if (passwordFocused) {
      setAiMessage("Sua senha está protegida com criptografia de ponta");
      setShowAiMessage(true);
    } else {
      setShowAiMessage(false);
    }
  }, [emailFocused, passwordFocused]);

  useEffect(() => {
    if (isFormValid && !emailFocused && !passwordFocused) {
      setAiMessage(isSignup ? "Tudo pronto para criar sua conta! ✨" : "Tudo pronto! Você pode entrar agora ✨");
      setShowAiMessage(true);
      const timer = setTimeout(() => setShowAiMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isFormValid, emailFocused, passwordFocused, isSignup]);

  // -------------------------
  // 🔐 Login
  // -------------------------
  const handleLogin = async () => {
    if (!isFormValid || loading) return;
    setLoading(true);
    setError(null);

    try {
      const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

      const res = await fetch(`${API_BASE}/login-unificado/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email, // O backend aceita tanto e-mail quanto username
          password: password,
        }),
      });

      // 🧩 Corrige erro de resposta HTML
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Erro ao conectar com o servidor.");
      }

      if (!res.ok) {
        localStorage.removeItem("estudaai_token");
        throw new Error(data?.mensagem || "Usuário ou senha inválidos.");
      }

      // 🔒 Salva o token em múltiplos locais (para Django, IA e fetchs)
      if (data?.token) {
        localStorage.setItem("estudaai_token", data.token);
        sessionStorage.setItem("estudaai_token", data.token);
        document.cookie = `estudaai_token=${data.token}; path=/; SameSite=Lax;`;
        console.log("✅ Token salvo com sucesso:", data.token);
      } else {
        console.warn("⚠️ Nenhum token retornado do backend:", data);
      }

      // 🧭 Redirecionamento de acordo com o tipo de usuário
      const redirectUrl =
        data?.redirect ||
        data?.redirect_url ||
        (data?.tipo === "admin"
          ? "http://localhost:3002/"
          : "http://localhost:3001/");

      // ✅ Pequeno delay para garantir que o token foi salvo
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 300);
    } catch (err: any) {
      console.error("❌ Erro no login:", err);
      setError(err.message || "Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // 🧾 Cadastro
  // -------------------------
  const handleSignup = async () => {
    if (!isFormValid || loading) return;
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";
      const res = await fetch(`${API_BASE}/cadastro/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          phone,
          is_staff: isStaff, // 👈 envia o tipo de usuário
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Cadastro realizado com sucesso como ${data.tipo.toUpperCase()}! Faça login agora.`);
        setIsSignup(false);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setUsername("");
        setPhone("");
        setIsStaff(false);
      } else {
        setError(data.error || data.message || "Erro ao cadastrar. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro de rede:", err);
      setError("Falha na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // 🎨 Interface
  // -------------------------
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -15, z: -100 }}
      animate={{ opacity: 1, rotateY: 0, z: 0 }}
      exit={{ opacity: 0, rotateY: 15, z: -100 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md mx-auto perspective-1000"
    >
      <div className="text-center mb-8">
        <ParticleLogo />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent"
        >
          EstudaAI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-purple-300/70 mt-2"
        >
          {isSignup ? "Crie sua conta gratuita" : "Aprendizado inteligente do futuro"}
        </motion.p>
      </div>

      <div className="flex justify-center mb-4 h-10">
        <AIThinkingMessage message={aiMessage} show={showAiMessage} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative backdrop-blur-2xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl"
      >
        <h2 className="mb-6 text-white relative z-10">
          {isSignup ? "Crie sua conta" : "Bem-vindo de volta"}
        </h2>

        <div className="space-y-5 relative z-10">
          {/* Campos extras apenas no cadastro */}
          {isSignup && (
            <>
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-purple-200">
                  Nome de usuário
                </Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/60" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Seu nome de usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-12 h-14 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder:text-purple-300/40 focus:border-purple-500 focus:bg-white/10"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-purple-200">
              E-mail
            </Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/60" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="pl-12 h-14 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder:text-purple-300/40 focus:border-purple-500 focus:bg-white/10"
              />
            </div>
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-purple-200">
              Senha
            </Label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/60" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="pl-12 pr-12 h-14 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder:text-purple-300/40 focus:border-purple-500 focus:bg-white/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/60 hover:text-purple-400"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Confirmar senha e telefone */}
          {isSignup && (
            <>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-purple-200">
                  Confirmar senha
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-4 h-14 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder:text-purple-300/40 focus:border-purple-500 focus:bg-white/10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-purple-200">
                  Telefone
                </Label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/60" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-12 h-14 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder:text-purple-300/40 focus:border-purple-500 focus:bg-white/10"
                  />
                </div>
              </div>

              {/* ✅ Checkbox de administrador */}
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  id="isStaff"
                  checked={isStaff}
                  onChange={(e) => setIsStaff(e.target.checked)}
                  className="w-4 h-4 accent-purple-500"
                />
                <Label htmlFor="isStaff" className="text-purple-200">
                  Criar como administrador
                </Label>
              </div>
            </>
          )}

          {error && <p className="text-red-400 text-sm -mt-2">{error}</p>}

          {/* Botão principal */}
          <Button
            onClick={isSignup ? handleSignup : handleLogin}
            disabled={!isFormValid || loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#6A00FF] to-[#00BFFF] hover:shadow-lg hover:shadow-purple-500/40"
          >
            {loading ? (isSignup ? "Cadastrando..." : "Entrando...") : isSignup ? "Cadastrar" : "Entrar"}
            <ArrowRight className="ml-2" />
          </Button>

          {/* Alternar */}
          <p className="text-center text-purple-300/70 mt-6">
            {isSignup ? (
              <>
                Já tem conta?{" "}
                <motion.button onClick={() => setIsSignup(false)} className="text-purple-400 hover:text-purple-300">
                  Entrar
                </motion.button>
              </>
            ) : (
              <>
                Ainda não tem conta?{" "}
                <motion.button onClick={() => setIsSignup(true)} className="text-purple-400 hover:text-purple-300">
                  Cadastre-se
                </motion.button>
              </>
            )}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}