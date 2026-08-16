import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/85 backdrop-blur-sm">
      <div className="container-page grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:h-20">
        <Link
          to="/"
          className="min-w-0 truncate font-display text-xl font-bold tracking-[0.22em] uppercase text-foreground lg:text-2xl"
        >
          {siteConfig.shortName}
          <span className="ml-2 text-[0.6rem] tracking-[0.3em] text-muted-foreground">GENTS SALON</span>
        </Link>

        <div className="flex items-center gap-8">
          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.14em]">
              {siteConfig.nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="link-underline text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#contact" className="btn-base btn-ink hidden shrink-0 sm:inline-flex">
            Book Appointment
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-sm border border-ink/20 text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-t border-border bg-background lg:hidden animate-fade-in"
        >
          <ul className="container-page flex flex-col py-2">
            {siteConfig.nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/70 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="py-4">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-base btn-primary w-full"
              >
                Book Appointment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}