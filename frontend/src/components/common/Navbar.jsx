import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import logoSrc from '../../assets/logo.svg';
import { EVENT_NAME } from '../../utils/constants';

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Agenda',   href: '#agenda' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Register', href: '#register' },
];

export default function Navbar({ isDark, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-md shadow-xl shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + wordmark */}
        <a href="#" className="flex items-center gap-3 group">
          <img src={logoSrc} alt="Logo" className="w-8 h-8 group-hover:scale-110 transition-transform" />
          <div className="hidden sm:block leading-none">
            <span className="font-display font-bold text-slate-900 dark:text-white text-sm tracking-wider">ACCELALPHA</span>
            <span className="font-mono text-cyan-500 dark:text-cyan-400 text-xs ml-1.5 opacity-70">× ORACLE</span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="font-body text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors relative group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-cyan-500 dark:bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right: theme toggle + CTA */}
        <div className="flex items-center gap-3">
          <ThemeToggle isDark={isDark} toggle={toggleTheme} />
          <a
            href="#register"
            className="hidden md:inline-flex items-center font-display font-semibold text-sm px-5 py-2 rounded-xl text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg,#00d4ff,#7c3aed)',
              boxShadow: '0 0 0 rgba(0,212,255,0)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,212,255,0.4)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 0 rgba(0,212,255,0)')}
          >
            Get Invited
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden p-1.5 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden glass-md overflow-hidden"
          >
            <div className="px-6 pb-5 pt-2 flex flex-col gap-3">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="font-body text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors py-1.5 border-b border-slate-200 dark:border-slate-800 last:border-0"
                >
                  {label}
                </a>
              ))}
              <a
                href="#register"
                onClick={() => setOpen(false)}
                className="mt-2 text-center font-display font-semibold text-sm py-3 rounded-xl text-white"
                style={{ background: 'linear-gradient(135deg,#00d4ff,#7c3aed)' }}
              >
                Get Invited
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
