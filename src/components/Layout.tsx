import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = () => {
  const location = useLocation();
  const segments = location.pathname.split('/');
  const className = segments.length > 2 ? segments[2] : 'home';
  return (
    <div className={className}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
