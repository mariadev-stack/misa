type HoverLettersProps = {
  text: string;
  className?: string;
  staggerMs?: number;
};

// Per-letter hover reveal: each letter column slides up to swap the visible
// letter for a duplicate stacked beneath, staggered letter by letter.
// Requires a `group` class on the hovered ancestor.
export default function HoverLetters({
  text,
  className = "",
  staggerMs = 25,
}: HoverLettersProps) {
  const letters = Array.from(text);

  return (
    <span className={`inline-flex ${className}`} aria-hidden="true">
      {letters.map((letter, i) => {
        const char = letter === " " ? " " : letter;
        return (
          <span key={i} className="inline-block h-6 overflow-hidden">
            <span
              className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-1/2"
              style={{ transitionDelay: `${i * staggerMs}ms` }}
            >
              <span className="h-6 leading-6">{char}</span>
              <span className="h-6 leading-6" aria-hidden="true">
                {char}
              </span>
            </span>
          </span>
        );
      })}
    </span>
  );
}
