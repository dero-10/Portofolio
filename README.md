# DERO // PROXY — Portfolio

Portofolio **Darren Keith Kho** (NIM 01082240017) — tugas lab Pemrograman Web & Mobile plus aset UI game Roblox,
dengan tema UI terinspirasi game urban-action.

Design system: [Figma — DERO Proxy Portfolio](https://www.figma.com/design/jvblWE2WZsq5ZMDTICDZr2)

## Section
| # | Section | Keterangan |
|---|---|---|
| — | Hero / Agent Card | Perkenalan, counter, kartu agent 3D |
| 01 | Agent Profile | Biografi, ID card, tools |
| 02 | Agent Stats | Radar skill, stat bar, Limit Break |
| 03 | Commissions | Tugas lab — live preview, video demo, source code |
| 04 | UI Archive | Aset UI game Roblox — viewer & filmstrip |
| 05 | Mission Log | Timeline belajar |
| 06 | Comms Channel | Kontak |

## Daftar Lab
| Kode | Proyek | Teknologi |
|---|---|---|
| LAB-01 | [Earth Facts](labs/lab01-earth-facts/) | HTML |
| LAB-04.1 | [Mondrian Project](labs/lab04-1-mondrian/) | CSS Grid |
| LAB-04.2 | [Creative Design Agency](labs/lab04-2-agency/) | CSS, Media Query |
| LAB-05 | [Magic Box](labs/lab05-magicbox/) | JavaScript DOM |
| MOB-01 | [HelloCompose](https://github.com/dero-10/hellocompose) | Kotlin, Jetpack Compose |

## Struktur
```
index.html          halaman utama
css/style.css       styling (design tokens dari Figma, komponen, responsive)
js/data.js          semua konten portofolio
js/main.js          render konten & interaksi
assets/img/         foto profil, screenshot
assets/img/game-ui/ aset UI game
labs/               tugas lab asli
```

## Menjalankan
Buka `index.html`, atau jalankan server lokal agar tab *Source* di modal bisa memuat kode:
```
python -m http.server
```
Lalu buka http://localhost:8000 (tambahkan `?noboot` untuk melewati boot screen).

## Menambah konten
- **Tugas lab baru:** copy folder ke `labs/nama-lab/`, lalu tambah satu objek ke `PROJECTS` di `js/data.js`.
- **Karya UI baru:** taruh gambar di `assets/img/game-ui/`, lalu tambah satu objek ke `WORKS`.
