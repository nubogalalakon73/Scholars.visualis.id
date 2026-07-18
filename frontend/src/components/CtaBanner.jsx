import { getCtaContent } from "../api/ctaContent.js";
import { ExternalLinkIcon } from "./icons.jsx";

export default function CtaBanner({ variant }) {
  const cta = getCtaContent(variant);
  const isMailto = cta.ctaHref.startsWith("mailto:");

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", height: "100%" }}>
      <span className="kicker">{cta.kicker}</span>
      <h3 style={{ fontSize: "1.1rem" }}>{cta.title}</h3>
      <p className="text-muted" style={{ flexGrow: 1 }}>{cta.body}</p>
      <a
        className="btn btn-secondary"
        href={cta.ctaHref}
        target={cta.ctaTarget}
        rel={isMailto ? undefined : "noopener"}
      >
        {cta.ctaLabel}
        {!isMailto && <ExternalLinkIcon />}
      </a>
    </div>
  );
}
