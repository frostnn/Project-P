import Calendar from '../pages/Calendar/Calendar';
import Gallery from '../pages/Gallery/Gallery';
import Home from '../pages/Home/Home';
import Profile from '../pages/Profile/Profile';

const routesConfig = [
  {
    path: '/login/Home',
    exact: true,
    component: Home,
  },
  {
    path: '/login/Profile',
    exact: true,
    component: Profile,
  },
  {
    path: '/login/Gallery',
    exact: true,
    component: Gallery,
  },
  {
    path: '/login/Calendar',
    exact: true,
    component: Calendar,
  },
];

export default routesConfig;
