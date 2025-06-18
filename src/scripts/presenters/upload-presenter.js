import { postStory } from '../data/api';
import { getToken } from '../utils/auth';

class UploadPresenter {
  constructor(view) {
    this.view = view;
    this.lat = null;
    this.lon = null;
    this.photoBlob = null;
  }

  async handleUpload(e) {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const photoInput = document.getElementById('photo');
    const photo = this.photoBlob || (photoInput.files[0] || null);
    try {
      const token = getToken();
      if (!token) throw new Error('Anda harus login');
      const result = await postStory({ description, photo, lat: this.lat, lon: this.lon }, token);
      if (result.error) throw new Error(result.message);
      window.location.hash = '/';
    } catch (err) {
      this.view.showError(err.message);
    }
  }

  initCamera() {
    // Inisialisasi kamera jika didukung
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      this.stream = null;
      this.video = document.createElement('video');
      this.video.setAttribute('autoplay', '');
      this.video.setAttribute('playsinline', '');
      this.video.style.width = '100%';
      document.getElementById('cameraPreview').appendChild(this.video);
    }
  }

  async openCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    const preview = document.getElementById('cameraPreview');
    preview.style.display = 'block';
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.video.srcObject = this.stream;
      // Tombol ambil gambar
      if (!document.getElementById('takePhotoBtn')) {
        const btn = document.createElement('button');
        btn.id = 'takePhotoBtn';
        btn.textContent = 'Ambil Foto';
        btn.onclick = (e) => {
          e.preventDefault();
          this.takePhoto();
        };
        preview.appendChild(btn);
      }
    } catch (err) {
      this.view.showError('Kamera tidak tersedia');
    }
  }

  takePhoto() {
    const canvas = document.createElement('canvas');
    canvas.width = this.video.videoWidth;
    canvas.height = this.video.videoHeight;
    canvas.getContext('2d').drawImage(this.video, 0, 0);
    canvas.toBlob((blob) => {
      this.photoBlob = blob;
      this.stopCamera();
      document.getElementById('cameraPreview').innerHTML = '<img src="' + URL.createObjectURL(blob) + '" alt="Preview Foto" style="width:100%;" />';
    }, 'image/jpeg');
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  initMap() {
    // Inisialisasi peta dengan LeafletJS
    if (window.L && document.getElementById('map')) {
      const map = window.L.map('map').setView([-6.2, 106.8], 5);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map);
      let marker;
      map.on('click', (e) => {
        this.lat = e.latlng.lat;
        this.lon = e.latlng.lng;
        document.getElementById('location').value = `${this.lat},${this.lon}`;
        if (marker) marker.setLatLng(e.latlng);
        else marker = window.L.marker(e.latlng).addTo(map);
      });
    }
  }
}

export default UploadPresenter;
