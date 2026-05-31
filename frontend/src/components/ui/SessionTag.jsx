import { SESSION_TYPES } from '../../utils/constants';

export default function SessionTag({ type, className = '' }) {
  const style = SESSION_TYPES[type] || SESSION_TYPES.session;
  return (
    <span
      className={`inline-flex items-center text-xs font-mono px-2.5 py-0.5 rounded-full ${className}`}
      style={{
        background: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
      }}
    >
      {style.label}
    </span>
  );
}
