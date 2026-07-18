// Frontend-side copy for the researcher CTA banners, matching the backend's
// /api/cta/:variant content (kept here to avoid a network waterfall for static copy).
export const ctaContent = {
  s1: {
    kicker: "Untuk Mahasiswa S1",
    title: "Sudah Menemukan Ide Judul Skripsi?",
    body: "Mulai susun penelitian S1 Anda dengan alur terbimbing dan audit trail yang menjaga keaslian proses penulisan Anda.",
    ctaLabel: "Mulai Penelitian S1",
    ctaHref: "https://risethibrida.com",
    ctaTarget: "_blank",
  },
  s2: {
    kicker: "Untuk Mahasiswa S2",
    title: "Sudah Sinkron Rujukan Tesis Anda?",
    body: "Uji kelayakan proposal tesis S2 sebelum menemui dosen pembimbing — deteksi kesenjangan antara kerangka teori dan metode.",
    ctaLabel: "Scan Proposal Tesis",
    ctaHref: "https://risethibrida.com",
    ctaTarget: "_blank",
  },
  s3: {
    kicker: "Untuk Peneliti & Dosen",
    title: "Siap Mengelevasi Topik ke Jurnal Internasional?",
    body: "Uji novelty dan kerapatan argumen naskah jurnal Scopus Anda sebelum submit, lengkap dengan pemeriksaan jurnal predator.",
    ctaLabel: "Validasi Naskah Jurnal",
    ctaHref: "https://risethibrida.com",
    ctaTarget: "_blank",
  },
  aff: {
    kicker: "Kemitraan & Ambassador",
    title: "Punya Komunitas Peneliti di Kampus Anda?",
    body: "Rekomendasikan ResearchOS ke rekan sejawat dan raih komisi kemitraan berkelanjutan untuk setiap keberhasilan mereka.",
    ctaLabel: "Daftar Sebagai Partner",
    ctaHref: "mailto:hello@risethibrida.com?subject=Daftar%20Affiliate%20iRDR%20Scholar",
    ctaTarget: "_self",
  },
};

export function getCtaContent(variant) {
  return ctaContent[variant] || ctaContent.s1;
}
