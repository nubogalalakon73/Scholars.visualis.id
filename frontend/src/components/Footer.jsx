import { Link } from "react-router-dom";
import { InstagramIcon, TwitterIcon, LinkedinIcon } from "./icons.jsx";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="band-1 band" style={{ marginTop: "var(--space-8)", borderRadius: 0 }}>
      <div className="container">
        <div
          className="grid"
          style={{ gridTemplateColumns: "2fr 1fr 1fr 1.3fr", gap: "var(--space-8)" }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-3)" }}>
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--color-accent)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                }}
              >
                S
              </span>
              <strong>Scholars.visualis.id</strong>
            </div>
            <p className="text-muted" style={{ maxWidth: 320 }}>
              Platform penemuan karya ilmiah kampus Indonesia — menghubungkan repository universitas dengan
              peneliti, mahasiswa, dan dosen.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: "0.9rem" }}>Navigasi</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-2)" }}>
              <li><Link to="/search" className="text-muted">Discover</Link></li>
              <li><Link to="/search" className="text-muted">Universitas</Link></li>
              <li><Link to="/search" className="text-muted">Disiplin Ilmu</Link></li>
              <li><Link to="/partnership" className="text-muted">Kemitraan</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "0.9rem" }}>Sumber Daya</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "var(--space-2)" }}>
              <li><a href="https://risethibrida.com" target="_blank" rel="noopener" className="text-muted">ResearchOS</a></li>
              <li><Link to="/partnership" className="text-muted">Jadi Mitra Repository</Link></li>
              <li><a href="mailto:hello@risethibrida.com" className="text-muted">Kontak</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "0.9rem" }}>Lanjutkan Riset</h4>
            <p className="text-muted">hello@risethibrida.com</p>
            <a className="btn btn-primary" href="https://risethibrida.com" target="_blank" rel="noopener">
              Buka ResearchOS
            </a>
          </div>
        </div>

        <div
          style={{
            marginTop: "var(--space-8)",
            paddingTop: "var(--space-4)",
            borderTop: "1px solid var(--color-neutral-300)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-3)",
          }}
        >
          <span className="text-muted" style={{ fontSize: "0.85rem" }}>
            © {year} Scholars.visualis.id. Seluruh hak cipta dilindungi.
          </span>
          <div style={{ display: "flex", gap: "var(--space-3)" }}>
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" aria-label="Twitter"><TwitterIcon /></a>
            <a href="#" aria-label="LinkedIn"><LinkedinIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
