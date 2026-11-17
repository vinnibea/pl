export interface Prices {
  items: Item[];
  page_after: string;
  page_before: string;
}

export interface Item {
  active: boolean;
  billing_type: string;
  created_at: string;
  currency: string;
  description: string;
  id: string;
  lot: Lot;
  metadata: Metadata;
  metered: boolean;
  pricing_model: string;
  product_id: string;
  recurring: Recurring;
  tax_included: boolean;
  tiers: Tier[];
  type: string;
  updated_at: string;
}

export interface Lot {
  rounding_mode: string;
  size: number;
}

export interface Metadata {
  foo: string;
}

export interface Recurring {
  period: number;
  period_unit: string;
}

export interface Tier {
  level: number;
  unit_amount?: number;
  upper_bound?: number;
  flat_amount?: number;
}

export interface BillingCustomerPayload {
  address: Address;
  // 'EUR'
  default_billing_currency: string;
  description?: string;
  email: string;
  metadata?: Metadata;
  name: string;
  nickname?: string;
  tax_identification_number?: string;
  phone_number: string;
  //crypto.randomUUID()
  request_id: string;
  type: 'INDIVIDUAL' | 'COMPANY';
}

export interface Address {
  city: string;
  country_code: string;
  postcode?: string;
  state?: string;
  street?: string;
}

export interface Metadata {
  customer_segment: string;
}

export type AirwallaxUserPayload = {
  //uuid generated
  request_id: string;
  //uuid generated
  merchant_customer_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | number;
};

export type AirwallaxUserCreated = {
  id: string;
  request_id: string;
  merchant_customer_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  client_secret: string;
  created_at: string;
  updated_at: string;
};

export type UserRaw = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  city: string;
};

export interface Root extends BillingCustomerPayload {
  automatic_tax_eligibility: string
  default_billing_currency: string
  default_legal_entity_id: string
  description: string
  id: string
  updated_at: string
}

export interface Subscription {
  //crypto
  request_id: string
  billing_customer_id: string
  collection_method: 'AUTO_CHARGE'
  currency: 'EUR' | 'USD'
  duration: Duration
  items: SubscriptionItem[]
  success_url: string
  fail_url: string
}

export interface Duration {
  period: number
  period_unit: 'WEEK' | 'MONTH'
}

export interface SubscriptionItem {
  //price_id from env or generate
  price_id: string
  quantity: number
}

export interface Product {
  active: boolean
  name: string
  description: string
  request_id: string
  unit: string
}

export interface CreatedProduct {
  active: boolean
  created_at: string
  description: string
  id: string
  metadata: Metadata
  name: string
  tax_code: string
  unit: string
  updated_at: string
}

export interface ProductMetadata {
  foo: string
}

export interface Price {
  active: boolean
  billing_type: 'IN_ADVANCE'
  //confit
  flat_amount: number
  currency: 'EUR' | 'USD'
  pricing_model: 'FLAT' | 'VOLUME'
  recurring: Period
  description: string
  product_id: string
  //crypto
  request_id: string
}

export interface Period {
  period: number,
  period_unit: 'WEEK' | 'MONTH'
}

type BillingPayloadSubscriptionData = {
   subscription_data: {
      days_until_due: number,
      duration: {
        period: number,
        period_unit: "WEEK" | "MONTH" | 'YEAR', // Безстрокова підписка (списання раз на тиждень визначає сам price_id)
      },
    }
}

type BillingCheckoutPayloadPaymentOptions =  {
  payment_options: {
  payment_method_types: ['card'],

  payment_method_save: {
    mode: 'ENABLED',
    next_triggered_by: 'MERCHANT',
  } | null,
}
}
export type BillingCheckoutPayload  = BillingCheckoutPayloadPaymentOptions & BillingPayloadSubscriptionData & {
    //crypto
    request_id: string,
    mode: 'SUBSCRIPTION',
    ui_mode: 'ELEMENTS',
    currency: 'EUR' | 'USD'
    //env
    legal_entity_id?: string,
    //env
    linked_payment_account_id?: string,
    //db or newly created
    billing_customer_id: string,
    line_items: {
      //one of created or from config
      price_id: string
      quantity: number
    }[],
    success_url?: string | null,
    fail_url?: string | null
    return_url: string
}

export type BillingCheckoutCustomer = {
  client_secret: string,
  billing_customer_id: string,
  id: string,
}


export interface BillingInfo {
  automatic_tax_status: string
  billing_customer: BillingCustomer
  billing_customer_id: string
  client_secret: string
  completed_at: string
  created_at: string
  currency: string
  customer_data_collection: CustomerDataCollection
  discounts: any[]
  enable_automatic_tax: boolean
  expires_at: string
  id: string
  legal_entity_id: string
  line_items: LineItem[]
  linked_payment_account_id: string
  mode: string
  payment_options: PaymentOptions
  payment_source_id: string
  return_url: string
  status: string
  subscription_data: SubscriptionData
  subscription_id: string
  ui_mode: string
  updated_at: string
}

export interface BillingCustomer {
  address: Address
  email: string
  name: string
  phone_number: string
  type: string
}

export interface Address {
  city: string
  country_code: string
}

export interface CustomerDataCollection {
  billing_address: string
  tax_id: string
}

export interface LineItem {
  discounts: any[]
  price_id: string
  quantity: number
}

export interface PaymentOptions {
  payment_method_types: string[]
}

export interface SubscriptionData {
  days_until_due: number
  default_tax_percent: number
  duration: Duration
  recurring: Recurring
}

export interface Recurring {
  period: number
  period_unit: string
}
