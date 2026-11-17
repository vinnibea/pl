import prisma from "~/lib/prisma";
import { doCancelSubscription } from "~/server/utils/airwallex.api";

export default defineEventHandler(async (event) => {
  const body: { phone: string } = await readBody(event);
  console.log(body, "BODY");
  if (!body.phone) {
    throw createError({
      statusCode: 400,
      message: "Missing required parameters",
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        phone: body.phone,
      },
    });

    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User not found",
      });
    }
    await doCancelSubscription(user.sID);
    const updatedUser = await prisma.user.update({
      where: {
        phone: body.phone,
      },
      data: {
        subscription: false,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error canceling subscription:", error);
    throw createError({
      statusCode: 400,
      message: "Error while canceling subscription",
    });
  }
});
