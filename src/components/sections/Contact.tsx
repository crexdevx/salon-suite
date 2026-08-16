import { useEffect, useRef, useState } from "react";
import { Phone, MapPin, Clock, ArrowUpRight, Calendar } from "lucide-react";
import { siteConfig } from "@/config/site";

function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: siteConfig.name,
    description: siteConfig.description,
    telephone: `+91${siteConfig.phone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    url: typeof window !== "undefined" ? window.location.origin : undefined,
    areaServed: {
      "@type": "City",
      name: "Nalbari",
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "21:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function Contact() {
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

  const phoneHref = `tel:+91${siteConfig.phone}`;
  const mapEmbedUrl =
    typeof window !== "undefined" &&
    import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"]
      ? `https://www.google.com/maps/embed/v1/place?key=${import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"]}&q=${encodeURIComponent(siteConfig.fullAddress)}`
      : siteConfig.googleMapsEmbedUrl;

  return (
    <section
      ref={containerRef}
      id="contact"
      className="bg-background section-y"
      aria-labelledby="contact-heading"
    >
      <StructuredData />
      <div className="container-page">
        <div data-reveal data-index={0} className={`mx-auto max-w-2xl text-center ${reveal(0)}`}>
          <p className="eyrow text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:text-xs">
            Find us
          </p>
          <h2
            id="contact-heading"
            className="mt-3 font-display text-[1.75rem] font-bold uppercase leading-[1.02] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl"
          >
            Come visit A4
          </h2>
          <span aria-hidden="true" className="mx-auto mt-4 block h-[3px] w-14 bg-primary sm:w-20" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Visit our salon in Nalbari, Assam for precision grooming and a relaxed, professional
            experience.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-12">
          <div
            data-reveal
            data-index={1}
            className={`flex flex-col justify-center gap-6 ${reveal(1)}`}
          >
            <div className="card-editorial p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold uppercase tracking-[0.04em] text-foreground sm:text-xl">
                A4 Gents Salon Nalbari
              </h3>
              <span aria-hidden="true" className="mt-3 block h-[3px] w-10 bg-primary" />

              <address className="mt-6 not-italic">
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <MapPin
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground">
                        Address
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {siteConfig.address.street},
                        <br />
                        {siteConfig.address.ward}, {siteConfig.address.locality},{" "}
                        {siteConfig.address.region} {siteConfig.address.postalCode}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <Phone
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground">
                        Phone
                      </p>
                      <a
                        href={phoneHref}
                        className="link-underline mt-1 inline-block text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {siteConfig.phoneDisplay}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <Clock
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground">
                        Hours
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {siteConfig.hours}
                      </p>
                    </div>
                  </li>
                </ul>
              </address>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={phoneHref}
                  className="btn-base btn-outline"
                  aria-label="Call A4 Gents Salon now"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call now
                </a>
                <a
                  href={siteConfig.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base btn-ink"
                  aria-label="Get directions to A4 Gents Salon on Google Maps"
                >
                  Get directions
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <a
                  href="#contact"
                  className="btn-base btn-primary w-full"
                  aria-label="Book an appointment at A4 Gents Salon (coming soon)"
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  Book appointment
                </a>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Online booking will be enabled soon — call us for instant scheduling.
                </p>
              </div>
            </div>
          </div>

          <div
            data-reveal
            data-index={2}
            className={`relative overflow-hidden border border-border bg-surface ${reveal(2)}`}
            style={{ ["--reveal-delay" as string]: "0.1s" }}
          >
            <iframe
              title="A4 Gents Salon location on Google Maps"
              src={mapEmbedUrl}
              className="h-80 w-full border-0 lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              aria-label="Map showing A4 Gents Salon in Nalbari, Assam"
            />
            <a
              href={siteConfig.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 btn-base btn-ink text-xs"
              aria-label="Open directions to A4 Gents Salon"
            >
              View on Google Maps
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
