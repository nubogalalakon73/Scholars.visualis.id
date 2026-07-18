import { useState } from "react";
import { Link } from "react-router-dom";
import { BookmarkIcon, ExternalLinkIcon } from "./icons.jsx";

export default function DocumentCard({ doc, showAbstract = false }) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
      <div className="text-muted" style={{ fontSize: "0.8rem" }}>
        {doc.university} &middot; {doc.degree} &middot; {doc.year} &middot; {doc.language}
      </div>
      <h3 style={{ fontSize: "1.05rem" }}>
        <Link to={`/document/${doc.id}`}>{doc.title}</Link>
      </h3>
      <div className="text-muted" style={{ fontSize: "0.9rem" }}>
        {(doc.authors || []).join(", ")}
      </div>
      {doc.repository && <span className="tag">{doc.repository}</span>}
      {showAbstract && doc.abstract && <p className="text-muted">{doc.abstract}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
        {(doc.keywords || []).map((kw) => (
          <span key={kw} className="pill" style={{ fontSize: "0.78rem" }}>
            {kw}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", marginTop: "var(--space-2)" }}>
        <Link to={`/document/${doc.id}`} className="btn btn-primary">
          Lihat Detail
        </Link>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setSaved((v) => !v)}
          aria-pressed={saved}
        >
          <BookmarkIcon filled={saved} /> {saved ? "Tersimpan" : "Simpan"}
        </button>
        <a
          className="btn btn-ghost"
          href="https://risethibrida.com"
          target="_blank"
          rel="noopener"
        >
          ResearchOS <ExternalLinkIcon />
        </a>
      </div>
    </article>
  );
}
