import { getStoryDetail } from '../data/api';
import { getToken } from '../utils/auth';

class DetailPresenter {
  constructor(view) {
    this.view = view;
  }

  async showDetail(id) {
    try {
      const token = getToken();
      if (!token) throw new Error('Anda harus login');
      const result = await getStoryDetail(id, token);
      if (result.error) throw new Error(result.message);
      this.view.showDetail(result.story);
      this.showMap(result.story);
    } catch (err) {
      this.view.showDetail({ name: '', description: err.message, photoUrl: '', lat: null, lon: null });
    }
  }

  showMap(story) {
    if (window.L && story.lat && story.lon) {
      const map = window.L.map('mapDetail').setView([story.lat, story.lon], 13);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map);
      const marker = window.L.marker([story.lat, story.lon]).addTo(map);
      // Tambahkan popup pada marker
      marker.bindPopup(`
        <strong>${story.name}</strong><br/>
        ${story.description}<br/>
        <em>Lokasi: ${story.lat}, ${story.lon}</em>
      `);
      // Buka popup secara otomatis saat peta ditampilkan
      marker.openPopup();
    }
  }
}

export default DetailPresenter;
