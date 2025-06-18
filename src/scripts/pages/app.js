import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this._setupDrawer();
  }

  _setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#navigationDrawer.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      if (!this.#navigationDrawer.contains(event.target) && !this.#drawerButton.contains(event.target)) {
        this.#navigationDrawer.classList.remove('open');
      }

      this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open');
        }
      })
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url] || routes['*'];

    // Ambil id dari hash jika ada (untuk detail)
    let id = null;
    if (window.location.hash.startsWith('#/detail/')) {
      id = window.location.hash.split('/')[2] || null;
    }

    // View Transition API
    if (document.startViewTransition) {
      await document.startViewTransition(async () => {
        this.#content.innerHTML = await page.render(id);
        await page.afterRender(id);
      });
    } else {
      this.#content.innerHTML = await page.render(id);
      await page.afterRender(id);
    }
  }
}

export default App;
