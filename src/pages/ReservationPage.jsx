import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import { 
  Download, Eye, Save, X, Search, 
  Calendar, User, CreditCard, Plane, 
  Settings, Info, MapPin 
} from 'lucide-react';

const ReservationPage = () => {
  const [formData, setFormData] = useState({
    resNo: '13416',
    arrival: new Date().toISOString().split('T')[0],
    nights: '1',
    departure: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    adults: '1',
    child: '0',
    infant: '0',
    compl: '0',
    age: '0',
    comCh: '0',
    rmQty: '01',
    cat: 'DLX',
    rtc: '',
    argt: '',
    rsvStatus: 'Guaranteed',
    rateCode: 'BARD',
    roomRate: '863940',
    currency: 'Rp',
    guestName: '',
    billReceiver: '',
    purpose: '',
    billInstruction: '',
    flight: '',
    eta: '00:00',
    etd: '00:00',
    pickedUp: false,
    drop: false,
    group: '',
    segment: '50 INDIVIDUAL',
    source: '3 RSV by Phone',
    contact: '',
    voucher: '',
    deposit: '0',
    payment1: '0.00',
    payment2: '0.00',
    balance: '0.00'
  });

  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const pdfRef = useRef(null);

  useEffect(() => {
    if (formData.arrival && formData.nights) {
      const start = new Date(formData.arrival);
      const end = new Date(start.getTime() + parseInt(formData.nights) * 86400000);
      const endStr = end.toISOString().split('T')[0];
      if (formData.departure !== endStr) {
        setFormData(prev => ({ ...prev, departure: endStr }));
      }
    }
  }, [formData.arrival, formData.nights]);

  const validate = () => {
    const newErrors = {};
    if (!formData.guestName.trim()) newErrors.guestName = 'Nama tamu wajib diisi';
    if (!formData.arrival) newErrors.arrival = 'Tanggal arrival wajib diisi';
    if (parseInt(formData.nights) < 1) newErrors.nights = 'Minimal 1 malam';
    if (parseInt(formData.adults) < 1) newErrors.adults = 'Minimal 1 dewasa';
    if (!formData.roomRate) newErrors.roomRate = 'Rate wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setShowPreview(true);
  };

  const formatIDR = (val) => new Intl.NumberFormat('id-ID').format(val);

  return (
    <div className="reservation-container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <header className="reservation-header">
        <div>
          <h1>Reservasi Baru</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>ID Reservasi: #{formData.resNo}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={handleSubmit} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
            <Eye size={18} /> Preview & Save
          </button>
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
          <div className="main-form-column">
            {/* Section 1: Guest Information */}
            <section className="form-section">
              <div className="section-title">
                <User size={20} />
                <span>Informasi Tamu</span>
              </div>
              <div className="input-container mb-4">
                <label>Nama Lengkap Tamu *</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" name="guestName" 
                    value={formData.guestName} onChange={handleChange}
                    className={`modern-input ${errors.guestName ? 'error-border' : ''}`}
                    placeholder="Contoh: Mr. John Doe"
                    style={{ flex: 1 }}
                  />
                  <button type="button" className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}>CARI</button>
                </div>
                {errors.guestName && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.guestName}</span>}
              </div>
              <div className="modern-grid">
                <div className="input-container">
                  <label>Tujuan Menginap</label>
                  <select name="purpose" value={formData.purpose} onChange={handleChange} className="modern-input">
                    <option value="">Pilih Tujuan</option>
                    <option>Bisnis</option>
                    <option>Liburan</option>
                    <option>Dinas</option>
                  </select>
                </div>
                <div className="input-container">
                  <label>Instruksi Billing</label>
                  <input type="text" name="billInstruction" value={formData.billInstruction} onChange={handleChange} className="modern-input" placeholder="Catatan tambahan..." />
                </div>
              </div>
            </section>

            {/* Section 2: Stay Information */}
            <section className="form-section">
              <div className="section-title">
                <Calendar size={20} />
                <span>Detail Menginap</span>
              </div>
              <div className="modern-grid">
                <div className="input-container">
                  <label>Tanggal Arrival *</label>
                  <input type="date" name="arrival" value={formData.arrival} onChange={handleChange} className="modern-input" />
                </div>
                <div className="input-container">
                  <label>Malam *</label>
                  <input type="number" name="nights" value={formData.nights} onChange={handleChange} min="1" className="modern-input" />
                </div>
                <div className="input-container">
                  <label>Tanggal Departure</label>
                  <input type="date" name="departure" value={formData.departure} readOnly className="modern-input" style={{ background: '#f1f5f9' }} />
                </div>
                <div className="input-container">
                  <label>Status</label>
                  <select name="rsvStatus" value={formData.rsvStatus} onChange={handleChange} className="modern-input">
                    <option>Guaranteed</option>
                    <option>Non-Guaranteed</option>
                  </select>
                </div>
              </div>
              <div className="modern-grid mt-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="input-container">
                  <label>Dewasa</label>
                  <input type="number" name="adults" value={formData.adults} onChange={handleChange} min="1" className="modern-input" />
                </div>
                <div className="input-container">
                  <label>Anak</label>
                  <input type="number" name="child" value={formData.child} onChange={handleChange} min="0" className="modern-input" />
                </div>
                <div className="input-container">
                  <label>Rm Qty</label>
                  <input type="text" name="rmQty" value={formData.rmQty} onChange={handleChange} className="modern-input" />
                </div>
                <div className="input-container">
                  <label>Kategori</label>
                  <select name="cat" value={formData.cat} onChange={handleChange} className="modern-input">
                    <option>DLX</option>
                    <option>STD</option>
                    <option>SUI</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Section 3: Transport */}
            <section className="form-section">
              <div className="section-title">
                <Plane size={20} />
                <span>Layanan Transportasi</span>
              </div>
              <div className="modern-grid">
                <div className="input-container">
                  <label>Nomor Penerbangan</label>
                  <input type="text" name="flight" value={formData.flight} onChange={handleChange} className="modern-input" placeholder="Contoh: SQ 123" />
                </div>
                <div className="input-container">
                  <label>ETA (Kedatangan)</label>
                  <input type="time" name="eta" value={formData.eta} onChange={handleChange} className="modern-input" />
                </div>
                <div className="input-container">
                  <label>ETD (Keberangkatan)</label>
                  <input type="time" name="etd" value={formData.etd} onChange={handleChange} className="modern-input" />
                </div>
              </div>
            </section>
          </div>

          <div className="sidebar-column">
            {/* Section 4: Pricing */}
            <section className="form-section">
              <div className="section-title">
                <CreditCard size={20} />
                <span>Ringkasan Biaya</span>
              </div>
              <div className="input-container" style={{ marginBottom: '1.25rem' }}>
                <label style={{ marginBottom: '0.5rem', display: 'block' }}>Kode Rate</label>
                <select name="rateCode" value={formData.rateCode} onChange={handleChange} className="modern-input" style={{ width: '100%' }}>
                  <option>BARD</option>
                  <option>RACK</option>
                  <option>CORP</option>
                </select>
              </div>
              <div className="input-container" style={{ marginBottom: '1.5rem' }}>
                <label style={{ marginBottom: '0.5rem', display: 'block' }}>Harga Kamar ({formData.currency})</label>
                <input type="text" name="roomRate" value={formData.roomRate} onChange={handleChange} className="modern-input" style={{ fontWeight: 'bold', width: '100%' }} />
              </div>
              
              <div style={{ padding: '1.25rem', background: '#eff6ff', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(30, 64, 175, 0.1)', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#1e40af', fontWeight: '500' }}>Total Estimasi</span>
                  <span style={{ fontWeight: '800', color: '#1e40af', fontSize: '1rem' }}>{formData.currency} {formatIDR(formData.roomRate * formData.nights)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#1e40af', fontWeight: '500' }}>Saldo Akhir</span>
                  <span style={{ fontWeight: '800', color: '#1e40af', fontSize: '1rem' }}>{formData.currency} {formatIDR(formData.roomRate * formData.nights - formData.deposit)}</span>
                </div>
              </div>
            </section>

            {/* Section 5: Market Info */}
            <section className="form-section">
              <div className="section-title">
                <MapPin size={20} />
                <span>Info Pasar</span>
              </div>
              <div className="input-container mb-3">
                <label>Segmen</label>
                <select name="segment" value={formData.segment} onChange={handleChange} className="modern-input" style={{ fontSize: '0.8rem' }}>
                  <option>50 INDIVIDUAL</option>
                  <option>10 CORPORATE</option>
                </select>
              </div>
              <div className="input-container">
                <label>Sumber</label>
                <select name="source" value={formData.source} onChange={handleChange} className="modern-input" style={{ fontSize: '0.8rem' }}>
                  <option>3 RSV by Phone</option>
                  <option>4 Online</option>
                </select>
              </div>
            </section>
          </div>
        </div>
      </form>

      {/* Modern Table */}
      <div className="table-container">
        <div style={{ padding: '1rem', background: '#f8fafc', borderBottom: '1px solid var(--border)', fontWeight: '600' }}>
          Jadwal Menginap
        </div>
        <table className="modern-table">
          <thead>
            <tr>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Unit</th>
              <th>Kategori</th>
              <th style={{ textAlign: 'right' }}>Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formData.arrival}</td>
              <td>{formData.departure}</td>
              <td>{formData.rmQty}</td>
              <td>{formData.cat}</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formData.currency} {formatIDR(formData.roomRate)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PDF Preview Modal remains same as before but styled nicely */}
      {showPreview && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header" style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="card-title">Preview Reservasi</h2>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button onClick={() => {
                  const element = pdfRef.current;
                  const opt = {
                    margin: 10,
                    filename: `Reservation_${formData.guestName}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                  };
                  html2pdf().set(opt).from(element).save();
                }} className="btn btn-primary">
                  <Download size={18} /> Unduh PDF
                </button>
                <button onClick={() => setShowPreview(false)} className="btn btn-secondary">
                  <X size={18} /> Tutup
                </button>
              </div>
            </div>
            <div style={{ padding: '2rem', background: '#f1f5f9' }}>
              {/* PDF Document content from previous turn... */}
              <div className="pdf-document" ref={pdfRef} style={{ width: '210mm', minHeight: '297mm', margin: '0 auto', padding: '15mm', background: 'white', fontFamily: "'Inter', sans-serif" }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #f1f5f9', paddingBottom: '20px' }}>
                  <div>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1e40af', margin: 0, fontFamily: "'Outfit', sans-serif" }}>Konfirmasi Reservasi</h1>
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '5px' }}>ID Reservasi: #{formData.resNo}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: 0 }}>GRAND HORIZON</h2>
                    <p style={{ fontSize: '10px', color: '#94a3b8' }}>Luxury Hotel & Resort</p>
                  </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
                  <div className="pdf-main-col">
                    {/* Section 1: Guest Information */}
                    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '15px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontWeight: '700', fontSize: '13px', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                        <span>INFORMASI TAMU</span>
                      </div>
                      <div style={{ fontSize: '11px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div>
                          <label style={{ color: '#64748b', fontWeight: '600' }}>Nama Tamu</label>
                          <p style={{ fontWeight: '700', fontSize: '13px', marginTop: '2px' }}>{formData.guestName.toUpperCase()}</p>
                        </div>
                        <div>
                          <label style={{ color: '#64748b', fontWeight: '600' }}>Tujuan</label>
                          <p style={{ fontWeight: '600', marginTop: '2px' }}>{formData.purpose || '-'}</p>
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                          <label style={{ color: '#64748b', fontWeight: '600' }}>Instruksi Billing</label>
                          <p style={{ marginTop: '2px', fontStyle: 'italic' }}>{formData.billInstruction || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Stay Information */}
                    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '15px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontWeight: '700', fontSize: '13px', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                        <span>DETAIL MENGINAP</span>
                      </div>
                      <div style={{ fontSize: '11px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                        <div>
                          <label style={{ color: '#64748b', fontWeight: '600' }}>Arrival</label>
                          <p style={{ fontWeight: '700', marginTop: '2px' }}>{formData.arrival}</p>
                        </div>
                        <div>
                          <label style={{ color: '#64748b', fontWeight: '600' }}>Nights</label>
                          <p style={{ fontWeight: '700', marginTop: '2px' }}>{formData.nights} Malam</p>
                        </div>
                        <div>
                          <label style={{ color: '#64748b', fontWeight: '600' }}>Departure</label>
                          <p style={{ fontWeight: '700', marginTop: '2px' }}>{formData.departure}</p>
                        </div>
                        <div>
                          <label style={{ color: '#64748b', fontWeight: '600' }}>Kamar</label>
                          <p style={{ fontWeight: '600', marginTop: '2px' }}>{formData.rmQty} x {formData.cat}</p>
                        </div>
                        <div>
                          <label style={{ color: '#64748b', fontWeight: '600' }}>Person</label>
                          <p style={{ fontWeight: '600', marginTop: '2px' }}>{formData.adults} Ad / {formData.child} Ch</p>
                        </div>
                        <div>
                          <label style={{ color: '#64748b', fontWeight: '600' }}>Status</label>
                          <p style={{ fontWeight: '600', marginTop: '2px', color: '#16a34a' }}>{formData.rsvStatus}</p>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Transport */}
                    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontWeight: '700', fontSize: '13px', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                        <span>TRANSPORTASI</span>
                      </div>
                      <div style={{ fontSize: '11px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                        <div>
                          <label style={{ color: '#64748b', fontWeight: '600' }}>Flight</label>
                          <p style={{ fontWeight: '600', marginTop: '2px' }}>{formData.flight || '-'}</p>
                        </div>
                        <div>
                          <label style={{ color: '#64748b', fontWeight: '600' }}>ETA</label>
                          <p style={{ fontWeight: '600', marginTop: '2px' }}>{formData.eta}</p>
                        </div>
                        <div>
                          <label style={{ color: '#64748b', fontWeight: '600' }}>ETD</label>
                          <p style={{ fontWeight: '600', marginTop: '2px' }}>{formData.etd}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pdf-side-col">
                    {/* Section 4: Pricing */}
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '15px', marginBottom: '20px' }}>
                      <div style={{ color: '#1e40af', fontWeight: '700', fontSize: '13px', marginBottom: '15px', textAlign: 'center' }}>RINGKASAN BIAYA</div>
                      <div style={{ fontSize: '11px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ color: '#60a5fa', fontWeight: '600' }}>Rate Code:</span>
                          <span style={{ fontWeight: '700' }}>{formData.rateCode}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ color: '#60a5fa', fontWeight: '600' }}>Room Rate:</span>
                          <span style={{ fontWeight: '700' }}>{formData.currency} {formatIDR(formData.roomRate)}</span>
                        </div>
                        <div style={{ borderTop: '1px solid #bfdbfe', paddingTop: '10px', marginTop: '10px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span style={{ color: '#1e40af', fontWeight: '700' }}>TOTAL ESTIMASI:</span>
                            <span style={{ color: '#1e40af', fontWeight: '800', fontSize: '14px' }}>{formData.currency} {formatIDR(formData.roomRate * formData.nights)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '15px' }}>
                      <div style={{ fontSize: '10px', color: '#64748b', lineHeight: '1.6' }}>
                        <p><strong>Syarat & Ketentuan:</strong></p>
                        <p>• Check-in: 14:00 | Check-out: 12:00</p>
                        <p>• Reservasi ini bersifat {formData.rsvStatus.toLowerCase()}.</p>
                        <p>• Harap tunjukkan dokumen ini saat kedatangan.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ width: '200px', textAlign: 'center', fontSize: '11px' }}>
                    <div style={{ height: '60px', borderBottom: '2px solid #e2e8f0', marginBottom: '8px' }}></div>
                    <span style={{ color: '#64748b', fontWeight: '600' }}>TANDA TANGAN TAMU</span>
                  </div>
                  <div style={{ width: '200px', textAlign: 'center', fontSize: '11px' }}>
                    <div style={{ height: '60px', borderBottom: '2px solid #e2e8f0', marginBottom: '8px' }}></div>
                    <span style={{ color: '#64748b', fontWeight: '600' }}>RESEPSIONIS</span>
                  </div>
                </div>

                <footer style={{ marginTop: 'auto', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '20px', color: '#cbd5e1', fontSize: '9px' }}>
                  Dokumen ini dihasilkan secara otomatis oleh Sistem Manajemen Hotel Grand Horizon.
                </footer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationPage;
