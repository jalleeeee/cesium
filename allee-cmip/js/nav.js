/* ============================================================
   ALLEE CMIP — Shared Navigation & Footer
   ============================================================ */

(function() {
  // --- Navigation ---
  const NAV_HTML = `
  <nav class="main-nav">
    <a href="index.html" class="nav-logo">&#9670; ALLEE CMIP</a>
    <button class="nav-toggle" aria-label="Menu" onclick="document.querySelector('.nav-links').classList.toggle('open')">&#9776;</button>
    <div class="nav-links">
      <a href="index.html">Overview</a>
      <a href="map.html">3D Map</a>
      <a href="science.html">Science</a>
      <a href="documents.html">Documents</a>
      <a href="assets.html">Assets</a>
      <a href="proposal.html">Proposal</a>
    </div>
    <div class="nav-meta">Section 19 &middot; T12S &middot; R8E &middot; Hardin County, IL</div>
  </nav>`;

  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);

  // Highlight active page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  // --- Footer (skip on proposal page) ---
  if (!document.body.classList.contains('proposal-page')) {
    const sourcesHTML = (typeof ALLEE !== 'undefined' && ALLEE.sources)
      ? ALLEE.sources.map(s => `<div>${s}</div>`).join('')
      : '';

    const FOOTER_HTML = `
    <footer class="site-footer">
      <div class="footer-logo">&#9670; Allee Critical Minerals Intelligence Platform</div>
      <div class="footer-location">SW&frac14; of SW&frac14; &middot; Section 19 &middot; T12S &middot; R8E &middot; Hardin County, Illinois</div>
      <div class="footer-copy">&copy; 2026 Allee Mineral Resources LLC &mdash; All Rights Reserved</div>
      <div class="footer-conf">CONFIDENTIAL &mdash; For authorized distribution only</div>
      <details class="footer-sources">
        <summary>Data Sources &#9662;</summary>
        <div class="footer-sources-list">${sourcesHTML}</div>
      </details>
    </footer>`;

    document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
  }
})();
