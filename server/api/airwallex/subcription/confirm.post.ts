import { getBillingCheckout } from "~/server/utils/airwallex.api";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body: { clientId: string; checkoutId: string } = await readBody(event);
  if (!body.checkoutId || !body.clientId) {
    throw createError({
      statusCode: 400,
      message: "Missing required parameters",
    });
  }

  try {
    const checkoutInfo = await getBillingCheckout(body.checkoutId);

    await prisma.user.update({
      where: {
        customerID: body.clientId,
      },
      data: {
        subscription: true,
        sID: checkoutInfo?.subscription_id
      },
    });

    return {
      success: true,
      checkout: checkoutInfo,
    };
  } catch (error) {
    console.error("Error confirming subscription:", error);
    throw createError({
      statusCode: 400,
      message: "Error while confirming subscription",
    });
  }
});
