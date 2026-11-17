import {
  doCreateBillingCheckout,
  doCreateBillingCustomer,
} from "~/server/utils/airwallex.api";
import prisma from "~/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

type UserRaw = {
  name: string;
  surname: string;
  phone: string;
  city: string;
  email: string;
};
export default defineEventHandler(async (event) => {
  const body: UserRaw = await readBody(event);
  const temporary_password: string | undefined = getCookie(event, "tp");
  const config = useRuntimeConfig();

  if (!temporary_password) {
    throw createError({
      statusCode: 400,
      message: "Some data is missing",
    });
  }
  const verified_tp = jwt.verify(temporary_password, config.secret);
  if (!verified_tp) {
    throw createError({
      statusCode: 400,
      message: "Invalid credentials",
    });
  }
  const hashedPassword = await bcrypt.hashSync(verified_tp as string, 3);
  const headers = getHeaders(event);
  const ip =
    headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    headers["x-real-ip"] ||
    event.node.req.socket.remoteAddress || '0.0.0';

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ phone: body.phone! }, { email: body.email! }],
      },
    });
    let billingCheckout;
    if (existingUser) {
      billingCheckout = await doCreateBillingCheckout(
        existingUser.customerID,
        config.airwallaxPriceId,
        "",
      );
    } else {
      const createdCustomer = await doCreateBillingCustomer(body);
      billingCheckout = await doCreateBillingCheckout(
        createdCustomer.id,
        config.airwallaxPriceId,
        createdCustomer.default_legal_entity_id,
      );

      await prisma.user.create({
        data: {
          customerID: createdCustomer.id,
          name: body.name,
          surname: body.surname,
          phone: body.phone,
          email: body.email || createdCustomer.email,
          city: body.city,
          subscription: false,
          sID: "",
          password: hashedPassword,
        },
      });

    }

    return {
      clientSecret: billingCheckout.client_secret,
      clientId: billingCheckout.billing_customer_id,
      checkoutId: billingCheckout.id,
    };
  } catch (error: any) {
    console.warn(error);
    console.error(
      "=== AIRWALLEX 400 ERROR ===",
      JSON.stringify(error.data || error.response?._data || error, null, 2),
    );
    throw createError({
      status: 400,
      message: "Failed to create client",
    });
  }
});
