import { useState } from "react";
import { motion } from "motion/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Mail, Lock, User, Phone, ArrowLeft } from "lucide-react";

interface SignupFormProps {
  onSwitchToLogin?: () => void;
}

export function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError(null);
    setSuccess(null);

    if (!username || !email || !phone || !password || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/cadastro/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) localStorage.setItem("api_token", data.token);

        setSuccess("Usuário cadastrado com sucesso!");
        if (data.redirect) {
          setTimeout(() => {
            window.location.href = data.redirect;
          }, 1000);
        } else {
          setTimeout(() => {
            onSwitchToLogin?.();
          }, 1500);
        }
      } else {
        setError(data.error || "Erro ao cadastrar. Tente novamente.");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto text-white backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        Crie sua conta
      </h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="username">Nome de usuário</Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu nome"
              className="pl-12 bg-white/5 text-white border-white/10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="pl-12 bg-white/5 text-white border-white/10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone">Telefone</Label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(xx) xxxxx-xxxx"
              className="pl-12 bg-white/5 text-white border-white/10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-12 bg-white/5 text-white border-white/10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-12 bg-white/5 text-white border-white/10"
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-sm">{success}</p>}

        <Button
          onClick={handleSignup}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-lg hover:shadow-purple-500/30"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>

        <button
          type="button"
          onClick={onSwitchToLogin}
          className="w-full flex items-center justify-center mt-4 text-purple-300 hover:text-purple-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para o login
        </button>
      </div>
    </motion.div>
  );
}
