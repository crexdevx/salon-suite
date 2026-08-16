import { useEffect, useRef, useState } from "react";
import { Scissors, Sparkles, Smile, Hand, Heart } from "lucide-react";

const services = [
  {
    number: "01",
    title: "HAIRCUT",
    description: "Precision cuts tailored to your head shape and lifestyle.",
    icon: Scissors,
  },
  {
    number: "02",
    title: "HAIRSTYLING",
    description: "Expert styling using premium products for a lasting look.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "FACIALS",
    description: "Deep cleansing and rejuvenation for clear, healthy skin.",
    icon: Smile,
  },
  {
    number: "04",
    title: "MASSAGE",
    description: "Relaxing head and shoulder massages to melt away stress.",
    icon: Hand,
  },
  {
    number: "05",
    title: "WEDDING & EVENTS",
    description: "Complete grooming packages for your special day.",
    icon: Heart,
    wide: true,
  },
];

export function Services() {
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const items = node.querySelectorAll<HTMLElement>("[data-reveal]");
    if (items.length === 0) return;
    // eslint-disable-next-line no-console
    console.log("[Services] observer starting for", items.length, "items");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // eslint-disable-next-line no-console
          console.log("[Services] entry", entry.isIntersecting, entry.target.getAttribute("data-index"));
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


  return (
    <section
      ref={containerRef}
      id="services"
      className="bg-background section-y"
      aria-labelledby="services-heading"
    >
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:text-xs">
            Crafted for the modern gentleman
          </p>
          <h2
            id="services-heading"
            className="mt-3 font-display text-[1.75rem] font-bold uppercase leading-[1.02] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl"
          >
            Our Services
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-4 block h-[3px] w-14 bg-primary sm:w-20"
          />
        </div>

        {/* Cards grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2 lg:mt-20 lg:gap-8">
          {services.map(({ number, title, description, icon: Icon, wide }, i) => (
            <article
              key={title}
              data-reveal
              data-index={i}
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className={`group relative overflow-hidden border border-border bg-card p-6 transition-all duration-500 ease-smooth sm:p-8 md:p-7 lg:p-8 ${
                visible.has(i) ? "reveal-visible" : "reveal"
              } ${wide ? "md:col-span-2" : ""}`}
            >
              {/* Left yellow accent */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-[3px] bg-primary"
              />

              {/* Background number */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute right-3 bottom-2 font-display text-[5rem] font-bold leading-none tracking-tighter text-foreground/[0.06] select-none transition-transform duration-500 ease-smooth group-hover:translate-x-1 sm:text-[6rem] md:right-4 md:bottom-3 lg:text-[7rem] ${
                  wide ? "md:right-6 md:text-[8rem] lg:text-[9rem]" : ""
                }`}
              >
                {number}
              </span>

              <div
                className={`relative z-10 ${
                  wide ? "md:flex md:items-center md:justify-between md:gap-10" : ""
                }`}
              >
                <div className={wide ? "md:max-w-xl" : ""}>
                  {/* Icon */}
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground transition-colors duration-300 ease-smooth group-hover:bg-ink group-hover:text-ink-foreground sm:h-11 sm:w-11">
                    <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 font-display text-xl font-bold uppercase leading-tight tracking-[-0.01em] text-foreground sm:text-2xl lg:text-[1.75rem]">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {description}
                  </p>
                </div>

                {wide && (
                  <span
                    aria-hidden="true"
                    className="hidden font-display text-[5rem] font-bold leading-none tracking-tighter text-foreground/[0.06] select-none md:block md:text-[7rem] lg:text-[8rem]"
                  >
                    {number}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
