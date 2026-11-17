import crypto from "node:crypto";
import { airwallexFetch } from "./airwallex";
import * as type from "./airwallex.types";

const doAirwallaxDTO = (raw: type.UserRaw): type.AirwallaxUserPayload => {
  return {
    request_id: crypto.randomUUID(),
    merchant_customer_id: crypto.randomUUID(),
    first_name: raw.name,
    last_name: raw.surname,
    phone_number: raw.phone,
    email: raw.email,
  };
};

export const doClientCreate = async (
  user: type.UserRaw,
): Promise<type.AirwallaxUserCreated> => {
  const createdClient = await airwallexFetch<type.AirwallaxUserCreated>(
    `/api/v1/pa/customers/create`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: doAirwallaxDTO(user),
    },
  );

  return createdClient;
};

export const doFetchPrices = async (): Promise<Prices> => {
  const airwallexPriceList = await airwallexFetch<Prices>(
    "/api/v1/billing/prices",
    {
      method: "GET",
    },
  );

  return airwallexPriceList;
};

const doCreateBillingCustomerDTO = (
  userRaw: type.UserRaw,
  currency: string = "EUR",
  coutryCode: string = "PL",
): BillingCustomerPayload => {
  return {
    description: "Premium subscriber",
    request_id: crypto.randomUUID(),
    name: `${userRaw.name} ${userRaw.surname}`,
    phone_number: userRaw.phone,
    email: userRaw.email,
    default_billing_currency: currency,
    address: {
      city: userRaw.city,
      country_code: coutryCode,
    },
    type: "INDIVIDUAL",
  };
};

export const doCreateBillingCustomer = async (
  payload: type.UserRaw,
): Promise<Root> => {
  return await airwallexFetch<Root>(
    "/api/v1/billing/billing_customers/create",
    {
      method: "POST",
      body: doCreateBillingCustomerDTO(payload),
      headers: {
        "content-type": "application/json",
      },
    },
  );
};

const createSubscriptionDTO = (
  customer: type.Subscription["billing_customer_id"],
  priceId: type.Subscription["items"][0]["price_id"],
  currency: type.Subscription["currency"] = "EUR",
  quantity: number = 1,
  periodUnit: type.Subscription["duration"]["period_unit"] = "WEEK",
  period: type.Subscription["duration"]["period"] = 20,
): type.Subscription => {
  return {
    request_id: crypto.randomUUID(),
    duration: {
      period_unit: periodUnit,
      period: period,
    },
    billing_customer_id: customer,
    currency: currency,
    success_url: "",
    fail_url: "",
    collection_method: "AUTO_CHARGE",
    items: [
      {
        price_id: "",
        quantity: quantity,
      },
    ],
  };
};

export const doCreateProduct = async (product: type.Product) => {
  return await airwallexFetch<type.CreatedProduct>(
    "/api/v1/billing/products/create",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: product,
    },
  );
};

export const doCreatePrice = async (productId: string) => {
  const payload: type.Price = {
    request_id: crypto.randomUUID(),
    product_id: productId,
    pricing_model: "FLAT",
    description: "Subscription for site services",
    billing_type: "IN_ADVANCE",
    active: true,
    flat_amount: 19.99,
    recurring: {
      period: 1,
      period_unit: "WEEK",
    },
    currency: "EUR",
  };
  return await airwallexFetch("/api/v1/billing/prices/create", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: payload,
  });
};

export const doCreateBillingCheckout = async (
  billingCustomerId: type.BillingCheckoutPayload["billing_customer_id"],
  priceId: type.BillingCheckoutPayload["line_items"][0]["price_id"],
  legal_entity_id: type.BillingCheckoutPayload["legal_entity_id"],
) => {
  const config = useRuntimeConfig();
  const payload: type.BillingCheckoutPayload = {
    request_id: crypto.randomUUID(),
    currency: "EUR",
    billing_customer_id: billingCustomerId,
    ui_mode: "ELEMENTS",
    mode: "SUBSCRIPTION",
    success_url: null,
    fail_url: null,
    // linked_payment_account_id: config.airwallaxAcc,
    // legal_entity_id: legal_entity_id,
    line_items: [
      {
        price_id: priceId,
        quantity: 1,
      },
    ],
    subscription_data: {
      days_until_due: 0,
      duration: {
        period: 52,
        period_unit: "WEEK", // Безстрокова підписка (списання раз на тиждень визначає сам price_id)
      },
    },

    payment_options: {
      payment_method_save: null,
      payment_method_types: ["card"],
    },
    //@ts-ignore
    customer_data_collection: {
      billing_address: "AUTO",
      tax_id: "DISABLED",
    },
    enable_automatic_tax: false,

    return_url: "http://localhost:3000/register",
  };

  return await airwallexFetch<type.BillingCheckoutCustomer>(
    "/api/v1/billing/billing_checkouts/create",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: payload,
    },
  );
};

export const doCreateSubscription = async (
  customer: type.Subscription["billing_customer_id"],
  price: type.Subscription["items"][0]["price_id"],
): Promise<any> => {
  return await airwallexFetch<any>("/api/v1/billing/subscriptions/create", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: doCreateSubscription(customer, price),
  });
};

export const doCancelSubscription = async (
  subscriptionId: string,
): Promise<any> => {
  const payload = {
    proration_behavior: "NONE",
    request_id: crypto.randomUUID(),
  };
  return await airwallexFetch<any>(
    `/api/v1/billing/subscriptions/${subscriptionId}/cancel`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: payload,
    },
  );
};

export const getBillingCheckout = async (checkoutId: string) => {
  try {
    const checkoutInfo = await airwallexFetch<type.BillingInfo>(
      `/api/v1/billing/billing_checkouts/${checkoutId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      },
    );

    return checkoutInfo;
  } catch {
    return null;
  }
};
