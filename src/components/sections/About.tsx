import { useEffect, useRef, useState } from "react";

const whyItems = [
  {
    title: "Professional Grooming",
    description:
      "Trained barbers and stylists who understand modern trends, classic cuts and the details that make a look yours.",
  },
  {
    title: "Hygiene First",
    description:
      "Sanitized tools, clean stations and strict hygiene protocols so every visit feels as safe as it looks sharp.",
  },
  {
    title: "Personalized Style",
    description:
      "Recommendations tailored to your face shape, hair type and lifestyle—because the best style is the one that fits you.",
  },
];

export function About() {
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

  const reveal = (i: number) =>
    `reveal ${visible.has(i) ? "reveal-visible" : ""}`;

  return (
    <section
      ref={containerRef}
      id="about"
      className="bg-background section-y"
      aria-labelledby="about-heading"
    >
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Text column */}
          <div className="order-2 lg:order-1">
            <div
              data-reveal
              data-index={0}
              style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
              className={reveal(0)}
            >
              <span className="eyebrow">About us</span>
            </div>

            <h2
              id="about-heading"
              data-reveal
              data-index={1}
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
              className={`mt-4 font-display text-3xl font-bold uppercase leading-[1.02] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl ${reveal(1)}`}
            >
              About A4 Gents Salon
            </h2>

            <p
              data-reveal
              data-index={2}
              style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
              className={`mt-4 font-display text-sm font-semibold uppercase tracking-[0.12em] text-primary sm:text-base ${reveal(2)}`}
            >
              Precision Grooming. Confident Style.
            </p>

            <div
              data-reveal
              data-index={3}
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
              className={`mt-6 space-y-4 text-muted-foreground ${reveal(3)}`}
            >
              <p className="leading-relaxed">
                A4 Gents Salon is Nalbari’s destination for precision grooming
                and confident style. Located in the heart of Nalbari, Assam, our
                salon brings together skilled barbers, premium products and a
                relaxed, masculine environment where every detail is designed
                around you.
              </p>
              <p className="leading-relaxed">
                From sharp haircuts and modern hairstyling to rejuvenating
                facials, relaxing massages and complete wedding or event grooming,
                we tailor every service to your hair, skin and personality. Our
                team combines professional training with genuine attention to
                detail, strict hygiene standards and personalized styling
                advice—so you leave looking sharp and feeling your best.
              </p>
            </div>

            <div className="mt-12">
              <h3
                data-reveal
                data-index={4}
                style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
                className={`font-display text-lg font-bold uppercase tracking-[0.08em] text-foreground sm:text-xl ${reveal(4)}`}
              >
                Why Choose A4
              </h3>

              <ul className="mt-6 grid gap-6 sm:grid-cols-3">
                {whyItems.map((item, i) => (
                  <li
                    key={item.title}
                    data-reveal
                    data-index={5 + i}
                    style={
                      {
                        "--reveal-delay": `${400 + i * 100}ms`,
                      } as React.CSSProperties
                    }
                    className={reveal(5 + i)}
                  >
                    <span
                      aria-hidden="true"
                      className="accent-rule mb-4"
                    />
                    <h4 className="font-display text-sm font-bold uppercase tracking-wide text-foreground sm:text-base">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Graphic / shape treatment */}
          <div className="order-1 lg:order-2">
            <div
              data-reveal
              data-index={8}
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              className={`relative aspect-[3/2] overflow-hidden border border-border bg-card sm:aspect-[4/3] lg:aspect-[4/5] ${reveal(8)}`}
            >
              <svg
                viewBox="0 0 480 600"
                className="h-full w-full"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid slice"
              >
                <rect width="480" height="600" fill="var(--color-card)" />
                <rect
                  x="24"
                  y="24"
                  width="432"
                  height="552"
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth="2"
                />
                <polygon
                  points="24,576 456,576 456,352 24,576"
                  fill="var(--color-primary)"
                />
                <text
                  x="48"
                  y="292"
                  fontFamily="var(--font-display)"
                  fontSize="172"
                  fontWeight="600"
                  letterSpacing="-0.03em"
                  fill="var(--color-foreground)"
                >
                  A4
                </text>
                <rect
                  x="48"
                  y="312"
                  width="220"
                  height="4"
                  fill="var(--color-primary)"
                />
                <circle cx="408" cy="80" r="8" fill="var(--color-primary)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
