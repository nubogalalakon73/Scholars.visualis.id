// Curated list of Indonesian university repositories to harvest metadata from.
// NOTE: these OAI-PMH endpoints are UNVERIFIED (sourced from general knowledge,
// not live-tested from this environment). Expect some to fail on first harvest —
// check /admin/harvest-logs after running a harvest to see which ones need fixing.
export const repositories = [
  { name: "Universitas Indonesia", platform: "eprints", baseUrl: "https://lib.ui.ac.id", oaiEndpoint: "https://lib.ui.ac.id/cgi/oai2", metadataPrefix: "oai_dc", status: "active", enabled: true, universityId: "ui" },
  { name: "Universitas Gadjah Mada (ETD)", platform: "dspace", baseUrl: "https://etd.repository.ugm.ac.id", oaiEndpoint: "https://etd.repository.ugm.ac.id/oai/request", metadataPrefix: "oai_dc", status: "active", enabled: true, universityId: "ugm" },
  { name: "Institut Teknologi Bandung", platform: "dspace", baseUrl: "https://digilib.itb.ac.id", oaiEndpoint: "https://digilib.itb.ac.id/oai/request", metadataPrefix: "oai_dc", status: "active", enabled: true, universityId: "itb" },
  { name: "IPB University", platform: "eprints", baseUrl: "https://repository.ipb.ac.id", oaiEndpoint: "https://repository.ipb.ac.id/cgi/oai2", metadataPrefix: "oai_dc", status: "active", enabled: true, universityId: "ipb" },
  { name: "Universitas Padjadjaran", platform: "eprints", baseUrl: "https://repository.unpad.ac.id", oaiEndpoint: "https://repository.unpad.ac.id/cgi/oai2", metadataPrefix: "oai_dc", status: "active", enabled: true, universityId: "unpad" },
  { name: "Universitas Airlangga", platform: "eprints", baseUrl: "https://repository.unair.ac.id", oaiEndpoint: "https://repository.unair.ac.id/cgi/oai2", metadataPrefix: "oai_dc", status: "active", enabled: true, universityId: "unair" },
  { name: "Institut Teknologi Sepuluh Nopember", platform: "eprints", baseUrl: "https://repository.its.ac.id", oaiEndpoint: "https://repository.its.ac.id/cgi/oai2", metadataPrefix: "oai_dc", status: "active", enabled: true, universityId: "its" },
  { name: "Universitas Riau", platform: "eprints", baseUrl: "https://repository.unri.ac.id", oaiEndpoint: "https://repository.unri.ac.id/cgi/oai2", metadataPrefix: "oai_dc", status: "active", enabled: true, universityId: "unri" },
  { name: "Universitas Hasanuddin", platform: "eprints", baseUrl: "https://repository.unhas.ac.id", oaiEndpoint: "https://repository.unhas.ac.id/cgi/oai2", metadataPrefix: "oai_dc", status: "active", enabled: true, universityId: "unhas" },
  { name: "Universitas Sumatera Utara", platform: "eprints", baseUrl: "https://repositori.usu.ac.id", oaiEndpoint: "https://repositori.usu.ac.id/oai/request", metadataPrefix: "oai_dc", status: "active", enabled: true, universityId: "usu" },
  { name: "Universitas Diponegoro", platform: "eprints", baseUrl: "https://eprints.undip.ac.id", oaiEndpoint: "https://eprints.undip.ac.id/cgi/oai2", metadataPrefix: "oai_dc", status: "active", enabled: true },
  { name: "Universitas Brawijaya", platform: "eprints", baseUrl: "https://repository.ub.ac.id", oaiEndpoint: "https://repository.ub.ac.id/cgi/oai2", metadataPrefix: "oai_dc", status: "active", enabled: true },
  { name: "Universitas Sebelas Maret", platform: "eprints", baseUrl: "https://eprints.uns.ac.id", oaiEndpoint: "https://eprints.uns.ac.id/cgi/oai2", metadataPrefix: "oai_dc", status: "active", enabled: true },
  { name: "Universitas Negeri Yogyakarta", platform: "eprints", baseUrl: "https://eprints.uny.ac.id", oaiEndpoint: "https://eprints.uny.ac.id/cgi/oai2", metadataPrefix: "oai_dc", status: "active", enabled: true },
  { name: "Universitas Negeri Semarang", platform: "eprints", baseUrl: "https://lib.unnes.ac.id", oaiEndpoint: "https://lib.unnes.ac.id/cgi/oai2", metadataPrefix: "oai_dc", status: "active", enabled: true },
  { name: "Universitas Muhammadiyah Surakarta", platform: "eprints", baseUrl: "https://eprints.ums.ac.id", oaiEndpoint: "https://eprints.ums.ac.id/cgi/oai2", metadataPrefix: "oai_dc", status: "active", enabled: true },
  { name: "Universitas Muhammadiyah Yogyakarta", platform: "eprints", baseUrl: "https://repository.umy.ac.id", oaiEndpoint: "https://repository.umy.ac.id/cgi/oai2", metadataPrefix: "oai_dc", status: "active", enabled: true },
  { name: "UIN Sunan Kalijaga", platform: "eprints", baseUrl: "https://digilib.uin-suka.ac.id", oaiEndpoint: "https://digilib.uin-suka.ac.id/cgi/oai2", metadataPrefix: "oai_dc", status: "active", enabled: true },
  { name: "Universitas Telkom", platform: "dspace", baseUrl: "https://openlibrary.telkomuniversity.ac.id", oaiEndpoint: "https://openlibrary.telkomuniversity.ac.id/oai/request", metadataPrefix: "oai_dc", status: "active", enabled: true },
  { name: "Universitas Bina Nusantara", platform: "dspace", baseUrl: "https://library.binus.ac.id", oaiEndpoint: "https://library.binus.ac.id/oai/request", metadataPrefix: "oai_dc", status: "active", enabled: true },
];

export default repositories;
