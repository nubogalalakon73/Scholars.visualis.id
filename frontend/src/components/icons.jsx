export function SearchIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function ExternalLinkIcon(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function BookmarkIcon({ filled, ...props }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M6 3h12v18l-6-4-6 4V3z" />
    </svg>
  );
}

export function CapIcon(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M2 9l10-5 10 5-10 5-10-5z" />
      <path d="M6 11v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
      <path d="M22 9v6" />
    </svg>
  );
}

export function GearIcon(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 005 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 005 9a1.65 1.65 0 00-.33-1.82l-.06-.06A2 2 0 117.44 4.3l.06.06A1.65 1.65 0 009 5a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09A1.65 1.65 0 0015 5a1.65 1.65 0 001.82.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019 9c.36.6.99.99 1.51 1H21a2 2 0 110 4h-.09A1.65 1.65 0 0019.4 15z" />
    </svg>
  );
}

export function BriefcaseIcon(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}

export function ScaleIcon(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 3v18" />
      <path d="M5 7h14" />
      <path d="M5 7L2 13a3 3 0 006 0L5 7z" />
      <path d="M19 7l-3 6a3 3 0 006 0l-3-6z" />
    </svg>
  );
}

export function HeartIcon(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
    </svg>
  );
}

export const disciplineIcons = {
  pendidikan: CapIcon,
  teknik: GearIcon,
  bisnis: BriefcaseIcon,
  hukum: ScaleIcon,
  kesehatan: HeartIcon,
};

export function InstagramIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TwitterIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.7-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 00-7 3.7A11.6 11.6 0 013 4.9a4.1 4.1 0 001.3 5.5c-.7 0-1.3-.2-1.9-.5v.1a4.1 4.1 0 003.3 4 4.2 4.2 0 01-1.9.1 4.1 4.1 0 003.8 2.9A8.3 8.3 0 012 18.4a11.6 11.6 0 006.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" />
    </svg>
  );
}

export function LinkedinIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path d="M7 10v7" />
      <path d="M7 7v.01" />
      <path d="M11 17v-4a2 2 0 014 0v4" />
      <path d="M11 10v7" />
    </svg>
  );
}
