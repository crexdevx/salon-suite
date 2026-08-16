export const siteConfig = {
  name: "A4 Gents Salon",
  shortName: "A4",
  tagline: "Precision grooming for the modern gentleman",
  description:
    "A4 Gents Salon — precision haircuts, beard sculpting and classic grooming for the modern gentleman.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] as const,
};

export type NavItem = (typeof siteConfig.nav)[number];