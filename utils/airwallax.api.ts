type UserRaw = {
  phone: string;
  name: string;
  surname: string;
  email: string;
  city: string;
};

export const doCreateAirwallaxClient = async (
  client: UserRaw,
): Promise<any> => {
  return $fetch("/api/airwallex/create", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: client,
  });
};

export const doBillingComplete = async (
  checkoutId: string,
  clientId: string,
): Promise<any> => {
  return await $fetch("/api/airwallex/subcription/confirm", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: { checkoutId, clientId },
  });
};

export const doCancelSubscription = async (phone: string): Promise<any> => {
  return await $fetch("/api/airwallex/subcription/cancel", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: { phone },
  });
};
