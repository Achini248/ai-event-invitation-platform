import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { stagger, fadeUp } from '../../utils/motionVariants';

const HIGHLIGHTS = [
  'Oracle Gen AI & Predictive SCM Platform deep-dives',
  'Real-world digital transformation case studies',
  'Practical step-by-step implementation strategies',
  'Cross-industry executive panel discussions',
  'Live Q&A with regional supply chain leaders',
];

const AI_STEPS = ['Interest Analysis', 'Session Matching', 'Email Generation', 'MCP Automation'];

export default function AboutSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="relative py-24 px-6" style={{ zIndex: 2 }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <span className="kw-tag">About the Event</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="section-heading text-center gradient-text mb-4">
            Where AI Meets Supply Chain
          </motion.h2>
          <motion.p variants={fadeUp} className="section-sub text-center mx-auto mb-16">
            A landmark gathering of ECEMEA's top logistics executives, technology architects,
            and operations innovators — navigating the turbulent intersection of AI and global supply chains.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left — highlights */}
            <motion.div variants={fadeUp}>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-4">The Challenge Ahead</h3>
              <p className="font-body text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Gulf regional supply chains face unprecedented pressure — rising operational costs,
                macroeconomic volatility, and a rapid shift to digital-first logistics. Organisations
                that fail to adapt risk being left behind.
              </p>
              <p className="font-body text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                ACCELALPHA-ORACLE-2024 brings together the minds shaping the industry's response,
                from Oracle's Gen AI SCM Platform to real-world transformation stories from
                Al-Futtaim, Weatherford, and Dubai Cable Company.
              </p>
              <ul className="space-y-2.5">
                {HIGHLIGHTS.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 flex-shrink-0 mt-2" />
                    <span className="font-body text-slate-700 dark:text-slate-300 text-sm">{h}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right — AI flow card */}
            <motion.div variants={fadeUp}>
              <div
                className="glass rounded-2xl p-6 bg-white dark:bg-slate-950/50"
                style={{ border: '1px solid rgba(124,58,237,0.2)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(124,58,237,0.2)' }}>
                    <span>🤖</span>
                  </div>
                  <span className="font-display font-semibold text-slate-900 dark:text-white">AI-Powered Experience</span>
                </div>
                <p className="font-body text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
                  This platform uses Gemini AI to match your professional challenges to the most
                  relevant conference session, then generates a personalised B2B invitation email
                  — all backed by an MCP automation trigger.
                </p>
                <div className="space-y-3">
                  {AI_STEPS.map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <span
                        className="font-mono text-xs w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-cyan-600 dark:text-cyan-400"
                        style={{
                          background: 'rgba(0,212,255,0.1)',
                          border: '1px solid rgba(0,212,255,0.2)',
                        }}
                      >
                        {i + 1}
                      </span>
                      <span className="font-body text-slate-700 dark:text-slate-300 text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
