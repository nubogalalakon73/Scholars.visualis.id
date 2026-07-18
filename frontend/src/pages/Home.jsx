import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBanner from "../components/CtaBanner.jsx";
import DocumentCard from "../components/DocumentCard.jsx";
import { disciplineIcons, CapIcon, ExternalLinkIcon } from "../components/icons.jsx";
import { fetchDisciplines, fetchUniversities, fetchDocuments } from "../api/client.js";

const POPULAR_KEYWORDS = ["Kecerdasan Buatan", "Stunting", "Energi Terbarukan", "Fintech", "Arsitektur Hijau"];

const STATS = [
  { label: "Dokumen Terindeks", value: "2.4 Juta+" },
  { label: "Universitas Terintegrasi", value: "180+" },
  { label: "Disiplin Ilmu", value: "42" },
  { label: "Mitra Repository", value: "95" },
];

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [disciplines, setDisciplines] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [latest, setLatest] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchDisciplines(), fetchUniversities(), fetchDocuments({ sort: "newest" })])
      .then(([d, u, docs]) => {
        setDisciplines(d.results.slice(0, 5));
        setUniversities(u.results.slice(0, 3));
        setLatest(docs.results.slice(0, 2));
      })
      .catch((err) => setError(err.message));
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/search${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  }

  return (
    <>
      <Header activePage="home" />
      <main className="container">
        <section className="section" style={{ textAlign: "left" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
            Temukan <br />
            <span style={{ color: "var(--color-accent-orange-2)" }}>Karya Ilmiah Kampus Indonesia</span>
          </h1>
          <p className="text-muted" style={{ maxWidth: 560, fontSize: "1.05rem" }}>
            Jelajahi jutaan dokumen skripsi, tesis, dan disertasi dari universitas terverifikasi di seluruh
            Indonesia — lalu lanjutkan riset Anda dengan ResearchOS.
          </p>

          <form
            onSubmit={handleSearch}
            className="card"
            style={{ display: "flex", gap: "var(--space-3)", maxWidth: 640, marginTop: "var(--space-6)" }}
          >
            <input
              type="text"
              placeholder="Cari judul, penulis, atau kata kunci..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{
                flexGrow: 1,
                border: "1px solid var(--color-neutral-300)",
                borderRadius: "var(--radius-sm)",
                padding: "12px 14px",
                fontSize: "0.95rem",
              }}
            />
            <button type="submit" className="btn btn-primary">
              Cari Penelitian
            </button>
          </form>

          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginTop: "var(--space-4)" }}>
            <span className="text-muted" style={{ fontSize: "0.85rem", marginRight: 4 }}>
              Populer:
            </span>
            {POPULAR_KEYWORDS.map((kw) => (
              <Link key={kw} to={`/search?q=${encodeURIComponent(kw)}`} className="pill">
                {kw}
              </Link>
            ))}
          </div>

          <a
            href="https://risethibrida.com"
            target="_blank"
            rel="noopener"
            className="btn btn-secondary"
            style={{ marginTop: "var(--space-6)" }}
          >
            Buka ResearchOS <ExternalLinkIcon />
          </a>
        </section>

        {error && <p style={{ color: "crimson" }}>Gagal memuat data: {error}</p>}

        <section className="band band-1">
          <div className="grid grid-4" style={{ gridTemplateColumns: "repeat(4, 1fr)", textAlign: "center" }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--color-accent)" }}>{s.value}</div>
                <div className="text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Temukan Berdasarkan Disiplin</h2>
          <div className="grid grid-5" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
            {disciplines.map((d) => {
              const Icon = disciplineIcons[d.id] || CapIcon;
              return (
                <Link key={d.id} to={`/discipline/${d.id}`} className="card" style={{ textAlign: "center" }}>
                  <Icon style={{ color: "var(--color-accent)" }} />
                  <div style={{ fontWeight: 600, marginTop: "var(--space-2)" }}>{d.name}</div>
                  <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {d.docCount.toLocaleString("id-ID")} dokumen
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="band band-2">
          <h2>Universitas Terverifikasi</h2>
          <div className="grid grid-3" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {universities.map((u) => (
              <div key={u.id} className="card">
                <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
                  <span className="badge-square">{u.abbr}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{u.name}</div>
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>{u.province}</div>
                  </div>
                </div>
                <div style={{ marginTop: "var(--space-3)" }}>
                  <span className="tag">{u.status}</span>
                  <span className="text-muted" style={{ marginLeft: 8, fontSize: "0.85rem" }}>
                    {u.indexedDocs.toLocaleString("id-ID")} dokumen
                  </span>
                </div>
                <Link to={`/university/${u.id}`} style={{ display: "inline-block", marginTop: "var(--space-3)", color: "var(--color-accent)", fontWeight: 600 }}>
                  Jelajahi →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Riset Terbaru</h2>
          <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
            {latest.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} showAbstract />
            ))}
          </div>
        </section>

        <section className="band band-1">
          <h2>Integrasi Repository</h2>
          <p className="text-muted" style={{ maxWidth: 560 }}>
            Institusi Anda mengelola repository sendiri? Hubungkan koleksi Anda ke Scholar.visualis.id dan
            perluas jangkauan riset kampus Anda.
          </p>
          <Link to="/partnership" className="btn btn-primary">
            Jadi Mitra Repository
          </Link>
        </section>

        <section className="section">
          <h2>Sudah Menemukan Referensi?</h2>
          <div className="grid grid-4" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            <CtaBanner variant="s1" />
            <CtaBanner variant="s2" />
            <CtaBanner variant="s3" />
            <CtaBanner variant="aff" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
