import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { stagger, fadeUp } from '../../utils/motionVariants';
import Button from '../common/Button';
import { EVENT_NAME, EVENT_THEME } from '../../utils/constants';

/* ── Particle canvas ── */
function ParticleCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const pts = Array.from({ length: 72 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      a:  Math.random() * 0.45 + 0.08,
      c:  Math.random() > 0.5 ? '0,212,255' : '124,58,237',
    }));

    let id;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 95) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0,212,255,${(1 - d / 95) * 0.07})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      id = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}

/* ── Hero ── */
export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ zIndex: 2 }}
    >
      <ParticleCanvas />

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center gap-6">

          {/* Live badge */}
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
                {EVENT_NAME}
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp}
            className="font-display font-bold leading-none tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            <span className="text-slate-900 dark:text-white">Troubled</span>{' '}
            <span className="gradient-text">Waters</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p variants={fadeUp}
            className="font-display font-medium text-xl md:text-2xl text-slate-600 dark:text-slate-300"
          >
            {EVENT_THEME}
          </motion.p>

          {/* Meta chips */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-5 text-sm text-slate-600 dark:text-slate-400">
            {[
              { icon: '📍', text: 'Dubai, UAE' },
              { icon: '🗓', text: '2024 · One-Day Summit' },
              { icon: '🤖', text: 'AI-Personalised Experience' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 font-body">
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button href="#register" size="lg">✨ Get Your AI Invitation</Button>
            <Button href="#agenda" variant="outline" size="lg">View Full Agenda</Button>
          </motion.div>

          {/* Scroll cue */}
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-2 mt-10 text-slate-600 dark:text-slate-600">
            <span className="font-mono text-xs tracking-widest uppercase">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5 border border-slate-400 dark:border-slate-600"
            >
              <div className="w-1 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400" />
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
