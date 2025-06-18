import LoginPresenter from '../../presenters/login-presenter';

class LoginPage {
  constructor() {
    this.presenter = new LoginPresenter(this);
  }

  async render() {
    return `
      <section class="login-page" aria-label="Halaman Login">
        <h2>Login</h2>
        <form id="loginForm" aria-label="Form Login">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required aria-required="true" autocomplete="username" />
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required aria-required="true" autocomplete="current-password" />
          <button type="submit">Login</button>
        </form>
        <p>Belum punya akun? <a href="#/register">Daftar</a></p>
        <div id="loginError" role="alert" aria-live="assertive"></div>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', (e) => this.presenter.handleLogin(e));
  }

  showError(message) {
    const errorEl = document.getElementById('loginError');
    if (errorEl) {
      errorEl.textContent = message;
    }
  }
}

export default LoginPage;
