import { PrismaClient } from "@prisma/client";
export const db = globalThis.prisma || new PrismaClient();
if (process.env.MODE_ENV !== "production") {
  globalThis.prisma = db;
}
