import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function ParticleLogo() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 12,
    delay: i * 0.05,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative inline-flex items-center justify-center"
    >
      {/* Outer particles forming */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-purple-400 to-blue-400"
          initial={{
            x: Math.cos((particle.angle * Math.PI) / 180) * 60,
            y: Math.sin((particle.angle * Math.PI) / 180) * 60,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: Math.cos((particle.angle * Math.PI) / 180) * 40,
            y: Math.sin((particle.angle * Math.PI) / 180) * 40,
            opacity: [0, 1, 0.6],
            scale: [0, 1.5, 1],
          }}
          transition={{
            duration: 1.2,
            delay: particle.delay,
            ease: "easeOut",
          }}
          style={{
            boxShadow: '0 0 10px rgba(106, 0, 255, 0.6)',
          }}
        />
      ))}

      {/* Center logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6A00FF] to-[#00BFFF] flex items-center justify-center shadow-2xl"
        style={{
          boxShadow: '0 0 40px rgba(106, 0, 255, 0.6), 0 0 80px rgba(0, 191, 255, 0.4)',
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400 to-blue-400 opacity-50 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Energy ring */}
      <motion.div
        className="absolute inset-0 w-20 h-20 rounded-full border-2 border-purple-500"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
