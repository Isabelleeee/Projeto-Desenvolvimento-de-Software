import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { ParticleLogo } from './ParticleLogo';
import { AIThinkingMessage } from './AIThinkingMessage';

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [showAiMessage, setShowAiMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFormValid = email.length > 0 && password.length > 0;

  // Mensagens animadas da IA
  useEffect(() => {
    if (emailFocused) {
      setAiMessage('Digite seu e-mail cadastrado...');
      setShowAiMessage(true);
    } else if (passwordFocused) {
      setAiMessage('Sua senha está protegida com criptografia de ponta');
      setShowAiMessage(true);
    } else {
      setShowAiMessage(false);
    }
  }, [emailFocused, passwordFocused]);

  useEffect(() => {
    if (isFormValid && !emailFocused && !passwordFocused) {
      setAiMessage('Tudo pronto! Você pode entrar agora ✨');
      setShowAiMessage(true);
      const timer = setTimeout(() => setShowAiMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isFormValid, emailFocused, passwordFocused]);

  // Login com backend Django
  const handleLogin = async (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();

    if (!isFormValid) {
      setAiMessage('Preencha todos os campos antes de continuar.');
      setShowAiMessage(true);
      return;
    }

    setLoading(true);
    setAiMessage('Verificando suas credenciais...');
    setShowAiMessage(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/principal/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email.trim(),
          password: password.trim(),
          profile_type: email.includes('admin') ? 'admin' : 'estudante',
        }),
        credentials: 'include', // mantém a sessão entre React e Django
      });

      const data = await response.json();
      console.log('🔍 Login response:', data);

      if (response.ok && data.user_type) {
        setAiMessage('Login realizado com sucesso! Redirecionando...');
        setShowAiMessage(true);

        setTimeout(() => {
          if (data.user_type === 'admin') {
            console.log('Redirecionando para painel admin...');
            window.location.href = 'http://127.0.0.1:8000/admin/';
          } else {
            console.log('Redirecionando para área do estudante...');
            window.location.href = 'http://localhost:3002/';
          }
        }, 800);
      } else {
        console.error('Erro de login:', data);
        setAiMessage(data.error || 'Credenciais inválidas. Tente novamente.');
        setShowAiMessage(true);
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      setAiMessage('Erro ao conectar com o servidor.');
      setShowAiMessage(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -15, z: -100 }}
      animate={{ opacity: 1, rotateY: 0, z: 0 }}
      exit={{ opacity: 0, rotateY: 15, z: -100 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md mx-auto perspective-1000"
    >
      {/* Logo com partículas */}
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
          Aprendizado inteligente do futuro
        </motion.p>
      </div>

      {/* Mensagem de IA */}
      <div className="flex justify-center mb-4 h-10">
        <AIThinkingMessage message={aiMessage} show={showAiMessage} />
      </div>

      {/* Formulário */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative backdrop-blur-2xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl"
        style={{
          boxShadow:
            '0 8px 32px 0 rgba(106, 0, 255, 0.2), inset 0 0 80px rgba(255, 255, 255, 0.05)',
        }}
      >
        <h2 className="mb-6 text-white relative z-10">Bem-vindo de volta</h2>

        <div className="space-y-5 relative z-10">
          {/* Usuário */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-purple-200">
              Usuário
            </Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/60" />
              <Input
                id="email"
                type="text"
                placeholder="Digite seu usuário"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="pl-12 h-14 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder:text-purple-300/40 transition-all duration-300 focus:border-purple-500 focus:bg-white/10"
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
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="pl-12 pr-12 h-14 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder:text-purple-300/40 transition-all duration-300 focus:border-purple-500 focus:bg-white/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/60 hover:text-purple-400 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Botão Entrar */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleLogin}
              disabled={!isFormValid || loading}
              className={`w-full h-14 rounded-2xl transition-all duration-300 ${
                isFormValid
                  ? 'bg-gradient-to-r from-[#6A00FF] to-[#00BFFF] hover:shadow-2xl'
                  : 'bg-white/10 cursor-not-allowed'
              }`}
            >
              {loading ? 'Entrando...' : 'Entrar'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>

          {/* Link de cadastro */}
          <p className="text-center text-purple-300/70 mt-6">
            Ainda não tem conta?{' '}
            <motion.button
              onClick={onSwitchToSignup}
              className="text-purple-400 hover:text-purple-300 transition-colors relative group"
              whileHover={{ x: 2 }}
            >
              Cadastre-se
            </motion.button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
