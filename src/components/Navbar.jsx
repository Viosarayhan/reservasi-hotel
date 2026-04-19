import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hotel, Home, FilePlus, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <Hotel size={28} />
        <span>Grand Horizon</span>
      </Link>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
          <Home size={20} />
          Beranda
        </Link>
        <Link to="/reservasi" className={`nav-link ${isActive('/reservasi') ? 'active' : ''}`}>
          <FilePlus size={20} />
          Reservasi Baru
        </Link>
        <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
      </div>
      <div className="user-profile">
        <div className="btn btn-primary">Admin Panel</div>
      </div>
    </nav>
  );
};

export default Navbar;
