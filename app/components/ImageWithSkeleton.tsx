"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type ImageWithSkeletonProps = {
  src: string;
  alt: string;
  /** Applied to the <img> itself — object-fit/position, not visibility. */
  className?: string;
  /** Applied to the absolute inset-0 wrapper — breakpoint visibility, etc. */
  wrapperClassName?: string;
  sizes?: string;
  priority?: boolean;
};

// Drop-in replacement for `<Image fill />` inside an existing relatively
// positioned, sized container: shows a shimmering skeleton block until the
// image finishes loading, then crossfades from skeleton to image instead of
// popping in. Scoped to real content photos — see ProjectDetail/ProjectsCarousel/work
// page for the sites this replaces `<Image fill />` at.
export default function ImageWithSkeleton({
  src,
  alt,
  className = "",
  wrapperClassName = "",
  sizes,
  priority,
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const skeletonRef = useRef<HTMLDivElement>(null);
  const loadedImgRef = useRef<HTMLImageElement | null>(null);

  useGSAP(
    () => {
      if (!loaded || !loadedImgRef.current) return;
      const tl = gsap.timeline();
      tl.to(skeletonRef.current, { opacity: 0, duration: 0.4, ease: "power2.out" }, 0);
      tl.fromTo(
        loadedImgRef.current,
        { opacity: 0, scale: 1.02 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        0,
      );
    },
    { dependencies: [loaded], scope: containerRef },
  );

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${wrapperClassName}`}>
      {!loaded && <div ref={skeletonRef} className="image-skeleton absolute inset-0" />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`opacity-0 ${className}`}
        onLoad={(e) => {
          loadedImgRef.current = e.currentTarget;
          setLoaded(true);
        }}
      />
    </div>
  );
}
