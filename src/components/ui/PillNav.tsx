/**
 * PillNav — плаваюча таблетка-навігація.
 * Адаптовано з react-bits (reactbits.dev/components/pill-nav).
 * Видалено react-router-dom; всі href — якірні посилання (#section).
 * Залежності: gsap
 */
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./PillNav.css";

export interface PillNavItem {
  href: string;
  label: string;
  ariaLabel?: string;
}

export interface PillNavProps {
  logoText?: string;
  logoHref?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
  onItemClick?: (href: string) => void;
}

const PillNav: React.FC<PillNavProps> = ({
  logoText = "VP.",
  logoHref = "#hero",
  items = [],
  activeHref,
  className = "",
  ease = "power3.out",
  baseColor = "rgba(9,9,11,0.9)",
  pillColor = "#18181b",
  hoveredPillTextColor = "#fff",
  pillTextColor = "#a1a1aa",
  initialLoadAnimation = false,
  onItemClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // initial load animation
  useEffect(() => {
    if (!initialLoadAnimation || !containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 0.6, ease, delay: 0.2 }
    );
  }, [initialLoadAnimation, ease]);

  // mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.28, ease }
      );
    } else {
      gsap.to(menuRef.current, { opacity: 0, y: -16, duration: 0.2, ease });
    }
  }, [menuOpen, ease]);

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    onItemClick?.(href);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    onItemClick?.(logoHref!);
  };

  return (
    <div
      ref={containerRef}
      className={`pill-nav-container ${className}`}
      style={
        {
          "--base": baseColor,
          "--pill": pillColor,
          "--pill-text": pillTextColor,
          "--pill-text-hovered": hoveredPillTextColor,
        } as React.CSSProperties
      }
    >
      {/* Desktop nav */}
      <div ref={pillItemsRef} className="pill-nav-items">
        <a
          ref={logoRef}
          className="pill-logo"
          href={logoHref}
          aria-label="На початок"
          onClick={handleLogoClick}
        >
          {logoText}
        </a>

        <div className="pill-nav-links">
          {items.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-label={item.ariaLabel ?? item.label}
                aria-current={isActive ? "page" : undefined}
                className={`pill-item${isActive ? " pill-item--active" : ""}`}
                onClick={(e) => handleItemClick(e, item.href)}
              >
                <span className="pill-item-bg" />
                <span className="pill-item-label">{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className={`mobile-menu-button${menuOpen ? " open" : ""}`}
          aria-label="Відкрити меню"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        ref={menuRef}
        className="mobile-menu"
        style={{ display: menuOpen ? "flex" : "none" }}
      >
        {items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`mobile-menu-item${isActive ? " active" : ""}`}
              onClick={(e) => handleItemClick(e, item.href)}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default PillNav;
