import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, X } from 'lucide-react';
import AgendaCard from '../ui/AgendaCard';
import { stagger, fadeUp } from '../../utils/motionVariants';
import { SESSION_TYPES } from '../../utils/constants';

/* ─── Static agenda data (mirrors agenda.txt exactly) ─── */
const SESSIONS = [
  { id:1,  time:'09:30 AM – 10:00 AM', title:'Registrations',                         speaker:'Event Operations Team',   session_type:'logistics', keywords:['check-in','reception','badging','entry'],                                                                    description:'Morning arrival, check-in, and badge collection for registered executive delegates and partners.' },
  { id:2,  time:'10:00 AM – 10:10 AM', title:'Welcome Note',                          speaker:'Richard Buxton (VP EMEA, Accelalpha) & Rohan Chitnis (Sales Director Applications, Oracle)', session_type:'opening',  keywords:['opening remarks','welcome','event launch','strategic partnership overview'],                    description:'An introduction and official welcome to the summit by leadership from Accelalpha and Oracle, outlining key themes of regional supply chain evolution.' },
  { id:3,  time:'10:10 AM – 10:40 AM', title:'Industry Keynote',                      speaker:'Srivatsav Sarvepalli (Regional Director, Supply Chain Solutions, ECEMEA, Oracle)', session_type:'keynote',  keywords:['digital logistics','gulf supply chain','cost reduction','market volatility','future-proofing transportation'], description:'High-level keynote mapping current market challenges impacting Gulf regional logistics, focusing on rising costs, macroeconomic changes, and building a responsive digital framework.' },
  { id:4,  time:'10:40 AM – 11:10 AM', title:'A Practical Guide to Successful Implementation', speaker:'Joe Spear (Partner, Accelalpha)', session_type:'session',  keywords:['system implementation','risk management','deployment strategies','software integration','avoiding failure'], description:'A breakdown detailing how modern organisations successfully deploy and integrate enterprise logistics and SCM platforms without interrupting ongoing operations.' },
  { id:5,  time:'11:10 AM – 11:30 AM', title:'The Resilient Supply Chain & SCM Innovations', speaker:'Ujjwal Kumar (Principal Domain Lead, ECEMEA, Oracle)', session_type:'session',  keywords:['Oracle Gen AI platform','predictive analytics','automated warehousing','smart SCM systems','visibility tools'], description:"Unveiling Oracle's Gen AI SCM Platform. Discover how predictive analytics, embedded AI automation, and deep inventory tracking help anticipate disruption before it impacts the bottom line." },
  { id:6,  time:'11:30 AM – 11:50 AM', title:'Coffee Break',                          speaker:'Networking Team',          session_type:'break',     keywords:['intermission','coffee','break','networking'],                                                                  description:'Short intermission for refreshments, informal discussion, and peer-to-peer networking.' },
  { id:7,  time:'11:50 AM – 12:10 PM', title:'Insights from Digital Evolution',       speaker:'Dr. Raman Kumar (CEO, Al-Futtaim Logistics)', session_type:'session',  keywords:['corporate digital evolution','automation results','warehouse management scalability'],               description:'Real-world insights from the top of the logistics sector on navigating large-scale corporate automation and digital transformations successfully.' },
  { id:8,  time:'12:10 PM – 12:40 PM', title:'Strategies in Action: Insights from Industry Leaders', speaker:'Panel: David Moono (Global Logistics Manager, Weatherford) & Tamer Hamed (CIO, Dubai Cable Company)', session_type:'panel',    keywords:['panel debate','case studies','last-mile challenges','green operations','sustainable sourcing','inventory tracking'], description:'Interactive panel discussion featuring operational executives sharing case studies, supply chain resilience tactics, and sustainable operations strategies.' },
  { id:9,  time:'12:40 PM – 01:00 PM', title:'Q&A and Closing Remarks',               speaker:'Accelalpha Team',          session_type:'closing',   keywords:['open floor questions','concluding summaries','closing remarks','future updates'],                          description:'Floor opened to audience members for questions, wrapped with final strategic takeaways from the hosting team.' },
  { id:10, time:'01:00 PM – Onwards',  title:'Lunch & Networking',                    speaker:'Event Catering Group',     session_type:'networking',keywords:['closing lunch','corporate networking','business development','personal introductions'],                      description:'Dedicated networking lunch allowing delegates, technology partners, and technical leads to connect over real opportunities.' },
];

const TYPE_FILTERS = ['All', ...Object.keys(SESSION_TYPES)];

export default function AgendaSection() {
  const [search, setSearch]   = useState('');
  const [active, setActive]   = useState('All');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const filtered = SESSIONS.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      s.title.toLowerCase().includes(q) ||
      s.speaker.toLowerCase().includes(q) ||
      s.keywords.some((k) => k.toLowerCase().includes(q));
    const matchType = active === 'All' || s.session_type === active;
    return matchSearch && matchType;
  });

  return (
    <section id="agenda" className="relative py-24 px-6" style={{ zIndex: 2 }}>
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          <motion.div variants={fadeUp} className="text-center mb-4">
            <span className="kw-tag">Full Schedule</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="section-heading text-center text-slate-900 dark:text-white mb-4">
            Conference Agenda
          </motion.h2>
          <motion.p variants={fadeUp} className="section-sub text-center mx-auto mb-10">
            Keynotes, practitioner sessions, panel debates, and networking — all in one day.
          </motion.p>

          {/* Search */}
          <motion.div variants={fadeUp} className="relative mb-4">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by session, speaker, or topic…"
              className="field pl-10 pr-10 bg-white dark:bg-slate-950/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </motion.div>

          {/* Type filter chips */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
            {TYPE_FILTERS.map((t) => {
              const style = t !== 'All' ? SESSION_TYPES[t] : null;
              const isActive = active === t;
              return (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className="text-xs font-mono px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    background: isActive ? (style?.bg || 'rgba(0,212,255,0.14)') : 'rgba(15,23,42,0.04) dark:rgba(255,255,255,0.04)',
                    color:      isActive ? (style?.color || '#00d4ff')            : '#78716c dark:#94a3b8',
                    border:     `1px solid ${isActive ? (style?.border || 'rgba(0,212,255,0.4)') : 'rgba(15,23,42,0.08) dark:rgba(255,255,255,0.07)'}`,
                  }}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              );
            })}
          </motion.div>

          {/* Cards */}
          <div className="flex flex-col gap-3">
            {filtered.length > 0
              ? filtered.map((s, i) => <AgendaCard key={s.id} session={s} index={i} />)
              : (
                <div className="glass rounded-2xl p-10 text-center bg-white dark:bg-slate-950/30">
                  <p className="font-body text-slate-600 dark:text-slate-500 text-sm">No sessions match — try a different keyword.</p>
                </div>
              )
            }
          </div>

          {filtered.length > 0 && (
            <p className="text-center font-mono text-xs text-slate-700 dark:text-slate-700 mt-4">
              {filtered.length} / {SESSIONS.length} sessions shown
            </p>
          )}

        </motion.div>
      </div>
    </section>
  );
}