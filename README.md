# LinkHub 🔗

> Klon Linktree yang ringan, cepat, dan gratis — dihosting di GitHub Pages.

Tampilkan semua tautan penting Anda (Instagram, YouTube, GitHub, website pribadi, dll.) dalam satu halaman yang cantik dan responsif.

---

## Pratinjau Fitur

- **3 tema warna** — Terang, Gelap, Ungu (disimpan di localStorage)
- **9 kartu tautan** siap pakai dengan ikon SVG bawaan
- **Animasi halus** — partikel latar, ripple klik, staggered entry, counter angka
- **Warna aksen per platform** — Instagram pink, YouTube merah, GitHub hitam, dst.
- **Copy email** — klik kartu email → langsung salin ke clipboard
- **Responsif** — desktop, tablet, hingga ponsel kecil (≤ 380px)
- **Tanpa dependensi** — murni HTML + CSS + JavaScript vanilla

---

## Struktur Proyek

```
linktree/
├── index.html               ← Halaman utama
├── README.md
└── assets/
    ├── css/
    │   └── style.css        ← Semua styling & tema
    ├── js/
    │   └── main.js          ← Interaktivitas & animasi
    └── images/
        └── avatar.svg       ← Foto profil default
```

---

## Cara Kustomisasi

### 1. Ganti Informasi Profil

Buka `index.html` dan ubah bagian berikut:

```html
<!-- Nama, username, bio -->
<h1 class="profile-name">Nama Anda</h1>
<p class="profile-handle">@username</p>
<p class="profile-bio">
  Kreator konten • Developer • Desainer<br/>
  Berbagi ide dan karya terbaik saya ✨
</p>

<!-- Tag keahlian -->
<span class="tag">💻 Coding</span>
```

### 2. Ganti Foto Profil

Ganti file `assets/images/avatar.svg` dengan foto Anda sendiri (JPG/PNG/WebP), lalu perbarui atribut `src` di `index.html`:

```html
<img src="assets/images/foto-saya.jpg" alt="Foto profil" .../>
```

> **Tips:** Gunakan foto persegi berukuran minimal **220×220 px** agar tajam di semua layar.

### 3. Edit Tautan

Cari setiap `<a class="link-card" ...>` di `index.html` dan ubah `href` serta teks sesuai kebutuhan:

```html
<a href="https://instagram.com/AKUN_ANDA" ...>
  <span class="link-text">
    <strong>Instagram</strong>
    <small>@AKUN_ANDA</small>
  </span>
```

### 4. Tambah Tautan Baru

Salin blok berikut ke dalam salah satu `<div class="links-group">`, lalu sesuaikan:

```html
<a href="https://contoh.com" target="_blank" rel="noopener noreferrer"
   class="link-card" data-platform="website">
  <span class="link-icon" aria-hidden="true">
    <!-- Tempel SVG ikon di sini -->
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
    </svg>
  </span>
  <span class="link-text">
    <strong>Nama Platform</strong>
    <small>Deskripsi singkat</small>
  </span>
  <span class="link-arrow" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  </span>
</a>
```

Tambahkan warna aksen platform di `style.css`:

```css
.link-card[data-platform="namaplatform"] { --platform-color: #hexwarna; }
.link-card[data-platform="namaplatform"]:hover .link-icon { background: #hexwarna; }
```

### 5. Ubah Statistik

Di `index.html`, cari `data-target` dan ganti nilainya:

```html
<strong class="stat-number" data-target="1240">0</strong>  <!-- Followers -->
<strong class="stat-number" data-target="48">0</strong>    <!-- Proyek -->
<strong class="stat-number" data-target="320">0</strong>   <!-- Artikel -->
```

---

## Deploy ke GitHub Pages

### Langkah 1 — Buat Repositori GitHub

1. Buka [github.com/new](https://github.com/new)
2. Beri nama repositori, misal: `linkhub` atau `links`
3. Pilih **Public**
4. Klik **Create repository**

### Langkah 2 — Upload File

**Cara A — Via antarmuka web (paling mudah):**

1. Buka repositori yang baru dibuat
2. Klik **Add file → Upload files**
3. Drag & drop seluruh folder proyek ini (atau pilih semua file)
4. Klik **Commit changes**

> ⚠️ Pastikan `index.html` berada di **root repositori** (bukan di dalam subfolder).

**Cara B — Via Git (untuk pengguna yang familiar):**

```bash
git init
git add .
git commit -m "feat: initial LinkHub site"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

### Langkah 3 — Aktifkan GitHub Pages

1. Di repositori, buka **Settings** (tab paling kanan)
2. Gulir ke bagian **Pages** di menu kiri
3. Di bawah **Branch**, pilih **`main`** dan folder **`/ (root)`**
4. Klik **Save**

Tunggu 1–3 menit, lalu situs akan aktif di:

```
https://USERNAME.github.io/NAMA-REPO/
```

> GitHub akan menampilkan URL lengkap di bagian Pages setelah deploy selesai.

### Langkah 4 (Opsional) — Domain Kustom

Jika Anda memiliki domain sendiri:

1. Di **Settings → Pages**, isi kolom **Custom domain** dengan domain Anda
2. Di panel DNS domain Anda, tambahkan record CNAME:
   - Host: `www` (atau `@` untuk apex)
   - Value: `USERNAME.github.io`
3. Centang **Enforce HTTPS** setelah DNS propagasi selesai (biasanya 1–24 jam)

---

## Tips Performa

| Tindakan | Manfaat |
|---|---|
| Konversi avatar ke WebP | Ukuran file ↓ 30–50% |
| Tambah `loading="lazy"` jika ada gambar tambahan | Muat lebih cepat di mobile |
| Gunakan [Squoosh](https://squoosh.app) untuk kompresi gambar | Tanpa kehilangan kualitas visual |
| Font sudah dimuat via `preconnect` | Mengurangi latensi Google Fonts |
| Semua JS berjalan setelah DOM selesai (`DOMContentLoaded` implisit) | Tidak memblokir render |

---

## Lisensi

Bebas digunakan dan dimodifikasi untuk keperluan pribadi maupun komersial.  
Atribusi tidak wajib, tapi sangat dihargai 🙏
