// Halaman Not Found (404)
export default class NotFoundPage {
  async render() {
    return `
      <section class="not-found-page" aria-label="Halaman Tidak Ditemukan">
        <div class="not-found-card">
          <h1>404</h1>
          <p>Halaman tidak ditemukan.</p>
          <a href="#/" class="back-home">Kembali ke Beranda</a>
        </div>
      </section>
    `;
  }
  async afterRender() {}
}
