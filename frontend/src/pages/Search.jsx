import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBanner from "../components/CtaBanner.jsx";
import DocumentCard from "../components/DocumentCard.jsx";
import { fetchDocuments, fetchUniversities, fetchDisciplines } from "../api/client.js";

const DEGREES = ["S1", "S2", "S3"];
const LANGUAGES = ["Indonesia", "Inggris"];

export default function Search() {
  const [searchParams] = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [degrees, setDegrees] = useState([]);
  const [selectedUnis, setSelectedUnis] = useState([]);
  const [disciplineId, setDisciplineId] = useState("");
  const [language, setLanguage] = useState("");
  const [sort, setSort] = useState("relevance");
  const [view, setView] = useState("list");

  const [universities, setUniversities] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchUniversities(), fetchDisciplines()])
      .then(([u, d]) => {
        setUniversities(u.results);
        setDisciplines(d.results);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchDocuments({ q, degree: degrees, universityId: selectedUnis, disciplineId, language, sort })
      .then((res) => setDocs(res.results))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q, degrees, selectedUnis, disciplineId, language, sort]);

  function toggle(list, setList, value) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function resetFilters() {
    setQ("");
    setDegrees([]);
    setSelectedUnis([]);
    setDisciplineId("");
    setLanguage("");
    setSort("relevance");
  }

  const resultCount = docs.length;
  const withCta = useMemo(() => {
    const items = docs.map((d) => ({ type: "doc", doc: d }));
    if (items.length > 2) items.splice(2, 0, { type: "cta" });
    return items;
  }, [docs]);

  return (
    <>
      <Header activePage="discover" />
      <main className="container section">
        {error && <p style={{ color: "crimson" }}>Gagal memuat data: {error}</p>}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "230px 1fr 280px",
            gap: "var(--space-6)",
            alignItems: "start",
          }}
        >
          <aside className="card" style={{ position: "sticky", top: 90 }}>
            <h3 style={{ fontSize: "1rem" }}>Filter</h3>
            <input
              type="text"
              placeholder="Cari..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 10px",
                border: "1px solid var(--color-neutral-300)",
                borderRadius: "var(--radius-sm)",
                marginBottom: "var(--space-4)",
              }}
            />

            <div style={{ marginBottom: "var(--space-4)" }}>
              <div style={{ fontWeight: 600, marginBottom: "var(--space-2)" }}>Jenjang</div>
              {DEGREES.map((deg) => (
                <label key={deg} style={{ display: "block", fontSize: "0.9rem", marginBottom: 4 }}>
                  <input
                    type="checkbox"
                    checked={degrees.includes(deg)}
                    onChange={() => toggle(degrees, setDegrees, deg)}
                  />{" "}
                  {deg}
                </label>
              ))}
            </div>

            <div style={{ marginBottom: "var(--space-4)" }}>
              <div style={{ fontWeight: 600, marginBottom: "var(--space-2)" }}>Universitas</div>
              <div style={{ maxHeight: 180, overflowY: "auto" }}>
                {universities.map((u) => (
                  <label key={u.id} style={{ display: "block", fontSize: "0.9rem", marginBottom: 4 }}>
                    <input
                      type="checkbox"
                      checked={selectedUnis.includes(u.id)}
                      onChange={() => toggle(selectedUnis, setSelectedUnis, u.id)}
                    />{" "}
                    {u.abbr}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "var(--space-4)" }}>
              <div style={{ fontWeight: 600, marginBottom: "var(--space-2)" }}>Disiplin Ilmu</div>
              <select
                value={disciplineId}
                onChange={(e) => setDisciplineId(e.target.value)}
                style={{ width: "100%", padding: "8px", borderRadius: "var(--radius-sm)" }}
              >
                <option value="">Semua</option>
                {disciplines.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "var(--space-4)" }}>
              <div style={{ fontWeight: 600, marginBottom: "var(--space-2)" }}>Bahasa</div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ width: "100%", padding: "8px", borderRadius: "var(--radius-sm)" }}
              >
                <option value="">Semua</option>
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-ghost" onClick={resetFilters} style={{ width: "100%" }}>
              Reset
            </button>
          </aside>

          <section>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "var(--space-4)",
                flexWrap: "wrap",
                gap: "var(--space-3)",
              }}
            >
              <span className="text-muted">
                {loading ? "Memuat..." : `${resultCount} hasil ditemukan (0.24 detik)`}
              </span>
              <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
                <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: 8, borderRadius: "var(--radius-sm)" }}>
                  <option value="relevance">Relevansi</option>
                  <option value="newest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                </select>
                <div style={{ display: "flex", border: "1px solid var(--color-neutral-300)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                  <button
                    onClick={() => setView("list")}
                    className="btn"
                    style={{ background: view === "list" ? "var(--color-accent)" : "transparent", color: view === "list" ? "#fff" : "inherit", borderRadius: 0 }}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setView("grid")}
                    className="btn"
                    style={{ background: view === "grid" ? "var(--color-accent)" : "transparent", color: view === "grid" ? "#fff" : "inherit", borderRadius: 0 }}
                  >
                    Grid
                  </button>
                </div>
              </div>
            </div>

            <div
              className="grid"
              style={{ gridTemplateColumns: view === "grid" ? "repeat(2, 1fr)" : "1fr" }}
            >
              {withCta.map((item, idx) =>
                item.type === "cta" ? (
                  <CtaBanner key="cta-inline" variant="s2" />
                ) : (
                  <DocumentCard key={item.doc.id} doc={item.doc} showAbstract />
                )
              )}
            </div>
          </section>

          <aside className="card" style={{ position: "sticky", top: 90 }}>
            <span className="kicker">ResearchOS</span>
            <h3 style={{ fontSize: "1.05rem" }}>Percepat Riset Anda</h3>
            <p className="text-muted">
              Gunakan ResearchOS untuk mengelola sitasi, mendeteksi research gap, dan menyusun draf riset
              lebih cepat.
            </p>
            <a className="btn btn-secondary" href="https://risethibrida.com" target="_blank" rel="noopener">
              Buka ResearchOS
            </a>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
