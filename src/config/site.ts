export const siteConfig = {
  name: "A4 Gents Salon",
  shortName: "A4",
  tagline: "Precision grooming for the modern gentleman",
  description:
    "A4 Gents Salon — precision haircuts, beard sculpting and classic grooming for the modern gentleman.",
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=A4%20Gents%20Salon%20Nalbari%20Assam",
  googleWriteReviewUrl:
    "https://www.google.com/maps/search/?api=1&query=A4%20Gents%20Salon%20Nalbari%20Assam",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] as const,

};

export type NavItem = (typeof siteConfig.nav)[number];