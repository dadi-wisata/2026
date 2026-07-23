-- schema.sql (Jalankan ini di Cloudflare D1 Dashboard atau via Wrangler CLI)

DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS incomes;
DROP TABLE IF EXISTS members;

-- Tabel untuk menyimpan nama peserta rombongan
CREATE TABLE members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk mencatat uang masuk (Iuran & Donasi)
CREATE TABLE incomes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    member_id INTEGER,
    jenis TEXT NOT NULL,       -- 'Iuran' atau 'Donasi'
    metode TEXT NOT NULL,      -- 'Cash' atau 'Transfer'
    nominal INTEGER NOT NULL,
    keterangan TEXT,
    tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id)
);

-- Tabel untuk mencatat pengeluaran operasional
CREATE TABLE expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    kategori TEXT NOT NULL,    -- 'Travel', 'Transportasi', dll
    nominal INTEGER NOT NULL,
    keterangan TEXT NOT NULL,
    tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);