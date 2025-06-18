import { getStories } from '../data/api';
import { getToken } from '../utils/auth';

class HomePresenter {
  constructor(view) {
    this.view = view;
  }

  async showStories() {
    try {
      const token = getToken();
      if (!token) throw new Error('Anda harus login');
      const result = await getStories(token);
      if (result.error) throw new Error(result.message);
      this.view.showStories(result.listStory || []);
    } catch (err) {
      this.view.showStories([]);
    }
  }
}

export default HomePresenter;
