import { motion } from 'framer-motion';

export default function ThemeToggle({ isDark, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle colour theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-12 h-6 rounded-full flex-shrink-0 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      style={{
        background: 'var(--toggle-bg)',
        border: '1px solid var(--border)',
      }}
    >
      <motion.span
        animate={{ x: isDark ? 2 : 26 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className="absolute top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs leading-none select-none"
        style={{ background: 'var(--toggle-thumb)' }}
      >
        {isDark ? '🌙' : '☀️'}
      </motion.span>
    </button>
  );
}
