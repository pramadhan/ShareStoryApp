import '../styles/styles.css';
import App from './pages/app';
import './utils/index';
import { subscribePush } from './utils/push-notification';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const reg = await navigator.serviceWorker.ready;
    // Otomatis subscribe push notification (bisa diganti dengan tombol jika ingin)
    subscribePush();
  });
}
