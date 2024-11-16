import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotFound from './notFound.jsx'
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import Home from './pages/home.jsx'
import Booking from './pages/booking.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Profile from './pages/profile.jsx'
import Buy from './pages/buy.jsx'
import Movie from './pages/movie.jsx'
import Dashboard from './pages/dashboard/dashboard.jsx'
import AdminDashboard from './pages/dashboard/adminDashboard.jsx'
import CustomerDashboard from './pages/dashboard/customerDashboard.jsx'
import VendorDashboard from './pages/dashboard/vendorDashboard.jsx'
import VIP from './pages/VIP.jsx'
import './styles/tailwind.css' // Import Tailwind CSS
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/buy/:id" element={<Buy />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/movies/:id" element={<Movie />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/customer" element={<CustomerDashboard />} />
        <Route path="/dashboard/vendor" element={<VendorDashboard />} />
        <Route path="/VIP" element={<VIP />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  </StrictMode>,
)