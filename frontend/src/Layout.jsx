import { Outlet } from 'react-router-dom';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;