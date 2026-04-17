import { useNavActive } from "../../hooks/useNavActive";
import PillNav from "@/components/ui/PillNav";

const NAV_LINKS = [
  { href: "#about",     label: "Про мене" },
  { href: "#tools",     label: "Стек" },
  { href: "#workflow",  label: "Процес" },
  { href: "#portfolio", label: "Портфоліо" },
  { href: "#results",   label: "Результати" },
  { href: "#contact",   label: "Контакти" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1)).concat(["hero"]);

export function Nav() {
  const activeId = useNavActive(SECTION_IDS);

  function handleItemClick(href: string) {
    const target = document.querySelector(href);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      id="nav"
      style={{
        position: "fixed",
        top: "20px",
        left: 0,
        right: 0,
        zIndex: "var(--z-nav)" as unknown as number,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div style={{ pointerEvents: "auto" }}>
        <PillNav
          logoText="VP."
          logoHref="#hero"
          items={NAV_LINKS}
          activeHref={activeId ? `#${activeId}` : undefined}
          baseColor="rgba(9,9,11,0.88)"
          pillColor="rgba(27,27,30,0.95)"
          pillTextColor="#a1a1aa"
          hoveredPillTextColor="#fff"
          ease="power3.out"
          initialLoadAnimation={false}
          onItemClick={handleItemClick}
        />
      </div>
    </div>
  );
}
