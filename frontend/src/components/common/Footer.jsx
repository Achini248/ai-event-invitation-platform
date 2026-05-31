import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeUp } from '../../utils/motionVariants';
import logoSrc from '../../assets/logo.svg';
import { EVENT_THEME, CONTACT_EMAIL } from '../../utils/constants';

const LINKS = ['About', 'Agenda', 'Speakers', 'Register'];

export default function Footer() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <footer
      ref={ref}
      className="relative py-12 px-6 mt-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', zIndex: 2 }}
    >
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={fadeUp}
        className="max-w-7xl mx-auto"
      >
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={logoSrc} alt="Logo" className="w-7 h-7" />
              <span className="font-display font-bold text-slate-900 dark:text-white text-sm">ACCELALPHA × ORACLE</span>
            </div>
            <p className="font-body text-slate-600 dark:text-slate-500 text-sm leading-relaxed">{EVENT_THEME}</p>
            <p className="font-mono text-xs text-slate-700 dark:text-slate-700 mt-2">2024 Corporate Summit · Dubai</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-slate-900 dark:text-white text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {LINKS.map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="font-body text-slate-600 dark:text-slate-500 text-sm hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-slate-900 dark:text-white text-sm mb-3">Contact</h4>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-body text-slate-600 dark:text-slate-500 text-sm hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors block mb-2"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href="https://cogentsolutions.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-slate-600 dark:text-slate-500 text-sm hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors block"
            >
              cogentsolutions.ae
            </a>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-200 dark:border-slate-800"
        >
          <p className="font-mono text-xs text-slate-700 dark:text-slate-600">© 2024 Accelalpha & Oracle. All rights reserved.</p>
          <p className="font-mono text-xs text-slate-700 dark:text-slate-700">Built with React · FastAPI · Gemini AI</p>
        </div>
      </motion.div>
    </footer>
  );
}
