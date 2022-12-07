// routes
import { PATH_AUTH, PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'MENU',
    items: [
      {
        title: 'Browse events',
        path: PATH_DASHBOARD.general.app,
        icon: ICONS.dashboard
      },
      // { title: 'Under construction!', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'Under construction!', path: "#", icon: ICONS.analytics },
      // { title: 'Subscribed Events', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking }
      { title: 'Subscribed Events', path: "#", icon: ICONS.booking }
    ]
  },

  // USER
  // ----------------------------------------------------------------------
  {
    subheader: 'USER',
    items: [
      {
        title: 'Profile',
        path: PATH_DASHBOARD.user.account,
        icon: ICONS.user,
        info: <Label color="error">2</Label>
      },
      { title: 'Calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
      {
        title: 'Logout',
        // path: PATH_DASHBOARD.kanban,
        path: PATH_AUTH.logout,
        icon: ICONS.kanban
      }
    ]
  }
];

export default sidebarConfig;
