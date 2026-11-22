import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#feature" },
  { label: "For Farmers", href: "#beneficials", benefit: "farmers" },
  { label: "For Buyers", href: "#beneficials", benefit: "buyers" },
];

function selectBenefit(benefit) {
  if (benefit) window.dispatchEvent(new CustomEvent("croptags:benefit", { detail: benefit }));
}

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useReducedMotion();
  const toggleRef = useRef(null);
  const changeMenu = (next) => {
    setOpen(next);
    if (next) setExpanded(true);
    else if (reducedMotion) setExpanded(false);
  };

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1001px)");
    const reset = () => { if (desktop.matches) { setOpen(false); setExpanded(false); } };
    desktop.addEventListener("change", reset);
    return () => desktop.removeEventListener("change", reset);
  }, []);

  return (
    <header className={`landing-nav${open ? " landing-nav--open" : ""}${expanded ? " landing-nav--expanded" : ""}`} onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        changeMenu(false);
        toggleRef.current?.focus();
      }
    }}>
      <a className="landing-nav__logo" href="#top" aria-label="CropTags home" onClick={() => changeMenu(false)}>
        <img src="/assets/image/logo.svg" alt="CropTags" />
      </a>
      <nav className="landing-nav__desktop" aria-label="Main navigation">
        {links.map(({ label, href, benefit }) => (
          <a key={label} href={href} onClick={() => selectBenefit(benefit)}>{label}</a>
        ))}
      </nav>
      <a className="landing-nav__contact" href="#contact">Contact Us</a>
      <button
        ref={toggleRef}
        className="landing-nav__toggle"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="landing-mobile-menu"
        onClick={() => changeMenu(!open)}
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
      <nav
        id="landing-mobile-menu"
        className="landing-nav__mobile"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
        onTransitionEnd={(event) => {
          if (event.target === event.currentTarget && event.propertyName === "grid-template-rows" && !open) setExpanded(false);
        }}
      >
        <div className="landing-nav__mobile-clip">
        <div className="landing-nav__mobile-links">
          {links.map(({ label, href, benefit }) => (
            <a key={label} href={href} onClick={() => { selectBenefit(benefit); changeMenu(false); }}>{label}</a>
          ))}
        </div>
        </div>
      </nav>
    </header>
  );
};
