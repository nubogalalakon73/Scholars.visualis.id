import { useRef, useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CtaBanner from "../components/CtaBanner.jsx";

const BENEFITS = [
  { title: "Jangkauan Nasional", body: "Koleksi Anda terekspos ke ribuan peneliti dan mahasiswa di seluruh Indonesia." },
  { title: "Analitik Repository", body: "Dashboard penggunaan dan sitasi untuk memantau dampak koleksi Anda." },
  { title: "Integrasi Mudah", body: "Kompatibel dengan DSpace, EPrints, OJS, dan platform repository lainnya." },
  { title: "Dukungan Prioritas", body: "Tim teknis dedicated membantu proses migrasi dan sinkronisasi data." },
];

const STEPS = [
  { title: "Registrasi Metadata", body: "Kami mendaftarkan metadata institusi dan repository Anda ke sistem indeksasi." },
  { title: "Verifikasi Teknis", body: "Tim kami memverifikasi kompatibilitas platform repository Anda." },
  { title: "Sinkronisasi Data", body: "Dokumen dari repository Anda mulai disinkronkan secara berkala." },
  { title: "Aktif & Terindeks", body: "Koleksi Anda tayang di Scholar.visualis.id dan dapat ditemukan pengguna." },
];

const FAQS = [
  { q: "Apakah layanan ini berbayar?", a: "Tidak. Integrasi repository ke Scholar.visualis.id gratis untuk seluruh institusi pendidikan di Indonesia." },
  { q: "Platform repository apa saja yang didukung?", a: "Kami mendukung DSpace, EPrints, OJS, dan platform lain melalui protokol OAI-PMH atau ekspor manual." },
  { q: "Berapa lama proses integrasi?", a: "Rata-rata proses verifikasi dan sinkronisasi awal memakan waktu 5–10 hari kerja." },
];

const PLATFORMS = ["DSpace", "EPrints", "OJS", "Lainnya"];

const initialForm = {
  institution: "",
  repositoryUrl: "",
  platform: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
};

export default function Partnership() {
  const wizardRef = useRef(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function scrollToWizard() {
    wizardRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function canProceed() {
    if (step === 1) return form.institution.trim().length > 0;
    if (step === 2) return form.repositoryUrl.trim().length > 0;
    if (step === 3) return form.platform.trim().length > 0;
    if (step === 4) return form.contactName.trim().length > 0 && form.contactEmail.trim().length > 0;
    return true;
  }

  function handleNext() {
    if (!canProceed()) return;
    if (step === 4) {
      setSubmitted(true);
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  return (
    <>
      <Header activePage="partnership" />
      <main className="container section">
        <h1>Jadikan Repository Anda Bagian dari Scholar.visualis.id</h1>
        <p className="text-muted" style={{ maxWidth: 640 }}>
          Bergabunglah sebagai mitra repository dan hubungkan koleksi karya ilmiah institusi Anda ke ekosistem
          pencarian nasional.
        </p>
        <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={scrollToWizard}>
            Ajukan Integrasi
          </button>
          <a className="btn btn-ghost" href="mailto:hello@risethibrida.com">
            Hubungi Kami
          </a>
        </div>

        <section className="band band-1">
          <h2>Manfaat Bergabung</h2>
          <div className="grid grid-2" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {BENEFITS.map((b) => (
              <div key={b.title} className="card">
                <h3 style={{ fontSize: "1rem" }}>{b.title}</h3>
                <p className="text-muted">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Alur Integrasi</h2>
          <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
            {STEPS.map((s, i) => (
              <div key={s.title} style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-start" }}>
                <span className="badge-square" style={{ background: "var(--color-accent)" }}>{i + 1}</span>
                <div>
                  <h3 style={{ fontSize: "1rem", marginBottom: 2 }}>{s.title}</h3>
                  <p className="text-muted">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" style={{ maxWidth: 420 }}>
          <CtaBanner variant="aff" />
        </section>

        <section className="band band-2">
          <h2>Pertanyaan Umum</h2>
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            {FAQS.map((f) => (
              <details key={f.q} className="card">
                <summary style={{ fontWeight: 600, cursor: "pointer" }}>{f.q}</summary>
                <p className="text-muted" style={{ marginTop: "var(--space-2)" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section ref={wizardRef} className="section">
          <h2>Ajukan Repository Anda</h2>
          <div className="card" style={{ maxWidth: 560 }}>
            {submitted ? (
              <p>
                Repository berhasil diajukan. Tim Scholar akan menghubungi {form.institution} melalui
                scholar@visualis.id.
              </p>
            ) : (
              <>
                <div className="text-muted" style={{ marginBottom: "var(--space-4)" }}>
                  Langkah {step} dari 4
                </div>

                {step === 1 && (
                  <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Nama Institusi</label>
                    <input
                      type="text"
                      value={form.institution}
                      onChange={(e) => update("institution", e.target.value)}
                      style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-neutral-300)" }}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>URL Repository</label>
                    <input
                      type="url"
                      value={form.repositoryUrl}
                      onChange={(e) => update("repositoryUrl", e.target.value)}
                      placeholder="https://repository.kampus.ac.id"
                      style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-neutral-300)" }}
                    />
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Platform Repository</label>
                    <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                      {PLATFORMS.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => update("platform", p)}
                          className="btn"
                          style={{
                            background: form.platform === p ? "var(--color-accent)" : "#fff",
                            color: form.platform === p ? "#fff" : "inherit",
                            border: "1px solid var(--color-neutral-300)",
                          }}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div style={{ display: "grid", gap: "var(--space-3)" }}>
                    <div>
                      <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Nama Kontak</label>
                      <input
                        type="text"
                        value={form.contactName}
                        onChange={(e) => update("contactName", e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-neutral-300)" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Email Kontak</label>
                      <input
                        type="email"
                        value={form.contactEmail}
                        onChange={(e) => update("contactEmail", e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-neutral-300)" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Telepon (opsional)</label>
                      <input
                        type="tel"
                        value={form.contactPhone}
                        onChange={(e) => update("contactPhone", e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-neutral-300)" }}
                      />
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "var(--space-6)" }}>
                  <button className="btn btn-ghost" onClick={handleBack} disabled={step === 1}>
                    Kembali
                  </button>
                  <button className="btn btn-primary" onClick={handleNext} disabled={!canProceed()}>
                    {step === 4 ? "Ajukan" : "Lanjut"}
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
