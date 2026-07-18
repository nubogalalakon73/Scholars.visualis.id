import { Link } from "react-router-dom";
import { SearchIcon } from "./icons.jsx";

const NAV_ITEMS = [
  { key: "discover", label: "Discover", to: "/search" },
  { key: "university", label: "Universitas", to: "/search" },
  { key: "discipline", label: "Disiplin Ilmu", to: "/search" },
  { key: "partnership", label: "Kemitraan", to: "/partnership" },
  { key: "about", label: "Tentang", to: "/" },
];

export default function Header({ activePage }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(251, 250, 248, 0.92)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid var(--color-neutral-200)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "var(--space-4)",
          padding: "var(--space-4) clamp(20px,5vw,64px)",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "var(--color-accent)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            S
          </span>
          <span>
            <span style={{ display: "block", fontWeight: 700, fontSize: "1.05rem" }}>Scholars.visualis.id</span>
            <span style={{ display: "block", fontSize: "0.72rem", color: "var(--color-neutral-600)" }}>
              Penemuan Karya Ilmiah
            </span>
          </span>
        </Link>

        <nav style={{ display: "flex", gap: "var(--space-6)", flexWrap: "wrap" }}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              to={item.to}
              style={{
                fontWeight: 500,
                fontSize: "0.92rem",
                color: activePage === item.key ? "var(--color-accent)" : "var(--color-text)",
                borderBottom: activePage === item.key ? "2px solid var(--color-accent)" : "2px solid transparent",
                paddingBottom: 4,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <Link to="/search" aria-label="Cari" style={{ display: "flex" }}>
            <SearchIcon />
          </Link>
          <span className="pill">ID</span>
          <button className="btn btn-ghost">Login</button>
          <a
            className="btn btn-primary"
            href="https://risethibrida.com"
            target="_blank"
            rel="noopener"
          >
            Buka ResearchOS
          </a>
        </div>
      </div>
    </header>
  );
}
