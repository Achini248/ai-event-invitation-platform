import { motion } from 'framer-motion';

const GRADIENT_PAIRS = [
  ['#00d4ff', '#7c3aed'],
  ['#7c3aed', '#ec4899'],
  ['#06b6d4', '#3b82f6'],
  ['#10b981', '#00d4ff'],
  ['#f59e0b', '#ef4444'],
  ['#8b5cf6', '#06b6d4'],
];

export default function SpeakerCard({ speaker, index = 0 }) {
  const [c1, c2] = GRADIENT_PAIRS[index % GRADIENT_PAIRS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="glass rounded-2xl p-4 text-center group"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
      whileHover={{ y: -5, borderColor: 'rgba(0,212,255,0.25)' }}
    >
      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center font-display font-bold text-slate-100 dark:text-white text-base select-none"
        style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
      >
        {speaker.initials}
      </div>
      <p className="font-display font-semibold text-slate-900 dark:text-white text-xs leading-snug mb-0.5">
        {speaker.name}
      </p>
      <p className="font-body text-slate-600 dark:text-slate-500 text-xs leading-snug">{speaker.role}</p>
      <p className="font-mono text-xs mt-1 text-cyan-600 dark:text-cyan-400" style={{ color: c1 }}>{speaker.company}</p>
    </motion.div>
  );
}
