import { motion } from 'framer-motion';

/**
 * variant: 'primary' | 'outline' | 'ghost'
 * size: 'sm' | 'md' | 'lg'
 */
export default function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
}) {
  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
  };

  const base =
    `inline-flex items-center justify-center gap-2 font-display font-semibold rounded-xl
     transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
     disabled:opacity-40 disabled:cursor-not-allowed ${sizes[size]} ${className}`;

  const variants = {
    primary: {
      style: { background: 'linear-gradient(135deg,#00d4ff,#7c3aed)' },
      className: 'text-white hover:opacity-90 hover:-translate-y-0.5',
      hoverShadow: '0 8px 32px rgba(0,212,255,0.35)',
    },
    outline: {
      style: { border: '1px solid rgba(0,212,255,0.5)', color: '#00d4ff', background: 'transparent' },
      className: 'hover:bg-cyan-400/10 hover:-translate-y-0.5 dark:text-cyan-400 text-cyan-600',
      hoverShadow: '0 0 16px rgba(0,212,255,0.25)',
    },
    ghost: {
      style: { color: '#475569', background: 'transparent' },
      className: 'dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 hover:text-slate-900 hover:bg-black/5',
      hoverShadow: 'none',
    },
  };

  const v = variants[variant] || variants.primary;

  const el = (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { y: -2, boxShadow: v.hoverShadow }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`${base} ${v.className}`}
      style={v.style}
    >
      {children}
    </motion.button>
  );

  if (href) {
    return (
      <a href={href}>
        {el}
      </a>
    );
  }
  return el;
}
