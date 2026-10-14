import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Landing from './pages/Landing';
import Wholesale from './pages/Wholesale';
import Reviews from './pages/Reviews';
import Products from './pages/Products';
import Collections from './pages/Collections';
import CustomOrder from './pages/CustomOrder';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import TrackOrder from './pages/TrackOrder';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminOrders from './pages/AdminOrders';
import AdminReports from './pages/AdminReports';
import StaffDashboard from './pages/StaffDashboard';
import RequireAdminAuth from './components/RequireAdminAuth';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ThemeProvider } from './context/ThemeContext';

function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
    <CartProvider>
      <WishlistProvider>
        <AdminAuthProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <StorefrontLayout>
                    <Landing />
                  </StorefrontLayout>
                }
              />
              <Route
                path="/products"
                element={
                  <StorefrontLayout>
                    <Products />
                  </StorefrontLayout>
                }
              />
              <Route
                path="/collections"
                element={
                  <StorefrontLayout>
                    <Collections />
                  </StorefrontLayout>
                }
              />
              <Route
                path="/custom-order"
                element={
                  <StorefrontLayout>
                    <CustomOrder />
                  </StorefrontLayout>
                }
              />
              <Route
                path="/wholesale"
                element={
                  <StorefrontLayout>
                    <Wholesale />
                  </StorefrontLayout>
                }
              />
              <Route
                path="/reviews"
                element={
                  <StorefrontLayout>
                    <Reviews />
                  </StorefrontLayout>
                }
              />
              <Route
                path="/cart"
                element={
                  <StorefrontLayout>
                    <Cart />
                  </StorefrontLayout>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <StorefrontLayout>
                    <Wishlist />
                  </StorefrontLayout>
                }
              />
              <Route
                path="/track-order"
                element={
                  <StorefrontLayout>
                    <TrackOrder />
                  </StorefrontLayout>
                }
              />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <RequireAdminAuth allowedRoles={['admin']}>
                    <AdminDashboard />
                  </RequireAdminAuth>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <RequireAdminAuth allowedRoles={['admin']}>
                    <AdminOrders />
                  </RequireAdminAuth>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <RequireAdminAuth allowedRoles={['admin']}>
                    <AdminReports />
                  </RequireAdminAuth>
                }
              />
              <Route
                path="/staff/dashboard"
                element={
                  <RequireAdminAuth allowedRoles={['staff']}>
                    <StaffDashboard />
                  </RequireAdminAuth>
                }
              />
            </Routes>
          </BrowserRouter>
        </AdminAuthProvider>
      </WishlistProvider>
    </CartProvider>
    </ThemeProvider>
  );
}
