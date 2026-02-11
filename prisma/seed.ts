import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const mahasiswaPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: adminPassword,
      role: "admin",
    },
  });

  console.log("created admin user:", admin.username);

  const mahasiswa = await prisma.user.upsert({
    where: { username: "2411882290" },
    update: {},
    create: {
      username: "2411882290",
      password: mahasiswaPassword,
      role: "mahasiswa",
      mahasiswa: {
        create: {
          nim: "2411882290",
          namaLengkap: "Mahasiswa Demo",
          statusMahasiswa: "aktif",
          jenisKelamin: "L",
          agama: "islam",
          statusMenikah: "belum_menikah",
        },
      },
    },
  });

  console.log("created mahasiswa user:", mahasiswa.username);

  console.log("database seeding completed successfully");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
