import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["warn", "error"],
  errorFormat: "pretty",
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("📦 Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("📦 Database disconnected");
  } catch (error) {
    console.error("❌ Database disconnection error:", error);
    process.exit(1);
  }
};

export const prismaClient = () => {
  if (process.env.NODE_ENV === "production") {
    return new PrismaClient();
  }
  return prisma;
};

export default prisma;
