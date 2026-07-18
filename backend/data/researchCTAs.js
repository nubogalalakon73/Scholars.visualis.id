// Static config (not a DB collection) for the researcher-segment CTA banners.
export const researchCTAs = [
  {
    id: "s1",
    kicker: "Untuk Mahasiswa S1",
    title: "Sudah Menemukan Ide Judul Skripsi?",
    body: "Mulai susun penelitian S1 Anda dengan alur terbimbing dan audit trail yang menjaga keaslian proses penulisan Anda.",
    ctaLabel: "Mulai Penelitian S1",
    ctaHref: "https://risethibrida.com",
    ctaTarget: "_blank",
  },
  {
    id: "s2",
    kicker: "Untuk Mahasiswa S2",
    title: "Sudah Sinkron Rujukan Tesis Anda?",
    body: "Uji kelayakan proposal tesis S2 sebelum menemui dosen pembimbing — deteksi kesenjangan antara kerangka teori dan metode.",
    ctaLabel: "Scan Proposal Tesis",
    ctaHref: "https://risethibrida.com",
    ctaTarget: "_blank",
  },
  {
    id: "s3",
    kicker: "Untuk Peneliti & Dosen",
    title: "Siap Mengelevasi Topik ke Jurnal Internasional?",
    body: "Uji novelty dan kerapatan argumen naskah jurnal Scopus Anda sebelum submit, lengkap dengan pemeriksaan jurnal predator.",
    ctaLabel: "Validasi Naskah Jurnal",
    ctaHref: "https://risethibrida.com",
    ctaTarget: "_blank",
  },
  {
    id: "aff",
    kicker: "Kemitraan & Ambassador",
    title: "Punya Komunitas Peneliti di Kampus Anda?",
    body: "Rekomendasikan ResearchOS ke rekan sejawat dan raih komisi kemitraan berkelanjutan untuk setiap keberhasilan mereka.",
    ctaLabel: "Daftar Sebagai Partner",
    ctaHref: "mailto:hello@risethibrida.com?subject=Daftar%20Affiliate%20iRDR%20Scholar",
    ctaTarget: "_self",
  },
];

export function getCTA(id) {
  return researchCTAs.find((c) => c.id === id) || null;
}
