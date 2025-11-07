import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignupForm";

export default function App() {
  const [currentView, setCurrentView] = useState<"login" | "signup">("login");
  console.log("🟢 Current view:", currentView);
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <AnimatedBackground />

      <AnimatePresence mode="wait">
        {currentView === "login" ? (
          <motion.div
            key="login-screen"
            initial={{ opacity: 0, y: 50, rotateY: 15 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            exit={{ opacity: 0, y: -50, rotateY: -15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md"
          >
            <LoginForm onSwitchToSignup={() => setCurrentView("signup")} />
          </motion.div>
        ) : (
          <motion.div
            key="signup-screen"
            initial={{ opacity: 0, y: 50, rotateY: -15 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            exit={{ opacity: 0, y: -50, rotateY: 15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md"
          >
            <SignupForm onSwitchToLogin={() => setCurrentView("login")} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Efeito de transição sutil entre telas */}
      <AnimatePresence>
        <motion.div
          key={currentView}
          className="fixed inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
    </div>
  );
}
