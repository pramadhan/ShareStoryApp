import RegisterPresenter from '../../presenters/register-presenter';

class RegisterPage {
  constructor() {
    this.presenter = new RegisterPresenter(this);
  }

  async render() {
    return `
      <section class="register-page" aria-label="Halaman Daftar">
        <h2>Daftar Akun</h2>
        <form id="registerForm" aria-label="Form Daftar">
          <label for="name">Nama</label>
          <input type="text" id="name" name="name" required aria-required="true" />
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required aria-required="true" />
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required aria-required="true" />
          <button type="submit">Daftar</button>
        </form>
        <p>Sudah punya akun? <a href="#/login">Login</a></p>
        <div id="registerError" role="alert" aria-live="assertive"></div>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', (e) => this.presenter.handleRegister(e));
  }

  showError(message) {
    const errorEl = document.getElementById('registerError');
    if (errorEl) {
      errorEl.textContent = message;
    }
  }
}

export default RegisterPage;
