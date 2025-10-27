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

  const isEmailValid = email.includes('@') && email.includes('.');
  const isPasswordValid = password.length >= 6;
  const isPasswordMatch = password === confirmPassword && confirmPassword.length > 0;
  const isNameValid = name.length >= 3;

  const isFormValid = isNameValid && isEmailValid && isPasswordValid && isPasswordMatch;

  // Calculate form progress
  useEffect(() => {
    let progress = 0;
    if (isNameValid) progress += 25;
    if (isEmailValid) progress += 25;
    if (isPasswordValid) progress += 25;
    if (isPasswordMatch) progress += 25;
    setFormProgress(progress);
  }, [isNameValid, isEmailValid, isPasswordValid, isPasswordMatch]);

  // AI messages based on focused field
  useEffect(() => {
    if (focusedField === 'name') {
      setAiMessage('Como devemos te chamar?');
      setShowAiMessage(true);
    } else if (focusedField === 'email') {
      setAiMessage('Verificando disponibilidade...');
      setShowAiMessage(true);
    } else if (focusedField === 'password') {
      setAiMessage('Crie uma senha forte para proteger sua conta');
      setShowAiMessage(true);
    } else if (focusedField === 'confirmPassword') {
      setAiMessage('Confirme sua senha para garantir');
      setShowAiMessage(true);
    } else {
      setShowAiMessage(false);
    }
  }, [focusedField]);

  // Success message
  useEffect(() => {
    if (isFormValid && !focusedField) {
      setAiMessage('Perfeito! Sua conta está pronta para ser criada ✨');
      setShowAiMessage(true);
      const timer = setTimeout(() => setShowAiMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isFormValid, focusedField]);

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

      {/* AI Thinking Message */}
      <div className="flex justify-center mb-4 h-10">
        <AIThinkingMessage message={aiMessage} show={showAiMessage} />
      </div>

      {/* Glassmorphism form panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative backdrop-blur-2xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden"
        style={{
          boxShadow: '0 8px 32px 0 rgba(106, 0, 255, 0.2), inset 0 0 80px rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${formProgress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Inner glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 pointer-events-none" />

        <h2 className="mb-6 text-white relative z-10">Criar nova conta</h2>

        <div className="space-y-4 relative z-10">
          {/* Name field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-purple-200">
              Nome completo
            </Label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/60 transition-colors group-focus-within:text-purple-400" />
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="pl-12 pr-12 h-12 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder:text-purple-300/40 transition-all duration-300 focus:border-purple-500 focus:bg-white/10 focus:shadow-lg focus:shadow-purple-500/20"
              />
              {name.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {isNameValid ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                  )}
                </motion.div>
              )}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: focusedField === 'name' ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Email field */}
          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-purple-200">
              E-mail
            </Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/60 transition-colors group-focus-within:text-purple-400" />
              <Input
                id="signup-email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="pl-12 pr-12 h-12 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder:text-purple-300/40 transition-all duration-300 focus:border-purple-500 focus:bg-white/10 focus:shadow-lg focus:shadow-purple-500/20"
              />
              {email.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {isEmailValid ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                  )}
                </motion.div>
              )}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: focusedField === 'email' ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-purple-200">
              Senha
            </Label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/60 transition-colors group-focus-within:text-purple-400" />
              <Input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="pl-12 pr-12 h-12 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder:text-purple-300/40 transition-all duration-300 focus:border-purple-500 focus:bg-white/10 focus:shadow-lg focus:shadow-purple-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/60 hover:text-purple-400 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: focusedField === 'password' ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Confirm password field */}
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-purple-200">
              Confirmar senha
            </Label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/60 transition-colors group-focus-within:text-purple-400" />
              <Input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Digite a senha novamente"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setFocusedField('confirmPassword')}
                onBlur={() => setFocusedField(null)}
                className="pl-12 pr-12 h-12 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder:text-purple-300/40 transition-all duration-300 focus:border-purple-500 focus:bg-white/10 focus:shadow-lg focus:shadow-purple-500/20"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/60 hover:text-purple-400 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: focusedField === 'confirmPassword' ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
            {confirmPassword.length > 0 && !isPasswordMatch && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400"
              >
                As senhas não coincidem
              </motion.p>
            )}
          </div>

          {/* Signup button with gradient fill */}
          <motion.div
            className="relative pt-2"
            whileHover={{ scale: isFormValid ? 1.02 : 1, z: 10 }}
            whileTap={{ scale: isFormValid ? 0.98 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              className={`w-full h-12 rounded-2xl relative overflow-hidden transition-all duration-300 ${
                isFormValid
                  ? 'bg-gradient-to-r from-[#6A00FF] to-[#00BFFF] hover:shadow-2xl hover:shadow-purple-500/50'
                  : 'bg-white/10 cursor-not-allowed'
              }`}
              disabled={!isFormValid}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Criar conta
                <SparklesIcon className="w-5 h-5" />
              </span>

              {/* Progress fill effect */}
              {!isFormValid && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${formProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              )}

              {/* Shine effect */}
              {isFormValid && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />
              )}
            </Button>

            {/* 3D shadow effect */}
            {isFormValid && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-xl opacity-30 -z-10" />
            )}
          </motion.div>

          {/* Login link */}
          <p className="text-center text-purple-300/70 mt-6">
            Já tem conta?{' '}
            <motion.button
              onClick={onSwitchToLogin}
              className="text-purple-400 hover:text-purple-300 transition-colors relative group"
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
