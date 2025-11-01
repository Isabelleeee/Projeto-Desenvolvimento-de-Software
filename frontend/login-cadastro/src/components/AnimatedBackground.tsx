import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface MathSymbol {
  id: number;
  symbol: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  fontSize: number;
}

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mathSymbols, setMathSymbols] = useState<MathSymbol[]>([]);
  const [mounted, setMounted] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);

    // Mathematical symbols
    const symbols = ['∑', '∫', '∂', 'π', '∞', '√', '±', '≈', '≠', '≤', '≥', 'α', 'β', 'θ', 'Δ', '∇', 'Ω', 'λ', 'μ', 'σ'];
    const newMathSymbols: MathSymbol[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 30,
      delay: Math.random() * 10,
      fontSize: Math.random() * 20 + 16,
    }));
    setMathSymbols(newMathSymbols);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const rotateX = useTransform(mouseYSpring, [0, window.innerHeight], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [0, window.innerWidth], [-5, 5]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient with deep purple and neon blue */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0015] via-[#1a0030] to-[#000820]" />
      
      {/* Animated gradient orbs with 3D effect */}
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        className="absolute inset-0"
      >
        {/* Purple orb */}
        <motion.div
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-3xl opacity-40"
          style={{
            background: 'radial-gradient(circle, #6A00FF 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Blue neon orb */}
        <motion.div
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-3xl opacity-40"
          style={{
            background: 'radial-gradient(circle, #00BFFF 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Center glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #8B00FF 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Light waves */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent,
                rgba(106, 0, 255, 0.1) 1px,
                transparent 2px,
                transparent 100px
              ),
              repeating-linear-gradient(
                0deg,
                transparent,
                rgba(0, 191, 255, 0.1) 1px,
                transparent 2px,
                transparent 100px
              )
            `,
          }}
        />
      </motion.div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: 'radial-gradient(circle, rgba(106, 0, 255, 0.8), rgba(0, 191, 255, 0.4))',
            boxShadow: '0 0 20px rgba(106, 0, 255, 0.5)',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Mathematical symbols floating */}
      {mathSymbols.map((mathSymbol) => (
        <motion.div
          key={`math-${mathSymbol.id}`}
          className="absolute text-purple-400/10 select-none pointer-events-none"
          style={{
            left: `${mathSymbol.x}%`,
            top: `${mathSymbol.y}%`,
            fontSize: mathSymbol.fontSize,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.05, 0.15, 0.05],
            rotate: [0, 360],
          }}
          transition={{
            duration: mathSymbol.duration,
            repeat: Infinity,
            delay: mathSymbol.delay,
            ease: "easeInOut",
          }}
        >
          {mathSymbol.symbol}
        </motion.div>
      ))}

      {/* Scanlines effect */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
}
