import { register } from '../data/api';

class RegisterPresenter {
  constructor(view) {
    this.view = view;
  }

  async handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const result = await register({ name, email, password });
      if (result.error) throw new Error(result.message);
      window.location.hash = '/login';
    } catch (err) {
      this.view.showError(err.message);
    }
  }
}

export default RegisterPresenter;
