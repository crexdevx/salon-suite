import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";

const title = `${siteConfig.name} — Style That Speaks You`;
const description =
  "Premium grooming, haircuts and beard styling for the modern man at A4 Gents Salon. Expert barbers, premium products, hygiene first and on-time service.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Services />
      <About />
    </>
  );
}

