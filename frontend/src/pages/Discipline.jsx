import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBanner from "../components/CtaBanner.jsx";
import DocumentCard from "../components/DocumentCard.jsx";
import { fetchDiscipline } from "../api/client.js";

export default function DisciplinePage() {
  const { id } = useParams();
  const [discipline, setDiscipline] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setDiscipline(null);
    fetchDiscipline(id)
      .then(setDiscipline)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <>
        <Header activePage="discipline" />
        <main className="container section">
          <p style={{ color: "crimson" }}>Gagal memuat disiplin ilmu: {error}</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!discipline) {
    return (
      <>
        <Header activePage="discipline" />
        <main className="container section">
          <p>Memuat...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header activePage="discipline" />
      <main className="container section">
        <span className="kicker">Disiplin Ilmu</span>
        <h1>{discipline.name}</h1>
        <p className="text-muted" style={{ maxWidth: 640 }}>
          Jelajahi karya ilmiah dari bidang {discipline.name} yang telah diindeks dari universitas terverifikasi
          di seluruh Indonesia.
        </p>

        <section className="band band-1" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--color-accent)" }}>
            {discipline.docCount.toLocaleString("id-ID")}
          </div>
          <div className="text-muted">Dokumen Terindeks</div>
        </section>

        {discipline.topKeywords && discipline.topKeywords.length > 0 && (
          <section className="section">
            <h2>Topik Populer</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
              {discipline.topKeywords.map((kw) => (
                <Link key={kw} to={`/search?q=${encodeURIComponent(kw)}`} className="pill">
                  {kw}
                </Link>
              ))}
            </div>
          </section>
        )}

        {discipline.universities && discipline.universities.length > 0 && (
          <section className="band band-2">
            <h2>Universitas Populer di Bidang Ini</h2>
            <div className="grid grid-3" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {discipline.universities.map((u) => (
                <Link key={u.id} to={`/university/${u.id}`} className="card">
                  <span className="badge-square">{u.abbr}</span>
                  <div style={{ fontWeight: 600, marginTop: "var(--space-2)" }}>{u.name}</div>
                  <div className="text-muted" style={{ fontSize: "0.85rem" }}>{u.province}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="section">
          <h2>Riset Terbaru</h2>
          <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
            {(discipline.documents || []).map((doc) => (
              <DocumentCard key={doc.id} doc={doc} showAbstract />
            ))}
          </div>
        </section>

        <section className="section" style={{ maxWidth: 420 }}>
          <CtaBanner variant="s2" />
        </section>

        <section className="band band-1">
          <h2>Sudah menemukan referensi di bidang {discipline.name}?</h2>
          <a className="btn btn-primary" href="https://risethibrida.com" target="_blank" rel="noopener">
            Lanjutkan ke ResearchOS
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
