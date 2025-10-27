import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface AIThinkingMessageProps {
  message: string;
  show: boolean;
}

export function AIThinkingMessage({ message, show }: AIThinkingMessageProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md border border-purple-500/30"
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
          </motion.div>
          <span className="text-purple-200">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
