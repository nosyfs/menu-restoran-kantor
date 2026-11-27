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

// [PROGRESS 2 - Jumat, 27 Nov 2026] FUNGSI BANTU & PERHITUNGAN BERTIPE
// Mencakup: fungsi dengan return nilai hitung, fungsi void, operator aritmatika,
// perbandingan, logika, compound, dan seleksi kondisi (if, switch, nested 3 tingkat)
// ----------------------------------------------------------------------------

// Fungsi bertipe number dengan parameter: menghitung subtotal satu pesanan (harga * porsi)
function hitungSubtotal(harga: number, porsi: number): number {
    // Menggunakan operator aritmatika perkalian (*)
    return harga * porsi;
}

// Fungsi bertipe number tanpa parameter: menghitung total seluruh pesanan menggunakan loop for...of & compound (+=)
function hitungTotalBelanja(): number {
    let total: number = 0; // Inisialisasi akumulator total belanja
    for (const item of daftarPesanan) {
        const subtotal: number = hitungSubtotal(item.harga, item.porsi); // Hitung subtotal tiap item
        total += subtotal; // Menggunakan operator compound assignment (+=)
    }
    return total; // Mengembalikan total belanja sebelum diskon
}

// Fungsi bertipe number dengan parameter: menentukan persentase diskon berdasarkan status dan total belanja
// Memuat seleksi kondisi if majemuk (&&) dan nested 3 tingkat (if -> if/else if -> kondisi nominal)
function tentukanPersentaseDiskon(status: string, totalBelanja: number): number {
    let persenDiskon: number = 0; // Nilai default diskon 0%

    // Tingkat 1: cek status pembeli
    if (status === "pegawai") {
        // Tingkat 2: cek apakah memenuhi syarat minimal diskon pegawai
        if (totalBelanja >= BATAS_DISKON_KECIL && totalBelanja > 0) {
            // Tingkat 3: tentukan besaran persentase berdasarkan nominal total belanja
            if (totalBelanja >= BATAS_DISKON_BESAR) {
                persenDiskon = 15; // Diskon 15% untuk pegawai belanja >= Rp100.000
            } else {
                persenDiskon = 10; // Diskon 10% untuk pegawai belanja Rp50.000 - Rp99.999
            }
        }
    } else if (status === "umum") {
        // Tingkat 2: cek apakah memenuhi syarat minimal diskon umum
        if (totalBelanja >= BATAS_DISKON_KECIL && totalBelanja > 0) {
            // Tingkat 3: tentukan besaran persentase berdasarkan nominal total belanja
            if (totalBelanja >= BATAS_DISKON_BESAR) {
                persenDiskon = 10; // Diskon 10% untuk umum belanja >= Rp100.000
            } else {
                persenDiskon = 5; // Diskon 5% untuk umum belanja Rp50.000 - Rp99.999
            }
        }
    }

    return persenDiskon; // Mengembalikan persentase diskon (angka 0..15)
}
// Fungsi bertipe number dengan parameter: membulatkan nominal pembayaran ke bawah ke kelipatan ratusan
function bulatkanKeRatusan(nominal: number): number {
    // Menggunakan operator aritmatika modulo (%) dan pengurangan (-)
    const sisa: number = nominal % KELIPATAN_BULAT;
    return nominal - sisa;
}

// Fungsi bertipe boolean dengan parameter: memvalidasi input bilangan bulat positif (bukan NaN dan > 0)
function validasiBilanganBulatPositif(nilai: number): boolean {
    // Menggunakan operator perbandingan dan logika (&&, !, >)
    if (Number.isNaN(nilai) || !Number.isInteger(nilai) || nilai <= 0) {
        return false; // Input tidak valid
    }
    return true; // Input valid
}

// Fungsi bertipe void tanpa parameter: menampilkan daftar menu restoran ke terminal
function tampilkanDaftarMenu(): void {
    console.log("\n============================================================");
    console.log("                  DAFTAR MENU NOER CHINEFOOD              ");
    console.log("============================================================");
    // Menggunakan perulangan for standar dengan index
    for (let i: number = 0; i < daftarMenu.length; i++) {
        const m: Menu = daftarMenu[i]!; // Mengambil elemen menu pada index ke-i
        const statusTersedia: string = m.tersedia ? "Tersedia" : "Habis"; // Operator ternary
        console.log(
            `${i + 1}. [${m.id}] ${m.nama} (${m.kategori}) - Rp${m.harga.toLocaleString("id-ID")} | ${statusTersedia}`
        );
    }
    console.log("============================================================");
}