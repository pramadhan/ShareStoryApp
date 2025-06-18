import { login } from '../data/api';
import { saveToken } from '../utils/auth';

class LoginPresenter {
  constructor(view) {
    this.view = view;
  }

  async handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const result = await login({ email, password });
      if (result.error) throw new Error(result.message);
      saveToken(result.loginResult.token);
      window.location.hash = '/';
    } catch (err) {
      this.view.showError(err.message);
    }
  }
}

export default LoginPresenter;
