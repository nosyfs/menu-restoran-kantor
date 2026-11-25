import * as readline from "readline";
// ===================== BLOK 1: TIPE DATA DAN DATA AWAL =====================

// Interface Menu: bentuk satu data menu (daftar menu restoran, hanya dibaca)
interface Menu {
  id: string; // kode unik menu, contoh "M001"
  nama: string; // nama menu
  kategori: string; // "Makanan" atau "Minuman"
  harga: number; // harga satuan dalam rupiah
  tersedia: boolean; // status ketersediaan menu
}

// Interface Pesanan: satu baris pesanan milik pelanggan (entitas utama CRUD)
interface Pesanan {
  id: string; // kode unik pesanan, contoh "P001"
  namaMenu: string; // nama menu yang dipesan
  kategori: string; // kategori menu yang dipesan
  harga: number; // harga satuan saat dipesan
  porsi: number; // jumlah porsi
}

// Konstanta nilai tetap yang tidak berubah selama program berjalan
const NAMA_APLIKASI: string = "Noer Chinefood";
const BATAS_DISKON_BESAR: number = 100000; // total belanja untuk diskon tingkat atas
const BATAS_DISKON_SEDANG: number = 50000; // total belanja untuk diskon tingkat tengah

// Array daftar menu restoran (data awal / seed)
const daftarMenu: Menu[] = [
  { id: "M001", nama: "Nasi Goreng Chili", kategori: "Makanan", harga: 18000, tersedia: true },
  { id: "M002", nama: "Bakmi", kategori: "Makanan", harga: 15000, tersedia: true },
  { id: "M003", nama: "Fuyunghai", kategori: "Makanan", harga: 20000, tersedia: true },
  { id: "M004", nama: "Capcay", kategori: "Makanan", harga: 22000, tersedia: true },
  { id: "M005", nama: "Koloke", kategori: "Makanan", harga: 25000, tersedia: true },
  { id: "M006", nama: "Es Teh", kategori: "Minuman", harga: 5000, tersedia: true },
  { id: "M007", nama: "Teh Tarik", kategori: "Minuman", harga: 8000, tersedia: true },
  { id: "M008", nama: "Es Campur", kategori: "Minuman", harga: 10000, tersedia: true },
  { id: "M009", nama: "Air Putih", kategori: "Minuman", harga: 3000, tersedia: true },
  { id: "M010", nama: "Jus", kategori: "Minuman", harga: 12000, tersedia: true },
];

// Array pesanan pelanggan (berisi dua pesanan contoh sebagai data awal)
const daftarPesanan: Pesanan[] = [
  { id: "P001", namaMenu: "Nasi Goreng Chili", kategori: "Makanan", harga: 18000, porsi: 2 },
  { id: "P002", namaMenu: "Es Teh", kategori: "Minuman", harga: 5000, porsi: 1 },
];
