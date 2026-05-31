import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SpeakerCard from '../ui/SpeakerCard';
import { stagger, fadeUp } from '../../utils/motionVariants';
import { EVENT_STATS } from '../../utils/constants';

const SPEAKERS = [
  { name: 'Richard Buxton',        role: 'VP EMEA',                      company: 'Accelalpha',          initials: 'RB' },
  { name: 'Rohan Chitnis',         role: 'Sales Director Applications',   company: 'Oracle',              initials: 'RC' },
  { name: 'Srivatsav Sarvepalli',  role: 'Regional Director, SCM ECEMEA', company: 'Oracle',              initials: 'SS' },
  { name: 'Joe Spear',             role: 'Partner',                       company: 'Accelalpha',          initials: 'JS' },
  { name: 'Ujjwal Kumar',          role: 'Principal Domain Lead ECEMEA',  company: 'Oracle',              initials: 'UK' },
  { name: 'Dr. Raman Kumar',       role: 'CEO',                           company: 'Al-Futtaim Logistics', initials: 'RK' },
  { name: 'David Moono',           role: 'Global Logistics Manager',      company: 'Weatherford',         initials: 'DM' },
  { name: 'Tamer Hamed',           role: 'CIO',                           company: 'Dubai Cable Co.',     initials: 'TH' },
];

export default function SpeakersSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="speakers" className="relative py-24 px-6" style={{ zIndex: 2 }}>
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          <motion.div variants={fadeUp} className="text-center mb-4">
            <span className="kw-tag">Featured Speakers</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="section-heading text-center text-slate-900 dark:text-white mb-4">
            Industry Voices
          </motion.h2>
          <motion.p variants={fadeUp} className="section-sub text-center mx-auto mb-12">
            C-suite executives, platform architects, and operations leaders from the ECEMEA region's
            most influential organisations.
          </motion.p>

          {/* Stats */}
          <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {EVENT_STATS.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="glass rounded-2xl p-5 text-center bg-white dark:bg-slate-950/30"
                style={{ border: '1px solid rgba(0,212,255,0.08)' }}
                whileHover={{ borderColor: 'rgba(0,212,255,0.28)', y: -3 }}
              >
                <div className="font-display font-bold text-4xl gradient-text mb-1">{s.value}</div>
                <div className="font-body text-slate-600 dark:text-slate-500 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Speaker grid */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3"
          >
            {SPEAKERS.map((sp, i) => (
              <SpeakerCard key={sp.name} speaker={sp} index={i} />
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
