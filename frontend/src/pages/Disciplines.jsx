import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { disciplineIcons, CapIcon } from "../components/icons.jsx";
import { fetchDisciplines } from "../api/client.js";

export default function Disciplines() {
  const [disciplines, setDisciplines] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDisciplines()
      .then((res) => setDisciplines(res.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header activePage="discipline" />
      <main className="container section">
        <h1 style={{ fontSize: "2rem" }}>Disiplin Ilmu</h1>
        <p className="text-muted" style={{ maxWidth: 640 }}>
          Jelajahi karya ilmiah berdasarkan bidang studi.
        </p>

        {error && <p style={{ color: "crimson" }}>Gagal memuat data: {error}</p>}
        {loading && <p className="text-muted">Memuat...</p>}

        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginTop: "var(--space-6)" }}
        >
          {disciplines.map((d) => {
            const Icon = disciplineIcons[d.id] || CapIcon;
            return (
              <Link key={d.id} to={`/discipline/${d.id}`} className="card" style={{ textAlign: "center" }}>
                <Icon style={{ color: "var(--color-accent)" }} />
                <div style={{ fontWeight: 600, marginTop: "var(--space-2)" }}>{d.name}</div>
                <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                  {(d.docCount || 0).toLocaleString("id-ID")} dokumen
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
