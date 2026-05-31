import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SessionTag from './SessionTag';
import { SESSION_TYPES } from '../../utils/constants';

export default function AgendaCard({ session, index = 0 }) {
  const [open, setOpen] = useState(false);
  const typeStyle = SESSION_TYPES[session.session_type] || SESSION_TYPES.session;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => setOpen((v) => !v)}
      className="glass rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
      whileHover={{ borderColor: typeStyle.border }}
    >
      {/* Card header */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            {/* Time + badge row */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-xs text-slate-500 dark:text-slate-500">{session.time}</span>
              <SessionTag type={session.session_type} />
            </div>
            {/* Title */}
            <h3
              className="font-display font-semibold text-slate-900 dark:text-white text-[15px] leading-snug mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-200"
            >
              {session.title}
            </h3>
            {/* Speaker */}
            <p className="font-body text-slate-600 dark:text-slate-400 text-sm leading-snug">{session.speaker}</p>
          </div>

          {/* Expand chevron */}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.22 }}
            className="text-slate-500 dark:text-slate-600 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-1"
          >
            <ChevronDown size={16} />
          </motion.span>
        </div>

        {/* Expandable body */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                <p className="font-body text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
                  {session.description}
                </p>
                {session.keywords?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {session.keywords.map((kw) => (
                      <span key={kw} className="kw-tag">{kw}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom accent */}
      <motion.div
        className="h-px origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ background: `linear-gradient(90deg, ${typeStyle.color}, transparent)` }}
      />
    </motion.article>
  );
}
