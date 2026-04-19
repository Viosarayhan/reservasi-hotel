import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Clock, Users } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div 
        className="hero" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80')` }}
      >
        <div className="hero-content">
          <h1>Sistem Manajemen Hotel Modern</h1>
          <p>
            Kelola check-in, check-out, dan reservasi tamu dengan antarmuka yang elegan 
            dan profesional. Efisiensi operasional di ujung jari Anda.
          </p>
          <Link to="/reservasi" className="btn btn-primary btn-lg">
            Mulai Reservasi <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      <div className="features grid-cols-3 grid mt-4" style={{ padding: '4rem 2rem' }}>
        <div className="card feature-card">
          <ShieldCheck size={40} className="mb-4" style={{ color: 'var(--primary)' }} />
          <h3>Aman & Terpercaya</h3>
          <p>Penyimpanan data tamu yang aman dengan sistem enkripsi standar industri.</p>
        </div>
        <div className="card feature-card">
          <Clock size={40} className="mb-4" style={{ color: 'var(--secondary)' }} />
          <h3>Cepat & Efisien</h3>
          <p>Proses check-in hanya membutuhkan waktu kurang dari 2 menit.</p>
        </div>
        <div className="card feature-card">
          <Users size={40} className="mb-4" style={{ color: 'var(--accent)' }} />
          <h3>Pengalaman Tamu</h3>
          <p>Berikan kesan pertama yang luar biasa dengan proses administrasi yang seamless.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
