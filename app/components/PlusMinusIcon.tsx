type PlusMinusIconProps = {
  open: boolean;
};

// A "+" is a horizontal bar and a vertical bar sharing a center. Rather
// than swapping two static icons, the vertical bar scales down to nothing
// on its own center, reading as the vertical stroke retracting into the
// horizontal one until only a "-" is left — the reverse plays the same
// motion back out.
export default function PlusMinusIcon({ open }: PlusMinusIconProps) {
  return (
    <span className="relative inline-block size-6 shrink-0" aria-hidden="true">
      <span className="absolute top-1/2 left-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-[#848484]" />
      <span
        className={`absolute top-1/2 left-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-[#848484] transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          open ? "scale-y-0" : "scale-y-100"
        }`}
      />
    </span>
  );
}
