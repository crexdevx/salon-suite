import { useEffect, useRef, useState } from "react";
import { Star, ArrowUpRight, PenLine, Quote } from "lucide-react";
import { siteConfig } from "@/config/site";

const summary = {
  rating: 4.5,
  count: 25,
};

const reviews = [
  {
    name: "Binay Sarma",
    meta: "4 reviews",
    when: "2 months ago",
    rating: 5,
    text: "One of the most professional salons of the town. Great experience — the staff take their time and the finish is always sharp.",
  },
  {
    name: "Dhrubajyoti Sarma",
    meta: "Local Guide · 23 reviews",
    when: "6 months ago",
    rating: 5,
    text: "Very good service and the staff behaviour is too good. Comfortable place, clean setup and a proper haircut every time.",
    reply:
      "Thank you for your feedback, sir. We look forward to welcoming you again.",
  },
  {
    name: "Esfak Khan",
    meta: "2 reviews",
    when: "2 months ago",
    rating: 5,
    text: "Great service, reasonable price and good staff. Highly recommended for anyone in Nalbari looking for a neat, professional cut.",
  },
];

function Avatar({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <span
      className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-display text-lg font-bold uppercase text-primary-foreground"
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}

function Stars({ value, label }: { value: number; label?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={label ?? `${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.min(Math.max(value - i, 0), 1);
        return (
          <span key={i} className="relative inline-block h-4 w-4" aria-hidden="true">
            <Star className="absolute inset-0 h-4 w-4 text-border" strokeWidth={1.5} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="h-4 w-4 fill-primary text-primary" strokeWidth={1.5} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function Reviews() {
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const reveal = (i: number) => `reveal ${visible.has(i) ? "reveal-visible" : ""}`;

  return (
    <section
      ref={containerRef}
      id="reviews"
      className="bg-background section-y"
      aria-labelledby="reviews-heading"
    >
      <div className="container-page">
        <div data-reveal data-index={0} className={`mx-auto max-w-2xl text-center ${reveal(0)}`}>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:text-xs">
            What clients say
          </p>
          <h2
            id="reviews-heading"
            className="mt-3 font-display text-[1.75rem] font-bold uppercase leading-[1.02] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl"
          >
            Reviews
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-[3px] w-14 bg-primary sm:w-20" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Honest words from gentlemen we&apos;ve groomed in Nalbari, Assam.
          </p>
        </div>

        <div
          data-reveal
          data-index={1}
          className={`mx-auto mt-10 flex max-w-2xl flex-col items-center gap-4 border-y border-border py-6 text-center sm:flex-row sm:justify-center sm:gap-8 sm:text-left ${reveal(1)}`}
        >
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold leading-none text-foreground">
              {summary.rating.toFixed(1)}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              / 5
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <Stars value={summary.rating} label={`Rated ${summary.rating} out of 5`} />
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Based on {summary.count} Google reviews
            </p>
          </div>
        </div>

        <ul className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <li
              key={review.name}
              data-reveal
              data-index={i + 2}
              className={`card-editorial flex flex-col overflow-hidden ${reveal(i + 2)}`}
              style={{ ["--reveal-delay" as string]: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-4 border-b border-border bg-surface/60 px-6 py-4">
                <Avatar name={review.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-base font-bold uppercase tracking-[0.06em] text-foreground">
                    {review.name}
                  </p>
                  <p className="mt-0.5 text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {review.meta}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <Stars value={review.rating} label={`${review.rating} out of 5`} />
                  <span className="text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {review.when}
                  </span>
                </div>

                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-foreground/90">
                  <Quote className="mb-2 h-5 w-5 text-primary/60" aria-hidden="true" />
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                {review.reply ? (
                  <div className="mt-5 rounded-sm border border-border bg-surface/70 p-4">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground">
                      Owner reply
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {review.reply}
                    </p>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        <div
          data-reveal
          data-index={reviews.length + 2}
          className={`mt-12 flex flex-col items-center gap-5 border border-border bg-surface px-6 py-10 text-center sm:px-10 ${reveal(reviews.length + 2)}`}
        >
          <PenLine className="h-6 w-6 text-primary" aria-hidden="true" />
          <h3 className="font-display text-xl font-bold uppercase tracking-[-0.01em] text-foreground sm:text-2xl">
            Been to A4? Leave us a review
          </h3>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Your feedback helps other gentlemen in Nalbari find us. Write your review directly on
            our Google Business profile — it takes less than a minute.
          </p>
          <a
            href={siteConfig.googleWriteReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base btn-ink"
          >
            Write a Google Review
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={siteConfig.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Read all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
