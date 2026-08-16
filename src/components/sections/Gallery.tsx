import { useEffect, useRef, useState } from "react";
import shot1 from "@/assets/salon-interior-1.jpg.asset.json";
import shot2 from "@/assets/salon-interior-2.jpg.asset.json";

const photos = [
  {
    src: shot1.url,
    alt: "A4 Gents Salon styling stations with yellow cabinets, backlit mirrors and barber chairs in Nalbari, Assam",
  },
  {
    src: shot2.url,
    alt: "Row of barber chairs and illuminated product shelves inside A4 Gents Salon",
  },
];

export function Gallery() {
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const items = node.querySelectorAll<HTMLElement>("[data-reveal]");
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute("data-index"));
          setVisible((prev) => new Set(prev).add(index));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const reveal = (i: number) => `reveal ${visible.has(i) ? "reveal-visible" : ""}`;

  return (
    <section
      ref={containerRef}
      id="gallery"
      className="bg-surface section-y"
      aria-labelledby="gallery-heading"
    >
      <div className="container-page">
        <div
          data-reveal
          data-index={0}
          className={`mx-auto max-w-2xl text-center ${reveal(0)}`}
        >
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:text-xs">
            Inside the salon
          </p>
          <h2
            id="gallery-heading"
            className="mt-3 font-display text-[1.75rem] font-bold uppercase leading-[1.02] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl"
          >
            Gallery
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-[3px] w-14 bg-primary sm:w-20" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            A look at our studio in Nalbari, Assam — clean stations, warm lighting and a space
            built for a sharp, comfortable grooming experience.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2 lg:mt-20 lg:gap-8">
          {photos.map((photo, i) => (
            <li
              key={photo.src}
              data-reveal
              data-index={i + 1}
              style={{ "--reveal-delay": `${(i + 1) * 90}ms` } as React.CSSProperties}
              className={`group relative overflow-hidden border border-border bg-card ${reveal(i + 1)}`}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 z-10 h-full w-[3px] bg-primary"
              />
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03] sm:aspect-[4/3] md:aspect-[3/4]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
