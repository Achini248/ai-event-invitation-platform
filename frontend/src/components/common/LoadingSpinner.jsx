import { motion } from 'framer-motion';

export default function LoadingSpinner({ message = 'Processing…', sub = '' }) {
  return (
    <div className="flex flex-col items-center gap-5 py-10">
      {/* Spinner ring */}
      <div className="relative w-16 h-16">
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: '2px solid rgba(0,212,255,0.1)' }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid transparent',
            borderTopColor: '#00d4ff',
            borderRightColor: 'rgba(0,212,255,0.4)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        {/* Pulsing centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-3 h-3 rounded-full"
            style={{ background: 'radial-gradient(circle, #00d4ff, #7c3aed)' }}
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Message */}
      <div className="text-center space-y-2">
        <motion.p
          className="font-body text-slate-700 dark:text-slate-300 text-sm"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message}
        </motion.p>
        {sub && <p className="font-mono text-xs text-slate-700 dark:text-slate-600">{sub}</p>}

        {/* Bounce dots */}
        <div className="flex justify-center gap-1.5 pt-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.14, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
