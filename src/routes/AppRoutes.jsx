/**
 * AppRoutes.jsx
 * ----------------------------------------------------------
 * BC Eats — central route configuration.
 */

import {
  lazy,
  Suspense,
  useEffect,
} from 'react';

import {
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import PageTransition from '../components/PageTransition.jsx';
import PageLoader from '../components/PageLoader.jsx';

const Home = lazy(
  () => import('../pages/Home.jsx'),
);

const Checkout = lazy(
  () => import('../pages/Checkout.jsx'),
);

const Order = lazy(
  () => import('../pages/Order.jsx'),
);

function RouteView({ children }) {
  return (
    <PageTransition>
      {children}
    </PageTransition>
  );
}

function RoutesWithTransitions() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [location.pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RouteView>
            <Home />
          </RouteView>
        }
      />

      <Route
        path="/checkout"
        element={
          <RouteView>
            <Checkout />
          </RouteView>
        }
      />

      <Route
        path="/order"
        element={
          <RouteView>
            <Order />
          </RouteView>
        }
      />

      <Route
        path="*"
        element={
          <RouteView>
            <Home />
          </RouteView>
        }
      />
    </Routes>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RoutesWithTransitions />
    </Suspense>
  );
}