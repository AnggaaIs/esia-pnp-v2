-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('mahasiswa', 'admin') NOT NULL DEFAULT 'mahasiswa',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mahasiswas` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `foto_profil` VARCHAR(191) NULL,
    `status_mahasiswa` VARCHAR(191) NOT NULL DEFAULT 'aktif',
    `nim` VARCHAR(191) NOT NULL,
    `nama_lengkap` VARCHAR(191) NOT NULL,
    `tempat_lahir` VARCHAR(191) NULL,
    `tanggal_lahir` DATE NULL,
    `jenis_kelamin` ENUM('L', 'P') NULL,
    `agama` ENUM('islam', 'kristen', 'katolik', 'hindu', 'buddha', 'konghucu', 'lainnya') NULL,
    `alamat_asal` TEXT NULL,
    `provinsi_asal` VARCHAR(191) NULL,
    `kota_kabupaten_asal` VARCHAR(191) NULL,
    `kecamatan_asal` VARCHAR(191) NULL,
    `kelurahan_asal` VARCHAR(191) NULL,
    `rt_asal` VARCHAR(191) NULL,
    `rw_asal` VARCHAR(191) NULL,
    `alamat_sekarang` TEXT NULL,
    `provinsi_sekarang` VARCHAR(191) NULL,
    `kota_kabupaten_sekarang` VARCHAR(191) NULL,
    `kecamatan_sekarang` VARCHAR(191) NULL,
    `kelurahan_sekarang` VARCHAR(191) NULL,
    `rt_sekarang` VARCHAR(191) NULL,
    `rw_sekarang` VARCHAR(191) NULL,
    `nomor_telepon` VARCHAR(191) NULL,
    `nomor_handphone` VARCHAR(191) NULL,
    `pendidikan_terakhir` VARCHAR(191) NULL,
    `status_menikah` ENUM('belum_menikah', 'menikah', 'duda', 'janda') NOT NULL DEFAULT 'belum_menikah',
    `status_tempat_tinggal` ENUM('milik_ortu', 'milik_saudara', 'kontrak', 'kos', 'milik_sendiri', 'wali', 'asrama', 'panti_asuhan') NULL,
    `sumber_biaya_kuliah` ENUM('ortu', 'beasiswa', 'sendiri', 'saudara') NULL,
    `nomor_askes_bpjs` VARCHAR(191) NULL,
    `nomor_indux_kependudukan` VARCHAR(191) NULL,
    `nomor_kartu_keluarga` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `mahasiswas_user_id_key`(`user_id`),
    UNIQUE INDEX `mahasiswas_nim_key`(`nim`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `data_akademiks` (
    `id` VARCHAR(191) NOT NULL,
    `mahasiswa_id` VARCHAR(191) NOT NULL,
    `jurusan` ENUM('teknologi_informasi', 'teknik_mesin', 'teknik_sipil', 'bahasa_inggris', 'administrasi_niaga', 'teknik_elektro', 'akuntansi') NULL,
    `program_studi` VARCHAR(191) NULL,
    `tanggal_terdaftar` DATE NULL,
    `tahun_semester_mulai_kuliah` VARCHAR(191) NULL,
    `tahun_semester_batas_kuliah` VARCHAR(191) NULL,
    `status_awal_terdaftar` VARCHAR(191) NULL,
    `program_kelas` VARCHAR(191) NULL,
    `konsentrasi_prodi` VARCHAR(191) NULL,
    `semester_aktif` VARCHAR(191) NULL,
    `status_kuliah_semester` VARCHAR(191) NULL,
    `kelas` VARCHAR(191) NULL,
    `catatan` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `data_akademiks_mahasiswa_id_key`(`mahasiswa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `data_sekolahs` (
    `id` VARCHAR(191) NOT NULL,
    `mahasiswa_id` VARCHAR(191) NOT NULL,
    `nisn` VARCHAR(191) NULL,
    `npsn` VARCHAR(191) NULL,
    `jenis_smta` VARCHAR(191) NULL,
    `nama_smta` VARCHAR(191) NULL,
    `kota_kabupaten_smta` VARCHAR(191) NULL,
    `jurusan_smta` VARCHAR(191) NULL,
    `status_smta` VARCHAR(191) NULL,
    `tahun_lulus` INTEGER NULL,
    `jumlah_pelajaran_un` INTEGER NULL,
    `nilai_total_un` DECIMAL(5, 2) NULL,
    `nomor_ijazah` VARCHAR(191) NULL,
    `tanggal_ijazah` DATE NULL,
    `jumlah_pelajaran_ijazah` INTEGER NULL,
    `nilai_total_ijazah` DECIMAL(5, 2) NULL,
    `file_ijazah_path` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `data_sekolahs_mahasiswa_id_key`(`mahasiswa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `data_keluargas` (
    `id` VARCHAR(191) NOT NULL,
    `mahasiswa_id` VARCHAR(191) NOT NULL,
    `ayah_nama` VARCHAR(191) NULL,
    `ayah_tempat_lahir` VARCHAR(191) NULL,
    `ayah_tanggal_lahir` DATE NULL,
    `ayah_keadaan` ENUM('Hidup', 'Meninggal', 'Bercerai') NULL,
    `ayah_tanggal_meninggal` DATE NULL,
    `ayah_pendidikan_terakhir` ENUM('Tidak Sekolah', 'SD/MI', 'SMP/Mts', 'SLTA/SMA/SMU/MA', 'D1', 'D2', 'D3', 'D4/S1', 'S2', 'S3') NULL,
    `ayah_pekerjaan` VARCHAR(191) NULL,
    `ayah_penghasilan` ENUM('< 500.000', '500.000 - 999.999', '1.000.000 - 1.999.999', '2.000.000 - 4.999.999', '5.000.000 - 20.000.000', '> 20.000.000', 'Tidak Berpenghasilan') NULL,
    `ayah_alamat` TEXT NULL,
    `ayah_kota` VARCHAR(191) NULL,
    `ayah_kodepos` VARCHAR(191) NULL,
    `ayah_email` VARCHAR(191) NULL,
    `ayah_nik` VARCHAR(191) NULL,
    `ayah_no_telp` VARCHAR(191) NULL,
    `ayah_no_hp` VARCHAR(191) NULL,
    `ibu_nama` VARCHAR(191) NULL,
    `ibu_tempat_lahir` VARCHAR(191) NULL,
    `ibu_tanggal_lahir` DATE NULL,
    `ibu_keadaan` ENUM('Hidup', 'Meninggal', 'Bercerai') NULL,
    `ibu_tanggal_meninggal` DATE NULL,
    `ibu_pendidikan_terakhir` ENUM('Tidak Sekolah', 'SD/MI', 'SMP/Mts', 'SLTA/SMA/SMU/MA', 'D1', 'D2', 'D3', 'D4/S1', 'S2', 'S3') NULL,
    `ibu_pekerjaan` VARCHAR(191) NULL,
    `ibu_penghasilan` ENUM('< 500.000', '500.000 - 999.999', '1.000.000 - 1.999.999', '2.000.000 - 4.999.999', '5.000.000 - 20.000.000', '> 20.000.000', 'Tidak Berpenghasilan') NULL,
    `ibu_alamat` TEXT NULL,
    `ibu_kota` VARCHAR(191) NULL,
    `ibu_kodepos` VARCHAR(191) NULL,
    `ibu_email` VARCHAR(191) NULL,
    `ibu_nik` VARCHAR(191) NULL,
    `ibu_no_telp` VARCHAR(191) NULL,
    `ibu_no_hp` VARCHAR(191) NULL,
    `wali_nama` VARCHAR(191) NULL,
    `wali_tempat_lahir` VARCHAR(191) NULL,
    `wali_tanggal_lahir` DATE NULL,
    `wali_keadaan` ENUM('Hidup', 'Meninggal') NULL,
    `wali_tanggal_meninggal` DATE NULL,
    `wali_pendidikan_terakhir` ENUM('Tidak Sekolah', 'SD/MI', 'SMP/Mts', 'SLTA/SMA/SMU/MA', 'D1', 'D2', 'D3', 'D4/S1', 'S2', 'S3') NULL,
    `wali_pekerjaan` VARCHAR(191) NULL,
    `wali_penghasilan` ENUM('< 500.000', '500.000 - 999.999', '1.000.000 - 1.999.999', '2.000.000 - 4.999.999', '5.000.000 - 20.000.000', '> 20.000.000', 'Tidak Berpenghasilan') NULL,
    `wali_alamat` TEXT NULL,
    `wali_kota` VARCHAR(191) NULL,
    `wali_kodepos` VARCHAR(191) NULL,
    `wali_email` VARCHAR(191) NULL,
    `wali_nik` VARCHAR(191) NULL,
    `wali_no_telp` VARCHAR(191) NULL,
    `wali_no_hp` VARCHAR(191) NULL,
    `jumlah_kakak` INTEGER NULL,
    `jumlah_adik` INTEGER NULL,
    `jumlah_tanggungan_ortu` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `data_keluargas_mahasiswa_id_key`(`mahasiswa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mahasiswas` ADD CONSTRAINT `mahasiswas_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `data_akademiks` ADD CONSTRAINT `data_akademiks_mahasiswa_id_fkey` FOREIGN KEY (`mahasiswa_id`) REFERENCES `mahasiswas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `data_sekolahs` ADD CONSTRAINT `data_sekolahs_mahasiswa_id_fkey` FOREIGN KEY (`mahasiswa_id`) REFERENCES `mahasiswas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `data_keluargas` ADD CONSTRAINT `data_keluargas_mahasiswa_id_fkey` FOREIGN KEY (`mahasiswa_id`) REFERENCES `mahasiswas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
