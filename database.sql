-- Struktur Database Sederhana untuk Sistem Reservasi Hotel

CREATE DATABASE IF NOT EXISTS hotel_reservation;
USE hotel_reservation;

-- Tabel untuk menyimpan data tamu (Guest)
CREATE TABLE guests (
    guest_id INT AUTO_INCREMENT PRIMARY KEY,
    guest_name VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk menyimpan data reservasi utama
CREATE TABLE reservations (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    guest_id INT NOT NULL,
    arrival_date DATE NOT NULL,
    departure_date DATE NOT NULL,
    nights INT NOT NULL,
    adults INT DEFAULT 1,
    children INT DEFAULT 0,
    infants INT DEFAULT 0,
    room_quantity INT DEFAULT 1,
    room_category VARCHAR(50) NOT NULL,
    rate_code VARCHAR(50),
    currency VARCHAR(10) DEFAULT 'IDR',
    reservation_status VARCHAR(50) DEFAULT 'Guaranteed',
    reservation_source VARCHAR(100),
    payment_instruction TEXT,
    flight_number VARCHAR(50),
    flight_eta TIME,
    flight_etd TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (guest_id) REFERENCES guests(guest_id) ON DELETE CASCADE
);

-- Tabel untuk Reservation History/Lines (Opsional)
CREATE TABLE reservation_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id INT NOT NULL,
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    action VARCHAR(100) NOT NULL, -- e.g., 'Created', 'Updated', 'Checked-In'
    user_id VARCHAR(50) DEFAULT 'System',
    notes TEXT,
    
    FOREIGN KEY (reservation_id) REFERENCES reservations(reservation_id) ON DELETE CASCADE
);
