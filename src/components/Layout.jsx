import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <>
    <Header />
    <div className="main-content">
      <Outlet />
    </div>
  </>
);

export default Layout;
