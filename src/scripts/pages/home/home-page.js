import HomePresenter from '../../presenters/home-presenter';

export default class HomePage {
  constructor() {
    this.presenter = new HomePresenter(this);
  }

  async render() {
    return `
      <section class="home-page" aria-label="Daftar Cerita">
        <h2>Daftar Cerita</h2>
        <div id="storiesList" tabindex="0"></div>
        <button id="uploadBtn">Upload Cerita Baru</button>
      </section>
    `;
  }

  async afterRender() {
    await this.presenter.showStories();
    document.getElementById('uploadBtn').onclick = () => {
      window.location.hash = '/upload';
    };
  }

  showStories(stories) {
    const el = document.getElementById('storiesList');
    if (!stories.length) {
      el.innerHTML = '<p style="text-align:center;">Tidak ada cerita.</p>';
      return;
    }
    el.innerHTML = `
      <div class="stories-grid">
        ${stories.map(story => `
          <article class="story-card" tabindex="0" aria-label="Cerita oleh ${story.name}">
            <div class="story-img-wrap">
              <img class="story-img" src="${story.photoUrl ? story.photoUrl : 'public/images/logo.png'}" alt="Foto cerita oleh ${story.name}" onerror="this.onerror=null;this.src='public/images/logo.png';" />
            </div>
            <div class="story-meta">
              <h3>${story.name}</h3>
              <p class="story-desc">${story.description ? story.description.substring(0, 100) + '...' : ''}</p>
              <div class="story-info">
                <span class="story-date"><i class="fa fa-calendar"></i> ${story.createdAt ? new Date(story.createdAt).toLocaleDateString('id-ID') : ''}</span>
                ${story.lat && story.lon ? `<span class="story-location"><i class="fa fa-map-marker-alt"></i> ${story.lat.toFixed(2)}, ${story.lon.toFixed(2)}</span>` : ''}
              </div>
              <button class="story-detail-btn styled-detail-btn" onclick="window.location.hash = '/detail/${story.id}'" aria-label="Lihat detail cerita oleh ${story.name}">
                <i class="fa fa-eye"></i>
                <span>Lihat Detail</span>
              </button>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }
}
