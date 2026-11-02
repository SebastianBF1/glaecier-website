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
      <h2 id={headingId} className="mt-5 font-serif text-[2.375rem] leading-[1.04] font-light tracking-[-0.015em] text-balance sm:text-5xl md:text-6xl xl:text-[4.25rem]">
        {heading}
      </h2>
    </div>
  );
}
