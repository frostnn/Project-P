import Calendar from '../pages/Calendar/Calendar';
import Gallery from '../pages/Gallery/Gallery';
import Home from '../pages/Home/Home';
import Profile from '../pages/Profile/Profile';
import Friends from '../pages/Friends/Friends';
import User from '../components/User/User';

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
  {
    path: '/login/Friends',
    exact: true,
    component: Friends,
  },
  {
    path: '/login/User/:id',
    exact: true,
    component: User,
  },
];

export default routesConfig;
