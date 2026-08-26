import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Classes from './pages/Classes';
import Packages from './pages/Packages';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-background text-text min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:id" element={<ProductDetail />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/classes/:id" element={<Classes />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;