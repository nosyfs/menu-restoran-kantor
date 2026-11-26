import * as readlineSync from "readline-sync"; // Mengimpor modul input sinkron untuk terminal

// ----------------------------------------------------------------------------
// [PROGRESS 2 - Jumat, 27 Nov 2026] DEFINISI TIPE DATA, KONSTANTA & VARIABEL
// Mencakup: interface/type entitas, tipe string, number, boolean, const & let
// ----------------------------------------------------------------------------

// Struktur entitas Menu (daftar menu restoran yang tersedia)
interface Menu {
    id: string;         // Kode unik menu, contoh: "M001"
    nama: string;       // Nama makanan atau minuman
    kategori: string;   // Kategori menu: "Makanan" atau "Minuman"
    harga: number;      // Harga satuan dalam Rupiah
    tersedia: boolean;  // Status ketersediaan menu
}

// Struktur entitas Pesanan (data pesanan aktif yang dikelola dengan CRUD)
interface Pesanan {
    id: string;         // Kode unik pesanan, contoh: "P001"
    menuId: string;     // ID menu yang dipesan
    namaMenu: string;   // Nama menu yang dipesan
    kategori: string;   // Kategori menu ("Makanan" atau "Minuman")
    harga: number;      // Harga satuan saat dipesan
    porsi: number;      // Jumlah porsi pesanan (bilangan bulat positif)
}

// Konstanta tetap untuk batas diskon dan pembulatan pembayaran
const BATAS_DISKON_BESAR: number = 100000; // Batas minimal total belanja diskon besar (Rp100.000)
const BATAS_DISKON_KECIL: number = 50000;   // Batas minimal total belanja diskon kecil (Rp50.000)
const KELIPATAN_BULAT: number = 100;        // Pembulatan ke bawah ke kelipatan ratusan rupiah

// Variabel kontrol aplikasi dan counter ID pesanan (menggunakan let karena nilainya berubah)
let jalan: boolean = true;      // Penanda perulangan menu utama aktif/berhenti
let counterPesanan: number = 3; // Pencacah untuk membuat ID pesanan baru yang unik

// Data awal (seed data) daftar menu restoran "Noer Chinefood" (10 menu)
const daftarMenu: Menu[] = [
    { id: "M001", nama: "Nasi Goreng Chili", kategori: "Makanan", harga: 18000, tersedia: true },
    { id: "M002", nama: "Bakmi", kategori: "Makanan", harga: 15000, tersedia: true },
    { id: "M003", nama: "Fuyunghai", kategori: "Makanan", harga: 15000, tersedia: true },
    { id: "M004", nama: "Capcay", kategori: "Makanan", harga: 12000, tersedia: true },
    { id: "M005", nama: "Koloke", kategori: "Makanan", harga: 20000, tersedia: true },
    { id: "D001", nama: "Es Teh", kategori: "Minuman", harga: 5000, tersedia: true },
    { id: "D002", nama: "Teh Tarik", kategori: "Minuman", harga: 7000, tersedia: true },
    { id: "D003", nama: "Es Campur", kategori: "Minuman", harga: 10000, tersedia: true },
    { id: "D004", nama: "Air Putih", kategori: "Minuman", harga: 4000, tersedia: true },
    { id: "D005", nama: "Jus", kategori: "Minuman", harga: 8000, tersedia: false }, // Contoh menu sedang kosong
];

// Data awal (seed data) pesanan aktif (2 pesanan contoh)
let daftarPesanan: Pesanan[] = [
    { id: "P001", menuId: "M001", namaMenu: "Nasi Goreng Chili", kategori: "Makanan", harga: 18000, porsi: 2 },
    { id: "P002", menuId: "D001", namaMenu: "Es Teh", kategori: "Minuman", harga: 5000, porsi: 2 },
];

