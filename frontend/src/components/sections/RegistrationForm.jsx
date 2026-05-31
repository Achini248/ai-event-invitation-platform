import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Copy, Check, Zap } from 'lucide-react';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import LoadingSpinner from '../common/LoadingSpinner';
import SessionTag from '../ui/SessionTag';
import Button from '../common/Button';
import { stagger, fadeUp, scaleIn } from '../../utils/motionVariants';
import { INTEREST_SUGGESTIONS } from '../../utils/constants';
import toast from 'react-hot-toast';

/* ── Field wrapper ── */
function Field({ label, error, children }) {
  return (
    <div>
      <label className="font-body text-slate-600 dark:text-slate-300 text-sm block mb-1.5">
        {label} <span className="text-cyan-500 dark:text-cyan-400">*</span>
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-600 dark:text-red-400 text-xs mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Result panel ── */
function ResultPanel({ result, onReset }) {
  const [copied, setCopied] = useState(false);
  const [showBody, setShowBody] = useState(true);

  const { matched_session: s, email_subject, email_body, match_score } = result;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(`Subject: ${email_subject}\n\n${email_body}`);
      setCopied(true);
      toast.success('Email copied to clipboard!');
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error('Could not copy — try manually.');
    }
  };

  return (
    <motion.div
      id="result-section"
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-5 mt-10"
    >
      {/* Success header */}
      <motion.div variants={scaleIn} className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
          style={{
            background: 'linear-gradient(135deg,rgba(0,212,255,.15),rgba(124,58,237,.15))',
            border: '1px solid rgba(0,212,255,.3)',
          }}
        >
          ✨
        </motion.div>
        <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">Your Invitation is Ready</h3>
        <p className="font-body text-slate-600 dark:text-slate-500 text-sm mt-1">AI matched your profile and generated a tailored B2B email.</p>
      </motion.div>

      {/* Matched session */}
      <motion.div
        variants={fadeUp}
        className="glass rounded-2xl p-5"
        style={{ border: `1px solid rgba(0,212,255,.2)` }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-xs text-cyan-500 dark:text-cyan-400 uppercase tracking-wider">Best Matched Session</span>
          <span className="ml-auto font-mono text-xs text-slate-700 dark:text-slate-600">score {match_score?.toFixed(1)}</span>
        </div>
        <h4 className="font-display font-semibold text-slate-900 dark:text-white text-[15px] mb-1">{s.title}</h4>
        <div className="flex flex-wrap gap-3 text-xs mb-2">
          <span className="font-mono text-slate-600 dark:text-slate-500">{s.time}</span>
          <span className="font-body text-slate-600 dark:text-slate-400">{s.speaker}</span>
        </div>
        <SessionTag type={s.session_type} />
        {s.description && (
          <p className="font-body text-slate-600 dark:text-slate-500 text-xs mt-2 leading-relaxed">{s.description}</p>
        )}
        {s.keywords?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {s.keywords.map((k) => <span key={k} className="kw-tag">{k}</span>)}
          </div>
        )}
      </motion.div>

      {/* Generated email */}
      <motion.div
        variants={fadeUp}
        className="glass rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Toolbar */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span className="font-mono text-xs text-slate-600 dark:text-slate-500 uppercase tracking-wider">Generated Invitation</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBody((v) => !v)}
              className="font-mono text-xs px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {showBody ? 'Hide' : 'Show'}
            </button>
            <button
              onClick={copyEmail}
              className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-lg transition-all"
              style={{
                border: `1px solid ${copied ? 'rgba(52,211,153,.4)' : 'rgba(15,23,42,0.1) dark:rgba(255,255,255,0.08)'}`,
                color: copied ? '#34d399' : 'rgb(71, 85, 105)',
              }}
              className="dark:text-slate-500 dark:hover:text-cyan-400"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showBody && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="p-5">
                {email_subject && (
                  <div className="mb-3 pb-3" style={{ borderBottom: '1px solid rgba(15,23,42,0.06) dark:rgba(255,255,255,0.06)' }}>
                    <span className="font-mono text-xs text-slate-600 dark:text-slate-500">Subject: </span>
                    <span className="font-body text-slate-800 dark:text-slate-200 text-sm">{email_subject}</span>
                  </div>
                )}
                <pre
                  className="font-body text-slate-800 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {email_body}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* MCP confirmation */}
      <motion.div
        variants={fadeUp}
        className="glass rounded-xl px-4 py-3 flex items-start gap-3"
        style={{ border: '1px solid rgba(52,211,153,.15)' }}
      >
        <Zap size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
        <p className="font-mono text-xs text-slate-600 dark:text-slate-500 leading-relaxed">
          <span className="text-green-600 dark:text-green-400">MCP Automation Triggered</span> — draft logged to server
          with recipient address, full body, and UTC timestamp.
        </p>
      </motion.div>

      {/* Reset */}
      <div className="text-center pt-2">
        <Button variant="outline" onClick={onReset}>Generate Another Invitation</Button>
      </div>
    </motion.div>
  );
}

/* ── Main form ── */
export default function RegistrationForm() {
  const { form, errors, loading, result, setField, setSuggestion, submit, reset } = useFormSubmit();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <section id="register" className="relative py-24 px-6" style={{ zIndex: 2 }}>
      <div className="max-w-2xl mx-auto" ref={ref}>
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="kw-tag mb-4 inline-block">AI Invitation Generator</span>
            <h2 className="section-heading text-slate-900 dark:text-white">Get Your Personalised Invitation</h2>
            <p className="section-sub mt-4 mx-auto">
              Describe your professional focus — our AI matches you to the right session
              and writes a tailored B2B invitation email instantly.
            </p>
          </motion.div>

          {/* Form card */}
          <motion.div
            variants={fadeUp}
            className="glass-md rounded-3xl p-8 bg-white dark:bg-slate-950 dark:bg-opacity-50"
            style={{ border: '1px solid rgba(0,212,255,0.14) dark:rgba(0,212,255,0.14), 1px solid rgba(15,23,42,0.08)' }}
          >
            {loading ? (
              <LoadingSpinner
                message="AI is analysing your profile…"
                sub="Matching sessions · Generating email · Triggering MCP"
              />
            ) : !result ? (
              <div className="space-y-5">
                <Field label="Full Name" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={setField('name')}
                    placeholder="e.g. Sarah Al-Rashid"
                    className={`field ${errors.name ? 'error' : ''}`}
                  />
                </Field>

                <Field label="Work Email" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={setField('email')}
                    placeholder="you@company.com"
                    className={`field ${errors.email ? 'error' : ''}`}
                  />
                </Field>

                <Field label="Professional Focus / Career Challenges" error={errors.interest}>
                  <textarea
                    value={form.interest}
                    onChange={setField('interest')}
                    rows={4}
                    placeholder="e.g. I'm focused on reducing supply chain costs through AI-driven demand forecasting and warehouse automation…"
                    className={`field resize-none ${errors.interest ? 'error' : ''}`}
                  />
                  {/* Quick suggestions */}
                  <div className="mt-2.5">
                    <p className="font-mono text-xs text-slate-700 dark:text-slate-600 mb-2">Quick suggestions:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {INTEREST_SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSuggestion(s)}
                          className="font-body text-xs px-2.5 py-1 rounded-full transition-all duration-200 text-slate-700 dark:text-slate-400 hover:border-cyan-500 dark:hover:border-cyan-400/50 hover:text-cyan-600 dark:hover:text-cyan-400"
                          style={{
                            background: 'rgba(15,23,42,0.03) dark:rgba(255,255,255,0.03)',
                            border: '1px solid rgba(15,23,42,0.08) dark:rgba(255,255,255,0.08)',
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </Field>

                <motion.button
                  type="button"
                  onClick={submit}
                  whileHover={{ scale: 1.015, boxShadow: '0 8px 36px rgba(0,212,255,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 rounded-xl font-display font-semibold text-white text-base mt-1 transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg,#00d4ff,#7c3aed)' }}
                >
                  ✨ Generate My AI Invitation
                </motion.button>

                <p className="font-body text-slate-700 dark:text-slate-600 text-xs text-center">
                  Your data is only used to generate your invitation and is not stored.
                </p>
              </div>
            ) : null}
          </motion.div>

          {/* Result section */}
          {result && <ResultPanel result={result} onReset={reset} />}

        </motion.div>
      </div>
    </section>
  );
}
