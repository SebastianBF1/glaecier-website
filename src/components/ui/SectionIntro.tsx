export function SectionIntro({
  eyebrow,
  heading,
  headingId,
  className = "",
}: {
  eyebrow: string;
  heading: string;
  headingId: string;
  className?: string;
}) {
  return (
    <div className={`reveal ${className}`}>
      <p className="eyebrow opacity-80">{eyebrow}</p>
      <h2 id={headingId} className="mt-5 font-serif text-[2.5rem] leading-[1.05] font-light tracking-[-0.01em] text-balance md:text-6xl">
        {heading}
      </h2>
    </div>
  );
}
