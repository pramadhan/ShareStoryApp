import DetailPresenter from '../../presenters/detail-presenter';

class DetailPage {
  constructor() {
    this.presenter = new DetailPresenter(this);
  }

  async render(id) {
    return `
      <section class="detail-page" aria-label="Detail Cerita">
        <div id="detailContent"></div>
        <div id="mapDetail" style="height:200px;"></div>
      </section>
    `;
  }

  async afterRender(id) {
    await this.presenter.showDetail(id);
  }

  showDetail(story) {
    const el = document.getElementById('detailContent');
    const hasLocation = story.lat && story.lon;
    el.innerHTML = `
      <div class="detail-card detail-flex-wrap">
        <div class="detail-img-map">
          <div class="detail-img-wrap">
            <img class="detail-img" src="${story.photoUrl ? story.photoUrl : 'public/images/logo.png'}" alt="Foto cerita oleh ${story.name}" onerror="this.onerror=null;this.src='public/images/logo.png';" />
          </div>
          <div class="detail-map">
            ${hasLocation ? `<div id="mapDetail" class="detail-map-loading"><span class='map-loading-text'>Memuat peta...</span></div>` : `<div class='map-placeholder'>Lokasi tidak tersedia</div>`}
          </div>
        </div>
        <h2>${story.name}</h2>
        <p class="detail-desc">${story.description || ''}</p>
        <p class="detail-location"><strong>Lokasi:</strong> ${hasLocation ? `${story.lat}, ${story.lon}` : 'Tidak tersedia'}</p>
      </div>
    `;
  }
}

export default DetailPage;
