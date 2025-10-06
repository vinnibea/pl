import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineNitroPlugin(async (nitroApp) => {

  try {
    await prisma.$connect()

    console.log("DB connection established.");
    console.log("Ping is on.");


  } catch (err) {
    console.log(err)
  }
})
