import Image from "next/image";

type HoverIconProps = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  delayMs?: number;
  sizeClassName?: string;
};

// Same up-and-swap reveal as HoverLetters, applied to an icon instead of a
// letter, so it can continue the same staggered wave. Requires a `group`
// class on the hovered ancestor.
export default function HoverIcon({
  src,
  alt = "",
  width,
  height,
  className = "",
  delayMs = 0,
  sizeClassName,
}: HoverIconProps) {
  return (
    <span
      className={`inline-block overflow-hidden ${sizeClassName ?? ""}`}
      style={sizeClassName ? undefined : { width, height }}
      aria-hidden="true"
    >
      <span
        className="flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-1/2"
        style={{ transitionDelay: `${delayMs}ms` }}
      >
        <Image src={src} alt={alt} width={width} height={height} className={className} />
        <Image src={src} alt={alt} width={width} height={height} className={className} />
      </span>
    </span>
  );
}
