/**
 * App.jsx
 * ----------------------------------------------------------
 * BC Eats application root.
 */

import { BrowserRouter } from 'react-router-dom';

import { CartProvider } from './context/CartContext.jsx';

import Navbar from './components/Navbar.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

import './styles/app.css';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />

        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  );
}