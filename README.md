# ESIA PNP v2 - Edisi "Modern & Menyegarkan" 🛠️

Selamat datang di **ESIA PNP v2**. Sebuah eksperimen iseng yang cukup serius.

Project ini dibuat sebagai **alternatif modern** dari sistem yang sudah ada. Web resminya sebenernya sangat fungsional dan berjasa, cuma tampilannya agak... _nostalgic_ (baca: kayak website tahun 2017-an).

Jadi, kita coba racik ulang pake teknologi jaman now biar lebih sedap dipandang dan lebih ngebut pas dipake. Gak ada lagi loading lama-lama club.

## 🌟 Kenapa Dibikin Ulang?

1.  **Visual Upgrade**: Kita pake **Tailwind v4** + **Shadcn UI**. Karena mata juga butuh dimanjakan dengan desain yang bersih dan rapi.
2.  **Sat Set Anti Lelet**: Dibangun di atas **Next.js App Router**. Klik menu langsung pindah, gak pake bengong dulu nungguin server mikir.
3.  **Developer Friendly**: Full **TypeScript** & **Prisma** biar kodingannya lebih "waras" dan gampang dimaintain.
4.  **Auth Custom & Secure**: Pake JWT + Bcrypt + Cloudflare Turnstile. Login aman, bot minggir dulu.

## 🛠️ Dapur Pacu (Tech Stack)

Bahan-bahan pilihan yang dipake di sini:

- **Framework**: [Next.js 16](https://nextjs.org/) (Teknologi paling anyar).
- **Library**: [React 19](https://react.dev/) (Udah standar industri).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS yang sebenernya).
- **Components**: [Shadcn UI](https://ui.shadcn.com/) (Copy-paste terbaik sepanjang masa).
- **Database**: [MariaDB](https://mariadb.org/) via [Prisma ORM](https://www.prisma.io/).
- **Form**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/).
- **I18n**: [next-intl](https://next-intl-docs.vercel.app/) (Siapa tau ada mahasiswa exchange).

## 🚀 Cara Make (Buat Developer)

Kalo mau ikutan ngoding atau sekadar kepo:

1.  **Clone Repo**:
    Tarik dulu kodingannya ke laptop lu.
2.  **Install Dependencies**:
    ```bash
    npm install
    # atau pnpm install (gw ini)
    # atau bun install
    ```
3.  **Setup Environment**:
    Buat file `.env` di root folder, terus isi variabel berikut:

    ```env
    # Database (Ganti sesuai config DB lu)
    DATABASE_URL="mysql://root:password@localhost:3306/esia_pnp_v2"

    # Security (Isi bebas yang penting rahasia)
    JWT_SECRET="rahasia_negara_jangan_dikasih_tau_siapa_siapa"

    # Cloudflare Turnstile (Buat proteksi bot di login)
    # Daftar di https://www.cloudflare.com/products/turnstile/
    # Key dibawah untuk development saja
    NEXT_PUBLIC_TURNSTILE_SITE_KEY="1x00000000000000000000AA"
    TURNSTILE_SECRET_KEY="1x0000000000000000000000000000000AA"
    ```

4.  **Siapin Database (XAMPP Boleh) & Seed Data**:
    Jalanin command ini buat migrasi + isi data awal:
    ```bash
    npm run db:dev
    # terus jalanin seeder
    npm run db:seed
    ```
5.  **Jalanin Server**:
    ```bash
    npm run dev
    ```
    Buka `http://localhost:3000` di browser.
6.  **Akun Demo**:
    Langsung login pake akun ini:

    | Role          | Username     | Password      |
    | :------------ | :----------- | :------------ |
    | **Admin**     | `admin`      | `admin123`    |
    | **Mahasiswa** | `2411882290` | `password123` |

## 📝 Disclaimer

- Web ini cuma project portofolio/latihan, bukan pengganti web resmi kampus.
- Kalo web resmi down, jangan lapor ke sini ya.

---

_"Dibuat karena pengen liat E-SIA yang lebih aesthetic aja sih sebenernya."_
