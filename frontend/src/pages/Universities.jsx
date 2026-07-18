import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { fetchUniversities } from "../api/client.js";

export default function Universities() {
  const [universities, setUniversities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUniversities()
      .then((res) => setUniversities(res.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header activePage="university" />
      <main className="container section">
        <h1 style={{ fontSize: "2rem" }}>Universitas</h1>
        <p className="text-muted" style={{ maxWidth: 640 }}>
          Jelajahi universitas yang repository-nya terintegrasi dengan Scholars.visualis.id.
        </p>

        {error && <p style={{ color: "crimson" }}>Gagal memuat data: {error}</p>}
        {loading && <p className="text-muted">Memuat...</p>}

        <div
          className="grid grid-3"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", marginTop: "var(--space-6)" }}
        >
          {universities.map((u) => (
            <div key={u.id} className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
                <span className="badge-square">{u.abbr}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, overflowWrap: "break-word" }}>{u.name}</div>
                  <div className="text-muted" style={{ fontSize: "0.85rem" }}>{u.province}</div>
                </div>
              </div>
              <div>
                <span className="tag">{u.status}</span>
                <span className="text-muted" style={{ marginLeft: 8, fontSize: "0.85rem" }}>
                  {(u.indexedDocs || 0).toLocaleString("id-ID")} dokumen
                </span>
              </div>
              <Link to={`/university/${u.id}`} style={{ color: "var(--color-accent)", fontWeight: 600 }}>
                Jelajahi →
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
