import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBanner from "../components/CtaBanner.jsx";
import DocumentCard from "../components/DocumentCard.jsx";
import { fetchDocument } from "../api/client.js";

function ctaVariantForDegree(degree) {
  if (degree === "S1") return "s1";
  if (degree === "S2") return "s2";
  return "s3";
}

export default function DocumentPage() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDoc(null);
    fetchDocument(id)
      .then(setDoc)
      .catch((err) => setError(err.message));
  }, [id]);

  function handleCopyCitation() {
    if (!doc) return;
    const citation = `${(doc.authors || []).join(", ")} (${doc.year}). ${doc.title}. ${doc.university}: ${doc.repository}.`;
    navigator.clipboard?.writeText(citation).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  if (error) {
    return (
      <>
        <Header activePage="discover" />
        <main className="container section">
          <p style={{ color: "crimson" }}>Gagal memuat dokumen: {error}</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!doc) {
    return (
      <>
        <Header activePage="discover" />
        <main className="container section">
          <p>Memuat...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header activePage="discover" />
      <main className="container section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr 320px",
            gap: "var(--space-6)",
            alignItems: "start",
          }}
        >
          <aside className="card band-1" style={{ position: "sticky", top: 90 }}>
            <div style={{ marginBottom: "var(--space-3)" }}>
              <div className="text-muted" style={{ fontSize: "0.8rem" }}>Penulis</div>
              <div style={{ fontWeight: 600 }}>{(doc.authors || []).join(", ")}</div>
            </div>
            <div style={{ marginBottom: "var(--space-3)" }}>
              <div className="text-muted" style={{ fontSize: "0.8rem" }}>Institusi</div>
              <Link to={`/university/${doc.universityId}`} style={{ fontWeight: 600, color: "var(--color-accent)" }}>
                {doc.university}
              </Link>
            </div>
            <div style={{ marginBottom: "var(--space-3)" }}>
              <div className="text-muted" style={{ fontSize: "0.8rem" }}>Fakultas / Program</div>
              <div>{doc.faculty} &middot; {doc.program}</div>
            </div>
            <div style={{ marginBottom: "var(--space-3)" }}>
              <div className="text-muted" style={{ fontSize: "0.8rem" }}>Jenjang / Bahasa / Tahun</div>
              <div>{doc.degree} &middot; {doc.language} &middot; {doc.year}</div>
            </div>
            {doc.repository && <span className="tag">{doc.repository}</span>}
            {doc.doi && (
              <div style={{ marginTop: "var(--space-3)" }}>
                <div className="text-muted" style={{ fontSize: "0.8rem" }}>DOI</div>
                <div>{doc.doi}</div>
              </div>
            )}
            <button className="btn btn-primary" style={{ width: "100%", marginTop: "var(--space-4)" }} onClick={handleCopyCitation}>
              {copied ? "Tersalin ✓" : "Salin Sitasi"}
            </button>
          </aside>

          <section>
            <span className="kicker">{doc.disciplineId}</span>
            <h1 style={{ fontSize: "1.8rem" }}>{doc.title}</h1>

            <h3>Abstrak</h3>
            <p className="text-muted">{doc.abstract}</p>

            <h3>Kata Kunci</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginBottom: "var(--space-4)" }}>
              {(doc.keywords || []).map((kw) => (
                <span key={kw} className="pill">{kw}</span>
              ))}
            </div>

            <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="#" onClick={(e) => e.preventDefault()}>
                Tautan Repository
              </a>
              <a className="btn btn-ghost" href="#" onClick={(e) => e.preventDefault()}>
                Unduh PDF
              </a>
            </div>
          </section>

          <aside style={{ display: "grid", gap: "var(--space-4)" }}>
            <CtaBanner variant={ctaVariantForDegree(doc.degree)} />

            <div className="card">
              <h3 style={{ fontSize: "1rem" }}>Aksi Penelitian</h3>
              <div style={{ display: "grid", gap: "var(--space-2)" }}>
                {[
                  "Research Gap",
                  "Literature Review",
                  "Novelty Analysis",
                  "AI Research Assistant",
                  "Lanjutkan Penelitian",
                ].map((label) => (
                  <a
                    key={label}
                    className="btn btn-ghost"
                    href="https://risethibrida.com"
                    target="_blank"
                    rel="noopener"
                    style={{ justifyContent: "space-between" }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {doc.related && doc.related.length > 0 && (
              <div>
                <h3 style={{ fontSize: "1rem" }}>Dokumen Terkait</h3>
                <div style={{ display: "grid", gap: "var(--space-3)" }}>
                  {doc.related.map((r) => (
                    <DocumentCard key={r.id} doc={r} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
