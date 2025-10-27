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

  const isFormValid = email.length > 0 && password.length > 0;

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

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -15, z: -100 }}
      animate={{ opacity: 1, rotateY: 0, z: 0 }}
      exit={{ opacity: 0, rotateY: 15, z: -100 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md mx-auto perspective-1000"
    >
      {/* Logo with particle animation */}
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

      {/* AI Thinking Message */}
      <div className="flex justify-center mb-4 h-10">
        <AIThinkingMessage message={aiMessage} show={showAiMessage} />
      </div>

      {/* Glassmorphism form panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative backdrop-blur-2xl bg-white/5 rounded-3xl p-8 border border-white/10 shadow-2xl"
        style={{
          boxShadow: '0 8px 32px 0 rgba(106, 0, 255, 0.2), inset 0 0 80px rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 pointer-events-none" />

        <h2 className="mb-6 text-white relative z-10">Bem-vindo de volta</h2>

        <div className="space-y-5 relative z-10">
          {/* Email field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-purple-200">
              E-mail
            </Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/60 transition-colors group-focus-within:text-purple-400" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="pl-12 h-14 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder:text-purple-300/40 transition-all duration-300 focus:border-purple-500 focus:bg-white/10 focus:shadow-lg focus:shadow-purple-500/20"
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: emailFocused ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-purple-200">
              Senha
            </Label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/60 transition-colors group-focus-within:text-purple-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="pl-12 pr-12 h-14 rounded-2xl bg-white/5 border-2 border-white/10 text-white placeholder:text-purple-300/40 transition-all duration-300 focus:border-purple-500 focus:bg-white/10 focus:shadow-lg focus:shadow-purple-500/20"
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
                animate={{ width: passwordFocused ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Login button with 3D effect */}
          <motion.div
            className="relative"
            whileHover={{ scale: isFormValid ? 1.02 : 1, z: 10 }}
            whileTap={{ scale: isFormValid ? 0.98 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              className={`w-full h-14 rounded-2xl relative overflow-hidden transition-all duration-300 ${
                isFormValid
                  ? 'bg-gradient-to-r from-[#6A00FF] to-[#00BFFF] hover:shadow-2xl hover:shadow-purple-500/50'
                  : 'bg-white/10 cursor-not-allowed'
              }`}
              disabled={!isFormValid}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Entrar
                <ArrowRight className="w-5 h-5" />
              </span>
              
              {/* Animated gradient overlay on hover */}
              {isFormValid && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0"
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
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

          {/* Signup link */}
          <p className="text-center text-purple-300/70 mt-6">
            Ainda não tem conta?{' '}
            <motion.button
              onClick={onSwitchToSignup}
              className="text-purple-400 hover:text-purple-300 transition-colors relative group"
              whileHover={{ x: 2 }}
            >
              Cadastre-se
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

      {/* Sound effect note (visual only, actual sound would require audio files) */}
      {/* In a real implementation, you would add: onClick={() => new Audio('/sounds/click.mp3').play()} */}
    </motion.div>
  );
}
