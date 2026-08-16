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
  phone: "08486754335",
  phoneDisplay: "084867 54335",
  address: {
    street: "Mahendra Narayan Choudhury Balika Mahavidyalaya, near MNC College",
    ward: "Ward No. 7",
    locality: "Nalbari, Majdia",
    region: "Assam",
    postalCode: "781353",
    country: "IN",
  },
  fullAddress:
    "A4 Gents Salon Nalbari, Mahendra Narayan Choudhury Balika Mahavidyalaya, near MNC College, Ward No. 7, Nalbari, Majdia, Assam 781353",
  hours: "Open · Closes 9 PM",
  googleMapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=A4%20Gents%20Salon%20Nalbari%20Assam%20781353",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=A4%20Gents%20Salon%20Nalbari%20Assam%20781353&output=embed",
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