import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';

export default function App() {
  const [currentView, setCurrentView] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <AnimatedBackground />
      
      {/* Cinematic transition with blur effect */}
      <motion.div
        className="relative z-10 w-full"
        animate={{
          filter: currentView === 'login' ? 'blur(0px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {currentView === 'login' ? (
            <LoginForm
              key="login"
              onSwitchToSignup={() => setCurrentView('signup')}
            />
          ) : (
            <SignupForm
              key="signup"
              onSwitchToLogin={() => setCurrentView('login')}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Transition overlay effect */}
      <AnimatePresence>
        {currentView && (
          <motion.div
            key={`overlay-${currentView}`}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black pointer-events-none z-20"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
