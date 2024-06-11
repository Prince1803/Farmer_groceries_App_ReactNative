import images from './images';
import Cart from '../../Components/CartScreen';
import Explore from '../../Components/ExploreScreen';
import Home from '../../Components/HomeScreen';
import Profile from '../../Components/ProfileScreen';

export const TabNav = [
  {
    id: 1,
    title: 'Home',
    component: Home,
    src: images.BottomHome,
  },
  {
    id: 2,
    title: 'Explore',
    component: Explore,
    src: images.BottomExplore,
  },
  {
    id: 3,
    title: 'Cart',
    component: Cart,
    src: images.BottomCart,
  },
  {
    id: 4,
    title: 'Profile',
    component: Profile,
    src: images.BottomProfile,
  },
];
