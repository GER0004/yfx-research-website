export default function SectionLabel({ number, text }) {
  return (
    <div className="flex items-center gap-2.5 mb-6 sm:mb-8">
      <span className="font-mono text-[11px] sm:text-xs text-text-muted">
        {number}
      </span>
      <span className="text-[11px] sm:text-xs text-text-muted tracking-wide">
        {text}
      </span>
    </div>
  );
}
