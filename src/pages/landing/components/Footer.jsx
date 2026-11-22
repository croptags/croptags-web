import "./Footer.css";

const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#feature" },
  { label: "For Farmers", href: "#beneficials", benefit: "farmers" },
  { label: "For Buyers", href: "#beneficials", benefit: "buyers" },
];

export function Footer() {
  return (
    <footer className="landing-footer bg-[#009e60] px-5 py-20 text-center text-white">
      <a href="#top" aria-label="Back to top" className="landing-footer__logo inline-block">
        <picture>
          <source media="(max-width: 700px)" srcSet="/assets/image/white.svg" />
          <img src="/assets/image/footer-logo.svg" alt="CropTags" />
        </picture>
      </a>
      <nav className="landing-footer__links mt-12 flex justify-center gap-12 md:gap-16" aria-label="Footer navigation">
        {links.map(({ label, href, benefit }) => (
          <a key={label} href={href} onClick={() => {
            if (benefit) window.dispatchEvent(new CustomEvent("croptags:benefit", { detail: benefit }));
          }}>{label}</a>
        ))}
      </nav>
      <small className="landing-footer__copyright mt-14 block">©2026 CropTags Sdn. Bhd.<br className="landing-footer__mobile-break" /> 202601028368 (1690463-K)<br />All rights reserved.</small>
    </footer>
  );
}
