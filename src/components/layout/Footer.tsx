import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page flex flex-col items-center justify-between gap-3 py-10 text-sm text-muted-foreground sm:flex-row">
        <p className="font-display tracking-[0.22em] uppercase text-foreground">{siteConfig.name}</p>
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}