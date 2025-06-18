// Halaman UploadPage (View)
import UploadPresenter from '../../presenters/upload-presenter';

class UploadPage {
  constructor() {
    this.presenter = new UploadPresenter(this);
  }

  async render() {
    return `
      <section class="upload-page" aria-label="Upload Cerita">
        <h2>Upload Cerita</h2>
        <form id="uploadForm" aria-label="Form Upload Cerita" enctype="multipart/form-data">
          <label for="description">Deskripsi</label>
          <textarea id="description" name="description" required aria-required="true"></textarea>
          <label for="photo">Foto</label>
          <input type="file" id="photo" name="photo" accept="image/*" capture="environment" />
          <button type="button" id="cameraBtn">Ambil dari Kamera</button>
          <div id="cameraPreview" style="display:none;"></div>
          <label for="location">Lokasi (opsional)</label>
          <input type="text" id="location" name="location" placeholder="Klik peta untuk memilih lokasi" readonly />
          <div id="map" style="height:200px;"></div>
          <button type="submit">Upload</button>
        </form>
        <div id="uploadError" role="alert" aria-live="assertive"></div>
      </section>
    `;
  }

  async afterRender() {
    this.presenter.initCamera();
    this.presenter.initMap();
    document.getElementById('uploadForm').addEventListener('submit', (e) => this.presenter.handleUpload(e));
    document.getElementById('cameraBtn').addEventListener('click', () => this.presenter.openCamera());
  }

  showError(message) {
    document.getElementById('uploadError').textContent = message;
  }
}

export default UploadPage;
