import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, User, CheckCircle2, AlertCircle, Sparkles as SparklesIcon } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { ParticleLogo } from './ParticleLogo';
import { AIThinkingMessage } from './AIThinkingMessage';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [aiMessage, setAiMessage] = useState('');
  const [showAiMessage, setShowAiMessage] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isEmailValid = email.includes('@') && email.includes('.');
  const isPasswordValid = password.length >= 6;
  const isPasswordMatch = password === confirmPassword && confirmPassword.length > 0;
  const isNameValid = name.length >= 3;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid && isPasswordMatch;

  // Progresso do formulário
  useEffect(() => {
    let progress = 0;
    if (isNameValid) progress += 25;
    if (isEmailValid) progress += 25;
    if (isPasswordValid) progress += 25;
    if (isPasswordMatch) progress += 25;
    setFormProgress(progress);
  }, [isNameValid, isEmailValid, isPasswordValid, isPasswordMatch]);

  // Mensagens de IA dinâmicas
  useEffect(() => {
    if (focusedField === 'name') setAiMessage('Como devemos te chamar?');
    else if (focusedField === 'email') setAiMessage('Digite seu e-mail válido 📧');
    else if (focusedField === 'password') setAiMessage('Crie uma senha forte 🔒');
    else if (focusedField === 'confirmPassword') setAiMessage('Confirme sua senha para garantir 🧩');
    else setShowAiMessage(false);

    setShowAiMessage(!!focusedField);
  }, [focusedField]);

  useEffect(() => {
    if (isFormValid && !focusedField) {
      setAiMessage('Perfeito! Sua conta está pronta para ser criada ✨');
      setShowAiMessage(true);
      const timer = setTimeout(() => setShowAiMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isFormValid, focusedField]);

  // ==========================
  // 📡 Integração com Backend
  // ==========================
  const handleSignup = async () => {
    if (!isFormValid || loading) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('http://127.0.0.1:8000/cadastro/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Cadastro realizado com sucesso! 🎉');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => onSwitchToLogin(), 1800);
      } else {
        setError(data?.error || 'Erro ao cadastrar. Verifique os dados e tente novamente.');
      }
    } catch (err) {
      console.error('Erro de conexão:', err);
      setError('Erro ao conectar com o servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 15, z: -100 }}
      animate={{ opacity: 1, rotateY: 0, z: 0 }}
      exit={{ opacity: 0, rotateY: -15, z: -100 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md mx-auto perspective-1000"
    >
      {/* Logo */}
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
          Comece sua jornada de aprendizado
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
        className="relative backdrop-blur-2xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Barra de progresso */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${formProgress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        <h2 className="mb-6 text-white relative z-10">Criar nova conta</h2>

        <div className="space-y-4 relative z-10">
          {/* Campos */}
          {/* Nome */}
          <Label htmlFor="name" className="text-purple-200">Nome completo</Label>
          <Input
            id="name"
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            className="pl-4 h-12 rounded-2xl bg-white/5 border-2 border-white/10 text-white"
          />

          {/* E-mail */}
          <Label htmlFor="email" className="text-purple-200">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className="pl-4 h-12 rounded-2xl bg-white/5 border-2 border-white/10 text-white"
          />

          {/* Senha */}
          <Label htmlFor="password" className="text-purple-200">Senha</Label>
          <div className="relative group">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              className="pl-12 pr-12 h-12 rounded-2xl bg-white/5 border-2 border-white/10 text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/60 hover:text-purple-400 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirmar senha */}
          <Label htmlFor="confirmPassword" className="text-purple-200">Confirmar senha</Label>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Repita a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => setFocusedField('confirmPassword')}
            onBlur={() => setFocusedField(null)}
            className="pl-4 h-12 rounded-2xl bg-white/5 border-2 border-white/10 text-white"
          />

          {/* Mensagens */}
          {error && <p className="text-red-400 text-sm -mt-2">{error}</p>}
          {success && <p className="text-green-400 text-sm -mt-2">{success}</p>}

          {/* Botão */}
          <motion.div
            className="relative pt-2"
            whileHover={{ scale: isFormValid ? 1.02 : 1 }}
            whileTap={{ scale: isFormValid ? 0.98 : 1 }}
          >
            <Button
              onClick={handleSignup}
              disabled={!isFormValid || loading}
              className={`w-full h-12 rounded-2xl ${
                isFormValid
                  ? 'bg-gradient-to-r from-[#6A00FF] to-[#00BFFF]'
                  : 'bg-white/10 cursor-not-allowed'
              }`}
            >
              {loading ? 'Cadastrando...' : 'Criar conta'}
              <SparklesIcon className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>

          {/* Voltar ao login */}
          <p className="text-center text-purple-300/70 mt-6">
            Já tem conta?{' '}
            <motion.button
              onClick={onSwitchToLogin}
              className="text-purple-400 hover:text-purple-300 relative group"
              whileHover={{ x: 2 }}
            >
              Faça login
              <motion.span
                className="absolute bottom-0 left-0 h-px bg-purple-400"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
