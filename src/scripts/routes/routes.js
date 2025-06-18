import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import LoginPage from '../pages/login/login-page';
import RegisterPage from '../pages/register/register-page';
import UploadPage from '../pages/upload/upload-page';
import DetailPage from '../pages/detail/detail-page';
import NotFoundPage from '../pages/not-found/not-found-page';

const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/upload': new UploadPage(),
  '/detail/:id': new DetailPage(),
  '*': new NotFoundPage(), // fallback 404
};

export default routes;
