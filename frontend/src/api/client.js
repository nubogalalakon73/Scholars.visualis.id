const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

async function request(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export function fetchDocuments(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, Array.isArray(value) ? value.join(",") : value);
    }
  });
  const qs = query.toString();
  return request(`/documents${qs ? `?${qs}` : ""}`);
}

export function fetchDocument(id) {
  return request(`/documents/${id}`);
}

export function fetchUniversities() {
  return request("/universities");
}

export function fetchUniversity(id) {
  return request(`/universities/${id}`);
}

export function fetchDisciplines() {
  return request("/disciplines");
}

export function fetchDiscipline(id) {
  return request(`/disciplines/${id}`);
}

export function fetchCTA(variant) {
  return request(`/cta/${variant}`);
}
