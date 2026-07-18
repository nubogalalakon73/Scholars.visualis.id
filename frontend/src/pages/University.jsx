import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBanner from "../components/CtaBanner.jsx";
import DocumentCard from "../components/DocumentCard.jsx";
import { fetchUniversity } from "../api/client.js";

export default function UniversityPage() {
  const { id } = useParams();
  const [uni, setUni] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUni(null);
    fetchUniversity(id)
      .then(setUni)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <>
        <Header activePage="university" />
        <main className="container section">
          <p style={{ color: "crimson" }}>Gagal memuat universitas: {error}</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!uni) {
    return (
      <>
        <Header activePage="university" />
        <main className="container section">
          <p>Memuat...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header activePage="university" />
      <main className="container section">
        <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "center", marginBottom: "var(--space-6)" }}>
          <span className="badge-square" style={{ width: 72, height: 72, fontSize: "1.2rem" }}>{uni.abbr}</span>
          <div>
            <h1 style={{ marginBottom: 4 }}>{uni.name}</h1>
            <div className="text-muted">{uni.province}</div>
            <span className="tag" style={{ marginTop: 6, display: "inline-flex" }}>{uni.status}</span>
          </div>
        </div>

        <section className="band band-1" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-4)" }}>
          <div>
            <div style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--color-accent)" }}>
              {uni.indexedDocs.toLocaleString("id-ID")}
            </div>
            <div className="text-muted">Dokumen Terindeks</div>
          </div>
          <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
            {(uni.topFaculties || []).map((f) => (
              <span key={f} className="tag">{f}</span>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Riset Terbaru dari {uni.abbr}</h2>
          <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
            {(uni.documents || []).map((doc) => (
              <DocumentCard key={doc.id} doc={doc} showAbstract />
            ))}
          </div>
        </section>

        <section className="section" style={{ maxWidth: 420 }}>
          <CtaBanner variant="s3" />
        </section>

        <section className="band band-2">
          <h2>Institusi Anda belum terdaftar?</h2>
          <p className="text-muted" style={{ maxWidth: 560 }}>
            Hubungkan repository institusi Anda ke Scholars.visualis.id dan perluas jangkauan riset kampus Anda
            ke seluruh Indonesia.
          </p>
          <Link to="/partnership" className="btn btn-primary">
            Jadi Mitra Repository
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
