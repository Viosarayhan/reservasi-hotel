import React from 'react';
import { 
  BarChart3, Users, BedDouble, TrendingUp, 
  Clock, CheckCircle2, AlertCircle 
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Reservasi', value: '1,284', change: '+12%', icon: <BarChart3 className="text-blue-500" />, color: 'blue' },
    { label: 'Tamu Check-in', value: '45', change: '+5%', icon: <Users className="text-green-500" />, color: 'green' },
    { label: 'Kamar Tersedia', value: '12', change: '-2%', icon: <BedDouble className="text-orange-500" />, color: 'orange' },
    { label: 'Pendapatan Hari Ini', value: 'Rp 12.5M', change: '+18%', icon: <TrendingUp className="text-purple-500" />, color: 'purple' },
  ];

  const activities = [
    { id: 1, type: 'checkin', guest: 'Mr. John Doe', room: '802', time: '10:30 AM', status: 'Success' },
    { id: 2, type: 'checkout', guest: 'Mrs. Sarah Smith', room: '405', time: '09:15 AM', status: 'Pending' },
    { id: 3, type: 'booking', guest: 'Mr. Robert Brown', room: 'DLX', time: '08:45 AM', status: 'Success' },
  ];

  return (
    <div className="dashboard-page">
      {/* Hero Section */}
      <section className="dashboard-hero" style={{
        position: 'relative',
        height: '350px',
        borderRadius: '20px',
        overflow: 'hidden',
        marginBottom: '2rem',
        backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        color: 'white'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2))',
          zIndex: 1
        }}></div>
        <div style={{ position: 'relative', zIndex: 2, padding: '0 4rem', maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', lineHeight: 1.2 }}>
            Selamat Datang di <span style={{ color: '#3b82f6' }}>Horizon Admin</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '2rem' }}>
            Pantau performa hotel Anda, kelola reservasi tamu, dan optimalkan layanan operasional dalam satu dashboard terpadu.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>Lihat Laporan</button>
            <button className="btn btn-secondary" style={{ padding: '0.8rem 2rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>Kelola Kamar</button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {stats.map((stat, i) => (
          <div key={i} className="form-section" style={{ margin: 0, padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              borderRadius: '12px', 
              background: `rgba(var(--${stat.color}-rgb), 0.1)`, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>{stat.label}</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '2px 0' }}>{stat.value}</h3>
              <span style={{ fontSize: '0.75rem', color: stat.change.startsWith('+') ? '#10b981' : '#ef4444', fontWeight: '600' }}>
                {stat.change} <span style={{ color: '#94a3b8', fontWeight: '400' }}>vs bulan lalu</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="form-section">
          <div className="section-title">
            <Clock size={20} />
            <span>Aktivitas Terbaru</span>
          </div>
          <table className="modern-table">
            <thead>
              <tr>
                <th>Tamu</th>
                <th>Kamar</th>
                <th>Waktu</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(act => (
                <tr key={act.id}>
                  <td style={{ fontWeight: '600' }}>{act.guest}</td>
                  <td>{act.room}</td>
                  <td>{act.time}</td>
                  <td>
                    <span className={`status-badge ${act.status === 'Success' ? 'status-guaranteed' : 'status-pending'}`}>
                      {act.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-section">
          <div className="section-title">
            <AlertCircle size={20} />
            <span>Notifikasi Penting</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: '#fff7ed', borderRadius: '10px', borderLeft: '4px solid #f97316' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: '600', color: '#9a3412' }}>Pembersihan Kamar</p>
              <p style={{ fontSize: '0.75rem', color: '#c2410c' }}>Kamar 802 memerlukan pembersihan mendalam segera.</p>
            </div>
            <div style={{ padding: '1rem', background: '#eff6ff', borderRadius: '10px', borderLeft: '4px solid #3b82f6' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e40af' }}>Update Reservasi</p>
              <p style={{ fontSize: '0.75rem', color: '#1d4ed8' }}>5 Tamu baru melakukan booking untuk akhir pekan ini.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
