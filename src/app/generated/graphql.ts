import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** A DateTime representation in ISO format */
  DateTime: any,
  Upload: any,
};




export enum Account_Type {
  Income = 'Income',
  Cogs = 'COGS',
  Inventory = 'Inventory'
}

export type AccountSetting = {
   __typename?: 'AccountSetting',
  supplier_payable?: Maybe<ChartOfAccount>,
  customer_receivable?: Maybe<ChartOfAccount>,
  cash_book?: Maybe<ChartOfAccount>,
  bank_book?: Maybe<ChartOfAccount>,
  sales_tax?: Maybe<ChartOfAccount>,
  income_account?: Maybe<ChartOfAccount>,
};

export type AccountSettingInput = {
  supplier_payable?: Maybe<Scalars['ID']>,
  customer_receivable?: Maybe<Scalars['ID']>,
  cash_book?: Maybe<Scalars['ID']>,
  bank_book?: Maybe<Scalars['ID']>,
  sales_tax?: Maybe<Scalars['ID']>,
  income_account?: Maybe<Scalars['ID']>,
};

export type AccountType = {
   __typename?: 'AccountType',
  _id: Scalars['ID'],
  title: Scalars['String'],
  balance_type: BalanceType,
  parent_account_type_id?: Maybe<AccountType>,
  order?: Maybe<Scalars['Int']>,
};

export type AccountTypeInput = {
  title: Scalars['String'],
  balance_type: BalanceType,
  parent_account_type_id?: Maybe<Scalars['ID']>,
  order?: Maybe<Scalars['Int']>,
};

export type Alerts = {
   __typename?: 'Alerts',
  _id?: Maybe<Scalars['ID']>,
  alert_title?: Maybe<Scalars['String']>,
  alert_message?: Maybe<Scalars['String']>,
  alert_type?: Maybe<AlertTypeEnum>,
  alert_timer?: Maybe<Scalars['String']>,
  created_at?: Maybe<Scalars['DateTime']>,
};

export enum AlertTypeEnum {
  PurchaseAlert = 'purchase_alert',
  CustomerAlert = 'customer_alert'
}

export enum AllowedMethod {
  Cash = 'cash',
  Card = 'card',
  Cheque = 'cheque',
  BankTransfer = 'bank_transfer',
  StoreCredit = 'store_credit',
  DiscountCard = 'discount_card',
  NetTerm = 'net_term',
  GiftCard = 'gift_card',
  Stripe = 'stripe',
  PaypalInvoice = 'paypal_invoice',
  PaypalTransactionId = 'paypal_transaction_id'
}

export enum AllowedModel {
  Device = 'device'
}

export enum AllowedOrderstStatus {
  Draft = 'Draft',
  Placed = 'Placed',
  Pending = 'Pending',
  Receieved = 'Receieved'
}

export enum AllowedOrdertStatus {
  Ordered = 'ordered',
  Received = 'received',
  Delivery = 'delivery',
  Draft = 'draft'
}

export enum AllowedPaymentMethod {
  Cash = 'cash',
  Card = 'card',
  Cheque = 'cheque',
  BankTransfer = 'bank_transfer',
  StoreCredit = 'store_credit',
  DiscountCard = 'discount_card',
  NetTerm = 'net_term',
  GiftCard = 'gift_card',
  Stripe = 'stripe',
  PaypalInvoice = 'paypal_invoice',
  PaypalTransactionId = 'paypal_transaction_id'
}

export enum AllowedPurchaseOrderPaymentMethod {
  Cash = 'cash',
  CreditCard = 'credit_card',
  Cheque = 'cheque',
  PaypalInvoice = 'paypal_invoice',
  Paypal = 'paypal',
  Discount = 'discount',
  StoreCredit = 'store_credit',
  NetTerm = 'net_term',
  BankTransfer = 'bank_transfer'
}

export enum AllowedTransactionPaymentStatus {
  Paid = 'paid',
  Due = 'due',
  Partial = 'partial',
  None = 'none'
}

export enum AllowedTransactionStatus {
  Minimize = 'minimize',
  Order = 'order',
  Invoice = 'invoice',
  Quote = 'quote',
  Draft = 'draft'
}

export enum AllowedTransactionType {
  Sell = 'sell',
  Purchase = 'purchase',
  Rma = 'rma',
  Buyback = 'buyback'
}

export enum AllowedType {
  Client = 'client',
  Document = 'document',
  PurchaseOrder = 'purchase_order',
  RepairRoom = 'repair_room'
}

export enum AllowMethodPhoneVerify {
  Sms = 'sms',
  Call = 'call',
  Email = 'email'
}

export enum AllowStoreType {
  IndependentRepairStore = 'independent_repair_store',
  Franchise = 'franchise',
  FranchiseOem = 'franchise_OEM'
}

export enum AllSearchApplication {
  Mac = 'Mac',
  Windows = 'Windows',
  Ios = 'IOS',
  Android = 'Android',
  Linux = 'Linux',
  All = 'All'
}

export type AlreadyExistCustomer = {
   __typename?: 'alreadyExistCustomer',
  email?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['Boolean']>,
};

export type ApiKey = {
   __typename?: 'APIKey',
  key: Scalars['String'],
};

export enum ArrivalsFilter {
  Today = 'today',
  Tomorrow = 'tomorrow',
  ArrivalOnTime = 'arrival_on_time',
  ArrivalLate = 'arrival_late'
}

export type AssignDeviceProductInput = {
  product_type?: Maybe<InputProductType>,
  sell_line_product_type?: Maybe<SellLineProductType>,
  Product?: Maybe<Scalars['ID']>,
  product_sku?: Maybe<Scalars['String']>,
  supplier_sku?: Maybe<Scalars['String']>,
  quantity?: Maybe<Scalars['Int']>,
  product_purchase_price?: Maybe<Scalars['Float']>,
  product_sale_price?: Maybe<Scalars['Float']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  sub_total_amount?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  CustomProduct?: Maybe<CustomProductInput>,
  serial_number?: Maybe<Scalars['String']>,
  giftCard?: Maybe<GiftCardInput>,
  is_device?: Maybe<Scalars['Boolean']>,
  Supplier?: Maybe<Scalars['ID']>,
  serviceProduct?: Maybe<Array<Maybe<ServiceProductInput>>>,
  serviceBrand?: Maybe<Scalars['ID']>,
  serviceDeviceModel?: Maybe<Scalars['ID']>,
};

export type AssignedProducts = {
   __typename?: 'assignedProducts',
  _id?: Maybe<Scalars['ID']>,
  product_type?: Maybe<Scalars['String']>,
  sell_line_product_type?: Maybe<Scalars['String']>,
  Product?: Maybe<Product>,
  product_sku?: Maybe<Scalars['String']>,
  supplier_sku?: Maybe<Scalars['String']>,
  customProduct?: Maybe<CustomProduct>,
  quantity?: Maybe<Scalars['Int']>,
  product_purchase_price?: Maybe<Scalars['Float']>,
  product_sale_price?: Maybe<Scalars['Float']>,
  Tax?: Maybe<Tax>,
  tax_amount?: Maybe<Scalars['Float']>,
  tax_value?: Maybe<Scalars['Float']>,
  is_tax_percentage?: Maybe<Scalars['Boolean']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  sub_total_amount?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  serial_number?: Maybe<Scalars['String']>,
  return_quantity?: Maybe<Scalars['Int']>,
  back_to_stock?: Maybe<Scalars['Int']>,
  reason?: Maybe<Scalars['String']>,
  is_refund_item?: Maybe<Scalars['Boolean']>,
  repair_room_item_type?: Maybe<Scalars['String']>,
  serviceProduct?: Maybe<Array<Maybe<ServiceProducts>>>,
  ServiceBrand?: Maybe<SystemBrand>,
  ServiceDeviceModel?: Maybe<DeviceModel>,
};

export enum AssignRmaStatus {
  Cancel = 'cancel',
  Delievery = 'delievery',
  OnTransit = 'on_transit',
  Deleted = 'deleted'
}

export type AttachProduct = {
   __typename?: 'attachProduct',
  product_type?: Maybe<Scalars['String']>,
  sell_line_product_type?: Maybe<Scalars['String']>,
  _id?: Maybe<Scalars['ID']>,
  product_name?: Maybe<Scalars['String']>,
  is_bundle_product?: Maybe<Scalars['Boolean']>,
  bundle_products?: Maybe<BundleProductInfo>,
  is_product?: Maybe<Scalars['Boolean']>,
  is_track_stock?: Maybe<Scalars['Boolean']>,
  alert_qty?: Maybe<Scalars['Int']>,
  ideal_qty?: Maybe<Scalars['Int']>,
  sell_price?: Maybe<Scalars['Float']>,
  sell_price_inc_tax?: Maybe<Scalars['Float']>,
  average_cost?: Maybe<Scalars['Float']>,
  last_cost?: Maybe<Scalars['Float']>,
  Brand?: Maybe<SystemBrand>,
  DeviceModel?: Maybe<DeviceModel>,
  sku?: Maybe<Scalars['String']>,
  compatilable_devices?: Maybe<Array<Maybe<Scalars['String']>>>,
  Suppliers?: Maybe<Array<Maybe<SupplierCartInfo>>>,
  is_serial_number?: Maybe<Scalars['Boolean']>,
  ProductStockPrice?: Maybe<Array<Maybe<ProductPrices>>>,
  total_quantity?: Maybe<Scalars['Int']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  sell_line_serial_number?: Maybe<Scalars['String']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  product_sale_price?: Maybe<Scalars['Float']>,
  CustomProduct?: Maybe<CustomProduct>,
  quantity?: Maybe<Scalars['Int']>,
  serviceProduct?: Maybe<Array<Maybe<ServiceProducts>>>,
  ServiceBrand?: Maybe<SystemBrand>,
  ServiceDeviceModel?: Maybe<DeviceModel>,
};

export type AuthData = {
   __typename?: 'AuthData',
  user?: Maybe<User>,
  token: Scalars['String'],
  tokenExpiration: Scalars['String'],
};

export enum BalanceType {
  CreditDebit = 'Credit_Debit',
  DebitCredit = 'Debit_Credit'
}

export type BrainTreePayment = {
   __typename?: 'BrainTreePayment',
  id?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  currencyIsoCode?: Maybe<Scalars['String']>,
  amount?: Maybe<Scalars['String']>,
  merchantAccountId?: Maybe<Scalars['String']>,
};

export type BrainTreeToken = {
   __typename?: 'BrainTreeToken',
  token?: Maybe<Scalars['String']>,
};

export type Brand = {
   __typename?: 'Brand',
  _id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  brand_type?: Maybe<Scalars['String']>,
  BusinessLocation?: Maybe<BusinessLocation>,
  Business?: Maybe<Business>,
};

export type BrandInput = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  BusinessLocation: Scalars['ID'],
  brand_type?: Maybe<BrandType>,
};

export enum BrandType {
  Device = 'device',
  Product = 'product'
}

export type BundleInput = {
  product_id: Scalars['ID'],
  in_stock?: Maybe<Scalars['Float']>,
  unit_cost: Scalars['Float'],
  order_qty: Scalars['Int'],
  total: Scalars['Float'],
};

export type BundleProduct = {
   __typename?: 'bundleProduct',
  bundleProductID?: Maybe<Product>,
  avg_cost?: Maybe<Scalars['Float']>,
  quantity?: Maybe<Scalars['Int']>,
  selling_price?: Maybe<Scalars['Float']>,
};

export type BundleProductInfo = {
   __typename?: 'bundleProductInfo',
  total_selling_price?: Maybe<Scalars['Float']>,
  total_avg_cost?: Maybe<Scalars['Float']>,
  is_manufactured_qty?: Maybe<Scalars['Boolean']>,
  bundleProduct?: Maybe<Array<Maybe<BundleProduct>>>,
};

export type BundleProductInfoInput = {
  bundleProductID?: Maybe<Scalars['ID']>,
  avg_cost?: Maybe<Scalars['Float']>,
  quantity?: Maybe<Scalars['Int']>,
  selling_price?: Maybe<Scalars['Float']>,
};

export type BusinesInput = {
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  password: Scalars['String'],
  confirm_password: Scalars['String'],
  phone: Scalars['String'],
  email: Scalars['String'],
  date_format?: Maybe<Scalars['String']>,
  business_system_name: Scalars['String'],
  logo?: Maybe<Scalars['String']>,
  fy_end_month: Scalars['String'],
  accounting_method: Scalars['String'],
  stores?: Maybe<Array<Maybe<Store>>>,
};

export type Business = {
   __typename?: 'Business',
  _id?: Maybe<Scalars['String']>,
  business_keeping_unit?: Maybe<Scalars['String']>,
  business_system_name?: Maybe<Scalars['String']>,
  fy_end_month?: Maybe<Scalars['String']>,
  accounting_method?: Maybe<Scalars['String']>,
  logo?: Maybe<Scalars['String']>,
  location_id?: Maybe<Array<Maybe<BusinessLocation>>>,
  owner_id?: Maybe<User>,
  status?: Maybe<Scalars['String']>,
  created_at?: Maybe<Scalars['DateTime']>,
  unique_code?: Maybe<Scalars['String']>,
  store_type?: Maybe<Scalars['String']>,
  Country?: Maybe<Country>,
  number_of_stores?: Maybe<Scalars['String']>,
  currency_id?: Maybe<Scalars['String']>,
  store_types?: Maybe<StoreTypes>,
  date_format?: Maybe<Scalars['String']>,
  company_id?: Maybe<Company>,
};

export type BusinessInput = {
  fy_end_month: Scalars['String'],
  accounting_method: Scalars['String'],
  business_system_name: Scalars['String'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
  date_format?: Maybe<Scalars['String']>,
};

export type BusinessLocation = {
   __typename?: 'BusinessLocation',
  _id?: Maybe<Scalars['ID']>,
  store_name?: Maybe<Scalars['String']>,
  store_nick_name?: Maybe<Scalars['String']>,
  location_keeping_unit?: Maybe<Scalars['String']>,
  address_1?: Maybe<Scalars['String']>,
  address_2?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  zip_code?: Maybe<Scalars['String']>,
  Country?: Maybe<Country>,
  sales_tax?: Maybe<Scalars['Float']>,
  email?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  store_type?: Maybe<Scalars['String']>,
  store_legal_name?: Maybe<Scalars['String']>,
  identification_type?: Maybe<Scalars['String']>,
  identification_number?: Maybe<Scalars['String']>,
  provider_name?: Maybe<Scalars['String']>,
  business_id?: Maybe<Business>,
  ein_ssn?: Maybe<Scalars['String']>,
  logo?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  created_at?: Maybe<Scalars['DateTime']>,
  account_setting?: Maybe<AccountSetting>,
};

export type BusinessLocationInput = {
  store_name: Scalars['String'],
  store_legal_name: Scalars['String'],
  ein_ssn: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
  sales_tax: Scalars['String'],
  address_1: Scalars['String'],
  address_2: Scalars['String'],
  state: Scalars['String'],
  city: Scalars['String'],
  zip_code: Scalars['String'],
  logo?: Maybe<Scalars['String']>,
  account_setting?: Maybe<AccountSettingInput>,
};

export enum BusinessStatus {
  Active = 'active',
  Inactive = 'inactive'
}

export type Campaign = {
   __typename?: 'Campaign',
  _id: Scalars['ID'],
  name: Scalars['String'],
  start_date?: Maybe<Scalars['DateTime']>,
  end_date?: Maybe<Scalars['DateTime']>,
  is_active?: Maybe<Scalars['Boolean']>,
  BusinessLocation?: Maybe<BusinessLocation>,
  Business?: Maybe<Business>,
  Discount?: Maybe<Array<Maybe<Discount>>>,
  created_at?: Maybe<Scalars['DateTime']>,
  updated_at?: Maybe<Scalars['DateTime']>,
};

export type CampaignInput = {
  name: Scalars['String'],
  start_date?: Maybe<Scalars['DateTime']>,
  end_date?: Maybe<Scalars['DateTime']>,
  is_active?: Maybe<Scalars['Boolean']>,
  BusinessLocation: Scalars['ID'],
};

export enum CanRestore {
  Yes = 'yes',
  No = 'no',
  Probably = 'probably'
}

export type Card_Mete = {
   __typename?: 'card_mete',
  card_transaction_number?: Maybe<Scalars['String']>,
  card_number?: Maybe<Scalars['String']>,
  card_type?: Maybe<Scalars['String']>,
  card_holder_name?: Maybe<Scalars['String']>,
  card_month?: Maybe<Scalars['String']>,
  card_year?: Maybe<Scalars['String']>,
  card_security?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  merchantAccountId?: Maybe<Scalars['String']>,
  currencyIsoCode?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
};

export type CartTransaction = {
   __typename?: 'CartTransaction',
  _id?: Maybe<Scalars['ID']>,
  transaction_type?: Maybe<Scalars['String']>,
  transaction_status?: Maybe<Scalars['String']>,
  order_status?: Maybe<Scalars['String']>,
  dynamic_status?: Maybe<TPstatus>,
  transaction_payment_status?: Maybe<Scalars['String']>,
  transaction_keeping_unit?: Maybe<Scalars['String']>,
  transaction_date?: Maybe<Scalars['DateTime']>,
  sub_total_amount?: Maybe<Scalars['Float']>,
  Tax?: Maybe<Tax>,
  tax_amount?: Maybe<Scalars['Float']>,
  tax_value?: Maybe<Scalars['Float']>,
  is_apply_sale_tax?: Maybe<Scalars['Boolean']>,
  is_tax_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  total_amount?: Maybe<Scalars['Float']>,
  remaining_amount?: Maybe<Scalars['Float']>,
  is_private?: Maybe<Scalars['Boolean']>,
  additional_notes?: Maybe<Scalars['String']>,
  TransactionCartLine?: Maybe<Array<Maybe<TransactionCartLine>>>,
  TransactionPayment?: Maybe<Array<Maybe<TransactionPayment>>>,
  Customer?: Maybe<Customer>,
  BusinessLocation?: Maybe<BusinessLocation>,
  Business?: Maybe<Business>,
  dynamic_status_list?: Maybe<Array<Maybe<TPstatus>>>,
  is_additional_cost?: Maybe<Scalars['Boolean']>,
  is_extra_items?: Maybe<Scalars['Boolean']>,
};

export type CashDemonination = {
   __typename?: 'CashDemonination',
  User?: Maybe<User>,
  CashRegisters?: Maybe<CashRegisters>,
  TillCountLogs?: Maybe<TillCount>,
  unit?: Maybe<Scalars['Float']>,
  qty?: Maybe<Scalars['Int']>,
  total_amount?: Maybe<Scalars['Float']>,
};

export type CashDemoninationInput = {
  qty?: Maybe<Scalars['Int']>,
  unit?: Maybe<Scalars['Float']>,
  total?: Maybe<Scalars['Float']>,
};

export type CashRegisterInput = {
  name?: Maybe<Scalars['String']>,
  status: CashRegisterStatus,
  opening_amount?: Maybe<Scalars['Float']>,
  closing_amount?: Maybe<Scalars['Float']>,
  closed_at?: Maybe<Scalars['String']>,
  location_id: Scalars['ID'],
};

export type CashRegisters = {
   __typename?: 'CashRegisters',
  _id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  cash_register_keeping_unit?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  opening_amount?: Maybe<Scalars['Float']>,
  closing_amount?: Maybe<Scalars['Float']>,
  closed_at?: Maybe<Scalars['DateTime']>,
  business_id?: Maybe<Scalars['ID']>,
  location_id?: Maybe<Scalars['ID']>,
};

export enum CashRegisterStatus {
  Open = 'open',
  Close = 'close'
}

export type ChartData = {
   __typename?: 'ChartData',
  labels?: Maybe<Array<Maybe<Scalars['String']>>>,
  values?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type ChartOfAccount = {
   __typename?: 'ChartOfAccount',
  _id?: Maybe<Scalars['ID']>,
  account_code?: Maybe<Scalars['String']>,
  account_name?: Maybe<Scalars['String']>,
  slug?: Maybe<Scalars['String']>,
  account_type_Id?: Maybe<AccountType>,
  parent_account_Id?: Maybe<ChartOfAccount>,
  Opening_balance?: Maybe<Scalars['Float']>,
  account_balance?: Maybe<Scalars['Float']>,
  description?: Maybe<Scalars['String']>,
  BusinessLocation?: Maybe<BusinessLocation>,
};

export type ChartOfAccountInput = {
  account_type_Id?: Maybe<Scalars['ID']>,
  parent_account_Id?: Maybe<Scalars['ID']>,
  account_code: Scalars['String'],
  account_name: Scalars['String'],
  Opening_balance?: Maybe<Scalars['Float']>,
  account_balance?: Maybe<Scalars['Float']>,
  BusinessLocation: Scalars['ID'],
  description?: Maybe<Scalars['String']>,
};

export type Cheque_Meta = {
   __typename?: 'cheque_meta',
  cheque_number?: Maybe<Scalars['String']>,
  bank_account_number?: Maybe<Scalars['String']>,
};

export type ChequePaymentVerifyInput = {
  transactionID: Scalars['ID'],
  location_id: Scalars['ID'],
  paymentID: Scalars['ID'],
  userEmail: Scalars['String'],
  userPassword: Scalars['String'],
};

export type ChildTax = {
   __typename?: 'ChildTax',
  _id: Scalars['ID'],
  child_tax_name?: Maybe<Scalars['String']>,
  child_tax_amount?: Maybe<Scalars['String']>,
  child_tax_is_percentage?: Maybe<Scalars['Boolean']>,
};

export type ChildTaxInput = {
  child_tax_name: Scalars['String'],
  child_tax_amount: Scalars['String'],
  child_tax_is_percentage: Scalars['Boolean'],
};

export type City = {
   __typename?: 'City',
  _id?: Maybe<Scalars['ID']>,
  city_name?: Maybe<Scalars['String']>,
  State?: Maybe<States>,
};

export type CityInput = {
  state_name: Scalars['String'],
  Country: Scalars['ID'],
};

export enum ClassificationType {
  Client = 'Client',
  AllClient = 'AllClient',
  Partner = 'Partner'
}

export type Client = {
   __typename?: 'Client',
  _id?: Maybe<Scalars['ID']>,
  first_name?: Maybe<Scalars['String']>,
  last_name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  address_1?: Maybe<Scalars['String']>,
  address_2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  zip_code?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  can_email?: Maybe<Scalars['Boolean']>,
  can_sms?: Maybe<Scalars['Boolean']>,
  status?: Maybe<Scalars['String']>,
  classification?: Maybe<Scalars['String']>,
  BusinessLocation?: Maybe<BusinessLocation>,
  is_check?: Maybe<Scalars['Boolean']>,
};

export type ClientAlert = {
   __typename?: 'ClientAlert',
  _id?: Maybe<Scalars['ID']>,
  alert_title?: Maybe<Scalars['String']>,
  alarm_time?: Maybe<Scalars['DateTime']>,
  alarm_date?: Maybe<Scalars['DateTime']>,
  latitude?: Maybe<Scalars['String']>,
  longitude?: Maybe<Scalars['String']>,
  address?: Maybe<Scalars['String']>,
  Client?: Maybe<Client>,
  BusinessLocation?: Maybe<BusinessLocation>,
};

export type ClientAlertInput = {
  alert_title: Scalars['String'],
  alarm_time: Scalars['DateTime'],
  alarm_date: Scalars['DateTime'],
  latitude?: Maybe<Scalars['String']>,
  longitude?: Maybe<Scalars['String']>,
  address?: Maybe<Scalars['String']>,
  Client: Scalars['ID'],
  BusinessLocation?: Maybe<Scalars['ID']>,
};

export type ClientDocument = {
   __typename?: 'ClientDocument',
  document_id?: Maybe<Scalars['ID']>,
  document_name?: Maybe<Scalars['String']>,
  file_path?: Maybe<Scalars['String']>,
  document_status?: Maybe<LabelStatus>,
};

export type ClientInput = {
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  email: Scalars['String'],
  address_1: Scalars['String'],
  address_2: Scalars['String'],
  city: Scalars['String'],
  state: Scalars['String'],
  zip_code: Scalars['String'],
  phone: Scalars['String'],
  can_email: Scalars['Boolean'],
  can_sms: Scalars['Boolean'],
  status: ClientStatusType,
  classification: ClassificationType,
  BusinessLocation?: Maybe<Scalars['String']>,
  is_check?: Maybe<Scalars['Boolean']>,
};

export type ClientNote = {
   __typename?: 'ClientNote',
  _id?: Maybe<Scalars['ID']>,
  note_title?: Maybe<Scalars['String']>,
  note_description?: Maybe<Scalars['String']>,
  Client?: Maybe<Client>,
  created_at?: Maybe<Scalars['DateTime']>,
  BusinessLocation?: Maybe<BusinessLocation>,
};

export type ClientNoteInput = {
  note_title: Scalars['String'],
  note_description: Scalars['String'],
  Client: Scalars['ID'],
  BusinessLocation?: Maybe<Scalars['String']>,
};

export type ClientSearchInput = {
  search?: Maybe<Scalars['String']>,
  sortTypeName?: Maybe<Scalars['String']>,
};

export enum ClientStatusType {
  Active = 'Active',
  Inactive = 'Inactive',
  Medium = 'Medium'
}

export type ClockedHistory = {
   __typename?: 'ClockedHistory',
  _id: Scalars['ID'],
  User: User,
  clock_in_time: Scalars['DateTime'],
  clock_out_time?: Maybe<Scalars['DateTime']>,
  status: Scalars['String'],
  BusinessLocation: Scalars['ID'],
};

export type Company = {
   __typename?: 'Company',
  _id?: Maybe<Scalars['ID']>,
  company_name?: Maybe<Scalars['String']>,
  company_contact_Number?: Maybe<Scalars['String']>,
  company_address?: Maybe<Scalars['String']>,
  company_city?: Maybe<Scalars['String']>,
  company_state?: Maybe<Scalars['String']>,
  company_country?: Maybe<Scalars['String']>,
  company_zipcode?: Maybe<Scalars['String']>,
};

export type CompanyBusinessInput = {
  unique_code: Scalars['String'],
  business_system_name: Scalars['String'],
  store_type: Scalars['String'],
  Country: Scalars['ID'],
  number_of_stores?: Maybe<Scalars['String']>,
  fy_end_month: Scalars['String'],
  accounting_method: Scalars['String'],
  currency_id?: Maybe<Scalars['ID']>,
  date_format?: Maybe<Scalars['String']>,
  company_id: Scalars['String'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
  password: Scalars['String'],
};

export type CompanyBusinessUpdateInput = {
  business_system_name: Scalars['String'],
  store_type: Scalars['String'],
  Country: Scalars['ID'],
  fy_end_month: Scalars['String'],
  accounting_method: Scalars['String'],
  currency_id?: Maybe<Scalars['ID']>,
  date_format?: Maybe<Scalars['String']>,
  company_id: Scalars['String'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
};

export type CompanyInput = {
  company_name: Scalars['String'],
  company_contact_Number?: Maybe<Scalars['String']>,
  company_address?: Maybe<Scalars['String']>,
  company_city?: Maybe<Scalars['String']>,
  company_state?: Maybe<Scalars['String']>,
  company_country?: Maybe<Scalars['String']>,
  company_zipcode?: Maybe<Scalars['String']>,
  company_useremail: Scalars['String'],
  company_password: Scalars['String'],
};

export type CompanyUpdateInput = {
  company_name: Scalars['String'],
  company_contact_Number?: Maybe<Scalars['String']>,
  company_address?: Maybe<Scalars['String']>,
  company_city?: Maybe<Scalars['String']>,
  company_state?: Maybe<Scalars['String']>,
  company_country?: Maybe<Scalars['String']>,
  company_zipcode?: Maybe<Scalars['String']>,
};

export type Country = {
   __typename?: 'Country',
  _id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  short_name?: Maybe<Scalars['String']>,
  is_active?: Maybe<Scalars['Boolean']>,
  identification_types?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type CountryInput = {
  name: Scalars['String'],
  short_name?: Maybe<Scalars['String']>,
};

export type Coupon_Meta = {
   __typename?: 'coupon_meta',
  coupon_code?: Maybe<Scalars['String']>,
  coupon_amount?: Maybe<Scalars['Float']>,
  coupon_is_percentage?: Maybe<Scalars['Boolean']>,
  coupon_id?: Maybe<Scalars['ID']>,
};

export type CouponCode = {
   __typename?: 'couponCode',
  code: Scalars['String'],
};

export type CreateBuyBackInput = {
  transaction_type: AllowedTransactionType,
  transaction_status: AllowedTransactionStatus,
  order_status: AllowedOrdertStatus,
  transaction_date: Scalars['DateTime'],
  sub_total_amount: Scalars['Float'],
  Tax?: Maybe<Scalars['ID']>,
  tax_amount?: Maybe<Scalars['Float']>,
  tax_value?: Maybe<Scalars['Float']>,
  is_tax_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  ShippingType?: Maybe<Scalars['ID']>,
  shipping_amount?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  order_estimate_amount?: Maybe<Scalars['Float']>,
  Supplier?: Maybe<Scalars['ID']>,
  TransactionBuyBackLines?: Maybe<Array<Maybe<InputTransactionBuybackLine>>>,
  BusinessLocation?: Maybe<Scalars['ID']>,
};

export type CreatePincodeInput = {
  userID: Scalars['ID'],
  pincode?: Maybe<Scalars['Int']>,
  businessLocation: Scalars['ID'],
  method?: Maybe<AllowMethodPhoneVerify>,
  password?: Maybe<Scalars['String']>,
};

export type CreatePurchaseInvoiceInput = {
  TrnPurchaseOrder: Scalars['ID'],
  Supplier: Scalars['ID'],
  sub_total_amount: Scalars['Float'],
  tax_type?: Maybe<Scalars['String']>,
  tax_amount?: Maybe<Scalars['Float']>,
  discount_type?: Maybe<Scalars['String']>,
  discount_amount?: Maybe<Scalars['Float']>,
  additional_cost?: Maybe<Scalars['Float']>,
  total_amount: Scalars['Float'],
  notes?: Maybe<Scalars['String']>,
  transaction_type: AllowedTransactionType,
  transaction_status: AllowedTransactionStatus,
  transaction_payment_status: AllowedTransactionPaymentStatus,
  TransactionPurchasePayment?: Maybe<Array<Maybe<TransactionPurchasePaymentInput>>>,
  grand_total_amount: Scalars['Float'],
  PI_date: Scalars['DateTime'],
  BusinessLocation: Scalars['ID'],
  TrnPurchaseInvoiceLines?: Maybe<Array<InputTrnPurchaseInvoiceLine>>,
};

export type CreatePurchaseOrderInput = {
  transaction_type: AllowedTransactionType,
  transaction_status: AllowedTransactionStatus,
  order_status: AllowedOrdertStatus,
  transaction_date: Scalars['DateTime'],
  transaction_hours?: Maybe<Scalars['String']>,
  transaction_minutes?: Maybe<Scalars['String']>,
  transaction_am_pm?: Maybe<Scalars['String']>,
  arrival_Date?: Maybe<Scalars['DateTime']>,
  sub_total_amount: Scalars['Float'],
  Tax?: Maybe<Scalars['ID']>,
  tax_amount?: Maybe<Scalars['Float']>,
  tax_value?: Maybe<Scalars['Float']>,
  is_tax_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  ShippingType?: Maybe<Scalars['ID']>,
  shipping_amount?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  is_private?: Maybe<Scalars['Boolean']>,
  additional_notes?: Maybe<Scalars['String']>,
  Supplier?: Maybe<Scalars['ID']>,
  TransactionPurchaseLines?: Maybe<Array<Maybe<InputTransactionPurchaseLine>>>,
  BusinessLocation?: Maybe<Scalars['ID']>,
};

export type CreateRmaInput = {
  transaction_type: AllowedTransactionType,
  transaction_status: AllowedTransactionStatus,
  order_status: AllowedOrdertStatus,
  transaction_date?: Maybe<Scalars['DateTime']>,
  sub_total_amount: Scalars['Float'],
  total_amount?: Maybe<Scalars['Float']>,
  Supplier?: Maybe<Scalars['ID']>,
  TransactionRMA?: Maybe<Array<Maybe<TransactionRmaInput>>>,
  BusinessLocation?: Maybe<Scalars['ID']>,
};

export type CreateSaleInput = {
  transaction_type: AllowedTransactionType,
  transaction_status: AllowedTransactionStatus,
  transaction_date?: Maybe<Scalars['DateTime']>,
  sub_total_amount?: Maybe<Scalars['Float']>,
  Tax?: Maybe<Scalars['ID']>,
  tax_amount?: Maybe<Scalars['Float']>,
  tax_value?: Maybe<Scalars['Float']>,
  is_apply_sale_tax?: Maybe<Scalars['Boolean']>,
  is_tax_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  total_amount?: Maybe<Scalars['Float']>,
  is_private?: Maybe<Scalars['Boolean']>,
  additional_notes?: Maybe<Scalars['String']>,
  Customer: Scalars['ID'],
  BusinessLocation: Scalars['ID'],
  TransactionSellLines?: Maybe<Array<Maybe<InputTransactionSellLine>>>,
};

export type CreateTransactionPurchaseOrderInput = {
  Supplier: Scalars['ID'],
  sub_total_amount: Scalars['Float'],
  tax_type?: Maybe<Scalars['String']>,
  tax_amount?: Maybe<Scalars['Float']>,
  discount_type?: Maybe<Scalars['String']>,
  discount_amount?: Maybe<Scalars['Float']>,
  additional_cost?: Maybe<Scalars['Float']>,
  total_amount: Scalars['Float'],
  notes?: Maybe<Scalars['String']>,
  transaction_type: AllowedTransactionType,
  transaction_status: AllowedOrderstStatus,
  PO_date: Scalars['DateTime'],
  Expected_on: Scalars['DateTime'],
  BusinessLocation: Scalars['ID'],
  TransactionPurchaseOrderLines?: Maybe<Array<InputTransactionPurchaseOrderLine>>,
  transaction_payment_status: AllowedTransactionPaymentStatus,
  TransactionPurchasePayment?: Maybe<Array<Maybe<TransactionPurchasePaymentInput>>>,
};

export type CreditLine = {
   __typename?: 'creditLine',
  _id: Scalars['ID'],
  credit_line: Scalars['String'],
  Business: Business,
};

export type CreditLineInput = {
  credit_line: Scalars['String'],
};

export type Currency = {
   __typename?: 'Currency',
  _id?: Maybe<Scalars['String']>,
  country: Scalars['String'],
  currency: Scalars['String'],
  code: Scalars['String'],
  symbol?: Maybe<Scalars['String']>,
  thousand_separator: Scalars['String'],
  decimal_separator: Scalars['String'],
};

export type CurrencyUnit = {
   __typename?: 'currencyUnit',
  unit?: Maybe<Scalars['Float']>,
};

export type CurrencyWithUnit = {
   __typename?: 'CurrencyWithUnit',
  currency?: Maybe<Array<Maybe<CurrencyUnit>>>,
  currency_code?: Maybe<Scalars['String']>,
  expected_amount?: Maybe<Scalars['Float']>,
};

export type Customer = {
   __typename?: 'Customer',
  _id?: Maybe<Scalars['ID']>,
  email?: Maybe<Scalars['String']>,
  first_name?: Maybe<Scalars['String']>,
  last_name?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  address_1?: Maybe<Scalars['String']>,
  address_2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  zip_code?: Maybe<Scalars['String']>,
  can_email?: Maybe<Scalars['Boolean']>,
  is_net_term?: Maybe<Scalars['Boolean']>,
  is_store_credit?: Maybe<Scalars['Boolean']>,
  is_devices?: Maybe<Scalars['Boolean']>,
  can_sms?: Maybe<Scalars['Boolean']>,
  deleted_at?: Maybe<Scalars['String']>,
  marketing_question?: Maybe<Array<Maybe<Scalars['String']>>>,
  location_id?: Maybe<BusinessLocation>,
  customer_id?: Maybe<Customer>,
  tags?: Maybe<Array<Maybe<Scalars['String']>>>,
  is_over_due?: Maybe<Scalars['Boolean']>,
  is_linked?: Maybe<Scalars['Boolean']>,
  is_deleted?: Maybe<Scalars['Boolean']>,
  CustomerStoreWiseRecord?: Maybe<Array<Maybe<CustomerStoreWise>>>,
  linkedStores?: Maybe<Array<Maybe<BusinessLocation>>>,
};

export type CustomerAlertInput = {
  transactionID: Scalars['ID'],
  alert_timer: Scalars['String'],
  alert_title: Scalars['String'],
  alert_message: Scalars['String'],
  alert_type: AlertTypeEnum,
  location_id: Scalars['ID'],
};

export type CustomerDeleteType = {
   __typename?: 'CustomerDeleteType',
  _id?: Maybe<Scalars['ID']>,
  email?: Maybe<Scalars['String']>,
  first_name?: Maybe<Scalars['String']>,
  last_name?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  address_1?: Maybe<Scalars['String']>,
  address_2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  zip_code?: Maybe<Scalars['String']>,
  location_id?: Maybe<Scalars['ID']>,
  error?: Maybe<Scalars['String']>,
};

export type CustomerDocumentInput = {
  customer_document_name: Scalars['ID'],
  document_extension: Scalars['String'],
  customer_id: Scalars['ID'],
  location_id: Scalars['ID'],
};

export type CustomerDocumentType = {
   __typename?: 'CustomerDocumentType',
  _id?: Maybe<Scalars['ID']>,
  customer_document_name?: Maybe<Scalars['String']>,
  document_file_path?: Maybe<Scalars['String']>,
  document_extension?: Maybe<Scalars['String']>,
  Customer?: Maybe<Customer>,
  is_email?: Maybe<Scalars['Boolean']>,
  id_download?: Maybe<Scalars['Boolean']>,
  created_at?: Maybe<Scalars['DateTime']>,
};

export enum CustomerFooterFilter {
  All = 'all',
  OverDues = 'overDues',
  WithDevice = 'with_device',
  WithoutDevice = 'without_device',
  HaveStoreCredit = 'have_store_credit',
  HaveNetTerm = 'have_net_term',
  MostRecent = 'most_recent'
}

export enum CustomerHeaderFilter {
  OneMonth = 'one_month',
  DateRange = 'date_range',
  All = 'all'
}

export type CustomerImportInput = {
  email: Scalars['String'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  phone: Scalars['String'],
  address_1: Scalars['String'],
  address_2: Scalars['String'],
  city: Scalars['String'],
  state: Scalars['String'],
  zip_code: Scalars['String'],
  location_id: Scalars['ID'],
};

export type CustomerImportType = {
   __typename?: 'CustomerImportType',
  _id?: Maybe<Scalars['ID']>,
  email?: Maybe<Scalars['String']>,
  first_name?: Maybe<Scalars['String']>,
  last_name?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  address_1?: Maybe<Scalars['String']>,
  address_2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  zip_code?: Maybe<Scalars['String']>,
  location_id?: Maybe<Scalars['ID']>,
};

export type CustomerInput = {
  email?: Maybe<Scalars['String']>,
  first_name?: Maybe<Scalars['String']>,
  last_name?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  address_1?: Maybe<Scalars['String']>,
  address_2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  zip_code?: Maybe<Scalars['String']>,
  can_email?: Maybe<Scalars['Boolean']>,
  can_sms?: Maybe<Scalars['Boolean']>,
  marketing_question?: Maybe<Array<Maybe<Scalars['String']>>>,
  location_id: Scalars['ID'],
  Tags?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type CustomerNetTerm = {
   __typename?: 'CustomerNetTerm',
  pay_term_number: Scalars['Int'],
  pay_term_type: Scalars['String'],
  credit_limit: Scalars['Float'],
  interest_rate: Scalars['Float'],
  used_credit?: Maybe<Scalars['Float']>,
};

export type CustomerNetTermInput = {
  customerId: Scalars['ID'],
  is_increase: Scalars['Boolean'],
  credit_amount: Scalars['Float'],
  days: Scalars['Int'],
  date?: Maybe<Scalars['DateTime']>,
  interest_rate: Scalars['Float'],
  note: Scalars['String'],
  location_id: Scalars['ID'],
};

export type CustomerNetTermRecordType = {
   __typename?: 'CustomerNetTermRecordType',
  transactionID?: Maybe<Scalars['ID']>,
  date?: Maybe<Scalars['DateTime']>,
  day_left?: Maybe<Scalars['String']>,
  order_no?: Maybe<Scalars['String']>,
  total?: Maybe<Scalars['Float']>,
  amount_owed?: Maybe<Scalars['Float']>,
  amount_pay?: Maybe<Scalars['Float']>,
  balance?: Maybe<Scalars['Float']>,
  is_overdue?: Maybe<Scalars['Boolean']>,
  dynamic_status?: Maybe<TPstatus>,
};

export type CustomerPermanentDeleteType = {
   __typename?: 'CustomerPermanentDeleteType',
  deletedCustomers?: Maybe<Array<Maybe<CustomerDeleteType>>>,
  notDeletedCustomers?: Maybe<Array<Maybe<CustomerDeleteType>>>,
};

export type CustomerPurchaseHistoryType = {
   __typename?: 'CustomerPurchaseHistoryType',
  total_amount_spend?: Maybe<Scalars['Float']>,
  total_number_of_visits?: Maybe<Scalars['Float']>,
  average_purchase_per_visit?: Maybe<Scalars['Float']>,
  average_number_of_items_per_visit?: Maybe<Scalars['Float']>,
};

export type CustomerSearchListing = {
   __typename?: 'customerSearchListing',
  customers?: Maybe<Array<Maybe<Customer>>>,
  total_customer?: Maybe<Scalars['Int']>,
};

export type CustomerstoreCredit = {
   __typename?: 'CustomerstoreCredit',
  credit_amount: Scalars['Float'],
};

export type CustomerStoreCreditInput = {
  customerId: Scalars['ID'],
  amount: Scalars['Float'],
  reason: Scalars['String'],
  orderId: Scalars['String'],
  note: Scalars['String'],
  date?: Maybe<Scalars['DateTime']>,
  location_id: Scalars['ID'],
};

export type CustomerStoreWise = {
   __typename?: 'CustomerStoreWise',
  Customer?: Maybe<Customer>,
  net_term?: Maybe<CustomerNetTerm>,
  BusinessLocation?: Maybe<BusinessLocation>,
  store_credit?: Maybe<CustomerstoreCredit>,
  can_sms?: Maybe<Scalars['Boolean']>,
  can_email?: Maybe<Scalars['Boolean']>,
  is_active?: Maybe<Scalars['Boolean']>,
};

export type CustomerTransferStoreCreditInput = {
  toCustomerId: Scalars['ID'],
  fromCustomerId: Scalars['ID'],
  transferAmount: Scalars['Float'],
  note: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  location_id: Scalars['ID'],
  date?: Maybe<Scalars['DateTime']>,
};

export type CustomProduct = {
   __typename?: 'CustomProduct',
  _id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  quantity?: Maybe<Scalars['Int']>,
  cost_price?: Maybe<Scalars['Float']>,
  selling_price?: Maybe<Scalars['Float']>,
  selling_price_include_tax?: Maybe<Scalars['Float']>,
  note?: Maybe<Scalars['String']>,
  is_taxable?: Maybe<Scalars['Boolean']>,
  location_id: BusinessLocation,
};

export type CustomProductInput = {
  name?: Maybe<Scalars['String']>,
  quantity?: Maybe<Scalars['Int']>,
  cost_price?: Maybe<Scalars['Float']>,
  selling_price?: Maybe<Scalars['Float']>,
  selling_price_include_tax?: Maybe<Scalars['Float']>,
  note?: Maybe<Scalars['String']>,
  is_taxable?: Maybe<Scalars['Boolean']>,
  location_id?: Maybe<Scalars['ID']>,
};

export enum Datefilter {
  Today = 'today',
  Yesterday = 'yesterday',
  DateRange = 'dateRange',
  All = 'all'
}

export enum DateFilterEnum {
  Today = 'today',
  Yesterday = 'yesterday',
  None = 'none'
}


export type Device = {
   __typename?: 'Device',
  _id: Scalars['String'],
  deviceBrand?: Maybe<SystemBrand>,
  deviceModel?: Maybe<DeviceModel>,
  device_color?: Maybe<Scalars['String']>,
  imei_ssn?: Maybe<Scalars['String']>,
  Customer?: Maybe<Customer>,
  device_image?: Maybe<Scalars['String']>,
  device_keeping_unit?: Maybe<Scalars['String']>,
  business_id?: Maybe<Business>,
  location_id?: Maybe<BusinessLocation>,
};

export type DeviceCheckIns = {
   __typename?: 'DeviceCheckIns',
  _id?: Maybe<Scalars['ID']>,
  Device?: Maybe<Device>,
  client_name?: Maybe<Scalars['String']>,
  client_phone_number?: Maybe<Scalars['String']>,
  client_device_id?: Maybe<Scalars['String']>,
  check_in_date?: Maybe<Scalars['DateTime']>,
  carrier?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  device_issue?: Maybe<Scalars['String']>,
  step_to_reproduce?: Maybe<Scalars['String']>,
  cosmetic_condition?: Maybe<Scalars['String']>,
  device_canbe_tested?: Maybe<Scalars['Boolean']>,
  reason_for_canbe_tested?: Maybe<Scalars['String']>,
  device_previously_repaired?: Maybe<Scalars['Boolean']>,
  device_type_previous_repair?: Maybe<Scalars['String']>,
  place_repair_done?: Maybe<Scalars['String']>,
  is_water_damage?: Maybe<Scalars['Boolean']>,
  is_warranty?: Maybe<Scalars['Boolean']>,
  battery_life?: Maybe<Scalars['String']>,
  approved_to_device_restored?: Maybe<Scalars['String']>,
  note?: Maybe<Scalars['String']>,
  DeviceIssues?: Maybe<Array<Maybe<DeviceIssues>>>,
  DeviceItems?: Maybe<Array<Maybe<DeviceIssues>>>,
  Customer?: Maybe<Customer>,
  BusinessLocation?: Maybe<BusinessLocation>,
  Business?: Maybe<Business>,
  is_pattern?: Maybe<Scalars['Boolean']>,
  pattern_code?: Maybe<Scalars['String']>,
  SourceFile?: Maybe<Array<Maybe<SourceFile>>>,
};

export type DeviceCheckInsInput = {
  Device: Scalars['ID'],
  client_name: Scalars['String'],
  client_phone_number: Scalars['String'],
  client_device_id: Scalars['String'],
  check_in_date: Scalars['DateTime'],
  carrier?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  device_issue?: Maybe<Scalars['String']>,
  step_to_reproduce?: Maybe<Scalars['String']>,
  cosmetic_condition?: Maybe<Scalars['String']>,
  device_canbe_tested?: Maybe<Scalars['Boolean']>,
  reason_for_canbe_tested?: Maybe<Scalars['String']>,
  device_previously_repaired?: Maybe<Scalars['Boolean']>,
  device_type_previous_repair?: Maybe<Scalars['String']>,
  place_repair_done?: Maybe<Scalars['String']>,
  is_water_damage?: Maybe<Scalars['Boolean']>,
  is_warranty?: Maybe<Scalars['Boolean']>,
  battery_life?: Maybe<Scalars['String']>,
  approved_to_device_restored?: Maybe<CanRestore>,
  note?: Maybe<Scalars['String']>,
  DeviceIssues?: Maybe<Array<Scalars['ID']>>,
  otherDeviceIssues?: Maybe<Scalars['String']>,
  DeviceItems?: Maybe<Array<Maybe<Scalars['ID']>>>,
  otherDeviceItem?: Maybe<Scalars['String']>,
  Customer: Scalars['ID'],
  BusinessLocation: Scalars['ID'],
  is_pattern?: Maybe<Scalars['Boolean']>,
  pattern_code?: Maybe<Scalars['String']>,
};

export type DeviceDiagnose = {
   __typename?: 'DeviceDiagnose',
  _id?: Maybe<Scalars['ID']>,
  deviceID?: Maybe<Scalars['String']>,
  deviceModel?: Maybe<Scalars['String']>,
  deviceVersion?: Maybe<Scalars['String']>,
  deviceImei?: Maybe<Scalars['String']>,
};

export type DeviceHistory = {
   __typename?: 'DeviceHistory',
  date?: Maybe<Scalars['DateTime']>,
  device?: Maybe<Device>,
  store_id?: Maybe<Scalars['String']>,
  client_id?: Maybe<Scalars['String']>,
  invoice_store_name?: Maybe<Scalars['String']>,
  inovice_no?: Maybe<Scalars['String']>,
  services_detail?: Maybe<Array<Maybe<TransactionServiceType>>>,
};

export type DeviceImportInput = {
  deviceBrand: Scalars['String'],
  deviceModel: Scalars['String'],
  device_color: Scalars['String'],
  imei_ssn: Scalars['String'],
  location_id: Scalars['ID'],
};

export type DeviceImportType = {
   __typename?: 'deviceImportType',
  customer_id?: Maybe<Scalars['ID']>,
  alreadyExistDevices?: Maybe<Array<Maybe<ImportDeviceType>>>,
  InvalidDataDevices?: Maybe<Array<Maybe<ImportDeviceType>>>,
  newlyAddedDevices?: Maybe<Array<Maybe<ImportDeviceType>>>,
};

export type DeviceInput = {
  deviceBrand: Scalars['ID'],
  deviceModel: Scalars['ID'],
  device_color?: Maybe<Scalars['String']>,
  imei_ssn?: Maybe<Scalars['String']>,
  customer?: Maybe<Scalars['ID']>,
  location_id?: Maybe<Scalars['ID']>,
  device_image?: Maybe<Scalars['String']>,
};

export type DeviceIssues = {
   __typename?: 'DeviceIssues',
  _id?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  Business?: Maybe<Business>,
};

export type DeviceIssuesInput = {
  name: Scalars['String'],
  type: DeviceIssuesType,
};

export enum DeviceIssuesType {
  Issues = 'issues',
  Items = 'items'
}

export type DeviceModel = {
   __typename?: 'DeviceModel',
  _id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  brand?: Maybe<SystemBrand>,
  BusinessLocation?: Maybe<BusinessLocation>,
  Business?: Maybe<Business>,
};

export type DeviceModelInput = {
  name: Scalars['String'],
  brand: Scalars['ID'],
  BusinessLocation: Scalars['ID'],
};

export type DeviceServicesInput = {
  deviceID: Scalars['ID'],
  services?: Maybe<Array<Maybe<ServiceInput>>>,
};

export type DeviceTags = {
   __typename?: 'DeviceTags',
  _id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  device_version?: Maybe<Scalars['String']>,
};

export type DeviceWithCount = {
   __typename?: 'DeviceWithCount',
  Device: Device,
  count_service: Scalars['String'],
};

export type Directory = {
   __typename?: 'Directory',
  _id: Scalars['ID'],
  name: Scalars['String'],
  model_type: Scalars['String'],
  model_id: Scalars['String'],
  location_id: BusinessLocation,
  SourceFile?: Maybe<Array<SourceFile>>,
};

export type Discount = {
   __typename?: 'Discount',
  _id: Scalars['ID'],
  code: Scalars['String'],
  Campaign?: Maybe<Campaign>,
  tags?: Maybe<Array<Maybe<Scalars['String']>>>,
  is_single_store: Scalars['Boolean'],
  single_store?: Maybe<BusinessLocation>,
  multi_stores?: Maybe<Array<Maybe<BusinessLocation>>>,
  /** it will depend */
  is_minimum_purchase: Scalars['Boolean'],
  is_discount_percentage: Scalars['Boolean'],
  discount_amount: Scalars['Float'],
  is_minimum_purchase_amount: Scalars['Boolean'],
  purchaseAmountQuantity?: Maybe<Scalars['Float']>,
  is_entire_order: Scalars['Boolean'],
  Product?: Maybe<Array<Maybe<Product>>>,
  is_customer_since: Scalars['Boolean'],
  customer_since?: Maybe<Scalars['DateTime']>,
  is_new_customer_only: Scalars['Boolean'],
  new_customer_register_after_date?: Maybe<Scalars['DateTime']>,
  is_customer_spent_amount: Scalars['Boolean'],
  is_customer_more_then_said_amount: Scalars['Boolean'],
  spent_amount?: Maybe<Scalars['Float']>,
  customerTags?: Maybe<Array<Maybe<Scalars['String']>>>,
  is_customer_can_use_only_once: Scalars['Boolean'],
  number_of_usage_per_customer?: Maybe<Scalars['Float']>,
  can_schedule: Scalars['Boolean'],
  schedule_from?: Maybe<Scalars['DateTime']>,
  schedule_to?: Maybe<Scalars['DateTime']>,
  created_at?: Maybe<Scalars['DateTime']>,
  updated_at?: Maybe<Scalars['DateTime']>,
  status: Status,
  is_active: Is_Active,
  redeem_by?: Maybe<Array<Maybe<Customer>>>,
  reach?: Maybe<Scalars['Float']>,
  BusinessLocation?: Maybe<BusinessLocation>,
  Business: Business,
};

export type DiscountInput = {
  code: Scalars['String'],
  Campaign?: Maybe<Scalars['ID']>,
  tags?: Maybe<Array<Maybe<Scalars['String']>>>,
  is_single_store: Scalars['Boolean'],
  single_store?: Maybe<Scalars['ID']>,
  multi_stores?: Maybe<Array<Maybe<Scalars['ID']>>>,
  is_discount_percentage: Scalars['Boolean'],
  discount_amount: Scalars['Float'],
  is_minimum_purchase: Scalars['Boolean'],
  is_minimum_purchase_amount: Scalars['Boolean'],
  purchaseAmountQuantity?: Maybe<Scalars['Float']>,
  is_entire_order: Scalars['Boolean'],
  Product?: Maybe<Array<Maybe<Scalars['ID']>>>,
  is_customer_since: Scalars['Boolean'],
  customer_since?: Maybe<Scalars['String']>,
  is_new_customer_only: Scalars['Boolean'],
  new_customer_register_after_date?: Maybe<Scalars['String']>,
  is_customer_spent_amount: Scalars['Boolean'],
  is_customer_more_then_said_amount: Scalars['Boolean'],
  spent_amount?: Maybe<Scalars['Float']>,
  customerTags?: Maybe<Array<Maybe<Scalars['String']>>>,
  is_customer_can_use_only_once: Scalars['Boolean'],
  number_of_usage_per_customer?: Maybe<Scalars['Float']>,
  can_schedule: Scalars['Boolean'],
  schedule_from?: Maybe<Scalars['String']>,
  schedule_to?: Maybe<Scalars['String']>,
  status?: Maybe<Status>,
  is_active: Is_Active,
  BusinessLocation: Scalars['ID'],
  isSendEmail: Scalars['Boolean'],
};

export type Document = {
   __typename?: 'Document',
  _id?: Maybe<Scalars['ID']>,
  document_name?: Maybe<Scalars['String']>,
  file_path?: Maybe<Scalars['String']>,
  addressed_to?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['DateTime']>,
  created_at?: Maybe<Scalars['DateTime']>,
  BusinessLocation?: Maybe<BusinessLocation>,
};

export type DocumentInput = {
  document_name: Scalars['String'],
  file_path?: Maybe<Scalars['String']>,
  addressed_to: ClassificationType,
  status: ClientStatusType,
  BusinessLocation?: Maybe<Scalars['ID']>,
};

export type DocumentSearchInput = {
  search?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  sortTypeName?: Maybe<Scalars['String']>,
};

export type Dynamicstatus = {
  status_name?: Maybe<Scalars['String']>,
  status_font_color?: Maybe<Scalars['String']>,
  status_background_color?: Maybe<Scalars['String']>,
  status_icon?: Maybe<Scalars['String']>,
};

export type EmailOtp = {
   __typename?: 'emailOtp',
  _id?: Maybe<Scalars['String']>,
  otp_code: Scalars['String'],
  email: Scalars['String'],
  verified: Scalars['Boolean'],
};

export type EmailOtpInput = {
  email: Scalars['String'],
  name?: Maybe<Scalars['String']>,
};

export type EmailVerifyOtpInput = {
  email: Scalars['String'],
  otp_code: Scalars['String'],
};

export type FileInput = {
  model_type: Scalars['String'],
  model_id: Scalars['String'],
  directoryName: Scalars['String'],
  location_id: Scalars['ID'],
};

export enum FilterEnum {
  All = 'all',
  Archive = 'archive',
  Active = 'active',
  Inactive = 'inactive'
}

export enum FilterStatus {
  All = 'all',
  Order = 'order',
  Invoice = 'invoice',
  Quote = 'quote'
}

export enum FilterType {
  All = 'all',
  Plenty = 'plenty',
  Low = 'low',
  None = 'none'
}

export type FolderInput = {
  model_type?: Maybe<AllowedModel>,
  model_id: Scalars['String'],
  location_id: Scalars['ID'],
};

export type ForgetBusinessInput = {
  email?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  method?: Maybe<AllowMethodPhoneVerify>,
};

export type GiftCard = {
   __typename?: 'GiftCard',
  _id: Scalars['ID'],
  card_no: Scalars['String'],
  gift_card_keeping_unit: Scalars['String'],
  name: Scalars['String'],
  Customer: Customer,
  to: Scalars['String'],
  subject: Scalars['String'],
  send_gift_card: Scalars['DateTime'],
  email: Scalars['String'],
  message?: Maybe<Scalars['String']>,
  amount?: Maybe<Scalars['Float']>,
  is_used?: Maybe<Scalars['Boolean']>,
  is_email_send?: Maybe<Scalars['Boolean']>,
  is_active?: Maybe<Scalars['Boolean']>,
  BusinessLocation: BusinessLocation,
  created_at: Scalars['DateTime'],
  qr_code?: Maybe<Scalars['String']>,
};

export type GiftCardInput = {
  to?: Maybe<Scalars['String']>,
  from: Scalars['ID'],
  subject: Scalars['String'],
  send_gift_card: Scalars['String'],
  email: Scalars['String'],
  message?: Maybe<Scalars['String']>,
  amount?: Maybe<Scalars['Float']>,
  is_used?: Maybe<Scalars['Boolean']>,
  is_email_send?: Maybe<Scalars['Boolean']>,
  is_active?: Maybe<Scalars['Boolean']>,
  BusinessLocation: Scalars['ID'],
};

export enum HeaderFilter {
  All = 'all',
  Used = 'used',
  NotUsed = 'not_used'
}

export type HistoryClocked = {
   __typename?: 'HistoryClocked',
  User?: Maybe<User>,
  totalHours: Scalars['String'],
  startDate: Scalars['String'],
  endDate: Scalars['String'],
  history?: Maybe<Array<Maybe<UserClockedHistoryDetail>>>,
};

export type ImportCustomerType = {
   __typename?: 'ImportCustomerType',
  alreadyExistCustomers?: Maybe<Array<Maybe<CustomerImportType>>>,
  InvalidDataCustomers?: Maybe<Array<Maybe<CustomerImportType>>>,
  newlyAddedCustomers?: Maybe<Array<Maybe<CustomerImportType>>>,
};

export type ImportDeviceType = {
   __typename?: 'importDeviceType',
  _id?: Maybe<Scalars['ID']>,
  deviceBrand?: Maybe<Scalars['String']>,
  deviceModel?: Maybe<Scalars['String']>,
  device_color?: Maybe<Scalars['String']>,
  imei_ssn?: Maybe<Scalars['String']>,
  device_keeping_unit?: Maybe<Scalars['String']>,
  location_id?: Maybe<Scalars['ID']>,
};

export type ImportPo = {
  PO_data?: Maybe<Array<Maybe<ImportPurchaseOrderInput>>>,
  BusinessLocation?: Maybe<Scalars['ID']>,
};

export type ImportProductType = {
   __typename?: 'ImportProductType',
  productsInvalidData?: Maybe<Array<Maybe<Product>>>,
  newlyAddedProducts?: Maybe<Array<Maybe<Product>>>,
  alreadyExistProducts?: Maybe<Array<Maybe<Product>>>,
};

export type ImportPurchaseOrderInput = {
  transaction_date?: Maybe<Scalars['DateTime']>,
  supplier_name: Scalars['String'],
  supplier_sku: Scalars['String'],
  quantity: Scalars['Int'],
  unit_price?: Maybe<Scalars['Float']>,
};

export type ImportSupplierInput = {
  supplier_company: Scalars['String'],
  supplier_company_phone: Scalars['String'],
  supplier_company_email?: Maybe<Scalars['String']>,
  website: Scalars['String'],
  address_1: Scalars['String'],
  address_2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  zip_code?: Maybe<Scalars['String']>,
  Country?: Maybe<Scalars['String']>,
  supplier_first_name?: Maybe<Scalars['String']>,
  supplier_last_name?: Maybe<Scalars['String']>,
  supplier_phone?: Maybe<Scalars['String']>,
  supplier_mobile?: Maybe<Scalars['String']>,
  supplier_email?: Maybe<Scalars['String']>,
  BusinessLocation: Scalars['ID'],
  is_verify_supplier?: Maybe<Scalars['Boolean']>,
  is_buyback?: Maybe<Scalars['Boolean']>,
};

export type ImportSupplierType = {
   __typename?: 'importSupplierType',
  alreadyExistSuppliers?: Maybe<Array<Maybe<Supplier>>>,
  suppliersInvalidData?: Maybe<Array<Maybe<Supplier>>>,
  newlyAddedSuppliers?: Maybe<Array<Maybe<Supplier>>>,
};

export type InputBuybackReceivingLine = {
  Supplier: Scalars['ID'],
  System_Device: Scalars['ID'],
  quantity: Scalars['Int'],
  received_qty: Scalars['Int'],
  approve_qty: Scalars['Int'],
  device_price: Scalars['Float'],
  sub_total?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  Tax?: Maybe<Scalars['Float']>,
  is_tax_percentage?: Maybe<Scalars['Boolean']>,
  tax_amount?: Maybe<Scalars['Float']>,
  tax_value?: Maybe<Scalars['Float']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
};

export type InputExtraItem = {
  deviceID?: Maybe<Scalars['ID']>,
  productID?: Maybe<Scalars['ID']>,
  supplier_sku?: Maybe<Scalars['String']>,
  supplierId?: Maybe<Scalars['ID']>,
  quantity?: Maybe<Scalars['Int']>,
  serial_no?: Maybe<Scalars['String']>,
  reason?: Maybe<Scalars['String']>,
  transactionID?: Maybe<Scalars['ID']>,
  locationID?: Maybe<Scalars['ID']>,
  isProductAddDevice?: Maybe<Scalars['Boolean']>,
  sellLineID?: Maybe<Scalars['ID']>,
  sellLineServiceModelID?: Maybe<Scalars['ID']>,
  serviceNotes?: Maybe<Scalars['String']>,
};

export type InputOrderReceivingProduct = {
  Product?: Maybe<Scalars['ID']>,
  sku_numbner?: Maybe<Scalars['String']>,
  quantity?: Maybe<Scalars['Int']>,
  in_stock?: Maybe<Scalars['Int']>,
  product_cost_price?: Maybe<Scalars['Float']>,
  receive_quantity?: Maybe<Scalars['Int']>,
  receiving_quantity?: Maybe<Scalars['Int']>,
  sub_total?: Maybe<Scalars['Float']>,
  Tax?: Maybe<Scalars['ID']>,
  tax_amount?: Maybe<Scalars['Float']>,
  tax_value?: Maybe<Scalars['Float']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
};

export type InputProductsWithDevice = {
  is_product?: Maybe<Scalars['Boolean']>,
  device_id?: Maybe<Scalars['ID']>,
  search?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  businessLocation?: Maybe<Scalars['ID']>,
  productType?: Maybe<ProductTypes>,
};

export enum InputProductType {
  GiftCard = 'giftCard',
  Custom = 'custom',
  Product = 'product'
}

export type InputPurchaseOrderPaymentMethod = {
  transactionId: Scalars['ID'],
  cashRegisterId?: Maybe<Scalars['ID']>,
  amount: Scalars['Float'],
  method: AllowedPurchaseOrderPaymentMethod,
  creditLineId?: Maybe<Scalars['ID']>,
  paypal_transaction_id?: Maybe<Scalars['String']>,
  card_number?: Maybe<Scalars['String']>,
  paypal_account?: Maybe<Scalars['String']>,
  bank_account_number?: Maybe<Scalars['String']>,
  cheque_number?: Maybe<Scalars['String']>,
  invoice_number?: Maybe<Scalars['String']>,
  BusinessLocation: Scalars['ID'],
  paid_on?: Maybe<Scalars['DateTime']>,
  typeOfPayment?: Maybe<TpType>,
};

export type InputSearchCustomer = {
  location_id?: Maybe<Scalars['ID']>,
  search?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  is_deleted?: Maybe<Scalars['Boolean']>,
  is_cloud?: Maybe<Scalars['Boolean']>,
  fromDate?: Maybe<Scalars['DateTime']>,
  toDate?: Maybe<Scalars['DateTime']>,
  headerFliter?: Maybe<CustomerHeaderFilter>,
  footerFliter?: Maybe<Array<Maybe<CustomerFooterFilter>>>,
};

export type InputSearchProductBySupplier = {
  locationId?: Maybe<Scalars['ID']>,
  search?: Maybe<Scalars['String']>,
  supllierId?: Maybe<Scalars['ID']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  orderId?: Maybe<Scalars['ID']>,
};

export type InputSearchProductWithSuppler = {
  is_bundle_product?: Maybe<Scalars['Boolean']>,
  locationId?: Maybe<Scalars['ID']>,
  search?: Maybe<Scalars['String']>,
  supllierId?: Maybe<Scalars['ID']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  filterType?: Maybe<FilterType>,
  transactionId?: Maybe<Scalars['ID']>,
};

export type InputServicesBrandModel = {
  ServiceBrand?: Maybe<Scalars['ID']>,
  ServiceDeviceModel?: Maybe<Scalars['ID']>,
  service_max_price?: Maybe<Scalars['Float']>,
  service_min_price?: Maybe<Scalars['Float']>,
  ServiceItem?: Maybe<Scalars['ID']>,
};

export type InputSkuProduct = {
  sku_numbner: Scalars['String'],
  quantity: Scalars['Int'],
  in_stock: Scalars['Int'],
  product_cost_price: Scalars['Float'],
  sub_total?: Maybe<Scalars['Float']>,
  Tax?: Maybe<Scalars['ID']>,
  tax_amount?: Maybe<Scalars['Float']>,
  tax_value?: Maybe<Scalars['Float']>,
  is_tax_percentage?: Maybe<Scalars['Boolean']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
};

export type InputSupplierNetTermPayment = {
  cashRegisterId?: Maybe<Scalars['ID']>,
  amount: Scalars['Float'],
  method: AllowedPurchaseOrderPaymentMethod,
  creditLineId?: Maybe<Scalars['ID']>,
  paypal_transaction_id?: Maybe<Scalars['String']>,
  card_number?: Maybe<Scalars['String']>,
  paypal_account?: Maybe<Scalars['String']>,
  bank_account_number?: Maybe<Scalars['String']>,
  cheque_number?: Maybe<Scalars['String']>,
  invoice_number?: Maybe<Scalars['String']>,
  BusinessLocation: Scalars['ID'],
  paid_on?: Maybe<Scalars['DateTime']>,
  supplierId?: Maybe<Scalars['ID']>,
  orders?: Maybe<Array<Maybe<NetTermOrderInput>>>,
};

export type InputTicketsFilter = {
  ticketfooterfilter?: Maybe<Ticketfooterfilter>,
  location_id?: Maybe<Scalars['ID']>,
  customer_id?: Maybe<Scalars['ID']>,
  search?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  sorting_by: TicketSorting,
  dateFilter?: Maybe<Datefilter>,
  repairStatus?: Maybe<Array<Maybe<Scalars['String']>>>,
  quickFilter?: Maybe<QuickFilter>,
  start_date?: Maybe<Scalars['DateTime']>,
  end_date?: Maybe<Scalars['DateTime']>,
  balance_sorting?: Maybe<IsbalanceSorting>,
  is_checkout?: Maybe<Scalars['Boolean']>,
};

export type InputTransactionBuybackLine = {
  Supplier: Scalars['ID'],
  System_Device: Scalars['ID'],
  quantity: Scalars['Int'],
  approve_qty?: Maybe<Scalars['Int']>,
  device_price: Scalars['Float'],
  sub_total?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  Tax?: Maybe<Scalars['Float']>,
  is_tax_percentage?: Maybe<Scalars['Boolean']>,
  tax_amount?: Maybe<Scalars['Float']>,
  tax_value?: Maybe<Scalars['Float']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
};

export type InputTransactionPurchaseLine = {
  Product: Scalars['ID'],
  skuProductDetail?: Maybe<Array<Maybe<InputSkuProduct>>>,
};

export type InputTransactionPurchaseOrderLine = {
  TransactionPurchaseOrder?: Maybe<Scalars['ID']>,
  Product: Scalars['ID'],
  quantity: Scalars['Int'],
  receive_quantity?: Maybe<Scalars['Int']>,
  product_price: Scalars['Float'],
  product_sub_total: Scalars['Float'],
  Tax?: Maybe<Scalars['ID']>,
  tax_type?: Maybe<Scalars['String']>,
  tax_amount?: Maybe<Scalars['Float']>,
  discount_type?: Maybe<Scalars['String']>,
  discount_amount?: Maybe<Scalars['Float']>,
  notes?: Maybe<Scalars['String']>,
  product_total_amount: Scalars['Float'],
};

export type InputTransactionSellLine = {
  is_device?: Maybe<Scalars['Boolean']>,
  product_type?: Maybe<InputProductType>,
  sell_line_product_type?: Maybe<SellLineProductType>,
  Product?: Maybe<Scalars['ID']>,
  product_sku?: Maybe<Scalars['String']>,
  supplier_sku?: Maybe<Scalars['String']>,
  quantity?: Maybe<Scalars['Int']>,
  product_purchase_price?: Maybe<Scalars['Float']>,
  product_sale_price?: Maybe<Scalars['Float']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  sub_total_amount?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  CustomProduct?: Maybe<CustomProductInput>,
  deviceProducts?: Maybe<Array<Maybe<AssignDeviceProductInput>>>,
  Device?: Maybe<Scalars['ID']>,
  DeviceCheckIn?: Maybe<Scalars['ID']>,
  serial_number?: Maybe<Scalars['String']>,
  giftCard?: Maybe<GiftCardInput>,
  Supplier?: Maybe<Scalars['ID']>,
};

export type InputTrnPurchaseInvoiceLine = {
  TrnPurchaseInvoice?: Maybe<Scalars['ID']>,
  Product: Scalars['ID'],
  quantity: Scalars['Int'],
  product_price: Scalars['Float'],
  product_sub_total: Scalars['Float'],
  Tax?: Maybe<Scalars['ID']>,
  tax_type?: Maybe<Scalars['String']>,
  tax_amount?: Maybe<Scalars['Float']>,
  discount_type?: Maybe<Scalars['String']>,
  discount_amount?: Maybe<Scalars['Float']>,
  notes?: Maybe<Scalars['String']>,
  product_total_amount: Scalars['Float'],
  BusinessLocation: Scalars['ID'],
};

export type InputTypefile = {
  folder_id?: Maybe<Scalars['ID']>,
  location_id?: Maybe<Scalars['ID']>,
};

export type InputUploadTaxDocument = {
  customerId: Scalars['ID'],
  orderId: Scalars['ID'],
  location_id?: Maybe<Scalars['ID']>,
  file?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  tax_certificate_id?: Maybe<Scalars['String']>,
};

export type InvoiceAmountRefundInput = {
  transactionID: Scalars['ID'],
  reason: Scalars['String'],
  note?: Maybe<Scalars['String']>,
  amount: Scalars['Float'],
  location_id: Scalars['ID'],
};

export enum Is_Active {
  Enabled = 'Enabled',
  Disabled = 'Disabled'
}

export enum IsbalanceSorting {
  Desc = 'desc',
  Asc = 'asc',
  None = 'none'
}

export type ItemReceivingRmaInput = {
  Product?: Maybe<Scalars['ID']>,
  skuNo?: Maybe<Scalars['String']>,
  receiving_quantity?: Maybe<Scalars['Int']>,
  approved_quantity?: Maybe<Scalars['Int']>,
  productCostPrice?: Maybe<Scalars['Float']>,
  sub_total?: Maybe<Scalars['Float']>,
  totalAmount?: Maybe<Scalars['Float']>,
};

export type JournalLedger = {
   __typename?: 'JournalLedger',
  supplier?: Maybe<Scalars['String']>,
  invoice_no?: Maybe<Scalars['String']>,
  debit_amount?: Maybe<Scalars['Float']>,
  credit_amount?: Maybe<Scalars['Float']>,
  created?: Maybe<Scalars['DateTime']>,
  voucherType?: Maybe<Scalars['String']>,
  account?: Maybe<Scalars['String']>,
};

export type LabelStatus = {
   __typename?: 'labelStatus',
  _id?: Maybe<Scalars['ID']>,
  status_name?: Maybe<Scalars['String']>,
  status_background_color?: Maybe<Scalars['String']>,
  status_font_color?: Maybe<Scalars['String']>,
  status_icon?: Maybe<Scalars['String']>,
  status_type?: Maybe<AllowedType>,
  BusinessLocation?: Maybe<BusinessLocation>,
};

export type LogsUser = {
   __typename?: 'logsUser',
  logs?: Maybe<Array<Maybe<UserActivity>>>,
  last_login?: Maybe<Scalars['String']>,
};

export type MakeBrainTreePaymentInput = {
  token: Scalars['String'],
  amount: Scalars['String'],
};

export type ManageStockSku = {
   __typename?: 'manageStockSku',
  supplier_id?: Maybe<Supplier>,
  sku_number?: Maybe<Scalars['String']>,
  sku_qty?: Maybe<Scalars['Int']>,
};

export type MasterCode = {
   __typename?: 'MasterCode',
  _id: Scalars['ID'],
  code: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  login?: Maybe<AuthData>,
  loginWithEmail?: Maybe<AuthData>,
  userLoginByVerification?: Maybe<AuthData>,
  signup?: Maybe<User>,
  superAdminLogin?: Maybe<AuthData>,
  createUser?: Maybe<User>,
  UpdateUser?: Maybe<User>,
  updateUserPassword?: Maybe<Scalars['Boolean']>,
  uploadUserImage: Scalars['Boolean'],
  VerifyforgetEmailWithPhone?: Maybe<Array<Maybe<User>>>,
  userForgetPassword?: Maybe<Scalars['Boolean']>,
  VerifyuserForgetPassword?: Maybe<Scalars['Boolean']>,
  userPasswordReset?: Maybe<Scalars['Boolean']>,
  addDefaultStatusAndAccountType?: Maybe<Scalars['Boolean']>,
  createBusiness?: Maybe<Business>,
  udateBusiness?: Maybe<Business>,
  uploadFile: Scalars['Boolean'],
  createOTP?: Maybe<Scalars['Boolean']>,
  verifyOTP: Scalars['Boolean'],
  createEmailOTP?: Maybe<EmailOtp>,
  verifyEmailOTP?: Maybe<EmailOtp>,
  verifyforgetBusinessUrl?: Maybe<Array<Maybe<Business>>>,
  createCurrency?: Maybe<Currency>,
  createBusinessLocation?: Maybe<BusinessLocation>,
  updateBusinessLocation?: Maybe<Scalars['Boolean']>,
  uploadLocationImage: Scalars['Boolean'],
  businessLocationSettings?: Maybe<Scalars['Boolean']>,
  createCustomer?: Maybe<Customer>,
  updateCustomer?: Maybe<Scalars['Boolean']>,
  deleteCustomer?: Maybe<Scalars['Boolean']>,
  restoreCustomer?: Maybe<Scalars['Boolean']>,
  importCustomer?: Maybe<ImportCustomerType>,
  createNetTermOfCustomer?: Maybe<NetTermLogs>,
  createStoreCredit?: Maybe<StoreCredit>,
  createTransferCredit?: Maybe<StoreCredit>,
  linkCustomerToStore?: Maybe<Scalars['Boolean']>,
  unLinkCustomerToStore?: Maybe<Scalars['Boolean']>,
  MergeCustomer?: Maybe<Scalars['Boolean']>,
  MergeDevices?: Maybe<Scalars['Boolean']>,
  TransferDevice?: Maybe<Scalars['Boolean']>,
  permanentDeleteCustomer?: Maybe<CustomerPermanentDeleteType>,
  updateCustomerPhoneNumber?: Maybe<Scalars['Boolean']>,
  createCustomerDocument?: Maybe<CustomerDocumentType>,
  deleteCustomerDocument?: Maybe<Scalars['Boolean']>,
  createCashRegister?: Maybe<CashRegisters>,
  updateCashRegister?: Maybe<Scalars['Boolean']>,
  deleteCashRegister?: Maybe<Scalars['Boolean']>,
  openAndCloseCashRegister?: Maybe<Scalars['Boolean']>,
  saveOpenCashDrawerLog?: Maybe<OpenCashDrawer>,
  saveTillCount?: Maybe<TillCount>,
  createProduct?: Maybe<Product>,
  updateProduct?: Maybe<Scalars['Boolean']>,
  deleteProduct?: Maybe<Scalars['Boolean']>,
  generateSKUNumber?: Maybe<Scalars['String']>,
  restoreProduct?: Maybe<Scalars['Boolean']>,
  importProductsData?: Maybe<ImportProductType>,
  createDevice?: Maybe<Device>,
  deleteDevice?: Maybe<Scalars['Boolean']>,
  updateDevice?: Maybe<Scalars['Boolean']>,
  permanentDeleteDevice?: Maybe<Scalars['Boolean']>,
  restoreDevice?: Maybe<Scalars['Boolean']>,
  importDevices?: Maybe<DeviceImportType>,
  createSystemDevice?: Maybe<SystemDevice>,
  updateSystemDevice?: Maybe<Scalars['Boolean']>,
  deleteSystemDevice?: Maybe<Scalars['Boolean']>,
  createDeviceIssues?: Maybe<DeviceIssues>,
  createCustomProduct?: Maybe<CustomProduct>,
  createTag?: Maybe<Tag>,
  saveFile: Scalars['Boolean'],
  deleteFile: Scalars['Boolean'],
  fileUpload?: Maybe<Scalars['Boolean']>,
  createFolder?: Maybe<Directory>,
  uploadFileWithoutfolderID?: Maybe<Array<Maybe<Directory>>>,
  createSupplier?: Maybe<Supplier>,
  importSuppliersData?: Maybe<ImportSupplierType>,
  updateSupplier?: Maybe<Scalars['Boolean']>,
  removedSupplier?: Maybe<Scalars['Boolean']>,
  removedMultiSuppliers?: Maybe<Scalars['Boolean']>,
  archiveToActiveSupplier?: Maybe<Scalars['Boolean']>,
  permanentDeleteSupplier?: Maybe<Scalars['Boolean']>,
  SupplierPaymentSettings?: Maybe<Supplier>,
  SupplierChangeBuyBack?: Maybe<Supplier>,
  SupplierSortOrder?: Maybe<Supplier>,
  createSystemSupplier?: Maybe<SystemSupplier>,
  removedSystemSupplier?: Maybe<Scalars['Boolean']>,
  createTransferStoreCredit?: Maybe<StoreCredit>,
  createSupplierManageCredit?: Maybe<StoreCredit>,
  createSupplierNetterm?: Maybe<NetTermLogs>,
  createDeviceCheckIns?: Maybe<DeviceCheckIns>,
  updateDeviceCheckIns?: Maybe<DeviceCheckIns>,
  createTax?: Maybe<Tax>,
  updateTax?: Maybe<Scalars['Boolean']>,
  createBrand?: Maybe<Brand>,
  updateBrand?: Maybe<Scalars['Boolean']>,
  createSystemBrand?: Maybe<SystemBrand>,
  updateSystemBrand?: Maybe<Scalars['Boolean']>,
  deleteSystemBrand?: Maybe<Scalars['Boolean']>,
  createDiscount?: Maybe<Discount>,
  updateDiscount?: Maybe<Scalars['Boolean']>,
  deleteDiscount?: Maybe<Scalars['Boolean']>,
  createCountry?: Maybe<Country>,
  createState?: Maybe<States>,
  updateState?: Maybe<Scalars['Boolean']>,
  createCity?: Maybe<City>,
  updateCity?: Maybe<Scalars['Boolean']>,
  createZipCodeRate?: Maybe<ZipCodeRate>,
  updateZipCodeRate?: Maybe<Scalars['Boolean']>,
  readCsv?: Maybe<Scalars['Boolean']>,
  createPinCode?: Maybe<Scalars['Boolean']>,
  userPinCodeVerify?: Maybe<UserCLocked>,
  userClockOutBeforeLogOut?: Maybe<Scalars['Boolean']>,
  userClockedIn?: Maybe<ClockedHistory>,
  userPinCodeResend?: Maybe<Scalars['Boolean']>,
  makeBrainTreePayment?: Maybe<BrainTreePayment>,
  createCampaign?: Maybe<Campaign>,
  updateCampaign?: Maybe<Scalars['Boolean']>,
  removeCampaign?: Maybe<Scalars['Boolean']>,
  createReason?: Maybe<Reason>,
  createGiftCard?: Maybe<GiftCard>,
  updateGiftCard?: Maybe<Scalars['Boolean']>,
  createAccountType?: Maybe<AccountType>,
  updateAccountType?: Maybe<Scalars['Boolean']>,
  createChartOfAccount?: Maybe<ChartOfAccount>,
  updateChartOfAccount?: Maybe<Scalars['Boolean']>,
  createChartOfAccountByType?: Maybe<ChartOfAccount>,
  createTransactionJournal?: Maybe<TransactionJournal>,
  updateTransactionJournal?: Maybe<Scalars['Boolean']>,
  createTransactionJournalDetail?: Maybe<TransactionJournalDetail>,
  updateTransactionJournalDetail?: Maybe<Scalars['Boolean']>,
  createTrnPurchaseOrder?: Maybe<TransactionPurchaseOrder>,
  updateTrnPurchaseOrder?: Maybe<Scalars['Boolean']>,
  createPurchaseInvoice?: Maybe<TrnPurchaseInvoice>,
  updatePurchaseInvoice?: Maybe<Scalars['Boolean']>,
  createPurchaseOrder?: Maybe<Transaction>,
  importPurchaseOrder?: Maybe<Transaction>,
  updatePurchaseOrder?: Maybe<Scalars['Boolean']>,
  deleteItemAndUpdateCart?: Maybe<Scalars['Boolean']>,
  purchaseOrderReceiving?: Maybe<Transaction>,
  OrderStatusUpdate?: Maybe<Transaction>,
  POStatusUpdate?: Maybe<Transaction>,
  POSupplierOrderNumber?: Maybe<Transaction>,
  AddShippingDetail?: Maybe<Transaction>,
  addAdditionalCost?: Maybe<Transaction>,
  PODelete?: Maybe<Scalars['Boolean']>,
  POCancel?: Maybe<Scalars['Boolean']>,
  deleteLogAndUpdateStock?: Maybe<Transaction>,
  POTransactionFlow?: Maybe<Transaction>,
  CreatePOToRMA?: Maybe<Transaction>,
  createDeviceModel?: Maybe<DeviceModel>,
  updateDeviceModel?: Maybe<Scalars['Boolean']>,
  createPaymentProcess?: Maybe<Array<Maybe<TransactionPayment>>>,
  createPurchaseOrderpayment?: Maybe<Array<Maybe<TransactionPayment>>>,
  createNetTermPayment?: Maybe<Scalars['Boolean']>,
  deletePayment?: Maybe<Scalars['Boolean']>,
  getPaypalHereToken?: Maybe<Scalars['String']>,
  createPaymentRefund?: Maybe<Scalars['Boolean']>,
  createSupplierNetTermPayment?: Maybe<Scalars['Boolean']>,
  createSale?: Maybe<Transaction>,
  payLaterInvoice?: Maybe<Scalars['Boolean']>,
  createClient?: Maybe<Client>,
  updateClient?: Maybe<Scalars['Boolean']>,
  deleteClient?: Maybe<Scalars['Boolean']>,
  bulkDeleteClient?: Maybe<Array<Maybe<Client>>>,
  clientDocumentStatus?: Maybe<Scalars['Boolean']>,
  clientDocumentFileUpload?: Maybe<Scalars['Boolean']>,
  createDocument?: Maybe<Document>,
  updateDocument?: Maybe<Scalars['Boolean']>,
  deleteDocument?: Maybe<Scalars['Boolean']>,
  createClientAlert?: Maybe<ClientAlert>,
  updateClientAlert?: Maybe<Scalars['Boolean']>,
  deleteClientAlert?: Maybe<Scalars['Boolean']>,
  createClientNote?: Maybe<ClientNote>,
  updateClientNote?: Maybe<Scalars['Boolean']>,
  deleteClientNote?: Maybe<Scalars['Boolean']>,
  createBusinessAdmin?: Maybe<Business>,
  updateBusinessAdmin?: Maybe<Scalars['Boolean']>,
  deleteBusinessAdmin?: Maybe<Scalars['Boolean']>,
  statusBusinessAdmin?: Maybe<Scalars['Boolean']>,
  OwnerPasswordUpdate?: Maybe<Scalars['Boolean']>,
  businessLogoUpload?: Maybe<Scalars['String']>,
  businessLogoDelete?: Maybe<Scalars['Boolean']>,
  createBusinessStoreAdmin?: Maybe<BusinessLocation>,
  updateBusinessStoreAdmin?: Maybe<Scalars['Boolean']>,
  deleteBusinessStoreAdmin?: Maybe<Scalars['Boolean']>,
  statusBusinessStoreAdmin?: Maybe<Scalars['Boolean']>,
  storeLogoUpload?: Maybe<Scalars['String']>,
  storeLogoDelete?: Maybe<Scalars['Boolean']>,
  createBusinessUser?: Maybe<User>,
  updateBusinessUser?: Maybe<Scalars['Boolean']>,
  deleteBusinessUser?: Maybe<Scalars['Boolean']>,
  statusBusinessUser?: Maybe<Scalars['Boolean']>,
  userLogoUpload?: Maybe<Scalars['String']>,
  userLogoDelete?: Maybe<Scalars['Boolean']>,
  masterCodeGenerate?: Maybe<MasterCode>,
  updateMasterPincode?: Maybe<MasterCode>,
  createDeviceTag?: Maybe<DeviceTags>,
  createDeviceTags?: Maybe<Array<Maybe<DeviceTags>>>,
  deleteDeviceTags?: Maybe<Scalars['Boolean']>,
  superAdminPasswordChange?: Maybe<Scalars['Boolean']>,
  deleteSuperAdminUser?: Maybe<Scalars['Boolean']>,
  statusSuperAdminUser?: Maybe<Scalars['Boolean']>,
  updateSuperAdminUser?: Maybe<Scalars['Boolean']>,
  createSuperAdminUser?: Maybe<User>,
  superAdminUserLogoUpload?: Maybe<User>,
  superAdminUserLogoDelete?: Maybe<Scalars['Boolean']>,
  createCompany?: Maybe<Company>,
  updateCompany?: Maybe<Company>,
  createCompanyBusiness?: Maybe<Business>,
  updateCompanyBusiness?: Maybe<Business>,
  createStatus?: Maybe<LabelStatus>,
  createlimit?: Maybe<Scalars['Boolean']>,
  updateStatus?: Maybe<Scalars['Boolean']>,
  deleteStatus?: Maybe<Scalars['Boolean']>,
  createMasterCode?: Maybe<MasterCode>,
  updateMasterCode?: Maybe<Scalars['Boolean']>,
  deleteMasterCode?: Maybe<Scalars['Boolean']>,
  createShippingType?: Maybe<ShippingType>,
  updateShippingType?: Maybe<Scalars['Boolean']>,
  deleteShippingType?: Maybe<Scalars['Boolean']>,
  saveManufacturedBundle?: Maybe<Scalars['Boolean']>,
  createManufacturedBundle?: Maybe<Scalars['Boolean']>,
  createPaymentType?: Maybe<TypePayments>,
  updatePaymentType?: Maybe<TypePayments>,
  deletePaymentType?: Maybe<Scalars['Boolean']>,
  createTimezone?: Maybe<TimeZoneType>,
  updateTimezone?: Maybe<Scalars['Boolean']>,
  deleteTimezone?: Maybe<Scalars['Boolean']>,
  createCreditLine?: Maybe<CreditLine>,
  updateCreditLine?: Maybe<Scalars['Boolean']>,
  deleteCreditLine?: Maybe<Scalars['Boolean']>,
  createBuyBackOrder?: Maybe<Transaction>,
  BuybackCancel?: Maybe<Scalars['Boolean']>,
  BuybackDelete?: Maybe<Scalars['Boolean']>,
  BuybackReceiving?: Maybe<Scalars['Boolean']>,
  createRMAOrder?: Maybe<Transaction>,
  updateRMAStatus?: Maybe<Transaction>,
  createReceivingRMA?: Maybe<Transaction>,
  taskMarkAsDone?: Maybe<Scalars['Boolean']>,
  taskServiceMarkAsDone?: Maybe<Array<Maybe<Scalars['String']>>>,
  taskDeviceMarkAsDone?: Maybe<Array<Maybe<Scalars['String']>>>,
  taskDeviceReOpen?: Maybe<Scalars['Boolean']>,
  technicianAssignToDevice?: Maybe<User>,
  technicianTimeLog?: Maybe<Scalars['Boolean']>,
  SetServiceItemType?: Maybe<Scalars['Boolean']>,
  SetServiceProductType?: Maybe<Scalars['Boolean']>,
  RepairRoomOrderPart?: Maybe<Scalars['Boolean']>,
  addExtraItems?: Maybe<TransactionSellLine>,
  deleteExtraItem?: Maybe<Scalars['Boolean']>,
  editExtraItem?: Maybe<TransactionSellLine>,
  createTaxRefund?: Maybe<Transaction>,
  InvoiceRefundByAmount?: Maybe<Transaction>,
  InvoiceRefundByItems?: Maybe<Transaction>,
  checkOutTicket?: Maybe<Scalars['Boolean']>,
  checkOutDevice?: Maybe<Scalars['Boolean']>,
  chequePaymentVerify?: Maybe<Scalars['Boolean']>,
  createTransactionAlert?: Maybe<Scalars['Boolean']>,
  createTransactionCustomerAlert?: Maybe<Scalars['Boolean']>,
};


export type MutationLoginArgs = {
  id: Scalars['ID'],
  password: Scalars['String']
};


export type MutationLoginWithEmailArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  businessId: Scalars['ID']
};


export type MutationUserLoginByVerificationArgs = {
  email: Scalars['String'],
  code: Scalars['String'],
  businessId: Scalars['ID'],
  method?: Maybe<AllowMethodPhoneVerify>
};


export type MutationSignupArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  first_name: Scalars['String'],
  last_name: Scalars['String']
};


export type MutationSuperAdminLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationCreateUserArgs = {
  file?: Maybe<Scalars['Upload']>,
  input?: Maybe<UserInput>
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'],
  input?: Maybe<UserUpdateInput>
};


export type MutationUpdateUserPasswordArgs = {
  id: Scalars['ID'],
  input?: Maybe<UserChangePasswordInput>
};


export type MutationUploadUserImageArgs = {
  file: Scalars['Upload'],
  user_id: Scalars['String']
};


export type MutationVerifyforgetEmailWithPhoneArgs = {
  businessName: Scalars['String'],
  phoneNumber: Scalars['String'],
  code: Scalars['String']
};


export type MutationUserForgetPasswordArgs = {
  email: Scalars['String'],
  method?: Maybe<AllowMethodPhoneVerify>
};


export type MutationVerifyuserForgetPasswordArgs = {
  code: Scalars['String'],
  email: Scalars['String'],
  method?: Maybe<AllowMethodPhoneVerify>
};


export type MutationUserPasswordResetArgs = {
  input?: Maybe<PasswordResetInput>
};


export type MutationCreateBusinessArgs = {
  input?: Maybe<BusinesInput>
};


export type MutationUdateBusinessArgs = {
  input?: Maybe<UdateBusinessInput>
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'],
  business_id: Scalars['String']
};


export type MutationCreateOtpArgs = {
  input?: Maybe<PhoneOtpInput>
};


export type MutationVerifyOtpArgs = {
  input?: Maybe<PhoneVerifyOtpInput>
};


export type MutationCreateEmailOtpArgs = {
  input?: Maybe<EmailOtpInput>
};


export type MutationVerifyEmailOtpArgs = {
  input?: Maybe<EmailVerifyOtpInput>
};


export type MutationVerifyforgetBusinessUrlArgs = {
  input?: Maybe<VerifyforgetBusinessUrlInput>
};


export type MutationCreateCurrencyArgs = {
  country: Scalars['String'],
  currency: Scalars['String'],
  code: Scalars['String'],
  symbol?: Maybe<Scalars['String']>,
  thousand_separator: Scalars['String'],
  decimal_separator: Scalars['String']
};


export type MutationCreateBusinessLocationArgs = {
  input: BusinessLocationInput
};


export type MutationUpdateBusinessLocationArgs = {
  id: Scalars['ID'],
  input: BusinessLocationInput
};


export type MutationUploadLocationImageArgs = {
  file: Scalars['Upload'],
  location_id: Scalars['String']
};


export type MutationBusinessLocationSettingsArgs = {
  _id: Scalars['ID'],
  input?: Maybe<AccountSettingInput>
};


export type MutationCreateCustomerArgs = {
  input?: Maybe<CustomerInput>
};


export type MutationUpdateCustomerArgs = {
  customer_id: Scalars['ID'],
  input?: Maybe<CustomerInput>
};


export type MutationDeleteCustomerArgs = {
  customer_id?: Maybe<Array<Maybe<Scalars['ID']>>>,
  username: Scalars['String'],
  password: Scalars['String']
};


export type MutationRestoreCustomerArgs = {
  customer_id?: Maybe<Array<Maybe<Scalars['ID']>>>
};


export type MutationImportCustomerArgs = {
  input?: Maybe<Array<Maybe<CustomerImportInput>>>
};


export type MutationCreateNetTermOfCustomerArgs = {
  input?: Maybe<CustomerNetTermInput>
};


export type MutationCreateStoreCreditArgs = {
  input?: Maybe<CustomerStoreCreditInput>
};


export type MutationCreateTransferCreditArgs = {
  input?: Maybe<CustomerTransferStoreCreditInput>
};


export type MutationLinkCustomerToStoreArgs = {
  customerID: Scalars['ID'],
  location_id: Scalars['ID']
};


export type MutationUnLinkCustomerToStoreArgs = {
  customerID: Scalars['ID'],
  location_id: Scalars['ID']
};


export type MutationMergeCustomerArgs = {
  primaryCustomerID: Scalars['ID'],
  secondaryCustomerID: Scalars['ID']
};


export type MutationMergeDevicesArgs = {
  primaryDeviceID: Scalars['ID'],
  secondaryDeviceID: Scalars['ID']
};


export type MutationTransferDeviceArgs = {
  customerID: Scalars['ID'],
  deviceID: Scalars['ID']
};


export type MutationPermanentDeleteCustomerArgs = {
  customer_id?: Maybe<Array<Scalars['ID']>>,
  location_id: Scalars['ID'],
  username: Scalars['String'],
  password: Scalars['String']
};


export type MutationUpdateCustomerPhoneNumberArgs = {
  customer_id: Scalars['ID'],
  phone?: Maybe<Scalars['String']>,
  location_id: Scalars['ID']
};


export type MutationCreateCustomerDocumentArgs = {
  input?: Maybe<CustomerDocumentInput>,
  file: Scalars['Upload']
};


export type MutationDeleteCustomerDocumentArgs = {
  _id?: Maybe<Array<Scalars['ID']>>
};


export type MutationCreateCashRegisterArgs = {
  input?: Maybe<CashRegisterInput>
};


export type MutationUpdateCashRegisterArgs = {
  id: Scalars['ID'],
  input?: Maybe<CashRegisterInput>
};


export type MutationDeleteCashRegisterArgs = {
  id: Scalars['ID']
};


export type MutationOpenAndCloseCashRegisterArgs = {
  openCashRegisterId?: Maybe<Scalars['ID']>,
  closeCashRegister?: Maybe<Scalars['ID']>,
  locationId?: Maybe<Scalars['ID']>
};


export type MutationSaveOpenCashDrawerLogArgs = {
  input?: Maybe<OpenCashDrawerInput>
};


export type MutationSaveTillCountArgs = {
  input?: Maybe<TillCountInput>
};


export type MutationCreateProductArgs = {
  input?: Maybe<ProductInput>
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID'],
  input?: Maybe<ProductInput>
};


export type MutationDeleteProductArgs = {
  productIds?: Maybe<Array<Maybe<Scalars['ID']>>>
};


export type MutationRestoreProductArgs = {
  productIds?: Maybe<Array<Maybe<Scalars['ID']>>>
};


export type MutationImportProductsDataArgs = {
  input?: Maybe<Array<Maybe<ProductImportInput>>>
};


export type MutationCreateDeviceArgs = {
  input?: Maybe<DeviceInput>
};


export type MutationDeleteDeviceArgs = {
  device_id?: Maybe<Array<Maybe<Scalars['ID']>>>
};


export type MutationUpdateDeviceArgs = {
  device_id: Scalars['ID'],
  input?: Maybe<DeviceInput>
};


export type MutationPermanentDeleteDeviceArgs = {
  device_id?: Maybe<Array<Maybe<Scalars['ID']>>>
};


export type MutationRestoreDeviceArgs = {
  device_id?: Maybe<Array<Maybe<Scalars['ID']>>>
};


export type MutationImportDevicesArgs = {
  customer_id: Scalars['ID'],
  input?: Maybe<Array<DeviceImportInput>>
};


export type MutationCreateSystemDeviceArgs = {
  input?: Maybe<SystemDeviceInput>
};


export type MutationUpdateSystemDeviceArgs = {
  id: Scalars['ID'],
  input?: Maybe<SystemDeviceInput>
};


export type MutationDeleteSystemDeviceArgs = {
  id: Scalars['ID']
};


export type MutationCreateDeviceIssuesArgs = {
  input?: Maybe<DeviceIssuesInput>
};


export type MutationCreateCustomProductArgs = {
  input?: Maybe<CustomProductInput>
};


export type MutationCreateTagArgs = {
  input?: Maybe<TagInput>
};


export type MutationSaveFileArgs = {
  file: Scalars['Upload'],
  input: FileInput
};


export type MutationDeleteFileArgs = {
  file_id: Scalars['ID']
};


export type MutationFileUploadArgs = {
  file?: Maybe<Array<Scalars['Upload']>>,
  input: InputTypefile
};


export type MutationCreateFolderArgs = {
  input?: Maybe<FolderInput>
};


export type MutationUploadFileWithoutfolderIdArgs = {
  file?: Maybe<Array<Scalars['Upload']>>,
  input: FolderInput
};


export type MutationCreateSupplierArgs = {
  input?: Maybe<SupplierInput>
};


export type MutationImportSuppliersDataArgs = {
  input?: Maybe<Array<Maybe<ImportSupplierInput>>>
};


export type MutationUpdateSupplierArgs = {
  id: Scalars['ID'],
  input?: Maybe<SupplierInput>
};


export type MutationRemovedSupplierArgs = {
  id: Scalars['ID']
};


export type MutationRemovedMultiSuppliersArgs = {
  id?: Maybe<Array<Scalars['ID']>>
};


export type MutationArchiveToActiveSupplierArgs = {
  id?: Maybe<Array<Scalars['ID']>>
};


export type MutationPermanentDeleteSupplierArgs = {
  id?: Maybe<Array<Scalars['ID']>>
};


export type MutationSupplierPaymentSettingsArgs = {
  supplier_id: Scalars['ID'],
  payment_id: Scalars['ID'],
  is_active: Scalars['Boolean']
};


export type MutationSupplierChangeBuyBackArgs = {
  _id: Scalars['ID'],
  isBuyBack: Scalars['Boolean']
};


export type MutationSupplierSortOrderArgs = {
  _id: Scalars['ID'],
  sort_order: Scalars['Int']
};


export type MutationCreateSystemSupplierArgs = {
  input?: Maybe<SystemSupplierInput>
};


export type MutationRemovedSystemSupplierArgs = {
  id: Scalars['ID']
};


export type MutationCreateTransferStoreCreditArgs = {
  input?: Maybe<SupplierTransferStoreCreditInput>
};


export type MutationCreateSupplierManageCreditArgs = {
  input?: Maybe<SupplierManageStoreCreditInput>
};


export type MutationCreateSupplierNettermArgs = {
  input?: Maybe<SupplierNettermInput>
};


export type MutationCreateDeviceCheckInsArgs = {
  file?: Maybe<Array<Maybe<Scalars['Upload']>>>,
  device_id?: Maybe<Scalars['ID']>,
  input?: Maybe<DeviceCheckInsInput>
};


export type MutationUpdateDeviceCheckInsArgs = {
  deviceCheckInID: Scalars['ID'],
  input?: Maybe<DeviceCheckInsInput>
};


export type MutationCreateTaxArgs = {
  input?: Maybe<TaxInput>
};


export type MutationUpdateTaxArgs = {
  id: Scalars['ID'],
  input?: Maybe<TaxInput>
};


export type MutationCreateBrandArgs = {
  input?: Maybe<BrandInput>
};


export type MutationUpdateBrandArgs = {
  id: Scalars['ID'],
  input?: Maybe<BrandInput>
};


export type MutationCreateSystemBrandArgs = {
  input?: Maybe<SystemBrandInput>
};


export type MutationUpdateSystemBrandArgs = {
  id: Scalars['ID'],
  input?: Maybe<SystemBrandInput>
};


export type MutationDeleteSystemBrandArgs = {
  id: Scalars['ID']
};


export type MutationCreateDiscountArgs = {
  input?: Maybe<DiscountInput>
};


export type MutationUpdateDiscountArgs = {
  id: Scalars['ID'],
  input?: Maybe<DiscountInput>
};


export type MutationDeleteDiscountArgs = {
  id: Scalars['ID']
};


export type MutationCreateCountryArgs = {
  input?: Maybe<CountryInput>
};


export type MutationCreateStateArgs = {
  input?: Maybe<StatesInput>
};


export type MutationUpdateStateArgs = {
  _id: Scalars['ID'],
  input?: Maybe<StatesInput>
};


export type MutationCreateCityArgs = {
  input?: Maybe<CityInput>
};


export type MutationUpdateCityArgs = {
  _id: Scalars['ID'],
  input?: Maybe<CityInput>
};


export type MutationCreateZipCodeRateArgs = {
  input?: Maybe<ZipCodeRateInput>
};


export type MutationUpdateZipCodeRateArgs = {
  _id: Scalars['ID'],
  input?: Maybe<ZipCodeRateInput>
};


export type MutationReadCsvArgs = {
  file: Scalars['Upload']
};


export type MutationCreatePinCodeArgs = {
  input: CreatePincodeInput
};


export type MutationUserPinCodeVerifyArgs = {
  pincode: Scalars['String']
};


export type MutationUserClockOutBeforeLogOutArgs = {
  is_check_clockIn: Scalars['Boolean']
};


export type MutationUserClockedInArgs = {
  userId: Scalars['ID'],
  userClockInPin: Scalars['ID'],
  oldClockHistoryId?: Maybe<Scalars['ID']>,
  businessLocation: Scalars['ID']
};


export type MutationUserPinCodeResendArgs = {
  password?: Maybe<Scalars['String']>,
  userID: Scalars['ID'],
  method?: Maybe<AllowMethodPhoneVerify>
};


export type MutationMakeBrainTreePaymentArgs = {
  input?: Maybe<MakeBrainTreePaymentInput>
};


export type MutationCreateCampaignArgs = {
  input?: Maybe<CampaignInput>
};


export type MutationUpdateCampaignArgs = {
  id: Scalars['ID'],
  input?: Maybe<CampaignInput>
};


export type MutationRemoveCampaignArgs = {
  id: Scalars['ID']
};


export type MutationCreateReasonArgs = {
  input?: Maybe<ReasonInput>
};


export type MutationCreateGiftCardArgs = {
  input?: Maybe<GiftCardInput>
};


export type MutationUpdateGiftCardArgs = {
  _id: Scalars['ID'],
  input?: Maybe<GiftCardInput>
};


export type MutationCreateAccountTypeArgs = {
  input?: Maybe<AccountTypeInput>
};


export type MutationUpdateAccountTypeArgs = {
  _id: Scalars['ID'],
  input?: Maybe<AccountTypeInput>
};


export type MutationCreateChartOfAccountArgs = {
  input?: Maybe<ChartOfAccountInput>
};


export type MutationUpdateChartOfAccountArgs = {
  _id: Scalars['ID'],
  input?: Maybe<ChartOfAccountInput>
};


export type MutationCreateChartOfAccountByTypeArgs = {
  input?: Maybe<ChartOfAccountInput>,
  account_type?: Maybe<Account_Type>
};


export type MutationCreateTransactionJournalArgs = {
  input?: Maybe<TransactionJournalInput>
};


export type MutationUpdateTransactionJournalArgs = {
  _id: Scalars['ID'],
  input?: Maybe<TransactionJournalInput>
};


export type MutationCreateTransactionJournalDetailArgs = {
  input?: Maybe<TransactionJournalDetailInput>
};


export type MutationUpdateTransactionJournalDetailArgs = {
  _id: Scalars['ID'],
  input?: Maybe<TransactionJournalDetailInput>
};


export type MutationCreateTrnPurchaseOrderArgs = {
  input?: Maybe<CreateTransactionPurchaseOrderInput>
};


export type MutationUpdateTrnPurchaseOrderArgs = {
  transactionId: Scalars['ID'],
  input?: Maybe<CreateTransactionPurchaseOrderInput>
};


export type MutationCreatePurchaseInvoiceArgs = {
  input?: Maybe<CreatePurchaseInvoiceInput>
};


export type MutationUpdatePurchaseInvoiceArgs = {
  transactionId: Scalars['ID'],
  input?: Maybe<CreatePurchaseInvoiceInput>
};


export type MutationCreatePurchaseOrderArgs = {
  transactionId?: Maybe<Scalars['ID']>,
  input?: Maybe<CreatePurchaseOrderInput>
};


export type MutationImportPurchaseOrderArgs = {
  input?: Maybe<ImportPo>
};


export type MutationUpdatePurchaseOrderArgs = {
  transactionId: Scalars['ID'],
  input?: Maybe<CreatePurchaseOrderInput>
};


export type MutationDeleteItemAndUpdateCartArgs = {
  transactionId: Scalars['ID'],
  input?: Maybe<CreatePurchaseOrderInput>
};


export type MutationPurchaseOrderReceivingArgs = {
  transactionId: Scalars['ID'],
  extra_Items?: Maybe<Array<Maybe<InputOrderReceivingProduct>>>,
  input?: Maybe<PurchaseOrderReceivingInput>,
  btnCaption: Scalars['String']
};


export type MutationOrderStatusUpdateArgs = {
  orderID: Scalars['ID'],
  order_status?: Maybe<Scalars['String']>,
  status_Input?: Maybe<StatusInput>
};


export type MutationPoStatusUpdateArgs = {
  orderID: Scalars['ID'],
  status_type?: Maybe<PoStatusName>
};


export type MutationPoSupplierOrderNumberArgs = {
  orderID: Scalars['ID'],
  order_number: Scalars['String']
};


export type MutationAddShippingDetailArgs = {
  orderID: Scalars['ID'],
  company_name: Scalars['String'],
  tracking_number: Scalars['String'],
  estimated_days: Scalars['String']
};


export type MutationAddAdditionalCostArgs = {
  orderID: Scalars['ID'],
  amount: Scalars['Float']
};


export type MutationPoDeleteArgs = {
  orderID: Scalars['ID']
};


export type MutationPoCancelArgs = {
  orderID: Scalars['ID'],
  refund_amount?: Maybe<Scalars['Float']>,
  refund_payment_type: RefundPaymentType,
  refund_date: Scalars['String'],
  username: Scalars['String'],
  password: Scalars['String']
};


export type MutationDeleteLogAndUpdateStockArgs = {
  orderID: Scalars['ID'],
  logID: Scalars['ID'],
  location_id: Scalars['ID']
};


export type MutationPoTransactionFlowArgs = {
  orderID: Scalars['ID']
};


export type MutationCreatePoToRmaArgs = {
  transactionId: Scalars['ID']
};


export type MutationCreateDeviceModelArgs = {
  input?: Maybe<DeviceModelInput>
};


export type MutationUpdateDeviceModelArgs = {
  id: Scalars['ID'],
  input?: Maybe<DeviceModelInput>
};


export type MutationCreatePaymentProcessArgs = {
  input?: Maybe<PaymentProcessInput>
};


export type MutationCreatePurchaseOrderpaymentArgs = {
  input?: Maybe<InputPurchaseOrderPaymentMethod>
};


export type MutationCreateNetTermPaymentArgs = {
  input?: Maybe<NetTermPaymentProcessInput>
};


export type MutationDeletePaymentArgs = {
  transactionId: Scalars['ID'],
  paymentId: Scalars['ID']
};


export type MutationCreatePaymentRefundArgs = {
  input?: Maybe<RefundInput>
};


export type MutationCreateSupplierNetTermPaymentArgs = {
  input?: Maybe<InputSupplierNetTermPayment>
};


export type MutationCreateSaleArgs = {
  orderID?: Maybe<Scalars['ID']>,
  input?: Maybe<CreateSaleInput>
};


export type MutationPayLaterInvoiceArgs = {
  location_id: Scalars['ID'],
  transactionID: Scalars['ID']
};


export type MutationCreateClientArgs = {
  input?: Maybe<ClientInput>
};


export type MutationUpdateClientArgs = {
  _id: Scalars['ID'],
  input?: Maybe<ClientInput>
};


export type MutationDeleteClientArgs = {
  _id: Scalars['ID']
};


export type MutationBulkDeleteClientArgs = {
  _id?: Maybe<Array<Scalars['ID']>>
};


export type MutationClientDocumentStatusArgs = {
  client_id: Scalars['ID'],
  document_id: Scalars['ID'],
  input?: Maybe<StatusInput>
};


export type MutationClientDocumentFileUploadArgs = {
  client_id: Scalars['ID'],
  document_id: Scalars['ID'],
  file?: Maybe<Scalars['Upload']>
};


export type MutationCreateDocumentArgs = {
  input?: Maybe<DocumentInput>,
  file?: Maybe<Scalars['Upload']>
};


export type MutationUpdateDocumentArgs = {
  _id: Scalars['ID'],
  input?: Maybe<DocumentInput>,
  file?: Maybe<Scalars['Upload']>
};


export type MutationDeleteDocumentArgs = {
  _id: Scalars['ID']
};


export type MutationCreateClientAlertArgs = {
  input?: Maybe<ClientAlertInput>
};


export type MutationUpdateClientAlertArgs = {
  _id: Scalars['ID'],
  input?: Maybe<ClientAlertInput>
};


export type MutationDeleteClientAlertArgs = {
  _id: Scalars['ID']
};


export type MutationCreateClientNoteArgs = {
  input?: Maybe<ClientNoteInput>
};


export type MutationUpdateClientNoteArgs = {
  _id: Scalars['ID'],
  input?: Maybe<ClientNoteInput>
};


export type MutationDeleteClientNoteArgs = {
  _id: Scalars['ID']
};


export type MutationCreateBusinessAdminArgs = {
  input?: Maybe<BusinessInput>
};


export type MutationUpdateBusinessAdminArgs = {
  _id: Scalars['ID'],
  input?: Maybe<BusinessInput>,
  logo?: Maybe<Scalars['String']>
};


export type MutationDeleteBusinessAdminArgs = {
  _id: Scalars['ID']
};


export type MutationStatusBusinessAdminArgs = {
  _id: Scalars['ID'],
  status: BusinessStatus
};


export type MutationOwnerPasswordUpdateArgs = {
  input: PasswordUpdateInput
};


export type MutationBusinessLogoUploadArgs = {
  business_id: Scalars['ID'],
  logo: Scalars['String']
};


export type MutationBusinessLogoDeleteArgs = {
  business_id: Scalars['ID']
};


export type MutationCreateBusinessStoreAdminArgs = {
  business_id: Scalars['ID'],
  input?: Maybe<Store>,
  logo?: Maybe<Scalars['String']>
};


export type MutationUpdateBusinessStoreAdminArgs = {
  _id: Scalars['ID'],
  business_id: Scalars['ID'],
  input?: Maybe<Store>,
  logo?: Maybe<Scalars['String']>
};


export type MutationDeleteBusinessStoreAdminArgs = {
  _id: Scalars['ID']
};


export type MutationStatusBusinessStoreAdminArgs = {
  _id: Scalars['ID'],
  status: BusinessStatus
};


export type MutationStoreLogoUploadArgs = {
  store_id: Scalars['ID'],
  logo: Scalars['String']
};


export type MutationStoreLogoDeleteArgs = {
  store_id: Scalars['ID']
};


export type MutationCreateBusinessUserArgs = {
  input: UserInput,
  logo?: Maybe<Scalars['String']>
};


export type MutationUpdateBusinessUserArgs = {
  _id: Scalars['ID'],
  input?: Maybe<UserInput>,
  logo?: Maybe<Scalars['String']>
};


export type MutationDeleteBusinessUserArgs = {
  _id: Scalars['ID']
};


export type MutationStatusBusinessUserArgs = {
  _id: Scalars['ID'],
  status: BusinessStatus
};


export type MutationUserLogoUploadArgs = {
  user_id: Scalars['ID'],
  logo: Scalars['String']
};


export type MutationUserLogoDeleteArgs = {
  user_id: Scalars['ID']
};


export type MutationMasterCodeGenerateArgs = {
  id?: Maybe<Scalars['ID']>
};


export type MutationUpdateMasterPincodeArgs = {
  id?: Maybe<Scalars['ID']>,
  code: Scalars['String']
};


export type MutationCreateDeviceTagArgs = {
  tag: Scalars['String'],
  tag_version: Scalars['String']
};


export type MutationCreateDeviceTagsArgs = {
  tags?: Maybe<Array<Scalars['String']>>
};


export type MutationDeleteDeviceTagsArgs = {
  _id: Scalars['ID']
};


export type MutationSuperAdminPasswordChangeArgs = {
  user_id: Scalars['ID'],
  oldPassword: Scalars['String'],
  newPassword: Scalars['String']
};


export type MutationDeleteSuperAdminUserArgs = {
  _id: Scalars['ID']
};


export type MutationStatusSuperAdminUserArgs = {
  _id: Scalars['ID'],
  status: BusinessStatus
};


export type MutationUpdateSuperAdminUserArgs = {
  _id: Scalars['ID'],
  input: SuperUserInput
};


export type MutationCreateSuperAdminUserArgs = {
  input: SuperUserInput,
  logo?: Maybe<Scalars['String']>
};


export type MutationSuperAdminUserLogoUploadArgs = {
  user_id: Scalars['ID'],
  logo?: Maybe<Scalars['String']>
};


export type MutationSuperAdminUserLogoDeleteArgs = {
  user_id: Scalars['ID']
};


export type MutationCreateCompanyArgs = {
  input?: Maybe<CompanyInput>
};


export type MutationUpdateCompanyArgs = {
  _id: Scalars['ID'],
  input?: Maybe<CompanyUpdateInput>
};


export type MutationCreateCompanyBusinessArgs = {
  input?: Maybe<CompanyBusinessInput>
};


export type MutationUpdateCompanyBusinessArgs = {
  _id: Scalars['ID'],
  input?: Maybe<CompanyBusinessUpdateInput>
};


export type MutationCreateStatusArgs = {
  input?: Maybe<StatusInput>
};


export type MutationCreatelimitArgs = {
  name?: Maybe<Scalars['String']>
};


export type MutationUpdateStatusArgs = {
  statusId: Scalars['ID'],
  input?: Maybe<StatusInput>
};


export type MutationDeleteStatusArgs = {
  statusId: Scalars['ID']
};


export type MutationCreateMasterCodeArgs = {
  code: Scalars['String']
};


export type MutationUpdateMasterCodeArgs = {
  id: Scalars['ID'],
  code: Scalars['String']
};


export type MutationDeleteMasterCodeArgs = {
  id: Scalars['ID']
};


export type MutationCreateShippingTypeArgs = {
  input?: Maybe<ShippingTypeInput>
};


export type MutationUpdateShippingTypeArgs = {
  id: Scalars['ID'],
  input?: Maybe<ShippingTypeInput>
};


export type MutationDeleteShippingTypeArgs = {
  id: Scalars['ID']
};


export type MutationSaveManufacturedBundleArgs = {
  input?: Maybe<Array<Maybe<BundleInput>>>
};


export type MutationCreateManufacturedBundleArgs = {
  input?: Maybe<Array<Maybe<BundleInput>>>
};


export type MutationCreatePaymentTypeArgs = {
  input?: Maybe<TypePaymentsInput>
};


export type MutationUpdatePaymentTypeArgs = {
  _id: Scalars['ID'],
  input?: Maybe<TypePaymentsInput>
};


export type MutationDeletePaymentTypeArgs = {
  _id: Scalars['ID']
};


export type MutationCreateTimezoneArgs = {
  input?: Maybe<TimeZoneInput>
};


export type MutationUpdateTimezoneArgs = {
  _id: Scalars['ID'],
  input?: Maybe<TimeZoneInput>
};


export type MutationDeleteTimezoneArgs = {
  _id: Scalars['ID']
};


export type MutationCreateCreditLineArgs = {
  input?: Maybe<CreditLineInput>
};


export type MutationUpdateCreditLineArgs = {
  creditLine_id: Scalars['ID'],
  input?: Maybe<CreditLineInput>
};


export type MutationDeleteCreditLineArgs = {
  creditLine_id: Scalars['ID']
};


export type MutationCreateBuyBackOrderArgs = {
  transactionId?: Maybe<Scalars['ID']>,
  input?: Maybe<CreateBuyBackInput>
};


export type MutationBuybackCancelArgs = {
  orderID: Scalars['ID'],
  username: Scalars['String'],
  password: Scalars['String']
};


export type MutationBuybackDeleteArgs = {
  orderID: Scalars['ID']
};


export type MutationBuybackReceivingArgs = {
  orderID: Scalars['ID'],
  input?: Maybe<ReceivingBuyBackInput>
};


export type MutationCreateRmaOrderArgs = {
  transactionId?: Maybe<Scalars['ID']>,
  input?: Maybe<CreateRmaInput>
};


export type MutationUpdateRmaStatusArgs = {
  input?: Maybe<TransactionRmaStatusInput>
};


export type MutationCreateReceivingRmaArgs = {
  input?: Maybe<TransactionReceivingRmaInput>
};


export type MutationTaskMarkAsDoneArgs = {
  transactionIDs?: Maybe<Array<Scalars['ID']>>,
  location_id: Scalars['ID']
};


export type MutationTaskServiceMarkAsDoneArgs = {
  transactionID: Scalars['ID'],
  deviceID: Scalars['ID'],
  sellID: Scalars['ID'],
  status: Scalars['String'],
  location_id: Scalars['ID']
};


export type MutationTaskDeviceMarkAsDoneArgs = {
  transactionID: Scalars['ID'],
  deviceID: Scalars['ID'],
  location_id: Scalars['ID']
};


export type MutationTaskDeviceReOpenArgs = {
  transactionID: Scalars['ID'],
  location_id: Scalars['ID'],
  inputDevice?: Maybe<Array<Maybe<DeviceServicesInput>>>
};


export type MutationTechnicianAssignToDeviceArgs = {
  transactionID: Scalars['ID'],
  deviceID: Scalars['ID'],
  technicianID: Scalars['ID'],
  location_id: Scalars['ID']
};


export type MutationTechnicianTimeLogArgs = {
  transactionID: Scalars['ID'],
  deviceID: Scalars['ID'],
  serviceID: Scalars['ID'],
  technicianID: Scalars['ID'],
  location_id: Scalars['ID'],
  log_time: Scalars['Float']
};


export type MutationSetServiceItemTypeArgs = {
  transactionID: Scalars['ID'],
  serviceID: Scalars['ID'],
  location_id: Scalars['ID'],
  service_item_type?: Maybe<ServiceItemEnum>
};


export type MutationSetServiceProductTypeArgs = {
  _id: Scalars['ID'],
  transactionID: Scalars['ID'],
  serviceID: Scalars['ID'],
  productID: Scalars['ID'],
  location_id: Scalars['ID'],
  service_item_type?: Maybe<ServiceItemEnum>,
  service_reasons: Scalars['String']
};


export type MutationRepairRoomOrderPartArgs = {
  input?: Maybe<OrderPartInput>
};


export type MutationAddExtraItemsArgs = {
  input?: Maybe<InputExtraItem>
};


export type MutationDeleteExtraItemArgs = {
  deviceID?: Maybe<Scalars['ID']>,
  transactionID?: Maybe<Scalars['ID']>,
  sellLineID?: Maybe<Scalars['ID']>,
  sellLineServiceModelID?: Maybe<Scalars['ID']>,
  isDirectDevice?: Maybe<Scalars['Boolean']>
};


export type MutationEditExtraItemArgs = {
  input?: Maybe<InputExtraItem>
};


export type MutationCreateTaxRefundArgs = {
  input?: Maybe<InputUploadTaxDocument>
};


export type MutationInvoiceRefundByAmountArgs = {
  input?: Maybe<InvoiceAmountRefundInput>
};


export type MutationInvoiceRefundByItemsArgs = {
  transactionID: Scalars['ID'],
  location_id: Scalars['ID'],
  transactionReturnItems?: Maybe<Array<Maybe<TransactionReturnItemInput>>>
};


export type MutationCheckOutTicketArgs = {
  transactionID: Scalars['ID'],
  location_id: Scalars['ID']
};


export type MutationCheckOutDeviceArgs = {
  transactionID: Scalars['ID'],
  deviceID: Scalars['ID'],
  location_id: Scalars['ID']
};


export type MutationChequePaymentVerifyArgs = {
  input?: Maybe<ChequePaymentVerifyInput>
};


export type MutationCreateTransactionAlertArgs = {
  input?: Maybe<PurchaseAlertInput>
};


export type MutationCreateTransactionCustomerAlertArgs = {
  input?: Maybe<CustomerAlertInput>
};

export type NetTerm = {
   __typename?: 'NetTerm',
  credit_limit: Scalars['Float'],
  used_credit: Scalars['Float'],
  available_credit: Scalars['Float'],
  over_dues?: Maybe<Scalars['Float']>,
};

export type NetTermLogs = {
   __typename?: 'NetTermLogs',
  User: User,
  transactionNo?: Maybe<Scalars['String']>,
  Supplier?: Maybe<Supplier>,
  Customer: Customer,
  is_increase?: Maybe<Scalars['Boolean']>,
  pay_term_number: Scalars['Int'],
  pay_term_type: Scalars['String'],
  credit_amount?: Maybe<Scalars['Float']>,
  debit_amount?: Maybe<Scalars['Float']>,
  interest_rate?: Maybe<Scalars['Float']>,
  note?: Maybe<Scalars['String']>,
  created_at: Scalars['DateTime'],
  balance: Scalars['Float'],
  BusinessLocation?: Maybe<BusinessLocation>,
  date?: Maybe<Scalars['DateTime']>,
  is_overdue?: Maybe<Scalars['Boolean']>,
};

export type NetTermOrderInput = {
  transactionId: Scalars['ID'],
  amount: Scalars['Float'],
};

export type NetTermOrders = {
   __typename?: 'netTermOrders',
  invoice_no: Scalars['String'],
  transactionId: Scalars['ID'],
  total_amount: Scalars['Float'],
  owen_amount: Scalars['Float'],
  is_over_date: Scalars['Boolean'],
  days?: Maybe<Scalars['Int']>,
  status: Scalars['String'],
  date: Scalars['DateTime'],
  amountToPay?: Maybe<Scalars['Int']>,
  remBalance?: Maybe<Scalars['Int']>,
};

export type NetTermPaymentProcessInput = {
  orders?: Maybe<Array<Maybe<NetTermOrderInput>>>,
  cashRegisterId?: Maybe<Scalars['ID']>,
  amount: Scalars['Float'],
  Customer?: Maybe<Scalars['ID']>,
  method: AllowedPaymentMethod,
  email?: Maybe<Scalars['String']>,
  nanceToken?: Maybe<Scalars['String']>,
  discount_card_code?: Maybe<Scalars['String']>,
  paid_on?: Maybe<Scalars['DateTime']>,
  card_transaction_number?: Maybe<Scalars['String']>,
  card_number?: Maybe<Scalars['String']>,
  card_type?: Maybe<Scalars['String']>,
  card_holder_name?: Maybe<Scalars['String']>,
  card_month?: Maybe<Scalars['String']>,
  card_year?: Maybe<Scalars['String']>,
  card_security?: Maybe<Scalars['String']>,
  cheque_number?: Maybe<Scalars['String']>,
  bank_account_number?: Maybe<Scalars['String']>,
  BusinessLocation: Scalars['ID'],
  paypal_transaction_id?: Maybe<Scalars['String']>,
};

export type OpenCashDrawer = {
   __typename?: 'OpenCashDrawer',
  CashRegisters?: Maybe<CashRegisters>,
  User?: Maybe<User>,
  openCashDrawerType?: Maybe<OpenCashDrawerType>,
  remarks?: Maybe<Scalars['String']>,
  amount?: Maybe<Scalars['Float']>,
  Business?: Maybe<Business>,
  BusinessLocation?: Maybe<BusinessLocation>,
  created_at?: Maybe<Scalars['DateTime']>,
};

export type OpenCashDrawerInput = {
  cashRegisterID?: Maybe<Scalars['ID']>,
  clockin_pin?: Maybe<Scalars['Int']>,
  openCashDrawerType?: Maybe<OpenCashDrawerType>,
  amount?: Maybe<Scalars['Float']>,
  remarks?: Maybe<Scalars['String']>,
  BusinessLocation?: Maybe<Scalars['ID']>,
};

export enum OpenCashDrawerType {
  Others = 'others',
  Withdraw = 'withdraw',
  Deposit = 'deposit'
}

export type OrderPartInput = {
  supplier_id: Scalars['ID'],
  product_id: Scalars['ID'],
  sku_number: Scalars['ID'],
  order_qty?: Maybe<Scalars['Int']>,
  product_price: Scalars['Float'],
  location_id: Scalars['ID'],
};

export type OrderPartSupplierType = {
   __typename?: 'OrderPartSupplierType',
  Supplier?: Maybe<Supplier>,
  sku_number?: Maybe<Scalars['String']>,
  order_qty?: Maybe<Scalars['Int']>,
  product_price?: Maybe<Scalars['Float']>,
};

export type PasswordResetInput = {
  email: Scalars['String'],
  confirmPassword: Scalars['String'],
  password: Scalars['String'],
  code: Scalars['String'],
};

export type PasswordUpdateInput = {
  userId: Scalars['ID'],
  oldPassword: Scalars['String'],
  newPassword: Scalars['String'],
  newConfirmPassword: Scalars['String'],
};

export type Payment = {
   __typename?: 'Payment',
  amount?: Maybe<Scalars['Float']>,
  method?: Maybe<Scalars['String']>,
};

export type PaymentGiftCard = {
   __typename?: 'PaymentGiftCard',
  gift_card_id?: Maybe<Scalars['ID']>,
  amount?: Maybe<Scalars['Float']>,
};

export type PaymentProcessInput = {
  transactionId: Scalars['ID'],
  cashRegisterId?: Maybe<Scalars['ID']>,
  amount: Scalars['Float'],
  method: AllowedPaymentMethod,
  email?: Maybe<Scalars['String']>,
  nanceToken?: Maybe<Scalars['String']>,
  discount_card_code?: Maybe<Scalars['String']>,
  paid_on?: Maybe<Scalars['DateTime']>,
  card_transaction_number?: Maybe<Scalars['String']>,
  card_number?: Maybe<Scalars['String']>,
  card_type?: Maybe<Scalars['String']>,
  card_holder_name?: Maybe<Scalars['String']>,
  card_month?: Maybe<Scalars['String']>,
  card_year?: Maybe<Scalars['String']>,
  card_security?: Maybe<Scalars['String']>,
  cheque_number?: Maybe<Scalars['String']>,
  bank_account_number?: Maybe<Scalars['String']>,
  gift_card_no?: Maybe<Scalars['String']>,
  BusinessLocation: Scalars['ID'],
  paypal_transaction_id?: Maybe<Scalars['String']>,
  is_extra_amount?: Maybe<Scalars['Boolean']>,
  is_add_storeCredit?: Maybe<Scalars['Boolean']>,
  return_amount?: Maybe<Scalars['Float']>,
};

export type Paypal_Invoice_Mete = {
   __typename?: 'paypal_invoice_mete',
  invoice_id?: Maybe<Scalars['String']>,
};

export type Paypal_Transaction_Mete = {
   __typename?: 'paypal_transaction_mete',
  transaction_id?: Maybe<Scalars['String']>,
  paypal_account?: Maybe<Scalars['String']>,
  create_time?: Maybe<Scalars['DateTime']>,
};

export type PhoneOtp = {
   __typename?: 'phoneOtp',
  _id?: Maybe<Scalars['String']>,
  otp_code: Scalars['String'],
  phone: Scalars['String'],
  verified: Scalars['Boolean'],
};

export type PhoneOtpInput = {
  phone: Scalars['String'],
  method?: Maybe<AllowMethodPhoneVerify>,
};

export type PhoneVerifyOtpInput = {
  phone: Scalars['String'],
  otp_code: Scalars['String'],
};

export enum PoStatusName {
  Delivered = 'Delivered',
  Canceled = 'Canceled'
}

export enum PoTransactionType {
  All = 'all',
  Purchase = 'purchase',
  Rma = 'rma',
  Buyback = 'buyback'
}

export type Product = {
   __typename?: 'Product',
  _id?: Maybe<Scalars['ID']>,
  product_name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  is_bundle_product?: Maybe<Scalars['Boolean']>,
  bundle_products?: Maybe<BundleProductInfo>,
  is_product?: Maybe<Scalars['Boolean']>,
  is_track_stock?: Maybe<Scalars['Boolean']>,
  alert_qty?: Maybe<Scalars['Int']>,
  ideal_qty?: Maybe<Scalars['Int']>,
  sell_price?: Maybe<Scalars['Float']>,
  openingStock?: Maybe<Scalars['Int']>,
  sell_price_inc_tax?: Maybe<Scalars['Float']>,
  average_cost?: Maybe<Scalars['Float']>,
  last_cost?: Maybe<Scalars['Float']>,
  Brand?: Maybe<SystemBrand>,
  DeviceModel?: Maybe<DeviceModel>,
  barcode?: Maybe<Scalars['String']>,
  sku?: Maybe<Scalars['String']>,
  compatilable_devices?: Maybe<Array<Maybe<Scalars['String']>>>,
  Suppliers?: Maybe<Array<Maybe<SupplierInfo>>>,
  Business?: Maybe<Business>,
  BusinessLocation?: Maybe<BusinessLocation>,
  tags?: Maybe<Array<Maybe<Scalars['String']>>>,
  is_serial_number?: Maybe<Scalars['Boolean']>,
  ProductStockPrice?: Maybe<Array<Maybe<ProductPrices>>>,
  sale_item?: Maybe<Scalars['Int']>,
  total_sale?: Maybe<Scalars['Float']>,
  incoming_item?: Maybe<Scalars['Int']>,
  max_bundle?: Maybe<Scalars['Float']>,
  is_completed_product?: Maybe<Scalars['Boolean']>,
  is_add_product_with_device?: Maybe<Scalars['Boolean']>,
  servicesBrandModel?: Maybe<Array<Maybe<ServicesBrandModel>>>,
  isAddedDeviceModel?: Maybe<Scalars['Boolean']>,
};

export type ProductAccount = {
   __typename?: 'ProductAccount',
  expenses?: Maybe<Array<Maybe<ChartOfAccount>>>,
  income?: Maybe<Array<Maybe<ChartOfAccount>>>,
  inventory?: Maybe<Array<Maybe<ChartOfAccount>>>,
};

export type ProductExtraItem = {
   __typename?: 'ProductExtraItem',
  supplier?: Maybe<Supplier>,
  ProductID?: Maybe<Scalars['ID']>,
  product_name?: Maybe<Scalars['String']>,
  supplier_sku?: Maybe<Scalars['String']>,
};

export type ProductImportInput = {
  product_name?: Maybe<Scalars['String']>,
  is_product?: Maybe<Scalars['Boolean']>,
  is_track_stock?: Maybe<Scalars['Boolean']>,
  sku?: Maybe<Scalars['String']>,
  ideal_qty?: Maybe<Scalars['Int']>,
  alert_qty?: Maybe<Scalars['Int']>,
  sell_price?: Maybe<Scalars['Float']>,
  average_cost?: Maybe<Scalars['Float']>,
  Brand?: Maybe<Scalars['String']>,
  DeviceModel?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  tags?: Maybe<Array<Maybe<Scalars['String']>>>,
  compatilable_devices?: Maybe<Array<Maybe<Scalars['String']>>>,
  is_serial_number?: Maybe<Scalars['Boolean']>,
  BusinessLocation: Scalars['ID'],
};

export type ProductInput = {
  is_bundle_product?: Maybe<Scalars['Boolean']>,
  product_name?: Maybe<Scalars['String']>,
  is_product?: Maybe<Scalars['Boolean']>,
  image?: Maybe<Scalars['String']>,
  is_track_stock?: Maybe<Scalars['Boolean']>,
  sku?: Maybe<Scalars['String']>,
  ideal_qty?: Maybe<Scalars['Int']>,
  alert_qty?: Maybe<Scalars['Int']>,
  opening_stock?: Maybe<Scalars['Int']>,
  Brand?: Maybe<Scalars['ID']>,
  DeviceModel?: Maybe<Scalars['ID']>,
  description?: Maybe<Scalars['String']>,
  tags?: Maybe<Array<Maybe<Scalars['String']>>>,
  compatilable_devices?: Maybe<Array<Maybe<Scalars['String']>>>,
  is_serial_number?: Maybe<Scalars['Boolean']>,
  bundle_products?: Maybe<Array<Maybe<BundleProductInfoInput>>>,
  is_manufactured_qty?: Maybe<Scalars['Boolean']>,
  total_selling_price?: Maybe<Scalars['Float']>,
  total_avg_cost?: Maybe<Scalars['Float']>,
  Suppliers?: Maybe<Array<Maybe<SupplierInfoInput>>>,
  ProductStockPrice?: Maybe<ProductPricesInput>,
  BusinessLocation?: Maybe<Scalars['ID']>,
  is_link_to_all_device?: Maybe<Scalars['Boolean']>,
  servicesBrandModels?: Maybe<Array<Maybe<InputServicesBrandModel>>>,
  isAddedDeviceModel?: Maybe<Scalars['Boolean']>,
};

export type ProductPrices = {
   __typename?: 'ProductPrices',
  _id?: Maybe<Scalars['ID']>,
  Product?: Maybe<Product>,
  ideal_quantity?: Maybe<Scalars['Float']>,
  opening_stock?: Maybe<Scalars['Float']>,
  qty_available?: Maybe<Scalars['Int']>,
  alert_quantity?: Maybe<Scalars['Int']>,
  shelf_qty?: Maybe<Scalars['Float']>,
  order_qty?: Maybe<Scalars['Float']>,
  bundle_order_qty?: Maybe<Scalars['Int']>,
  is_profit_percentage?: Maybe<Scalars['Boolean']>,
  profit_value?: Maybe<Scalars['Float']>,
  profit_amount?: Maybe<Scalars['Float']>,
  default_sell_price?: Maybe<Scalars['Float']>,
  SellTax?: Maybe<Tax>,
  is_sell_tax_percentage?: Maybe<Scalars['Boolean']>,
  sell_tax_value?: Maybe<Scalars['Float']>,
  sell_tax_amount?: Maybe<Scalars['Float']>,
  sell_price_inc_tax?: Maybe<Scalars['Float']>,
  last_cost?: Maybe<Scalars['Float']>,
  average_cost?: Maybe<Scalars['Float']>,
  discount_amount?: Maybe<Scalars['Float']>,
  price_without_bundle?: Maybe<Scalars['Float']>,
  percentage_discount?: Maybe<Scalars['Float']>,
  manage_stock?: Maybe<Array<Maybe<ManageStockSku>>>,
  total_cost?: Maybe<Scalars['Float']>,
  Business?: Maybe<Business>,
  BusinessLocation: BusinessLocation,
  income_account?: Maybe<ChartOfAccount>,
  expense_account?: Maybe<ChartOfAccount>,
  inventory_account?: Maybe<ChartOfAccount>,
  is_deleted?: Maybe<Scalars['Boolean']>,
};

export type ProductPricesInput = {
  sell_price?: Maybe<Scalars['Float']>,
  SellTax?: Maybe<Scalars['ID']>,
  sell_price_inc_tax?: Maybe<Scalars['Float']>,
  is_profit_percentage?: Maybe<Scalars['Boolean']>,
  profit_value?: Maybe<Scalars['Float']>,
  profit_amount?: Maybe<Scalars['Float']>,
  last_cost?: Maybe<Scalars['Float']>,
  average_cost?: Maybe<Scalars['Float']>,
  discount_amount?: Maybe<Scalars['Float']>,
  price_without_bundle?: Maybe<Scalars['Float']>,
  percentage_discount?: Maybe<Scalars['Float']>,
  total_cost?: Maybe<Scalars['Float']>,
  income_account: Scalars['ID'],
  expense_account?: Maybe<Scalars['ID']>,
  inventory_account?: Maybe<Scalars['ID']>,
};

export enum ProductType {
  GiftCard = 'gift_card',
  Custom = 'custom',
  Product = 'product'
}

export enum ProductTypes {
  AllProducts = 'all_products',
  Product = 'product',
  Service = 'service',
  BundleProduct = 'bundle_product',
  BundleService = 'bundle_service',
  ManufactureProduct = 'manufacture_product',
  IncompleteProduct = 'incomplete_product',
  ExtraItem = 'extra_item'
}

export type ProductWithTransaction = {
   __typename?: 'ProductWithTransaction',
  ProductList?: Maybe<Array<Maybe<Product>>>,
  Transaction?: Maybe<Transaction>,
};

export type ProgressBarData = {
   __typename?: 'progressBarData',
  Total_customer?: Maybe<Scalars['Int']>,
  effect_customer?: Maybe<Scalars['Int']>,
};

export type ProgressBarInput = {
  is_customer_since: Scalars['Boolean'],
  customer_since?: Maybe<Scalars['DateTime']>,
  is_customer_spent_amount?: Maybe<Scalars['Boolean']>,
  is_customer_more_then_said_amount?: Maybe<Scalars['Boolean']>,
  spent_amount?: Maybe<Scalars['Float']>,
  BusinessLocation?: Maybe<Scalars['ID']>,
};

export type PurchaseAlertInput = {
  transactionID: Scalars['ID'],
  transactionSellID: Scalars['ID'],
  deviceID: Scalars['ID'],
  alert_title: Scalars['String'],
  alert_message: Scalars['String'],
  alert_type: AlertTypeEnum,
  location_id: Scalars['ID'],
};

export type PurchaseHistory = {
   __typename?: 'PurchaseHistory',
  totalAmount?: Maybe<Scalars['String']>,
  avgItemPerVisit?: Maybe<Scalars['String']>,
  totalVisiter?: Maybe<Scalars['String']>,
  avgPurchase?: Maybe<Scalars['String']>,
};

export type PurchaseOrderReceivingInput = {
  transaction_type: AllowedTransactionType,
  transaction_status: AllowedTransactionStatus,
  order_status: AllowedOrdertStatus,
  sub_total_amount: Scalars['Float'],
  Tax?: Maybe<Scalars['ID']>,
  tax_amount?: Maybe<Scalars['Float']>,
  tax_value?: Maybe<Scalars['Float']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  dynamic_status_input?: Maybe<Dynamicstatus>,
  shipping_company_name?: Maybe<Scalars['String']>,
  shipping_tracking_no?: Maybe<Scalars['String']>,
  shipping_estimated_days?: Maybe<Scalars['String']>,
  ShippingType?: Maybe<Scalars['ID']>,
  total_amount: Scalars['Float'],
  Supplier: Scalars['ID'],
  transaction_keeping_unit?: Maybe<Scalars['String']>,
  received_note?: Maybe<Scalars['String']>,
  receivedBy?: Maybe<Scalars['String']>,
  receivedDate?: Maybe<Scalars['DateTime']>,
  received_additional_cost?: Maybe<Scalars['Float']>,
  TransactionPurchaseLines?: Maybe<Array<Maybe<InputOrderReceivingProduct>>>,
  BusinessLocation?: Maybe<Scalars['ID']>,
};

export type Query = {
   __typename?: 'Query',
  me?: Maybe<User>,
  checkBusiness?: Maybe<Business>,
  getUsers?: Maybe<Array<Maybe<User>>>,
  getUserByEmail?: Maybe<User>,
  getUserByID?: Maybe<User>,
  checkUserEmail?: Maybe<Scalars['Boolean']>,
  usersWithRespectToBusinesses?: Maybe<Array<Maybe<User>>>,
  removeUser?: Maybe<Scalars['Boolean']>,
  forgetEmailWithPhone?: Maybe<Scalars['Boolean']>,
  getBusinessess?: Maybe<Array<Maybe<Business>>>,
  GetBusinessByID?: Maybe<Business>,
  checkBusinessEmail?: Maybe<Business>,
  checkBusinessSystemName?: Maybe<Business>,
  checkBusinessUniqueCode?: Maybe<Business>,
  checkStoreNickName?: Maybe<Scalars['Boolean']>,
  files?: Maybe<Array<Maybe<Scalars['String']>>>,
  getGoogleMapAPIKey?: Maybe<ApiKey>,
  forgetBusinessUrl?: Maybe<Scalars['Boolean']>,
  currency?: Maybe<Array<Maybe<Currency>>>,
  userBusinessLocations?: Maybe<Array<Maybe<BusinessLocation>>>,
  BusinessLocationById?: Maybe<BusinessLocation>,
  searchBusinessLocation?: Maybe<Array<Maybe<BusinessLocation>>>,
  getCustomersWithSearch?: Maybe<CustomerSearchListing>,
  getCustomerById?: Maybe<Customer>,
  getCustomers?: Maybe<Array<Maybe<Customer>>>,
  customersByLocationId?: Maybe<Array<Maybe<Customer>>>,
  checkCustomerEmail?: Maybe<Scalars['Boolean']>,
  customerNetTerm?: Maybe<NetTerm>,
  getNetTermsLogs?: Maybe<Array<Maybe<NetTermLogs>>>,
  getStoreCreditLogs?: Maybe<Array<Maybe<StoreCredit>>>,
  getAllCustomerTags?: Maybe<Array<Maybe<Tags>>>,
  searchCustomerTags?: Maybe<Array<Maybe<Tags>>>,
  CustomerPurchaseHistory?: Maybe<CustomerPurchaseHistoryType>,
  customerNetTermRecord?: Maybe<Array<Maybe<CustomerNetTermRecordType>>>,
  getCustomerNetDetail?: Maybe<NetTerm>,
  sendCustomerDocumentByEmail?: Maybe<Scalars['Boolean']>,
  getAllCustomerDocuments?: Maybe<Array<Maybe<CustomerDocumentType>>>,
  getCashRegisters?: Maybe<Array<Maybe<CashRegisters>>>,
  getCashRegisterById?: Maybe<CashRegisters>,
  cashRegistersOfLocation?: Maybe<Array<Maybe<CashRegisters>>>,
  getTillCountLogs?: Maybe<Array<Maybe<TillCount>>>,
  getCashDrawerLogs?: Maybe<Array<Maybe<OpenCashDrawer>>>,
  products?: Maybe<Array<Maybe<Product>>>,
  getProductbyID?: Maybe<Product>,
  productsOfLocation?: Maybe<Array<Maybe<Product>>>,
  importSearchProducts?: Maybe<Array<Maybe<Product>>>,
  searchProduct?: Maybe<Array<Maybe<Product>>>,
  searchProductByTags?: Maybe<Array<Maybe<Product>>>,
  ProductsBySupplier?: Maybe<Array<Maybe<Product>>>,
  getProductsbyDevicewithSearch?: Maybe<Array<Maybe<Product>>>,
  getAllProductTags?: Maybe<Array<Maybe<Tags>>>,
  searchProductTags?: Maybe<Array<Maybe<Tags>>>,
  uniqueSkUNumberForSupplier?: Maybe<Scalars['Boolean']>,
  uniqueSKUNumberForProduct?: Maybe<Scalars['Boolean']>,
  getProductsforAddBundleProduct?: Maybe<Array<Maybe<Product>>>,
  getProductsAndSearch?: Maybe<Array<Maybe<Product>>>,
  getProductAndBundlebySupplier?: Maybe<ProductWithTransaction>,
  getProductBySupplier?: Maybe<Array<Maybe<Product>>>,
  getSupplierProductsAndSearch?: Maybe<Array<Maybe<ProductExtraItem>>>,
  getDeviceProductAndService?: Maybe<Array<Maybe<Product>>>,
  getDeviceById?: Maybe<Device>,
  getDevicesByCustomer?: Maybe<Array<Maybe<Device>>>,
  checkImeiSsnNo?: Maybe<Device>,
  getSystemDevice?: Maybe<SystemDevice>,
  getAllSystemDevices?: Maybe<Array<Maybe<SystemDevice>>>,
  getAllBrandWiseModels?: Maybe<Array<Maybe<SystemDevice>>>,
  getDeviceHistory?: Maybe<Array<Maybe<DeviceHistory>>>,
  deviceIssues?: Maybe<Array<Maybe<DeviceIssues>>>,
  deviceIssue?: Maybe<DeviceIssues>,
  customProductById?: Maybe<CustomProduct>,
  customProducts?: Maybe<Array<Maybe<CustomProduct>>>,
  tags?: Maybe<Array<Maybe<Tag>>>,
  tagsByType?: Maybe<Array<Maybe<Tag>>>,
  searchTagsByType?: Maybe<Array<Maybe<Tag>>>,
  getDirectoryWithFiles?: Maybe<Array<Maybe<Directory>>>,
  getFiles?: Maybe<Array<Maybe<SourceFile>>>,
  getfoldersWithFiles?: Maybe<Array<Maybe<Directory>>>,
  suppliers?: Maybe<Array<Maybe<Supplier>>>,
  supplierById?: Maybe<Supplier>,
  searchSupplier?: Maybe<Array<Maybe<Supplier>>>,
  checkSupplierEmailAndCompanyPhone?: Maybe<Scalars['Boolean']>,
  supplierPOList?: Maybe<SearchProductOrdersType>,
  supplierTransactionListing?: Maybe<Array<Maybe<Transaction>>>,
  supplierSummary?: Maybe<SupplierSummaryType>,
  supplierPaymentSettingList?: Maybe<Supplier>,
  suppliersCheckDuplicationData?: Maybe<TypeSuppliersImport>,
  supplierNetTerm?: Maybe<SupplierNetTermsType>,
  supplierNetTermRecord?: Maybe<Array<Maybe<SupplierNetTermRecordType>>>,
  GetSystemSuppliers?: Maybe<Array<Maybe<SystemSupplier>>>,
  searchSystemSupplier?: Maybe<Array<Maybe<SystemSupplier>>>,
  compareSupplierWithSystem?: Maybe<SystemSupplier>,
  SuppliersVerificationWithSystem?: Maybe<Array<Maybe<SupplierPostVerification>>>,
  getSupplierTransferCreditlogs?: Maybe<Array<Maybe<StoreCredit>>>,
  getSupplierNettermLogs?: Maybe<Array<Maybe<NetTermLogs>>>,
  getSupplierNetDetail?: Maybe<NetTerm>,
  getdeviceCheckIn?: Maybe<DeviceCheckIns>,
  CustomerdeviceCheckIn?: Maybe<Array<Maybe<DeviceCheckIns>>>,
  getdeviceCheckIns?: Maybe<Array<Maybe<DeviceCheckIns>>>,
  DeviceCheckInbyDeviceId?: Maybe<Array<Maybe<DeviceCheckIns>>>,
  getPreviousDeviceCheckIn?: Maybe<DeviceCheckIns>,
  taxs?: Maybe<Array<Maybe<Tax>>>,
  getTaxsByLocation?: Maybe<Array<Maybe<Tax>>>,
  taxById?: Maybe<Tax>,
  getAllBrands?: Maybe<Array<Maybe<Brand>>>,
  getBrand?: Maybe<Brand>,
  getAllSystemBrands?: Maybe<Array<Maybe<SystemBrand>>>,
  getSystemBrand?: Maybe<SystemBrand>,
  Discounts?: Maybe<Array<Maybe<Discount>>>,
  DiscountById?: Maybe<Discount>,
  DiscountsByCode?: Maybe<Discount>,
  validateDiscountByCode?: Maybe<ValidDiscount>,
  searchInDiscounts?: Maybe<Array<Maybe<Discount>>>,
  createCouponCode?: Maybe<CouponCode>,
  getDiscountsAndSearch?: Maybe<Array<Maybe<Campaign>>>,
  getAllDiscountTags?: Maybe<Array<Maybe<Tags>>>,
  searchDiscountTags?: Maybe<Array<Maybe<Tags>>>,
  effectDiscountToCustomer?: Maybe<ProgressBarData>,
  getOrdersAndSearch?: Maybe<Array<Maybe<Transaction>>>,
  orders?: Maybe<Array<Maybe<Transaction>>>,
  searchOrderByDifferentTypes?: Maybe<Array<Maybe<Transaction>>>,
  getOrderByCustomerID?: Maybe<Array<Maybe<Transaction>>>,
  getOrderByID?: Maybe<Transaction>,
  createOrderPDF?: Maybe<Transaction>,
  getCustomerPurchaseHistory?: Maybe<PurchaseHistory>,
  sendOrderSummaryBySMS?: Maybe<Scalars['Boolean']>,
  getRepairOrders?: Maybe<Array<Maybe<RepairOrder>>>,
  getRepairDevices?: Maybe<Array<Maybe<DeviceWithCount>>>,
  getRepairDeviceService?: Maybe<Array<Maybe<TransactionAssignDevice>>>,
  getNettermOrdersByCustomerID?: Maybe<Array<Maybe<NetTermOrders>>>,
  countries?: Maybe<Array<Maybe<Country>>>,
  getState?: Maybe<States>,
  getAllStates?: Maybe<Array<Maybe<States>>>,
  getCity?: Maybe<City>,
  getAllCities?: Maybe<Array<Maybe<City>>>,
  getZipCodeRate?: Maybe<ZipCodeRate>,
  getAllZipCodeRates?: Maybe<Array<Maybe<ZipCodeRate>>>,
  getCityStateTax?: Maybe<ZipCodeRate>,
  addZipCodeData?: Maybe<Scalars['Boolean']>,
  getPlaceData?: Maybe<Scalars['Boolean']>,
  getCurrencyWithUnit?: Maybe<CurrencyWithUnit>,
  getUserPinCodes?: Maybe<Array<Maybe<UserClockInPin>>>,
  getUserPinCodeById?: Maybe<UserClockInPin>,
  generatePinCode?: Maybe<Scalars['Int']>,
  uniquePinCodeVerify?: Maybe<Scalars['Boolean']>,
  getTodayCLockOfUsers?: Maybe<Array<Maybe<UserClockedHistory>>>,
  getUserClockInOutHistoryLogs?: Maybe<HistoryClocked>,
  getBrainTreeToken?: Maybe<BrainTreeToken>,
  getAllTransactionPayments?: Maybe<Array<Maybe<TransactionPayment>>>,
  TransactionPaymentsById?: Maybe<TransactionPayment>,
  getCampaigns?: Maybe<Array<Maybe<Campaign>>>,
  getCampaignswithDiscounts?: Maybe<Array<Maybe<Campaign>>>,
  campaignById?: Maybe<Campaign>,
  searchCampaigns?: Maybe<Array<Maybe<Campaign>>>,
  getReasons?: Maybe<Array<Maybe<Reason>>>,
  getGiftCardWithSearch?: Maybe<Array<Maybe<GiftCard>>>,
  GetGiftCard?: Maybe<GiftCard>,
  GetGiftCardBycardNo?: Maybe<GiftCard>,
  sendEmailGiftCard?: Maybe<Scalars['Boolean']>,
  GetAllAccountTypes?: Maybe<Array<Maybe<AccountType>>>,
  GetAccountType?: Maybe<AccountType>,
  GetAllChartOfAccounts?: Maybe<Array<Maybe<ChartOfAccount>>>,
  GetChartOfAccount?: Maybe<ChartOfAccount>,
  GetAllAccountsByType?: Maybe<Array<Maybe<ChartOfAccount>>>,
  GetAllProductAccounts?: Maybe<ProductAccount>,
  GetAllAccountTypeWise?: Maybe<Array<Maybe<ChartOfAccount>>>,
  initAccounts?: Maybe<Scalars['Boolean']>,
  GetAllTransactionJournal?: Maybe<Array<Maybe<TransactionJournal>>>,
  GetTransactionJournal?: Maybe<TransactionJournal>,
  GetAllTransactionJournalDetails?: Maybe<Array<Maybe<TransactionJournalDetail>>>,
  GetTransactionJournalDetail?: Maybe<TransactionJournalDetail>,
  GetAllTransactionPurchasePayments?: Maybe<Array<Maybe<TransactionPurchasePayment>>>,
  GetTransactionPurchasePaymentsById?: Maybe<TransactionPurchasePayment>,
  getPurchaseOrdersAndSearch?: Maybe<SearchProductOrdersType>,
  getPurchaseOrderbyID?: Maybe<Transaction>,
  GetSupplierPurchaseHistory?: Maybe<PurchaseHistory>,
  GetSupplierPurchaseOrders?: Maybe<Array<Maybe<Transaction>>>,
  GetSupplierPurchasePayments?: Maybe<Array<Maybe<TransactionPayment>>>,
  GetSupplierPurchaseBills?: Maybe<Array<Maybe<Transaction>>>,
  GetSupplierLedger?: Maybe<Array<Maybe<JournalLedger>>>,
  PaypalInvoice?: Maybe<Scalars['Boolean']>,
  isManufactureBunldeProduct?: Maybe<Scalars['Boolean']>,
  GetAllOrderStatus?: Maybe<Array<Maybe<TPstatus>>>,
  getAllDeviceModel?: Maybe<Array<Maybe<DeviceModel>>>,
  getAllDeviceModelByBrand?: Maybe<Array<Maybe<DeviceModel>>>,
  getDeviceModel?: Maybe<DeviceModel>,
  getCheckOutOrder?: Maybe<Transaction>,
  getCartData?: Maybe<CartTransaction>,
  getClient?: Maybe<Client>,
  getAllClients?: Maybe<Array<Maybe<Client>>>,
  getDocumentsByClassification?: Maybe<Array<Maybe<ClientDocument>>>,
  shareDocuments?: Maybe<Scalars['Boolean']>,
  getDocument?: Maybe<Document>,
  getAllDocuments?: Maybe<Array<Maybe<Document>>>,
  getClientAlert?: Maybe<ClientAlert>,
  getAllClientAlerts?: Maybe<Array<Maybe<ClientAlert>>>,
  getClientNote?: Maybe<ClientNote>,
  getAllClientNotes?: Maybe<Array<Maybe<ClientNote>>>,
  getBusinessAdmin?: Maybe<Business>,
  getAllBusinessAdmin?: Maybe<Array<Maybe<Business>>>,
  uniqueBusinessUrlById?: Maybe<Business>,
  uniqueBusinessEmailById?: Maybe<User>,
  uniqueBusinessById?: Maybe<Business>,
  getBusinessStoreAdmin?: Maybe<BusinessLocation>,
  getAllBusinessStoreAdmin?: Maybe<Array<Maybe<BusinessLocation>>>,
  uniqueStoreEmail?: Maybe<BusinessLocation>,
  uniqueStoreNickName?: Maybe<BusinessLocation>,
  getBusinessUser?: Maybe<User>,
  getAllBusinessUsers?: Maybe<Array<Maybe<User>>>,
  uniqueUserEmail?: Maybe<User>,
  getMasterCode?: Maybe<Array<Maybe<MasterCode>>>,
  getAllDeviceTags?: Maybe<Array<Maybe<DeviceTags>>>,
  searchDeviceTags?: Maybe<Array<Maybe<DeviceTags>>>,
  getVisitors?: Maybe<WebAnalyrics>,
  getAllSuperAdminUsers?: Maybe<Array<Maybe<User>>>,
  getSuperAdminUsers?: Maybe<User>,
  getSuperAdminProfile?: Maybe<User>,
  getCompanyDetail?: Maybe<Company>,
  getAllCompanies?: Maybe<Array<Maybe<Company>>>,
  getAllCompanyBusiness?: Maybe<Array<Maybe<Business>>>,
  getStatus?: Maybe<Array<Maybe<LabelStatus>>>,
  getStatusById?: Maybe<LabelStatus>,
  getMasterCodes?: Maybe<Array<Maybe<MasterCode>>>,
  getMasterCodeById?: Maybe<MasterCode>,
  getUsersLogsActivity?: Maybe<LogsUser>,
  getShippingType?: Maybe<ShippingType>,
  getAllShippingType?: Maybe<Array<Maybe<ShippingType>>>,
  getAchievedShippingMethods?: Maybe<Array<Maybe<ShippingType>>>,
  getAllSupplierRestock?: Maybe<Array<Maybe<Supplier>>>,
  validateManufactureQuantity?: Maybe<Scalars['Boolean']>,
  getPyamentType?: Maybe<TypePayments>,
  getAllPaymentTypes?: Maybe<Array<Maybe<TypePayments>>>,
  getTimeZones?: Maybe<Array<Maybe<TimeZoneType>>>,
  getTimezoneById?: Maybe<TimeZoneType>,
  populateTimeZones?: Maybe<Scalars['Boolean']>,
  getCreditLine?: Maybe<Array<Maybe<CreditLine>>>,
  getBrandWiseDevices?: Maybe<Array<Maybe<SystemBrand>>>,
  getRMAOrder?: Maybe<Transaction>,
  repairRoomListing?: Maybe<RepairRoomListing>,
  repairRoomInvoiceDetail?: Maybe<RepairRoomInvoiceDetail>,
  repairRoomInvoiceCheckOutDetail?: Maybe<RepairRoomInvoiceDetail>,
  repairRoomStatus?: Maybe<Array<Maybe<LabelStatus>>>,
  TechnicianList?: Maybe<Array<Maybe<User>>>,
  OrderPartSuppliers?: Maybe<Array<Maybe<OrderPartSupplierType>>>,
  getExtraItemLists?: Maybe<Array<Maybe<TransactionSellLine>>>,
  getTicketswithfilter?: Maybe<Tickets>,
  getTicketDetailById?: Maybe<Transaction>,
  emailTicket?: Maybe<Scalars['Boolean']>,
  getAllAlerts?: Maybe<Array<Maybe<Alerts>>>,
  getAllDeviceDiagnose?: Maybe<Array<Maybe<DeviceDiagnose>>>,
};


export type QueryCheckBusinessArgs = {
  business_system_name: Scalars['String']
};


export type QueryGetUsersArgs = {
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String'],
  businessId: Scalars['ID']
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']
};


export type QueryCheckUserEmailArgs = {
  email: Scalars['String']
};


export type QueryUsersWithRespectToBusinessesArgs = {
  businessId: Scalars['ID']
};


export type QueryRemoveUserArgs = {
  userId: Scalars['ID']
};


export type QueryForgetEmailWithPhoneArgs = {
  businessName: Scalars['String'],
  phoneNumber: Scalars['String']
};


export type QueryCheckBusinessEmailArgs = {
  email: Scalars['String']
};


export type QueryCheckBusinessSystemNameArgs = {
  business_system_name: Scalars['String']
};


export type QueryCheckBusinessUniqueCodeArgs = {
  unique_code: Scalars['String']
};


export type QueryCheckStoreNickNameArgs = {
  store_nick_name: Scalars['String']
};


export type QueryForgetBusinessUrlArgs = {
  input?: Maybe<ForgetBusinessInput>
};


export type QueryBusinessLocationByIdArgs = {
  businessLocationId: Scalars['ID']
};


export type QuerySearchBusinessLocationArgs = {
  search?: Maybe<Scalars['String']>
};


export type QueryGetCustomersWithSearchArgs = {
  input?: Maybe<InputSearchCustomer>
};


export type QueryGetCustomerByIdArgs = {
  id: Scalars['ID'],
  location_id: Scalars['ID']
};


export type QueryCustomersByLocationIdArgs = {
  locationId: Scalars['ID']
};


export type QueryCheckCustomerEmailArgs = {
  email: Scalars['String']
};


export type QueryCustomerNetTermArgs = {
  customerId: Scalars['ID']
};


export type QueryGetNetTermsLogsArgs = {
  customerId: Scalars['ID'],
  locationId?: Maybe<Scalars['ID']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type QueryGetStoreCreditLogsArgs = {
  customerId: Scalars['ID'],
  locationId?: Maybe<Scalars['ID']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type QuerySearchCustomerTagsArgs = {
  search?: Maybe<Scalars['String']>
};


export type QueryCustomerPurchaseHistoryArgs = {
  customerID: Scalars['ID'],
  location_id: Scalars['ID']
};


export type QueryCustomerNetTermRecordArgs = {
  customer_id: Scalars['ID'],
  location_id: Scalars['ID'],
  limit: Scalars['Int'],
  skip: Scalars['Int']
};


export type QueryGetCustomerNetDetailArgs = {
  customerId: Scalars['ID'],
  locationId?: Maybe<Scalars['ID']>
};


export type QuerySendCustomerDocumentByEmailArgs = {
  customerId: Scalars['ID'],
  documentURL: Scalars['String'],
  file_name: Scalars['String']
};


export type QueryGetAllCustomerDocumentsArgs = {
  customer_id: Scalars['ID']
};


export type QueryGetCashRegisterByIdArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryCashRegistersOfLocationArgs = {
  locationId?: Maybe<Scalars['ID']>
};


export type QueryGetTillCountLogsArgs = {
  businessLocation?: Maybe<Scalars['ID']>,
  cashRegisterID?: Maybe<Scalars['ID']>
};


export type QueryGetCashDrawerLogsArgs = {
  businessLocation?: Maybe<Scalars['ID']>,
  cashRegisterID?: Maybe<Scalars['ID']>
};


export type QueryProductsArgs = {
  locationId: Scalars['ID']
};


export type QueryGetProductbyIdArgs = {
  id?: Maybe<Scalars['ID']>,
  locationId: Scalars['ID']
};


export type QueryProductsOfLocationArgs = {
  locationId: Scalars['ID']
};


export type QueryImportSearchProductsArgs = {
  search?: Maybe<Array<Scalars['String']>>,
  locationId: Scalars['ID']
};


export type QuerySearchProductArgs = {
  search: Scalars['String'],
  locationId: Scalars['ID']
};


export type QuerySearchProductByTagsArgs = {
  search?: Maybe<Array<Scalars['ID']>>,
  locationId: Scalars['ID']
};


export type QueryProductsBySupplierArgs = {
  supplierId?: Maybe<Scalars['ID']>,
  locationId: Scalars['ID'],
  stock?: Maybe<Scalars['String']>
};


export type QueryGetProductsbyDevicewithSearchArgs = {
  input?: Maybe<InputProductsWithDevice>
};


export type QuerySearchProductTagsArgs = {
  search?: Maybe<Scalars['String']>
};


export type QueryUniqueSkUNumberForSupplierArgs = {
  locationId?: Maybe<Scalars['ID']>,
  sku_number?: Maybe<Scalars['String']>,
  supplier_id?: Maybe<Scalars['ID']>
};


export type QueryUniqueSkuNumberForProductArgs = {
  locationId?: Maybe<Scalars['ID']>,
  sku?: Maybe<Scalars['String']>
};


export type QueryGetProductsforAddBundleProductArgs = {
  locationId?: Maybe<Scalars['ID']>,
  is_service?: Maybe<Scalars['Boolean']>,
  search?: Maybe<Scalars['String']>,
  brandID?: Maybe<Scalars['ID']>,
  modelID?: Maybe<Scalars['ID']>
};


export type QueryGetProductsAndSearchArgs = {
  locationId?: Maybe<Scalars['ID']>,
  search?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  filterType?: Maybe<FilterType>,
  is_deleted?: Maybe<Scalars['Boolean']>,
  productType?: Maybe<ProductTypes>
};


export type QueryGetProductAndBundlebySupplierArgs = {
  input?: Maybe<InputSearchProductWithSuppler>
};


export type QueryGetProductBySupplierArgs = {
  input?: Maybe<InputSearchProductBySupplier>
};


export type QueryGetSupplierProductsAndSearchArgs = {
  search?: Maybe<Scalars['String']>,
  locationId?: Maybe<Scalars['ID']>
};


export type QueryGetDeviceProductAndServiceArgs = {
  deviceID: Scalars['ID'],
  location_id: Scalars['ID'],
  is_product: Scalars['Boolean']
};


export type QueryGetDeviceByIdArgs = {
  device_id: Scalars['ID']
};


export type QueryGetDevicesByCustomerArgs = {
  input?: Maybe<SearchDeviceInput>
};


export type QueryCheckImeiSsnNoArgs = {
  imei_ssn: Scalars['String']
};


export type QueryGetSystemDeviceArgs = {
  id: Scalars['ID']
};


export type QueryGetAllBrandWiseModelsArgs = {
  brand_id: Scalars['ID']
};


export type QueryGetDeviceHistoryArgs = {
  device_id: Scalars['ID'],
  location_id?: Maybe<Scalars['ID']>
};


export type QueryDeviceIssuesArgs = {
  issueType: DeviceIssuesType
};


export type QueryDeviceIssueArgs = {
  id: Scalars['ID']
};


export type QueryCustomProductByIdArgs = {
  id: Scalars['ID']
};


export type QueryTagsByTypeArgs = {
  type: Scalars['String']
};


export type QuerySearchTagsByTypeArgs = {
  type: Scalars['String'],
  search?: Maybe<Scalars['String']>
};


export type QueryGetDirectoryWithFilesArgs = {
  location_id: Scalars['ID'],
  model_type: Scalars['String'],
  model_id: Scalars['String']
};


export type QueryGetFilesArgs = {
  location_id: Scalars['ID'],
  model_type: Scalars['String'],
  model_id: Scalars['String']
};


export type QueryGetfoldersWithFilesArgs = {
  location_id: Scalars['ID'],
  model_type?: Maybe<AllowedModel>,
  model_id: Scalars['ID']
};


export type QuerySuppliersArgs = {
  location_id?: Maybe<Scalars['ID']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type QuerySupplierByIdArgs = {
  id: Scalars['ID'],
  location_id?: Maybe<Scalars['ID']>
};


export type QuerySearchSupplierArgs = {
  search: Scalars['String'],
  location_id?: Maybe<Scalars['ID']>,
  active: Scalars['String'],
  is_verify_supplier: Scalars['Boolean'],
  unlink_product: Scalars['Boolean'],
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type QueryCheckSupplierEmailAndCompanyPhoneArgs = {
  supplierField: Scalars['String'],
  type: Scalars['String']
};


export type QuerySupplierPoListArgs = {
  input?: Maybe<SupplierOrderListingInput>
};


export type QuerySupplierTransactionListingArgs = {
  supplier_id: Scalars['ID'],
  location_id: Scalars['ID'],
  transactionType: AllowedTransactionType,
  orderStatus?: Maybe<Array<Maybe<Scalars['String']>>>,
  limit: Scalars['Int'],
  skip: Scalars['Int']
};


export type QuerySupplierSummaryArgs = {
  supplier_id: Scalars['ID']
};


export type QuerySupplierPaymentSettingListArgs = {
  supplier_id: Scalars['ID']
};


export type QuerySuppliersCheckDuplicationDataArgs = {
  input?: Maybe<Array<Maybe<ImportSupplierInput>>>
};


export type QuerySupplierNetTermArgs = {
  supplier_id: Scalars['ID'],
  location_id: Scalars['ID'],
  limit: Scalars['Int'],
  skip: Scalars['Int']
};


export type QuerySupplierNetTermRecordArgs = {
  supplier_id: Scalars['ID'],
  location_id: Scalars['ID'],
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type QueryGetSystemSuppliersArgs = {
  filter: Scalars['String']
};


export type QuerySearchSystemSupplierArgs = {
  search: Scalars['String']
};


export type QueryCompareSupplierWithSystemArgs = {
  input?: Maybe<SystemSupplierInput>
};


export type QuerySuppliersVerificationWithSystemArgs = {
  input?: Maybe<Array<Maybe<SystemSupplierInput>>>
};


export type QueryGetSupplierTransferCreditlogsArgs = {
  supplierId: Scalars['ID'],
  locationId?: Maybe<Scalars['ID']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type QueryGetSupplierNettermLogsArgs = {
  supplierId: Scalars['ID'],
  locationId?: Maybe<Scalars['ID']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type QueryGetSupplierNetDetailArgs = {
  supplierId: Scalars['ID'],
  locationId?: Maybe<Scalars['ID']>
};


export type QueryGetdeviceCheckInArgs = {
  id: Scalars['ID']
};


export type QueryCustomerdeviceCheckInArgs = {
  customerId: Scalars['ID']
};


export type QueryDeviceCheckInbyDeviceIdArgs = {
  deviceID: Scalars['ID']
};


export type QueryGetPreviousDeviceCheckInArgs = {
  customerID: Scalars['ID'],
  checkINDate: Scalars['DateTime']
};


export type QueryGetTaxsByLocationArgs = {
  location_id: Scalars['ID'],
  taxType?: Maybe<TaxTypeEnum>
};


export type QueryTaxByIdArgs = {
  id: Scalars['ID']
};


export type QueryGetBrandArgs = {
  id: Scalars['ID']
};


export type QueryGetSystemBrandArgs = {
  id: Scalars['ID']
};


export type QueryDiscountsArgs = {
  limit: Scalars['Int'],
  skip: Scalars['Int']
};


export type QueryDiscountByIdArgs = {
  id: Scalars['ID']
};


export type QueryDiscountsByCodeArgs = {
  code: Scalars['ID']
};


export type QueryValidateDiscountByCodeArgs = {
  code: Scalars['ID'],
  customerId?: Maybe<Scalars['ID']>
};


export type QuerySearchInDiscountsArgs = {
  limit: Scalars['Int'],
  skip: Scalars['Int'],
  status?: Maybe<Status>,
  search?: Maybe<Scalars['String']>
};


export type QueryGetDiscountsAndSearchArgs = {
  input?: Maybe<SearchDiscountInput>
};


export type QuerySearchDiscountTagsArgs = {
  search?: Maybe<Scalars['String']>
};


export type QueryEffectDiscountToCustomerArgs = {
  input?: Maybe<ProgressBarInput>
};


export type QueryGetOrdersAndSearchArgs = {
  input?: Maybe<SearchOrderInput>
};


export type QueryOrdersArgs = {
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  locationId?: Maybe<Scalars['ID']>
};


export type QuerySearchOrderByDifferentTypesArgs = {
  search: Scalars['String'],
  type: Scalars['String'],
  locationId?: Maybe<Scalars['ID']>
};


export type QueryGetOrderByCustomerIdArgs = {
  customerID: Scalars['ID'],
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type QueryGetOrderByIdArgs = {
  orderID: Scalars['ID']
};


export type QueryCreateOrderPdfArgs = {
  orderID: Scalars['ID'],
  isEmail: Scalars['Boolean']
};


export type QueryGetCustomerPurchaseHistoryArgs = {
  customerID: Scalars['ID']
};


export type QuerySendOrderSummaryBySmsArgs = {
  orderID: Scalars['ID']
};


export type QueryGetRepairOrdersArgs = {
  locationId?: Maybe<Scalars['ID']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type QueryGetRepairDevicesArgs = {
  transactionId: Scalars['ID'],
  locationId?: Maybe<Scalars['ID']>
};


export type QueryGetRepairDeviceServiceArgs = {
  deviceId: Scalars['ID'],
  transactionId: Scalars['ID'],
  locationId?: Maybe<Scalars['ID']>
};


export type QueryGetNettermOrdersByCustomerIdArgs = {
  customerID: Scalars['ID'],
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  locationId?: Maybe<Scalars['ID']>
};


export type QueryGetStateArgs = {
  _id: Scalars['ID']
};


export type QueryGetCityArgs = {
  _id: Scalars['ID']
};


export type QueryGetZipCodeRateArgs = {
  _id: Scalars['ID']
};


export type QueryGetCityStateTaxArgs = {
  input?: Maybe<ZipCodeTaxInput>
};


export type QueryGetPlaceDataArgs = {
  placeID: Scalars['String']
};


export type QueryGetCurrencyWithUnitArgs = {
  location_id?: Maybe<Scalars['ID']>,
  cashRegisterId?: Maybe<Scalars['ID']>
};


export type QueryGetUserPinCodeByIdArgs = {
  userId: Scalars['ID']
};


export type QueryUniquePinCodeVerifyArgs = {
  pincode: Scalars['Int']
};


export type QueryGetUserClockInOutHistoryLogsArgs = {
  userId: Scalars['ID'],
  location_id: Scalars['ID'],
  fromDate?: Maybe<Scalars['String']>,
  toDate?: Maybe<Scalars['String']>
};


export type QueryTransactionPaymentsByIdArgs = {
  id: Scalars['ID']
};


export type QueryGetCampaignswithDiscountsArgs = {
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  search?: Maybe<Scalars['String']>
};


export type QueryCampaignByIdArgs = {
  id: Scalars['ID']
};


export type QuerySearchCampaignsArgs = {
  search?: Maybe<Scalars['String']>
};


export type QueryGetReasonsArgs = {
  reason_type?: Maybe<ReasonType>
};


export type QueryGetGiftCardWithSearchArgs = {
  input?: Maybe<SearchGiftCard>
};


export type QueryGetGiftCardArgs = {
  id: Scalars['ID']
};


export type QueryGetGiftCardBycardNoArgs = {
  card_no: Scalars['String'],
  BusinessLocation?: Maybe<Scalars['ID']>
};


export type QuerySendEmailGiftCardArgs = {
  id: Scalars['ID']
};


export type QueryGetAccountTypeArgs = {
  id: Scalars['ID']
};


export type QueryGetChartOfAccountArgs = {
  id: Scalars['ID']
};


export type QueryGetAllAccountsByTypeArgs = {
  _id: Scalars['ID']
};


export type QueryGetAllAccountTypeWiseArgs = {
  search?: Maybe<Scalars['String']>,
  type?: Maybe<Account_Type>
};


export type QueryInitAccountsArgs = {
  businessLocation: Scalars['ID']
};


export type QueryGetTransactionJournalArgs = {
  id: Scalars['ID']
};


export type QueryGetTransactionJournalDetailArgs = {
  id: Scalars['ID']
};


export type QueryGetTransactionPurchasePaymentsByIdArgs = {
  id: Scalars['ID']
};


export type QueryGetPurchaseOrdersAndSearchArgs = {
  input?: Maybe<SearchInput>
};


export type QueryGetPurchaseOrderbyIdArgs = {
  orderID: Scalars['ID']
};


export type QueryGetSupplierPurchaseHistoryArgs = {
  supplierID: Scalars['ID'],
  businessLocation: Scalars['ID']
};


export type QueryGetSupplierPurchaseOrdersArgs = {
  supplierID: Scalars['ID'],
  businessLocation: Scalars['ID']
};


export type QueryGetSupplierPurchasePaymentsArgs = {
  supplierID: Scalars['ID'],
  businessLocation: Scalars['ID']
};


export type QueryGetSupplierPurchaseBillsArgs = {
  supplierID: Scalars['ID'],
  businessLocation: Scalars['ID']
};


export type QueryGetSupplierLedgerArgs = {
  supplierID: Scalars['ID']
};


export type QueryPaypalInvoiceArgs = {
  invoiceID: Scalars['String']
};


export type QueryIsManufactureBunldeProductArgs = {
  location_id: Scalars['ID']
};


export type QueryGetAllDeviceModelByBrandArgs = {
  brandId: Scalars['ID']
};


export type QueryGetDeviceModelArgs = {
  id: Scalars['ID']
};


export type QueryGetCheckOutOrderArgs = {
  orderID?: Maybe<Scalars['ID']>,
  businessLocation?: Maybe<Scalars['ID']>
};


export type QueryGetCartDataArgs = {
  orderID?: Maybe<Scalars['ID']>,
  businessLocation?: Maybe<Scalars['ID']>
};


export type QueryGetClientArgs = {
  _id: Scalars['ID']
};


export type QueryGetAllClientsArgs = {
  input?: Maybe<ClientSearchInput>
};


export type QueryGetDocumentsByClassificationArgs = {
  client_id: Scalars['ID'],
  classification: ClassificationType
};


export type QueryShareDocumentsArgs = {
  input?: Maybe<ShareDocumentInput>
};


export type QueryGetDocumentArgs = {
  _id: Scalars['ID']
};


export type QueryGetAllDocumentsArgs = {
  input?: Maybe<DocumentSearchInput>
};


export type QueryGetClientAlertArgs = {
  _id: Scalars['ID']
};


export type QueryGetAllClientAlertsArgs = {
  alert_title?: Maybe<Scalars['String']>,
  client_id: Scalars['ID']
};


export type QueryGetClientNoteArgs = {
  _id: Scalars['ID']
};


export type QueryGetAllClientNotesArgs = {
  note_title?: Maybe<Scalars['String']>,
  client_id: Scalars['ID']
};


export type QueryGetBusinessAdminArgs = {
  _id: Scalars['ID']
};


export type QueryGetAllBusinessAdminArgs = {
  filter: Scalars['String']
};


export type QueryUniqueBusinessUrlByIdArgs = {
  _id: Scalars['ID'],
  business_url: Scalars['String']
};


export type QueryUniqueBusinessEmailByIdArgs = {
  user_id: Scalars['ID'],
  email: Scalars['String']
};


export type QueryUniqueBusinessByIdArgs = {
  _id: Scalars['ID'],
  business_url: Scalars['String']
};


export type QueryGetBusinessStoreAdminArgs = {
  _id: Scalars['ID']
};


export type QueryGetAllBusinessStoreAdminArgs = {
  business_id: Scalars['ID'],
  filter: Scalars['String']
};


export type QueryUniqueStoreEmailArgs = {
  store_id?: Maybe<Scalars['ID']>,
  email: Scalars['String']
};


export type QueryUniqueStoreNickNameArgs = {
  store_id?: Maybe<Scalars['ID']>,
  store_nick_name: Scalars['String']
};


export type QueryGetBusinessUserArgs = {
  _id: Scalars['ID']
};


export type QueryGetAllBusinessUsersArgs = {
  store_id: Scalars['ID'],
  filter: Scalars['String']
};


export type QueryUniqueUserEmailArgs = {
  user_id?: Maybe<Scalars['ID']>,
  email: Scalars['String']
};


export type QueryGetAllDeviceTagsArgs = {
  filter: Scalars['String']
};


export type QuerySearchDeviceTagsArgs = {
  search: Scalars['String']
};


export type QueryGetAllSuperAdminUsersArgs = {
  filter: Scalars['String']
};


export type QueryGetSuperAdminUsersArgs = {
  _id: Scalars['ID']
};


export type QueryGetCompanyDetailArgs = {
  _id: Scalars['ID']
};


export type QueryGetAllCompanyBusinessArgs = {
  company_id: Scalars['ID'],
  filter: FilterEnum,
  search?: Maybe<Scalars['String']>
};


export type QueryGetStatusArgs = {
  businessLocation?: Maybe<Scalars['ID']>,
  status_type: AllowedType
};


export type QueryGetStatusByIdArgs = {
  statusId: Scalars['ID']
};


export type QueryGetMasterCodeByIdArgs = {
  id: Scalars['ID']
};


export type QueryGetUsersLogsActivityArgs = {
  input?: Maybe<SearchUserActivityLog>
};


export type QueryGetShippingTypeArgs = {
  id: Scalars['ID']
};


export type QueryGetAllShippingTypeArgs = {
  location_id: Scalars['ID'],
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  supplierID?: Maybe<Scalars['ID']>
};


export type QueryGetAchievedShippingMethodsArgs = {
  location_id: Scalars['ID'],
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  supplierID?: Maybe<Scalars['ID']>
};


export type QueryGetAllSupplierRestockArgs = {
  location_id: Scalars['ID'],
  search?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type QueryValidateManufactureQuantityArgs = {
  location_id: Scalars['ID'],
  product_id: Scalars['ID'],
  bundle_qty?: Maybe<Scalars['Int']>
};


export type QueryGetPyamentTypeArgs = {
  _id: Scalars['ID']
};


export type QueryGetTimezoneByIdArgs = {
  _id: Scalars['ID']
};


export type QueryGetBrandWiseDevicesArgs = {
  search?: Maybe<Scalars['String']>,
  location_id: Scalars['ID'],
  transaction_id?: Maybe<Scalars['ID']>
};


export type QueryGetRmaOrderArgs = {
  transactionId?: Maybe<Scalars['ID']>
};


export type QueryRepairRoomListingArgs = {
  filter?: Maybe<RepairRoomFilter>,
  location_id: Scalars['ID'],
  limit: Scalars['Int'],
  skip: Scalars['Int']
};


export type QueryRepairRoomInvoiceDetailArgs = {
  location_id: Scalars['ID'],
  transactionID: Scalars['ID']
};


export type QueryRepairRoomInvoiceCheckOutDetailArgs = {
  location_id: Scalars['ID'],
  transactionID: Scalars['ID']
};


export type QueryTechnicianListArgs = {
  location_id: Scalars['ID']
};


export type QueryOrderPartSuppliersArgs = {
  location_id: Scalars['ID'],
  product_id: Scalars['ID'],
  search?: Maybe<Scalars['String']>
};


export type QueryGetExtraItemListsArgs = {
  deviceID?: Maybe<Scalars['ID']>,
  transactionID?: Maybe<Scalars['ID']>,
  locationID?: Maybe<Scalars['ID']>,
  sellLineID?: Maybe<Scalars['ID']>,
  isDirectDevice?: Maybe<Scalars['Boolean']>
};


export type QueryGetTicketswithfilterArgs = {
  input?: Maybe<InputTicketsFilter>
};


export type QueryGetTicketDetailByIdArgs = {
  orderID?: Maybe<Scalars['ID']>,
  businessLocation?: Maybe<Scalars['ID']>
};


export type QueryEmailTicketArgs = {
  orderID?: Maybe<Scalars['ID']>,
  businessLocation?: Maybe<Scalars['ID']>
};


export type QueryGetAllAlertsArgs = {
  location_id: Scalars['ID'],
  alert_type?: Maybe<AlertTypeEnum>
};

export enum QuickFilter {
  All = 'all',
  Discount = 'discount',
  Bundle = 'bundle',
  GiftCard = 'gift_card',
  WithOutTax = 'with_out_tax',
  PartialPayment = 'partial_payment',
  PaypalInvoice = 'paypal_invoice',
  Refund = 'refund'
}

export type Reason = {
   __typename?: 'Reason',
  _id: Scalars['ID'],
  reason_name: Scalars['String'],
  reason_type: Scalars['String'],
  Business: Business,
};

export type ReasonInput = {
  reason_name: Scalars['String'],
  reason_type: ReasonType,
};

export enum ReasonType {
  StoreCredit = 'store_credit',
  ExtraItem = 'extra_item',
  Refund = 'refund',
  RefundByItem = 'refund_by_item',
  RefundByAmount = 'refund_by_amount',
  Po = 'po',
  Defective = 'Defective',
  BuyBack = 'BuyBack',
  Damaged = 'Damaged',
  Exchange = 'Exchange'
}

export type ReceivingBuyBackInput = {
  transaction_type: AllowedTransactionType,
  transaction_status: AllowedTransactionStatus,
  order_status: AllowedOrdertStatus,
  dynamic_status: Scalars['String'],
  transaction_date: Scalars['DateTime'],
  sub_total_amount: Scalars['Float'],
  Tax?: Maybe<Scalars['ID']>,
  tax_amount?: Maybe<Scalars['Float']>,
  tax_value?: Maybe<Scalars['Float']>,
  is_tax_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  ShippingType?: Maybe<Scalars['ID']>,
  shipping_amount?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  order_estimate_amount?: Maybe<Scalars['Float']>,
  Supplier?: Maybe<Scalars['ID']>,
  TransactionBuyBackLines?: Maybe<Array<Maybe<InputBuybackReceivingLine>>>,
  BusinessLocation?: Maybe<Scalars['ID']>,
};

export type RefundInput = {
  amount?: Maybe<Scalars['Float']>,
  refundDate?: Maybe<Scalars['DateTime']>,
  transactionID?: Maybe<Scalars['ID']>,
};

export enum RefundPaymentType {
  StoreCredit = 'StoreCredit',
  OriginalMethod = 'OriginalMethod'
}

export type RepairDeviceItem = {
   __typename?: 'repairDeviceItem',
  _id?: Maybe<Scalars['ID']>,
  product_type?: Maybe<Scalars['String']>,
  sell_line_product_type?: Maybe<Scalars['String']>,
  customProduct?: Maybe<CustomProduct>,
  Product?: Maybe<AttachProduct>,
  service_status?: Maybe<LabelStatus>,
  repair_room_item_type?: Maybe<Scalars['String']>,
  time_log?: Maybe<Scalars['Int']>,
};

export type RepairDevices = {
   __typename?: 'repairDevices',
  _id?: Maybe<Scalars['ID']>,
  device?: Maybe<Device>,
  technicion?: Maybe<User>,
  device_color_pallet?: Maybe<Array<Maybe<Scalars['String']>>>,
  repair_count?: Maybe<Scalars['Int']>,
  device_total_repair_time?: Maybe<Scalars['Int']>,
  deviceItems?: Maybe<Array<Maybe<RepairDeviceItem>>>,
};

export type RepairOrder = {
   __typename?: 'RepairOrder',
  transactionId: Scalars['ID'],
  Customer: Customer,
  ref_no: Scalars['String'],
  count_devices: Scalars['String'],
};

export type RepairRoomFilter = {
  task?: Maybe<TaskEnum>,
  dateFilter?: Maybe<DateFilterEnum>,
  startDate?: Maybe<Scalars['DateTime']>,
  endDate?: Maybe<Scalars['DateTime']>,
  search?: Maybe<Scalars['String']>,
  status?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type RepairRoomInvoiceDetail = {
   __typename?: 'RepairRoomInvoiceDetail',
  Transaction?: Maybe<RepairRoomOrders>,
  Devices?: Maybe<Array<Maybe<RepairDevices>>>,
  Total?: Maybe<Scalars['Int']>,
};

export type RepairRoomListing = {
   __typename?: 'RepairRoomListing',
  total?: Maybe<Scalars['Int']>,
  repairRoomTransactions?: Maybe<Array<Maybe<RepairRoomOrders>>>,
};

export type RepairRoomOrders = {
   __typename?: 'RepairRoomOrders',
  _id?: Maybe<Scalars['ID']>,
  Customer?: Maybe<Customer>,
  repair_room_color_pallet?: Maybe<Array<Maybe<Scalars['String']>>>,
  transaction_keeping_unit?: Maybe<Scalars['String']>,
  device_count?: Maybe<Scalars['Int']>,
  total_repair_time?: Maybe<Scalars['Int']>,
  is_repair_room_customer_alert?: Maybe<Scalars['Boolean']>,
};

export type SearchDeviceInput = {
  customer_id: Scalars['ID'],
  search?: Maybe<Scalars['String']>,
  is_active?: Maybe<Scalars['Boolean']>,
  location_id?: Maybe<Scalars['ID']>,
};

export type SearchDiscountInput = {
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  BusinessLocation?: Maybe<Scalars['ID']>,
  search?: Maybe<Scalars['String']>,
  status?: Maybe<SearchStatus>,
};

export type SearchGiftCard = {
  headerFilter?: Maybe<HeaderFilter>,
  BusinessLocation?: Maybe<Scalars['ID']>,
  search?: Maybe<Scalars['String']>,
};

export type SearchInput = {
  supplierId?: Maybe<Array<Maybe<Scalars['ID']>>>,
  orderStatus?: Maybe<Array<Maybe<Scalars['String']>>>,
  search?: Maybe<Scalars['String']>,
  active?: Maybe<Scalars['String']>,
  startDate?: Maybe<Scalars['String']>,
  endDate?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  BusinessLocation?: Maybe<Scalars['ID']>,
  arrivals?: Maybe<ArrivalsFilter>,
  orderType?: Maybe<PoTransactionType>,
};

export type SearchOrderInput = {
  search?: Maybe<Scalars['String']>,
  filterType?: Maybe<FilterStatus>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  locationId?: Maybe<Scalars['ID']>,
  CustomerID?: Maybe<Scalars['ID']>,
};

export type SearchProductOrdersType = {
   __typename?: 'searchProductOrdersType',
  transaction?: Maybe<Array<Maybe<Transaction>>>,
  suppliers?: Maybe<Array<Maybe<Supplier>>>,
  available_status?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export enum SearchStatus {
  All = 'All',
  Active = 'Active',
  Scheduled = 'Scheduled',
  Expired = 'Expired'
}

export type SearchUserActivityLog = {
  userId: Scalars['ID'],
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  type: AllSearchApplication,
};

export enum SellLineProductType {
  Service = 'service',
  Product = 'product',
  BundleProduct = 'bundleProduct',
  BundleService = 'bundleService',
  ManufacturedProduct = 'manufacturedProduct',
  GiftCard = 'giftCard'
}

export type ServiceInput = {
  _id: Scalars['ID'],
};

export enum ServiceItemEnum {
  Defective = 'Defective',
  Damaged = 'Damaged',
  Exchange = 'Exchange'
}

export type ServiceProductInput = {
  serviceProductType?: Maybe<InputProductType>,
  serviceProductId?: Maybe<Scalars['ID']>,
  serviceProductSKU?: Maybe<Scalars['String']>,
  serviceProductSupplier?: Maybe<Scalars['ID']>,
  serviceProductQuantity?: Maybe<Scalars['Int']>,
  serviceProductCustomProduct?: Maybe<CustomProductInput>,
};

export type ServiceProducts = {
   __typename?: 'ServiceProducts',
  _id?: Maybe<Scalars['ID']>,
  serviceProductType?: Maybe<Scalars['String']>,
  serviceProductId?: Maybe<Product>,
  serviceProductSKU?: Maybe<Scalars['String']>,
  serviceProductSupplier?: Maybe<Scalars['ID']>,
  serviceProductQuantity?: Maybe<Scalars['Int']>,
  serviceCustomProductId?: Maybe<CustomProduct>,
  serviceReason?: Maybe<Scalars['String']>,
  serviceSerialNo?: Maybe<Scalars['String']>,
  serviceNotes?: Maybe<Scalars['String']>,
  service_repair_room_item_type?: Maybe<Scalars['String']>,
};

export type ServicesBrandModel = {
   __typename?: 'ServicesBrandModel',
  ServiceBrand?: Maybe<SystemBrand>,
  ServiceDeviceModel?: Maybe<DeviceModel>,
  service_max_price?: Maybe<Scalars['Float']>,
  service_min_price?: Maybe<Scalars['Float']>,
  ServiceItem?: Maybe<Product>,
};

export type ShareDocumentInput = {
  can_email?: Maybe<Scalars['Boolean']>,
  can_sms?: Maybe<Scalars['Boolean']>,
  can_whatsApp?: Maybe<Scalars['Boolean']>,
  clientId?: Maybe<Scalars['ID']>,
  documentId?: Maybe<Scalars['ID']>,
};

export type ShippingType = {
   __typename?: 'ShippingType',
  _id?: Maybe<Scalars['ID']>,
  shipment_name?: Maybe<Scalars['String']>,
  shipment_price?: Maybe<Scalars['Float']>,
  delivery_time_days?: Maybe<Scalars['String']>,
  threshold?: Maybe<Scalars['Float']>,
  icon?: Maybe<Scalars['String']>,
  hours?: Maybe<Scalars['String']>,
  minutes?: Maybe<Scalars['String']>,
  am_pm?: Maybe<Scalars['String']>,
  time_zone?: Maybe<Scalars['String']>,
  tracking_url?: Maybe<Scalars['String']>,
  supplierId?: Maybe<Scalars['ID']>,
  BusinessLocation?: Maybe<BusinessLocation>,
};

export type ShippingTypeInput = {
  shipment_name?: Maybe<Scalars['String']>,
  shipment_price?: Maybe<Scalars['Float']>,
  delivery_time_days?: Maybe<Scalars['String']>,
  threshold?: Maybe<Scalars['Float']>,
  icon?: Maybe<Scalars['String']>,
  hours?: Maybe<Scalars['String']>,
  minutes?: Maybe<Scalars['String']>,
  am_pm?: Maybe<Scalars['String']>,
  time_zone?: Maybe<Scalars['String']>,
  BusinessLocation?: Maybe<Scalars['ID']>,
  tracking_url?: Maybe<Scalars['String']>,
  supplierId?: Maybe<Scalars['ID']>,
};

export enum SortType {
  Date = 'date',
  Name = 'name',
  All = 'all'
}

export type SourceFile = {
   __typename?: 'SourceFile',
  _id: Scalars['ID'],
  name: Scalars['String'],
  path: Scalars['String'],
  model_type: Scalars['String'],
  model_id: Scalars['String'],
  location_id: BusinessLocation,
  created_by?: Maybe<User>,
  created_at?: Maybe<Scalars['DateTime']>,
  Directory: Directory,
};

export type States = {
   __typename?: 'States',
  _id?: Maybe<Scalars['ID']>,
  state_name?: Maybe<Scalars['String']>,
  Country?: Maybe<Country>,
};

export type StatesInput = {
  state_name: Scalars['String'],
  Country: Scalars['ID'],
};

export enum Status {
  Active = 'Active',
  Scheduled = 'Scheduled',
  Inactive = 'Inactive'
}

export type StatusInput = {
  status_name: Scalars['String'],
  status_background_color: Scalars['String'],
  status_font_color?: Maybe<Scalars['String']>,
  status_icon?: Maybe<Scalars['String']>,
  status_type: AllowedType,
  businessLocation: Scalars['ID'],
};

export type Store = {
  store_name: Scalars['String'],
  store_nick_name?: Maybe<Scalars['String']>,
  address_1: Scalars['String'],
  address_2?: Maybe<Scalars['String']>,
  state: Scalars['String'],
  city: Scalars['String'],
  zip_code: Scalars['String'],
  Country: Scalars['ID'],
  sales_tax?: Maybe<Scalars['Float']>,
  store_email?: Maybe<Scalars['String']>,
  store_phone?: Maybe<Scalars['String']>,
  provider_name?: Maybe<Scalars['String']>,
  store_legal_name?: Maybe<Scalars['String']>,
  identification_number?: Maybe<Scalars['String']>,
  identification_type?: Maybe<Scalars['String']>,
  store_type?: Maybe<AllowStoreType>,
  status?: Maybe<BusinessStatus>,
};

export type StoreCredit = {
   __typename?: 'StoreCredit',
  User: User,
  Customer?: Maybe<Customer>,
  Supplier?: Maybe<Supplier>,
  from_storeId?: Maybe<BusinessLocation>,
  to_storeId?: Maybe<BusinessLocation>,
  date?: Maybe<Scalars['DateTime']>,
  is_increase?: Maybe<Scalars['Boolean']>,
  transaction_no?: Maybe<Scalars['String']>,
  order_id?: Maybe<Scalars['String']>,
  store_credit_keeping_unit?: Maybe<Scalars['String']>,
  amount?: Maybe<Scalars['Float']>,
  balance?: Maybe<Scalars['Float']>,
  note?: Maybe<Scalars['String']>,
  reason?: Maybe<Scalars['String']>,
  created_at?: Maybe<Scalars['DateTime']>,
  BusinessLocation?: Maybe<BusinessLocation>,
};

export type StoreTypes = {
   __typename?: 'storeTypes',
  independent_repair_store?: Maybe<Scalars['Int']>,
  franchise?: Maybe<Scalars['Int']>,
  franchise_OEM?: Maybe<Scalars['Int']>,
};

export type SuperUserInput = {
  email: Scalars['String'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  phone?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  address_1?: Maybe<Scalars['String']>,
  address_2?: Maybe<Scalars['String']>,
  salaryHour?: Maybe<Scalars['Float']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['ID']>,
  zipcode?: Maybe<Scalars['String']>,
  roles?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type Supplier = {
   __typename?: 'Supplier',
  _id?: Maybe<Scalars['ID']>,
  supplier_company?: Maybe<Scalars['String']>,
  supplier_company_phone?: Maybe<Scalars['String']>,
  supplier_company_email?: Maybe<Scalars['String']>,
  website?: Maybe<Scalars['String']>,
  address_1?: Maybe<Scalars['String']>,
  address_2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  zip_code?: Maybe<Scalars['String']>,
  supplier_keeping_unit?: Maybe<Scalars['String']>,
  Country?: Maybe<Country>,
  supplier_first_name?: Maybe<Scalars['String']>,
  supplier_last_name?: Maybe<Scalars['String']>,
  supplier_phone?: Maybe<Scalars['String']>,
  supplier_mobile?: Maybe<Scalars['String']>,
  supplier_email?: Maybe<Scalars['String']>,
  BusinessLocation?: Maybe<BusinessLocation>,
  Business?: Maybe<Business>,
  Product?: Maybe<Array<Maybe<Product>>>,
  is_verify_supplier?: Maybe<Scalars['Boolean']>,
  is_buyback?: Maybe<Scalars['Boolean']>,
  payment_settings?: Maybe<Array<Maybe<SupplierPaymentSetting>>>,
  supplier_net_term?: Maybe<Array<Maybe<SupplierNetTerm>>>,
  supplier_store_credit?: Maybe<Array<Maybe<SupplierStoreCredit>>>,
  Order?: Maybe<Scalars['Int']>,
};

export type SupplierCartInfo = {
   __typename?: 'SupplierCartInfo',
  supplier_id?: Maybe<Supplier>,
  sku_number?: Maybe<Scalars['String']>,
  current_stock?: Maybe<Scalars['Int']>,
  quantity?: Maybe<Scalars['Int']>,
  product_sale_price?: Maybe<Scalars['Float']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  sub_total_amount?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  supplier_sku?: Maybe<Scalars['String']>,
};

export type SupplierimportType = {
   __typename?: 'SupplierimportType',
  supplier_company?: Maybe<Scalars['String']>,
  supplier_company_phone?: Maybe<Scalars['String']>,
  supplier_company_email?: Maybe<Scalars['String']>,
  website?: Maybe<Scalars['String']>,
  address_1?: Maybe<Scalars['String']>,
  address_2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  zip_code?: Maybe<Scalars['String']>,
  Country?: Maybe<Scalars['String']>,
  supplier_first_name?: Maybe<Scalars['String']>,
  supplier_last_name?: Maybe<Scalars['String']>,
  supplier_phone?: Maybe<Scalars['String']>,
  supplier_mobile?: Maybe<Scalars['String']>,
  supplier_email?: Maybe<Scalars['String']>,
  BusinessLocation?: Maybe<Scalars['ID']>,
  is_verify_supplier?: Maybe<Scalars['Boolean']>,
  is_buyback?: Maybe<Scalars['Boolean']>,
};

export type SupplierInfo = {
   __typename?: 'SupplierInfo',
  supplier_id?: Maybe<Supplier>,
  sku_number?: Maybe<Scalars['String']>,
  current_stock?: Maybe<Scalars['Int']>,
  incoming_item?: Maybe<Scalars['Int']>,
  instock?: Maybe<Scalars['Int']>,
  ordered_qty?: Maybe<Scalars['Int']>,
  price_purchase?: Maybe<Scalars['Float']>,
  productPrices?: Maybe<Array<Maybe<ProductPrices>>>,
};

export type SupplierInfoInput = {
  supplier_id?: Maybe<Scalars['ID']>,
  sku_number?: Maybe<Scalars['String']>,
  current_stock?: Maybe<Scalars['Int']>,
};

export type SupplierInput = {
  supplier_company: Scalars['String'],
  supplier_company_phone: Scalars['String'],
  supplier_company_email: Scalars['String'],
  website: Scalars['String'],
  address_1: Scalars['String'],
  address_2?: Maybe<Scalars['String']>,
  city: Scalars['String'],
  state: Scalars['String'],
  zip_code: Scalars['String'],
  Country: Scalars['ID'],
  supplier_first_name?: Maybe<Scalars['String']>,
  supplier_last_name?: Maybe<Scalars['String']>,
  supplier_phone?: Maybe<Scalars['String']>,
  supplier_mobile?: Maybe<Scalars['String']>,
  supplier_email?: Maybe<Scalars['String']>,
  BusinessLocation: Scalars['ID'],
  is_verify_supplier?: Maybe<Scalars['Boolean']>,
  is_buyback?: Maybe<Scalars['Boolean']>,
};

export type SupplierManageStoreCreditInput = {
  amount?: Maybe<Scalars['Float']>,
  reason?: Maybe<Scalars['String']>,
  orderId?: Maybe<Scalars['String']>,
  note: Scalars['String'],
  date?: Maybe<Scalars['DateTime']>,
  location_id: Scalars['ID'],
  supplierId?: Maybe<Scalars['ID']>,
};

export type SupplierNetTerm = {
   __typename?: 'supplierNetTerm',
  supplier_pay_term_number?: Maybe<Scalars['Int']>,
  supplier_pay_term_type?: Maybe<Scalars['String']>,
  supplier_credit_limit?: Maybe<Scalars['Float']>,
  supplier_interest_rate?: Maybe<Scalars['Float']>,
  supplier_used_credit?: Maybe<Scalars['Float']>,
  supplier_paid_credit?: Maybe<Scalars['Float']>,
  storeID?: Maybe<BusinessLocation>,
};

export type SupplierNettermInput = {
  supplierId?: Maybe<Scalars['ID']>,
  is_increase: Scalars['Boolean'],
  credit_amount: Scalars['Float'],
  days: Scalars['Int'],
  interest_rate: Scalars['Float'],
  note: Scalars['String'],
  date?: Maybe<Scalars['DateTime']>,
  location_id: Scalars['ID'],
};

export type SupplierNetTermLogType = {
   __typename?: 'SupplierNetTermLogType',
  date?: Maybe<Scalars['DateTime']>,
  day_left?: Maybe<Scalars['String']>,
  transaction_detail?: Maybe<Scalars['String']>,
  debit?: Maybe<Scalars['Float']>,
  credit?: Maybe<Scalars['Float']>,
  ledger_balance?: Maybe<Scalars['Float']>,
};

export type SupplierNetTermRecordType = {
   __typename?: 'SupplierNetTermRecordType',
  transactionID?: Maybe<Scalars['ID']>,
  date?: Maybe<Scalars['DateTime']>,
  day_left?: Maybe<Scalars['String']>,
  order_no?: Maybe<Scalars['String']>,
  total?: Maybe<Scalars['Float']>,
  amount_owed?: Maybe<Scalars['Float']>,
  amount_pay?: Maybe<Scalars['Float']>,
  balance?: Maybe<Scalars['Float']>,
  is_overdue?: Maybe<Scalars['Boolean']>,
  dynamic_status?: Maybe<TPstatus>,
};

export type SupplierNetTermsType = {
   __typename?: 'SupplierNetTermsType',
  creditLimit?: Maybe<Scalars['Float']>,
  usedCredit?: Maybe<Scalars['Float']>,
  overDue?: Maybe<Scalars['Float']>,
  supplierNetTerms?: Maybe<Array<Maybe<SupplierNetTermLogType>>>,
};

export type SupplierOrderListingInput = {
  supplier_id: Scalars['ID'],
  orderStatus?: Maybe<Array<Maybe<Scalars['String']>>>,
  search?: Maybe<Scalars['String']>,
  active?: Maybe<Scalars['String']>,
  startDate?: Maybe<Scalars['String']>,
  endDate?: Maybe<Scalars['String']>,
  limit: Scalars['Int'],
  skip: Scalars['Int'],
  location_id: Scalars['ID'],
  arrivals?: Maybe<ArrivalsFilter>,
  transactiontype: AllowedTransactionType,
};

export type SupplierPaymentSetting = {
   __typename?: 'SupplierPaymentSetting',
  paymentType?: Maybe<TypePayments>,
  isActive?: Maybe<Scalars['Boolean']>,
};

export type SupplierPostVerification = {
   __typename?: 'SupplierPostVerification',
  supplier?: Maybe<SupplierimportType>,
  postVerifyData?: Maybe<Array<Maybe<SystemSupplier>>>,
};

export type SupplierStoreCredit = {
   __typename?: 'supplierStoreCredit',
  supplier_credit_amount?: Maybe<Scalars['Float']>,
  storeLocation?: Maybe<BusinessLocation>,
};

export type SupplierSummaryType = {
   __typename?: 'SupplierSummaryType',
  total_amount_spent?: Maybe<Scalars['Float']>,
  total_number_of_po?: Maybe<Scalars['Float']>,
  average_purchase_per_order?: Maybe<Scalars['Float']>,
  average_items_per_po?: Maybe<Scalars['Float']>,
  total_number_of_rma?: Maybe<Scalars['Float']>,
  total_number_of_buyback?: Maybe<Scalars['Float']>,
  store_credits?: Maybe<Scalars['Float']>,
  net_terms?: Maybe<Scalars['Float']>,
};

export type SupplierTransferStoreCreditInput = {
  account_type?: Maybe<TypeOfAccount>,
  amount?: Maybe<Scalars['Float']>,
  storeId?: Maybe<Scalars['String']>,
  note: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  location_id: Scalars['ID'],
  supplierId?: Maybe<Scalars['ID']>,
  date?: Maybe<Scalars['DateTime']>,
};

export type SystemBrand = {
   __typename?: 'SystemBrand',
  _id?: Maybe<Scalars['ID']>,
  brand_name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  system_devices?: Maybe<Array<Maybe<SystemDevice>>>,
  BusinessLocation?: Maybe<BusinessLocation>,
  Business?: Maybe<Business>,
};

export type SystemBrandInput = {
  brand_name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  BusinessLocation?: Maybe<Scalars['ID']>,
};

export type SystemDevice = {
   __typename?: 'SystemDevice',
  _id?: Maybe<Scalars['ID']>,
  product_name?: Maybe<Scalars['String']>,
  product_price?: Maybe<Scalars['Float']>,
  quantity?: Maybe<Scalars['Int']>,
  product_brand?: Maybe<SystemBrand>,
  description?: Maybe<Scalars['String']>,
  BusinessLocation?: Maybe<BusinessLocation>,
  is_system_created?: Maybe<Scalars['Boolean']>,
};

export type SystemDeviceInput = {
  product_name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  product_price: Scalars['Float'],
  product_brand: Scalars['ID'],
  BusinessLocation?: Maybe<Scalars['ID']>,
  is_system_created?: Maybe<Scalars['Boolean']>,
};

export type SystemSupplier = {
   __typename?: 'SystemSupplier',
  _id?: Maybe<Scalars['ID']>,
  supplier_company?: Maybe<Scalars['String']>,
  supplier_company_phone?: Maybe<Scalars['String']>,
  supplier_company_email?: Maybe<Scalars['String']>,
  website?: Maybe<Scalars['String']>,
  address_1?: Maybe<Scalars['String']>,
  address_2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  zip_code?: Maybe<Scalars['String']>,
  Country?: Maybe<Country>,
  supplier_first_name?: Maybe<Scalars['String']>,
  supplier_last_name?: Maybe<Scalars['String']>,
  supplier_phone?: Maybe<Scalars['String']>,
  supplier_mobile?: Maybe<Scalars['String']>,
  supplier_email?: Maybe<Scalars['String']>,
};

export type SystemSupplierInput = {
  supplier_company: Scalars['String'],
  supplier_company_phone: Scalars['String'],
  supplier_company_email?: Maybe<Scalars['String']>,
  website?: Maybe<Scalars['String']>,
  address_1?: Maybe<Scalars['String']>,
  address_2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  zip_code?: Maybe<Scalars['String']>,
  Country?: Maybe<Scalars['ID']>,
  supplier_first_name?: Maybe<Scalars['String']>,
  supplier_last_name?: Maybe<Scalars['String']>,
  supplier_phone?: Maybe<Scalars['String']>,
  supplier_mobile?: Maybe<Scalars['String']>,
  supplier_email?: Maybe<Scalars['String']>,
  is_buyback?: Maybe<Scalars['Boolean']>,
};

export type Tag = {
   __typename?: 'Tag',
  _id: Scalars['ID'],
  name: Scalars['String'],
  slug?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  order_column?: Maybe<Scalars['String']>,
  location_id: Scalars['ID'],
  business_id: Scalars['ID'],
};

export type TagInput = {
  name: Scalars['String'],
  slug?: Maybe<Scalars['String']>,
  type: Scalars['String'],
  order_column?: Maybe<Scalars['String']>,
  location_id: Scalars['ID'],
};

export type Tags = {
   __typename?: 'Tags',
  _id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
};

export enum TaskEnum {
  All = 'all',
  My = 'my'
}

export type Tax = {
   __typename?: 'Tax',
  _id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  amount?: Maybe<Scalars['String']>,
  tax_type?: Maybe<Scalars['String']>,
  is_percentage?: Maybe<Scalars['Boolean']>,
  is_tax_group?: Maybe<Scalars['Boolean']>,
  group_tax?: Maybe<Array<Maybe<ChildTax>>>,
  BusinessLocation?: Maybe<BusinessLocation>,
  Business?: Maybe<Business>,
};

export type TaxInput = {
  name: Scalars['String'],
  amount?: Maybe<Scalars['String']>,
  tax_type?: Maybe<TaxTypeEnum>,
  is_percentage?: Maybe<Scalars['Boolean']>,
  is_tax_group: Scalars['Boolean'],
  childTax?: Maybe<Array<Maybe<ChildTaxInput>>>,
  BusinessLocation?: Maybe<Scalars['ID']>,
};

export type TaxRate = {
   __typename?: 'TaxRate',
  GST?: Maybe<Scalars['Float']>,
  HST?: Maybe<Scalars['Float']>,
  PST?: Maybe<Scalars['Float']>,
  QST?: Maybe<Scalars['Float']>,
  total?: Maybe<Scalars['Float']>,
};

export type TaxRefundDocument = {
   __typename?: 'TaxRefundDocument',
  state?: Maybe<Scalars['String']>,
  tax_certificate_id?: Maybe<Scalars['String']>,
  document_path?: Maybe<Scalars['String']>,
};

export enum TaxTypeEnum {
  SaleTax = 'sale_tax',
  PurchaseTax = 'purchase_tax'
}

export type TechnicionRepairType = {
   __typename?: 'TechnicionRepairType',
  Technicion?: Maybe<User>,
  log_time?: Maybe<Scalars['Float']>,
};

export enum Ticketfooterfilter {
  All = 'all',
  Order = 'order',
  Invoice = 'invoice',
  Quote = 'quote'
}

export type TicketLog = {
   __typename?: 'TicketLog',
  _id?: Maybe<Scalars['ID']>,
  date?: Maybe<Scalars['DateTime']>,
  remarks?: Maybe<Scalars['String']>,
};

export type Tickets = {
   __typename?: 'tickets',
  transaction?: Maybe<Array<Maybe<Transaction>>>,
  count?: Maybe<Scalars['Int']>,
};

export enum TicketSorting {
  CreatedAt = 'created_at',
  UpdatedAt = 'updated_at'
}

export type TillCount = {
   __typename?: 'TillCount',
  User?: Maybe<User>,
  CashRegisters?: Maybe<CashRegisters>,
  opening_amount?: Maybe<Scalars['Float']>,
  closing_amount?: Maybe<Scalars['Float']>,
  expected_amount?: Maybe<Scalars['Float']>,
  counted_amount?: Maybe<Scalars['Float']>,
  discrepancy?: Maybe<Scalars['Float']>,
  deposited?: Maybe<Scalars['Float']>,
  remaining_amount?: Maybe<Scalars['Float']>,
  CashDemonination?: Maybe<Array<Maybe<CashDemonination>>>,
  created_by?: Maybe<Scalars['DateTime']>,
};

export type TillCountInput = {
  cashRegisterID?: Maybe<Scalars['ID']>,
  expected_amount?: Maybe<Scalars['Float']>,
  counted_amount?: Maybe<Scalars['Float']>,
  discrepancy?: Maybe<Scalars['Float']>,
  deposited?: Maybe<Scalars['Float']>,
  remaining_amount?: Maybe<Scalars['Float']>,
  BusinessLocation?: Maybe<Scalars['ID']>,
  cashDemonination?: Maybe<Array<Maybe<CashDemoninationInput>>>,
};

export type TimeZoneInput = {
  title: Scalars['String'],
  BusinessLocation?: Maybe<Scalars['ID']>,
};

export type TimeZoneType = {
   __typename?: 'TimeZoneType',
  _id?: Maybe<Scalars['ID']>,
  title?: Maybe<Scalars['String']>,
  BusinessLocation?: Maybe<BusinessLocation>,
};

export type TPstatus = {
   __typename?: 'TPstatus',
  status_name?: Maybe<Scalars['String']>,
  status_font_color?: Maybe<Scalars['String']>,
  status_background_color?: Maybe<Scalars['String']>,
  status_icon?: Maybe<Scalars['String']>,
};

export enum TpType {
  OrderPayment = 'order_payment',
  ExtraItem = 'extra_item',
  AdditionalCost = 'additional_cost'
}

export type Transaction = {
   __typename?: 'Transaction',
  _id?: Maybe<Scalars['ID']>,
  transaction_type?: Maybe<Scalars['String']>,
  transaction_status?: Maybe<Scalars['String']>,
  order_status?: Maybe<Scalars['String']>,
  dynamic_status?: Maybe<TPstatus>,
  repire_room_status?: Maybe<TPstatus>,
  transaction_payment_status?: Maybe<Scalars['String']>,
  transaction_keeping_unit?: Maybe<Scalars['String']>,
  ref_no?: Maybe<Scalars['String']>,
  supplier_order_number?: Maybe<Scalars['String']>,
  transaction_date?: Maybe<Scalars['DateTime']>,
  transaction_hours?: Maybe<Scalars['String']>,
  transaction_minutes?: Maybe<Scalars['String']>,
  transaction_am_pm?: Maybe<Scalars['String']>,
  sub_total_amount?: Maybe<Scalars['Float']>,
  Tax?: Maybe<Tax>,
  tax_amount?: Maybe<Scalars['Float']>,
  tax_value?: Maybe<Scalars['Float']>,
  is_apply_sale_tax?: Maybe<Scalars['Boolean']>,
  is_tax_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  shipping_company_name?: Maybe<Scalars['String']>,
  shipping_tracking_no?: Maybe<Scalars['String']>,
  shipping_estimated_days?: Maybe<Scalars['String']>,
  ShippingType?: Maybe<ShippingType>,
  shipping_amount?: Maybe<Scalars['Float']>,
  delivery_address?: Maybe<Scalars['String']>,
  total_amount?: Maybe<Scalars['Float']>,
  remaining_amount?: Maybe<Scalars['Float']>,
  is_private?: Maybe<Scalars['Boolean']>,
  additional_notes?: Maybe<Scalars['String']>,
  received_note?: Maybe<Scalars['String']>,
  receivedBy?: Maybe<Scalars['String']>,
  receivedDate?: Maybe<Scalars['DateTime']>,
  arrival_Date?: Maybe<Scalars['DateTime']>,
  received_additional_cost?: Maybe<Scalars['Float']>,
  TransactionSellLine?: Maybe<Array<Maybe<TransactionSellLine>>>,
  TransactionPayment?: Maybe<Array<Maybe<TransactionPayment>>>,
  TransactionPurchaseLine?: Maybe<Array<Maybe<TransactionPurchaseLine>>>,
  TransactionBuyBackLine?: Maybe<Array<Maybe<TransactionBuyBackLine>>>,
  TransactionRMA?: Maybe<Array<Maybe<TransactionRma>>>,
  Customer?: Maybe<Customer>,
  Supplier?: Maybe<Supplier>,
  TransactionJournal?: Maybe<TransactionJournal>,
  BusinessLocation?: Maybe<BusinessLocation>,
  Business?: Maybe<Business>,
  created_by?: Maybe<User>,
  created_at?: Maybe<Scalars['DateTime']>,
  updated_by?: Maybe<User>,
  updated_at?: Maybe<Scalars['DateTime']>,
  deleted_by?: Maybe<User>,
  deleted_at?: Maybe<Scalars['DateTime']>,
  cancel_by?: Maybe<User>,
  cancel_at?: Maybe<Scalars['DateTime']>,
  supplier_rma_number?: Maybe<Scalars['String']>,
  dynamic_status_list?: Maybe<Array<Maybe<TPstatus>>>,
  is_additional_cost?: Maybe<Scalars['Boolean']>,
  is_extra_items?: Maybe<Scalars['Boolean']>,
  is_missing_items?: Maybe<Scalars['Boolean']>,
  order_estimate_amount?: Maybe<Scalars['Float']>,
  ReceivingLogs?: Maybe<Array<Maybe<TransactionReceivingLog>>>,
  refund_amount?: Maybe<Scalars['Float']>,
  tax_refund?: Maybe<TaxRefundDocument>,
  is_tax_refund?: Maybe<Scalars['Boolean']>,
  TicketLogs?: Maybe<Array<Maybe<TicketLog>>>,
  total_refund_amount?: Maybe<Scalars['Float']>,
  filter_type?: Maybe<Array<Maybe<Scalars['String']>>>,
  repair_room_color_pallet?: Maybe<Array<Maybe<Scalars['String']>>>,
  is_coupon_apply?: Maybe<Scalars['Boolean']>,
  coupon_code?: Maybe<Scalars['String']>,
  is_repair_done?: Maybe<Scalars['Boolean']>,
  is_checkout?: Maybe<Scalars['Boolean']>,
  invoice_for_repair_room?: Maybe<Scalars['Boolean']>,
};

export type TransactionAssignDevice = {
   __typename?: 'TransactionAssignDevice',
  _id?: Maybe<Scalars['ID']>,
  Transaction: Transaction,
  TransactionSellLine?: Maybe<Array<Maybe<TransactionSellLine>>>,
  Product?: Maybe<Array<Maybe<Product>>>,
  serial_number?: Maybe<Scalars['String']>,
  Device?: Maybe<Device>,
  DeviceCheckIns?: Maybe<DeviceCheckIns>,
  Customer?: Maybe<Customer>,
  BusinessLocation: BusinessLocation,
  Business: Business,
};

export type TransactionBuyBackLine = {
   __typename?: 'TransactionBuyBackLine',
  _id?: Maybe<Scalars['ID']>,
  Transaction?: Maybe<Transaction>,
  Supplier?: Maybe<Supplier>,
  System_Device?: Maybe<SystemDevice>,
  quantity?: Maybe<Scalars['Int']>,
  approve_qty?: Maybe<Scalars['Int']>,
  received_qty?: Maybe<Scalars['Int']>,
  device_price?: Maybe<Scalars['Float']>,
  sub_total?: Maybe<Scalars['Float']>,
  Tax?: Maybe<Tax>,
  tax_amount?: Maybe<Scalars['Float']>,
  tax_value?: Maybe<Scalars['Float']>,
  is_tax_percentage?: Maybe<Scalars['Boolean']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  BusinessLocation?: Maybe<BusinessLocation>,
  Business?: Maybe<Business>,
  created_at?: Maybe<Scalars['DateTime']>,
};

export type TransactionCartLine = {
   __typename?: 'TransactionCartLine',
  is_device?: Maybe<Scalars['Boolean']>,
  product_type?: Maybe<Scalars['String']>,
  sell_line_product_type?: Maybe<Scalars['String']>,
  Device?: Maybe<Device>,
  DeviceCheckIns?: Maybe<DeviceCheckIns>,
  serial_number?: Maybe<Scalars['String']>,
  products?: Maybe<Array<Maybe<AttachProduct>>>,
  _id?: Maybe<Scalars['ID']>,
  product_name?: Maybe<Scalars['String']>,
  is_bundle_product?: Maybe<Scalars['Boolean']>,
  bundle_products?: Maybe<BundleProductInfo>,
  is_product?: Maybe<Scalars['Boolean']>,
  is_track_stock?: Maybe<Scalars['Boolean']>,
  alert_qty?: Maybe<Scalars['Int']>,
  ideal_qty?: Maybe<Scalars['Int']>,
  sell_price?: Maybe<Scalars['Float']>,
  sell_price_inc_tax?: Maybe<Scalars['Float']>,
  average_cost?: Maybe<Scalars['Float']>,
  last_cost?: Maybe<Scalars['Float']>,
  Brand?: Maybe<SystemBrand>,
  DeviceModel?: Maybe<DeviceModel>,
  sku?: Maybe<Scalars['String']>,
  compatilable_devices?: Maybe<Array<Maybe<Scalars['String']>>>,
  Suppliers?: Maybe<Array<Maybe<SupplierCartInfo>>>,
  is_serial_number?: Maybe<Scalars['Boolean']>,
  ProductStockPrice?: Maybe<Array<Maybe<ProductPrices>>>,
  total_quantity?: Maybe<Scalars['Int']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  sell_line_serial_number?: Maybe<Scalars['String']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  product_sale_price?: Maybe<Scalars['Float']>,
  giftCard?: Maybe<GiftCard>,
  CustomProduct?: Maybe<CustomProduct>,
  quantity?: Maybe<Scalars['Int']>,
};

export type TransactionJournal = {
   __typename?: 'TransactionJournal',
  _id: Scalars['ID'],
  voucher_type: Array<Maybe<VoucherType>>,
  voucher_code: Scalars['String'],
  voucher_amount: Scalars['Float'],
  Businesslocation: Scalars['ID'],
  Business?: Maybe<Array<Maybe<Business>>>,
};

export type TransactionJournalDetail = {
   __typename?: 'TransactionJournalDetail',
  _id: Scalars['ID'],
  debit_amount?: Maybe<Scalars['Float']>,
  credit_amount?: Maybe<Scalars['Float']>,
  coa_account_Id?: Maybe<Array<Maybe<ChartOfAccount>>>,
  TransactionJournal?: Maybe<Array<Maybe<TransactionJournal>>>,
  remarks?: Maybe<Scalars['String']>,
  currency_Id?: Maybe<Array<Maybe<Currency>>>,
  currency_rate?: Maybe<Scalars['Float']>,
  currency_total_amount?: Maybe<Scalars['Float']>,
  currency_code?: Maybe<Scalars['String']>,
  Businesslocation?: Maybe<Array<Maybe<BusinessLocation>>>,
  Business?: Maybe<Array<Maybe<Business>>>,
};

export type TransactionJournalDetailInput = {
  debit_amount: Scalars['Float'],
  credit_amount: Scalars['Float'],
  coa_account_Id: Scalars['ID'],
  TransactionJournal: Scalars['ID'],
  remarks?: Maybe<Scalars['String']>,
  currency_Id?: Maybe<Scalars['ID']>,
  currency_rate?: Maybe<Scalars['Float']>,
  currency_total_amount?: Maybe<Scalars['Float']>,
  currency_code?: Maybe<Scalars['String']>,
  Businesslocation: Scalars['ID'],
};

export type TransactionJournalInput = {
  voucher_type: Scalars['String'],
  voucher_code: Scalars['String'],
  voucher_amount: Scalars['Float'],
  Businesslocation: Scalars['ID'],
};

export type TransactionPayment = {
   __typename?: 'TransactionPayment',
  _id: Scalars['ID'],
  amount: Scalars['Float'],
  method: Scalars['String'],
  paid_on?: Maybe<Scalars['DateTime']>,
  card_mete?: Maybe<Card_Mete>,
  card_used_no?: Maybe<Scalars['String']>,
  paypal_invoice_mete?: Maybe<Paypal_Invoice_Mete>,
  cheque_meta?: Maybe<Cheque_Meta>,
  gift_card_meta?: Maybe<PaymentGiftCard>,
  Customer?: Maybe<Customer>,
  Supplier?: Maybe<Supplier>,
  coupon_meta?: Maybe<Coupon_Meta>,
  BusinessLocation?: Maybe<BusinessLocation>,
  paypal_transaction_mete?: Maybe<Paypal_Transaction_Mete>,
  Business?: Maybe<Business>,
  Transaction?: Maybe<Transaction>,
  bank_account_number?: Maybe<Scalars['String']>,
  CashRegisters?: Maybe<CashRegisters>,
  is_paid_amount?: Maybe<Scalars['Boolean']>,
};

export type TransactionPaymentInput = {
  amount: Scalars['Float'],
  method: AllowedMethod,
  nanceToken?: Maybe<Scalars['String']>,
  discount_card_code?: Maybe<Scalars['String']>,
  paid_on?: Maybe<Scalars['DateTime']>,
  card_transaction_number?: Maybe<Scalars['String']>,
  card_number?: Maybe<Scalars['String']>,
  card_type?: Maybe<Scalars['String']>,
  card_holder_name?: Maybe<Scalars['String']>,
  card_month?: Maybe<Scalars['String']>,
  card_year?: Maybe<Scalars['String']>,
  card_security?: Maybe<Scalars['String']>,
  cheque_number?: Maybe<Scalars['String']>,
  bank_account_number?: Maybe<Scalars['String']>,
  gift_card_id?: Maybe<Scalars['ID']>,
};

export type TransactionPurchaseLine = {
   __typename?: 'TransactionPurchaseLine',
  _id?: Maybe<Scalars['ID']>,
  Transaction?: Maybe<Transaction>,
  stock_sku_number?: Maybe<Scalars['String']>,
  Supplier?: Maybe<Supplier>,
  Product?: Maybe<Product>,
  quantity?: Maybe<Scalars['Int']>,
  in_stock?: Maybe<Scalars['Int']>,
  quantity_returned?: Maybe<Scalars['Int']>,
  receive_quantity?: Maybe<Scalars['Int']>,
  receiving_quantity?: Maybe<Scalars['Int']>,
  product_cost_price?: Maybe<Scalars['Float']>,
  sub_total?: Maybe<Scalars['Float']>,
  Tax?: Maybe<Tax>,
  tax_amount?: Maybe<Scalars['Float']>,
  tax_value?: Maybe<Scalars['Float']>,
  is_tax_percentage?: Maybe<Scalars['Boolean']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  BusinessLocation?: Maybe<BusinessLocation>,
  Business?: Maybe<Business>,
  created_at?: Maybe<Scalars['DateTime']>,
  is_extra_item?: Maybe<Scalars['Boolean']>,
};

export type TransactionPurchaseOrder = {
   __typename?: 'TransactionPurchaseOrder',
  _id?: Maybe<Scalars['ID']>,
  invoice_no?: Maybe<Scalars['String']>,
  Supplier?: Maybe<Supplier>,
  sub_total_amount?: Maybe<Scalars['Float']>,
  tax_type?: Maybe<Scalars['String']>,
  tax_amount?: Maybe<Scalars['Float']>,
  discount_type?: Maybe<Scalars['String']>,
  discount_amount?: Maybe<Scalars['Float']>,
  additional_cost?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  notes?: Maybe<Scalars['String']>,
  transaction_type?: Maybe<AllowedTransactionType>,
  transaction_status?: Maybe<AllowedOrderstStatus>,
  PO_date?: Maybe<Scalars['DateTime']>,
  Expected_on?: Maybe<Scalars['DateTime']>,
  TransactionPurchaseOrdersLines?: Maybe<Array<Maybe<TransactionPurchaseOrderLine>>>,
  transaction_payment_status: AllowedTransactionPaymentStatus,
  TransactionPurchasePayment?: Maybe<Array<Maybe<TransactionPurchasePayment>>>,
  BusinessLocation?: Maybe<BusinessLocation>,
  Business?: Maybe<Business>,
};

export type TransactionPurchaseOrderLine = {
   __typename?: 'TransactionPurchaseOrderLine',
  _id?: Maybe<Scalars['String']>,
  TransactionPurchaseOrder?: Maybe<TransactionPurchaseOrder>,
  quantity: Scalars['Int'],
  Product?: Maybe<Product>,
  receive_quantity?: Maybe<Scalars['Int']>,
  product_price: Scalars['Float'],
  product_sub_total: Scalars['Float'],
  Tax?: Maybe<Scalars['ID']>,
  tax_type?: Maybe<Scalars['String']>,
  tax_amount?: Maybe<Scalars['Float']>,
  discount_type?: Maybe<Scalars['String']>,
  discount_amount?: Maybe<Scalars['Float']>,
  notes?: Maybe<Scalars['String']>,
  product_total_amount: Scalars['Float'],
};

export type TransactionPurchasePayment = {
   __typename?: 'TransactionPurchasePayment',
  _id: Scalars['ID'],
  amount: Scalars['Float'],
  method: AllowedMethod,
  paid_on?: Maybe<Scalars['DateTime']>,
  card_transaction_number?: Maybe<Scalars['String']>,
  card_number?: Maybe<Scalars['String']>,
  card_type?: Maybe<Scalars['String']>,
  card_holder_name?: Maybe<Scalars['String']>,
  card_month?: Maybe<Scalars['String']>,
  card_year?: Maybe<Scalars['String']>,
  card_security?: Maybe<Scalars['String']>,
  cheque_number?: Maybe<Scalars['String']>,
  bank_account_number?: Maybe<Scalars['String']>,
  TransactionPurchaseOrder?: Maybe<TransactionPurchaseOrder>,
  Supplier?: Maybe<Supplier>,
  BusinessLocation?: Maybe<BusinessLocation>,
  Business?: Maybe<Business>,
};

export type TransactionPurchasePaymentInput = {
  amount: Scalars['Float'],
  method: AllowedMethod,
  nanceToken?: Maybe<Scalars['String']>,
  discount_card_code?: Maybe<Scalars['String']>,
  paid_on?: Maybe<Scalars['DateTime']>,
  card_transaction_number?: Maybe<Scalars['String']>,
  card_number?: Maybe<Scalars['String']>,
  card_type?: Maybe<Scalars['String']>,
  card_holder_name?: Maybe<Scalars['String']>,
  card_month?: Maybe<Scalars['String']>,
  card_year?: Maybe<Scalars['String']>,
  card_security?: Maybe<Scalars['String']>,
  cheque_number?: Maybe<Scalars['String']>,
  bank_account_number?: Maybe<Scalars['String']>,
  TransactionPurchaseOrder?: Maybe<Scalars['ID']>,
};

export type TransactionReceivingLog = {
   __typename?: 'TransactionReceivingLog',
  _id?: Maybe<Scalars['ID']>,
  TransactionPurchaseOrder?: Maybe<Transaction>,
  stock_sku_number?: Maybe<Scalars['String']>,
  Supplier?: Maybe<Supplier>,
  Product?: Maybe<Product>,
  quantity?: Maybe<Scalars['Int']>,
  quantity_returned?: Maybe<Scalars['Int']>,
  receive_quantity?: Maybe<Scalars['Int']>,
  product_price?: Maybe<Scalars['Float']>,
  product_sub_total?: Maybe<Scalars['Float']>,
  Tax?: Maybe<Tax>,
  tax_amount?: Maybe<Scalars['Float']>,
  tax_value?: Maybe<Scalars['Float']>,
  is_tax_percentage?: Maybe<Scalars['Boolean']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  product_total_amount?: Maybe<Scalars['Float']>,
  receivedDate?: Maybe<Scalars['DateTime']>,
};

export type TransactionReceivingRmaInput = {
  transactionId?: Maybe<Scalars['ID']>,
  estimated_amount?: Maybe<Scalars['Float']>,
  actual_amount?: Maybe<Scalars['Float']>,
  TransactionItemRMA?: Maybe<Array<Maybe<ItemReceivingRmaInput>>>,
};

export type TransactionReturnItemInput = {
  TransactionSellID: Scalars['ID'],
  Product: Scalars['ID'],
  sku_number: Scalars['String'],
  unit_price: Scalars['Float'],
  return_qty: Scalars['Int'],
  return_reason: Scalars['String'],
  stock_qty: Scalars['Int'],
  total: Scalars['Float'],
};

export type TransactionRma = {
   __typename?: 'TransactionRMA',
  _id?: Maybe<Scalars['ID']>,
  Transaction?: Maybe<Transaction>,
  Supplier?: Maybe<Supplier>,
  Product?: Maybe<Product>,
  skuNo?: Maybe<Scalars['String']>,
  rma_quantity?: Maybe<Scalars['Int']>,
  receiving_quantity?: Maybe<Scalars['Int']>,
  approved_quantity?: Maybe<Scalars['Int']>,
  productCostPrice?: Maybe<Scalars['Float']>,
  sub_total?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  BusinessLocation?: Maybe<BusinessLocation>,
  Business?: Maybe<Business>,
  created_at?: Maybe<Scalars['DateTime']>,
};

export type TransactionRmaInput = {
  Product?: Maybe<Scalars['ID']>,
  skuNo?: Maybe<Scalars['String']>,
  rma_quantity?: Maybe<Scalars['Int']>,
  productCostPrice?: Maybe<Scalars['Float']>,
  sub_total?: Maybe<Scalars['Float']>,
  totalAmount?: Maybe<Scalars['Float']>,
};

export type TransactionRmaStatusInput = {
  transactionId?: Maybe<Scalars['ID']>,
  assign_status?: Maybe<AssignRmaStatus>,
  is_add_supplier_rma: Scalars['Boolean'],
  supplier_rma_number?: Maybe<Scalars['String']>,
  shipping_company?: Maybe<Scalars['String']>,
  tracking_number?: Maybe<Scalars['String']>,
  estimated_date?: Maybe<Scalars['DateTime']>,
  username?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
};

export type TransactionSellLine = {
   __typename?: 'TransactionSellLine',
  _id?: Maybe<Scalars['ID']>,
  is_attach_device?: Maybe<Scalars['Boolean']>,
  is_device?: Maybe<Scalars['Boolean']>,
  product_type?: Maybe<Scalars['String']>,
  sell_line_product_type?: Maybe<Scalars['String']>,
  Transaction?: Maybe<Transaction>,
  Product?: Maybe<Product>,
  product_sku?: Maybe<Scalars['String']>,
  supplier_sku?: Maybe<Scalars['String']>,
  products?: Maybe<Array<Maybe<AssignedProducts>>>,
  GiftCard?: Maybe<GiftCard>,
  customProduct?: Maybe<CustomProduct>,
  quantity?: Maybe<Scalars['Int']>,
  product_purchase_price?: Maybe<Scalars['Float']>,
  product_sale_price?: Maybe<Scalars['Float']>,
  Tax?: Maybe<Tax>,
  tax_amount?: Maybe<Scalars['Float']>,
  tax_value?: Maybe<Scalars['Float']>,
  is_tax_percentage?: Maybe<Scalars['Boolean']>,
  is_discount_percentage?: Maybe<Scalars['Boolean']>,
  discount_amount?: Maybe<Scalars['Float']>,
  discount_value?: Maybe<Scalars['Float']>,
  sub_total_amount?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  Device?: Maybe<Device>,
  DeviceCheckIns?: Maybe<Scalars['ID']>,
  serial_number?: Maybe<Scalars['String']>,
  return_quantity?: Maybe<Scalars['Int']>,
  back_to_stock?: Maybe<Scalars['Int']>,
  reason?: Maybe<Scalars['String']>,
  is_refund_item?: Maybe<Scalars['Boolean']>,
  is_extra_item?: Maybe<Scalars['Boolean']>,
  Supplier?: Maybe<Supplier>,
  repair_room_item_type?: Maybe<Scalars['String']>,
  serviceProduct?: Maybe<Array<Maybe<ServiceProducts>>>,
  ServiceBrand?: Maybe<SystemBrand>,
  ServiceDeviceModel?: Maybe<DeviceModel>,
};

export type TransactionServiceType = {
   __typename?: 'TransactionServiceType',
  TransactionService?: Maybe<TransactionSellLine>,
  technicionRepair?: Maybe<TechnicionRepairType>,
};

export type TrnPurchaseInvoice = {
   __typename?: 'TrnPurchaseInvoice',
  _id?: Maybe<Scalars['ID']>,
  invoice_no?: Maybe<Scalars['String']>,
  Supplier?: Maybe<Supplier>,
  sub_total_amount?: Maybe<Scalars['Float']>,
  tax_type?: Maybe<Scalars['String']>,
  tax_amount?: Maybe<Scalars['Float']>,
  discount_type?: Maybe<Scalars['String']>,
  discount_amount?: Maybe<Scalars['Float']>,
  additional_cost?: Maybe<Scalars['Float']>,
  total_amount?: Maybe<Scalars['Float']>,
  notes?: Maybe<Scalars['String']>,
  transaction_type?: Maybe<AllowedTransactionType>,
  transaction_status?: Maybe<AllowedTransactionStatus>,
  transaction_payment_status?: Maybe<AllowedTransactionPaymentStatus>,
  transaction_payment_amount?: Maybe<Scalars['Float']>,
  grand_total_amount?: Maybe<Scalars['Float']>,
  PI_date?: Maybe<Scalars['DateTime']>,
  Expected_on?: Maybe<Scalars['DateTime']>,
  TrnPurchaseInvoiceLine?: Maybe<Array<Maybe<TrnPurchaseInvoiceLine>>>,
  BusinessLocation?: Maybe<BusinessLocation>,
  Business?: Maybe<Business>,
};

export type TrnPurchaseInvoiceLine = {
   __typename?: 'TrnPurchaseInvoiceLine',
  _id?: Maybe<Scalars['String']>,
  TrnPurchaseOrder_Id?: Maybe<TrnPurchaseInvoice>,
  quantity: Scalars['Int'],
  receive_quantity?: Maybe<Scalars['Int']>,
  product_price: Scalars['Float'],
  product_sub_total: Scalars['Float'],
  Tax?: Maybe<Scalars['ID']>,
  tax_type?: Maybe<Scalars['String']>,
  tax_amount?: Maybe<Scalars['Float']>,
  discount_type?: Maybe<Scalars['String']>,
  discount_amount?: Maybe<Scalars['Float']>,
  notes?: Maybe<Scalars['String']>,
  product_total_amount: Scalars['Float'],
};

export enum TypeOfAccount {
  Paypal = 'paypal',
  Store = 'store'
}

export type TypePayments = {
   __typename?: 'TypePayments',
  _id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  icon?: Maybe<Scalars['String']>,
  BusinessLocation?: Maybe<BusinessLocation>,
};

export type TypePaymentsInput = {
  name: Scalars['String'],
  icon?: Maybe<Scalars['String']>,
  BusinessLocation: Scalars['ID'],
};

export type TypeSuppliersImport = {
   __typename?: 'TypeSuppliersImport',
  alreadyExistSuppliers?: Maybe<Array<Maybe<SupplierimportType>>>,
  suppliersInvalidData?: Maybe<Array<Maybe<SupplierimportType>>>,
  newlyAddedSuppliers?: Maybe<Array<Maybe<SupplierimportType>>>,
};

export type UdateBusinessInput = {
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  phone: Scalars['String'],
  email: Scalars['String'],
  date_format?: Maybe<Scalars['String']>,
  unique_code?: Maybe<Scalars['String']>,
  business_system_name: Scalars['String'],
  store_type: Scalars['String'],
  Country: Scalars['ID'],
  number_of_stores: Scalars['String'],
  fy_end_month: Scalars['String'],
  accounting_method: Scalars['String'],
  currency_id?: Maybe<Scalars['String']>,
  status?: Maybe<BusinessStatus>,
};


export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email?: Maybe<Scalars['String']>,
  first_name?: Maybe<Scalars['String']>,
  last_name?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  avatar_location?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  business_id?: Maybe<Business>,
  address_1?: Maybe<Scalars['String']>,
  address_2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  Country?: Maybe<Country>,
  zipcode?: Maybe<Scalars['String']>,
  /** The user_keeping_unit, will be unique representation. */
  user_keeping_unit?: Maybe<Scalars['String']>,
  roles?: Maybe<Array<Maybe<Scalars['String']>>>,
  salaryHour?: Maybe<Scalars['Float']>,
  BusinessLocation?: Maybe<BusinessLocation>,
  is_deleted?: Maybe<Scalars['Boolean']>,
  created_at?: Maybe<Scalars['String']>,
  is_clocked_in?: Maybe<Scalars['Boolean']>,
};

export type UserActivity = {
   __typename?: 'UserActivity',
  User?: Maybe<User>,
  ip_address?: Maybe<Scalars['String']>,
  location?: Maybe<Scalars['String']>,
  access_type?: Maybe<Scalars['String']>,
  application?: Maybe<Scalars['String']>,
  date?: Maybe<Scalars['DateTime']>,
  day?: Maybe<Scalars['String']>,
  time?: Maybe<Scalars['String']>,
};

export type UserChangePasswordInput = {
  userId: Scalars['ID'],
  confirmPassword: Scalars['String'],
  password: Scalars['String'],
};

export type UserCLocked = {
   __typename?: 'userCLocked',
  User?: Maybe<User>,
  oldClockHistoryId?: Maybe<Scalars['String']>,
  clocked_in_time?: Maybe<Scalars['DateTime']>,
  status?: Maybe<Scalars['String']>,
  UserClockInPin: Scalars['String'],
};

export type UserClockedHistory = {
   __typename?: 'UserClockedHistory',
  User: User,
  status: Scalars['String'],
  totaltime: Scalars['String'],
};

export type UserClockedHistoryDetail = {
   __typename?: 'UserClockedHistoryDetail',
  date: Scalars['String'],
  day: Scalars['String'],
  clocked_in_time: Scalars['String'],
  clocked_out_time?: Maybe<Scalars['String']>,
  status: Scalars['String'],
  totaltime: Scalars['String'],
};

export type UserClockInPin = {
   __typename?: 'UserClockInPin',
  _id: Scalars['ID'],
  User?: Maybe<User>,
  pincode?: Maybe<Scalars['Int']>,
};

export type UserInput = {
  email: Scalars['String'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  phone?: Maybe<Scalars['String']>,
  status?: Maybe<BusinessStatus>,
  password?: Maybe<Scalars['String']>,
  address_1?: Maybe<Scalars['String']>,
  address_2?: Maybe<Scalars['String']>,
  salaryHour?: Maybe<Scalars['Float']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['ID']>,
  zipcode?: Maybe<Scalars['String']>,
  roles?: Maybe<Array<Maybe<Scalars['String']>>>,
  BusinessLocation?: Maybe<Scalars['ID']>,
  Business?: Maybe<Scalars['ID']>,
};

export enum UserStatus {
  Active = 'active',
  InActive = 'in_active'
}

export type UserUpdateInput = {
  email: Scalars['String'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
  phone?: Maybe<Scalars['String']>,
  status: BusinessStatus,
  address_1?: Maybe<Scalars['String']>,
  address_2?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  state?: Maybe<Scalars['String']>,
  country?: Maybe<Scalars['ID']>,
  zipcode?: Maybe<Scalars['String']>,
};

export type ValidDiscount = {
   __typename?: 'ValidDiscount',
  discount?: Maybe<Discount>,
  is_eligible: Scalars['Boolean'],
  message: Scalars['String'],
};

export type VerifyforgetBusinessUrlInput = {
  email?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  code?: Maybe<Scalars['String']>,
  method?: Maybe<AllowMethodPhoneVerify>,
};

export enum VoucherType {
  Sale = 'Sale',
  Purchase = 'Purchase'
}

export type WebAnalyrics = {
   __typename?: 'WebAnalyrics',
  applicationAnalytics?: Maybe<ChartData>,
  countryAnalytics?: Maybe<ChartData>,
};

export type ZipCodeRate = {
   __typename?: 'ZipCodeRate',
  _id?: Maybe<Scalars['ID']>,
  zipCode?: Maybe<Scalars['String']>,
  Country?: Maybe<Country>,
  State?: Maybe<States>,
  City?: Maybe<City>,
  tax?: Maybe<TaxRate>,
};

export type ZipCodeRateInput = {
  zipCode: Scalars['String'],
  Country: Scalars['ID'],
  State: Scalars['ID'],
  City: Scalars['ID'],
  tax_rate: Scalars['Float'],
};

export type ZipCodeTaxInput = {
  Country?: Maybe<Scalars['String']>,
  State?: Maybe<Scalars['String']>,
  City?: Maybe<Scalars['String']>,
  zipCode?: Maybe<Scalars['String']>,
  placeID?: Maybe<Scalars['String']>,
  latitude?: Maybe<Scalars['String']>,
  longitude?: Maybe<Scalars['String']>,
  gAddress?: Maybe<Scalars['String']>,
};

export type GetCheckOutOrderQueryVariables = {
  orderID?: Maybe<Scalars['ID']>,
  businessLocation?: Maybe<Scalars['ID']>
};


export type GetCheckOutOrderQuery = (
  { __typename?: 'Query' }
  & { getCheckOutOrder: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'transaction_type' | 'transaction_status' | 'order_status' | 'transaction_payment_status' | 'transaction_keeping_unit' | 'ref_no' | 'supplier_order_number' | 'transaction_date' | 'transaction_hours' | 'transaction_minutes' | 'transaction_am_pm' | 'sub_total_amount' | 'is_apply_sale_tax' | 'tax_amount' | 'tax_value' | 'is_tax_percentage' | 'discount_amount' | 'discount_value' | 'is_discount_percentage' | 'shipping_company_name' | 'shipping_tracking_no' | 'shipping_estimated_days' | 'shipping_amount' | 'delivery_address' | 'total_amount' | 'remaining_amount' | 'is_private' | 'additional_notes' | 'received_note' | 'receivedBy' | 'receivedDate' | 'arrival_Date' | 'received_additional_cost'>
    & { Tax: Maybe<(
      { __typename?: 'Tax' }
      & Pick<Tax, '_id' | 'name' | 'amount' | 'tax_type' | 'is_percentage'>
    )>, TransactionSellLine: Maybe<Array<Maybe<(
      { __typename?: 'TransactionSellLine' }
      & Pick<TransactionSellLine, 'is_device' | 'is_attach_device' | 'product_type' | 'sell_line_product_type' | 'product_sku' | 'supplier_sku' | 'quantity' | 'product_purchase_price' | 'product_sale_price' | 'tax_amount' | 'tax_value' | 'is_tax_percentage' | 'is_discount_percentage' | 'discount_amount' | 'discount_value' | 'sub_total_amount' | 'total_amount' | 'serial_number'>
      & { Device: Maybe<(
        { __typename?: 'Device' }
        & Pick<Device, '_id' | 'device_keeping_unit'>
        & { deviceBrand: Maybe<(
          { __typename?: 'SystemBrand' }
          & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
        )>, deviceModel: Maybe<(
          { __typename?: 'DeviceModel' }
          & Pick<DeviceModel, '_id' | 'name'>
        )> }
      )>, Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, '_id' | 'product_name' | 'description'>
      )>, products: Maybe<Array<Maybe<(
        { __typename?: 'assignedProducts' }
        & Pick<AssignedProducts, 'product_type' | 'sell_line_product_type' | 'product_sku' | 'supplier_sku' | 'quantity' | 'product_purchase_price' | 'product_sale_price' | 'sub_total_amount' | 'total_amount'>
        & { Product: Maybe<(
          { __typename?: 'Product' }
          & Pick<Product, '_id' | 'product_name' | 'description'>
        )>, customProduct: Maybe<(
          { __typename?: 'CustomProduct' }
          & Pick<CustomProduct, '_id' | 'name'>
        )> }
      )>>>, GiftCard: Maybe<(
        { __typename?: 'GiftCard' }
        & Pick<GiftCard, '_id' | 'card_no' | 'gift_card_keeping_unit' | 'name'>
      )>, customProduct: Maybe<(
        { __typename?: 'CustomProduct' }
        & Pick<CustomProduct, '_id' | 'name' | 'quantity' | 'cost_price' | 'selling_price' | 'note' | 'is_taxable'>
      )> }
    )>>>, TransactionPayment: Maybe<Array<Maybe<(
      { __typename?: 'TransactionPayment' }
      & Pick<TransactionPayment, '_id' | 'amount' | 'method' | 'paid_on' | 'card_used_no'>
    )>>>, Customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name'>
      & { CustomerStoreWiseRecord: Maybe<Array<Maybe<(
        { __typename?: 'CustomerStoreWise' }
        & { net_term: Maybe<(
          { __typename?: 'CustomerNetTerm' }
          & Pick<CustomerNetTerm, 'pay_term_number' | 'pay_term_type' | 'credit_limit' | 'interest_rate' | 'used_credit'>
        )>, store_credit: Maybe<(
          { __typename?: 'CustomerstoreCredit' }
          & Pick<CustomerstoreCredit, 'credit_amount'>
        )> }
      )>>> }
    )> }
  )> }
);

export type CreateNetTermOfCustomerMutationVariables = {
  customerNetTermInput?: Maybe<CustomerNetTermInput>
};


export type CreateNetTermOfCustomerMutation = (
  { __typename?: 'Mutation' }
  & { createNetTermOfCustomer: Maybe<(
    { __typename?: 'NetTermLogs' }
    & Pick<NetTermLogs, 'created_at' | 'balance' | 'is_increase' | 'pay_term_number' | 'pay_term_type' | 'credit_amount' | 'interest_rate' | 'note' | 'transactionNo' | 'debit_amount' | 'date'>
    & { User: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone'>
    ) }
  )> }
);

export type GetNetTermsLogsQueryVariables = {
  customerId: Scalars['ID'],
  locationId?: Maybe<Scalars['ID']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type GetNetTermsLogsQuery = (
  { __typename?: 'Query' }
  & { getNetTermsLogs: Maybe<Array<Maybe<(
    { __typename?: 'NetTermLogs' }
    & Pick<NetTermLogs, 'created_at' | 'balance' | 'is_increase' | 'pay_term_number' | 'pay_term_type' | 'credit_amount' | 'interest_rate' | 'note' | 'is_overdue' | 'transactionNo' | 'debit_amount' | 'date'>
    & { User: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone'>
    ) }
  )>>> }
);

export type CustomerNetTermQueryVariables = {
  customerId: Scalars['ID']
};


export type CustomerNetTermQuery = (
  { __typename?: 'Query' }
  & { customerNetTerm: Maybe<(
    { __typename?: 'NetTerm' }
    & Pick<NetTerm, 'credit_limit' | 'used_credit' | 'available_credit' | 'over_dues'>
  )> }
);

export type GetOrderByCustomerIdQueryVariables = {
  customerID: Scalars['ID'],
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type GetOrderByCustomerIdQuery = (
  { __typename?: 'Query' }
  & { getOrderByCustomerID: Maybe<Array<Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id'>
  )>>> }
);

export type GetNettermOrdersByCustomerIdQueryVariables = {
  customerID: Scalars['ID'],
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  locationId?: Maybe<Scalars['ID']>
};


export type GetNettermOrdersByCustomerIdQuery = (
  { __typename?: 'Query' }
  & { getNettermOrdersByCustomerID: Maybe<Array<Maybe<(
    { __typename?: 'netTermOrders' }
    & Pick<NetTermOrders, 'invoice_no' | 'transactionId' | 'total_amount' | 'owen_amount' | 'is_over_date' | 'days' | 'status' | 'date' | 'amountToPay' | 'remBalance'>
  )>>> }
);

export type GetTimeZonesQueryVariables = {};


export type GetTimeZonesQuery = (
  { __typename?: 'Query' }
  & { getTimeZones: Maybe<Array<Maybe<(
    { __typename?: 'TimeZoneType' }
    & Pick<TimeZoneType, '_id' | 'title'>
  )>>> }
);

export type GetReasonsQueryVariables = {
  reason_type?: Maybe<ReasonType>
};


export type GetReasonsQuery = (
  { __typename?: 'Query' }
  & { getReasons: Maybe<Array<Maybe<(
    { __typename?: 'Reason' }
    & Pick<Reason, '_id' | 'reason_name' | 'reason_type'>
  )>>> }
);

export type GetAllProductsQueryVariables = {
  locationId: Scalars['ID']
};


export type GetAllProductsQuery = (
  { __typename?: 'Query' }
  & { products: Maybe<Array<Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'product_name' | 'description'>
  )>>> }
);

export type VerifyCustomerEmailQueryVariables = {
  email: Scalars['String']
};


export type VerifyCustomerEmailQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'checkCustomerEmail'>
);

export type CreateCustomProductMutationVariables = {
  customProductInput: CustomProductInput
};


export type CreateCustomProductMutation = (
  { __typename?: 'Mutation' }
  & { createCustomProduct: Maybe<(
    { __typename?: 'CustomProduct' }
    & Pick<CustomProduct, '_id' | 'name' | 'quantity' | 'cost_price' | 'selling_price' | 'note' | 'is_taxable'>
    & { location_id: (
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'email' | 'sales_tax' | 'phone' | 'zip_code' | 'city' | 'state' | 'address_1' | 'address_2'>
    ) }
  )> }
);

export type SearchProductQueryVariables = {
  search: Scalars['String'],
  locationId: Scalars['ID']
};


export type SearchProductQuery = (
  { __typename?: 'Query' }
  & { searchProduct: Maybe<Array<Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'product_name' | 'description'>
  )>>> }
);

export type GetAllTagsQueryVariables = {};


export type GetAllTagsQuery = (
  { __typename?: 'Query' }
  & { tags: Maybe<Array<Maybe<(
    { __typename?: 'Tag' }
    & Pick<Tag, '_id' | 'name' | 'slug' | 'type' | 'order_column'>
  )>>> }
);

export type SaveFileMutationVariables = {
  file: Scalars['Upload'],
  input: FileInput
};


export type SaveFileMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'saveFile'>
);

export type GetDirectoryWithFilesQueryVariables = {
  location_id: Scalars['ID'],
  model_type: Scalars['String'],
  model_id: Scalars['String']
};


export type GetDirectoryWithFilesQuery = (
  { __typename?: 'Query' }
  & { getDirectoryWithFiles: Maybe<Array<Maybe<(
    { __typename?: 'Directory' }
    & Pick<Directory, '_id' | 'name' | 'model_type' | 'model_id'>
    & { SourceFile: Maybe<Array<(
      { __typename?: 'SourceFile' }
      & Pick<SourceFile, '_id' | 'name' | 'path'>
    )>> }
  )>>> }
);

export type DeleteFileMutationVariables = {
  file_id: Scalars['ID']
};


export type DeleteFileMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteFile'>
);

export type SearchProductByTagsQueryVariables = {
  search?: Maybe<Array<Scalars['ID']>>,
  locationId: Scalars['ID']
};


export type SearchProductByTagsQuery = (
  { __typename?: 'Query' }
  & { searchProductByTags: Maybe<Array<Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'product_name' | 'description'>
  )>>> }
);

export type DeviceIssuesQueryVariables = {
  issueType: DeviceIssuesType
};


export type DeviceIssuesQuery = (
  { __typename?: 'Query' }
  & { deviceIssues: Maybe<Array<Maybe<(
    { __typename?: 'DeviceIssues' }
    & Pick<DeviceIssues, '_id' | 'name' | 'type'>
  )>>> }
);

export type CreateSaleMutationVariables = {
  orderID?: Maybe<Scalars['ID']>,
  input?: Maybe<CreateSaleInput>
};


export type CreateSaleMutation = (
  { __typename?: 'Mutation' }
  & { createSale: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id'>
  )> }
);

export type TaxsQueryVariables = {};


export type TaxsQuery = (
  { __typename?: 'Query' }
  & { taxs: Maybe<Array<Maybe<(
    { __typename?: 'Tax' }
    & Pick<Tax, '_id' | 'name' | 'amount' | 'is_tax_group' | 'is_percentage'>
  )>>> }
);

export type DeviceCheckInbyDeviceIdQueryVariables = {
  ID: Scalars['ID']
};


export type DeviceCheckInbyDeviceIdQuery = (
  { __typename?: 'Query' }
  & { DeviceCheckInbyDeviceId: Maybe<Array<Maybe<(
    { __typename?: 'DeviceCheckIns' }
    & Pick<DeviceCheckIns, 'carrier' | '_id'>
  )>>> }
);

export type CreateOrderPdfQueryVariables = {
  orderID: Scalars['ID'],
  isEmail: Scalars['Boolean']
};


export type CreateOrderPdfQuery = (
  { __typename?: 'Query' }
  & { createOrderPDF: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id'>
  )> }
);

export type GetCustomerHistoryQueryVariables = {
  customerID: Scalars['ID']
};


export type GetCustomerHistoryQuery = (
  { __typename?: 'Query' }
  & { getCustomerPurchaseHistory: Maybe<(
    { __typename?: 'PurchaseHistory' }
    & Pick<PurchaseHistory, 'totalAmount' | 'avgPurchase' | 'avgItemPerVisit' | 'totalVisiter'>
  )> }
);

export type SendOrderSummaryBySmsQueryVariables = {
  orderID: Scalars['ID']
};


export type SendOrderSummaryBySmsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'sendOrderSummaryBySMS'>
);

export type GetBrainTreeTokenQueryVariables = {};


export type GetBrainTreeTokenQuery = (
  { __typename?: 'Query' }
  & { getBrainTreeToken: Maybe<(
    { __typename?: 'BrainTreeToken' }
    & Pick<BrainTreeToken, 'token'>
  )> }
);

export type ValidateDiscountByCodeQueryVariables = {
  code: Scalars['ID'],
  customerId?: Maybe<Scalars['ID']>
};


export type ValidateDiscountByCodeQuery = (
  { __typename?: 'Query' }
  & { validateDiscountByCode: Maybe<(
    { __typename?: 'ValidDiscount' }
    & Pick<ValidDiscount, 'is_eligible' | 'message'>
  )> }
);

export type CreateGiftCardMutationVariables = {
  input?: Maybe<GiftCardInput>
};


export type CreateGiftCardMutation = (
  { __typename?: 'Mutation' }
  & { createGiftCard: Maybe<(
    { __typename?: 'GiftCard' }
    & Pick<GiftCard, '_id' | 'card_no' | 'gift_card_keeping_unit' | 'name' | 'to' | 'subject' | 'send_gift_card' | 'email' | 'message' | 'amount' | 'is_used' | 'is_email_send' | 'is_active' | 'created_at'>
  )> }
);

export type GetCartDataQueryVariables = {
  orderID?: Maybe<Scalars['ID']>,
  businessLocation?: Maybe<Scalars['ID']>
};


export type GetCartDataQuery = (
  { __typename?: 'Query' }
  & { getCartData: Maybe<(
    { __typename?: 'CartTransaction' }
    & Pick<CartTransaction, '_id' | 'transaction_type' | 'transaction_status' | 'order_status' | 'transaction_keeping_unit' | 'transaction_date' | 'sub_total_amount' | 'tax_amount' | 'tax_value' | 'is_apply_sale_tax' | 'is_tax_percentage' | 'discount_amount' | 'discount_value' | 'is_discount_percentage' | 'total_amount' | 'remaining_amount' | 'is_private' | 'additional_notes' | 'is_additional_cost' | 'is_extra_items'>
    & { Tax: Maybe<(
      { __typename?: 'Tax' }
      & Pick<Tax, '_id' | 'name' | 'amount' | 'tax_type' | 'is_percentage' | 'is_tax_group'>
    )>, TransactionCartLine: Maybe<Array<Maybe<(
      { __typename?: 'TransactionCartLine' }
      & Pick<TransactionCartLine, 'is_device' | 'product_type' | 'sell_line_product_type' | 'serial_number' | '_id' | 'product_name' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'alert_qty' | 'ideal_qty' | 'sell_price' | 'sell_price_inc_tax' | 'average_cost' | 'last_cost' | 'sku' | 'compatilable_devices' | 'is_serial_number' | 'total_quantity' | 'discount_amount' | 'discount_value' | 'total_amount' | 'sell_line_serial_number' | 'is_discount_percentage' | 'product_sale_price' | 'quantity'>
      & { Device: Maybe<(
        { __typename?: 'Device' }
        & Pick<Device, '_id' | 'device_color' | 'imei_ssn' | 'device_image' | 'device_keeping_unit'>
        & { deviceBrand: Maybe<(
          { __typename?: 'SystemBrand' }
          & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
        )>, deviceModel: Maybe<(
          { __typename?: 'DeviceModel' }
          & Pick<DeviceModel, '_id' | 'name'>
        )>, Customer: Maybe<(
          { __typename?: 'Customer' }
          & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'can_email' | 'is_net_term' | 'is_store_credit' | 'is_devices' | 'can_sms' | 'deleted_at' | 'marketing_question' | 'is_linked'>
        )> }
      )>, DeviceCheckIns: Maybe<(
        { __typename?: 'DeviceCheckIns' }
        & Pick<DeviceCheckIns, '_id' | 'client_name' | 'client_phone_number' | 'client_device_id' | 'check_in_date' | 'carrier' | 'password' | 'device_issue' | 'step_to_reproduce' | 'cosmetic_condition' | 'device_canbe_tested' | 'reason_for_canbe_tested' | 'device_previously_repaired' | 'device_type_previous_repair' | 'place_repair_done' | 'is_water_damage' | 'is_warranty' | 'battery_life' | 'approved_to_device_restored' | 'note' | 'is_pattern' | 'pattern_code'>
        & { DeviceIssues: Maybe<Array<Maybe<(
          { __typename?: 'DeviceIssues' }
          & Pick<DeviceIssues, '_id' | 'name' | 'type'>
        )>>>, DeviceItems: Maybe<Array<Maybe<(
          { __typename?: 'DeviceIssues' }
          & Pick<DeviceIssues, '_id' | 'name' | 'type'>
        )>>>, Customer: Maybe<(
          { __typename?: 'Customer' }
          & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'can_email' | 'is_net_term' | 'is_store_credit' | 'is_devices' | 'can_sms' | 'deleted_at' | 'marketing_question' | 'tags' | 'is_over_due' | 'is_linked' | 'is_deleted'>
        )>, SourceFile: Maybe<Array<Maybe<(
          { __typename?: 'SourceFile' }
          & Pick<SourceFile, '_id' | 'name' | 'path' | 'model_type' | 'model_id'>
        )>>> }
      )>, products: Maybe<Array<Maybe<(
        { __typename?: 'attachProduct' }
        & Pick<AttachProduct, 'product_type' | 'sell_line_product_type' | '_id' | 'product_name' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'alert_qty' | 'ideal_qty' | 'sell_price' | 'sell_price_inc_tax' | 'average_cost' | 'last_cost' | 'sku' | 'compatilable_devices' | 'is_serial_number' | 'total_quantity' | 'discount_amount' | 'discount_value' | 'total_amount' | 'sell_line_serial_number' | 'is_discount_percentage' | 'product_sale_price' | 'quantity'>
        & { bundle_products: Maybe<(
          { __typename?: 'bundleProductInfo' }
          & Pick<BundleProductInfo, 'total_selling_price' | 'total_avg_cost' | 'is_manufactured_qty'>
          & { bundleProduct: Maybe<Array<Maybe<(
            { __typename?: 'bundleProduct' }
            & Pick<BundleProduct, 'avg_cost' | 'quantity' | 'selling_price'>
            & { bundleProductID: Maybe<(
              { __typename?: 'Product' }
              & Pick<Product, '_id' | 'product_name' | 'description' | 'image' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'alert_qty' | 'ideal_qty' | 'sell_price' | 'openingStock' | 'sell_price_inc_tax' | 'average_cost' | 'last_cost' | 'barcode' | 'sku' | 'compatilable_devices' | 'tags' | 'is_serial_number' | 'sale_item' | 'total_sale' | 'incoming_item' | 'max_bundle' | 'is_completed_product' | 'is_add_product_with_device'>
              & { Brand: Maybe<(
                { __typename?: 'SystemBrand' }
                & Pick<SystemBrand, '_id' | 'brand_name'>
              )>, DeviceModel: Maybe<(
                { __typename?: 'DeviceModel' }
                & Pick<DeviceModel, '_id' | 'name'>
              )>, Suppliers: Maybe<Array<Maybe<(
                { __typename?: 'SupplierInfo' }
                & Pick<SupplierInfo, 'sku_number' | 'current_stock' | 'incoming_item' | 'instock' | 'ordered_qty'>
                & { supplier_id: Maybe<(
                  { __typename?: 'Supplier' }
                  & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_keeping_unit' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email' | 'is_verify_supplier' | 'is_buyback' | 'Order'>
                )> }
              )>>>, ProductStockPrice: Maybe<Array<Maybe<(
                { __typename?: 'ProductPrices' }
                & Pick<ProductPrices, '_id' | 'ideal_quantity' | 'opening_stock' | 'qty_available' | 'alert_quantity' | 'shelf_qty' | 'order_qty' | 'bundle_order_qty' | 'is_profit_percentage' | 'profit_value' | 'profit_amount' | 'default_sell_price' | 'is_sell_tax_percentage' | 'sell_tax_value' | 'sell_tax_amount' | 'sell_price_inc_tax' | 'last_cost' | 'average_cost' | 'discount_amount' | 'price_without_bundle' | 'percentage_discount'>
              )>>> }
            )> }
          )>>> }
        )>, Brand: Maybe<(
          { __typename?: 'SystemBrand' }
          & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
        )>, DeviceModel: Maybe<(
          { __typename?: 'DeviceModel' }
          & Pick<DeviceModel, '_id' | 'name'>
        )>, Suppliers: Maybe<Array<Maybe<(
          { __typename?: 'SupplierCartInfo' }
          & Pick<SupplierCartInfo, 'sku_number' | 'current_stock' | 'quantity' | 'product_sale_price' | 'is_discount_percentage' | 'discount_amount' | 'discount_value' | 'sub_total_amount' | 'total_amount' | 'supplier_sku'>
          & { supplier_id: Maybe<(
            { __typename?: 'Supplier' }
            & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_keeping_unit' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email' | 'is_verify_supplier' | 'is_buyback' | 'Order'>
          )> }
        )>>>, CustomProduct: Maybe<(
          { __typename?: 'CustomProduct' }
          & Pick<CustomProduct, '_id' | 'name' | 'quantity' | 'cost_price' | 'selling_price' | 'selling_price_include_tax' | 'note' | 'is_taxable'>
        )>, serviceProduct: Maybe<Array<Maybe<(
          { __typename?: 'ServiceProducts' }
          & Pick<ServiceProducts, 'serviceProductType' | 'serviceProductSKU' | 'serviceProductSupplier' | 'serviceProductQuantity' | 'serviceReason' | 'serviceSerialNo'>
          & { serviceProductId: Maybe<(
            { __typename?: 'Product' }
            & Pick<Product, '_id' | 'product_name' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'alert_qty' | 'ideal_qty' | 'sell_price' | 'sell_price_inc_tax' | 'average_cost' | 'last_cost' | 'sku' | 'compatilable_devices' | 'is_serial_number'>
            & { bundle_products: Maybe<(
              { __typename?: 'bundleProductInfo' }
              & Pick<BundleProductInfo, 'total_selling_price' | 'total_avg_cost' | 'is_manufactured_qty'>
              & { bundleProduct: Maybe<Array<Maybe<(
                { __typename?: 'bundleProduct' }
                & Pick<BundleProduct, 'avg_cost' | 'quantity' | 'selling_price'>
                & { bundleProductID: Maybe<(
                  { __typename?: 'Product' }
                  & Pick<Product, '_id' | 'product_name' | 'description' | 'image' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'alert_qty' | 'ideal_qty' | 'sell_price' | 'openingStock' | 'sell_price_inc_tax' | 'average_cost' | 'last_cost' | 'barcode' | 'sku' | 'compatilable_devices' | 'tags' | 'is_serial_number' | 'sale_item' | 'total_sale' | 'incoming_item' | 'max_bundle' | 'is_completed_product' | 'is_add_product_with_device'>
                  & { Brand: Maybe<(
                    { __typename?: 'SystemBrand' }
                    & Pick<SystemBrand, '_id' | 'brand_name'>
                  )>, DeviceModel: Maybe<(
                    { __typename?: 'DeviceModel' }
                    & Pick<DeviceModel, '_id' | 'name'>
                  )>, Suppliers: Maybe<Array<Maybe<(
                    { __typename?: 'SupplierInfo' }
                    & Pick<SupplierInfo, 'sku_number' | 'current_stock' | 'incoming_item' | 'instock' | 'ordered_qty'>
                    & { supplier_id: Maybe<(
                      { __typename?: 'Supplier' }
                      & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_keeping_unit' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email' | 'is_verify_supplier' | 'is_buyback' | 'Order'>
                    )> }
                  )>>>, ProductStockPrice: Maybe<Array<Maybe<(
                    { __typename?: 'ProductPrices' }
                    & Pick<ProductPrices, '_id' | 'ideal_quantity' | 'opening_stock' | 'qty_available' | 'alert_quantity' | 'shelf_qty' | 'order_qty' | 'bundle_order_qty' | 'is_profit_percentage' | 'profit_value' | 'profit_amount' | 'default_sell_price' | 'is_sell_tax_percentage' | 'sell_tax_value' | 'sell_tax_amount' | 'sell_price_inc_tax' | 'last_cost' | 'average_cost' | 'discount_amount' | 'price_without_bundle' | 'percentage_discount'>
                  )>>> }
                )> }
              )>>> }
            )>, Brand: Maybe<(
              { __typename?: 'SystemBrand' }
              & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
            )>, DeviceModel: Maybe<(
              { __typename?: 'DeviceModel' }
              & Pick<DeviceModel, '_id' | 'name'>
            )>, Suppliers: Maybe<Array<Maybe<(
              { __typename?: 'SupplierInfo' }
              & Pick<SupplierInfo, 'sku_number' | 'current_stock' | 'incoming_item' | 'instock' | 'ordered_qty' | 'price_purchase'>
              & { supplier_id: Maybe<(
                { __typename?: 'Supplier' }
                & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_keeping_unit' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email' | 'is_verify_supplier' | 'is_buyback' | 'Order'>
              )> }
            )>>> }
          )>, serviceCustomProductId: Maybe<(
            { __typename?: 'CustomProduct' }
            & Pick<CustomProduct, '_id' | 'name' | 'quantity' | 'cost_price' | 'selling_price' | 'selling_price_include_tax' | 'note' | 'is_taxable'>
          )> }
        )>>> }
      )>>>, bundle_products: Maybe<(
        { __typename?: 'bundleProductInfo' }
        & Pick<BundleProductInfo, 'total_selling_price' | 'total_avg_cost' | 'is_manufactured_qty'>
        & { bundleProduct: Maybe<Array<Maybe<(
          { __typename?: 'bundleProduct' }
          & Pick<BundleProduct, 'avg_cost' | 'quantity' | 'selling_price'>
          & { bundleProductID: Maybe<(
            { __typename?: 'Product' }
            & Pick<Product, '_id' | 'product_name' | 'description' | 'image' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'alert_qty' | 'ideal_qty' | 'sell_price' | 'openingStock' | 'sell_price_inc_tax' | 'average_cost' | 'last_cost' | 'barcode' | 'sku' | 'compatilable_devices' | 'tags' | 'is_serial_number' | 'sale_item' | 'total_sale' | 'incoming_item' | 'max_bundle' | 'is_completed_product' | 'is_add_product_with_device'>
            & { Brand: Maybe<(
              { __typename?: 'SystemBrand' }
              & Pick<SystemBrand, '_id' | 'brand_name'>
            )>, DeviceModel: Maybe<(
              { __typename?: 'DeviceModel' }
              & Pick<DeviceModel, '_id' | 'name'>
            )>, Suppliers: Maybe<Array<Maybe<(
              { __typename?: 'SupplierInfo' }
              & Pick<SupplierInfo, 'sku_number' | 'current_stock' | 'incoming_item' | 'instock' | 'ordered_qty'>
              & { supplier_id: Maybe<(
                { __typename?: 'Supplier' }
                & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_keeping_unit' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email' | 'is_verify_supplier' | 'is_buyback' | 'Order'>
              )> }
            )>>>, ProductStockPrice: Maybe<Array<Maybe<(
              { __typename?: 'ProductPrices' }
              & Pick<ProductPrices, '_id' | 'ideal_quantity' | 'opening_stock' | 'qty_available' | 'alert_quantity' | 'shelf_qty' | 'order_qty' | 'bundle_order_qty' | 'is_profit_percentage' | 'profit_value' | 'profit_amount' | 'default_sell_price' | 'is_sell_tax_percentage' | 'sell_tax_value' | 'sell_tax_amount' | 'sell_price_inc_tax' | 'last_cost' | 'average_cost' | 'discount_amount' | 'price_without_bundle' | 'percentage_discount'>
            )>>> }
          )> }
        )>>> }
      )>, ProductStockPrice: Maybe<Array<Maybe<(
        { __typename?: 'ProductPrices' }
        & Pick<ProductPrices, 'qty_available'>
      )>>>, Brand: Maybe<(
        { __typename?: 'SystemBrand' }
        & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
      )>, DeviceModel: Maybe<(
        { __typename?: 'DeviceModel' }
        & Pick<DeviceModel, '_id' | 'name'>
      )>, Suppliers: Maybe<Array<Maybe<(
        { __typename?: 'SupplierCartInfo' }
        & Pick<SupplierCartInfo, 'sku_number' | 'current_stock' | 'quantity' | 'product_sale_price' | 'is_discount_percentage' | 'discount_amount' | 'discount_value' | 'sub_total_amount' | 'total_amount' | 'supplier_sku'>
        & { supplier_id: Maybe<(
          { __typename?: 'Supplier' }
          & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_keeping_unit' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email' | 'is_verify_supplier' | 'is_buyback' | 'Order'>
        )> }
      )>>>, giftCard: Maybe<(
        { __typename?: 'GiftCard' }
        & Pick<GiftCard, '_id' | 'card_no' | 'gift_card_keeping_unit' | 'name' | 'to' | 'subject' | 'send_gift_card' | 'email' | 'message' | 'amount' | 'is_used' | 'is_email_send' | 'is_active' | 'created_at' | 'qr_code'>
        & { Customer: (
          { __typename?: 'Customer' }
          & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'can_email' | 'is_net_term' | 'is_store_credit' | 'is_devices' | 'can_sms' | 'deleted_at' | 'marketing_question' | 'tags' | 'is_over_due' | 'is_linked' | 'is_deleted'>
        ) }
      )>, CustomProduct: Maybe<(
        { __typename?: 'CustomProduct' }
        & Pick<CustomProduct, '_id' | 'name' | 'quantity' | 'cost_price' | 'selling_price' | 'selling_price_include_tax' | 'note' | 'is_taxable'>
      )> }
    )>>>, Customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'can_email' | 'is_net_term' | 'is_store_credit' | 'is_devices' | 'can_sms' | 'deleted_at' | 'marketing_question' | 'tags' | 'is_over_due' | 'is_linked' | 'is_deleted'>
    )> }
  )> }
);

export type GetGiftCardBycardNoQueryVariables = {
  card_no: Scalars['String'],
  BusinessLocation?: Maybe<Scalars['ID']>
};


export type GetGiftCardBycardNoQuery = (
  { __typename?: 'Query' }
  & { GetGiftCardBycardNo: Maybe<(
    { __typename?: 'GiftCard' }
    & Pick<GiftCard, '_id' | 'amount' | 'is_used'>
  )> }
);

export type CreatePaymentProcessMutationVariables = {
  input?: Maybe<PaymentProcessInput>
};


export type CreatePaymentProcessMutation = (
  { __typename?: 'Mutation' }
  & { createPaymentProcess: Maybe<Array<Maybe<(
    { __typename?: 'TransactionPayment' }
    & Pick<TransactionPayment, 'amount' | 'method' | 'paid_on' | 'card_used_no'>
  )>>> }
);

export type GetProductsbyDevicewithSearchQueryVariables = {
  input?: Maybe<InputProductsWithDevice>
};


export type GetProductsbyDevicewithSearchQuery = (
  { __typename?: 'Query' }
  & { getProductsbyDevicewithSearch: Maybe<Array<Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'product_name' | 'incoming_item' | 'max_bundle' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'is_serial_number' | 'sell_price_inc_tax' | 'sku' | 'alert_qty'>
    & { ProductStockPrice: Maybe<Array<Maybe<(
      { __typename?: 'ProductPrices' }
      & Pick<ProductPrices, '_id' | 'qty_available' | 'alert_quantity' | 'shelf_qty' | 'sell_price_inc_tax' | 'order_qty'>
    )>>>, bundle_products: Maybe<(
      { __typename?: 'bundleProductInfo' }
      & Pick<BundleProductInfo, 'total_selling_price' | 'total_avg_cost' | 'is_manufactured_qty'>
      & { bundleProduct: Maybe<Array<Maybe<(
        { __typename?: 'bundleProduct' }
        & Pick<BundleProduct, 'avg_cost' | 'quantity' | 'selling_price'>
        & { bundleProductID: Maybe<(
          { __typename?: 'Product' }
          & Pick<Product, '_id' | 'product_name' | 'incoming_item' | 'max_bundle' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'is_serial_number'>
          & { ProductStockPrice: Maybe<Array<Maybe<(
            { __typename?: 'ProductPrices' }
            & Pick<ProductPrices, '_id' | 'qty_available' | 'alert_quantity' | 'shelf_qty' | 'sell_price_inc_tax' | 'order_qty'>
          )>>> }
        )> }
      )>>> }
    )>, Suppliers: Maybe<Array<Maybe<(
      { __typename?: 'SupplierInfo' }
      & Pick<SupplierInfo, 'sku_number' | 'current_stock' | 'incoming_item' | 'instock' | 'ordered_qty'>
      & { supplier_id: Maybe<(
        { __typename?: 'Supplier' }
        & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email'>
      )> }
    )>>>, servicesBrandModel: Maybe<Array<Maybe<(
      { __typename?: 'ServicesBrandModel' }
      & Pick<ServicesBrandModel, 'service_max_price' | 'service_min_price'>
      & { ServiceBrand: Maybe<(
        { __typename?: 'SystemBrand' }
        & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
      )>, ServiceDeviceModel: Maybe<(
        { __typename?: 'DeviceModel' }
        & Pick<DeviceModel, '_id' | 'name'>
        & { brand: Maybe<(
          { __typename?: 'SystemBrand' }
          & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
        )> }
      )>, ServiceItem: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, '_id' | 'product_name' | 'incoming_item' | 'max_bundle' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'is_serial_number' | 'sell_price_inc_tax' | 'sku' | 'alert_qty'>
        & { ProductStockPrice: Maybe<Array<Maybe<(
          { __typename?: 'ProductPrices' }
          & Pick<ProductPrices, '_id' | 'qty_available' | 'alert_quantity' | 'shelf_qty' | 'sell_price_inc_tax' | 'order_qty'>
        )>>>, bundle_products: Maybe<(
          { __typename?: 'bundleProductInfo' }
          & Pick<BundleProductInfo, 'total_selling_price' | 'total_avg_cost' | 'is_manufactured_qty'>
          & { bundleProduct: Maybe<Array<Maybe<(
            { __typename?: 'bundleProduct' }
            & Pick<BundleProduct, 'avg_cost' | 'quantity' | 'selling_price'>
            & { bundleProductID: Maybe<(
              { __typename?: 'Product' }
              & Pick<Product, '_id' | 'product_name' | 'incoming_item' | 'max_bundle' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'is_serial_number'>
              & { ProductStockPrice: Maybe<Array<Maybe<(
                { __typename?: 'ProductPrices' }
                & Pick<ProductPrices, '_id' | 'qty_available' | 'alert_quantity' | 'shelf_qty' | 'sell_price_inc_tax' | 'order_qty'>
              )>>> }
            )> }
          )>>> }
        )>, Suppliers: Maybe<Array<Maybe<(
          { __typename?: 'SupplierInfo' }
          & Pick<SupplierInfo, 'sku_number' | 'current_stock' | 'incoming_item' | 'instock' | 'ordered_qty'>
          & { supplier_id: Maybe<(
            { __typename?: 'Supplier' }
            & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email'>
          )> }
        )>>> }
      )> }
    )>>>, Brand: Maybe<(
      { __typename?: 'SystemBrand' }
      & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
    )>, DeviceModel: Maybe<(
      { __typename?: 'DeviceModel' }
      & Pick<DeviceModel, '_id' | 'name'>
    )> }
  )>>> }
);

export type AddCustomerMutationVariables = {
  input?: Maybe<CustomerInput>
};


export type AddCustomerMutation = (
  { __typename?: 'Mutation' }
  & { createCustomer: Maybe<(
    { __typename?: 'Customer' }
    & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'can_email' | 'can_sms' | 'marketing_question' | 'is_linked' | 'tags'>
    & { location_id: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name'>
    )>, linkedStores: Maybe<Array<Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name' | 'store_nick_name' | 'location_keeping_unit'>
    )>>>, CustomerStoreWiseRecord: Maybe<Array<Maybe<(
      { __typename?: 'CustomerStoreWise' }
      & Pick<CustomerStoreWise, 'can_sms' | 'can_email' | 'is_active'>
      & { net_term: Maybe<(
        { __typename?: 'CustomerNetTerm' }
        & Pick<CustomerNetTerm, 'pay_term_number' | 'pay_term_type' | 'credit_limit' | 'interest_rate'>
      )>, store_credit: Maybe<(
        { __typename?: 'CustomerstoreCredit' }
        & Pick<CustomerstoreCredit, 'credit_amount'>
      )> }
    )>>> }
  )> }
);

export type GetCustomersWithSearchQueryVariables = {
  input?: Maybe<InputSearchCustomer>
};


export type GetCustomersWithSearchQuery = (
  { __typename?: 'Query' }
  & { getCustomersWithSearch: Maybe<(
    { __typename?: 'customerSearchListing' }
    & Pick<CustomerSearchListing, 'total_customer'>
    & { customers: Maybe<Array<Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'can_email' | 'can_sms' | 'marketing_question' | 'is_linked' | 'tags'>
      & { location_id: Maybe<(
        { __typename?: 'BusinessLocation' }
        & Pick<BusinessLocation, '_id' | 'store_name'>
      )>, linkedStores: Maybe<Array<Maybe<(
        { __typename?: 'BusinessLocation' }
        & Pick<BusinessLocation, '_id' | 'store_name' | 'store_nick_name' | 'location_keeping_unit'>
      )>>>, CustomerStoreWiseRecord: Maybe<Array<Maybe<(
        { __typename?: 'CustomerStoreWise' }
        & Pick<CustomerStoreWise, 'can_sms' | 'can_email' | 'is_active'>
        & { net_term: Maybe<(
          { __typename?: 'CustomerNetTerm' }
          & Pick<CustomerNetTerm, 'pay_term_number' | 'pay_term_type' | 'credit_limit' | 'interest_rate'>
        )>, store_credit: Maybe<(
          { __typename?: 'CustomerstoreCredit' }
          & Pick<CustomerstoreCredit, 'credit_amount'>
        )> }
      )>>> }
    )>>> }
  )> }
);

export type DeleteCustomerMutationVariables = {
  customer_id?: Maybe<Array<Maybe<Scalars['ID']>>>,
  username: Scalars['String'],
  password: Scalars['String']
};


export type DeleteCustomerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCustomer'>
);

export type UpdateCustomerMutationVariables = {
  customer_id: Scalars['ID'],
  input?: Maybe<CustomerInput>
};


export type UpdateCustomerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateCustomer'>
);

export type CustomerByLocationIdQueryVariables = {
  locationId: Scalars['ID']
};


export type CustomerByLocationIdQuery = (
  { __typename?: 'Query' }
  & { customersByLocationId: Maybe<Array<Maybe<(
    { __typename?: 'Customer' }
    & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'address_1' | 'address_2' | 'state' | 'city' | 'zip_code' | 'can_sms' | 'can_email' | 'marketing_question' | 'is_linked' | 'tags'>
    & { location_id: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name'>
    )>, linkedStores: Maybe<Array<Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name' | 'store_nick_name' | 'location_keeping_unit'>
    )>>>, CustomerStoreWiseRecord: Maybe<Array<Maybe<(
      { __typename?: 'CustomerStoreWise' }
      & Pick<CustomerStoreWise, 'can_sms' | 'can_email' | 'is_active'>
      & { net_term: Maybe<(
        { __typename?: 'CustomerNetTerm' }
        & Pick<CustomerNetTerm, 'pay_term_number' | 'pay_term_type' | 'credit_limit' | 'interest_rate'>
      )>, store_credit: Maybe<(
        { __typename?: 'CustomerstoreCredit' }
        & Pick<CustomerstoreCredit, 'credit_amount'>
      )> }
    )>>> }
  )>>> }
);

export type GetCustomerDetailQueryVariables = {
  customerID: Scalars['ID']
};


export type GetCustomerDetailQuery = (
  { __typename?: 'Query' }
  & { customerNetTerm: Maybe<(
    { __typename?: 'NetTerm' }
    & Pick<NetTerm, 'credit_limit' | 'used_credit' | 'available_credit'>
  )>, getAllCustomerDocuments: Maybe<Array<Maybe<(
    { __typename?: 'CustomerDocumentType' }
    & Pick<CustomerDocumentType, '_id' | 'customer_document_name' | 'document_file_path' | 'is_email' | 'id_download' | 'created_at' | 'document_extension'>
    & { Customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name'>
    )> }
  )>>> }
);

export type GetDevicesByCustomerQueryVariables = {
  input?: Maybe<SearchDeviceInput>
};


export type GetDevicesByCustomerQuery = (
  { __typename?: 'Query' }
  & { getDevicesByCustomer: Maybe<Array<Maybe<(
    { __typename?: 'Device' }
    & Pick<Device, '_id' | 'device_color' | 'imei_ssn' | 'device_image' | 'device_keeping_unit'>
    & { deviceBrand: Maybe<(
      { __typename?: 'SystemBrand' }
      & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
    )>, deviceModel: Maybe<(
      { __typename?: 'DeviceModel' }
      & Pick<DeviceModel, '_id' | 'name'>
    )>, Customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, '_id' | 'first_name' | 'last_name' | 'phone' | 'address_1'>
    )>, business_id: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )>, location_id: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id'>
    )> }
  )>>> }
);

export type GetDeviceByIdQueryVariables = {
  device_id: Scalars['ID']
};


export type GetDeviceByIdQuery = (
  { __typename?: 'Query' }
  & { getDeviceById: Maybe<(
    { __typename?: 'Device' }
    & Pick<Device, '_id' | 'device_color' | 'imei_ssn' | 'device_image' | 'device_keeping_unit'>
    & { deviceBrand: Maybe<(
      { __typename?: 'SystemBrand' }
      & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
    )>, deviceModel: Maybe<(
      { __typename?: 'DeviceModel' }
      & Pick<DeviceModel, '_id' | 'name'>
    )>, Customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, '_id' | 'first_name' | 'last_name' | 'phone' | 'address_1'>
    )>, business_id: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )>, location_id: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id'>
    )> }
  )> }
);

export type CheckImeiSsnNoQueryVariables = {
  imei_ssn: Scalars['String']
};


export type CheckImeiSsnNoQuery = (
  { __typename?: 'Query' }
  & { checkImeiSsnNo: Maybe<(
    { __typename?: 'Device' }
    & Pick<Device, '_id' | 'device_color' | 'imei_ssn' | 'device_image' | 'device_keeping_unit'>
    & { deviceBrand: Maybe<(
      { __typename?: 'SystemBrand' }
      & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
    )>, deviceModel: Maybe<(
      { __typename?: 'DeviceModel' }
      & Pick<DeviceModel, '_id' | 'name'>
    )>, Customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, '_id'>
    )>, business_id: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )>, location_id: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id'>
    )> }
  )> }
);

export type GetCustomerByIdQueryVariables = {
  customerID: Scalars['ID'],
  location_id: Scalars['ID']
};


export type GetCustomerByIdQuery = (
  { __typename?: 'Query' }
  & { getCustomerById: Maybe<(
    { __typename?: 'Customer' }
    & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'can_email' | 'can_sms' | 'marketing_question' | 'is_linked' | 'tags'>
    & { location_id: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name'>
    )>, linkedStores: Maybe<Array<Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name' | 'store_nick_name' | 'location_keeping_unit'>
    )>>>, CustomerStoreWiseRecord: Maybe<Array<Maybe<(
      { __typename?: 'CustomerStoreWise' }
      & Pick<CustomerStoreWise, 'can_sms' | 'can_email' | 'is_active'>
      & { net_term: Maybe<(
        { __typename?: 'CustomerNetTerm' }
        & Pick<CustomerNetTerm, 'pay_term_number' | 'pay_term_type' | 'credit_limit' | 'interest_rate'>
      )>, store_credit: Maybe<(
        { __typename?: 'CustomerstoreCredit' }
        & Pick<CustomerstoreCredit, 'credit_amount'>
      )> }
    )>>> }
  )> }
);

export type DeleteDeviceMutationVariables = {
  device_id?: Maybe<Array<Maybe<Scalars['ID']>>>
};


export type DeleteDeviceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteDevice'>
);

export type UpdateCustomerPhoneNumberMutationVariables = {
  customer_id: Scalars['ID'],
  phone?: Maybe<Scalars['String']>,
  location_id: Scalars['ID']
};


export type UpdateCustomerPhoneNumberMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateCustomerPhoneNumber'>
);

export type PermanentDeleteDeviceMutationVariables = {
  device_id?: Maybe<Array<Maybe<Scalars['ID']>>>
};


export type PermanentDeleteDeviceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'permanentDeleteDevice'>
);

export type LinkCustomerToStoreMutationVariables = {
  customerID: Scalars['ID'],
  location_id: Scalars['ID']
};


export type LinkCustomerToStoreMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'linkCustomerToStore'>
);

export type UnLinkCustomerToStoreMutationVariables = {
  customerID: Scalars['ID'],
  location_id: Scalars['ID']
};


export type UnLinkCustomerToStoreMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unLinkCustomerToStore'>
);

export type MergeCustomerMutationVariables = {
  primaryCustomerID: Scalars['ID'],
  secondaryCustomerID: Scalars['ID']
};


export type MergeCustomerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'MergeCustomer'>
);

export type RestoreCustomerMutationVariables = {
  customer_id?: Maybe<Array<Maybe<Scalars['ID']>>>
};


export type RestoreCustomerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'restoreCustomer'>
);

export type TransferDeviceMutationVariables = {
  customerID: Scalars['ID'],
  deviceID: Scalars['ID']
};


export type TransferDeviceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'TransferDevice'>
);

export type MergeDevicesMutationVariables = {
  primaryDeviceID: Scalars['ID'],
  secondaryDeviceID: Scalars['ID']
};


export type MergeDevicesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'MergeDevices'>
);

export type PermanentDeleteCustomerMutationVariables = {
  customer_id?: Maybe<Array<Scalars['ID']>>,
  location_id: Scalars['ID'],
  username: Scalars['String'],
  password: Scalars['String']
};


export type PermanentDeleteCustomerMutation = (
  { __typename?: 'Mutation' }
  & { permanentDeleteCustomer: Maybe<(
    { __typename?: 'CustomerPermanentDeleteType' }
    & { deletedCustomers: Maybe<Array<Maybe<(
      { __typename?: 'CustomerDeleteType' }
      & Pick<CustomerDeleteType, '_id' | 'email' | 'first_name' | 'last_name' | 'phone'>
    )>>>, notDeletedCustomers: Maybe<Array<Maybe<(
      { __typename?: 'CustomerDeleteType' }
      & Pick<CustomerDeleteType, '_id' | 'email' | 'first_name' | 'last_name' | 'phone'>
    )>>> }
  )> }
);

export type GetDeviceHistoryQueryVariables = {
  device_id: Scalars['ID'],
  location_id?: Maybe<Scalars['ID']>
};


export type GetDeviceHistoryQuery = (
  { __typename?: 'Query' }
  & { getDeviceHistory: Maybe<Array<Maybe<(
    { __typename?: 'DeviceHistory' }
    & Pick<DeviceHistory, 'date' | 'store_id' | 'client_id' | 'invoice_store_name' | 'inovice_no'>
    & { device: Maybe<(
      { __typename?: 'Device' }
      & Pick<Device, '_id' | 'device_color' | 'imei_ssn'>
      & { deviceBrand: Maybe<(
        { __typename?: 'SystemBrand' }
        & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
      )>, deviceModel: Maybe<(
        { __typename?: 'DeviceModel' }
        & Pick<DeviceModel, '_id' | 'name'>
      )> }
    )>, services_detail: Maybe<Array<Maybe<(
      { __typename?: 'TransactionServiceType' }
      & { TransactionService: Maybe<(
        { __typename?: 'TransactionSellLine' }
        & { Product: Maybe<(
          { __typename?: 'Product' }
          & Pick<Product, '_id' | 'product_name'>
        )>, serviceProduct: Maybe<Array<Maybe<(
          { __typename?: 'ServiceProducts' }
          & Pick<ServiceProducts, '_id' | 'serviceProductType' | 'serviceProductSKU' | 'serviceProductQuantity' | 'serviceProductSupplier' | 'serviceReason' | 'serviceSerialNo' | 'serviceNotes' | 'service_repair_room_item_type'>
          & { serviceProductId: Maybe<(
            { __typename?: 'Product' }
            & Pick<Product, '_id' | 'product_name'>
          )>, serviceCustomProductId: Maybe<(
            { __typename?: 'CustomProduct' }
            & Pick<CustomProduct, '_id' | 'name'>
          )> }
        )>>> }
      )>, technicionRepair: Maybe<(
        { __typename?: 'TechnicionRepairType' }
        & Pick<TechnicionRepairType, 'log_time'>
        & { Technicion: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'first_name' | 'last_name'>
        )> }
      )> }
    )>>> }
  )>>> }
);

export type RestoreDeviceMutationVariables = {
  device_id?: Maybe<Array<Maybe<Scalars['ID']>>>
};


export type RestoreDeviceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'restoreDevice'>
);

export type GetStoreCreditLogsQueryVariables = {
  customerId: Scalars['ID'],
  locationId?: Maybe<Scalars['ID']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type GetStoreCreditLogsQuery = (
  { __typename?: 'Query' }
  & { getStoreCreditLogs: Maybe<Array<Maybe<(
    { __typename?: 'StoreCredit' }
    & Pick<StoreCredit, 'date' | 'is_increase' | 'transaction_no' | 'order_id' | 'store_credit_keeping_unit' | 'amount' | 'balance' | 'note' | 'reason' | 'created_at'>
    & { User: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone'>
    ), Customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name' | 'phone'>
    )>, Supplier: Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website'>
    )>, from_storeId: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name' | 'store_nick_name' | 'location_keeping_unit'>
    )>, to_storeId: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name' | 'store_nick_name' | 'location_keeping_unit'>
    )> }
  )>>> }
);

export type CreateFolderMutationVariables = {
  input?: Maybe<FolderInput>
};


export type CreateFolderMutation = (
  { __typename?: 'Mutation' }
  & { createFolder: Maybe<(
    { __typename?: 'Directory' }
    & Pick<Directory, '_id' | 'name' | 'model_type'>
    & { model_id: (
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name'>
    ), SourceFile: Maybe<Array<(
      { __typename?: 'SourceFile' }
      & Pick<SourceFile, '_id' | 'name' | 'path' | 'model_type' | 'model_id'>
    )>> }
  )> }
);

export type FileUploadMutationVariables = {
  file?: Maybe<Array<Scalars['Upload']>>,
  input: InputTypefile
};


export type FileUploadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'fileUpload'>
);

export type GetfoldersWithFilesQueryVariables = {
  location_id: Scalars['ID'],
  model_type?: Maybe<AllowedModel>,
  model_id: Scalars['ID']
};


export type GetfoldersWithFilesQuery = (
  { __typename?: 'Query' }
  & { getfoldersWithFiles: Maybe<Array<Maybe<(
    { __typename?: 'Directory' }
    & Pick<Directory, '_id' | 'name' | 'model_type' | 'model_id'>
    & { SourceFile: Maybe<Array<(
      { __typename?: 'SourceFile' }
      & Pick<SourceFile, '_id' | 'name' | 'path' | 'model_type' | 'model_id' | 'created_at'>
      & { created_by: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone'>
      )> }
    )>> }
  )>>> }
);

export type CreateStoreCreditMutationVariables = {
  customerStoreCreditInput?: Maybe<CustomerStoreCreditInput>
};


export type CreateStoreCreditMutation = (
  { __typename?: 'Mutation' }
  & { createStoreCredit: Maybe<(
    { __typename?: 'StoreCredit' }
    & Pick<StoreCredit, 'is_increase' | 'amount' | 'balance' | 'note' | 'reason' | 'created_at'>
    & { User: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone'>
    ), Customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name' | 'phone'>
    )> }
  )> }
);

export type ImportCustomerMutationVariables = {
  input?: Maybe<Array<Maybe<CustomerImportInput>>>
};


export type ImportCustomerMutation = (
  { __typename?: 'Mutation' }
  & { importCustomer: Maybe<(
    { __typename?: 'ImportCustomerType' }
    & { alreadyExistCustomers: Maybe<Array<Maybe<(
      { __typename?: 'CustomerImportType' }
      & Pick<CustomerImportType, '_id'>
    )>>>, InvalidDataCustomers: Maybe<Array<Maybe<(
      { __typename?: 'CustomerImportType' }
      & Pick<CustomerImportType, '_id'>
    )>>>, newlyAddedCustomers: Maybe<Array<Maybe<(
      { __typename?: 'CustomerImportType' }
      & Pick<CustomerImportType, '_id'>
    )>>> }
  )> }
);

export type ImportDevicesMutationVariables = {
  customer_id: Scalars['ID'],
  input?: Maybe<Array<DeviceImportInput>>
};


export type ImportDevicesMutation = (
  { __typename?: 'Mutation' }
  & { importDevices: Maybe<(
    { __typename?: 'deviceImportType' }
    & Pick<DeviceImportType, 'customer_id'>
    & { alreadyExistDevices: Maybe<Array<Maybe<(
      { __typename?: 'importDeviceType' }
      & Pick<ImportDeviceType, '_id'>
    )>>>, InvalidDataDevices: Maybe<Array<Maybe<(
      { __typename?: 'importDeviceType' }
      & Pick<ImportDeviceType, '_id'>
    )>>>, newlyAddedDevices: Maybe<Array<Maybe<(
      { __typename?: 'importDeviceType' }
      & Pick<ImportDeviceType, '_id'>
    )>>> }
  )> }
);

export type GetCustomerNetDetailQueryVariables = {
  customerId: Scalars['ID'],
  locationId?: Maybe<Scalars['ID']>
};


export type GetCustomerNetDetailQuery = (
  { __typename?: 'Query' }
  & { getCustomerNetDetail: Maybe<(
    { __typename?: 'NetTerm' }
    & Pick<NetTerm, 'credit_limit' | 'used_credit' | 'available_credit' | 'over_dues'>
  )> }
);

export type CustomerPurchaseHistoryQueryVariables = {
  customerID: Scalars['ID'],
  location_id: Scalars['ID']
};


export type CustomerPurchaseHistoryQuery = (
  { __typename?: 'Query' }
  & { CustomerPurchaseHistory: Maybe<(
    { __typename?: 'CustomerPurchaseHistoryType' }
    & Pick<CustomerPurchaseHistoryType, 'total_amount_spend' | 'total_number_of_visits' | 'average_purchase_per_visit' | 'average_number_of_items_per_visit'>
  )> }
);

export type CreateTransferCreditMutationVariables = {
  customerTransferStoreCreditInput?: Maybe<CustomerTransferStoreCreditInput>
};


export type CreateTransferCreditMutation = (
  { __typename?: 'Mutation' }
  & { createTransferCredit: Maybe<(
    { __typename?: 'StoreCredit' }
    & Pick<StoreCredit, 'amount' | 'note' | 'reason' | 'store_credit_keeping_unit' | 'balance' | 'is_increase' | 'order_id' | 'created_at'>
    & { User: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone'>
    ) }
  )> }
);

export type CustomerNetTermRecordQueryVariables = {
  customer_id: Scalars['ID'],
  location_id: Scalars['ID'],
  limit: Scalars['Int'],
  skip: Scalars['Int']
};


export type CustomerNetTermRecordQuery = (
  { __typename?: 'Query' }
  & { customerNetTermRecord: Maybe<Array<Maybe<(
    { __typename?: 'CustomerNetTermRecordType' }
    & Pick<CustomerNetTermRecordType, 'transactionID' | 'date' | 'day_left' | 'order_no' | 'total' | 'amount_owed' | 'amount_pay' | 'balance' | 'is_overdue'>
    & { dynamic_status: Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )> }
  )>>> }
);

export type CreateCustomerDocumentMutationVariables = {
  input?: Maybe<CustomerDocumentInput>,
  file: Scalars['Upload']
};


export type CreateCustomerDocumentMutation = (
  { __typename?: 'Mutation' }
  & { createCustomerDocument: Maybe<(
    { __typename?: 'CustomerDocumentType' }
    & Pick<CustomerDocumentType, '_id'>
  )> }
);

export type DeleteCustomerDocumentMutationVariables = {
  _id?: Maybe<Array<Scalars['ID']>>
};


export type DeleteCustomerDocumentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCustomerDocument'>
);

export type SendCustomerDocumentByEmailQueryVariables = {
  customerId: Scalars['ID'],
  documentURL: Scalars['String'],
  file_name: Scalars['String']
};


export type SendCustomerDocumentByEmailQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'sendCustomerDocumentByEmail'>
);

export type CreateNetTermPaymentMutationVariables = {
  input?: Maybe<NetTermPaymentProcessInput>
};


export type CreateNetTermPaymentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createNetTermPayment'>
);

export type CreateDeviceMutationVariables = {
  input?: Maybe<DeviceInput>
};


export type CreateDeviceMutation = (
  { __typename?: 'Mutation' }
  & { createDevice: Maybe<(
    { __typename?: 'Device' }
    & Pick<Device, '_id' | 'device_color' | 'imei_ssn' | 'device_image' | 'device_keeping_unit'>
    & { deviceBrand: Maybe<(
      { __typename?: 'SystemBrand' }
      & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
    )>, deviceModel: Maybe<(
      { __typename?: 'DeviceModel' }
      & Pick<DeviceModel, '_id' | 'name'>
    )>, Customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, '_id'>
    )>, business_id: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )>, location_id: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id'>
    )> }
  )> }
);

export type UpdateDeviceMutationVariables = {
  device_id: Scalars['ID'],
  input?: Maybe<DeviceInput>
};


export type UpdateDeviceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateDevice'>
);

export type CreateSystemBrandMutationVariables = {
  input?: Maybe<SystemBrandInput>
};


export type CreateSystemBrandMutation = (
  { __typename?: 'Mutation' }
  & { createSystemBrand: Maybe<(
    { __typename?: 'SystemBrand' }
    & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
  )> }
);

export type CreateSystemDeviceMutationVariables = {
  input?: Maybe<SystemDeviceInput>
};


export type CreateSystemDeviceMutation = (
  { __typename?: 'Mutation' }
  & { createSystemDevice: Maybe<(
    { __typename?: 'SystemDevice' }
    & Pick<SystemDevice, '_id' | 'product_name' | 'product_price' | 'quantity' | 'description' | 'is_system_created'>
    & { BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id'>
    )>, product_brand: Maybe<(
      { __typename?: 'SystemBrand' }
      & Pick<SystemBrand, '_id'>
    )> }
  )> }
);

export type GetAllBrandWiseModelsQueryVariables = {
  brand_id: Scalars['ID']
};


export type GetAllBrandWiseModelsQuery = (
  { __typename?: 'Query' }
  & { getAllBrandWiseModels: Maybe<Array<Maybe<(
    { __typename?: 'SystemDevice' }
    & Pick<SystemDevice, '_id' | 'product_name' | 'product_price' | 'quantity' | 'description' | 'is_system_created'>
    & { product_brand: Maybe<(
      { __typename?: 'SystemBrand' }
      & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
    )> }
  )>>> }
);

export type GetAllBrandsQueryVariables = {};


export type GetAllBrandsQuery = (
  { __typename?: 'Query' }
  & { getAllBrands: Maybe<Array<Maybe<(
    { __typename?: 'Brand' }
    & Pick<Brand, '_id' | 'name' | 'description' | 'brand_type'>
  )>>> }
);

export type UpdateSystemBrandMutationVariables = {
  id: Scalars['ID'],
  input?: Maybe<SystemBrandInput>
};


export type UpdateSystemBrandMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateSystemBrand'>
);

export type UpdateSystemDeviceMutationVariables = {
  ID: Scalars['ID'],
  input?: Maybe<SystemDeviceInput>
};


export type UpdateSystemDeviceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateSystemDevice'>
);

export type GetAllSystemBrandsQueryVariables = {};


export type GetAllSystemBrandsQuery = (
  { __typename?: 'Query' }
  & { getAllSystemBrands: Maybe<Array<Maybe<(
    { __typename?: 'SystemBrand' }
    & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
  )>>> }
);

export type CreateDeviceCheckInsMutationVariables = {
  device_id?: Maybe<Scalars['ID']>,
  input?: Maybe<DeviceCheckInsInput>,
  file?: Maybe<Array<Maybe<Scalars['Upload']>>>
};


export type CreateDeviceCheckInsMutation = (
  { __typename?: 'Mutation' }
  & { createDeviceCheckIns: Maybe<(
    { __typename?: 'DeviceCheckIns' }
    & Pick<DeviceCheckIns, '_id' | 'client_name' | 'client_phone_number' | 'client_device_id' | 'check_in_date' | 'carrier' | 'password' | 'device_issue' | 'step_to_reproduce' | 'cosmetic_condition' | 'device_canbe_tested' | 'reason_for_canbe_tested' | 'device_previously_repaired' | 'device_type_previous_repair' | 'place_repair_done' | 'is_water_damage' | 'is_warranty' | 'battery_life' | 'approved_to_device_restored' | 'note' | 'is_pattern' | 'pattern_code'>
    & { Device: Maybe<(
      { __typename?: 'Device' }
      & Pick<Device, '_id' | 'device_keeping_unit'>
    )>, DeviceIssues: Maybe<Array<Maybe<(
      { __typename?: 'DeviceIssues' }
      & Pick<DeviceIssues, '_id' | 'name' | 'type'>
    )>>>, DeviceItems: Maybe<Array<Maybe<(
      { __typename?: 'DeviceIssues' }
      & Pick<DeviceIssues, '_id' | 'name' | 'type'>
    )>>>, Customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name' | 'phone'>
    )>, SourceFile: Maybe<Array<Maybe<(
      { __typename?: 'SourceFile' }
      & Pick<SourceFile, '_id' | 'name' | 'path' | 'model_type' | 'model_id'>
    )>>> }
  )> }
);

export type GetPreviousDeviceCheckInQueryVariables = {
  customerID: Scalars['ID'],
  checkINDate: Scalars['DateTime']
};


export type GetPreviousDeviceCheckInQuery = (
  { __typename?: 'Query' }
  & { getPreviousDeviceCheckIn: Maybe<(
    { __typename?: 'DeviceCheckIns' }
    & Pick<DeviceCheckIns, '_id' | 'client_name' | 'client_phone_number' | 'client_device_id' | 'check_in_date' | 'carrier' | 'password' | 'device_issue' | 'step_to_reproduce' | 'cosmetic_condition' | 'device_canbe_tested' | 'reason_for_canbe_tested' | 'device_previously_repaired' | 'device_type_previous_repair' | 'place_repair_done' | 'is_water_damage' | 'is_warranty' | 'battery_life' | 'approved_to_device_restored' | 'note' | 'is_pattern' | 'pattern_code'>
    & { Device: Maybe<(
      { __typename?: 'Device' }
      & Pick<Device, '_id' | 'device_keeping_unit'>
    )>, DeviceIssues: Maybe<Array<Maybe<(
      { __typename?: 'DeviceIssues' }
      & Pick<DeviceIssues, '_id' | 'name' | 'type'>
    )>>>, DeviceItems: Maybe<Array<Maybe<(
      { __typename?: 'DeviceIssues' }
      & Pick<DeviceIssues, '_id' | 'name' | 'type'>
    )>>>, Customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name' | 'phone'>
    )>, SourceFile: Maybe<Array<Maybe<(
      { __typename?: 'SourceFile' }
      & Pick<SourceFile, '_id' | 'name' | 'path' | 'model_type' | 'model_id'>
    )>>> }
  )> }
);

export type UploadFileWithoutfolderIdMutationVariables = {
  file?: Maybe<Array<Scalars['Upload']>>,
  input: FolderInput
};


export type UploadFileWithoutfolderIdMutation = (
  { __typename?: 'Mutation' }
  & { uploadFileWithoutfolderID: Maybe<Array<Maybe<(
    { __typename?: 'Directory' }
    & Pick<Directory, '_id' | 'name' | 'model_type' | 'model_id'>
    & { SourceFile: Maybe<Array<(
      { __typename?: 'SourceFile' }
      & Pick<SourceFile, '_id' | 'name' | 'path'>
    )>> }
  )>>> }
);

export type GetdeviceCheckInQueryVariables = {
  id: Scalars['ID']
};


export type GetdeviceCheckInQuery = (
  { __typename?: 'Query' }
  & { getdeviceCheckIn: Maybe<(
    { __typename?: 'DeviceCheckIns' }
    & Pick<DeviceCheckIns, '_id' | 'client_name' | 'client_phone_number' | 'client_device_id' | 'check_in_date' | 'carrier' | 'password' | 'device_issue' | 'step_to_reproduce' | 'cosmetic_condition' | 'device_canbe_tested' | 'reason_for_canbe_tested' | 'device_previously_repaired' | 'device_type_previous_repair' | 'place_repair_done' | 'is_water_damage' | 'is_warranty' | 'battery_life' | 'approved_to_device_restored' | 'note' | 'is_pattern' | 'pattern_code'>
    & { Device: Maybe<(
      { __typename?: 'Device' }
      & Pick<Device, '_id' | 'device_keeping_unit'>
    )>, DeviceIssues: Maybe<Array<Maybe<(
      { __typename?: 'DeviceIssues' }
      & Pick<DeviceIssues, '_id' | 'name' | 'type'>
    )>>>, DeviceItems: Maybe<Array<Maybe<(
      { __typename?: 'DeviceIssues' }
      & Pick<DeviceIssues, '_id' | 'name' | 'type'>
    )>>>, Customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name' | 'phone'>
    )>, SourceFile: Maybe<Array<Maybe<(
      { __typename?: 'SourceFile' }
      & Pick<SourceFile, '_id' | 'name' | 'path' | 'model_type' | 'model_id'>
    )>>> }
  )> }
);

export type CreateDeviceIssuesMutationVariables = {
  input?: Maybe<DeviceIssuesInput>
};


export type CreateDeviceIssuesMutation = (
  { __typename?: 'Mutation' }
  & { createDeviceIssues: Maybe<(
    { __typename?: 'DeviceIssues' }
    & Pick<DeviceIssues, '_id' | 'name' | 'type'>
  )> }
);

export type CreateDiscountMutationVariables = {
  input?: Maybe<DiscountInput>
};


export type CreateDiscountMutation = (
  { __typename?: 'Mutation' }
  & { createDiscount: Maybe<(
    { __typename?: 'Discount' }
    & Pick<Discount, '_id'>
  )> }
);

export type GetDiscountsAndSearchQueryVariables = {
  input?: Maybe<SearchDiscountInput>
};


export type GetDiscountsAndSearchQuery = (
  { __typename?: 'Query' }
  & { getDiscountsAndSearch: Maybe<Array<Maybe<(
    { __typename?: 'Campaign' }
    & Pick<Campaign, '_id' | 'name' | 'start_date' | 'end_date' | 'is_active' | 'updated_at'>
  )>>> }
);

export type UpdateDiscountMutationVariables = {
  id: Scalars['ID'],
  input?: Maybe<DiscountInput>
};


export type UpdateDiscountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateDiscount'>
);

export type DeleteDiscountMutationVariables = {
  id: Scalars['ID']
};


export type DeleteDiscountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteDiscount'>
);

export type SearchInDiscountsQueryVariables = {
  limit: Scalars['Int'],
  skip: Scalars['Int'],
  status?: Maybe<Status>,
  search?: Maybe<Scalars['String']>
};


export type SearchInDiscountsQuery = (
  { __typename?: 'Query' }
  & { searchInDiscounts: Maybe<Array<Maybe<(
    { __typename?: 'Discount' }
    & Pick<Discount, '_id'>
  )>>> }
);

export type GetAllCampaignsQueryVariables = {};


export type GetAllCampaignsQuery = (
  { __typename?: 'Query' }
  & { getCampaigns: Maybe<Array<Maybe<(
    { __typename?: 'Campaign' }
    & Pick<Campaign, '_id' | 'name' | 'start_date' | 'end_date' | 'is_active'>
  )>>> }
);

export type CreateCampaignMutationVariables = {
  input?: Maybe<CampaignInput>
};


export type CreateCampaignMutation = (
  { __typename?: 'Mutation' }
  & { createCampaign: Maybe<(
    { __typename?: 'Campaign' }
    & Pick<Campaign, '_id' | 'name' | 'start_date' | 'end_date' | 'is_active'>
  )> }
);

export type SearchCampaignsQueryVariables = {
  search?: Maybe<Scalars['String']>
};


export type SearchCampaignsQuery = (
  { __typename?: 'Query' }
  & { searchCampaigns: Maybe<Array<Maybe<(
    { __typename?: 'Campaign' }
    & Pick<Campaign, '_id' | 'name' | 'start_date' | 'end_date' | 'is_active'>
  )>>> }
);

export type GetAllTagsOfDiscountQueryVariables = {
  type: Scalars['String']
};


export type GetAllTagsOfDiscountQuery = (
  { __typename?: 'Query' }
  & { tagsByType: Maybe<Array<Maybe<(
    { __typename?: 'Tag' }
    & Pick<Tag, '_id' | 'name'>
  )>>> }
);

export type CreateTagMutationVariables = {
  input?: Maybe<TagInput>
};


export type CreateTagMutation = (
  { __typename?: 'Mutation' }
  & { createTag: Maybe<(
    { __typename?: 'Tag' }
    & Pick<Tag, '_id' | 'name'>
  )> }
);

export type CreateCouponCodeQueryVariables = {};


export type CreateCouponCodeQuery = (
  { __typename?: 'Query' }
  & { createCouponCode: Maybe<(
    { __typename?: 'couponCode' }
    & Pick<CouponCode, 'code'>
  )> }
);

export type SearchTagsByTypeQueryVariables = {
  type: Scalars['String'],
  search?: Maybe<Scalars['String']>
};


export type SearchTagsByTypeQuery = (
  { __typename?: 'Query' }
  & { searchTagsByType: Maybe<Array<Maybe<(
    { __typename?: 'Tag' }
    & Pick<Tag, '_id' | 'name'>
  )>>> }
);

export type GetCampaignswithDiscountsQueryVariables = {
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  search?: Maybe<Scalars['String']>
};


export type GetCampaignswithDiscountsQuery = (
  { __typename?: 'Query' }
  & { getCampaignswithDiscounts: Maybe<Array<Maybe<(
    { __typename?: 'Campaign' }
    & Pick<Campaign, '_id' | 'name' | 'start_date' | 'end_date' | 'is_active'>
  )>>> }
);

export type SendEmailGiftCardQueryVariables = {
  id: Scalars['ID']
};


export type SendEmailGiftCardQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'sendEmailGiftCard'>
);

export type SearchDiscountTagsQueryVariables = {
  search?: Maybe<Scalars['String']>
};


export type SearchDiscountTagsQuery = (
  { __typename?: 'Query' }
  & { searchDiscountTags: Maybe<Array<Maybe<(
    { __typename?: 'Tags' }
    & Pick<Tags, '_id' | 'name'>
  )>>> }
);

export type SearchCustomerTagsQueryVariables = {
  search?: Maybe<Scalars['String']>
};


export type SearchCustomerTagsQuery = (
  { __typename?: 'Query' }
  & { searchCustomerTags: Maybe<Array<Maybe<(
    { __typename?: 'Tags' }
    & Pick<Tags, '_id' | 'name'>
  )>>> }
);

export type EffectDiscountToCustomerQueryVariables = {
  input?: Maybe<ProgressBarInput>
};


export type EffectDiscountToCustomerQuery = (
  { __typename?: 'Query' }
  & { effectDiscountToCustomer: Maybe<(
    { __typename?: 'progressBarData' }
    & Pick<ProgressBarData, 'Total_customer' | 'effect_customer'>
  )> }
);

export type UserPinCodeVerifyMutationVariables = {
  pincode: Scalars['String']
};


export type UserPinCodeVerifyMutation = (
  { __typename?: 'Mutation' }
  & { userPinCodeVerify: Maybe<(
    { __typename?: 'userCLocked' }
    & Pick<UserCLocked, 'oldClockHistoryId' | 'clocked_in_time' | 'status' | 'UserClockInPin'>
    & { User: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first_name' | 'last_name'>
    )> }
  )> }
);

export type UserClockedInMutationVariables = {
  userId: Scalars['ID'],
  userClockInPin: Scalars['ID'],
  oldClockHistoryId?: Maybe<Scalars['ID']>,
  businessLocation: Scalars['ID']
};


export type UserClockedInMutation = (
  { __typename?: 'Mutation' }
  & { userClockedIn: Maybe<(
    { __typename?: 'ClockedHistory' }
    & Pick<ClockedHistory, '_id' | 'clock_in_time' | 'clock_out_time' | 'status' | 'BusinessLocation'>
    & { User: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first_name' | 'last_name'>
    ) }
  )> }
);

export type CreateClientMutationVariables = {
  input?: Maybe<ClientInput>
};


export type CreateClientMutation = (
  { __typename?: 'Mutation' }
  & { createClient: Maybe<(
    { __typename?: 'Client' }
    & Pick<Client, '_id' | 'first_name' | 'last_name' | 'email' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'phone' | 'can_email' | 'can_sms' | 'status' | 'classification' | 'is_check'>
  )> }
);

export type UpdateClientMutationVariables = {
  _id: Scalars['ID'],
  input?: Maybe<ClientInput>
};


export type UpdateClientMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateClient'>
);

export type GetClientQueryVariables = {
  _id: Scalars['ID']
};


export type GetClientQuery = (
  { __typename?: 'Query' }
  & { getClient: Maybe<(
    { __typename?: 'Client' }
    & Pick<Client, '_id' | 'first_name' | 'last_name' | 'email' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'phone' | 'can_email' | 'can_sms' | 'status' | 'classification' | 'is_check'>
  )> }
);

export type GetAllClientsQueryVariables = {
  input?: Maybe<ClientSearchInput>
};


export type GetAllClientsQuery = (
  { __typename?: 'Query' }
  & { getAllClients: Maybe<Array<Maybe<(
    { __typename?: 'Client' }
    & Pick<Client, '_id' | 'first_name' | 'last_name' | 'email' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'phone' | 'can_email' | 'can_sms' | 'status' | 'classification' | 'is_check'>
  )>>> }
);

export type BulkDeleteClientMutationVariables = {
  _id?: Maybe<Array<Scalars['ID']>>
};


export type BulkDeleteClientMutation = (
  { __typename?: 'Mutation' }
  & { bulkDeleteClient: Maybe<Array<Maybe<(
    { __typename?: 'Client' }
    & Pick<Client, '_id' | 'first_name' | 'last_name' | 'email' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'phone' | 'can_email' | 'can_sms' | 'status' | 'classification' | 'is_check'>
  )>>> }
);

export type DeleteClientMutationVariables = {
  _id: Scalars['ID']
};


export type DeleteClientMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteClient'>
);

export type CreateDocumentMutationVariables = {
  input?: Maybe<DocumentInput>,
  file?: Maybe<Scalars['Upload']>
};


export type CreateDocumentMutation = (
  { __typename?: 'Mutation' }
  & { createDocument: Maybe<(
    { __typename?: 'Document' }
    & Pick<Document, '_id' | 'document_name' | 'file_path' | 'addressed_to' | 'status' | 'updated_at'>
  )> }
);

export type UpdateDocumentMutationVariables = {
  _id: Scalars['ID'],
  input?: Maybe<DocumentInput>,
  file?: Maybe<Scalars['Upload']>
};


export type UpdateDocumentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateDocument'>
);

export type GetAllDocumentsQueryVariables = {
  input?: Maybe<DocumentSearchInput>
};


export type GetAllDocumentsQuery = (
  { __typename?: 'Query' }
  & { getAllDocuments: Maybe<Array<Maybe<(
    { __typename?: 'Document' }
    & Pick<Document, '_id' | 'document_name' | 'file_path' | 'addressed_to' | 'status' | 'updated_at'>
  )>>> }
);

export type DeleteDocumentMutationVariables = {
  _id: Scalars['ID']
};


export type DeleteDocumentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteDocument'>
);

export type ClientDocumentFileUploadMutationVariables = {
  client_id: Scalars['ID'],
  document_id: Scalars['ID'],
  file?: Maybe<Scalars['Upload']>
};


export type ClientDocumentFileUploadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clientDocumentFileUpload'>
);

export type ClientDocumentStatusMutationVariables = {
  client_id: Scalars['ID'],
  document_id: Scalars['ID'],
  input?: Maybe<StatusInput>
};


export type ClientDocumentStatusMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'clientDocumentStatus'>
);

export type GetDocumentsByClassificationQueryVariables = {
  client_id: Scalars['ID'],
  classification: ClassificationType
};


export type GetDocumentsByClassificationQuery = (
  { __typename?: 'Query' }
  & { getDocumentsByClassification: Maybe<Array<Maybe<(
    { __typename?: 'ClientDocument' }
    & Pick<ClientDocument, 'document_id' | 'document_name' | 'file_path'>
    & { document_status: Maybe<(
      { __typename?: 'labelStatus' }
      & Pick<LabelStatus, 'status_name' | 'status_background_color' | 'status_font_color' | 'status_icon' | 'status_type'>
    )> }
  )>>> }
);

export type ShareDocumentsQueryVariables = {
  input?: Maybe<ShareDocumentInput>
};


export type ShareDocumentsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'shareDocuments'>
);

export type CreateStatusMutationVariables = {
  input?: Maybe<StatusInput>
};


export type CreateStatusMutation = (
  { __typename?: 'Mutation' }
  & { createStatus: Maybe<(
    { __typename?: 'labelStatus' }
    & Pick<LabelStatus, '_id' | 'status_name' | 'status_background_color'>
  )> }
);

export type GetStatusQueryVariables = {
  businessLocation?: Maybe<Scalars['ID']>,
  status_type: AllowedType
};


export type GetStatusQuery = (
  { __typename?: 'Query' }
  & { getStatus: Maybe<Array<Maybe<(
    { __typename?: 'labelStatus' }
    & Pick<LabelStatus, '_id' | 'status_name' | 'status_background_color' | 'status_font_color' | 'status_icon' | 'status_type'>
  )>>> }
);

export type GetStatusByIdQueryVariables = {
  statusId: Scalars['ID']
};


export type GetStatusByIdQuery = (
  { __typename?: 'Query' }
  & { getStatusById: Maybe<(
    { __typename?: 'labelStatus' }
    & Pick<LabelStatus, '_id' | 'status_name' | 'status_background_color' | 'status_font_color' | 'status_icon' | 'status_type'>
  )> }
);

export type OpenAndCloseCashRegisterMutationVariables = {
  openCashRegisterId?: Maybe<Scalars['ID']>,
  locationId?: Maybe<Scalars['ID']>,
  closeCashRegister?: Maybe<Scalars['ID']>
};


export type OpenAndCloseCashRegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'openAndCloseCashRegister'>
);

export type GetCurrencyWithUnitQueryVariables = {
  location_id?: Maybe<Scalars['ID']>,
  cashRegisterId?: Maybe<Scalars['ID']>
};


export type GetCurrencyWithUnitQuery = (
  { __typename?: 'Query' }
  & { getCurrencyWithUnit: Maybe<(
    { __typename?: 'CurrencyWithUnit' }
    & Pick<CurrencyWithUnit, 'currency_code' | 'expected_amount'>
    & { currency: Maybe<Array<Maybe<(
      { __typename?: 'currencyUnit' }
      & Pick<CurrencyUnit, 'unit'>
    )>>> }
  )> }
);

export type SaveOpenCashDrawerLogMutationVariables = {
  input?: Maybe<OpenCashDrawerInput>
};


export type SaveOpenCashDrawerLogMutation = (
  { __typename?: 'Mutation' }
  & { saveOpenCashDrawerLog: Maybe<(
    { __typename?: 'OpenCashDrawer' }
    & { CashRegisters: Maybe<(
      { __typename?: 'CashRegisters' }
      & Pick<CashRegisters, '_id'>
    )> }
  )> }
);

export type SaveTillCountMutationVariables = {
  input?: Maybe<TillCountInput>
};


export type SaveTillCountMutation = (
  { __typename?: 'Mutation' }
  & { saveTillCount: Maybe<(
    { __typename?: 'TillCount' }
    & Pick<TillCount, 'expected_amount'>
    & { CashRegisters: Maybe<(
      { __typename?: 'CashRegisters' }
      & Pick<CashRegisters, '_id'>
    )> }
  )> }
);

export type GetAllAlertsQueryVariables = {
  location_id: Scalars['ID'],
  alert_type?: Maybe<AlertTypeEnum>
};


export type GetAllAlertsQuery = (
  { __typename?: 'Query' }
  & { getAllAlerts: Maybe<Array<Maybe<(
    { __typename?: 'Alerts' }
    & Pick<Alerts, '_id' | 'alert_title' | 'alert_message' | 'alert_type' | 'alert_timer' | 'created_at'>
  )>>> }
);

export type CheckBusinessQueryVariables = {
  business: Scalars['String']
};


export type CheckBusinessQuery = (
  { __typename?: 'Query' }
  & { checkBusiness: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'business_system_name' | '_id' | 'date_format'>
  )> }
);

export type UserBusinessLocationsQueryVariables = {};


export type UserBusinessLocationsQuery = (
  { __typename?: 'Query' }
  & { userBusinessLocations: Maybe<Array<Maybe<(
    { __typename?: 'BusinessLocation' }
    & Pick<BusinessLocation, 'address_1' | '_id' | 'state' | 'phone' | 'city' | 'email' | 'store_name' | 'store_legal_name' | 'logo' | 'location_keeping_unit'>
  )>>> }
);

export type UsersWithRespectToBusinessesQueryVariables = {
  ID: Scalars['ID']
};


export type UsersWithRespectToBusinessesQuery = (
  { __typename?: 'Query' }
  & { usersWithRespectToBusinesses: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'first_name' | 'last_name' | 'email' | 'id' | 'avatar_location' | 'status' | 'user_keeping_unit'>
  )>>> }
);

export type LoginMutationVariables = {
  Id: Scalars['ID'],
  pass: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: Maybe<(
    { __typename?: 'AuthData' }
    & Pick<AuthData, 'token'>
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email' | 'first_name' | 'last_name' | 'id' | 'avatar_location'>
    )> }
  )> }
);

export type CashRegistersOfLocationQueryVariables = {
  ID: Scalars['ID']
};


export type CashRegistersOfLocationQuery = (
  { __typename?: 'Query' }
  & { cashRegistersOfLocation: Maybe<Array<Maybe<(
    { __typename?: 'CashRegisters' }
    & Pick<CashRegisters, 'name' | '_id' | 'cash_register_keeping_unit' | 'opening_amount' | 'closing_amount' | 'closed_at' | 'status' | 'location_id'>
  )>>> }
);

export type UserClockOutBeforeLogOutMutationVariables = {
  is_check_clockIn: Scalars['Boolean']
};


export type UserClockOutBeforeLogOutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'userClockOutBeforeLogOut'>
);

export type ForgetBusinessUrlQueryVariables = {
  input?: Maybe<ForgetBusinessInput>
};


export type ForgetBusinessUrlQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'forgetBusinessUrl'>
);

export type VerifyforgetBusinessUrlMutationVariables = {
  input?: Maybe<VerifyforgetBusinessUrlInput>
};


export type VerifyforgetBusinessUrlMutation = (
  { __typename?: 'Mutation' }
  & { verifyforgetBusinessUrl: Maybe<Array<Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, '_id' | 'business_system_name' | 'logo' | 'date_format'>
  )>>> }
);

export type UserForgetPasswordMutationVariables = {
  email: Scalars['String'],
  method?: Maybe<AllowMethodPhoneVerify>
};


export type UserForgetPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'userForgetPassword'>
);

export type UserPasswordResetMutationVariables = {
  input?: Maybe<PasswordResetInput>
};


export type UserPasswordResetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'userPasswordReset'>
);

export type GetUserByEmailQueryVariables = {
  email: Scalars['String'],
  businessId: Scalars['ID']
};


export type GetUserByEmailQuery = (
  { __typename?: 'Query' }
  & { getUserByEmail: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'avatar_location' | 'status'>
  )> }
);

export type LoginWithEmailMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String'],
  businessId: Scalars['ID']
};


export type LoginWithEmailMutation = (
  { __typename?: 'Mutation' }
  & { loginWithEmail: Maybe<(
    { __typename?: 'AuthData' }
    & Pick<AuthData, 'token'>
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email' | 'first_name' | 'last_name' | 'avatar_location'>
    )> }
  )> }
);

export type ForgetEmailWithPhoneQueryVariables = {
  businessName: Scalars['String'],
  phoneNumber: Scalars['String']
};


export type ForgetEmailWithPhoneQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'forgetEmailWithPhone'>
);

export type VerifyforgetEmailWithPhoneMutationVariables = {
  businessName: Scalars['String'],
  phoneNumber: Scalars['String'],
  code: Scalars['String']
};


export type VerifyforgetEmailWithPhoneMutation = (
  { __typename?: 'Mutation' }
  & { VerifyforgetEmailWithPhone: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'first_name' | 'last_name' | 'phone' | 'avatar_location' | 'status'>
  )>>> }
);

export type VerifyuserForgetPasswordMutationVariables = {
  code: Scalars['String'],
  email: Scalars['String'],
  method?: Maybe<AllowMethodPhoneVerify>
};


export type VerifyuserForgetPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'VerifyuserForgetPassword'>
);

export type UserLoginByVerificationMutationVariables = {
  email: Scalars['String'],
  code: Scalars['String'],
  method?: Maybe<AllowMethodPhoneVerify>,
  businessId: Scalars['ID']
};


export type UserLoginByVerificationMutation = (
  { __typename?: 'Mutation' }
  & { userLoginByVerification: Maybe<(
    { __typename?: 'AuthData' }
    & Pick<AuthData, 'token'>
    & { user: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'email' | 'first_name' | 'last_name'>
    )> }
  )> }
);

export type SearchOrderByDifferentTypesQueryVariables = {
  type: Scalars['String'],
  search: Scalars['String'],
  locationId?: Maybe<Scalars['ID']>
};


export type SearchOrderByDifferentTypesQuery = (
  { __typename?: 'Query' }
  & { searchOrderByDifferentTypes: Maybe<Array<Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id'>
  )>>> }
);

export type OrdersWithPaginationQueryVariables = {
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  locationId?: Maybe<Scalars['ID']>
};


export type OrdersWithPaginationQuery = (
  { __typename?: 'Query' }
  & { orders: Maybe<Array<Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id'>
  )>>> }
);

export type GetOrdersAndSearchQueryVariables = {
  input?: Maybe<SearchOrderInput>
};


export type GetOrdersAndSearchQuery = (
  { __typename?: 'Query' }
  & { getOrdersAndSearch: Maybe<Array<Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id'>
  )>>> }
);

export type GetTicketswithfilterQueryVariables = {
  input?: Maybe<InputTicketsFilter>
};


export type GetTicketswithfilterQuery = (
  { __typename?: 'Query' }
  & { getTicketswithfilter: Maybe<(
    { __typename?: 'tickets' }
    & Pick<Tickets, 'count'>
    & { transaction: Maybe<Array<Maybe<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, '_id' | 'transaction_date' | 'is_repair_done' | 'is_checkout' | 'invoice_for_repair_room' | 'transaction_type' | 'transaction_status' | 'total_amount' | 'remaining_amount' | 'transaction_keeping_unit' | 'repair_room_color_pallet'>
      & { Customer: Maybe<(
        { __typename?: 'Customer' }
        & Pick<Customer, 'first_name' | 'last_name' | 'phone'>
      )>, repire_room_status: Maybe<(
        { __typename?: 'TPstatus' }
        & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
      )> }
    )>>> }
  )> }
);

export type GetTicketDetailByIdQueryVariables = {
  orderID?: Maybe<Scalars['ID']>,
  businessLocation?: Maybe<Scalars['ID']>
};


export type GetTicketDetailByIdQuery = (
  { __typename?: 'Query' }
  & { getTicketDetailById: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'transaction_type' | 'transaction_status' | 'order_status' | 'transaction_payment_status' | 'transaction_keeping_unit' | 'ref_no' | 'supplier_order_number' | 'transaction_date' | 'transaction_hours' | 'transaction_minutes' | 'transaction_am_pm' | 'sub_total_amount' | 'is_apply_sale_tax' | 'tax_amount' | 'tax_value' | 'is_tax_percentage' | 'discount_amount' | 'discount_value' | 'is_discount_percentage' | 'shipping_company_name' | 'shipping_tracking_no' | 'shipping_estimated_days' | 'shipping_amount' | 'delivery_address' | 'total_amount' | 'remaining_amount' | 'is_private' | 'additional_notes' | 'received_note' | 'receivedBy' | 'receivedDate' | 'arrival_Date' | 'received_additional_cost' | 'is_tax_refund' | 'is_coupon_apply' | 'coupon_code' | 'filter_type' | 'invoice_for_repair_room'>
    & { Tax: Maybe<(
      { __typename?: 'Tax' }
      & Pick<Tax, '_id' | 'name' | 'amount' | 'tax_type' | 'is_percentage'>
    )>, TransactionSellLine: Maybe<Array<Maybe<(
      { __typename?: 'TransactionSellLine' }
      & Pick<TransactionSellLine, '_id' | 'is_device' | 'is_attach_device' | 'product_type' | 'sell_line_product_type' | 'product_sku' | 'supplier_sku' | 'quantity' | 'product_purchase_price' | 'product_sale_price' | 'tax_amount' | 'tax_value' | 'is_tax_percentage' | 'is_discount_percentage' | 'discount_amount' | 'discount_value' | 'sub_total_amount' | 'total_amount' | 'serial_number' | 'return_quantity' | 'back_to_stock' | 'reason' | 'is_refund_item'>
      & { Device: Maybe<(
        { __typename?: 'Device' }
        & Pick<Device, '_id' | 'device_keeping_unit'>
        & { deviceBrand: Maybe<(
          { __typename?: 'SystemBrand' }
          & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
        )>, deviceModel: Maybe<(
          { __typename?: 'DeviceModel' }
          & Pick<DeviceModel, '_id' | 'name'>
        )> }
      )>, Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, '_id' | 'product_name' | 'is_bundle_product' | 'is_product' | 'description'>
        & { bundle_products: Maybe<(
          { __typename?: 'bundleProductInfo' }
          & Pick<BundleProductInfo, 'total_selling_price' | 'total_avg_cost' | 'is_manufactured_qty'>
          & { bundleProduct: Maybe<Array<Maybe<(
            { __typename?: 'bundleProduct' }
            & Pick<BundleProduct, 'avg_cost' | 'quantity' | 'selling_price'>
            & { bundleProductID: Maybe<(
              { __typename?: 'Product' }
              & Pick<Product, '_id' | 'product_name' | 'sku'>
            )> }
          )>>> }
        )> }
      )>, products: Maybe<Array<Maybe<(
        { __typename?: 'assignedProducts' }
        & Pick<AssignedProducts, '_id' | 'product_type' | 'sell_line_product_type' | 'discount_amount' | 'discount_value' | 'product_sku' | 'supplier_sku' | 'quantity' | 'product_purchase_price' | 'product_sale_price' | 'sub_total_amount' | 'total_amount' | 'serial_number' | 'return_quantity' | 'back_to_stock' | 'reason' | 'is_refund_item'>
        & { Product: Maybe<(
          { __typename?: 'Product' }
          & Pick<Product, '_id' | 'product_name' | 'is_product' | 'description'>
        )>, serviceProduct: Maybe<Array<Maybe<(
          { __typename?: 'ServiceProducts' }
          & Pick<ServiceProducts, '_id' | 'serviceProductType' | 'serviceProductSKU' | 'serviceProductQuantity'>
          & { serviceProductId: Maybe<(
            { __typename?: 'Product' }
            & Pick<Product, 'product_name'>
          )>, serviceCustomProductId: Maybe<(
            { __typename?: 'CustomProduct' }
            & Pick<CustomProduct, '_id' | 'name'>
          )> }
        )>>>, customProduct: Maybe<(
          { __typename?: 'CustomProduct' }
          & Pick<CustomProduct, '_id' | 'name'>
        )> }
      )>>>, GiftCard: Maybe<(
        { __typename?: 'GiftCard' }
        & Pick<GiftCard, '_id' | 'card_no' | 'gift_card_keeping_unit' | 'name'>
      )>, customProduct: Maybe<(
        { __typename?: 'CustomProduct' }
        & Pick<CustomProduct, '_id' | 'name' | 'quantity' | 'cost_price' | 'selling_price' | 'note' | 'is_taxable'>
      )> }
    )>>>, TransactionPayment: Maybe<Array<Maybe<(
      { __typename?: 'TransactionPayment' }
      & Pick<TransactionPayment, '_id' | 'amount' | 'method' | 'paid_on' | 'card_used_no' | 'is_paid_amount'>
    )>>>, Customer: Maybe<(
      { __typename?: 'Customer' }
      & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name'>
      & { CustomerStoreWiseRecord: Maybe<Array<Maybe<(
        { __typename?: 'CustomerStoreWise' }
        & { net_term: Maybe<(
          { __typename?: 'CustomerNetTerm' }
          & Pick<CustomerNetTerm, 'pay_term_number' | 'pay_term_type' | 'credit_limit' | 'interest_rate'>
        )>, store_credit: Maybe<(
          { __typename?: 'CustomerstoreCredit' }
          & Pick<CustomerstoreCredit, 'credit_amount'>
        )> }
      )>>> }
    )>, tax_refund: Maybe<(
      { __typename?: 'TaxRefundDocument' }
      & Pick<TaxRefundDocument, 'state' | 'tax_certificate_id' | 'document_path'>
    )>, TicketLogs: Maybe<Array<Maybe<(
      { __typename?: 'TicketLog' }
      & Pick<TicketLog, '_id' | 'date' | 'remarks'>
    )>>> }
  )> }
);

export type RepairRoomStatusQueryVariables = {};


export type RepairRoomStatusQuery = (
  { __typename?: 'Query' }
  & { repairRoomStatus: Maybe<Array<Maybe<(
    { __typename?: 'labelStatus' }
    & Pick<LabelStatus, '_id' | 'status_name' | 'status_background_color' | 'status_font_color' | 'status_icon' | 'status_type'>
  )>>> }
);

export type CreateTaxRefundMutationVariables = {
  input?: Maybe<InputUploadTaxDocument>
};


export type CreateTaxRefundMutation = (
  { __typename?: 'Mutation' }
  & { createTaxRefund: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'total_amount' | 'sub_total_amount' | 'is_tax_refund' | 'filter_type' | 'remaining_amount'>
    & { tax_refund: Maybe<(
      { __typename?: 'TaxRefundDocument' }
      & Pick<TaxRefundDocument, 'state' | 'tax_certificate_id' | 'document_path'>
    )>, TicketLogs: Maybe<Array<Maybe<(
      { __typename?: 'TicketLog' }
      & Pick<TicketLog, '_id' | 'date' | 'remarks'>
    )>>> }
  )> }
);

export type EmailTicketQueryVariables = {
  orderID?: Maybe<Scalars['ID']>,
  businessLocation?: Maybe<Scalars['ID']>
};


export type EmailTicketQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'emailTicket'>
);

export type InvoiceRefundByAmountMutationVariables = {
  input?: Maybe<InvoiceAmountRefundInput>
};


export type InvoiceRefundByAmountMutation = (
  { __typename?: 'Mutation' }
  & { InvoiceRefundByAmount: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'total_amount' | 'sub_total_amount' | 'is_tax_refund' | 'filter_type' | 'remaining_amount'>
    & { tax_refund: Maybe<(
      { __typename?: 'TaxRefundDocument' }
      & Pick<TaxRefundDocument, 'state' | 'tax_certificate_id' | 'document_path'>
    )>, TicketLogs: Maybe<Array<Maybe<(
      { __typename?: 'TicketLog' }
      & Pick<TicketLog, '_id' | 'date' | 'remarks'>
    )>>> }
  )> }
);

export type InvoiceRefundByItemsMutationVariables = {
  transactionID: Scalars['ID'],
  location_id: Scalars['ID'],
  transactionReturnItems?: Maybe<Array<Maybe<TransactionReturnItemInput>>>
};


export type InvoiceRefundByItemsMutation = (
  { __typename?: 'Mutation' }
  & { InvoiceRefundByItems: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'total_amount' | 'sub_total_amount' | 'is_tax_refund' | 'filter_type' | 'remaining_amount'>
    & { tax_refund: Maybe<(
      { __typename?: 'TaxRefundDocument' }
      & Pick<TaxRefundDocument, 'state' | 'tax_certificate_id' | 'document_path'>
    )>, TicketLogs: Maybe<Array<Maybe<(
      { __typename?: 'TicketLog' }
      & Pick<TicketLog, '_id' | 'date' | 'remarks'>
    )>>>, TransactionSellLine: Maybe<Array<Maybe<(
      { __typename?: 'TransactionSellLine' }
      & Pick<TransactionSellLine, '_id' | 'is_device' | 'is_attach_device' | 'product_type' | 'sell_line_product_type' | 'product_sku' | 'supplier_sku' | 'quantity' | 'product_purchase_price' | 'product_sale_price' | 'tax_amount' | 'tax_value' | 'is_tax_percentage' | 'is_discount_percentage' | 'discount_amount' | 'discount_value' | 'sub_total_amount' | 'total_amount' | 'serial_number' | 'return_quantity' | 'back_to_stock' | 'reason' | 'is_refund_item'>
      & { Device: Maybe<(
        { __typename?: 'Device' }
        & Pick<Device, '_id' | 'device_keeping_unit'>
        & { deviceBrand: Maybe<(
          { __typename?: 'SystemBrand' }
          & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
        )>, deviceModel: Maybe<(
          { __typename?: 'DeviceModel' }
          & Pick<DeviceModel, '_id' | 'name'>
        )> }
      )>, Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, '_id' | 'product_name' | 'is_bundle_product' | 'is_product' | 'description'>
        & { bundle_products: Maybe<(
          { __typename?: 'bundleProductInfo' }
          & Pick<BundleProductInfo, 'total_selling_price' | 'total_avg_cost' | 'is_manufactured_qty'>
          & { bundleProduct: Maybe<Array<Maybe<(
            { __typename?: 'bundleProduct' }
            & Pick<BundleProduct, 'avg_cost' | 'quantity' | 'selling_price'>
            & { bundleProductID: Maybe<(
              { __typename?: 'Product' }
              & Pick<Product, '_id' | 'product_name' | 'sku'>
            )> }
          )>>> }
        )> }
      )>, products: Maybe<Array<Maybe<(
        { __typename?: 'assignedProducts' }
        & Pick<AssignedProducts, 'product_type' | 'sell_line_product_type' | 'product_sku' | 'supplier_sku' | 'quantity' | 'product_purchase_price' | 'product_sale_price' | 'sub_total_amount' | 'total_amount' | 'serial_number' | 'return_quantity' | 'back_to_stock' | 'reason' | 'is_refund_item'>
        & { Product: Maybe<(
          { __typename?: 'Product' }
          & Pick<Product, '_id' | 'product_name' | 'is_product' | 'description'>
        )> }
      )>>>, GiftCard: Maybe<(
        { __typename?: 'GiftCard' }
        & Pick<GiftCard, '_id' | 'card_no' | 'gift_card_keeping_unit' | 'name'>
      )>, customProduct: Maybe<(
        { __typename?: 'CustomProduct' }
        & Pick<CustomProduct, '_id' | 'name' | 'quantity' | 'cost_price' | 'selling_price' | 'note' | 'is_taxable'>
      )> }
    )>>> }
  )> }
);

export type TaskDeviceReOpenMutationVariables = {
  transactionID: Scalars['ID'],
  location_id: Scalars['ID'],
  inputDevice?: Maybe<Array<Maybe<DeviceServicesInput>>>
};


export type TaskDeviceReOpenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'taskDeviceReOpen'>
);

export type CheckOutTicketMutationVariables = {
  transactionID: Scalars['ID'],
  location_id: Scalars['ID']
};


export type CheckOutTicketMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'checkOutTicket'>
);

export type ChequePaymentVerifyMutationVariables = {
  input?: Maybe<ChequePaymentVerifyInput>
};


export type ChequePaymentVerifyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'chequePaymentVerify'>
);

export type PayLaterInvoiceMutationVariables = {
  location_id: Scalars['ID'],
  transactionID: Scalars['ID']
};


export type PayLaterInvoiceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'payLaterInvoice'>
);

export type AllCureenciesQueryVariables = {};


export type AllCureenciesQuery = (
  { __typename?: 'Query' }
  & { currency: Maybe<Array<Maybe<(
    { __typename?: 'Currency' }
    & Pick<Currency, '_id' | 'code' | 'country' | 'currency'>
  )>>> }
);

export type CheckUserEmailQueryVariables = {
  email: Scalars['String']
};


export type CheckUserEmailQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'checkUserEmail'>
);

export type CreateBusinessMutationVariables = {
  business?: Maybe<BusinesInput>
};


export type CreateBusinessMutation = (
  { __typename?: 'Mutation' }
  & { createBusiness: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, '_id'>
  )> }
);

export type CheckBusinessSystemNameQueryVariables = {
  name: Scalars['String']
};


export type CheckBusinessSystemNameQuery = (
  { __typename?: 'Query' }
  & { checkBusinessSystemName: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'business_system_name'>
  )> }
);

export type CheckBusinessUniqueCodeQueryVariables = {
  code: Scalars['String']
};


export type CheckBusinessUniqueCodeQuery = (
  { __typename?: 'Query' }
  & { checkBusinessUniqueCode: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, 'unique_code'>
  )> }
);

export type UploadFileMutationVariables = {
  file: Scalars['Upload'],
  business_id: Scalars['String']
};


export type UploadFileMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadFile'>
);

export type CreateEmailOtpMutationVariables = {
  input?: Maybe<EmailOtpInput>
};


export type CreateEmailOtpMutation = (
  { __typename?: 'Mutation' }
  & { createEmailOTP: Maybe<(
    { __typename?: 'emailOtp' }
    & Pick<EmailOtp, '_id' | 'otp_code'>
  )> }
);

export type VerifyEmailOtpMutationVariables = {
  input?: Maybe<EmailVerifyOtpInput>
};


export type VerifyEmailOtpMutation = (
  { __typename?: 'Mutation' }
  & { verifyEmailOTP: Maybe<(
    { __typename?: 'emailOtp' }
    & Pick<EmailOtp, 'verified'>
  )> }
);

export type CreateOtpMutationVariables = {
  input?: Maybe<PhoneOtpInput>
};


export type CreateOtpMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createOTP'>
);

export type VerifyOtpMutationVariables = {
  input?: Maybe<PhoneVerifyOtpInput>
};


export type VerifyOtpMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'verifyOTP'>
);

export type GetCityStateTaxQueryVariables = {
  input?: Maybe<ZipCodeTaxInput>
};


export type GetCityStateTaxQuery = (
  { __typename?: 'Query' }
  & { getCityStateTax: Maybe<(
    { __typename?: 'ZipCodeRate' }
    & Pick<ZipCodeRate, '_id' | 'zipCode'>
    & { Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name' | 'short_name' | 'identification_types'>
    )>, State: Maybe<(
      { __typename?: 'States' }
      & Pick<States, 'state_name'>
    )>, City: Maybe<(
      { __typename?: 'City' }
      & Pick<City, 'city_name'>
    )>, tax: Maybe<(
      { __typename?: 'TaxRate' }
      & Pick<TaxRate, 'total'>
    )> }
  )> }
);

export type CheckStoreNickNameQueryVariables = {
  store_nick_name: Scalars['String']
};


export type CheckStoreNickNameQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'checkStoreNickName'>
);

export type GetTaxByLocationIdQueryVariables = {
  businessLocationId: Scalars['ID']
};


export type GetTaxByLocationIdQuery = (
  { __typename?: 'Query' }
  & { BusinessLocationById: Maybe<(
    { __typename?: 'BusinessLocation' }
    & Pick<BusinessLocation, 'sales_tax'>
  )> }
);

export type GetRepairRoomTaskListQueryVariables = {
  reapirRoomFilter?: Maybe<RepairRoomFilter>,
  location_id: Scalars['ID'],
  limit: Scalars['Int'],
  skip: Scalars['Int']
};


export type GetRepairRoomTaskListQuery = (
  { __typename?: 'Query' }
  & { repairRoomListing: Maybe<(
    { __typename?: 'RepairRoomListing' }
    & Pick<RepairRoomListing, 'total'>
    & { repairRoomTransactions: Maybe<Array<Maybe<(
      { __typename?: 'RepairRoomOrders' }
      & Pick<RepairRoomOrders, '_id' | 'repair_room_color_pallet' | 'transaction_keeping_unit' | 'device_count' | 'total_repair_time' | 'is_repair_room_customer_alert'>
      & { Customer: Maybe<(
        { __typename?: 'Customer' }
        & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'address_1'>
      )> }
    )>>> }
  )> }
);

export type GetRepairRoomTaskDetailQueryVariables = {
  location_id: Scalars['ID'],
  transactionID: Scalars['ID']
};


export type GetRepairRoomTaskDetailQuery = (
  { __typename?: 'Query' }
  & { repairRoomInvoiceDetail: Maybe<(
    { __typename?: 'RepairRoomInvoiceDetail' }
    & Pick<RepairRoomInvoiceDetail, 'Total'>
    & { Transaction: Maybe<(
      { __typename?: 'RepairRoomOrders' }
      & Pick<RepairRoomOrders, '_id' | 'repair_room_color_pallet' | 'transaction_keeping_unit' | 'device_count' | 'total_repair_time' | 'is_repair_room_customer_alert'>
      & { Customer: Maybe<(
        { __typename?: 'Customer' }
        & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'address_1'>
      )> }
    )>, Devices: Maybe<Array<Maybe<(
      { __typename?: 'repairDevices' }
      & Pick<RepairDevices, '_id' | 'device_color_pallet' | 'repair_count' | 'device_total_repair_time'>
      & { device: Maybe<(
        { __typename?: 'Device' }
        & Pick<Device, '_id' | 'device_color' | 'imei_ssn' | 'device_image' | 'device_keeping_unit'>
        & { deviceBrand: Maybe<(
          { __typename?: 'SystemBrand' }
          & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
        )>, deviceModel: Maybe<(
          { __typename?: 'DeviceModel' }
          & Pick<DeviceModel, '_id' | 'name'>
        )>, Customer: Maybe<(
          { __typename?: 'Customer' }
          & Pick<Customer, '_id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'address_1'>
        )> }
      )>, technicion: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'avatar_location' | 'status' | 'address_1' | 'address_2' | 'city' | 'state' | 'zipcode' | 'user_keeping_unit'>
        & { business_id: Maybe<(
          { __typename?: 'Business' }
          & Pick<Business, '_id'>
        )>, Country: Maybe<(
          { __typename?: 'Country' }
          & Pick<Country, '_id' | 'name'>
        )> }
      )>, deviceItems: Maybe<Array<Maybe<(
        { __typename?: 'repairDeviceItem' }
        & Pick<RepairDeviceItem, '_id' | 'product_type' | 'sell_line_product_type' | 'repair_room_item_type' | 'time_log'>
        & { customProduct: Maybe<(
          { __typename?: 'CustomProduct' }
          & Pick<CustomProduct, '_id' | 'name' | 'quantity' | 'cost_price' | 'selling_price' | 'selling_price_include_tax' | 'is_taxable'>
        )>, Product: Maybe<(
          { __typename?: 'attachProduct' }
          & Pick<AttachProduct, '_id' | 'product_name' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'sell_price' | 'sell_price_inc_tax' | 'average_cost' | 'sku' | 'is_serial_number'>
          & { bundle_products: Maybe<(
            { __typename?: 'bundleProductInfo' }
            & Pick<BundleProductInfo, 'total_selling_price' | 'total_avg_cost' | 'is_manufactured_qty'>
            & { bundleProduct: Maybe<Array<Maybe<(
              { __typename?: 'bundleProduct' }
              & Pick<BundleProduct, 'avg_cost' | 'quantity' | 'selling_price'>
              & { bundleProductID: Maybe<(
                { __typename?: 'Product' }
                & Pick<Product, '_id' | 'product_name' | 'description' | 'image' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'alert_qty' | 'ideal_qty' | 'sell_price' | 'openingStock' | 'sell_price_inc_tax' | 'average_cost' | 'last_cost' | 'incoming_item' | 'barcode' | 'sku' | 'is_serial_number'>
                & { ProductStockPrice: Maybe<Array<Maybe<(
                  { __typename?: 'ProductPrices' }
                  & Pick<ProductPrices, 'shelf_qty'>
                )>>>, Brand: Maybe<(
                  { __typename?: 'SystemBrand' }
                  & Pick<SystemBrand, '_id' | 'brand_name'>
                )>, DeviceModel: Maybe<(
                  { __typename?: 'DeviceModel' }
                  & Pick<DeviceModel, '_id' | 'name'>
                )>, Suppliers: Maybe<Array<Maybe<(
                  { __typename?: 'SupplierInfo' }
                  & Pick<SupplierInfo, 'sku_number' | 'current_stock' | 'incoming_item' | 'instock' | 'ordered_qty'>
                  & { supplier_id: Maybe<(
                    { __typename?: 'Supplier' }
                    & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'supplier_keeping_unit' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email' | 'is_verify_supplier' | 'is_buyback'>
                  )> }
                )>>> }
              )> }
            )>>> }
          )>, DeviceModel: Maybe<(
            { __typename?: 'DeviceModel' }
            & Pick<DeviceModel, '_id' | 'name'>
          )>, Suppliers: Maybe<Array<Maybe<(
            { __typename?: 'SupplierCartInfo' }
            & Pick<SupplierCartInfo, 'sku_number' | 'current_stock'>
            & { supplier_id: Maybe<(
              { __typename?: 'Supplier' }
              & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'supplier_keeping_unit' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email' | 'is_verify_supplier' | 'is_buyback'>
            )> }
          )>>>, serviceProduct: Maybe<Array<Maybe<(
            { __typename?: 'ServiceProducts' }
            & Pick<ServiceProducts, '_id' | 'serviceProductType' | 'serviceProductSKU' | 'serviceProductSupplier' | 'serviceProductQuantity' | 'service_repair_room_item_type' | 'serviceReason'>
            & { serviceProductId: Maybe<(
              { __typename?: 'Product' }
              & Pick<Product, '_id' | 'product_name' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'alert_qty' | 'ideal_qty' | 'sell_price' | 'sell_price_inc_tax' | 'average_cost' | 'last_cost' | 'incoming_item' | 'sku' | 'compatilable_devices' | 'is_serial_number'>
              & { bundle_products: Maybe<(
                { __typename?: 'bundleProductInfo' }
                & Pick<BundleProductInfo, 'total_selling_price' | 'total_avg_cost' | 'is_manufactured_qty'>
                & { bundleProduct: Maybe<Array<Maybe<(
                  { __typename?: 'bundleProduct' }
                  & Pick<BundleProduct, 'avg_cost' | 'quantity' | 'selling_price'>
                  & { bundleProductID: Maybe<(
                    { __typename?: 'Product' }
                    & Pick<Product, '_id' | 'product_name' | 'description' | 'image' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'alert_qty' | 'ideal_qty' | 'sell_price' | 'openingStock' | 'sell_price_inc_tax' | 'average_cost' | 'last_cost' | 'incoming_item' | 'barcode' | 'sku' | 'compatilable_devices' | 'tags' | 'is_serial_number' | 'sale_item' | 'total_sale' | 'max_bundle' | 'is_completed_product' | 'is_add_product_with_device'>
                    & { ProductStockPrice: Maybe<Array<Maybe<(
                      { __typename?: 'ProductPrices' }
                      & Pick<ProductPrices, 'shelf_qty' | '_id' | 'ideal_quantity' | 'opening_stock' | 'qty_available' | 'alert_quantity' | 'order_qty' | 'bundle_order_qty' | 'is_profit_percentage' | 'profit_value' | 'profit_amount' | 'default_sell_price' | 'is_sell_tax_percentage' | 'sell_tax_value' | 'sell_tax_amount' | 'sell_price_inc_tax' | 'last_cost' | 'average_cost' | 'discount_amount' | 'price_without_bundle' | 'percentage_discount'>
                    )>>>, Brand: Maybe<(
                      { __typename?: 'SystemBrand' }
                      & Pick<SystemBrand, '_id' | 'brand_name'>
                    )>, DeviceModel: Maybe<(
                      { __typename?: 'DeviceModel' }
                      & Pick<DeviceModel, '_id' | 'name'>
                    )>, Suppliers: Maybe<Array<Maybe<(
                      { __typename?: 'SupplierInfo' }
                      & Pick<SupplierInfo, 'sku_number' | 'current_stock' | 'incoming_item' | 'instock' | 'ordered_qty'>
                      & { supplier_id: Maybe<(
                        { __typename?: 'Supplier' }
                        & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_keeping_unit' | 'supplier_first_name' | 'supplier_last_name' | 'is_verify_supplier'>
                      )> }
                    )>>> }
                  )> }
                )>>> }
              )>, ProductStockPrice: Maybe<Array<Maybe<(
                { __typename?: 'ProductPrices' }
                & Pick<ProductPrices, 'shelf_qty'>
              )>>>, Brand: Maybe<(
                { __typename?: 'SystemBrand' }
                & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
              )>, DeviceModel: Maybe<(
                { __typename?: 'DeviceModel' }
                & Pick<DeviceModel, '_id' | 'name'>
              )>, Suppliers: Maybe<Array<Maybe<(
                { __typename?: 'SupplierInfo' }
                & Pick<SupplierInfo, 'sku_number' | 'current_stock' | 'incoming_item' | 'instock' | 'ordered_qty' | 'price_purchase'>
                & { supplier_id: Maybe<(
                  { __typename?: 'Supplier' }
                  & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_keeping_unit' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email' | 'is_verify_supplier' | 'is_buyback' | 'Order'>
                )> }
              )>>> }
            )>, serviceCustomProductId: Maybe<(
              { __typename?: 'CustomProduct' }
              & Pick<CustomProduct, '_id' | 'name' | 'quantity' | 'cost_price' | 'selling_price' | 'selling_price_include_tax' | 'note' | 'is_taxable'>
            )> }
          )>>> }
        )>, service_status: Maybe<(
          { __typename?: 'labelStatus' }
          & Pick<LabelStatus, '_id' | 'status_name' | 'status_background_color' | 'status_font_color' | 'status_icon' | 'status_type'>
        )> }
      )>>> }
    )>>> }
  )> }
);

export type GetRepairRoomTaskStatusQueryVariables = {};


export type GetRepairRoomTaskStatusQuery = (
  { __typename?: 'Query' }
  & { repairRoomStatus: Maybe<Array<Maybe<(
    { __typename?: 'labelStatus' }
    & Pick<LabelStatus, '_id' | 'status_name' | 'status_background_color' | 'status_font_color' | 'status_icon' | 'status_type'>
  )>>> }
);

export type TaskMarkAsDoneMutationVariables = {
  transactionIDs?: Maybe<Array<Scalars['ID']>>,
  location_id: Scalars['ID']
};


export type TaskMarkAsDoneMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'taskMarkAsDone'>
);

export type TaskDeviceMarkAsDoneMutationVariables = {
  transactionID: Scalars['ID'],
  deviceID: Scalars['ID'],
  location_id: Scalars['ID']
};


export type TaskDeviceMarkAsDoneMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'taskDeviceMarkAsDone'>
);

export type TaskServiceMarkAsDoneMutationVariables = {
  transactionID: Scalars['ID'],
  deviceID: Scalars['ID'],
  sellID: Scalars['ID'],
  status: Scalars['String'],
  location_id: Scalars['ID']
};


export type TaskServiceMarkAsDoneMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'taskServiceMarkAsDone'>
);

export type TechnicianAssignToDeviceMutationVariables = {
  transactionID: Scalars['ID'],
  deviceID: Scalars['ID'],
  technicianID: Scalars['ID'],
  location_id: Scalars['ID']
};


export type TechnicianAssignToDeviceMutation = (
  { __typename?: 'Mutation' }
  & { technicianAssignToDevice: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'avatar_location' | 'status' | 'address_1' | 'address_2' | 'city' | 'state' | 'zipcode' | 'user_keeping_unit'>
    & { business_id: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )>, Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name'>
    )> }
  )> }
);

export type CreateTransactionAlertMutationVariables = {
  input?: Maybe<PurchaseAlertInput>
};


export type CreateTransactionAlertMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createTransactionAlert'>
);

export type SetServiceItemTypeMutationVariables = {
  transactionID: Scalars['ID'],
  serviceID: Scalars['ID'],
  location_id: Scalars['ID'],
  service_item_type?: Maybe<ServiceItemEnum>
};


export type SetServiceItemTypeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'SetServiceItemType'>
);

export type SetServiceProductTypeMutationVariables = {
  _id: Scalars['ID'],
  transactionID: Scalars['ID'],
  serviceID: Scalars['ID'],
  productID: Scalars['ID'],
  location_id: Scalars['ID'],
  service_item_type?: Maybe<ServiceItemEnum>,
  service_reasons: Scalars['String']
};


export type SetServiceProductTypeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'SetServiceProductType'>
);

export type RepairRoomOrderPartMutationVariables = {
  input?: Maybe<OrderPartInput>
};


export type RepairRoomOrderPartMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'RepairRoomOrderPart'>
);

export type TechnicianTimeLogMutationVariables = {
  transactionID: Scalars['ID'],
  deviceID: Scalars['ID'],
  serviceID: Scalars['ID'],
  technicianID: Scalars['ID'],
  location_id: Scalars['ID'],
  log_time: Scalars['Float']
};


export type TechnicianTimeLogMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'technicianTimeLog'>
);

export type OrderPartSuppliersQueryVariables = {
  location_id: Scalars['ID'],
  product_id: Scalars['ID'],
  search?: Maybe<Scalars['String']>
};


export type OrderPartSuppliersQuery = (
  { __typename?: 'Query' }
  & { OrderPartSuppliers: Maybe<Array<Maybe<(
    { __typename?: 'OrderPartSupplierType' }
    & Pick<OrderPartSupplierType, 'sku_number' | 'order_qty' | 'product_price'>
    & { Supplier: Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'supplier_keeping_unit' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email' | 'is_verify_supplier' | 'is_buyback'>
    )> }
  )>>> }
);

export type GetRepairOrdersQueryVariables = {
  locationId?: Maybe<Scalars['ID']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type GetRepairOrdersQuery = (
  { __typename?: 'Query' }
  & { getRepairOrders: Maybe<Array<Maybe<(
    { __typename?: 'RepairOrder' }
    & Pick<RepairOrder, 'ref_no' | 'transactionId' | 'count_devices'>
    & { Customer: (
      { __typename?: 'Customer' }
      & Pick<Customer, 'first_name' | 'last_name' | 'email'>
    ) }
  )>>> }
);

export type GetRepairDevicesQueryVariables = {
  transactionId: Scalars['ID'],
  locationId?: Maybe<Scalars['ID']>
};


export type GetRepairDevicesQuery = (
  { __typename?: 'Query' }
  & { getRepairDevices: Maybe<Array<Maybe<(
    { __typename?: 'DeviceWithCount' }
    & Pick<DeviceWithCount, 'count_service'>
    & { Device: (
      { __typename?: 'Device' }
      & Pick<Device, '_id' | 'device_color' | 'imei_ssn' | 'device_image' | 'device_keeping_unit'>
      & { deviceBrand: Maybe<(
        { __typename?: 'SystemBrand' }
        & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
      )>, deviceModel: Maybe<(
        { __typename?: 'DeviceModel' }
        & Pick<DeviceModel, '_id' | 'name'>
      )>, Customer: Maybe<(
        { __typename?: 'Customer' }
        & Pick<Customer, '_id'>
      )>, business_id: Maybe<(
        { __typename?: 'Business' }
        & Pick<Business, '_id'>
      )>, location_id: Maybe<(
        { __typename?: 'BusinessLocation' }
        & Pick<BusinessLocation, '_id'>
      )> }
    ) }
  )>>> }
);

export type CreateTransactionCustomerAlertMutationVariables = {
  input?: Maybe<CustomerAlertInput>
};


export type CreateTransactionCustomerAlertMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createTransactionCustomerAlert'>
);

export type GetExtraItemListsQueryVariables = {
  deviceID?: Maybe<Scalars['ID']>,
  transactionID?: Maybe<Scalars['ID']>,
  locationID?: Maybe<Scalars['ID']>
};


export type GetExtraItemListsQuery = (
  { __typename?: 'Query' }
  & { getExtraItemLists: Maybe<Array<Maybe<(
    { __typename?: 'TransactionSellLine' }
    & Pick<TransactionSellLine, '_id' | 'product_type' | 'sell_line_product_type' | 'supplier_sku' | 'quantity' | 'serial_number' | 'reason'>
    & { Product: Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, '_id' | 'product_name'>
    )>, Supplier: Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id'>
    )> }
  )>>> }
);

export type AddExtraItemsMutationVariables = {
  input?: Maybe<InputExtraItem>
};


export type AddExtraItemsMutation = (
  { __typename?: 'Mutation' }
  & { addExtraItems: Maybe<(
    { __typename?: 'TransactionSellLine' }
    & Pick<TransactionSellLine, '_id' | 'product_type' | 'sell_line_product_type' | 'supplier_sku' | 'quantity' | 'serial_number'>
    & { Product: Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, '_id' | 'product_name'>
    )>, Supplier: Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id'>
    )>, serviceProduct: Maybe<Array<Maybe<(
      { __typename?: 'ServiceProducts' }
      & Pick<ServiceProducts, '_id' | 'serviceProductType' | 'serviceProductSKU' | 'serviceProductSupplier' | 'serviceProductQuantity' | 'service_repair_room_item_type' | 'serviceReason'>
      & { serviceProductId: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, '_id' | 'product_name' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'alert_qty' | 'ideal_qty' | 'sell_price' | 'sell_price_inc_tax' | 'average_cost' | 'last_cost' | 'incoming_item' | 'sku' | 'compatilable_devices' | 'is_serial_number'>
        & { bundle_products: Maybe<(
          { __typename?: 'bundleProductInfo' }
          & Pick<BundleProductInfo, 'total_selling_price' | 'total_avg_cost' | 'is_manufactured_qty'>
          & { bundleProduct: Maybe<Array<Maybe<(
            { __typename?: 'bundleProduct' }
            & Pick<BundleProduct, 'avg_cost' | 'quantity' | 'selling_price'>
            & { bundleProductID: Maybe<(
              { __typename?: 'Product' }
              & Pick<Product, '_id' | 'product_name' | 'barcode' | 'sku' | 'compatilable_devices' | 'tags' | 'is_serial_number' | 'sale_item' | 'total_sale' | 'incoming_item' | 'max_bundle' | 'is_completed_product' | 'is_add_product_with_device'>
              & { Brand: Maybe<(
                { __typename?: 'SystemBrand' }
                & Pick<SystemBrand, '_id' | 'brand_name'>
              )>, DeviceModel: Maybe<(
                { __typename?: 'DeviceModel' }
                & Pick<DeviceModel, '_id' | 'name'>
              )> }
            )> }
          )>>> }
        )>, ProductStockPrice: Maybe<Array<Maybe<(
          { __typename?: 'ProductPrices' }
          & Pick<ProductPrices, 'shelf_qty'>
        )>>>, Brand: Maybe<(
          { __typename?: 'SystemBrand' }
          & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
        )>, DeviceModel: Maybe<(
          { __typename?: 'DeviceModel' }
          & Pick<DeviceModel, '_id' | 'name'>
        )> }
      )>, serviceCustomProductId: Maybe<(
        { __typename?: 'CustomProduct' }
        & Pick<CustomProduct, '_id' | 'name' | 'quantity' | 'cost_price' | 'selling_price' | 'selling_price_include_tax' | 'note' | 'is_taxable'>
      )> }
    )>>> }
  )> }
);

export type EditExtraItemMutationVariables = {
  input?: Maybe<InputExtraItem>
};


export type EditExtraItemMutation = (
  { __typename?: 'Mutation' }
  & { editExtraItem: Maybe<(
    { __typename?: 'TransactionSellLine' }
    & Pick<TransactionSellLine, '_id'>
  )> }
);

export type DeleteExtraItemMutationVariables = {
  deviceID?: Maybe<Scalars['ID']>,
  transactionID?: Maybe<Scalars['ID']>,
  sellLineID?: Maybe<Scalars['ID']>,
  sellLineServiceModelID?: Maybe<Scalars['ID']>,
  isDirectDevice?: Maybe<Scalars['Boolean']>
};


export type DeleteExtraItemMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteExtraItem'>
);

export type GetSupplierProductsAndSearchQueryVariables = {
  search?: Maybe<Scalars['String']>,
  locationId?: Maybe<Scalars['ID']>
};


export type GetSupplierProductsAndSearchQuery = (
  { __typename?: 'Query' }
  & { getSupplierProductsAndSearch: Maybe<Array<Maybe<(
    { __typename?: 'ProductExtraItem' }
    & Pick<ProductExtraItem, 'ProductID' | 'product_name' | 'supplier_sku'>
    & { supplier: Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_company'>
    )> }
  )>>> }
);

export type GetRepairDeviceServiceQueryVariables = {
  deviceId: Scalars['ID'],
  transactionId: Scalars['ID'],
  locationId?: Maybe<Scalars['ID']>
};


export type GetRepairDeviceServiceQuery = (
  { __typename?: 'Query' }
  & { getRepairDeviceService: Maybe<Array<Maybe<(
    { __typename?: 'TransactionAssignDevice' }
    & Pick<TransactionAssignDevice, '_id'>
  )>>> }
);

export type GetDeviceProductAndServiceQueryVariables = {
  deviceID: Scalars['ID'],
  location_id: Scalars['ID'],
  is_product: Scalars['Boolean']
};


export type GetDeviceProductAndServiceQuery = (
  { __typename?: 'Query' }
  & { getDeviceProductAndService: Maybe<Array<Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'product_name' | 'incoming_item' | 'max_bundle' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'is_serial_number' | 'sell_price_inc_tax' | 'sku' | 'alert_qty'>
    & { ProductStockPrice: Maybe<Array<Maybe<(
      { __typename?: 'ProductPrices' }
      & Pick<ProductPrices, '_id' | 'qty_available' | 'alert_quantity' | 'shelf_qty' | 'sell_price_inc_tax' | 'order_qty'>
    )>>>, bundle_products: Maybe<(
      { __typename?: 'bundleProductInfo' }
      & Pick<BundleProductInfo, 'total_selling_price' | 'total_avg_cost' | 'is_manufactured_qty'>
      & { bundleProduct: Maybe<Array<Maybe<(
        { __typename?: 'bundleProduct' }
        & Pick<BundleProduct, 'avg_cost' | 'quantity' | 'selling_price'>
        & { bundleProductID: Maybe<(
          { __typename?: 'Product' }
          & Pick<Product, '_id' | 'product_name' | 'incoming_item' | 'max_bundle' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'is_serial_number'>
          & { ProductStockPrice: Maybe<Array<Maybe<(
            { __typename?: 'ProductPrices' }
            & Pick<ProductPrices, '_id' | 'qty_available' | 'alert_quantity' | 'shelf_qty' | 'sell_price_inc_tax' | 'order_qty'>
          )>>> }
        )> }
      )>>> }
    )>, Suppliers: Maybe<Array<Maybe<(
      { __typename?: 'SupplierInfo' }
      & Pick<SupplierInfo, 'sku_number' | 'current_stock' | 'incoming_item' | 'instock' | 'ordered_qty'>
      & { supplier_id: Maybe<(
        { __typename?: 'Supplier' }
        & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email'>
      )> }
    )>>>, servicesBrandModel: Maybe<Array<Maybe<(
      { __typename?: 'ServicesBrandModel' }
      & Pick<ServicesBrandModel, 'service_max_price' | 'service_min_price'>
      & { ServiceBrand: Maybe<(
        { __typename?: 'SystemBrand' }
        & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
      )>, ServiceDeviceModel: Maybe<(
        { __typename?: 'DeviceModel' }
        & Pick<DeviceModel, '_id' | 'name'>
        & { brand: Maybe<(
          { __typename?: 'SystemBrand' }
          & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
        )> }
      )>, ServiceItem: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, '_id' | 'product_name' | 'incoming_item' | 'max_bundle' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'is_serial_number' | 'sell_price_inc_tax' | 'sku' | 'alert_qty'>
        & { ProductStockPrice: Maybe<Array<Maybe<(
          { __typename?: 'ProductPrices' }
          & Pick<ProductPrices, '_id' | 'qty_available' | 'alert_quantity' | 'shelf_qty' | 'sell_price_inc_tax' | 'order_qty'>
        )>>>, bundle_products: Maybe<(
          { __typename?: 'bundleProductInfo' }
          & Pick<BundleProductInfo, 'total_selling_price' | 'total_avg_cost' | 'is_manufactured_qty'>
          & { bundleProduct: Maybe<Array<Maybe<(
            { __typename?: 'bundleProduct' }
            & Pick<BundleProduct, 'avg_cost' | 'quantity' | 'selling_price'>
            & { bundleProductID: Maybe<(
              { __typename?: 'Product' }
              & Pick<Product, '_id' | 'product_name' | 'incoming_item' | 'max_bundle' | 'is_bundle_product' | 'is_product' | 'is_track_stock' | 'is_serial_number'>
              & { ProductStockPrice: Maybe<Array<Maybe<(
                { __typename?: 'ProductPrices' }
                & Pick<ProductPrices, '_id' | 'qty_available' | 'alert_quantity' | 'shelf_qty' | 'sell_price_inc_tax' | 'order_qty'>
              )>>> }
            )> }
          )>>> }
        )>, Suppliers: Maybe<Array<Maybe<(
          { __typename?: 'SupplierInfo' }
          & Pick<SupplierInfo, 'sku_number' | 'current_stock' | 'incoming_item' | 'instock' | 'ordered_qty'>
          & { supplier_id: Maybe<(
            { __typename?: 'Supplier' }
            & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email'>
          )> }
        )>>> }
      )> }
    )>>>, Brand: Maybe<(
      { __typename?: 'SystemBrand' }
      & Pick<SystemBrand, '_id' | 'brand_name' | 'description'>
    )>, DeviceModel: Maybe<(
      { __typename?: 'DeviceModel' }
      & Pick<DeviceModel, '_id' | 'name'>
    )> }
  )>>> }
);

export type GetAllUsersQueryVariables = {};


export type GetAllUsersQuery = (
  { __typename?: 'Query' }
  & { getUsers: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'avatar_location' | 'status' | 'address_1' | 'address_2' | 'city' | 'state' | 'zipcode' | 'user_keeping_unit'>
    & { business_id: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )>, Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name'>
    )> }
  )>>> }
);

export type GetAllTechnicianQueryVariables = {
  location_id: Scalars['ID']
};


export type GetAllTechnicianQuery = (
  { __typename?: 'Query' }
  & { TechnicianList: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'avatar_location' | 'status' | 'address_1' | 'address_2' | 'city' | 'state' | 'zipcode' | 'user_keeping_unit'>
    & { business_id: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )>, Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name'>
    )> }
  )>>> }
);

export type CreateUserMutationVariables = {
  file?: Maybe<Scalars['Upload']>,
  input?: Maybe<UserInput>
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'avatar_location' | 'status' | 'address_1' | 'address_2' | 'city' | 'state' | 'zipcode' | 'user_keeping_unit'>
    & { business_id: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )>, Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id'>
    )> }
  )> }
);

export type UpdateUserMutationVariables = {
  id: Scalars['ID'],
  input?: Maybe<UserUpdateInput>
};


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { UpdateUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'avatar_location' | 'status' | 'address_1' | 'address_2' | 'city' | 'state' | 'zipcode' | 'user_keeping_unit'>
    & { business_id: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )>, Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id'>
    )> }
  )> }
);

export type RemoveUserQueryVariables = {
  userId: Scalars['ID']
};


export type RemoveUserQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'removeUser'>
);

export type GetAllStoresQueryVariables = {};


export type GetAllStoresQuery = (
  { __typename?: 'Query' }
  & { userBusinessLocations: Maybe<Array<Maybe<(
    { __typename?: 'BusinessLocation' }
    & Pick<BusinessLocation, '_id' | 'store_type' | 'email' | 'sales_tax' | 'ein_ssn' | 'phone' | 'zip_code' | 'city' | 'state' | 'address_1' | 'address_2' | 'store_name' | 'store_legal_name' | 'location_keeping_unit' | 'store_nick_name' | 'provider_name' | 'identification_number' | 'identification_type' | 'logo' | 'status' | 'created_at'>
    & { business_id: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )>, Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name'>
    )> }
  )>>> }
);

export type CreateBusinessLocationMutationVariables = {
  input: BusinessLocationInput
};


export type CreateBusinessLocationMutation = (
  { __typename?: 'Mutation' }
  & { createBusinessLocation: Maybe<(
    { __typename?: 'BusinessLocation' }
    & Pick<BusinessLocation, '_id' | 'email' | 'sales_tax' | 'ein_ssn' | 'phone' | 'zip_code' | 'city' | 'state' | 'address_1' | 'address_2' | 'store_name' | 'store_legal_name' | 'location_keeping_unit'>
    & { business_id: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )> }
  )> }
);

export type UpdateBusinessLocationMutationVariables = {
  id: Scalars['ID'],
  input: BusinessLocationInput
};


export type UpdateBusinessLocationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateBusinessLocation'>
);

export type GetBusinessInfoForUpdateQueryVariables = {};


export type GetBusinessInfoForUpdateQuery = (
  { __typename?: 'Query' }
  & { GetBusinessByID: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, '_id' | 'business_system_name' | 'store_type' | 'number_of_stores' | 'unique_code' | 'fy_end_month' | 'accounting_method' | 'currency_id' | 'logo' | 'created_at'>
    & { Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, 'name' | '_id'>
    )>, owner_id: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'user_keeping_unit'>
    )> }
  )> }
);

export type UdateBusinessMutationVariables = {
  input?: Maybe<UdateBusinessInput>
};


export type UdateBusinessMutation = (
  { __typename?: 'Mutation' }
  & { udateBusiness: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, '_id'>
  )> }
);

export type GetTodayCLockOfUsersQueryVariables = {};


export type GetTodayCLockOfUsersQuery = (
  { __typename?: 'Query' }
  & { getTodayCLockOfUsers: Maybe<Array<Maybe<(
    { __typename?: 'UserClockedHistory' }
    & Pick<UserClockedHistory, 'status' | 'totaltime'>
    & { User: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first_name' | 'last_name' | 'user_keeping_unit' | 'email'>
    ) }
  )>>> }
);

export type GetCLockOfUserByIdQueryVariables = {
  userId: Scalars['ID'],
  toDate?: Maybe<Scalars['String']>,
  fromDate?: Maybe<Scalars['String']>,
  location_id: Scalars['ID']
};


export type GetCLockOfUserByIdQuery = (
  { __typename?: 'Query' }
  & { getUserClockInOutHistoryLogs: Maybe<(
    { __typename?: 'HistoryClocked' }
    & Pick<HistoryClocked, 'endDate' | 'startDate' | 'totalHours'>
    & { User: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'first_name' | 'last_name'>
    )>, history: Maybe<Array<Maybe<(
      { __typename?: 'UserClockedHistoryDetail' }
      & Pick<UserClockedHistoryDetail, 'day' | 'date' | 'clocked_in_time' | 'clocked_out_time' | 'status' | 'totaltime'>
    )>>> }
  )> }
);

export type GetAllChartOfAccountsQueryVariables = {};


export type GetAllChartOfAccountsQuery = (
  { __typename?: 'Query' }
  & { GetAllChartOfAccounts: Maybe<Array<Maybe<(
    { __typename?: 'ChartOfAccount' }
    & Pick<ChartOfAccount, '_id' | 'account_code' | 'account_name' | 'account_balance' | 'Opening_balance'>
    & { account_type_Id: Maybe<(
      { __typename?: 'AccountType' }
      & Pick<AccountType, 'title'>
    )>, parent_account_Id: Maybe<(
      { __typename?: 'ChartOfAccount' }
      & Pick<ChartOfAccount, 'account_name'>
    )> }
  )>>> }
);

export type GetAllAccountTypesQueryVariables = {};


export type GetAllAccountTypesQuery = (
  { __typename?: 'Query' }
  & { GetAllAccountTypes: Maybe<Array<Maybe<(
    { __typename?: 'AccountType' }
    & Pick<AccountType, '_id' | 'title'>
    & { parent_account_type_id: Maybe<(
      { __typename?: 'AccountType' }
      & Pick<AccountType, '_id' | 'title'>
    )> }
  )>>> }
);

export type CreateChartOfAccountMutationVariables = {
  input?: Maybe<ChartOfAccountInput>
};


export type CreateChartOfAccountMutation = (
  { __typename?: 'Mutation' }
  & { createChartOfAccount: Maybe<(
    { __typename?: 'ChartOfAccount' }
    & Pick<ChartOfAccount, '_id' | 'account_code' | 'account_name'>
    & { account_type_Id: Maybe<(
      { __typename?: 'AccountType' }
      & Pick<AccountType, '_id'>
    )> }
  )> }
);

export type UpdateChartOfAccountMutationVariables = {
  _id: Scalars['ID'],
  input?: Maybe<ChartOfAccountInput>
};


export type UpdateChartOfAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateChartOfAccount'>
);

export type GetAllAccountsByTypeQueryVariables = {
  _id: Scalars['ID']
};


export type GetAllAccountsByTypeQuery = (
  { __typename?: 'Query' }
  & { GetAllAccountsByType: Maybe<Array<Maybe<(
    { __typename?: 'ChartOfAccount' }
    & Pick<ChartOfAccount, '_id' | 'account_code' | 'account_name'>
  )>>> }
);

export type BusinessLocationSettingsMutationVariables = {
  _id: Scalars['ID'],
  input?: Maybe<AccountSettingInput>
};


export type BusinessLocationSettingsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'businessLocationSettings'>
);

export type UpdateBusinessAdminMutationVariables = {
  _id: Scalars['ID'],
  input?: Maybe<BusinessInput>
};


export type UpdateBusinessAdminMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateBusinessAdmin'>
);

export type OwnerPasswordUpdateMutationVariables = {
  input: PasswordUpdateInput
};


export type OwnerPasswordUpdateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'OwnerPasswordUpdate'>
);

export type BusinessLogoUploadMutationVariables = {
  business_id: Scalars['ID'],
  logo: Scalars['String']
};


export type BusinessLogoUploadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'businessLogoUpload'>
);

export type GetAllBusinessUsersQueryVariables = {
  store_id: Scalars['ID'],
  filter: Scalars['String']
};


export type GetAllBusinessUsersQuery = (
  { __typename?: 'Query' }
  & { getAllBusinessUsers: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'is_clocked_in' | 'email' | 'created_at' | 'first_name' | 'last_name' | 'phone' | 'avatar_location' | 'status' | 'address_1' | 'address_2' | 'city' | 'state' | 'zipcode' | 'user_keeping_unit' | 'roles' | 'salaryHour' | 'is_deleted'>
    & { business_id: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )>, Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name'>
    )>, BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name'>
    )> }
  )>>> }
);

export type CreateBusinessUserMutationVariables = {
  input: UserInput,
  logo?: Maybe<Scalars['String']>
};


export type CreateBusinessUserMutation = (
  { __typename?: 'Mutation' }
  & { createBusinessUser: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'first_name' | 'created_at' | 'last_name' | 'phone' | 'avatar_location' | 'status' | 'address_1' | 'address_2' | 'city' | 'state' | 'zipcode' | 'is_deleted' | 'user_keeping_unit' | 'roles' | 'salaryHour'>
    & { business_id: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )>, Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name'>
    )>, BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name' | 'store_nick_name'>
    )> }
  )> }
);

export type StatusBusinessUserMutationVariables = {
  _id: Scalars['ID'],
  status: BusinessStatus
};


export type StatusBusinessUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'statusBusinessUser'>
);

export type DeleteBusinessUserMutationVariables = {
  _id: Scalars['ID']
};


export type DeleteBusinessUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteBusinessUser'>
);

export type UpdateBusinessUserMutationVariables = {
  _id: Scalars['ID'],
  input: UserInput
};


export type UpdateBusinessUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateBusinessUser'>
);

export type GetAllBusinessStoreAdminQueryVariables = {
  business_id: Scalars['ID'],
  filter: Scalars['String']
};


export type GetAllBusinessStoreAdminQuery = (
  { __typename?: 'Query' }
  & { getAllBusinessStoreAdmin: Maybe<Array<Maybe<(
    { __typename?: 'BusinessLocation' }
    & Pick<BusinessLocation, '_id' | 'store_name' | 'store_nick_name' | 'location_keeping_unit' | 'address_1' | 'address_2' | 'state' | 'city' | 'zip_code' | 'sales_tax' | 'email' | 'phone' | 'store_type' | 'store_legal_name' | 'identification_type' | 'identification_number' | 'provider_name' | 'ein_ssn' | 'logo' | 'status' | 'created_at'>
    & { Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name'>
    )>, business_id: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )> }
  )>>> }
);

export type CreateBusinessStoreAdminMutationVariables = {
  business_id: Scalars['ID'],
  input: Store,
  logo?: Maybe<Scalars['String']>
};


export type CreateBusinessStoreAdminMutation = (
  { __typename?: 'Mutation' }
  & { createBusinessStoreAdmin: Maybe<(
    { __typename?: 'BusinessLocation' }
    & Pick<BusinessLocation, '_id' | 'store_name' | 'store_nick_name' | 'location_keeping_unit' | 'address_1' | 'address_2' | 'state' | 'city' | 'zip_code' | 'sales_tax' | 'email' | 'phone' | 'store_type' | 'store_legal_name' | 'identification_type' | 'identification_number' | 'provider_name' | 'ein_ssn' | 'logo' | 'status' | 'created_at'>
    & { Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name'>
    )>, business_id: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )> }
  )> }
);

export type UpdateBusinessStoreAdminMutationVariables = {
  _id: Scalars['ID'],
  business_id: Scalars['ID'],
  input: Store
};


export type UpdateBusinessStoreAdminMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateBusinessStoreAdmin'>
);

export type DeleteBusinessStoreAdminMutationVariables = {
  _id: Scalars['ID']
};


export type DeleteBusinessStoreAdminMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteBusinessStoreAdmin'>
);

export type StatusBusinessStoreAdminMutationVariables = {
  _id: Scalars['ID'],
  status: BusinessStatus
};


export type StatusBusinessStoreAdminMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'statusBusinessStoreAdmin'>
);

export type UserLogoUploadMutationVariables = {
  user_id: Scalars['ID'],
  logo: Scalars['String']
};


export type UserLogoUploadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'userLogoUpload'>
);

export type UniqueUserEmailQueryVariables = {
  user_id?: Maybe<Scalars['ID']>,
  email: Scalars['String']
};


export type UniqueUserEmailQuery = (
  { __typename?: 'Query' }
  & { uniqueUserEmail: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type StoreLogoUploadMutationVariables = {
  store_id: Scalars['ID'],
  logo: Scalars['String']
};


export type StoreLogoUploadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'storeLogoUpload'>
);

export type GetBusinessAdminQueryVariables = {
  _id: Scalars['ID']
};


export type GetBusinessAdminQuery = (
  { __typename?: 'Query' }
  & { getBusinessAdmin: Maybe<(
    { __typename?: 'Business' }
    & Pick<Business, '_id' | 'business_keeping_unit' | 'business_system_name' | 'fy_end_month' | 'accounting_method' | 'logo' | 'date_format' | 'status' | 'created_at' | 'unique_code' | 'store_type' | 'number_of_stores' | 'currency_id'>
    & { location_id: Maybe<Array<Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id'>
    )>>>, owner_id: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'first_name' | 'last_name' | 'phone' | 'user_keeping_unit'>
    )>, Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name'>
    )>, store_types: Maybe<(
      { __typename?: 'storeTypes' }
      & Pick<StoreTypes, 'independent_repair_store' | 'franchise' | 'franchise_OEM'>
    )> }
  )> }
);

export type GetUserDetailQueryVariables = {};


export type GetUserDetailQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'is_clocked_in' | 'email' | 'created_at' | 'first_name' | 'last_name' | 'phone' | 'avatar_location' | 'status' | 'address_1' | 'address_2' | 'city' | 'state' | 'zipcode' | 'user_keeping_unit' | 'roles' | 'salaryHour' | 'is_deleted'>
    & { business_id: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )>, Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name'>
    )>, BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name'>
    )> }
  )> }
);

export type GetUsersLogsActivityQueryVariables = {
  input?: Maybe<SearchUserActivityLog>
};


export type GetUsersLogsActivityQuery = (
  { __typename?: 'Query' }
  & { getUsersLogsActivity: Maybe<(
    { __typename?: 'logsUser' }
    & Pick<LogsUser, 'last_login'>
    & { logs: Maybe<Array<Maybe<(
      { __typename?: 'UserActivity' }
      & Pick<UserActivity, 'ip_address' | 'location' | 'access_type' | 'application' | 'date' | 'day' | 'time'>
      & { User: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email' | 'first_name' | 'last_name'>
      )> }
    )>>> }
  )> }
);

export type BusinessLogoDeleteMutationVariables = {
  business_id: Scalars['ID']
};


export type BusinessLogoDeleteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'businessLogoDelete'>
);

export type UserLogoDeleteMutationVariables = {
  user_id: Scalars['ID']
};


export type UserLogoDeleteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'userLogoDelete'>
);

export type StoreLogoDeleteMutationVariables = {
  store_id: Scalars['ID']
};


export type StoreLogoDeleteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'storeLogoDelete'>
);

export type GeneratePinCodeQueryVariables = {};


export type GeneratePinCodeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'generatePinCode'>
);

export type CreatePinCodeMutationVariables = {
  input: CreatePincodeInput
};


export type CreatePinCodeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createPinCode'>
);

export type GetUserPinCodeByIdQueryVariables = {
  userId: Scalars['ID']
};


export type GetUserPinCodeByIdQuery = (
  { __typename?: 'Query' }
  & { getUserPinCodeById: Maybe<(
    { __typename?: 'UserClockInPin' }
    & Pick<UserClockInPin, '_id' | 'pincode'>
  )> }
);

export type UserPinCodeResendMutationVariables = {
  userID: Scalars['ID'],
  method?: Maybe<AllowMethodPhoneVerify>,
  password?: Maybe<Scalars['String']>
};


export type UserPinCodeResendMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'userPinCodeResend'>
);

export type GetCashRegisterByIdQueryVariables = {
  id?: Maybe<Scalars['ID']>
};


export type GetCashRegisterByIdQuery = (
  { __typename?: 'Query' }
  & { getCashRegisterById: Maybe<(
    { __typename?: 'CashRegisters' }
    & Pick<CashRegisters, 'name' | '_id' | 'cash_register_keeping_unit' | 'opening_amount' | 'closing_amount' | 'closed_at' | 'status' | 'location_id'>
  )> }
);

export type GetCashDrawerLogsQueryVariables = {
  businessLocation?: Maybe<Scalars['ID']>,
  cashRegisterID?: Maybe<Scalars['ID']>
};


export type GetCashDrawerLogsQuery = (
  { __typename?: 'Query' }
  & { getCashDrawerLogs: Maybe<Array<Maybe<(
    { __typename?: 'OpenCashDrawer' }
    & Pick<OpenCashDrawer, 'openCashDrawerType' | 'remarks' | 'amount' | 'created_at'>
    & { CashRegisters: Maybe<(
      { __typename?: 'CashRegisters' }
      & Pick<CashRegisters, 'opening_amount' | 'closing_amount' | 'closed_at'>
    )>, User: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'first_name' | 'last_name'>
    )> }
  )>>> }
);

export type UniquePinCodeVerifyQueryVariables = {
  pincode: Scalars['Int']
};


export type UniquePinCodeVerifyQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'uniquePinCodeVerify'>
);

export type CreateCashRegisterMutationVariables = {
  input?: Maybe<CashRegisterInput>
};


export type CreateCashRegisterMutation = (
  { __typename?: 'Mutation' }
  & { createCashRegister: Maybe<(
    { __typename?: 'CashRegisters' }
    & Pick<CashRegisters, '_id' | 'name' | 'cash_register_keeping_unit' | 'status' | 'opening_amount' | 'closing_amount' | 'closed_at' | 'business_id' | 'location_id'>
  )> }
);

export type UpdateCashRegisterMutationVariables = {
  id: Scalars['ID'],
  input?: Maybe<CashRegisterInput>
};


export type UpdateCashRegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateCashRegister'>
);

export type DeleteCashRegisterMutationVariables = {
  id: Scalars['ID']
};


export type DeleteCashRegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCashRegister'>
);

export type SearchSystemSupplierQueryVariables = {
  search: Scalars['String']
};


export type SearchSystemSupplierQuery = (
  { __typename?: 'Query' }
  & { searchSystemSupplier: Maybe<Array<Maybe<(
    { __typename?: 'SystemSupplier' }
    & Pick<SystemSupplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email'>
    & { Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name' | 'short_name' | 'is_active' | 'identification_types'>
    )> }
  )>>> }
);

export type CreateSupplierMutationVariables = {
  input?: Maybe<SupplierInput>
};


export type CreateSupplierMutation = (
  { __typename?: 'Mutation' }
  & { createSupplier: Maybe<(
    { __typename?: 'Supplier' }
    & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'is_verify_supplier' | 'is_buyback' | 'supplier_keeping_unit' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email'>
    & { Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name'>
    )> }
  )> }
);

export type SupplierChangeBuybackMutationVariables = {
  id: Scalars['ID'],
  input: Scalars['Boolean']
};


export type SupplierChangeBuybackMutation = (
  { __typename?: 'Mutation' }
  & { SupplierChangeBuyBack: Maybe<(
    { __typename?: 'Supplier' }
    & Pick<Supplier, '_id' | 'supplier_company' | 'is_buyback'>
  )> }
);

export type SupplierQueryVariables = {
  location_id?: Maybe<Scalars['ID']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type SupplierQuery = (
  { __typename?: 'Query' }
  & { suppliers: Maybe<Array<Maybe<(
    { __typename?: 'Supplier' }
    & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_keeping_unit' | 'is_verify_supplier' | 'is_buyback' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email'>
    & { Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name'>
    )>, payment_settings: Maybe<Array<Maybe<(
      { __typename?: 'SupplierPaymentSetting' }
      & Pick<SupplierPaymentSetting, 'isActive'>
      & { paymentType: Maybe<(
        { __typename?: 'TypePayments' }
        & Pick<TypePayments, '_id' | 'name' | 'icon'>
      )> }
    )>>> }
  )>>> }
);

export type GetBrandWiseDevicesQueryVariables = {
  search: Scalars['String'],
  location_id: Scalars['ID']
};


export type GetBrandWiseDevicesQuery = (
  { __typename?: 'Query' }
  & { getBrandWiseDevices: Maybe<Array<Maybe<(
    { __typename?: 'SystemBrand' }
    & Pick<SystemBrand, '_id' | 'brand_name'>
    & { system_devices: Maybe<Array<Maybe<(
      { __typename?: 'SystemDevice' }
      & Pick<SystemDevice, '_id' | 'product_name' | 'product_price' | 'is_system_created'>
    )>>> }
  )>>> }
);

export type CompareSupplierWithSystemQueryVariables = {
  input?: Maybe<SystemSupplierInput>
};


export type CompareSupplierWithSystemQuery = (
  { __typename?: 'Query' }
  & { compareSupplierWithSystem: Maybe<(
    { __typename?: 'SystemSupplier' }
    & Pick<SystemSupplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email'>
    & { Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name'>
    )> }
  )> }
);

export type GetAllSupplierRestockQueryVariables = {
  location_id: Scalars['ID'],
  search?: Maybe<Scalars['String']>
};


export type GetAllSupplierRestockQuery = (
  { __typename?: 'Query' }
  & { getAllSupplierRestock: Maybe<Array<Maybe<(
    { __typename?: 'Supplier' }
    & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_keeping_unit' | 'is_verify_supplier' | 'is_buyback' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email'>
    & { Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name'>
    )>, payment_settings: Maybe<Array<Maybe<(
      { __typename?: 'SupplierPaymentSetting' }
      & Pick<SupplierPaymentSetting, 'isActive'>
      & { paymentType: Maybe<(
        { __typename?: 'TypePayments' }
        & Pick<TypePayments, '_id' | 'name' | 'icon'>
      )> }
    )>>> }
  )>>> }
);

export type ImportSuppliersDataMutationVariables = {
  input?: Maybe<Array<Maybe<ImportSupplierInput>>>
};


export type ImportSuppliersDataMutation = (
  { __typename?: 'Mutation' }
  & { importSuppliersData: Maybe<(
    { __typename?: 'importSupplierType' }
    & { alreadyExistSuppliers: Maybe<Array<Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email'>
      & { Country: Maybe<(
        { __typename?: 'Country' }
        & Pick<Country, '_id' | 'name'>
      )> }
    )>>>, suppliersInvalidData: Maybe<Array<Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email'>
      & { Country: Maybe<(
        { __typename?: 'Country' }
        & Pick<Country, '_id' | 'name'>
      )> }
    )>>>, newlyAddedSuppliers: Maybe<Array<Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email'>
      & { Country: Maybe<(
        { __typename?: 'Country' }
        & Pick<Country, '_id' | 'name'>
      )> }
    )>>> }
  )> }
);

export type CreateShippingTypeMutationVariables = {
  input: ShippingTypeInput
};


export type CreateShippingTypeMutation = (
  { __typename?: 'Mutation' }
  & { createShippingType: Maybe<(
    { __typename?: 'ShippingType' }
    & Pick<ShippingType, '_id' | 'shipment_name' | 'shipment_price' | 'delivery_time_days' | 'threshold' | 'hours' | 'minutes' | 'am_pm' | 'time_zone' | 'icon'>
    & { BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name'>
    )> }
  )> }
);

export type GetAllShippingTypeQueryVariables = {
  location_id: Scalars['ID'],
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  supplierID?: Maybe<Scalars['ID']>
};


export type GetAllShippingTypeQuery = (
  { __typename?: 'Query' }
  & { getAllShippingType: Maybe<Array<Maybe<(
    { __typename?: 'ShippingType' }
    & Pick<ShippingType, '_id' | 'shipment_name' | 'shipment_price' | 'delivery_time_days' | 'threshold' | 'icon' | 'hours' | 'minutes' | 'am_pm' | 'time_zone' | 'tracking_url'>
    & { BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name'>
    )> }
  )>>> }
);

export type UpdateShippingTypeMutationVariables = {
  id: Scalars['ID'],
  input: ShippingTypeInput
};


export type UpdateShippingTypeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateShippingType'>
);

export type GetShippingTypeQueryVariables = {
  id: Scalars['ID']
};


export type GetShippingTypeQuery = (
  { __typename?: 'Query' }
  & { getShippingType: Maybe<(
    { __typename?: 'ShippingType' }
    & Pick<ShippingType, '_id' | 'shipment_name' | 'shipment_price' | 'delivery_time_days' | 'hours' | 'minutes' | 'am_pm' | 'time_zone' | 'threshold' | 'icon'>
    & { BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name'>
    )> }
  )> }
);

export type DeleteShippingTypeMutationVariables = {
  id: Scalars['ID']
};


export type DeleteShippingTypeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteShippingType'>
);

export type RemovedMultiSuppliersMutationVariables = {
  id?: Maybe<Array<Scalars['ID']>>
};


export type RemovedMultiSuppliersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removedMultiSuppliers'>
);

export type GetAllSuppliersQueryVariables = {};


export type GetAllSuppliersQuery = (
  { __typename?: 'Query' }
  & { suppliers: Maybe<Array<Maybe<(
    { __typename?: 'Supplier' }
    & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_keeping_unit' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email'>
    & { Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name'>
    )> }
  )>>> }
);

export type RemovedSupplierMutationVariables = {
  id: Scalars['ID']
};


export type RemovedSupplierMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removedSupplier'>
);

export type UpdateSupplierMutationVariables = {
  id: Scalars['ID'],
  input?: Maybe<SupplierInput>
};


export type UpdateSupplierMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateSupplier'>
);

export type CheckSupplierEmailAndCompanyPhoneQueryVariables = {
  supplierField: Scalars['String'],
  type: Scalars['String']
};


export type CheckSupplierEmailAndCompanyPhoneQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'checkSupplierEmailAndCompanyPhone'>
);

export type CreateProductMutationVariables = {
  input?: Maybe<ProductInput>
};


export type CreateProductMutation = (
  { __typename?: 'Mutation' }
  & { createProduct: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, '_id'>
  )> }
);

export type GetProductbyIdQueryVariables = {
  id?: Maybe<Scalars['ID']>,
  locationId: Scalars['ID']
};


export type GetProductbyIdQuery = (
  { __typename?: 'Query' }
  & { getProductbyID: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'product_name' | 'description'>
  )> }
);

export type ProductsBySupplierQueryVariables = {
  supplierId: Scalars['ID'],
  locationId: Scalars['ID'],
  stock?: Maybe<Scalars['String']>
};


export type ProductsBySupplierQuery = (
  { __typename?: 'Query' }
  & { ProductsBySupplier: Maybe<Array<Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'product_name' | 'description'>
  )>>> }
);

export type DeleteProductMutationVariables = {
  productIds?: Maybe<Array<Maybe<Scalars['ID']>>>
};


export type DeleteProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProduct'>
);

export type CreateBrandMutationVariables = {
  input?: Maybe<BrandInput>
};


export type CreateBrandMutation = (
  { __typename?: 'Mutation' }
  & { createBrand: Maybe<(
    { __typename?: 'Brand' }
    & Pick<Brand, '_id' | 'name'>
  )> }
);

export type UpdateProductMutationVariables = {
  id: Scalars['ID'],
  input?: Maybe<ProductInput>
};


export type UpdateProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateProduct'>
);

export type GetCountriesQueryVariables = {};


export type GetCountriesQuery = (
  { __typename?: 'Query' }
  & { countries: Maybe<Array<Maybe<(
    { __typename?: 'Country' }
    & Pick<Country, '_id' | 'name' | 'short_name' | 'identification_types'>
  )>>> }
);

export type GetPurchaseOrdersAndSearchQueryVariables = {
  input?: Maybe<SearchInput>
};


export type GetPurchaseOrdersAndSearchQuery = (
  { __typename?: 'Query' }
  & { getPurchaseOrdersAndSearch: Maybe<(
    { __typename?: 'searchProductOrdersType' }
    & Pick<SearchProductOrdersType, 'available_status'>
    & { transaction: Maybe<Array<Maybe<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, '_id' | 'order_status' | 'transaction_type' | 'transaction_keeping_unit' | 'shipping_tracking_no' | 'shipping_company_name' | 'created_at' | 'transaction_date' | 'arrival_Date' | 'remaining_amount' | 'total_amount' | 'sub_total_amount' | 'tax_amount' | 'received_additional_cost'>
      & { dynamic_status: Maybe<(
        { __typename?: 'TPstatus' }
        & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
      )>, dynamic_status_list: Maybe<Array<Maybe<(
        { __typename?: 'TPstatus' }
        & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
      )>>>, ShippingType: Maybe<(
        { __typename?: 'ShippingType' }
        & Pick<ShippingType, '_id' | 'shipment_name' | 'shipment_price' | 'delivery_time_days' | 'hours' | 'minutes' | 'am_pm' | 'time_zone' | 'threshold' | 'icon'>
      )>, Supplier: Maybe<(
        { __typename?: 'Supplier' }
        & Pick<Supplier, '_id' | 'supplier_company'>
      )> }
    )>>>, suppliers: Maybe<Array<Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_company'>
    )>>> }
  )> }
);

export type ImportSearchProductsQueryVariables = {
  search?: Maybe<Array<Scalars['String']>>,
  locationId: Scalars['ID']
};


export type ImportSearchProductsQuery = (
  { __typename?: 'Query' }
  & { importSearchProducts: Maybe<Array<Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'product_name'>
  )>>> }
);

export type GetSupplierPurchaseHistoryQueryVariables = {
  supplierID: Scalars['ID'],
  businessLocation: Scalars['ID']
};


export type GetSupplierPurchaseHistoryQuery = (
  { __typename?: 'Query' }
  & { GetSupplierPurchaseHistory: Maybe<(
    { __typename?: 'PurchaseHistory' }
    & Pick<PurchaseHistory, 'totalAmount' | 'avgItemPerVisit' | 'totalVisiter' | 'avgPurchase'>
  )> }
);

export type GetAllProductAccountsQueryVariables = {};


export type GetAllProductAccountsQuery = (
  { __typename?: 'Query' }
  & { GetAllProductAccounts: Maybe<(
    { __typename?: 'ProductAccount' }
    & { expenses: Maybe<Array<Maybe<(
      { __typename?: 'ChartOfAccount' }
      & Pick<ChartOfAccount, '_id' | 'account_code' | 'account_name' | 'slug'>
      & { parent_account_Id: Maybe<(
        { __typename?: 'ChartOfAccount' }
        & Pick<ChartOfAccount, 'account_name'>
      )> }
    )>>>, income: Maybe<Array<Maybe<(
      { __typename?: 'ChartOfAccount' }
      & Pick<ChartOfAccount, '_id' | 'account_code' | 'account_name' | 'slug'>
      & { parent_account_Id: Maybe<(
        { __typename?: 'ChartOfAccount' }
        & Pick<ChartOfAccount, 'account_name'>
      )> }
    )>>>, inventory: Maybe<Array<Maybe<(
      { __typename?: 'ChartOfAccount' }
      & Pick<ChartOfAccount, '_id' | 'account_code' | 'account_name' | 'slug'>
      & { parent_account_Id: Maybe<(
        { __typename?: 'ChartOfAccount' }
        & Pick<ChartOfAccount, 'account_name'>
      )> }
    )>>> }
  )> }
);

export type GetSupplierPurchaseOrdersQueryVariables = {
  supplierID: Scalars['ID'],
  businessLocation: Scalars['ID']
};


export type GetSupplierPurchaseOrdersQuery = (
  { __typename?: 'Query' }
  & { GetSupplierPurchaseOrders: Maybe<Array<Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'transaction_date' | 'order_status'>
  )>>> }
);

export type GetSupplierPurchasePaymentsQueryVariables = {
  supplierID: Scalars['ID'],
  businessLocation: Scalars['ID']
};


export type GetSupplierPurchasePaymentsQuery = (
  { __typename?: 'Query' }
  & { GetSupplierPurchasePayments: Maybe<Array<Maybe<(
    { __typename?: 'TransactionPayment' }
    & Pick<TransactionPayment, 'amount' | 'method' | 'paid_on'>
    & { Transaction: Maybe<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, 'order_status'>
    )> }
  )>>> }
);

export type GetSupplierPurchaseBillsQueryVariables = {
  supplierID: Scalars['ID'],
  businessLocation: Scalars['ID']
};


export type GetSupplierPurchaseBillsQuery = (
  { __typename?: 'Query' }
  & { GetSupplierPurchaseBills: Maybe<Array<Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id'>
  )>>> }
);

export type GetAllDeviceModelByBrandQueryVariables = {
  id: Scalars['ID']
};


export type GetAllDeviceModelByBrandQuery = (
  { __typename?: 'Query' }
  & { getAllDeviceModelByBrand: Maybe<Array<Maybe<(
    { __typename?: 'DeviceModel' }
    & Pick<DeviceModel, '_id' | 'name'>
  )>>> }
);

export type CreateDeviceModelMutationVariables = {
  input?: Maybe<DeviceModelInput>
};


export type CreateDeviceModelMutation = (
  { __typename?: 'Mutation' }
  & { createDeviceModel: Maybe<(
    { __typename?: 'DeviceModel' }
    & Pick<DeviceModel, '_id' | 'name'>
  )> }
);

export type GetAllCompatibleDeviceTagsQueryVariables = {
  search: Scalars['String']
};


export type GetAllCompatibleDeviceTagsQuery = (
  { __typename?: 'Query' }
  & { searchDeviceTags: Maybe<Array<Maybe<(
    { __typename?: 'DeviceTags' }
    & Pick<DeviceTags, 'name'>
  )>>> }
);

export type UniqueSkuNumberForProductQueryVariables = {
  locationId?: Maybe<Scalars['ID']>,
  sku?: Maybe<Scalars['String']>
};


export type UniqueSkuNumberForProductQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'uniqueSKUNumberForProduct'>
);

export type UniqueSkUNumberForSupplierQueryVariables = {
  locationId?: Maybe<Scalars['ID']>,
  sku_number?: Maybe<Scalars['String']>,
  supplier_id?: Maybe<Scalars['ID']>
};


export type UniqueSkUNumberForSupplierQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'uniqueSkUNumberForSupplier'>
);

export type GetAllAccountTypeWiseQueryVariables = {
  search?: Maybe<Scalars['String']>,
  type?: Maybe<Account_Type>
};


export type GetAllAccountTypeWiseQuery = (
  { __typename?: 'Query' }
  & { GetAllAccountTypeWise: Maybe<Array<Maybe<(
    { __typename?: 'ChartOfAccount' }
    & Pick<ChartOfAccount, '_id' | 'account_code' | 'account_name' | 'slug' | 'Opening_balance' | 'account_balance' | 'description'>
    & { account_type_Id: Maybe<(
      { __typename?: 'AccountType' }
      & Pick<AccountType, '_id' | 'title'>
    )>, parent_account_Id: Maybe<(
      { __typename?: 'ChartOfAccount' }
      & Pick<ChartOfAccount, '_id' | 'account_name'>
    )> }
  )>>> }
);

export type GetProductsAndSearchQueryVariables = {
  locationId?: Maybe<Scalars['ID']>,
  search?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>,
  filterType?: Maybe<FilterType>,
  is_deleted?: Maybe<Scalars['Boolean']>,
  productType?: Maybe<ProductTypes>
};


export type GetProductsAndSearchQuery = (
  { __typename?: 'Query' }
  & { getProductsAndSearch: Maybe<Array<Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'product_name' | 'description' | 'image' | 'is_bundle_product' | 'max_bundle' | 'is_product' | 'is_track_stock' | 'alert_qty' | 'ideal_qty' | 'is_serial_number' | 'openingStock' | 'sell_price' | 'sell_price_inc_tax' | 'barcode' | 'sku' | 'is_completed_product' | 'compatilable_devices' | 'average_cost' | 'last_cost' | 'tags' | 'sale_item' | 'total_sale' | 'incoming_item' | 'isAddedDeviceModel'>
    & { bundle_products: Maybe<(
      { __typename?: 'bundleProductInfo' }
      & Pick<BundleProductInfo, 'is_manufactured_qty' | 'total_selling_price' | 'total_avg_cost'>
      & { bundleProduct: Maybe<Array<Maybe<(
        { __typename?: 'bundleProduct' }
        & Pick<BundleProduct, 'quantity' | 'selling_price' | 'avg_cost'>
        & { bundleProductID: Maybe<(
          { __typename?: 'Product' }
          & Pick<Product, '_id' | 'product_name' | 'is_product'>
          & { ProductStockPrice: Maybe<Array<Maybe<(
            { __typename?: 'ProductPrices' }
            & Pick<ProductPrices, 'qty_available' | 'alert_quantity' | 'average_cost'>
          )>>> }
        )> }
      )>>> }
    )>, Brand: Maybe<(
      { __typename?: 'SystemBrand' }
      & Pick<SystemBrand, '_id' | 'brand_name'>
    )>, DeviceModel: Maybe<(
      { __typename?: 'DeviceModel' }
      & Pick<DeviceModel, '_id' | 'name'>
    )>, Suppliers: Maybe<Array<Maybe<(
      { __typename?: 'SupplierInfo' }
      & Pick<SupplierInfo, 'sku_number' | 'current_stock'>
      & { supplier_id: Maybe<(
        { __typename?: 'Supplier' }
        & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'website'>
      )> }
    )>>>, Business: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id' | 'business_keeping_unit' | 'business_system_name'>
    )>, BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name' | 'store_nick_name' | 'location_keeping_unit'>
    )>, ProductStockPrice: Maybe<Array<Maybe<(
      { __typename?: 'ProductPrices' }
      & Pick<ProductPrices, '_id' | 'discount_amount' | 'percentage_discount' | 'price_without_bundle' | 'default_sell_price' | 'total_cost' | 'ideal_quantity' | 'opening_stock' | 'qty_available' | 'alert_quantity' | 'shelf_qty' | 'order_qty' | 'is_profit_percentage' | 'profit_value' | 'profit_amount' | 'is_sell_tax_percentage' | 'sell_tax_value' | 'sell_tax_amount' | 'sell_price_inc_tax' | 'last_cost' | 'average_cost'>
      & { Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, '_id'>
      )>, income_account: Maybe<(
        { __typename?: 'ChartOfAccount' }
        & Pick<ChartOfAccount, '_id' | 'account_name'>
      )>, expense_account: Maybe<(
        { __typename?: 'ChartOfAccount' }
        & Pick<ChartOfAccount, '_id' | 'account_name'>
      )>, inventory_account: Maybe<(
        { __typename?: 'ChartOfAccount' }
        & Pick<ChartOfAccount, '_id' | 'account_name'>
      )>, SellTax: Maybe<(
        { __typename?: 'Tax' }
        & Pick<Tax, '_id' | 'name' | 'amount' | 'is_percentage' | 'is_tax_group'>
      )> }
    )>>>, servicesBrandModel: Maybe<Array<Maybe<(
      { __typename?: 'ServicesBrandModel' }
      & Pick<ServicesBrandModel, 'service_max_price' | 'service_min_price'>
      & { ServiceBrand: Maybe<(
        { __typename?: 'SystemBrand' }
        & Pick<SystemBrand, '_id' | 'brand_name'>
      )>, ServiceDeviceModel: Maybe<(
        { __typename?: 'DeviceModel' }
        & Pick<DeviceModel, '_id' | 'name'>
      )>, ServiceItem: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, '_id' | 'product_name'>
      )> }
    )>>> }
  )>>> }
);

export type GetProductsforAddBundleProductQueryVariables = {
  locationId?: Maybe<Scalars['ID']>,
  is_service?: Maybe<Scalars['Boolean']>,
  search?: Maybe<Scalars['String']>,
  brandID?: Maybe<Scalars['ID']>,
  modelID?: Maybe<Scalars['ID']>
};


export type GetProductsforAddBundleProductQuery = (
  { __typename?: 'Query' }
  & { getProductsforAddBundleProduct: Maybe<Array<Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'is_product' | 'product_name' | 'sell_price'>
    & { ProductStockPrice: Maybe<Array<Maybe<(
      { __typename?: 'ProductPrices' }
      & Pick<ProductPrices, 'qty_available' | 'average_cost'>
    )>>> }
  )>>> }
);

export type GenerateSkuNumberMutationVariables = {};


export type GenerateSkuNumberMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'generateSKUNumber'>
);

export type CreateChartOfAccountByTypeMutationVariables = {
  input?: Maybe<ChartOfAccountInput>,
  account_type?: Maybe<Account_Type>
};


export type CreateChartOfAccountByTypeMutation = (
  { __typename?: 'Mutation' }
  & { createChartOfAccountByType: Maybe<(
    { __typename?: 'ChartOfAccount' }
    & Pick<ChartOfAccount, '_id' | 'account_code' | 'account_name' | 'slug' | 'Opening_balance' | 'account_balance' | 'description'>
    & { account_type_Id: Maybe<(
      { __typename?: 'AccountType' }
      & Pick<AccountType, '_id' | 'title'>
    )>, parent_account_Id: Maybe<(
      { __typename?: 'ChartOfAccount' }
      & Pick<ChartOfAccount, '_id' | 'account_name'>
    )> }
  )> }
);

export type CreatePurchaseOrderMutationVariables = {
  input?: Maybe<CreatePurchaseOrderInput>,
  transactionId?: Maybe<Scalars['ID']>
};


export type CreatePurchaseOrderMutation = (
  { __typename?: 'Mutation' }
  & { createPurchaseOrder: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'transaction_keeping_unit' | 'transaction_type' | 'received_additional_cost' | 'discount_value' | 'discount_amount' | 'transaction_date' | 'refund_amount' | 'shipping_amount'>
    & { dynamic_status: Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>, Supplier: Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_keeping_unit' | 'supplier_company' | 'supplier_company_phone'>
      & { payment_settings: Maybe<Array<Maybe<(
        { __typename?: 'SupplierPaymentSetting' }
        & Pick<SupplierPaymentSetting, 'isActive'>
        & { paymentType: Maybe<(
          { __typename?: 'TypePayments' }
          & Pick<TypePayments, '_id' | 'name' | 'icon'>
        )> }
      )>>> }
    )> }
  )> }
);

export type SaveManufacturedBundleMutationVariables = {
  input?: Maybe<Array<Maybe<BundleInput>>>
};


export type SaveManufacturedBundleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'saveManufacturedBundle'>
);

export type CreateManufacturedBundleMutationVariables = {
  input?: Maybe<Array<Maybe<BundleInput>>>
};


export type CreateManufacturedBundleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createManufacturedBundle'>
);

export type PurchaseOrderReceivingMutationVariables = {
  transactionId: Scalars['ID'],
  extra_Items?: Maybe<Array<Maybe<InputOrderReceivingProduct>>>,
  input?: Maybe<PurchaseOrderReceivingInput>,
  btnCaption: Scalars['String']
};


export type PurchaseOrderReceivingMutation = (
  { __typename?: 'Mutation' }
  & { purchaseOrderReceiving: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'transaction_keeping_unit' | 'transaction_type' | 'received_additional_cost' | 'discount_value' | 'discount_amount' | 'transaction_date' | 'supplier_rma_number' | 'cancel_at' | 'arrival_Date' | 'updated_at' | 'supplier_order_number' | 'tax_amount' | 'tax_value' | 'is_tax_percentage' | 'shipping_company_name' | 'shipping_tracking_no' | 'shipping_estimated_days' | 'total_amount' | 'sub_total_amount' | 'remaining_amount' | 'is_private' | 'additional_notes' | 'received_note' | 'created_at' | 'is_additional_cost' | 'is_extra_items' | 'is_missing_items' | 'order_estimate_amount' | 'refund_amount' | 'shipping_amount'>
    & { cancel_by: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'first_name' | 'last_name'>
    )>, updated_by: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'first_name' | 'last_name'>
    )>, created_by: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first_name' | 'last_name'>
    )>, Tax: Maybe<(
      { __typename?: 'Tax' }
      & Pick<Tax, '_id' | 'name' | 'amount' | 'tax_type' | 'is_percentage'>
    )>, dynamic_status: Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>, ShippingType: Maybe<(
      { __typename?: 'ShippingType' }
      & Pick<ShippingType, '_id' | 'shipment_name' | 'shipment_price' | 'delivery_time_days' | 'threshold' | 'icon'>
    )>, TransactionPayment: Maybe<Array<Maybe<(
      { __typename?: 'TransactionPayment' }
      & Pick<TransactionPayment, '_id' | 'amount' | 'method' | 'paid_on' | 'card_used_no'>
    )>>>, Supplier: Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_keeping_unit' | 'supplier_company' | 'supplier_company_phone'>
      & { payment_settings: Maybe<Array<Maybe<(
        { __typename?: 'SupplierPaymentSetting' }
        & Pick<SupplierPaymentSetting, 'isActive'>
        & { paymentType: Maybe<(
          { __typename?: 'TypePayments' }
          & Pick<TypePayments, '_id' | 'name' | 'icon'>
        )> }
      )>>> }
    )>, TransactionPurchaseLine: Maybe<Array<Maybe<(
      { __typename?: 'TransactionPurchaseLine' }
      & Pick<TransactionPurchaseLine, '_id' | 'stock_sku_number' | 'quantity' | 'receiving_quantity' | 'receive_quantity' | 'product_cost_price' | 'is_extra_item' | 'total_amount'>
      & { Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, '_id' | 'product_name' | 'description' | 'sku'>
      )> }
    )>>>, TransactionBuyBackLine: Maybe<Array<Maybe<(
      { __typename?: 'TransactionBuyBackLine' }
      & Pick<TransactionBuyBackLine, '_id' | 'quantity' | 'device_price' | 'sub_total' | 'total_amount' | 'received_qty' | 'approve_qty'>
      & { System_Device: Maybe<(
        { __typename?: 'SystemDevice' }
        & Pick<SystemDevice, '_id' | 'product_name' | 'product_price'>
        & { product_brand: Maybe<(
          { __typename?: 'SystemBrand' }
          & Pick<SystemBrand, '_id' | 'brand_name'>
        )> }
      )> }
    )>>>, BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, 'address_1'>
    )>, dynamic_status_list: Maybe<Array<Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>>>, ReceivingLogs: Maybe<Array<Maybe<(
      { __typename?: 'TransactionReceivingLog' }
      & Pick<TransactionReceivingLog, '_id' | 'stock_sku_number' | 'receivedDate' | 'quantity' | 'receive_quantity' | 'quantity_returned'>
      & { Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, 'product_name'>
      )> }
    )>>> }
  )> }
);

export type GetProductAndBundlebySupplierQueryVariables = {
  input?: Maybe<InputSearchProductWithSuppler>
};


export type GetProductAndBundlebySupplierQuery = (
  { __typename?: 'Query' }
  & { getProductAndBundlebySupplier: Maybe<(
    { __typename?: 'ProductWithTransaction' }
    & { Transaction: Maybe<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, '_id' | 'sub_total_amount' | 'transaction_date' | 'transaction_keeping_unit' | 'remaining_amount' | 'arrival_Date' | 'discount_amount' | 'discount_value' | 'shipping_amount' | 'tax_amount' | 'tax_value' | 'is_discount_percentage' | 'transaction_hours' | 'transaction_minutes' | 'transaction_am_pm' | 'is_tax_percentage' | 'shipping_company_name' | 'shipping_tracking_no' | 'shipping_estimated_days' | 'total_amount' | 'is_private' | 'additional_notes' | 'received_note'>
      & { Tax: Maybe<(
        { __typename?: 'Tax' }
        & Pick<Tax, '_id' | 'name' | 'amount' | 'tax_type' | 'is_percentage'>
      )>, ShippingType: Maybe<(
        { __typename?: 'ShippingType' }
        & Pick<ShippingType, '_id' | 'shipment_name' | 'shipment_price' | 'delivery_time_days' | 'hours' | 'minutes' | 'am_pm' | 'time_zone' | 'threshold' | 'icon'>
      )>, TransactionPayment: Maybe<Array<Maybe<(
        { __typename?: 'TransactionPayment' }
        & Pick<TransactionPayment, '_id' | 'amount' | 'method' | 'paid_on' | 'card_used_no'>
      )>>>, Supplier: Maybe<(
        { __typename?: 'Supplier' }
        & Pick<Supplier, '_id' | 'supplier_keeping_unit' | 'supplier_company' | 'supplier_company_phone'>
        & { payment_settings: Maybe<Array<Maybe<(
          { __typename?: 'SupplierPaymentSetting' }
          & Pick<SupplierPaymentSetting, 'isActive'>
          & { paymentType: Maybe<(
            { __typename?: 'TypePayments' }
            & Pick<TypePayments, '_id' | 'name' | 'icon'>
          )> }
        )>>> }
      )> }
    )>, ProductList: Maybe<Array<Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, '_id' | 'product_name' | 'is_bundle_product' | 'sku' | 'incoming_item' | 'sell_price_inc_tax' | 'average_cost' | 'max_bundle'>
      & { Suppliers: Maybe<Array<Maybe<(
        { __typename?: 'SupplierInfo' }
        & Pick<SupplierInfo, 'sku_number' | 'incoming_item' | 'instock' | 'ordered_qty' | 'price_purchase'>
        & { supplier_id: Maybe<(
          { __typename?: 'Supplier' }
          & Pick<Supplier, 'supplier_company'>
        )>, productPrices: Maybe<Array<Maybe<(
          { __typename?: 'ProductPrices' }
          & Pick<ProductPrices, 'bundle_order_qty' | 'qty_available' | 'average_cost' | 'alert_quantity' | 'default_sell_price'>
        )>>> }
      )>>>, ProductStockPrice: Maybe<Array<Maybe<(
        { __typename?: 'ProductPrices' }
        & Pick<ProductPrices, 'bundle_order_qty' | 'qty_available' | 'average_cost' | 'alert_quantity' | 'default_sell_price'>
      )>>> }
    )>>> }
  )> }
);

export type CreatePurchaseOrderpaymentMutationVariables = {
  input?: Maybe<InputPurchaseOrderPaymentMethod>
};


export type CreatePurchaseOrderpaymentMutation = (
  { __typename?: 'Mutation' }
  & { createPurchaseOrderpayment: Maybe<Array<Maybe<(
    { __typename?: 'TransactionPayment' }
    & Pick<TransactionPayment, '_id' | 'amount' | 'method' | 'paid_on' | 'card_used_no'>
    & { Transaction: Maybe<(
      { __typename?: 'Transaction' }
      & { dynamic_status: Maybe<(
        { __typename?: 'TPstatus' }
        & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
      )>, dynamic_status_list: Maybe<Array<Maybe<(
        { __typename?: 'TPstatus' }
        & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
      )>>> }
    )> }
  )>>> }
);

export type GetAllOrderStatusQueryVariables = {};


export type GetAllOrderStatusQuery = (
  { __typename?: 'Query' }
  & { GetAllOrderStatus: Maybe<Array<Maybe<(
    { __typename?: 'TPstatus' }
    & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
  )>>> }
);

export type GetTaxsByLocationQueryVariables = {
  location_id: Scalars['ID'],
  taxType?: Maybe<TaxTypeEnum>
};


export type GetTaxsByLocationQuery = (
  { __typename?: 'Query' }
  & { getTaxsByLocation: Maybe<Array<Maybe<(
    { __typename?: 'Tax' }
    & Pick<Tax, '_id' | 'name' | 'amount' | 'tax_type' | 'is_percentage' | 'is_tax_group'>
  )>>> }
);

export type OrderStatusUpdateMutationVariables = {
  orderID: Scalars['ID'],
  order_status?: Maybe<Scalars['String']>,
  status_Input?: Maybe<StatusInput>
};


export type OrderStatusUpdateMutation = (
  { __typename?: 'Mutation' }
  & { OrderStatusUpdate: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id'>
  )> }
);

export type AddShippingDetailMutationVariables = {
  orderID: Scalars['ID'],
  company_name: Scalars['String'],
  tracking_number: Scalars['String'],
  estimated_days: Scalars['String']
};


export type AddShippingDetailMutation = (
  { __typename?: 'Mutation' }
  & { AddShippingDetail: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'transaction_type' | 'transaction_status' | 'order_status' | 'shipping_tracking_no' | 'shipping_estimated_days' | 'shipping_company_name'>
    & { dynamic_status: Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>, dynamic_status_list: Maybe<Array<Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>>> }
  )> }
);

export type GetPurchaseOrderbyIdQueryVariables = {
  orderID: Scalars['ID']
};


export type GetPurchaseOrderbyIdQuery = (
  { __typename?: 'Query' }
  & { getPurchaseOrderbyID: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'transaction_keeping_unit' | 'transaction_type' | 'received_additional_cost' | 'discount_value' | 'discount_amount' | 'transaction_date' | 'supplier_rma_number' | 'cancel_at' | 'arrival_Date' | 'updated_at' | 'supplier_order_number' | 'tax_amount' | 'tax_value' | 'is_tax_percentage' | 'shipping_company_name' | 'shipping_tracking_no' | 'shipping_estimated_days' | 'total_amount' | 'sub_total_amount' | 'remaining_amount' | 'is_private' | 'additional_notes' | 'received_note' | 'created_at' | 'is_additional_cost' | 'is_extra_items' | 'is_missing_items' | 'order_estimate_amount' | 'refund_amount' | 'shipping_amount'>
    & { cancel_by: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'first_name' | 'last_name'>
    )>, updated_by: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'first_name' | 'last_name'>
    )>, created_by: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first_name' | 'last_name'>
    )>, Tax: Maybe<(
      { __typename?: 'Tax' }
      & Pick<Tax, '_id' | 'name' | 'amount' | 'tax_type' | 'is_percentage'>
    )>, dynamic_status: Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>, ShippingType: Maybe<(
      { __typename?: 'ShippingType' }
      & Pick<ShippingType, '_id' | 'shipment_name' | 'tracking_url' | 'shipment_price' | 'delivery_time_days' | 'threshold' | 'icon'>
    )>, TransactionPayment: Maybe<Array<Maybe<(
      { __typename?: 'TransactionPayment' }
      & Pick<TransactionPayment, '_id' | 'amount' | 'method' | 'paid_on' | 'card_used_no'>
    )>>>, Supplier: Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_keeping_unit' | 'supplier_company' | 'supplier_company_phone'>
      & { payment_settings: Maybe<Array<Maybe<(
        { __typename?: 'SupplierPaymentSetting' }
        & Pick<SupplierPaymentSetting, 'isActive'>
        & { paymentType: Maybe<(
          { __typename?: 'TypePayments' }
          & Pick<TypePayments, '_id' | 'name' | 'icon'>
        )> }
      )>>> }
    )>, TransactionPurchaseLine: Maybe<Array<Maybe<(
      { __typename?: 'TransactionPurchaseLine' }
      & Pick<TransactionPurchaseLine, '_id' | 'stock_sku_number' | 'quantity' | 'receiving_quantity' | 'receive_quantity' | 'product_cost_price' | 'is_extra_item' | 'total_amount'>
      & { Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, '_id' | 'product_name' | 'description' | 'sku'>
      )> }
    )>>>, TransactionBuyBackLine: Maybe<Array<Maybe<(
      { __typename?: 'TransactionBuyBackLine' }
      & Pick<TransactionBuyBackLine, '_id' | 'quantity' | 'device_price' | 'sub_total' | 'total_amount' | 'received_qty' | 'approve_qty'>
      & { System_Device: Maybe<(
        { __typename?: 'SystemDevice' }
        & Pick<SystemDevice, '_id' | 'product_name' | 'product_price'>
        & { product_brand: Maybe<(
          { __typename?: 'SystemBrand' }
          & Pick<SystemBrand, '_id' | 'brand_name'>
        )> }
      )> }
    )>>>, BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, 'address_1'>
    )>, dynamic_status_list: Maybe<Array<Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>>>, ReceivingLogs: Maybe<Array<Maybe<(
      { __typename?: 'TransactionReceivingLog' }
      & Pick<TransactionReceivingLog, '_id' | 'stock_sku_number' | 'receivedDate' | 'quantity' | 'receive_quantity' | 'quantity_returned'>
      & { Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, 'product_name'>
      )> }
    )>>> }
  )> }
);

export type AddAdditionalCostMutationVariables = {
  orderID: Scalars['ID'],
  amount: Scalars['Float']
};


export type AddAdditionalCostMutation = (
  { __typename?: 'Mutation' }
  & { addAdditionalCost: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'transaction_keeping_unit' | 'transaction_type' | 'received_additional_cost' | 'discount_value' | 'discount_amount' | 'transaction_date' | 'supplier_rma_number' | 'cancel_at' | 'arrival_Date' | 'updated_at' | 'supplier_order_number' | 'tax_amount' | 'tax_value' | 'is_tax_percentage' | 'shipping_company_name' | 'shipping_tracking_no' | 'shipping_estimated_days' | 'total_amount' | 'sub_total_amount' | 'remaining_amount' | 'is_private' | 'additional_notes' | 'received_note' | 'created_at' | 'is_additional_cost' | 'is_extra_items' | 'is_missing_items' | 'order_estimate_amount' | 'shipping_amount'>
    & { cancel_by: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'first_name' | 'last_name'>
    )>, updated_by: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'first_name' | 'last_name'>
    )>, created_by: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first_name' | 'last_name'>
    )>, Tax: Maybe<(
      { __typename?: 'Tax' }
      & Pick<Tax, '_id' | 'name' | 'amount' | 'tax_type' | 'is_percentage'>
    )>, dynamic_status: Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>, ShippingType: Maybe<(
      { __typename?: 'ShippingType' }
      & Pick<ShippingType, '_id' | 'shipment_name' | 'shipment_price' | 'delivery_time_days' | 'threshold' | 'icon'>
    )>, TransactionPayment: Maybe<Array<Maybe<(
      { __typename?: 'TransactionPayment' }
      & Pick<TransactionPayment, '_id' | 'amount' | 'method' | 'paid_on' | 'card_used_no'>
    )>>>, Supplier: Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_keeping_unit' | 'supplier_company' | 'supplier_company_phone'>
      & { payment_settings: Maybe<Array<Maybe<(
        { __typename?: 'SupplierPaymentSetting' }
        & Pick<SupplierPaymentSetting, 'isActive'>
        & { paymentType: Maybe<(
          { __typename?: 'TypePayments' }
          & Pick<TypePayments, '_id' | 'name' | 'icon'>
        )> }
      )>>> }
    )>, TransactionPurchaseLine: Maybe<Array<Maybe<(
      { __typename?: 'TransactionPurchaseLine' }
      & Pick<TransactionPurchaseLine, '_id' | 'stock_sku_number' | 'quantity' | 'receiving_quantity' | 'receive_quantity' | 'product_cost_price' | 'is_extra_item' | 'total_amount'>
      & { Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, '_id' | 'product_name' | 'description' | 'sku'>
      )> }
    )>>>, TransactionBuyBackLine: Maybe<Array<Maybe<(
      { __typename?: 'TransactionBuyBackLine' }
      & Pick<TransactionBuyBackLine, '_id' | 'quantity' | 'device_price' | 'sub_total' | 'total_amount' | 'received_qty' | 'approve_qty'>
      & { System_Device: Maybe<(
        { __typename?: 'SystemDevice' }
        & Pick<SystemDevice, '_id' | 'product_name' | 'product_price'>
        & { product_brand: Maybe<(
          { __typename?: 'SystemBrand' }
          & Pick<SystemBrand, '_id' | 'brand_name'>
        )> }
      )> }
    )>>>, BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, 'address_1'>
    )>, dynamic_status_list: Maybe<Array<Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>>>, ReceivingLogs: Maybe<Array<Maybe<(
      { __typename?: 'TransactionReceivingLog' }
      & Pick<TransactionReceivingLog, '_id' | 'stock_sku_number' | 'receivedDate' | 'quantity' | 'receive_quantity' | 'quantity_returned'>
      & { Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, 'product_name'>
      )> }
    )>>> }
  )> }
);

export type SupplierPoListQueryVariables = {
  input?: Maybe<SupplierOrderListingInput>
};


export type SupplierPoListQuery = (
  { __typename?: 'Query' }
  & { supplierPOList: Maybe<(
    { __typename?: 'searchProductOrdersType' }
    & Pick<SearchProductOrdersType, 'available_status'>
    & { transaction: Maybe<Array<Maybe<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, '_id' | 'transaction_keeping_unit' | 'received_additional_cost' | 'transaction_date' | 'transaction_type' | 'tax_amount' | 'tax_value' | 'is_tax_percentage' | 'shipping_company_name' | 'shipping_tracking_no' | 'shipping_estimated_days' | 'total_amount' | 'sub_total_amount' | 'remaining_amount' | 'is_private' | 'additional_notes' | 'received_note' | 'created_at'>
      & { created_by: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'first_name' | 'last_name'>
      )>, Tax: Maybe<(
        { __typename?: 'Tax' }
        & Pick<Tax, '_id' | 'name' | 'amount' | 'tax_type' | 'is_percentage'>
      )>, dynamic_status: Maybe<(
        { __typename?: 'TPstatus' }
        & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
      )>, ShippingType: Maybe<(
        { __typename?: 'ShippingType' }
        & Pick<ShippingType, '_id' | 'shipment_name' | 'shipment_price' | 'delivery_time_days' | 'threshold' | 'icon'>
      )>, TransactionPayment: Maybe<Array<Maybe<(
        { __typename?: 'TransactionPayment' }
        & Pick<TransactionPayment, '_id' | 'amount' | 'method' | 'paid_on'>
      )>>>, Supplier: Maybe<(
        { __typename?: 'Supplier' }
        & Pick<Supplier, '_id' | 'supplier_keeping_unit' | 'supplier_company' | 'supplier_company_phone'>
      )>, TransactionPurchaseLine: Maybe<Array<Maybe<(
        { __typename?: 'TransactionPurchaseLine' }
        & Pick<TransactionPurchaseLine, '_id' | 'stock_sku_number' | 'quantity' | 'receiving_quantity' | 'receive_quantity' | 'product_cost_price' | 'total_amount'>
        & { Product: Maybe<(
          { __typename?: 'Product' }
          & Pick<Product, '_id' | 'product_name' | 'description' | 'sku'>
        )> }
      )>>>, BusinessLocation: Maybe<(
        { __typename?: 'BusinessLocation' }
        & Pick<BusinessLocation, 'address_1'>
      )> }
    )>>> }
  )> }
);

export type PoSupplierOrderNumberMutationVariables = {
  orderID: Scalars['ID'],
  order_number: Scalars['String']
};


export type PoSupplierOrderNumberMutation = (
  { __typename?: 'Mutation' }
  & { POSupplierOrderNumber: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'transaction_keeping_unit' | 'transaction_type' | 'received_additional_cost' | 'transaction_date' | 'supplier_order_number' | 'tax_amount' | 'tax_value' | 'is_tax_percentage' | 'shipping_company_name' | 'shipping_tracking_no' | 'shipping_estimated_days' | 'total_amount' | 'sub_total_amount' | 'remaining_amount' | 'is_private' | 'additional_notes' | 'received_note' | 'created_at' | 'is_additional_cost' | 'is_extra_items' | 'is_missing_items'>
    & { created_by: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first_name' | 'last_name'>
    )>, Tax: Maybe<(
      { __typename?: 'Tax' }
      & Pick<Tax, '_id' | 'name' | 'amount' | 'tax_type' | 'is_percentage'>
    )>, dynamic_status: Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>, ShippingType: Maybe<(
      { __typename?: 'ShippingType' }
      & Pick<ShippingType, '_id' | 'shipment_name' | 'shipment_price' | 'delivery_time_days' | 'threshold' | 'icon'>
    )>, TransactionPayment: Maybe<Array<Maybe<(
      { __typename?: 'TransactionPayment' }
      & Pick<TransactionPayment, '_id' | 'amount' | 'method' | 'paid_on'>
    )>>>, Supplier: Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_keeping_unit' | 'supplier_company' | 'supplier_company_phone'>
    )>, TransactionPurchaseLine: Maybe<Array<Maybe<(
      { __typename?: 'TransactionPurchaseLine' }
      & Pick<TransactionPurchaseLine, '_id' | 'stock_sku_number' | 'quantity' | 'receiving_quantity' | 'receive_quantity' | 'product_cost_price' | 'is_extra_item' | 'total_amount'>
      & { Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, '_id' | 'product_name' | 'description' | 'sku'>
      )> }
    )>>>, TransactionBuyBackLine: Maybe<Array<Maybe<(
      { __typename?: 'TransactionBuyBackLine' }
      & Pick<TransactionBuyBackLine, '_id' | 'quantity' | 'device_price' | 'sub_total' | 'total_amount'>
      & { System_Device: Maybe<(
        { __typename?: 'SystemDevice' }
        & Pick<SystemDevice, '_id' | 'product_name' | 'product_price'>
        & { product_brand: Maybe<(
          { __typename?: 'SystemBrand' }
          & Pick<SystemBrand, '_id' | 'brand_name'>
        )> }
      )> }
    )>>>, BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, 'address_1'>
    )>, dynamic_status_list: Maybe<Array<Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>>> }
  )> }
);

export type DeletePaymentMutationVariables = {
  transactionId: Scalars['ID'],
  paymentId: Scalars['ID']
};


export type DeletePaymentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePayment'>
);

export type PoStatusUpdateMutationVariables = {
  orderID: Scalars['ID'],
  status_type?: Maybe<PoStatusName>
};


export type PoStatusUpdateMutation = (
  { __typename?: 'Mutation' }
  & { POStatusUpdate: Maybe<(
    { __typename?: 'Transaction' }
    & { dynamic_status: Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>, dynamic_status_list: Maybe<Array<Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>>> }
  )> }
);

export type SupplierPaymentSettingListQueryVariables = {
  supplier_id: Scalars['ID']
};


export type SupplierPaymentSettingListQuery = (
  { __typename?: 'Query' }
  & { supplierPaymentSettingList: Maybe<(
    { __typename?: 'Supplier' }
    & { payment_settings: Maybe<Array<Maybe<(
      { __typename?: 'SupplierPaymentSetting' }
      & Pick<SupplierPaymentSetting, 'isActive'>
      & { paymentType: Maybe<(
        { __typename?: 'TypePayments' }
        & Pick<TypePayments, '_id' | 'name' | 'icon'>
      )> }
    )>>> }
  )> }
);

export type IsManufactureBunldeProductQueryVariables = {
  location_id: Scalars['ID']
};


export type IsManufactureBunldeProductQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isManufactureBunldeProduct'>
);

export type SupplierSortOrderMutationVariables = {
  _id: Scalars['ID'],
  sort_order: Scalars['Int']
};


export type SupplierSortOrderMutation = (
  { __typename?: 'Mutation' }
  & { SupplierSortOrder: Maybe<(
    { __typename?: 'Supplier' }
    & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone'>
  )> }
);

export type SupplierPaymentSettingsMutationVariables = {
  supplier_id: Scalars['ID'],
  payment_id: Scalars['ID'],
  is_active: Scalars['Boolean']
};


export type SupplierPaymentSettingsMutation = (
  { __typename?: 'Mutation' }
  & { SupplierPaymentSettings: Maybe<(
    { __typename?: 'Supplier' }
    & { payment_settings: Maybe<Array<Maybe<(
      { __typename?: 'SupplierPaymentSetting' }
      & Pick<SupplierPaymentSetting, 'isActive'>
      & { paymentType: Maybe<(
        { __typename?: 'TypePayments' }
        & Pick<TypePayments, '_id' | 'name' | 'icon'>
      )> }
    )>>> }
  )> }
);

export type GetCreditLineQueryVariables = {};


export type GetCreditLineQuery = (
  { __typename?: 'Query' }
  & { getCreditLine: Maybe<Array<Maybe<(
    { __typename?: 'creditLine' }
    & Pick<CreditLine, '_id' | 'credit_line'>
  )>>> }
);

export type PoDeleteMutationVariables = {
  orderID: Scalars['ID']
};


export type PoDeleteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'PODelete'>
);

export type PoCancelMutationVariables = {
  orderID: Scalars['ID'],
  refund_payment_type: RefundPaymentType,
  refund_date: Scalars['String'],
  username: Scalars['String'],
  password: Scalars['String'],
  refund_amount?: Maybe<Scalars['Float']>
};


export type PoCancelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'POCancel'>
);

export type CreateBuyBackOrderMutationVariables = {
  transactionId?: Maybe<Scalars['ID']>,
  input?: Maybe<CreateBuyBackInput>
};


export type CreateBuyBackOrderMutation = (
  { __typename?: 'Mutation' }
  & { createBuyBackOrder: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'ref_no' | 'transaction_keeping_unit'>
  )> }
);

export type DeleteSystemDeviceMutationVariables = {
  ID: Scalars['ID']
};


export type DeleteSystemDeviceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSystemDevice'>
);

export type BuybackCancelMutationVariables = {
  orderID: Scalars['ID'],
  username: Scalars['String'],
  password: Scalars['String']
};


export type BuybackCancelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'BuybackCancel'>
);

export type BuybackReceivingMutationVariables = {
  orderID: Scalars['ID'],
  input: ReceivingBuyBackInput
};


export type BuybackReceivingMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'BuybackReceiving'>
);

export type GetProductBySupplierQueryVariables = {
  input?: Maybe<InputSearchProductBySupplier>
};


export type GetProductBySupplierQuery = (
  { __typename?: 'Query' }
  & { getProductBySupplier: Maybe<Array<Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, '_id' | 'product_name' | 'description' | 'is_bundle_product' | 'max_bundle' | 'is_product' | 'is_track_stock' | 'alert_qty' | 'ideal_qty' | 'is_serial_number' | 'openingStock' | 'sell_price' | 'sell_price_inc_tax' | 'barcode' | 'sku' | 'compatilable_devices' | 'average_cost' | 'last_cost' | 'image' | 'tags' | 'sale_item' | 'total_sale' | 'incoming_item'>
    & { Brand: Maybe<(
      { __typename?: 'SystemBrand' }
      & Pick<SystemBrand, '_id' | 'brand_name'>
    )>, DeviceModel: Maybe<(
      { __typename?: 'DeviceModel' }
      & Pick<DeviceModel, '_id' | 'name'>
    )>, Suppliers: Maybe<Array<Maybe<(
      { __typename?: 'SupplierInfo' }
      & Pick<SupplierInfo, 'sku_number' | 'current_stock'>
      & { supplier_id: Maybe<(
        { __typename?: 'Supplier' }
        & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'website'>
      )> }
    )>>>, Business: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id' | 'business_keeping_unit' | 'business_system_name'>
    )>, BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name' | 'store_nick_name' | 'location_keeping_unit'>
    )>, ProductStockPrice: Maybe<Array<Maybe<(
      { __typename?: 'ProductPrices' }
      & Pick<ProductPrices, '_id' | 'discount_amount' | 'percentage_discount' | 'price_without_bundle' | 'default_sell_price' | 'total_cost' | 'ideal_quantity' | 'opening_stock' | 'qty_available' | 'alert_quantity' | 'shelf_qty' | 'order_qty' | 'is_profit_percentage' | 'profit_value' | 'profit_amount' | 'is_sell_tax_percentage' | 'sell_tax_value' | 'sell_tax_amount' | 'sell_price_inc_tax' | 'last_cost' | 'average_cost'>
      & { Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, '_id'>
      )>, income_account: Maybe<(
        { __typename?: 'ChartOfAccount' }
        & Pick<ChartOfAccount, '_id' | 'account_name'>
      )>, expense_account: Maybe<(
        { __typename?: 'ChartOfAccount' }
        & Pick<ChartOfAccount, '_id' | 'account_name'>
      )>, inventory_account: Maybe<(
        { __typename?: 'ChartOfAccount' }
        & Pick<ChartOfAccount, '_id' | 'account_name'>
      )>, SellTax: Maybe<(
        { __typename?: 'Tax' }
        & Pick<Tax, '_id' | 'name' | 'amount' | 'is_percentage' | 'is_tax_group'>
      )> }
    )>>> }
  )>>> }
);

export type GetRmaOrderQueryVariables = {
  transactionId?: Maybe<Scalars['ID']>
};


export type GetRmaOrderQuery = (
  { __typename?: 'Query' }
  & { getRMAOrder: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'transaction_type' | 'transaction_status' | 'order_status' | 'transaction_payment_status' | 'transaction_keeping_unit' | 'ref_no' | 'supplier_order_number' | 'transaction_date' | 'sub_total_amount' | 'total_amount' | 'supplier_rma_number' | 'created_at'>
    & { dynamic_status: Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>, TransactionRMA: Maybe<Array<Maybe<(
      { __typename?: 'TransactionRMA' }
      & Pick<TransactionRma, '_id' | 'skuNo' | 'rma_quantity' | 'approved_quantity' | 'receiving_quantity' | 'productCostPrice' | 'sub_total' | 'total_amount' | 'created_at'>
      & { Supplier: Maybe<(
        { __typename?: 'Supplier' }
        & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'website'>
      )>, Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, '_id' | 'product_name' | 'description'>
        & { ProductStockPrice: Maybe<Array<Maybe<(
          { __typename?: 'ProductPrices' }
          & Pick<ProductPrices, 'qty_available'>
        )>>> }
      )> }
    )>>> }
  )> }
);

export type CreateRmaOrderMutationVariables = {
  transactionId?: Maybe<Scalars['ID']>,
  input?: Maybe<CreateRmaInput>
};


export type CreateRmaOrderMutation = (
  { __typename?: 'Mutation' }
  & { createRMAOrder: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id'>
  )> }
);

export type UpdateRmaStatusMutationVariables = {
  input?: Maybe<TransactionRmaStatusInput>
};


export type UpdateRmaStatusMutation = (
  { __typename?: 'Mutation' }
  & { updateRMAStatus: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id'>
    & { dynamic_status: Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>, dynamic_status_list: Maybe<Array<Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>>> }
  )> }
);

export type CreateReceivingRmaMutationVariables = {
  input?: Maybe<TransactionReceivingRmaInput>
};


export type CreateReceivingRmaMutation = (
  { __typename?: 'Mutation' }
  & { createReceivingRMA: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'transaction_type'>
    & { dynamic_status: Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>, dynamic_status_list: Maybe<Array<Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>>> }
  )> }
);

export type CreatePaymentRefundMutationVariables = {
  input?: Maybe<RefundInput>
};


export type CreatePaymentRefundMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createPaymentRefund'>
);

export type RestoreProductMutationVariables = {
  productIds?: Maybe<Array<Maybe<Scalars['ID']>>>
};


export type RestoreProductMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'restoreProduct'>
);

export type CreateDeviceTagMutationVariables = {
  tag: Scalars['String'],
  tag_version: Scalars['String']
};


export type CreateDeviceTagMutation = (
  { __typename?: 'Mutation' }
  & { createDeviceTag: Maybe<(
    { __typename?: 'DeviceTags' }
    & Pick<DeviceTags, '_id' | 'name'>
  )> }
);

export type CreateSupplierManageCreditMutationVariables = {
  input: SupplierManageStoreCreditInput
};


export type CreateSupplierManageCreditMutation = (
  { __typename?: 'Mutation' }
  & { createSupplierManageCredit: Maybe<(
    { __typename?: 'StoreCredit' }
    & Pick<StoreCredit, 'order_id' | 'transaction_no' | 'date' | 'reason' | 'amount' | 'balance' | 'note' | 'is_increase'>
  )> }
);

export type CreateTransferStoreCreditMutationVariables = {
  input?: Maybe<SupplierTransferStoreCreditInput>
};


export type CreateTransferStoreCreditMutation = (
  { __typename?: 'Mutation' }
  & { createTransferStoreCredit: Maybe<(
    { __typename?: 'StoreCredit' }
    & Pick<StoreCredit, 'date' | 'is_increase' | 'transaction_no' | 'order_id' | 'amount' | 'balance' | 'note' | 'reason'>
  )> }
);

export type GetSupplierTransferCreditlogsQueryVariables = {
  supplierId: Scalars['ID'],
  locationId?: Maybe<Scalars['ID']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type GetSupplierTransferCreditlogsQuery = (
  { __typename?: 'Query' }
  & { getSupplierTransferCreditlogs: Maybe<Array<Maybe<(
    { __typename?: 'StoreCredit' }
    & Pick<StoreCredit, 'order_id' | 'transaction_no' | 'date' | 'reason' | 'amount' | 'balance' | 'note' | 'is_increase'>
  )>>> }
);

export type DeleteLogAndUpdateStockMutationVariables = {
  orderID: Scalars['ID'],
  logID: Scalars['ID'],
  location_id: Scalars['ID']
};


export type DeleteLogAndUpdateStockMutation = (
  { __typename?: 'Mutation' }
  & { deleteLogAndUpdateStock: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'transaction_keeping_unit' | 'transaction_type' | 'received_additional_cost' | 'discount_value' | 'discount_amount' | 'transaction_date' | 'supplier_rma_number' | 'cancel_at' | 'arrival_Date' | 'updated_at' | 'supplier_order_number' | 'tax_amount' | 'tax_value' | 'is_tax_percentage' | 'shipping_company_name' | 'shipping_tracking_no' | 'shipping_estimated_days' | 'total_amount' | 'sub_total_amount' | 'remaining_amount' | 'is_private' | 'additional_notes' | 'received_note' | 'created_at' | 'is_additional_cost' | 'is_extra_items' | 'is_missing_items' | 'order_estimate_amount' | 'refund_amount' | 'shipping_amount'>
    & { cancel_by: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'first_name' | 'last_name'>
    )>, updated_by: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'first_name' | 'last_name'>
    )>, created_by: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first_name' | 'last_name'>
    )>, Tax: Maybe<(
      { __typename?: 'Tax' }
      & Pick<Tax, '_id' | 'name' | 'amount' | 'tax_type' | 'is_percentage'>
    )>, dynamic_status: Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>, ShippingType: Maybe<(
      { __typename?: 'ShippingType' }
      & Pick<ShippingType, '_id' | 'shipment_name' | 'shipment_price' | 'delivery_time_days' | 'threshold' | 'icon'>
    )>, TransactionPayment: Maybe<Array<Maybe<(
      { __typename?: 'TransactionPayment' }
      & Pick<TransactionPayment, '_id' | 'amount' | 'method' | 'paid_on' | 'card_used_no'>
    )>>>, Supplier: Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_keeping_unit' | 'supplier_company' | 'supplier_company_phone'>
      & { payment_settings: Maybe<Array<Maybe<(
        { __typename?: 'SupplierPaymentSetting' }
        & Pick<SupplierPaymentSetting, 'isActive'>
        & { paymentType: Maybe<(
          { __typename?: 'TypePayments' }
          & Pick<TypePayments, '_id' | 'name' | 'icon'>
        )> }
      )>>> }
    )>, TransactionPurchaseLine: Maybe<Array<Maybe<(
      { __typename?: 'TransactionPurchaseLine' }
      & Pick<TransactionPurchaseLine, '_id' | 'stock_sku_number' | 'quantity' | 'receiving_quantity' | 'receive_quantity' | 'product_cost_price' | 'is_extra_item' | 'total_amount'>
      & { Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, '_id' | 'product_name' | 'description' | 'sku'>
      )> }
    )>>>, TransactionBuyBackLine: Maybe<Array<Maybe<(
      { __typename?: 'TransactionBuyBackLine' }
      & Pick<TransactionBuyBackLine, '_id' | 'quantity' | 'device_price' | 'sub_total' | 'total_amount' | 'received_qty' | 'approve_qty'>
      & { System_Device: Maybe<(
        { __typename?: 'SystemDevice' }
        & Pick<SystemDevice, '_id' | 'product_name' | 'product_price'>
        & { product_brand: Maybe<(
          { __typename?: 'SystemBrand' }
          & Pick<SystemBrand, '_id' | 'brand_name'>
        )> }
      )> }
    )>>>, BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, 'address_1'>
    )>, dynamic_status_list: Maybe<Array<Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>>>, ReceivingLogs: Maybe<Array<Maybe<(
      { __typename?: 'TransactionReceivingLog' }
      & Pick<TransactionReceivingLog, '_id' | 'stock_sku_number' | 'receivedDate' | 'quantity' | 'receive_quantity' | 'quantity_returned'>
      & { Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, 'product_name'>
      )> }
    )>>> }
  )> }
);

export type PoTransactionFlowMutationVariables = {
  orderID: Scalars['ID']
};


export type PoTransactionFlowMutation = (
  { __typename?: 'Mutation' }
  & { POTransactionFlow: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'transaction_keeping_unit' | 'transaction_type' | 'received_additional_cost' | 'discount_value' | 'discount_amount' | 'transaction_date' | 'supplier_rma_number' | 'cancel_at' | 'arrival_Date' | 'updated_at' | 'supplier_order_number' | 'tax_amount' | 'tax_value' | 'is_tax_percentage' | 'shipping_company_name' | 'shipping_tracking_no' | 'shipping_estimated_days' | 'total_amount' | 'sub_total_amount' | 'remaining_amount' | 'is_private' | 'additional_notes' | 'received_note' | 'created_at' | 'is_additional_cost' | 'is_extra_items' | 'is_missing_items' | 'order_estimate_amount' | 'refund_amount' | 'shipping_amount'>
    & { cancel_by: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'first_name' | 'last_name'>
    )>, updated_by: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'first_name' | 'last_name'>
    )>, created_by: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'first_name' | 'last_name'>
    )>, Tax: Maybe<(
      { __typename?: 'Tax' }
      & Pick<Tax, '_id' | 'name' | 'amount' | 'tax_type' | 'is_percentage'>
    )>, dynamic_status: Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>, ShippingType: Maybe<(
      { __typename?: 'ShippingType' }
      & Pick<ShippingType, '_id' | 'shipment_name' | 'shipment_price' | 'delivery_time_days' | 'threshold' | 'icon'>
    )>, TransactionPayment: Maybe<Array<Maybe<(
      { __typename?: 'TransactionPayment' }
      & Pick<TransactionPayment, '_id' | 'amount' | 'method' | 'paid_on' | 'card_used_no'>
    )>>>, Supplier: Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_keeping_unit' | 'supplier_company' | 'supplier_company_phone'>
      & { payment_settings: Maybe<Array<Maybe<(
        { __typename?: 'SupplierPaymentSetting' }
        & Pick<SupplierPaymentSetting, 'isActive'>
        & { paymentType: Maybe<(
          { __typename?: 'TypePayments' }
          & Pick<TypePayments, '_id' | 'name' | 'icon'>
        )> }
      )>>> }
    )>, TransactionPurchaseLine: Maybe<Array<Maybe<(
      { __typename?: 'TransactionPurchaseLine' }
      & Pick<TransactionPurchaseLine, '_id' | 'stock_sku_number' | 'quantity' | 'receiving_quantity' | 'receive_quantity' | 'product_cost_price' | 'is_extra_item' | 'total_amount'>
      & { Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, '_id' | 'product_name' | 'description' | 'sku'>
      )> }
    )>>>, TransactionBuyBackLine: Maybe<Array<Maybe<(
      { __typename?: 'TransactionBuyBackLine' }
      & Pick<TransactionBuyBackLine, '_id' | 'quantity' | 'device_price' | 'sub_total' | 'total_amount' | 'received_qty' | 'approve_qty'>
      & { System_Device: Maybe<(
        { __typename?: 'SystemDevice' }
        & Pick<SystemDevice, '_id' | 'product_name' | 'product_price'>
        & { product_brand: Maybe<(
          { __typename?: 'SystemBrand' }
          & Pick<SystemBrand, '_id' | 'brand_name'>
        )> }
      )> }
    )>>>, BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, 'address_1'>
    )>, dynamic_status_list: Maybe<Array<Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>>>, ReceivingLogs: Maybe<Array<Maybe<(
      { __typename?: 'TransactionReceivingLog' }
      & Pick<TransactionReceivingLog, '_id' | 'stock_sku_number' | 'receivedDate' | 'quantity' | 'receive_quantity' | 'quantity_returned'>
      & { Product: Maybe<(
        { __typename?: 'Product' }
        & Pick<Product, 'product_name'>
      )> }
    )>>> }
  )> }
);

export type CreatePoToRmaMutationVariables = {
  transactionId: Scalars['ID']
};


export type CreatePoToRmaMutation = (
  { __typename?: 'Mutation' }
  & { CreatePOToRMA: Maybe<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, '_id' | 'transaction_type' | 'transaction_date' | 'supplier_rma_number'>
    & { dynamic_status: Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )>, Supplier: Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_keeping_unit' | 'supplier_company' | 'supplier_company_phone'>
      & { payment_settings: Maybe<Array<Maybe<(
        { __typename?: 'SupplierPaymentSetting' }
        & Pick<SupplierPaymentSetting, 'isActive'>
        & { paymentType: Maybe<(
          { __typename?: 'TypePayments' }
          & Pick<TypePayments, '_id' | 'name' | 'icon'>
        )> }
      )>>> }
    )> }
  )> }
);

export type SearchSupplierQueryVariables = {
  search: Scalars['String'],
  location_id?: Maybe<Scalars['ID']>,
  active: Scalars['String'],
  is_verify_supplier: Scalars['Boolean'],
  unlink_product: Scalars['Boolean'],
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type SearchSupplierQuery = (
  { __typename?: 'Query' }
  & { searchSupplier: Maybe<Array<Maybe<(
    { __typename?: 'Supplier' }
    & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_keeping_unit' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email' | 'is_verify_supplier' | 'is_buyback' | 'Order'>
    & { supplier_store_credit: Maybe<Array<Maybe<(
      { __typename?: 'supplierStoreCredit' }
      & Pick<SupplierStoreCredit, 'supplier_credit_amount'>
      & { storeLocation: Maybe<(
        { __typename?: 'BusinessLocation' }
        & Pick<BusinessLocation, '_id' | 'store_name'>
      )> }
    )>>>, Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name' | 'short_name' | 'is_active'>
    )>, BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name' | 'store_nick_name' | 'location_keeping_unit'>
    )>, Business: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )>, Product: Maybe<Array<Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, '_id' | 'product_name' | 'description' | 'image' | 'is_bundle_product'>
    )>>>, payment_settings: Maybe<Array<Maybe<(
      { __typename?: 'SupplierPaymentSetting' }
      & Pick<SupplierPaymentSetting, 'isActive'>
      & { paymentType: Maybe<(
        { __typename?: 'TypePayments' }
        & Pick<TypePayments, '_id' | 'name' | 'icon'>
      )> }
    )>>> }
  )>>> }
);

export type SupplierByIdQueryVariables = {
  id: Scalars['ID'],
  location_id?: Maybe<Scalars['ID']>
};


export type SupplierByIdQuery = (
  { __typename?: 'Query' }
  & { supplierById: Maybe<(
    { __typename?: 'Supplier' }
    & Pick<Supplier, '_id' | 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_keeping_unit' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email' | 'is_verify_supplier' | 'is_buyback' | 'Order'>
    & { supplier_store_credit: Maybe<Array<Maybe<(
      { __typename?: 'supplierStoreCredit' }
      & Pick<SupplierStoreCredit, 'supplier_credit_amount'>
      & { storeLocation: Maybe<(
        { __typename?: 'BusinessLocation' }
        & Pick<BusinessLocation, '_id' | 'store_name'>
      )> }
    )>>>, Country: Maybe<(
      { __typename?: 'Country' }
      & Pick<Country, '_id' | 'name' | 'short_name' | 'is_active'>
    )>, BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name' | 'store_nick_name' | 'location_keeping_unit'>
    )>, Business: Maybe<(
      { __typename?: 'Business' }
      & Pick<Business, '_id'>
    )>, Product: Maybe<Array<Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, '_id' | 'product_name' | 'description' | 'image' | 'is_bundle_product'>
    )>>>, payment_settings: Maybe<Array<Maybe<(
      { __typename?: 'SupplierPaymentSetting' }
      & Pick<SupplierPaymentSetting, 'isActive'>
      & { paymentType: Maybe<(
        { __typename?: 'TypePayments' }
        & Pick<TypePayments, '_id' | 'name' | 'icon'>
      )> }
    )>>>, supplier_net_term: Maybe<Array<Maybe<(
      { __typename?: 'supplierNetTerm' }
      & Pick<SupplierNetTerm, 'supplier_pay_term_number' | 'supplier_pay_term_type' | 'supplier_credit_limit' | 'supplier_interest_rate'>
    )>>> }
  )> }
);

export type ArchiveToActiveSupplierMutationVariables = {
  id?: Maybe<Array<Scalars['ID']>>
};


export type ArchiveToActiveSupplierMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'archiveToActiveSupplier'>
);

export type PermanentDeleteSupplierMutationVariables = {
  id?: Maybe<Array<Scalars['ID']>>
};


export type PermanentDeleteSupplierMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'permanentDeleteSupplier'>
);

export type SupplierSummaryQueryVariables = {
  supplier_id: Scalars['ID']
};


export type SupplierSummaryQuery = (
  { __typename?: 'Query' }
  & { supplierSummary: Maybe<(
    { __typename?: 'SupplierSummaryType' }
    & Pick<SupplierSummaryType, 'total_amount_spent' | 'total_number_of_po' | 'average_purchase_per_order' | 'average_items_per_po' | 'total_number_of_rma' | 'total_number_of_buyback' | 'store_credits' | 'net_terms'>
  )> }
);

export type GetSupplierNettermLogsQueryVariables = {
  supplierId: Scalars['ID'],
  locationId?: Maybe<Scalars['ID']>,
  limit?: Maybe<Scalars['Int']>,
  skip?: Maybe<Scalars['Int']>
};


export type GetSupplierNettermLogsQuery = (
  { __typename?: 'Query' }
  & { getSupplierNettermLogs: Maybe<Array<Maybe<(
    { __typename?: 'NetTermLogs' }
    & Pick<NetTermLogs, 'transactionNo' | 'is_increase' | 'pay_term_number' | 'pay_term_type' | 'credit_amount' | 'debit_amount' | 'interest_rate' | 'note' | 'created_at' | 'balance' | 'date' | 'is_overdue'>
    & { User: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'first_name'>
    ), Supplier: Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_company'>
    )>, BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name' | 'store_nick_name'>
    )> }
  )>>> }
);

export type CreateSupplierNettermMutationVariables = {
  input?: Maybe<SupplierNettermInput>
};


export type CreateSupplierNettermMutation = (
  { __typename?: 'Mutation' }
  & { createSupplierNetterm: Maybe<(
    { __typename?: 'NetTermLogs' }
    & Pick<NetTermLogs, 'transactionNo' | 'is_increase' | 'pay_term_number' | 'pay_term_type' | 'credit_amount' | 'debit_amount' | 'interest_rate' | 'note' | 'created_at' | 'balance' | 'date' | 'is_overdue'>
    & { User: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'first_name'>
    ), Supplier: Maybe<(
      { __typename?: 'Supplier' }
      & Pick<Supplier, '_id' | 'supplier_company'>
    )>, BusinessLocation: Maybe<(
      { __typename?: 'BusinessLocation' }
      & Pick<BusinessLocation, '_id' | 'store_name' | 'store_nick_name'>
    )> }
  )> }
);

export type SupplierNetTermQueryVariables = {
  supplier_id: Scalars['ID'],
  location_id: Scalars['ID'],
  limit: Scalars['Int'],
  skip: Scalars['Int']
};


export type SupplierNetTermQuery = (
  { __typename?: 'Query' }
  & { supplierNetTerm: Maybe<(
    { __typename?: 'SupplierNetTermsType' }
    & Pick<SupplierNetTermsType, 'creditLimit' | 'usedCredit' | 'overDue'>
    & { supplierNetTerms: Maybe<Array<Maybe<(
      { __typename?: 'SupplierNetTermLogType' }
      & Pick<SupplierNetTermLogType, 'date' | 'day_left' | 'transaction_detail' | 'debit' | 'credit' | 'ledger_balance'>
    )>>> }
  )> }
);

export type SupplierNetTermRecordQueryVariables = {
  supplier_id: Scalars['ID'],
  location_id: Scalars['ID'],
  limit: Scalars['Int'],
  skip: Scalars['Int']
};


export type SupplierNetTermRecordQuery = (
  { __typename?: 'Query' }
  & { supplierNetTermRecord: Maybe<Array<Maybe<(
    { __typename?: 'SupplierNetTermRecordType' }
    & Pick<SupplierNetTermRecordType, 'transactionID' | 'date' | 'day_left' | 'order_no' | 'total' | 'amount_owed' | 'amount_pay' | 'balance' | 'is_overdue'>
    & { dynamic_status: Maybe<(
      { __typename?: 'TPstatus' }
      & Pick<TPstatus, 'status_name' | 'status_font_color' | 'status_background_color' | 'status_icon'>
    )> }
  )>>> }
);

export type SuppliersVerificationWithSystemQueryVariables = {
  input?: Maybe<Array<Maybe<SystemSupplierInput>>>
};


export type SuppliersVerificationWithSystemQuery = (
  { __typename?: 'Query' }
  & { SuppliersVerificationWithSystem: Maybe<Array<Maybe<(
    { __typename?: 'SupplierPostVerification' }
    & { supplier: Maybe<(
      { __typename?: 'SupplierimportType' }
      & Pick<SupplierimportType, 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'Country' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email'>
    )>, postVerifyData: Maybe<Array<Maybe<(
      { __typename?: 'SystemSupplier' }
      & Pick<SystemSupplier, 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email'>
      & { Country: Maybe<(
        { __typename?: 'Country' }
        & Pick<Country, '_id' | 'name'>
      )> }
    )>>> }
  )>>> }
);

export type SuppliersCheckDuplicationDataQueryVariables = {
  input?: Maybe<Array<Maybe<ImportSupplierInput>>>
};


export type SuppliersCheckDuplicationDataQuery = (
  { __typename?: 'Query' }
  & { suppliersCheckDuplicationData: Maybe<(
    { __typename?: 'TypeSuppliersImport' }
    & { alreadyExistSuppliers: Maybe<Array<Maybe<(
      { __typename?: 'SupplierimportType' }
      & Pick<SupplierimportType, 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'Country' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email'>
    )>>>, suppliersInvalidData: Maybe<Array<Maybe<(
      { __typename?: 'SupplierimportType' }
      & Pick<SupplierimportType, 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'Country' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email'>
    )>>>, newlyAddedSuppliers: Maybe<Array<Maybe<(
      { __typename?: 'SupplierimportType' }
      & Pick<SupplierimportType, 'supplier_company' | 'supplier_company_phone' | 'supplier_company_email' | 'website' | 'address_1' | 'address_2' | 'city' | 'state' | 'zip_code' | 'Country' | 'supplier_first_name' | 'supplier_last_name' | 'supplier_phone' | 'supplier_mobile' | 'supplier_email'>
    )>>> }
  )> }
);

export type CreateSupplierNetTermPaymentMutationVariables = {
  input?: Maybe<InputSupplierNetTermPayment>
};


export type CreateSupplierNetTermPaymentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createSupplierNetTermPayment'>
);

export type ImportProductsDataMutationVariables = {
  input?: Maybe<Array<Maybe<ProductImportInput>>>
};


export type ImportProductsDataMutation = (
  { __typename?: 'Mutation' }
  & { importProductsData: Maybe<(
    { __typename?: 'ImportProductType' }
    & { productsInvalidData: Maybe<Array<Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'product_name' | 'description'>
    )>>>, newlyAddedProducts: Maybe<Array<Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'product_name' | 'description'>
    )>>>, alreadyExistProducts: Maybe<Array<Maybe<(
      { __typename?: 'Product' }
      & Pick<Product, 'product_name' | 'description'>
    )>>> }
  )> }
);

export type GetAllDeviceDiagnoseQueryVariables = {};


export type GetAllDeviceDiagnoseQuery = (
  { __typename?: 'Query' }
  & { getAllDeviceDiagnose: Maybe<Array<Maybe<(
    { __typename?: 'DeviceDiagnose' }
    & Pick<DeviceDiagnose, '_id' | 'deviceID' | 'deviceModel' | 'deviceVersion' | 'deviceImei'>
  )>>> }
);


export const GetCheckOutOrderDocument = gql`
    query getCheckOutOrder($orderID: ID, $businessLocation: ID) {
  getCheckOutOrder(orderID: $orderID, businessLocation: $businessLocation) {
    _id
    transaction_type
    transaction_status
    order_status
    transaction_payment_status
    transaction_keeping_unit
    ref_no
    supplier_order_number
    transaction_date
    transaction_hours
    transaction_minutes
    transaction_am_pm
    sub_total_amount
    is_apply_sale_tax
    Tax {
      _id
      name
      amount
      tax_type
      is_percentage
    }
    tax_amount
    tax_value
    is_tax_percentage
    discount_amount
    discount_value
    is_discount_percentage
    shipping_company_name
    shipping_tracking_no
    shipping_estimated_days
    shipping_amount
    delivery_address
    total_amount
    remaining_amount
    is_private
    additional_notes
    received_note
    receivedBy
    receivedDate
    arrival_Date
    received_additional_cost
    TransactionSellLine {
      is_device
      is_attach_device
      product_type
      sell_line_product_type
      Device {
        _id
        device_keeping_unit
        deviceBrand {
          _id
          brand_name
          description
        }
        deviceModel {
          _id
          name
        }
      }
      Product {
        _id
        product_name
        description
      }
      product_sku
      supplier_sku
      products {
        product_type
        sell_line_product_type
        Product {
          _id
          product_name
          description
        }
        product_sku
        supplier_sku
        quantity
        product_purchase_price
        product_sale_price
        sub_total_amount
        total_amount
        customProduct {
          _id
          name
        }
      }
      GiftCard {
        _id
        card_no
        gift_card_keeping_unit
        name
      }
      customProduct {
        _id
        name
        quantity
        cost_price
        selling_price
        note
        is_taxable
      }
      quantity
      product_purchase_price
      product_sale_price
      tax_amount
      tax_value
      is_tax_percentage
      is_discount_percentage
      discount_amount
      discount_value
      sub_total_amount
      total_amount
      serial_number
    }
    TransactionPayment {
      _id
      amount
      method
      paid_on
      card_used_no
    }
    Customer {
      _id
      email
      first_name
      last_name
      CustomerStoreWiseRecord {
        net_term {
          pay_term_number
          pay_term_type
          credit_limit
          interest_rate
          used_credit
        }
        store_credit {
          credit_amount
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCheckOutOrderGQL extends Apollo.Query<GetCheckOutOrderQuery, GetCheckOutOrderQueryVariables> {
    document = GetCheckOutOrderDocument;
    
  }
export const CreateNetTermOfCustomerDocument = gql`
    mutation createNetTermOfCustomer($customerNetTermInput: customerNetTermInput) {
  createNetTermOfCustomer(input: $customerNetTermInput) {
    User {
      id
      email
      first_name
      last_name
      phone
    }
    created_at
    balance
    is_increase
    pay_term_number
    pay_term_type
    credit_amount
    interest_rate
    note
    transactionNo
    debit_amount
    date
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateNetTermOfCustomerGQL extends Apollo.Mutation<CreateNetTermOfCustomerMutation, CreateNetTermOfCustomerMutationVariables> {
    document = CreateNetTermOfCustomerDocument;
    
  }
export const GetNetTermsLogsDocument = gql`
    query getNetTermsLogs($customerId: ID!, $locationId: ID, $limit: Int, $skip: Int) {
  getNetTermsLogs(customerId: $customerId, locationId: $locationId, limit: $limit, skip: $skip) {
    User {
      id
      email
      first_name
      last_name
      phone
    }
    created_at
    balance
    is_increase
    pay_term_number
    pay_term_type
    credit_amount
    interest_rate
    note
    is_overdue
    transactionNo
    debit_amount
    date
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetNetTermsLogsGQL extends Apollo.Query<GetNetTermsLogsQuery, GetNetTermsLogsQueryVariables> {
    document = GetNetTermsLogsDocument;
    
  }
export const CustomerNetTermDocument = gql`
    query customerNetTerm($customerId: ID!) {
  customerNetTerm(customerId: $customerId) {
    credit_limit
    used_credit
    available_credit
    over_dues
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CustomerNetTermGQL extends Apollo.Query<CustomerNetTermQuery, CustomerNetTermQueryVariables> {
    document = CustomerNetTermDocument;
    
  }
export const GetOrderByCustomerIdDocument = gql`
    query getOrderByCustomerID($customerID: ID!, $limit: Int, $skip: Int) {
  getOrderByCustomerID(customerID: $customerID, limit: $limit, skip: $skip) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetOrderByCustomerIdGQL extends Apollo.Query<GetOrderByCustomerIdQuery, GetOrderByCustomerIdQueryVariables> {
    document = GetOrderByCustomerIdDocument;
    
  }
export const GetNettermOrdersByCustomerIdDocument = gql`
    query getNettermOrdersByCustomerID($customerID: ID!, $limit: Int, $skip: Int, $locationId: ID) {
  getNettermOrdersByCustomerID(customerID: $customerID, limit: $limit, skip: $skip, locationId: $locationId) {
    invoice_no
    transactionId
    total_amount
    owen_amount
    is_over_date
    days
    status
    date
    amountToPay
    remBalance
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetNettermOrdersByCustomerIdGQL extends Apollo.Query<GetNettermOrdersByCustomerIdQuery, GetNettermOrdersByCustomerIdQueryVariables> {
    document = GetNettermOrdersByCustomerIdDocument;
    
  }
export const GetTimeZonesDocument = gql`
    query getTimeZones {
  getTimeZones {
    _id
    title
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTimeZonesGQL extends Apollo.Query<GetTimeZonesQuery, GetTimeZonesQueryVariables> {
    document = GetTimeZonesDocument;
    
  }
export const GetReasonsDocument = gql`
    query getReasons($reason_type: reasonType) {
  getReasons(reason_type: $reason_type) {
    _id
    reason_name
    reason_type
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetReasonsGQL extends Apollo.Query<GetReasonsQuery, GetReasonsQueryVariables> {
    document = GetReasonsDocument;
    
  }
export const GetAllProductsDocument = gql`
    query getAllProducts($locationId: ID!) {
  products(locationId: $locationId) {
    _id
    product_name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllProductsGQL extends Apollo.Query<GetAllProductsQuery, GetAllProductsQueryVariables> {
    document = GetAllProductsDocument;
    
  }
export const VerifyCustomerEmailDocument = gql`
    query verifyCustomerEmail($email: String!) {
  checkCustomerEmail(email: $email)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class VerifyCustomerEmailGQL extends Apollo.Query<VerifyCustomerEmailQuery, VerifyCustomerEmailQueryVariables> {
    document = VerifyCustomerEmailDocument;
    
  }
export const CreateCustomProductDocument = gql`
    mutation createCustomProduct($customProductInput: customProductInput!) {
  createCustomProduct(input: $customProductInput) {
    _id
    name
    quantity
    cost_price
    selling_price
    note
    is_taxable
    location_id {
      _id
      email
      sales_tax
      phone
      zip_code
      city
      state
      address_1
      address_2
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCustomProductGQL extends Apollo.Mutation<CreateCustomProductMutation, CreateCustomProductMutationVariables> {
    document = CreateCustomProductDocument;
    
  }
export const SearchProductDocument = gql`
    query searchProduct($search: String!, $locationId: ID!) {
  searchProduct(search: $search, locationId: $locationId) {
    _id
    product_name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchProductGQL extends Apollo.Query<SearchProductQuery, SearchProductQueryVariables> {
    document = SearchProductDocument;
    
  }
export const GetAllTagsDocument = gql`
    query getAllTags {
  tags {
    _id
    name
    slug
    type
    order_column
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllTagsGQL extends Apollo.Query<GetAllTagsQuery, GetAllTagsQueryVariables> {
    document = GetAllTagsDocument;
    
  }
export const SaveFileDocument = gql`
    mutation saveFile($file: Upload!, $input: fileInput!) {
  saveFile(file: $file, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveFileGQL extends Apollo.Mutation<SaveFileMutation, SaveFileMutationVariables> {
    document = SaveFileDocument;
    
  }
export const GetDirectoryWithFilesDocument = gql`
    query getDirectoryWithFiles($location_id: ID!, $model_type: String!, $model_id: String!) {
  getDirectoryWithFiles(location_id: $location_id, model_id: $model_id, model_type: $model_type) {
    _id
    name
    model_type
    model_id
    SourceFile {
      _id
      name
      path
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetDirectoryWithFilesGQL extends Apollo.Query<GetDirectoryWithFilesQuery, GetDirectoryWithFilesQueryVariables> {
    document = GetDirectoryWithFilesDocument;
    
  }
export const DeleteFileDocument = gql`
    mutation deleteFile($file_id: ID!) {
  deleteFile(file_id: $file_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteFileGQL extends Apollo.Mutation<DeleteFileMutation, DeleteFileMutationVariables> {
    document = DeleteFileDocument;
    
  }
export const SearchProductByTagsDocument = gql`
    query searchProductByTags($search: [ID!], $locationId: ID!) {
  searchProductByTags(search: $search, locationId: $locationId) {
    _id
    product_name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchProductByTagsGQL extends Apollo.Query<SearchProductByTagsQuery, SearchProductByTagsQueryVariables> {
    document = SearchProductByTagsDocument;
    
  }
export const DeviceIssuesDocument = gql`
    query deviceIssues($issueType: DeviceIssuesType!) {
  deviceIssues(issueType: $issueType) {
    _id
    name
    type
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeviceIssuesGQL extends Apollo.Query<DeviceIssuesQuery, DeviceIssuesQueryVariables> {
    document = DeviceIssuesDocument;
    
  }
export const CreateSaleDocument = gql`
    mutation createSale($orderID: ID, $input: createSaleInput) {
  createSale(orderID: $orderID, input: $input) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSaleGQL extends Apollo.Mutation<CreateSaleMutation, CreateSaleMutationVariables> {
    document = CreateSaleDocument;
    
  }
export const TaxsDocument = gql`
    query taxs {
  taxs {
    _id
    name
    amount
    is_tax_group
    is_percentage
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TaxsGQL extends Apollo.Query<TaxsQuery, TaxsQueryVariables> {
    document = TaxsDocument;
    
  }
export const DeviceCheckInbyDeviceIdDocument = gql`
    query DeviceCheckInbyDeviceId($ID: ID!) {
  DeviceCheckInbyDeviceId(deviceID: $ID) {
    carrier
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeviceCheckInbyDeviceIdGQL extends Apollo.Query<DeviceCheckInbyDeviceIdQuery, DeviceCheckInbyDeviceIdQueryVariables> {
    document = DeviceCheckInbyDeviceIdDocument;
    
  }
export const CreateOrderPdfDocument = gql`
    query createOrderPDF($orderID: ID!, $isEmail: Boolean!) {
  createOrderPDF(orderID: $orderID, isEmail: $isEmail) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOrderPdfGQL extends Apollo.Query<CreateOrderPdfQuery, CreateOrderPdfQueryVariables> {
    document = CreateOrderPdfDocument;
    
  }
export const GetCustomerHistoryDocument = gql`
    query getCustomerHistory($customerID: ID!) {
  getCustomerPurchaseHistory(customerID: $customerID) {
    totalAmount
    avgPurchase
    avgItemPerVisit
    totalVisiter
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCustomerHistoryGQL extends Apollo.Query<GetCustomerHistoryQuery, GetCustomerHistoryQueryVariables> {
    document = GetCustomerHistoryDocument;
    
  }
export const SendOrderSummaryBySmsDocument = gql`
    query sendOrderSummaryBySMS($orderID: ID!) {
  sendOrderSummaryBySMS(orderID: $orderID)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SendOrderSummaryBySmsGQL extends Apollo.Query<SendOrderSummaryBySmsQuery, SendOrderSummaryBySmsQueryVariables> {
    document = SendOrderSummaryBySmsDocument;
    
  }
export const GetBrainTreeTokenDocument = gql`
    query getBrainTreeToken {
  getBrainTreeToken {
    token
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetBrainTreeTokenGQL extends Apollo.Query<GetBrainTreeTokenQuery, GetBrainTreeTokenQueryVariables> {
    document = GetBrainTreeTokenDocument;
    
  }
export const ValidateDiscountByCodeDocument = gql`
    query validateDiscountByCode($code: ID!, $customerId: ID) {
  validateDiscountByCode(code: $code, customerId: $customerId) {
    is_eligible
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ValidateDiscountByCodeGQL extends Apollo.Query<ValidateDiscountByCodeQuery, ValidateDiscountByCodeQueryVariables> {
    document = ValidateDiscountByCodeDocument;
    
  }
export const CreateGiftCardDocument = gql`
    mutation createGiftCard($input: giftCardInput) {
  createGiftCard(input: $input) {
    _id
    card_no
    gift_card_keeping_unit
    name
    to
    subject
    send_gift_card
    email
    message
    amount
    is_used
    is_email_send
    is_active
    created_at
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateGiftCardGQL extends Apollo.Mutation<CreateGiftCardMutation, CreateGiftCardMutationVariables> {
    document = CreateGiftCardDocument;
    
  }
export const GetCartDataDocument = gql`
    query getCartData($orderID: ID, $businessLocation: ID) {
  getCartData(orderID: $orderID, businessLocation: $businessLocation) {
    _id
    transaction_type
    transaction_status
    order_status
    transaction_keeping_unit
    transaction_date
    sub_total_amount
    tax_amount
    tax_value
    is_apply_sale_tax
    is_tax_percentage
    discount_amount
    discount_value
    is_discount_percentage
    total_amount
    remaining_amount
    Tax {
      _id
      name
      amount
      tax_type
      is_percentage
      is_tax_group
    }
    is_private
    additional_notes
    TransactionCartLine {
      is_device
      product_type
      sell_line_product_type
      Device {
        _id
        deviceBrand {
          _id
          brand_name
          description
        }
        deviceModel {
          _id
          name
        }
        device_color
        imei_ssn
        Customer {
          _id
          email
          first_name
          last_name
          phone
          address_1
          address_2
          city
          state
          zip_code
          can_email
          is_net_term
          is_store_credit
          is_devices
          can_sms
          deleted_at
          marketing_question
          is_linked
        }
        device_image
        device_keeping_unit
      }
      DeviceCheckIns {
        _id
        client_name
        client_phone_number
        client_device_id
        check_in_date
        carrier
        password
        device_issue
        step_to_reproduce
        cosmetic_condition
        device_canbe_tested
        reason_for_canbe_tested
        device_previously_repaired
        device_type_previous_repair
        place_repair_done
        is_water_damage
        is_warranty
        battery_life
        approved_to_device_restored
        note
        DeviceIssues {
          _id
          name
          type
        }
        DeviceItems {
          _id
          name
          type
        }
        Customer {
          _id
          email
          first_name
          last_name
          phone
          address_1
          address_2
          city
          state
          zip_code
          can_email
          is_net_term
          is_store_credit
          is_devices
          can_sms
          deleted_at
          marketing_question
          tags
          is_over_due
          is_linked
          is_deleted
        }
        SourceFile {
          _id
          name
          path
          model_type
          model_id
        }
        is_pattern
        pattern_code
      }
      serial_number
      products {
        product_type
        sell_line_product_type
        _id
        product_name
        is_bundle_product
        bundle_products {
          total_selling_price
          total_avg_cost
          is_manufactured_qty
          bundleProduct {
            bundleProductID {
              _id
              product_name
              description
              image
              is_bundle_product
              is_product
              is_track_stock
              alert_qty
              ideal_qty
              sell_price
              openingStock
              sell_price_inc_tax
              average_cost
              last_cost
              Brand {
                _id
                brand_name
              }
              DeviceModel {
                _id
                name
              }
              barcode
              sku
              compatilable_devices
              Suppliers {
                supplier_id {
                  _id
                  supplier_company
                  supplier_company_phone
                  supplier_company_email
                  website
                  address_1
                  address_2
                  city
                  state
                  zip_code
                  supplier_keeping_unit
                  supplier_first_name
                  supplier_last_name
                  supplier_phone
                  supplier_mobile
                  supplier_email
                  is_verify_supplier
                  is_buyback
                  Order
                }
                sku_number
                current_stock
                incoming_item
                instock
                ordered_qty
              }
              ProductStockPrice {
                _id
                ideal_quantity
                opening_stock
                qty_available
                alert_quantity
                shelf_qty
                order_qty
                bundle_order_qty
                is_profit_percentage
                profit_value
                profit_amount
                default_sell_price
                is_sell_tax_percentage
                sell_tax_value
                sell_tax_amount
                sell_price_inc_tax
                last_cost
                average_cost
                discount_amount
                price_without_bundle
                percentage_discount
              }
              tags
              is_serial_number
              sale_item
              total_sale
              incoming_item
              max_bundle
              is_completed_product
              is_add_product_with_device
            }
            avg_cost
            quantity
            selling_price
          }
        }
        is_product
        is_track_stock
        alert_qty
        ideal_qty
        sell_price
        sell_price_inc_tax
        average_cost
        last_cost
        Brand {
          _id
          brand_name
          description
        }
        DeviceModel {
          _id
          name
        }
        sku
        compatilable_devices
        Suppliers {
          supplier_id {
            _id
            supplier_company
            supplier_company_phone
            supplier_company_email
            website
            address_1
            address_2
            city
            state
            zip_code
            supplier_keeping_unit
            supplier_first_name
            supplier_last_name
            supplier_phone
            supplier_mobile
            supplier_email
            is_verify_supplier
            is_buyback
            Order
          }
          sku_number
          current_stock
          quantity
          product_sale_price
          is_discount_percentage
          discount_amount
          discount_value
          sub_total_amount
          total_amount
          supplier_sku
        }
        is_serial_number
        total_quantity
        discount_amount
        discount_value
        total_amount
        sell_line_serial_number
        is_discount_percentage
        product_sale_price
        CustomProduct {
          _id
          name
          quantity
          cost_price
          selling_price
          selling_price_include_tax
          note
          is_taxable
        }
        quantity
        serviceProduct {
          serviceProductType
          serviceProductId {
            _id
            product_name
            is_bundle_product
            bundle_products {
              total_selling_price
              total_avg_cost
              is_manufactured_qty
              bundleProduct {
                bundleProductID {
                  _id
                  product_name
                  description
                  image
                  is_bundle_product
                  is_product
                  is_track_stock
                  alert_qty
                  ideal_qty
                  sell_price
                  openingStock
                  sell_price_inc_tax
                  average_cost
                  last_cost
                  Brand {
                    _id
                    brand_name
                  }
                  DeviceModel {
                    _id
                    name
                  }
                  barcode
                  sku
                  compatilable_devices
                  Suppliers {
                    supplier_id {
                      _id
                      supplier_company
                      supplier_company_phone
                      supplier_company_email
                      website
                      address_1
                      address_2
                      city
                      state
                      zip_code
                      supplier_keeping_unit
                      supplier_first_name
                      supplier_last_name
                      supplier_phone
                      supplier_mobile
                      supplier_email
                      is_verify_supplier
                      is_buyback
                      Order
                    }
                    sku_number
                    current_stock
                    incoming_item
                    instock
                    ordered_qty
                  }
                  ProductStockPrice {
                    _id
                    ideal_quantity
                    opening_stock
                    qty_available
                    alert_quantity
                    shelf_qty
                    order_qty
                    bundle_order_qty
                    is_profit_percentage
                    profit_value
                    profit_amount
                    default_sell_price
                    is_sell_tax_percentage
                    sell_tax_value
                    sell_tax_amount
                    sell_price_inc_tax
                    last_cost
                    average_cost
                    discount_amount
                    price_without_bundle
                    percentage_discount
                  }
                  tags
                  is_serial_number
                  sale_item
                  total_sale
                  incoming_item
                  max_bundle
                  is_completed_product
                  is_add_product_with_device
                }
                avg_cost
                quantity
                selling_price
              }
            }
            is_product
            is_track_stock
            alert_qty
            ideal_qty
            sell_price
            sell_price_inc_tax
            average_cost
            last_cost
            Brand {
              _id
              brand_name
              description
            }
            DeviceModel {
              _id
              name
            }
            sku
            compatilable_devices
            Suppliers {
              supplier_id {
                _id
                supplier_company
                supplier_company_phone
                supplier_company_email
                website
                address_1
                address_2
                city
                state
                zip_code
                supplier_keeping_unit
                supplier_first_name
                supplier_last_name
                supplier_phone
                supplier_mobile
                supplier_email
                is_verify_supplier
                is_buyback
                Order
              }
              sku_number
              current_stock
              incoming_item
              instock
              ordered_qty
              price_purchase
            }
            is_serial_number
          }
          serviceProductSKU
          serviceProductSupplier
          serviceProductQuantity
          serviceCustomProductId {
            _id
            name
            quantity
            cost_price
            selling_price
            selling_price_include_tax
            note
            is_taxable
          }
          serviceReason
          serviceSerialNo
        }
      }
      _id
      product_name
      is_bundle_product
      bundle_products {
        total_selling_price
        total_avg_cost
        is_manufactured_qty
        bundleProduct {
          bundleProductID {
            _id
            product_name
            description
            image
            is_bundle_product
            is_product
            is_track_stock
            alert_qty
            ideal_qty
            sell_price
            openingStock
            sell_price_inc_tax
            average_cost
            last_cost
            Brand {
              _id
              brand_name
            }
            DeviceModel {
              _id
              name
            }
            barcode
            sku
            compatilable_devices
            Suppliers {
              supplier_id {
                _id
                supplier_company
                supplier_company_phone
                supplier_company_email
                website
                address_1
                address_2
                city
                state
                zip_code
                supplier_keeping_unit
                supplier_first_name
                supplier_last_name
                supplier_phone
                supplier_mobile
                supplier_email
                is_verify_supplier
                is_buyback
                Order
              }
              sku_number
              current_stock
              incoming_item
              instock
              ordered_qty
            }
            tags
            is_serial_number
            sale_item
            total_sale
            incoming_item
            max_bundle
            is_completed_product
            is_add_product_with_device
            ProductStockPrice {
              _id
              ideal_quantity
              opening_stock
              qty_available
              alert_quantity
              shelf_qty
              order_qty
              bundle_order_qty
              is_profit_percentage
              profit_value
              profit_amount
              default_sell_price
              is_sell_tax_percentage
              sell_tax_value
              sell_tax_amount
              sell_price_inc_tax
              last_cost
              average_cost
              discount_amount
              price_without_bundle
              percentage_discount
            }
          }
          avg_cost
          quantity
          selling_price
        }
      }
      ProductStockPrice {
        qty_available
      }
      is_product
      is_track_stock
      alert_qty
      ideal_qty
      sell_price
      sell_price_inc_tax
      average_cost
      last_cost
      Brand {
        _id
        brand_name
        description
      }
      DeviceModel {
        _id
        name
      }
      sku
      compatilable_devices
      Suppliers {
        supplier_id {
          _id
          supplier_company
          supplier_company_phone
          supplier_company_email
          website
          address_1
          address_2
          city
          state
          zip_code
          supplier_keeping_unit
          supplier_first_name
          supplier_last_name
          supplier_phone
          supplier_mobile
          supplier_email
          is_verify_supplier
          is_buyback
          Order
        }
        sku_number
        current_stock
        quantity
        product_sale_price
        is_discount_percentage
        discount_amount
        discount_value
        sub_total_amount
        total_amount
        supplier_sku
      }
      is_serial_number
      total_quantity
      discount_amount
      discount_value
      total_amount
      sell_line_serial_number
      is_discount_percentage
      product_sale_price
      giftCard {
        _id
        card_no
        gift_card_keeping_unit
        name
        Customer {
          _id
          email
          first_name
          last_name
          phone
          address_1
          address_2
          city
          state
          zip_code
          can_email
          is_net_term
          is_store_credit
          is_devices
          can_sms
          deleted_at
          marketing_question
          tags
          is_over_due
          is_linked
          is_deleted
        }
        to
        subject
        send_gift_card
        email
        message
        amount
        is_used
        is_email_send
        is_active
        created_at
        qr_code
      }
      CustomProduct {
        _id
        name
        quantity
        cost_price
        selling_price
        selling_price_include_tax
        note
        is_taxable
      }
      quantity
    }
    Customer {
      _id
      email
      first_name
      last_name
      phone
      address_1
      address_2
      city
      state
      zip_code
      can_email
      is_net_term
      is_store_credit
      is_devices
      can_sms
      deleted_at
      marketing_question
      tags
      is_over_due
      is_linked
      is_deleted
    }
    is_additional_cost
    is_extra_items
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCartDataGQL extends Apollo.Query<GetCartDataQuery, GetCartDataQueryVariables> {
    document = GetCartDataDocument;
    
  }
export const GetGiftCardBycardNoDocument = gql`
    query GetGiftCardBycardNo($card_no: String!, $BusinessLocation: ID) {
  GetGiftCardBycardNo(card_no: $card_no, BusinessLocation: $BusinessLocation) {
    _id
    amount
    is_used
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetGiftCardBycardNoGQL extends Apollo.Query<GetGiftCardBycardNoQuery, GetGiftCardBycardNoQueryVariables> {
    document = GetGiftCardBycardNoDocument;
    
  }
export const CreatePaymentProcessDocument = gql`
    mutation createPaymentProcess($input: PaymentProcessInput) {
  createPaymentProcess(input: $input) {
    amount
    method
    paid_on
    card_used_no
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePaymentProcessGQL extends Apollo.Mutation<CreatePaymentProcessMutation, CreatePaymentProcessMutationVariables> {
    document = CreatePaymentProcessDocument;
    
  }
export const GetProductsbyDevicewithSearchDocument = gql`
    query getProductsbyDevicewithSearch($input: InputProductsWithDevice) {
  getProductsbyDevicewithSearch(input: $input) {
    _id
    product_name
    incoming_item
    max_bundle
    is_bundle_product
    is_product
    is_track_stock
    is_serial_number
    sell_price_inc_tax
    sku
    alert_qty
    ProductStockPrice {
      _id
      qty_available
      alert_quantity
      shelf_qty
      sell_price_inc_tax
      shelf_qty
      order_qty
    }
    bundle_products {
      total_selling_price
      total_avg_cost
      is_manufactured_qty
      bundleProduct {
        bundleProductID {
          _id
          product_name
          incoming_item
          max_bundle
          is_bundle_product
          is_product
          is_track_stock
          is_serial_number
          ProductStockPrice {
            _id
            qty_available
            alert_quantity
            shelf_qty
            sell_price_inc_tax
            shelf_qty
            order_qty
          }
        }
        avg_cost
        quantity
        selling_price
      }
    }
    Suppliers {
      supplier_id {
        _id
        supplier_company
        supplier_company_phone
        supplier_company_email
      }
      sku_number
      current_stock
      incoming_item
      instock
      ordered_qty
    }
    servicesBrandModel {
      ServiceBrand {
        _id
        brand_name
        description
      }
      ServiceDeviceModel {
        _id
        name
        brand {
          _id
          brand_name
          description
        }
      }
      service_max_price
      service_min_price
      ServiceItem {
        _id
        product_name
        incoming_item
        max_bundle
        is_bundle_product
        is_product
        is_track_stock
        is_serial_number
        sell_price_inc_tax
        sku
        alert_qty
        ProductStockPrice {
          _id
          qty_available
          alert_quantity
          shelf_qty
          sell_price_inc_tax
          shelf_qty
          order_qty
        }
        bundle_products {
          total_selling_price
          total_avg_cost
          is_manufactured_qty
          bundleProduct {
            bundleProductID {
              _id
              product_name
              incoming_item
              max_bundle
              is_bundle_product
              is_product
              is_track_stock
              is_serial_number
              ProductStockPrice {
                _id
                qty_available
                alert_quantity
                shelf_qty
                sell_price_inc_tax
                shelf_qty
                order_qty
              }
            }
            avg_cost
            quantity
            selling_price
          }
        }
        Suppliers {
          supplier_id {
            _id
            supplier_company
            supplier_company_phone
            supplier_company_email
          }
          sku_number
          current_stock
          incoming_item
          instock
          ordered_qty
        }
      }
    }
    Brand {
      _id
      brand_name
      description
    }
    DeviceModel {
      _id
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProductsbyDevicewithSearchGQL extends Apollo.Query<GetProductsbyDevicewithSearchQuery, GetProductsbyDevicewithSearchQueryVariables> {
    document = GetProductsbyDevicewithSearchDocument;
    
  }
export const AddCustomerDocument = gql`
    mutation addCustomer($input: customerInput) {
  createCustomer(input: $input) {
    _id
    email
    first_name
    last_name
    phone
    address_1
    address_2
    city
    state
    zip_code
    can_email
    can_sms
    marketing_question
    location_id {
      _id
      store_name
    }
    is_linked
    linkedStores {
      _id
      store_name
      store_nick_name
      location_keeping_unit
    }
    CustomerStoreWiseRecord {
      net_term {
        pay_term_number
        pay_term_type
        credit_limit
        interest_rate
      }
      store_credit {
        credit_amount
      }
      can_sms
      can_email
      is_active
    }
    tags
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddCustomerGQL extends Apollo.Mutation<AddCustomerMutation, AddCustomerMutationVariables> {
    document = AddCustomerDocument;
    
  }
export const GetCustomersWithSearchDocument = gql`
    query getCustomersWithSearch($input: inputSearchCustomer) {
  getCustomersWithSearch(input: $input) {
    customers {
      _id
      email
      first_name
      last_name
      phone
      address_1
      address_2
      city
      state
      zip_code
      can_email
      can_sms
      marketing_question
      location_id {
        _id
        store_name
      }
      is_linked
      linkedStores {
        _id
        store_name
        store_nick_name
        location_keeping_unit
      }
      CustomerStoreWiseRecord {
        net_term {
          pay_term_number
          pay_term_type
          credit_limit
          interest_rate
        }
        store_credit {
          credit_amount
        }
        can_sms
        can_email
        is_active
      }
      tags
    }
    total_customer
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCustomersWithSearchGQL extends Apollo.Query<GetCustomersWithSearchQuery, GetCustomersWithSearchQueryVariables> {
    document = GetCustomersWithSearchDocument;
    
  }
export const DeleteCustomerDocument = gql`
    mutation deleteCustomer($customer_id: [ID], $username: String!, $password: String!) {
  deleteCustomer(customer_id: $customer_id, username: $username, password: $password)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteCustomerGQL extends Apollo.Mutation<DeleteCustomerMutation, DeleteCustomerMutationVariables> {
    document = DeleteCustomerDocument;
    
  }
export const UpdateCustomerDocument = gql`
    mutation updateCustomer($customer_id: ID!, $input: customerInput) {
  updateCustomer(customer_id: $customer_id, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCustomerGQL extends Apollo.Mutation<UpdateCustomerMutation, UpdateCustomerMutationVariables> {
    document = UpdateCustomerDocument;
    
  }
export const CustomerByLocationIdDocument = gql`
    query customerByLocationID($locationId: ID!) {
  customersByLocationId(locationId: $locationId) {
    _id
    email
    first_name
    last_name
    phone
    address_1
    address_2
    state
    city
    zip_code
    can_sms
    can_email
    marketing_question
    location_id {
      _id
      store_name
    }
    is_linked
    linkedStores {
      _id
      store_name
      store_nick_name
      location_keeping_unit
    }
    CustomerStoreWiseRecord {
      net_term {
        pay_term_number
        pay_term_type
        credit_limit
        interest_rate
      }
      store_credit {
        credit_amount
      }
      can_sms
      can_email
      is_active
    }
    tags
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CustomerByLocationIdGQL extends Apollo.Query<CustomerByLocationIdQuery, CustomerByLocationIdQueryVariables> {
    document = CustomerByLocationIdDocument;
    
  }
export const GetCustomerDetailDocument = gql`
    query getCustomerDetail($customerID: ID!) {
  customerNetTerm(customerId: $customerID) {
    credit_limit
    used_credit
    available_credit
  }
  getAllCustomerDocuments(customer_id: $customerID) {
    _id
    customer_document_name
    document_file_path
    Customer {
      _id
      email
      first_name
      last_name
    }
    is_email
    id_download
    created_at
    document_extension
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCustomerDetailGQL extends Apollo.Query<GetCustomerDetailQuery, GetCustomerDetailQueryVariables> {
    document = GetCustomerDetailDocument;
    
  }
export const GetDevicesByCustomerDocument = gql`
    query getDevicesByCustomer($input: searchDeviceInput) {
  getDevicesByCustomer(input: $input) {
    _id
    deviceBrand {
      _id
      brand_name
      description
      _id
    }
    deviceModel {
      _id
      name
    }
    device_color
    imei_ssn
    Customer {
      _id
      first_name
      last_name
      phone
      address_1
    }
    device_image
    device_keeping_unit
    business_id {
      _id
    }
    location_id {
      _id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetDevicesByCustomerGQL extends Apollo.Query<GetDevicesByCustomerQuery, GetDevicesByCustomerQueryVariables> {
    document = GetDevicesByCustomerDocument;
    
  }
export const GetDeviceByIdDocument = gql`
    query getDeviceById($device_id: ID!) {
  getDeviceById(device_id: $device_id) {
    _id
    deviceBrand {
      _id
      brand_name
      description
    }
    deviceModel {
      _id
      name
    }
    device_color
    imei_ssn
    Customer {
      _id
      first_name
      last_name
      phone
      address_1
    }
    device_image
    device_keeping_unit
    business_id {
      _id
    }
    location_id {
      _id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetDeviceByIdGQL extends Apollo.Query<GetDeviceByIdQuery, GetDeviceByIdQueryVariables> {
    document = GetDeviceByIdDocument;
    
  }
export const CheckImeiSsnNoDocument = gql`
    query checkImeiSsnNo($imei_ssn: String!) {
  checkImeiSsnNo(imei_ssn: $imei_ssn) {
    _id
    deviceBrand {
      _id
      brand_name
      description
    }
    deviceModel {
      _id
      name
    }
    device_color
    imei_ssn
    Customer {
      _id
    }
    device_image
    device_keeping_unit
    business_id {
      _id
    }
    location_id {
      _id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CheckImeiSsnNoGQL extends Apollo.Query<CheckImeiSsnNoQuery, CheckImeiSsnNoQueryVariables> {
    document = CheckImeiSsnNoDocument;
    
  }
export const GetCustomerByIdDocument = gql`
    query getCustomerById($customerID: ID!, $location_id: ID!) {
  getCustomerById(id: $customerID, location_id: $location_id) {
    _id
    email
    first_name
    last_name
    phone
    address_1
    address_2
    city
    state
    zip_code
    can_email
    can_sms
    marketing_question
    location_id {
      _id
      store_name
    }
    is_linked
    linkedStores {
      _id
      store_name
      store_nick_name
      location_keeping_unit
    }
    CustomerStoreWiseRecord {
      net_term {
        pay_term_number
        pay_term_type
        credit_limit
        interest_rate
      }
      store_credit {
        credit_amount
      }
      can_sms
      can_email
      is_active
    }
    tags
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCustomerByIdGQL extends Apollo.Query<GetCustomerByIdQuery, GetCustomerByIdQueryVariables> {
    document = GetCustomerByIdDocument;
    
  }
export const DeleteDeviceDocument = gql`
    mutation deleteDevice($device_id: [ID]) {
  deleteDevice(device_id: $device_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteDeviceGQL extends Apollo.Mutation<DeleteDeviceMutation, DeleteDeviceMutationVariables> {
    document = DeleteDeviceDocument;
    
  }
export const UpdateCustomerPhoneNumberDocument = gql`
    mutation updateCustomerPhoneNumber($customer_id: ID!, $phone: String, $location_id: ID!) {
  updateCustomerPhoneNumber(customer_id: $customer_id, phone: $phone, location_id: $location_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCustomerPhoneNumberGQL extends Apollo.Mutation<UpdateCustomerPhoneNumberMutation, UpdateCustomerPhoneNumberMutationVariables> {
    document = UpdateCustomerPhoneNumberDocument;
    
  }
export const PermanentDeleteDeviceDocument = gql`
    mutation permanentDeleteDevice($device_id: [ID]) {
  permanentDeleteDevice(device_id: $device_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PermanentDeleteDeviceGQL extends Apollo.Mutation<PermanentDeleteDeviceMutation, PermanentDeleteDeviceMutationVariables> {
    document = PermanentDeleteDeviceDocument;
    
  }
export const LinkCustomerToStoreDocument = gql`
    mutation linkCustomerToStore($customerID: ID!, $location_id: ID!) {
  linkCustomerToStore(customerID: $customerID, location_id: $location_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LinkCustomerToStoreGQL extends Apollo.Mutation<LinkCustomerToStoreMutation, LinkCustomerToStoreMutationVariables> {
    document = LinkCustomerToStoreDocument;
    
  }
export const UnLinkCustomerToStoreDocument = gql`
    mutation unLinkCustomerToStore($customerID: ID!, $location_id: ID!) {
  unLinkCustomerToStore(customerID: $customerID, location_id: $location_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UnLinkCustomerToStoreGQL extends Apollo.Mutation<UnLinkCustomerToStoreMutation, UnLinkCustomerToStoreMutationVariables> {
    document = UnLinkCustomerToStoreDocument;
    
  }
export const MergeCustomerDocument = gql`
    mutation MergeCustomer($primaryCustomerID: ID!, $secondaryCustomerID: ID!) {
  MergeCustomer(primaryCustomerID: $primaryCustomerID, secondaryCustomerID: $secondaryCustomerID)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MergeCustomerGQL extends Apollo.Mutation<MergeCustomerMutation, MergeCustomerMutationVariables> {
    document = MergeCustomerDocument;
    
  }
export const RestoreCustomerDocument = gql`
    mutation restoreCustomer($customer_id: [ID]) {
  restoreCustomer(customer_id: $customer_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RestoreCustomerGQL extends Apollo.Mutation<RestoreCustomerMutation, RestoreCustomerMutationVariables> {
    document = RestoreCustomerDocument;
    
  }
export const TransferDeviceDocument = gql`
    mutation TransferDevice($customerID: ID!, $deviceID: ID!) {
  TransferDevice(customerID: $customerID, deviceID: $deviceID)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TransferDeviceGQL extends Apollo.Mutation<TransferDeviceMutation, TransferDeviceMutationVariables> {
    document = TransferDeviceDocument;
    
  }
export const MergeDevicesDocument = gql`
    mutation MergeDevices($primaryDeviceID: ID!, $secondaryDeviceID: ID!) {
  MergeDevices(primaryDeviceID: $primaryDeviceID, secondaryDeviceID: $secondaryDeviceID)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class MergeDevicesGQL extends Apollo.Mutation<MergeDevicesMutation, MergeDevicesMutationVariables> {
    document = MergeDevicesDocument;
    
  }
export const PermanentDeleteCustomerDocument = gql`
    mutation permanentDeleteCustomer($customer_id: [ID!], $location_id: ID!, $username: String!, $password: String!) {
  permanentDeleteCustomer(customer_id: $customer_id, location_id: $location_id, username: $username, password: $password) {
    deletedCustomers {
      _id
      email
      first_name
      last_name
      phone
    }
    notDeletedCustomers {
      _id
      email
      first_name
      last_name
      phone
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PermanentDeleteCustomerGQL extends Apollo.Mutation<PermanentDeleteCustomerMutation, PermanentDeleteCustomerMutationVariables> {
    document = PermanentDeleteCustomerDocument;
    
  }
export const GetDeviceHistoryDocument = gql`
    query getDeviceHistory($device_id: ID!, $location_id: ID) {
  getDeviceHistory(device_id: $device_id, location_id: $location_id) {
    date
    device {
      _id
      deviceBrand {
        _id
        brand_name
        description
      }
      deviceModel {
        _id
        name
      }
      device_color
      imei_ssn
    }
    store_id
    client_id
    invoice_store_name
    inovice_no
    services_detail {
      TransactionService {
        Product {
          _id
          product_name
        }
        serviceProduct {
          _id
          serviceProductType
          serviceProductSKU
          serviceProductQuantity
          serviceProductSupplier
          serviceReason
          serviceSerialNo
          serviceNotes
          service_repair_room_item_type
          serviceProductId {
            _id
            product_name
          }
          serviceCustomProductId {
            _id
            name
          }
        }
      }
      technicionRepair {
        Technicion {
          id
          first_name
          last_name
        }
        log_time
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetDeviceHistoryGQL extends Apollo.Query<GetDeviceHistoryQuery, GetDeviceHistoryQueryVariables> {
    document = GetDeviceHistoryDocument;
    
  }
export const RestoreDeviceDocument = gql`
    mutation restoreDevice($device_id: [ID]) {
  restoreDevice(device_id: $device_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RestoreDeviceGQL extends Apollo.Mutation<RestoreDeviceMutation, RestoreDeviceMutationVariables> {
    document = RestoreDeviceDocument;
    
  }
export const GetStoreCreditLogsDocument = gql`
    query getStoreCreditLogs($customerId: ID!, $locationId: ID, $limit: Int, $skip: Int) {
  getStoreCreditLogs(customerId: $customerId, locationId: $locationId, limit: $limit, skip: $skip) {
    User {
      id
      email
      first_name
      last_name
      phone
    }
    Customer {
      _id
      email
      first_name
      last_name
      phone
    }
    Supplier {
      _id
      supplier_company
      supplier_company_phone
      supplier_company_email
      website
    }
    from_storeId {
      _id
      store_name
      store_nick_name
      location_keeping_unit
    }
    to_storeId {
      _id
      store_name
      store_nick_name
      location_keeping_unit
    }
    date
    is_increase
    transaction_no
    order_id
    store_credit_keeping_unit
    amount
    balance
    note
    reason
    created_at
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStoreCreditLogsGQL extends Apollo.Query<GetStoreCreditLogsQuery, GetStoreCreditLogsQueryVariables> {
    document = GetStoreCreditLogsDocument;
    
  }
export const CreateFolderDocument = gql`
    mutation createFolder($input: folderInput) {
  createFolder(input: $input) {
    _id
    name
    model_type
    model_id: location_id {
      _id
      store_name
    }
    SourceFile {
      _id
      name
      path
      model_type
      model_id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateFolderGQL extends Apollo.Mutation<CreateFolderMutation, CreateFolderMutationVariables> {
    document = CreateFolderDocument;
    
  }
export const FileUploadDocument = gql`
    mutation fileUpload($file: [Upload!], $input: inputTypefile!) {
  fileUpload(file: $file, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class FileUploadGQL extends Apollo.Mutation<FileUploadMutation, FileUploadMutationVariables> {
    document = FileUploadDocument;
    
  }
export const GetfoldersWithFilesDocument = gql`
    query getfoldersWithFiles($location_id: ID!, $model_type: AllowedModel, $model_id: ID!) {
  getfoldersWithFiles(location_id: $location_id, model_type: $model_type, model_id: $model_id) {
    _id
    name
    model_type
    model_id
    SourceFile {
      _id
      name
      path
      model_type
      model_id
      created_by {
        id
        email
        first_name
        last_name
        phone
      }
      created_at
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetfoldersWithFilesGQL extends Apollo.Query<GetfoldersWithFilesQuery, GetfoldersWithFilesQueryVariables> {
    document = GetfoldersWithFilesDocument;
    
  }
export const CreateStoreCreditDocument = gql`
    mutation createStoreCredit($customerStoreCreditInput: customerStoreCreditInput) {
  createStoreCredit(input: $customerStoreCreditInput) {
    User {
      id
      email
      first_name
      last_name
      phone
    }
    Customer {
      _id
      email
      first_name
      last_name
      phone
    }
    is_increase
    amount
    balance
    note
    reason
    created_at
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateStoreCreditGQL extends Apollo.Mutation<CreateStoreCreditMutation, CreateStoreCreditMutationVariables> {
    document = CreateStoreCreditDocument;
    
  }
export const ImportCustomerDocument = gql`
    mutation importCustomer($input: [customerImportInput]) {
  importCustomer(input: $input) {
    alreadyExistCustomers {
      _id
    }
    InvalidDataCustomers {
      _id
    }
    newlyAddedCustomers {
      _id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ImportCustomerGQL extends Apollo.Mutation<ImportCustomerMutation, ImportCustomerMutationVariables> {
    document = ImportCustomerDocument;
    
  }
export const ImportDevicesDocument = gql`
    mutation importDevices($customer_id: ID!, $input: [deviceImportInput!]) {
  importDevices(customer_id: $customer_id, input: $input) {
    customer_id
    alreadyExistDevices {
      _id
    }
    InvalidDataDevices {
      _id
    }
    newlyAddedDevices {
      _id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ImportDevicesGQL extends Apollo.Mutation<ImportDevicesMutation, ImportDevicesMutationVariables> {
    document = ImportDevicesDocument;
    
  }
export const GetCustomerNetDetailDocument = gql`
    query getCustomerNetDetail($customerId: ID!, $locationId: ID) {
  getCustomerNetDetail(customerId: $customerId, locationId: $locationId) {
    credit_limit
    used_credit
    available_credit
    over_dues
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCustomerNetDetailGQL extends Apollo.Query<GetCustomerNetDetailQuery, GetCustomerNetDetailQueryVariables> {
    document = GetCustomerNetDetailDocument;
    
  }
export const CustomerPurchaseHistoryDocument = gql`
    query CustomerPurchaseHistory($customerID: ID!, $location_id: ID!) {
  CustomerPurchaseHistory(customerID: $customerID, location_id: $location_id) {
    total_amount_spend
    total_number_of_visits
    average_purchase_per_visit
    average_number_of_items_per_visit
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CustomerPurchaseHistoryGQL extends Apollo.Query<CustomerPurchaseHistoryQuery, CustomerPurchaseHistoryQueryVariables> {
    document = CustomerPurchaseHistoryDocument;
    
  }
export const CreateTransferCreditDocument = gql`
    mutation createTransferCredit($customerTransferStoreCreditInput: customerTransferStoreCreditInput) {
  createTransferCredit(input: $customerTransferStoreCreditInput) {
    amount
    note
    reason
    store_credit_keeping_unit
    balance
    is_increase
    order_id
    created_at
    User {
      id
      email
      first_name
      last_name
      phone
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTransferCreditGQL extends Apollo.Mutation<CreateTransferCreditMutation, CreateTransferCreditMutationVariables> {
    document = CreateTransferCreditDocument;
    
  }
export const CustomerNetTermRecordDocument = gql`
    query customerNetTermRecord($customer_id: ID!, $location_id: ID!, $limit: Int!, $skip: Int!) {
  customerNetTermRecord(customer_id: $customer_id, location_id: $location_id, limit: $limit, skip: $skip) {
    transactionID
    date
    day_left
    order_no
    total
    amount_owed
    amount_pay
    balance
    is_overdue
    dynamic_status {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CustomerNetTermRecordGQL extends Apollo.Query<CustomerNetTermRecordQuery, CustomerNetTermRecordQueryVariables> {
    document = CustomerNetTermRecordDocument;
    
  }
export const CreateCustomerDocumentDocument = gql`
    mutation createCustomerDocument($input: CustomerDocumentInput, $file: Upload!) {
  createCustomerDocument(input: $input, file: $file) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCustomerDocumentGQL extends Apollo.Mutation<CreateCustomerDocumentMutation, CreateCustomerDocumentMutationVariables> {
    document = CreateCustomerDocumentDocument;
    
  }
export const DeleteCustomerDocumentDocument = gql`
    mutation deleteCustomerDocument($_id: [ID!]) {
  deleteCustomerDocument(_id: $_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteCustomerDocumentGQL extends Apollo.Mutation<DeleteCustomerDocumentMutation, DeleteCustomerDocumentMutationVariables> {
    document = DeleteCustomerDocumentDocument;
    
  }
export const SendCustomerDocumentByEmailDocument = gql`
    query sendCustomerDocumentByEmail($customerId: ID!, $documentURL: String!, $file_name: String!) {
  sendCustomerDocumentByEmail(customerId: $customerId, documentURL: $documentURL, file_name: $file_name)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SendCustomerDocumentByEmailGQL extends Apollo.Query<SendCustomerDocumentByEmailQuery, SendCustomerDocumentByEmailQueryVariables> {
    document = SendCustomerDocumentByEmailDocument;
    
  }
export const CreateNetTermPaymentDocument = gql`
    mutation createNetTermPayment($input: netTermPaymentProcessInput) {
  createNetTermPayment(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateNetTermPaymentGQL extends Apollo.Mutation<CreateNetTermPaymentMutation, CreateNetTermPaymentMutationVariables> {
    document = CreateNetTermPaymentDocument;
    
  }
export const CreateDeviceDocument = gql`
    mutation createDevice($input: deviceInput) {
  createDevice(input: $input) {
    _id
    deviceBrand {
      _id
      brand_name
      description
    }
    deviceModel {
      _id
      name
    }
    device_color
    imei_ssn
    Customer {
      _id
    }
    device_image
    device_keeping_unit
    business_id {
      _id
    }
    location_id {
      _id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateDeviceGQL extends Apollo.Mutation<CreateDeviceMutation, CreateDeviceMutationVariables> {
    document = CreateDeviceDocument;
    
  }
export const UpdateDeviceDocument = gql`
    mutation updateDevice($device_id: ID!, $input: deviceInput) {
  updateDevice(device_id: $device_id, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateDeviceGQL extends Apollo.Mutation<UpdateDeviceMutation, UpdateDeviceMutationVariables> {
    document = UpdateDeviceDocument;
    
  }
export const CreateSystemBrandDocument = gql`
    mutation createSystemBrand($input: systemBrandInput) {
  createSystemBrand(input: $input) {
    _id
    brand_name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSystemBrandGQL extends Apollo.Mutation<CreateSystemBrandMutation, CreateSystemBrandMutationVariables> {
    document = CreateSystemBrandDocument;
    
  }
export const CreateSystemDeviceDocument = gql`
    mutation createSystemDevice($input: systemDeviceInput) {
  createSystemDevice(input: $input) {
    _id
    product_name
    product_price
    quantity
    description
    BusinessLocation {
      _id
    }
    is_system_created
    product_brand {
      _id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSystemDeviceGQL extends Apollo.Mutation<CreateSystemDeviceMutation, CreateSystemDeviceMutationVariables> {
    document = CreateSystemDeviceDocument;
    
  }
export const GetAllBrandWiseModelsDocument = gql`
    query getAllBrandWiseModels($brand_id: ID!) {
  getAllBrandWiseModels(brand_id: $brand_id) {
    _id
    product_name
    product_price
    quantity
    product_brand {
      _id
      brand_name
      description
    }
    description
    is_system_created
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllBrandWiseModelsGQL extends Apollo.Query<GetAllBrandWiseModelsQuery, GetAllBrandWiseModelsQueryVariables> {
    document = GetAllBrandWiseModelsDocument;
    
  }
export const GetAllBrandsDocument = gql`
    query getAllBrands {
  getAllBrands {
    _id
    name
    description
    brand_type
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllBrandsGQL extends Apollo.Query<GetAllBrandsQuery, GetAllBrandsQueryVariables> {
    document = GetAllBrandsDocument;
    
  }
export const UpdateSystemBrandDocument = gql`
    mutation updateSystemBrand($id: ID!, $input: systemBrandInput) {
  updateSystemBrand(id: $id, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateSystemBrandGQL extends Apollo.Mutation<UpdateSystemBrandMutation, UpdateSystemBrandMutationVariables> {
    document = UpdateSystemBrandDocument;
    
  }
export const UpdateSystemDeviceDocument = gql`
    mutation updateSystemDevice($ID: ID!, $input: systemDeviceInput) {
  updateSystemDevice(id: $ID, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateSystemDeviceGQL extends Apollo.Mutation<UpdateSystemDeviceMutation, UpdateSystemDeviceMutationVariables> {
    document = UpdateSystemDeviceDocument;
    
  }
export const GetAllSystemBrandsDocument = gql`
    query getAllSystemBrands {
  getAllSystemBrands {
    _id
    brand_name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllSystemBrandsGQL extends Apollo.Query<GetAllSystemBrandsQuery, GetAllSystemBrandsQueryVariables> {
    document = GetAllSystemBrandsDocument;
    
  }
export const CreateDeviceCheckInsDocument = gql`
    mutation createDeviceCheckIns($device_id: ID, $input: deviceCheckInsInput, $file: [Upload]) {
  createDeviceCheckIns(device_id: $device_id, input: $input, file: $file) {
    _id
    Device {
      _id
      device_keeping_unit
    }
    client_name
    client_phone_number
    client_device_id
    check_in_date
    carrier
    password
    device_issue
    step_to_reproduce
    cosmetic_condition
    device_canbe_tested
    reason_for_canbe_tested
    device_previously_repaired
    device_type_previous_repair
    place_repair_done
    is_water_damage
    is_warranty
    battery_life
    approved_to_device_restored
    note
    is_pattern
    pattern_code
    DeviceIssues {
      _id
      name
      type
    }
    DeviceItems {
      _id
      name
      type
    }
    Customer {
      _id
      email
      first_name
      last_name
      phone
    }
    SourceFile {
      _id
      name
      path
      model_type
      model_id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateDeviceCheckInsGQL extends Apollo.Mutation<CreateDeviceCheckInsMutation, CreateDeviceCheckInsMutationVariables> {
    document = CreateDeviceCheckInsDocument;
    
  }
export const GetPreviousDeviceCheckInDocument = gql`
    query getPreviousDeviceCheckIn($customerID: ID!, $checkINDate: DateTime!) {
  getPreviousDeviceCheckIn(customerID: $customerID, checkINDate: $checkINDate) {
    _id
    Device {
      _id
      device_keeping_unit
    }
    client_name
    client_phone_number
    client_device_id
    check_in_date
    carrier
    password
    device_issue
    step_to_reproduce
    cosmetic_condition
    device_canbe_tested
    reason_for_canbe_tested
    device_previously_repaired
    device_type_previous_repair
    place_repair_done
    is_water_damage
    is_warranty
    battery_life
    approved_to_device_restored
    note
    is_pattern
    pattern_code
    DeviceIssues {
      _id
      name
      type
    }
    DeviceItems {
      _id
      name
      type
    }
    Customer {
      _id
      email
      first_name
      last_name
      phone
    }
    SourceFile {
      _id
      name
      path
      model_type
      model_id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetPreviousDeviceCheckInGQL extends Apollo.Query<GetPreviousDeviceCheckInQuery, GetPreviousDeviceCheckInQueryVariables> {
    document = GetPreviousDeviceCheckInDocument;
    
  }
export const UploadFileWithoutfolderIdDocument = gql`
    mutation uploadFileWithoutfolderID($file: [Upload!], $input: folderInput!) {
  uploadFileWithoutfolderID(file: $file, input: $input) {
    _id
    name
    model_type
    model_id
    SourceFile {
      _id
      name
      path
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UploadFileWithoutfolderIdGQL extends Apollo.Mutation<UploadFileWithoutfolderIdMutation, UploadFileWithoutfolderIdMutationVariables> {
    document = UploadFileWithoutfolderIdDocument;
    
  }
export const GetdeviceCheckInDocument = gql`
    query getdeviceCheckIn($id: ID!) {
  getdeviceCheckIn(id: $id) {
    _id
    Device {
      _id
      device_keeping_unit
    }
    client_name
    client_phone_number
    client_device_id
    check_in_date
    carrier
    password
    device_issue
    step_to_reproduce
    cosmetic_condition
    device_canbe_tested
    reason_for_canbe_tested
    device_previously_repaired
    device_type_previous_repair
    place_repair_done
    is_water_damage
    is_warranty
    battery_life
    approved_to_device_restored
    note
    is_pattern
    pattern_code
    DeviceIssues {
      _id
      name
      type
    }
    DeviceItems {
      _id
      name
      type
    }
    Customer {
      _id
      email
      first_name
      last_name
      phone
    }
    SourceFile {
      _id
      name
      path
      model_type
      model_id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetdeviceCheckInGQL extends Apollo.Query<GetdeviceCheckInQuery, GetdeviceCheckInQueryVariables> {
    document = GetdeviceCheckInDocument;
    
  }
export const CreateDeviceIssuesDocument = gql`
    mutation createDeviceIssues($input: deviceIssuesInput) {
  createDeviceIssues(input: $input) {
    _id
    name
    type
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateDeviceIssuesGQL extends Apollo.Mutation<CreateDeviceIssuesMutation, CreateDeviceIssuesMutationVariables> {
    document = CreateDeviceIssuesDocument;
    
  }
export const CreateDiscountDocument = gql`
    mutation createDiscount($input: DiscountInput) {
  createDiscount(input: $input) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateDiscountGQL extends Apollo.Mutation<CreateDiscountMutation, CreateDiscountMutationVariables> {
    document = CreateDiscountDocument;
    
  }
export const GetDiscountsAndSearchDocument = gql`
    query getDiscountsAndSearch($input: searchDiscountInput) {
  getDiscountsAndSearch(input: $input) {
    _id
    name
    start_date
    end_date
    is_active
    updated_at
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetDiscountsAndSearchGQL extends Apollo.Query<GetDiscountsAndSearchQuery, GetDiscountsAndSearchQueryVariables> {
    document = GetDiscountsAndSearchDocument;
    
  }
export const UpdateDiscountDocument = gql`
    mutation updateDiscount($id: ID!, $input: DiscountInput) {
  updateDiscount(id: $id, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateDiscountGQL extends Apollo.Mutation<UpdateDiscountMutation, UpdateDiscountMutationVariables> {
    document = UpdateDiscountDocument;
    
  }
export const DeleteDiscountDocument = gql`
    mutation deleteDiscount($id: ID!) {
  deleteDiscount(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteDiscountGQL extends Apollo.Mutation<DeleteDiscountMutation, DeleteDiscountMutationVariables> {
    document = DeleteDiscountDocument;
    
  }
export const SearchInDiscountsDocument = gql`
    query searchInDiscounts($limit: Int!, $skip: Int!, $status: Status, $search: String) {
  searchInDiscounts(limit: $limit, skip: $skip, status: $status, search: $search) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchInDiscountsGQL extends Apollo.Query<SearchInDiscountsQuery, SearchInDiscountsQueryVariables> {
    document = SearchInDiscountsDocument;
    
  }
export const GetAllCampaignsDocument = gql`
    query getAllCampaigns {
  getCampaigns {
    _id
    name
    start_date
    end_date
    is_active
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllCampaignsGQL extends Apollo.Query<GetAllCampaignsQuery, GetAllCampaignsQueryVariables> {
    document = GetAllCampaignsDocument;
    
  }
export const CreateCampaignDocument = gql`
    mutation createCampaign($input: campaignInput) {
  createCampaign(input: $input) {
    _id
    name
    start_date
    end_date
    is_active
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCampaignGQL extends Apollo.Mutation<CreateCampaignMutation, CreateCampaignMutationVariables> {
    document = CreateCampaignDocument;
    
  }
export const SearchCampaignsDocument = gql`
    query searchCampaigns($search: String) {
  searchCampaigns(search: $search) {
    _id
    name
    start_date
    end_date
    is_active
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchCampaignsGQL extends Apollo.Query<SearchCampaignsQuery, SearchCampaignsQueryVariables> {
    document = SearchCampaignsDocument;
    
  }
export const GetAllTagsOfDiscountDocument = gql`
    query getAllTagsOfDiscount($type: String!) {
  tagsByType(type: $type) {
    _id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllTagsOfDiscountGQL extends Apollo.Query<GetAllTagsOfDiscountQuery, GetAllTagsOfDiscountQueryVariables> {
    document = GetAllTagsOfDiscountDocument;
    
  }
export const CreateTagDocument = gql`
    mutation createTag($input: tagInput) {
  createTag(input: $input) {
    _id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTagGQL extends Apollo.Mutation<CreateTagMutation, CreateTagMutationVariables> {
    document = CreateTagDocument;
    
  }
export const CreateCouponCodeDocument = gql`
    query createCouponCode {
  createCouponCode {
    code
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCouponCodeGQL extends Apollo.Query<CreateCouponCodeQuery, CreateCouponCodeQueryVariables> {
    document = CreateCouponCodeDocument;
    
  }
export const SearchTagsByTypeDocument = gql`
    query searchTagsByType($type: String!, $search: String) {
  searchTagsByType(type: $type, search: $search) {
    _id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchTagsByTypeGQL extends Apollo.Query<SearchTagsByTypeQuery, SearchTagsByTypeQueryVariables> {
    document = SearchTagsByTypeDocument;
    
  }
export const GetCampaignswithDiscountsDocument = gql`
    query getCampaignswithDiscounts($limit: Int, $skip: Int, $search: String) {
  getCampaignswithDiscounts(limit: $limit, skip: $skip, search: $search) {
    _id
    name
    start_date
    end_date
    is_active
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCampaignswithDiscountsGQL extends Apollo.Query<GetCampaignswithDiscountsQuery, GetCampaignswithDiscountsQueryVariables> {
    document = GetCampaignswithDiscountsDocument;
    
  }
export const SendEmailGiftCardDocument = gql`
    query sendEmailGiftCard($id: ID!) {
  sendEmailGiftCard(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SendEmailGiftCardGQL extends Apollo.Query<SendEmailGiftCardQuery, SendEmailGiftCardQueryVariables> {
    document = SendEmailGiftCardDocument;
    
  }
export const SearchDiscountTagsDocument = gql`
    query searchDiscountTags($search: String) {
  searchDiscountTags(search: $search) {
    _id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchDiscountTagsGQL extends Apollo.Query<SearchDiscountTagsQuery, SearchDiscountTagsQueryVariables> {
    document = SearchDiscountTagsDocument;
    
  }
export const SearchCustomerTagsDocument = gql`
    query searchCustomerTags($search: String) {
  searchCustomerTags(search: $search) {
    _id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchCustomerTagsGQL extends Apollo.Query<SearchCustomerTagsQuery, SearchCustomerTagsQueryVariables> {
    document = SearchCustomerTagsDocument;
    
  }
export const EffectDiscountToCustomerDocument = gql`
    query effectDiscountToCustomer($input: progressBarInput) {
  effectDiscountToCustomer(input: $input) {
    Total_customer
    effect_customer
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EffectDiscountToCustomerGQL extends Apollo.Query<EffectDiscountToCustomerQuery, EffectDiscountToCustomerQueryVariables> {
    document = EffectDiscountToCustomerDocument;
    
  }
export const UserPinCodeVerifyDocument = gql`
    mutation userPinCodeVerify($pincode: String!) {
  userPinCodeVerify(pincode: $pincode) {
    oldClockHistoryId
    clocked_in_time
    status
    UserClockInPin
    User {
      id
      first_name
      last_name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserPinCodeVerifyGQL extends Apollo.Mutation<UserPinCodeVerifyMutation, UserPinCodeVerifyMutationVariables> {
    document = UserPinCodeVerifyDocument;
    
  }
export const UserClockedInDocument = gql`
    mutation userClockedIn($userId: ID!, $userClockInPin: ID!, $oldClockHistoryId: ID, $businessLocation: ID!) {
  userClockedIn(userId: $userId, userClockInPin: $userClockInPin, oldClockHistoryId: $oldClockHistoryId, businessLocation: $businessLocation) {
    _id
    clock_in_time
    clock_out_time
    status
    BusinessLocation
    User {
      id
      first_name
      last_name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserClockedInGQL extends Apollo.Mutation<UserClockedInMutation, UserClockedInMutationVariables> {
    document = UserClockedInDocument;
    
  }
export const CreateClientDocument = gql`
    mutation createClient($input: clientInput) {
  createClient(input: $input) {
    _id
    first_name
    last_name
    email
    address_1
    address_2
    city
    state
    zip_code
    phone
    can_email
    can_sms
    status
    classification
    is_check
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateClientGQL extends Apollo.Mutation<CreateClientMutation, CreateClientMutationVariables> {
    document = CreateClientDocument;
    
  }
export const UpdateClientDocument = gql`
    mutation updateClient($_id: ID!, $input: clientInput) {
  updateClient(_id: $_id, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateClientGQL extends Apollo.Mutation<UpdateClientMutation, UpdateClientMutationVariables> {
    document = UpdateClientDocument;
    
  }
export const GetClientDocument = gql`
    query getClient($_id: ID!) {
  getClient(_id: $_id) {
    _id
    first_name
    last_name
    email
    address_1
    address_2
    city
    state
    zip_code
    phone
    can_email
    can_sms
    status
    classification
    is_check
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetClientGQL extends Apollo.Query<GetClientQuery, GetClientQueryVariables> {
    document = GetClientDocument;
    
  }
export const GetAllClientsDocument = gql`
    query getAllClients($input: clientSearchInput) {
  getAllClients(input: $input) {
    _id
    first_name
    last_name
    email
    address_1
    address_2
    city
    state
    zip_code
    phone
    can_email
    can_sms
    status
    classification
    is_check
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllClientsGQL extends Apollo.Query<GetAllClientsQuery, GetAllClientsQueryVariables> {
    document = GetAllClientsDocument;
    
  }
export const BulkDeleteClientDocument = gql`
    mutation bulkDeleteClient($_id: [ID!]) {
  bulkDeleteClient(_id: $_id) {
    _id
    first_name
    last_name
    email
    address_1
    address_2
    city
    state
    zip_code
    phone
    can_email
    can_sms
    status
    classification
    is_check
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class BulkDeleteClientGQL extends Apollo.Mutation<BulkDeleteClientMutation, BulkDeleteClientMutationVariables> {
    document = BulkDeleteClientDocument;
    
  }
export const DeleteClientDocument = gql`
    mutation deleteClient($_id: ID!) {
  deleteClient(_id: $_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteClientGQL extends Apollo.Mutation<DeleteClientMutation, DeleteClientMutationVariables> {
    document = DeleteClientDocument;
    
  }
export const CreateDocumentDocument = gql`
    mutation createDocument($input: documentInput, $file: Upload) {
  createDocument(input: $input, file: $file) {
    _id
    document_name
    file_path
    addressed_to
    status
    updated_at
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateDocumentGQL extends Apollo.Mutation<CreateDocumentMutation, CreateDocumentMutationVariables> {
    document = CreateDocumentDocument;
    
  }
export const UpdateDocumentDocument = gql`
    mutation updateDocument($_id: ID!, $input: documentInput, $file: Upload) {
  updateDocument(_id: $_id, input: $input, file: $file)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateDocumentGQL extends Apollo.Mutation<UpdateDocumentMutation, UpdateDocumentMutationVariables> {
    document = UpdateDocumentDocument;
    
  }
export const GetAllDocumentsDocument = gql`
    query getAllDocuments($input: documentSearchInput) {
  getAllDocuments(input: $input) {
    _id
    document_name
    file_path
    addressed_to
    status
    updated_at
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllDocumentsGQL extends Apollo.Query<GetAllDocumentsQuery, GetAllDocumentsQueryVariables> {
    document = GetAllDocumentsDocument;
    
  }
export const DeleteDocumentDocument = gql`
    mutation deleteDocument($_id: ID!) {
  deleteDocument(_id: $_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteDocumentGQL extends Apollo.Mutation<DeleteDocumentMutation, DeleteDocumentMutationVariables> {
    document = DeleteDocumentDocument;
    
  }
export const ClientDocumentFileUploadDocument = gql`
    mutation clientDocumentFileUpload($client_id: ID!, $document_id: ID!, $file: Upload) {
  clientDocumentFileUpload(client_id: $client_id, document_id: $document_id, file: $file)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ClientDocumentFileUploadGQL extends Apollo.Mutation<ClientDocumentFileUploadMutation, ClientDocumentFileUploadMutationVariables> {
    document = ClientDocumentFileUploadDocument;
    
  }
export const ClientDocumentStatusDocument = gql`
    mutation clientDocumentStatus($client_id: ID!, $document_id: ID!, $input: statusInput) {
  clientDocumentStatus(client_id: $client_id, document_id: $document_id, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ClientDocumentStatusGQL extends Apollo.Mutation<ClientDocumentStatusMutation, ClientDocumentStatusMutationVariables> {
    document = ClientDocumentStatusDocument;
    
  }
export const GetDocumentsByClassificationDocument = gql`
    query getDocumentsByClassification($client_id: ID!, $classification: classificationType!) {
  getDocumentsByClassification(client_id: $client_id, classification: $classification) {
    document_id
    document_name
    file_path
    document_status {
      status_name
      status_background_color
      status_font_color
      status_icon
      status_type
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetDocumentsByClassificationGQL extends Apollo.Query<GetDocumentsByClassificationQuery, GetDocumentsByClassificationQueryVariables> {
    document = GetDocumentsByClassificationDocument;
    
  }
export const ShareDocumentsDocument = gql`
    query shareDocuments($input: shareDocumentInput) {
  shareDocuments(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ShareDocumentsGQL extends Apollo.Query<ShareDocumentsQuery, ShareDocumentsQueryVariables> {
    document = ShareDocumentsDocument;
    
  }
export const CreateStatusDocument = gql`
    mutation createStatus($input: statusInput) {
  createStatus(input: $input) {
    _id
    status_name
    status_background_color
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateStatusGQL extends Apollo.Mutation<CreateStatusMutation, CreateStatusMutationVariables> {
    document = CreateStatusDocument;
    
  }
export const GetStatusDocument = gql`
    query getStatus($businessLocation: ID, $status_type: AllowedType!) {
  getStatus(businessLocation: $businessLocation, status_type: $status_type) {
    _id
    status_name
    status_background_color
    status_font_color
    status_icon
    status_type
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStatusGQL extends Apollo.Query<GetStatusQuery, GetStatusQueryVariables> {
    document = GetStatusDocument;
    
  }
export const GetStatusByIdDocument = gql`
    query getStatusById($statusId: ID!) {
  getStatusById(statusId: $statusId) {
    _id
    status_name
    status_background_color
    status_font_color
    status_icon
    status_type
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetStatusByIdGQL extends Apollo.Query<GetStatusByIdQuery, GetStatusByIdQueryVariables> {
    document = GetStatusByIdDocument;
    
  }
export const OpenAndCloseCashRegisterDocument = gql`
    mutation openAndCloseCashRegister($openCashRegisterId: ID, $locationId: ID, $closeCashRegister: ID) {
  openAndCloseCashRegister(openCashRegisterId: $openCashRegisterId, locationId: $locationId, closeCashRegister: $closeCashRegister)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class OpenAndCloseCashRegisterGQL extends Apollo.Mutation<OpenAndCloseCashRegisterMutation, OpenAndCloseCashRegisterMutationVariables> {
    document = OpenAndCloseCashRegisterDocument;
    
  }
export const GetCurrencyWithUnitDocument = gql`
    query getCurrencyWithUnit($location_id: ID, $cashRegisterId: ID) {
  getCurrencyWithUnit(location_id: $location_id, cashRegisterId: $cashRegisterId) {
    currency {
      unit
    }
    currency_code
    expected_amount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCurrencyWithUnitGQL extends Apollo.Query<GetCurrencyWithUnitQuery, GetCurrencyWithUnitQueryVariables> {
    document = GetCurrencyWithUnitDocument;
    
  }
export const SaveOpenCashDrawerLogDocument = gql`
    mutation saveOpenCashDrawerLog($input: openCashDrawerInput) {
  saveOpenCashDrawerLog(input: $input) {
    CashRegisters {
      _id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveOpenCashDrawerLogGQL extends Apollo.Mutation<SaveOpenCashDrawerLogMutation, SaveOpenCashDrawerLogMutationVariables> {
    document = SaveOpenCashDrawerLogDocument;
    
  }
export const SaveTillCountDocument = gql`
    mutation saveTillCount($input: TillCountInput) {
  saveTillCount(input: $input) {
    CashRegisters {
      _id
    }
    expected_amount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveTillCountGQL extends Apollo.Mutation<SaveTillCountMutation, SaveTillCountMutationVariables> {
    document = SaveTillCountDocument;
    
  }
export const GetAllAlertsDocument = gql`
    query getAllAlerts($location_id: ID!, $alert_type: AlertTypeEnum) {
  getAllAlerts(location_id: $location_id, alert_type: $alert_type) {
    _id
    alert_title
    alert_message
    alert_type
    alert_timer
    created_at
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllAlertsGQL extends Apollo.Query<GetAllAlertsQuery, GetAllAlertsQueryVariables> {
    document = GetAllAlertsDocument;
    
  }
export const CheckBusinessDocument = gql`
    query checkBusiness($business: String!) {
  checkBusiness(business_system_name: $business) {
    business_system_name
    _id
    date_format
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CheckBusinessGQL extends Apollo.Query<CheckBusinessQuery, CheckBusinessQueryVariables> {
    document = CheckBusinessDocument;
    
  }
export const UserBusinessLocationsDocument = gql`
    query userBusinessLocations {
  userBusinessLocations {
    address_1
    _id
    state
    phone
    city
    email
    store_name
    store_legal_name
    logo
    location_keeping_unit
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserBusinessLocationsGQL extends Apollo.Query<UserBusinessLocationsQuery, UserBusinessLocationsQueryVariables> {
    document = UserBusinessLocationsDocument;
    
  }
export const UsersWithRespectToBusinessesDocument = gql`
    query usersWithRespectToBusinesses($ID: ID!) {
  usersWithRespectToBusinesses(businessId: $ID) {
    first_name
    last_name
    email
    id
    avatar_location
    status
    user_keeping_unit
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UsersWithRespectToBusinessesGQL extends Apollo.Query<UsersWithRespectToBusinessesQuery, UsersWithRespectToBusinessesQueryVariables> {
    document = UsersWithRespectToBusinessesDocument;
    
  }
export const LoginDocument = gql`
    mutation login($Id: ID!, $pass: String!) {
  login(id: $Id, password: $pass) {
    token
    user {
      email
      first_name
      last_name
      id
      avatar_location
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
  }
export const CashRegistersOfLocationDocument = gql`
    query cashRegistersOfLocation($ID: ID!) {
  cashRegistersOfLocation(locationId: $ID) {
    name
    _id
    cash_register_keeping_unit
    opening_amount
    closing_amount
    closed_at
    status
    location_id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CashRegistersOfLocationGQL extends Apollo.Query<CashRegistersOfLocationQuery, CashRegistersOfLocationQueryVariables> {
    document = CashRegistersOfLocationDocument;
    
  }
export const UserClockOutBeforeLogOutDocument = gql`
    mutation userClockOutBeforeLogOut($is_check_clockIn: Boolean!) {
  userClockOutBeforeLogOut(is_check_clockIn: $is_check_clockIn)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserClockOutBeforeLogOutGQL extends Apollo.Mutation<UserClockOutBeforeLogOutMutation, UserClockOutBeforeLogOutMutationVariables> {
    document = UserClockOutBeforeLogOutDocument;
    
  }
export const ForgetBusinessUrlDocument = gql`
    query forgetBusinessUrl($input: forgetBusinessInput) {
  forgetBusinessUrl(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ForgetBusinessUrlGQL extends Apollo.Query<ForgetBusinessUrlQuery, ForgetBusinessUrlQueryVariables> {
    document = ForgetBusinessUrlDocument;
    
  }
export const VerifyforgetBusinessUrlDocument = gql`
    mutation verifyforgetBusinessUrl($input: verifyforgetBusinessUrlInput) {
  verifyforgetBusinessUrl(input: $input) {
    _id
    business_system_name
    logo
    date_format
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class VerifyforgetBusinessUrlGQL extends Apollo.Mutation<VerifyforgetBusinessUrlMutation, VerifyforgetBusinessUrlMutationVariables> {
    document = VerifyforgetBusinessUrlDocument;
    
  }
export const UserForgetPasswordDocument = gql`
    mutation userForgetPassword($email: String!, $method: AllowMethodPhoneVerify) {
  userForgetPassword(email: $email, method: $method)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserForgetPasswordGQL extends Apollo.Mutation<UserForgetPasswordMutation, UserForgetPasswordMutationVariables> {
    document = UserForgetPasswordDocument;
    
  }
export const UserPasswordResetDocument = gql`
    mutation userPasswordReset($input: PasswordResetInput) {
  userPasswordReset(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserPasswordResetGQL extends Apollo.Mutation<UserPasswordResetMutation, UserPasswordResetMutationVariables> {
    document = UserPasswordResetDocument;
    
  }
export const GetUserByEmailDocument = gql`
    query getUserByEmail($email: String!, $businessId: ID!) {
  getUserByEmail(email: $email, businessId: $businessId) {
    id
    email
    first_name
    last_name
    phone
    avatar_location
    status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserByEmailGQL extends Apollo.Query<GetUserByEmailQuery, GetUserByEmailQueryVariables> {
    document = GetUserByEmailDocument;
    
  }
export const LoginWithEmailDocument = gql`
    mutation loginWithEmail($email: String!, $password: String!, $businessId: ID!) {
  loginWithEmail(email: $email, password: $password, businessId: $businessId) {
    token
    user {
      email
      first_name
      last_name
      avatar_location
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginWithEmailGQL extends Apollo.Mutation<LoginWithEmailMutation, LoginWithEmailMutationVariables> {
    document = LoginWithEmailDocument;
    
  }
export const ForgetEmailWithPhoneDocument = gql`
    query forgetEmailWithPhone($businessName: String!, $phoneNumber: String!) {
  forgetEmailWithPhone(businessName: $businessName, phoneNumber: $phoneNumber)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ForgetEmailWithPhoneGQL extends Apollo.Query<ForgetEmailWithPhoneQuery, ForgetEmailWithPhoneQueryVariables> {
    document = ForgetEmailWithPhoneDocument;
    
  }
export const VerifyforgetEmailWithPhoneDocument = gql`
    mutation VerifyforgetEmailWithPhone($businessName: String!, $phoneNumber: String!, $code: String!) {
  VerifyforgetEmailWithPhone(businessName: $businessName, phoneNumber: $phoneNumber, code: $code) {
    email
    first_name
    last_name
    phone
    avatar_location
    status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class VerifyforgetEmailWithPhoneGQL extends Apollo.Mutation<VerifyforgetEmailWithPhoneMutation, VerifyforgetEmailWithPhoneMutationVariables> {
    document = VerifyforgetEmailWithPhoneDocument;
    
  }
export const VerifyuserForgetPasswordDocument = gql`
    mutation VerifyuserForgetPassword($code: String!, $email: String!, $method: AllowMethodPhoneVerify) {
  VerifyuserForgetPassword(code: $code, email: $email, method: $method)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class VerifyuserForgetPasswordGQL extends Apollo.Mutation<VerifyuserForgetPasswordMutation, VerifyuserForgetPasswordMutationVariables> {
    document = VerifyuserForgetPasswordDocument;
    
  }
export const UserLoginByVerificationDocument = gql`
    mutation userLoginByVerification($email: String!, $code: String!, $method: AllowMethodPhoneVerify, $businessId: ID!) {
  userLoginByVerification(email: $email, code: $code, method: $method, businessId: $businessId) {
    token
    user {
      email
      first_name
      last_name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserLoginByVerificationGQL extends Apollo.Mutation<UserLoginByVerificationMutation, UserLoginByVerificationMutationVariables> {
    document = UserLoginByVerificationDocument;
    
  }
export const SearchOrderByDifferentTypesDocument = gql`
    query searchOrderByDifferentTypes($type: String!, $search: String!, $locationId: ID) {
  searchOrderByDifferentTypes(type: $type, search: $search, locationId: $locationId) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchOrderByDifferentTypesGQL extends Apollo.Query<SearchOrderByDifferentTypesQuery, SearchOrderByDifferentTypesQueryVariables> {
    document = SearchOrderByDifferentTypesDocument;
    
  }
export const OrdersWithPaginationDocument = gql`
    query ordersWithPagination($limit: Int, $skip: Int, $locationId: ID) {
  orders(limit: $limit, skip: $skip, locationId: $locationId) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class OrdersWithPaginationGQL extends Apollo.Query<OrdersWithPaginationQuery, OrdersWithPaginationQueryVariables> {
    document = OrdersWithPaginationDocument;
    
  }
export const GetOrdersAndSearchDocument = gql`
    query getOrdersAndSearch($input: searchOrderInput) {
  getOrdersAndSearch(input: $input) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetOrdersAndSearchGQL extends Apollo.Query<GetOrdersAndSearchQuery, GetOrdersAndSearchQueryVariables> {
    document = GetOrdersAndSearchDocument;
    
  }
export const GetTicketswithfilterDocument = gql`
    query getTicketswithfilter($input: inputTicketsFilter) {
  getTicketswithfilter(input: $input) {
    transaction {
      _id
      transaction_date
      is_repair_done
      is_checkout
      invoice_for_repair_room
      Customer {
        first_name
        last_name
        phone
      }
      transaction_type
      transaction_status
      total_amount
      remaining_amount
      transaction_keeping_unit
      repire_room_status {
        status_name
        status_font_color
        status_background_color
        status_icon
      }
      repair_room_color_pallet
    }
    count
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTicketswithfilterGQL extends Apollo.Query<GetTicketswithfilterQuery, GetTicketswithfilterQueryVariables> {
    document = GetTicketswithfilterDocument;
    
  }
export const GetTicketDetailByIdDocument = gql`
    query getTicketDetailById($orderID: ID, $businessLocation: ID) {
  getTicketDetailById(orderID: $orderID, businessLocation: $businessLocation) {
    _id
    transaction_type
    transaction_status
    order_status
    transaction_payment_status
    transaction_keeping_unit
    ref_no
    supplier_order_number
    transaction_date
    transaction_hours
    transaction_minutes
    transaction_am_pm
    sub_total_amount
    is_apply_sale_tax
    Tax {
      _id
      name
      amount
      tax_type
      is_percentage
    }
    tax_amount
    tax_value
    is_tax_percentage
    discount_amount
    discount_value
    is_discount_percentage
    shipping_company_name
    shipping_tracking_no
    shipping_estimated_days
    shipping_amount
    delivery_address
    total_amount
    remaining_amount
    is_private
    additional_notes
    received_note
    receivedBy
    receivedDate
    arrival_Date
    received_additional_cost
    TransactionSellLine {
      _id
      is_device
      is_attach_device
      product_type
      sell_line_product_type
      Device {
        _id
        device_keeping_unit
        deviceBrand {
          _id
          brand_name
          description
        }
        deviceModel {
          _id
          name
        }
      }
      Product {
        _id
        product_name
        is_bundle_product
        is_product
        description
        bundle_products {
          total_selling_price
          total_avg_cost
          is_manufactured_qty
          bundleProduct {
            bundleProductID {
              _id
              product_name
              sku
            }
            avg_cost
            quantity
            selling_price
          }
        }
      }
      product_sku
      supplier_sku
      products {
        _id
        product_type
        sell_line_product_type
        discount_amount
        discount_value
        Product {
          _id
          product_name
          is_product
          description
        }
        serviceProduct {
          _id
          serviceProductType
          serviceProductId {
            product_name
          }
          serviceProductSKU
          serviceProductQuantity
          serviceCustomProductId {
            _id
            name
          }
        }
        product_sku
        supplier_sku
        quantity
        product_purchase_price
        product_sale_price
        sub_total_amount
        total_amount
        serial_number
        return_quantity
        back_to_stock
        reason
        is_refund_item
        customProduct {
          _id
          name
        }
      }
      GiftCard {
        _id
        card_no
        gift_card_keeping_unit
        name
      }
      customProduct {
        _id
        name
        quantity
        cost_price
        selling_price
        note
        is_taxable
      }
      quantity
      product_purchase_price
      product_sale_price
      tax_amount
      tax_value
      is_tax_percentage
      is_discount_percentage
      discount_amount
      discount_value
      sub_total_amount
      total_amount
      serial_number
      return_quantity
      back_to_stock
      reason
      is_refund_item
    }
    TransactionPayment {
      _id
      amount
      method
      paid_on
      card_used_no
      is_paid_amount
    }
    Customer {
      _id
      email
      first_name
      last_name
      CustomerStoreWiseRecord {
        net_term {
          pay_term_number
          pay_term_type
          credit_limit
          interest_rate
        }
        store_credit {
          credit_amount
        }
      }
    }
    tax_refund {
      state
      tax_certificate_id
      document_path
    }
    is_tax_refund
    TicketLogs {
      _id
      date
      remarks
    }
    is_coupon_apply
    coupon_code
    filter_type
    invoice_for_repair_room
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTicketDetailByIdGQL extends Apollo.Query<GetTicketDetailByIdQuery, GetTicketDetailByIdQueryVariables> {
    document = GetTicketDetailByIdDocument;
    
  }
export const RepairRoomStatusDocument = gql`
    query repairRoomStatus {
  repairRoomStatus {
    _id
    status_name
    status_background_color
    status_font_color
    status_icon
    status_type
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RepairRoomStatusGQL extends Apollo.Query<RepairRoomStatusQuery, RepairRoomStatusQueryVariables> {
    document = RepairRoomStatusDocument;
    
  }
export const CreateTaxRefundDocument = gql`
    mutation createTaxRefund($input: inputUploadTaxDocument) {
  createTaxRefund(input: $input) {
    _id
    total_amount
    sub_total_amount
    tax_refund {
      state
      tax_certificate_id
      document_path
    }
    TicketLogs {
      _id
      date
      remarks
    }
    is_tax_refund
    filter_type
    remaining_amount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTaxRefundGQL extends Apollo.Mutation<CreateTaxRefundMutation, CreateTaxRefundMutationVariables> {
    document = CreateTaxRefundDocument;
    
  }
export const EmailTicketDocument = gql`
    query emailTicket($orderID: ID, $businessLocation: ID) {
  emailTicket(orderID: $orderID, businessLocation: $businessLocation)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EmailTicketGQL extends Apollo.Query<EmailTicketQuery, EmailTicketQueryVariables> {
    document = EmailTicketDocument;
    
  }
export const InvoiceRefundByAmountDocument = gql`
    mutation InvoiceRefundByAmount($input: invoiceAmountRefundInput) {
  InvoiceRefundByAmount(input: $input) {
    _id
    total_amount
    sub_total_amount
    tax_refund {
      state
      tax_certificate_id
      document_path
    }
    TicketLogs {
      _id
      date
      remarks
    }
    is_tax_refund
    filter_type
    remaining_amount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class InvoiceRefundByAmountGQL extends Apollo.Mutation<InvoiceRefundByAmountMutation, InvoiceRefundByAmountMutationVariables> {
    document = InvoiceRefundByAmountDocument;
    
  }
export const InvoiceRefundByItemsDocument = gql`
    mutation InvoiceRefundByItems($transactionID: ID!, $location_id: ID!, $transactionReturnItems: [transactionReturnItemInput]) {
  InvoiceRefundByItems(transactionID: $transactionID, location_id: $location_id, transactionReturnItems: $transactionReturnItems) {
    _id
    total_amount
    sub_total_amount
    tax_refund {
      state
      tax_certificate_id
      document_path
    }
    TicketLogs {
      _id
      date
      remarks
    }
    is_tax_refund
    filter_type
    remaining_amount
    TransactionSellLine {
      _id
      is_device
      is_attach_device
      product_type
      sell_line_product_type
      Device {
        _id
        device_keeping_unit
        deviceBrand {
          _id
          brand_name
          description
        }
        deviceModel {
          _id
          name
        }
      }
      Product {
        _id
        product_name
        is_bundle_product
        is_product
        description
        bundle_products {
          total_selling_price
          total_avg_cost
          is_manufactured_qty
          bundleProduct {
            bundleProductID {
              _id
              product_name
              sku
            }
            avg_cost
            quantity
            selling_price
          }
        }
      }
      product_sku
      supplier_sku
      products {
        product_type
        sell_line_product_type
        Product {
          _id
          product_name
          is_product
          description
        }
        product_sku
        supplier_sku
        quantity
        product_purchase_price
        product_sale_price
        sub_total_amount
        total_amount
        serial_number
        return_quantity
        back_to_stock
        reason
        is_refund_item
      }
      GiftCard {
        _id
        card_no
        gift_card_keeping_unit
        name
      }
      customProduct {
        _id
        name
        quantity
        cost_price
        selling_price
        note
        is_taxable
      }
      quantity
      product_purchase_price
      product_sale_price
      tax_amount
      tax_value
      is_tax_percentage
      is_discount_percentage
      discount_amount
      discount_value
      sub_total_amount
      total_amount
      serial_number
      return_quantity
      back_to_stock
      reason
      is_refund_item
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class InvoiceRefundByItemsGQL extends Apollo.Mutation<InvoiceRefundByItemsMutation, InvoiceRefundByItemsMutationVariables> {
    document = InvoiceRefundByItemsDocument;
    
  }
export const TaskDeviceReOpenDocument = gql`
    mutation taskDeviceReOpen($transactionID: ID!, $location_id: ID!, $inputDevice: [deviceServicesInput]) {
  taskDeviceReOpen(transactionID: $transactionID, location_id: $location_id, inputDevice: $inputDevice)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TaskDeviceReOpenGQL extends Apollo.Mutation<TaskDeviceReOpenMutation, TaskDeviceReOpenMutationVariables> {
    document = TaskDeviceReOpenDocument;
    
  }
export const CheckOutTicketDocument = gql`
    mutation checkOutTicket($transactionID: ID!, $location_id: ID!) {
  checkOutTicket(transactionID: $transactionID, location_id: $location_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CheckOutTicketGQL extends Apollo.Mutation<CheckOutTicketMutation, CheckOutTicketMutationVariables> {
    document = CheckOutTicketDocument;
    
  }
export const ChequePaymentVerifyDocument = gql`
    mutation chequePaymentVerify($input: chequePaymentVerifyInput) {
  chequePaymentVerify(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ChequePaymentVerifyGQL extends Apollo.Mutation<ChequePaymentVerifyMutation, ChequePaymentVerifyMutationVariables> {
    document = ChequePaymentVerifyDocument;
    
  }
export const PayLaterInvoiceDocument = gql`
    mutation payLaterInvoice($location_id: ID!, $transactionID: ID!) {
  payLaterInvoice(location_id: $location_id, transactionID: $transactionID)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PayLaterInvoiceGQL extends Apollo.Mutation<PayLaterInvoiceMutation, PayLaterInvoiceMutationVariables> {
    document = PayLaterInvoiceDocument;
    
  }
export const AllCureenciesDocument = gql`
    query AllCureencies {
  currency {
    _id
    code
    country
    currency
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllCureenciesGQL extends Apollo.Query<AllCureenciesQuery, AllCureenciesQueryVariables> {
    document = AllCureenciesDocument;
    
  }
export const CheckUserEmailDocument = gql`
    query checkUserEmail($email: String!) {
  checkUserEmail(email: $email)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CheckUserEmailGQL extends Apollo.Query<CheckUserEmailQuery, CheckUserEmailQueryVariables> {
    document = CheckUserEmailDocument;
    
  }
export const CreateBusinessDocument = gql`
    mutation createBusiness($business: businesInput) {
  createBusiness(input: $business) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateBusinessGQL extends Apollo.Mutation<CreateBusinessMutation, CreateBusinessMutationVariables> {
    document = CreateBusinessDocument;
    
  }
export const CheckBusinessSystemNameDocument = gql`
    query checkBusinessSystemName($name: String!) {
  checkBusinessSystemName(business_system_name: $name) {
    business_system_name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CheckBusinessSystemNameGQL extends Apollo.Query<CheckBusinessSystemNameQuery, CheckBusinessSystemNameQueryVariables> {
    document = CheckBusinessSystemNameDocument;
    
  }
export const CheckBusinessUniqueCodeDocument = gql`
    query checkBusinessUniqueCode($code: String!) {
  checkBusinessUniqueCode(unique_code: $code) {
    unique_code
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CheckBusinessUniqueCodeGQL extends Apollo.Query<CheckBusinessUniqueCodeQuery, CheckBusinessUniqueCodeQueryVariables> {
    document = CheckBusinessUniqueCodeDocument;
    
  }
export const UploadFileDocument = gql`
    mutation uploadFile($file: Upload!, $business_id: String!) {
  uploadFile(file: $file, business_id: $business_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UploadFileGQL extends Apollo.Mutation<UploadFileMutation, UploadFileMutationVariables> {
    document = UploadFileDocument;
    
  }
export const CreateEmailOtpDocument = gql`
    mutation createEmailOTP($input: emailOtpInput) {
  createEmailOTP(input: $input) {
    _id
    otp_code
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateEmailOtpGQL extends Apollo.Mutation<CreateEmailOtpMutation, CreateEmailOtpMutationVariables> {
    document = CreateEmailOtpDocument;
    
  }
export const VerifyEmailOtpDocument = gql`
    mutation verifyEmailOTP($input: emailVerifyOtpInput) {
  verifyEmailOTP(input: $input) {
    verified
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class VerifyEmailOtpGQL extends Apollo.Mutation<VerifyEmailOtpMutation, VerifyEmailOtpMutationVariables> {
    document = VerifyEmailOtpDocument;
    
  }
export const CreateOtpDocument = gql`
    mutation createOTP($input: phoneOtpInput) {
  createOTP(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateOtpGQL extends Apollo.Mutation<CreateOtpMutation, CreateOtpMutationVariables> {
    document = CreateOtpDocument;
    
  }
export const VerifyOtpDocument = gql`
    mutation verifyOTP($input: phoneVerifyOtpInput) {
  verifyOTP(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class VerifyOtpGQL extends Apollo.Mutation<VerifyOtpMutation, VerifyOtpMutationVariables> {
    document = VerifyOtpDocument;
    
  }
export const GetCityStateTaxDocument = gql`
    query getCityStateTax($input: ZipCodeTaxInput) {
  getCityStateTax(input: $input) {
    _id
    zipCode
    Country {
      _id
      name
      short_name
      identification_types
    }
    State {
      state_name
    }
    City {
      city_name
    }
    tax {
      total
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCityStateTaxGQL extends Apollo.Query<GetCityStateTaxQuery, GetCityStateTaxQueryVariables> {
    document = GetCityStateTaxDocument;
    
  }
export const CheckStoreNickNameDocument = gql`
    query checkStoreNickName($store_nick_name: String!) {
  checkStoreNickName(store_nick_name: $store_nick_name)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CheckStoreNickNameGQL extends Apollo.Query<CheckStoreNickNameQuery, CheckStoreNickNameQueryVariables> {
    document = CheckStoreNickNameDocument;
    
  }
export const GetTaxByLocationIdDocument = gql`
    query getTaxByLocationId($businessLocationId: ID!) {
  BusinessLocationById(businessLocationId: $businessLocationId) {
    sales_tax
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTaxByLocationIdGQL extends Apollo.Query<GetTaxByLocationIdQuery, GetTaxByLocationIdQueryVariables> {
    document = GetTaxByLocationIdDocument;
    
  }
export const GetRepairRoomTaskListDocument = gql`
    query getRepairRoomTaskList($reapirRoomFilter: repairRoomFilter, $location_id: ID!, $limit: Int!, $skip: Int!) {
  repairRoomListing(filter: $reapirRoomFilter, location_id: $location_id, limit: $limit, skip: $skip) {
    total
    repairRoomTransactions {
      _id
      Customer {
        _id
        email
        first_name
        last_name
        phone
        address_1
      }
      repair_room_color_pallet
      transaction_keeping_unit
      device_count
      total_repair_time
      is_repair_room_customer_alert
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetRepairRoomTaskListGQL extends Apollo.Query<GetRepairRoomTaskListQuery, GetRepairRoomTaskListQueryVariables> {
    document = GetRepairRoomTaskListDocument;
    
  }
export const GetRepairRoomTaskDetailDocument = gql`
    query getRepairRoomTaskDetail($location_id: ID!, $transactionID: ID!) {
  repairRoomInvoiceDetail(location_id: $location_id, transactionID: $transactionID) {
    Transaction {
      _id
      Customer {
        _id
        email
        first_name
        last_name
        phone
        address_1
      }
      repair_room_color_pallet
      transaction_keeping_unit
      device_count
      total_repair_time
      is_repair_room_customer_alert
    }
    Devices {
      _id
      device {
        _id
        deviceBrand {
          _id
          brand_name
          description
        }
        deviceModel {
          _id
          name
        }
        device_color
        imei_ssn
        Customer {
          _id
          email
          first_name
          last_name
          phone
          address_1
        }
        device_image
        device_keeping_unit
      }
      technicion {
        id
        email
        first_name
        last_name
        phone
        avatar_location
        status
        business_id {
          _id
        }
        address_1
        address_2
        city
        state
        Country {
          _id
          name
        }
        zipcode
        user_keeping_unit
      }
      device_color_pallet
      repair_count
      device_total_repair_time
      deviceItems {
        _id
        product_type
        sell_line_product_type
        repair_room_item_type
        customProduct {
          _id
          name
          quantity
          cost_price
          selling_price
          selling_price_include_tax
          is_taxable
        }
        Product {
          _id
          product_name
          is_bundle_product
          bundle_products {
            total_selling_price
            total_avg_cost
            is_manufactured_qty
            bundleProduct {
              avg_cost
              quantity
              selling_price
              bundleProductID {
                _id
                product_name
                description
                image
                is_bundle_product
                is_product
                is_track_stock
                alert_qty
                ideal_qty
                sell_price
                openingStock
                sell_price_inc_tax
                average_cost
                last_cost
                incoming_item
                ProductStockPrice {
                  shelf_qty
                }
                Brand {
                  _id
                  brand_name
                }
                DeviceModel {
                  _id
                  name
                }
                barcode
                sku
                is_serial_number
                Suppliers {
                  supplier_id {
                    _id
                    supplier_company
                    supplier_company_phone
                    supplier_company_email
                    website
                    address_1
                    supplier_keeping_unit
                    supplier_first_name
                    supplier_last_name
                    supplier_phone
                    supplier_mobile
                    supplier_email
                    is_verify_supplier
                    is_buyback
                  }
                  sku_number
                  current_stock
                  incoming_item
                  instock
                  ordered_qty
                }
              }
            }
          }
          is_product
          is_track_stock
          sell_price
          sell_price_inc_tax
          average_cost
          DeviceModel {
            _id
            name
          }
          sku
          is_serial_number
          Suppliers {
            supplier_id {
              _id
              supplier_company
              supplier_company_phone
              supplier_company_email
              website
              address_1
              supplier_keeping_unit
              supplier_first_name
              supplier_last_name
              supplier_phone
              supplier_mobile
              supplier_email
              is_verify_supplier
              is_buyback
            }
            sku_number
            current_stock
          }
          serviceProduct {
            _id
            serviceProductType
            serviceProductId {
              _id
              product_name
              is_bundle_product
              bundle_products {
                total_selling_price
                total_avg_cost
                is_manufactured_qty
                bundleProduct {
                  bundleProductID {
                    _id
                    product_name
                    description
                    image
                    is_bundle_product
                    is_product
                    is_track_stock
                    alert_qty
                    ideal_qty
                    sell_price
                    openingStock
                    sell_price_inc_tax
                    average_cost
                    last_cost
                    incoming_item
                    ProductStockPrice {
                      shelf_qty
                      _id
                      ideal_quantity
                      opening_stock
                      qty_available
                      alert_quantity
                      order_qty
                      bundle_order_qty
                      is_profit_percentage
                      profit_value
                      profit_amount
                      default_sell_price
                      is_sell_tax_percentage
                      sell_tax_value
                      sell_tax_amount
                      sell_price_inc_tax
                      last_cost
                      average_cost
                      discount_amount
                      price_without_bundle
                      percentage_discount
                    }
                    Brand {
                      _id
                      brand_name
                    }
                    DeviceModel {
                      _id
                      name
                    }
                    barcode
                    sku
                    compatilable_devices
                    Suppliers {
                      supplier_id {
                        _id
                        supplier_company
                        supplier_keeping_unit
                        supplier_first_name
                        supplier_last_name
                        is_verify_supplier
                      }
                      sku_number
                      current_stock
                      incoming_item
                      instock
                      ordered_qty
                    }
                    ProductStockPrice {
                      _id
                      ideal_quantity
                      opening_stock
                      qty_available
                      alert_quantity
                      shelf_qty
                      order_qty
                      bundle_order_qty
                      is_profit_percentage
                      profit_value
                      profit_amount
                      default_sell_price
                      is_sell_tax_percentage
                      sell_tax_value
                      sell_tax_amount
                      sell_price_inc_tax
                      last_cost
                      average_cost
                      discount_amount
                      price_without_bundle
                      percentage_discount
                    }
                    tags
                    is_serial_number
                    sale_item
                    total_sale
                    incoming_item
                    max_bundle
                    is_completed_product
                    is_add_product_with_device
                  }
                  avg_cost
                  quantity
                  selling_price
                }
              }
              is_product
              is_track_stock
              alert_qty
              ideal_qty
              sell_price
              sell_price_inc_tax
              average_cost
              last_cost
              incoming_item
              ProductStockPrice {
                shelf_qty
              }
              Brand {
                _id
                brand_name
                description
              }
              DeviceModel {
                _id
                name
              }
              sku
              compatilable_devices
              Suppliers {
                supplier_id {
                  _id
                  supplier_company
                  supplier_company_phone
                  supplier_company_email
                  website
                  address_1
                  address_2
                  city
                  state
                  zip_code
                  supplier_keeping_unit
                  supplier_first_name
                  supplier_last_name
                  supplier_phone
                  supplier_mobile
                  supplier_email
                  is_verify_supplier
                  is_buyback
                  Order
                }
                sku_number
                current_stock
                incoming_item
                instock
                ordered_qty
                price_purchase
              }
              is_serial_number
            }
            serviceProductSKU
            serviceProductSupplier
            serviceProductQuantity
            serviceCustomProductId {
              _id
              name
              quantity
              cost_price
              selling_price
              selling_price_include_tax
              note
              is_taxable
            }
            service_repair_room_item_type
            serviceReason
          }
        }
        service_status {
          _id
          status_name
          status_background_color
          status_font_color
          status_icon
          status_type
        }
        time_log
      }
    }
    Total
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetRepairRoomTaskDetailGQL extends Apollo.Query<GetRepairRoomTaskDetailQuery, GetRepairRoomTaskDetailQueryVariables> {
    document = GetRepairRoomTaskDetailDocument;
    
  }
export const GetRepairRoomTaskStatusDocument = gql`
    query getRepairRoomTaskStatus {
  repairRoomStatus {
    _id
    status_name
    status_background_color
    status_font_color
    status_icon
    status_type
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetRepairRoomTaskStatusGQL extends Apollo.Query<GetRepairRoomTaskStatusQuery, GetRepairRoomTaskStatusQueryVariables> {
    document = GetRepairRoomTaskStatusDocument;
    
  }
export const TaskMarkAsDoneDocument = gql`
    mutation taskMarkAsDone($transactionIDs: [ID!], $location_id: ID!) {
  taskMarkAsDone(transactionIDs: $transactionIDs, location_id: $location_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TaskMarkAsDoneGQL extends Apollo.Mutation<TaskMarkAsDoneMutation, TaskMarkAsDoneMutationVariables> {
    document = TaskMarkAsDoneDocument;
    
  }
export const TaskDeviceMarkAsDoneDocument = gql`
    mutation taskDeviceMarkAsDone($transactionID: ID!, $deviceID: ID!, $location_id: ID!) {
  taskDeviceMarkAsDone(transactionID: $transactionID, deviceID: $deviceID, location_id: $location_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TaskDeviceMarkAsDoneGQL extends Apollo.Mutation<TaskDeviceMarkAsDoneMutation, TaskDeviceMarkAsDoneMutationVariables> {
    document = TaskDeviceMarkAsDoneDocument;
    
  }
export const TaskServiceMarkAsDoneDocument = gql`
    mutation taskServiceMarkAsDone($transactionID: ID!, $deviceID: ID!, $sellID: ID!, $status: String!, $location_id: ID!) {
  taskServiceMarkAsDone(transactionID: $transactionID, deviceID: $deviceID, sellID: $sellID, status: $status, location_id: $location_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TaskServiceMarkAsDoneGQL extends Apollo.Mutation<TaskServiceMarkAsDoneMutation, TaskServiceMarkAsDoneMutationVariables> {
    document = TaskServiceMarkAsDoneDocument;
    
  }
export const TechnicianAssignToDeviceDocument = gql`
    mutation technicianAssignToDevice($transactionID: ID!, $deviceID: ID!, $technicianID: ID!, $location_id: ID!) {
  technicianAssignToDevice(transactionID: $transactionID, deviceID: $deviceID, technicianID: $technicianID, location_id: $location_id) {
    id
    email
    first_name
    last_name
    phone
    avatar_location
    status
    business_id {
      _id
    }
    address_1
    address_2
    city
    state
    Country {
      _id
      name
    }
    zipcode
    user_keeping_unit
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TechnicianAssignToDeviceGQL extends Apollo.Mutation<TechnicianAssignToDeviceMutation, TechnicianAssignToDeviceMutationVariables> {
    document = TechnicianAssignToDeviceDocument;
    
  }
export const CreateTransactionAlertDocument = gql`
    mutation createTransactionAlert($input: PurchaseAlertInput) {
  createTransactionAlert(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTransactionAlertGQL extends Apollo.Mutation<CreateTransactionAlertMutation, CreateTransactionAlertMutationVariables> {
    document = CreateTransactionAlertDocument;
    
  }
export const SetServiceItemTypeDocument = gql`
    mutation SetServiceItemType($transactionID: ID!, $serviceID: ID!, $location_id: ID!, $service_item_type: ServiceItemEnum) {
  SetServiceItemType(transactionID: $transactionID, serviceID: $serviceID, location_id: $location_id, service_item_type: $service_item_type)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SetServiceItemTypeGQL extends Apollo.Mutation<SetServiceItemTypeMutation, SetServiceItemTypeMutationVariables> {
    document = SetServiceItemTypeDocument;
    
  }
export const SetServiceProductTypeDocument = gql`
    mutation SetServiceProductType($_id: ID!, $transactionID: ID!, $serviceID: ID!, $productID: ID!, $location_id: ID!, $service_item_type: ServiceItemEnum, $service_reasons: String!) {
  SetServiceProductType(_id: $_id, transactionID: $transactionID, serviceID: $serviceID, productID: $productID, location_id: $location_id, service_item_type: $service_item_type, service_reasons: $service_reasons)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SetServiceProductTypeGQL extends Apollo.Mutation<SetServiceProductTypeMutation, SetServiceProductTypeMutationVariables> {
    document = SetServiceProductTypeDocument;
    
  }
export const RepairRoomOrderPartDocument = gql`
    mutation RepairRoomOrderPart($input: OrderPartInput) {
  RepairRoomOrderPart(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RepairRoomOrderPartGQL extends Apollo.Mutation<RepairRoomOrderPartMutation, RepairRoomOrderPartMutationVariables> {
    document = RepairRoomOrderPartDocument;
    
  }
export const TechnicianTimeLogDocument = gql`
    mutation technicianTimeLog($transactionID: ID!, $deviceID: ID!, $serviceID: ID!, $technicianID: ID!, $location_id: ID!, $log_time: Float!) {
  technicianTimeLog(transactionID: $transactionID, deviceID: $deviceID, serviceID: $serviceID, technicianID: $technicianID, location_id: $location_id, log_time: $log_time)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TechnicianTimeLogGQL extends Apollo.Mutation<TechnicianTimeLogMutation, TechnicianTimeLogMutationVariables> {
    document = TechnicianTimeLogDocument;
    
  }
export const OrderPartSuppliersDocument = gql`
    query OrderPartSuppliers($location_id: ID!, $product_id: ID!, $search: String) {
  OrderPartSuppliers(location_id: $location_id, product_id: $product_id, search: $search) {
    Supplier {
      _id
      supplier_company
      supplier_company_phone
      supplier_company_email
      website
      address_1
      supplier_keeping_unit
      supplier_first_name
      supplier_last_name
      supplier_phone
      supplier_mobile
      supplier_email
      is_verify_supplier
      is_buyback
    }
    sku_number
    order_qty
    product_price
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class OrderPartSuppliersGQL extends Apollo.Query<OrderPartSuppliersQuery, OrderPartSuppliersQueryVariables> {
    document = OrderPartSuppliersDocument;
    
  }
export const GetRepairOrdersDocument = gql`
    query getRepairOrders($locationId: ID, $limit: Int, $skip: Int) {
  getRepairOrders(locationId: $locationId, limit: $limit, skip: $skip) {
    ref_no
    transactionId
    count_devices
    Customer {
      first_name
      last_name
      email
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetRepairOrdersGQL extends Apollo.Query<GetRepairOrdersQuery, GetRepairOrdersQueryVariables> {
    document = GetRepairOrdersDocument;
    
  }
export const GetRepairDevicesDocument = gql`
    query getRepairDevices($transactionId: ID!, $locationId: ID) {
  getRepairDevices(transactionId: $transactionId, locationId: $locationId) {
    Device {
      _id
      deviceBrand {
        _id
        brand_name
        description
      }
      deviceModel {
        _id
        name
      }
      device_color
      imei_ssn
      Customer {
        _id
      }
      device_image
      device_keeping_unit
      business_id {
        _id
      }
      location_id {
        _id
      }
    }
    count_service
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetRepairDevicesGQL extends Apollo.Query<GetRepairDevicesQuery, GetRepairDevicesQueryVariables> {
    document = GetRepairDevicesDocument;
    
  }
export const CreateTransactionCustomerAlertDocument = gql`
    mutation createTransactionCustomerAlert($input: CustomerAlertInput) {
  createTransactionCustomerAlert(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTransactionCustomerAlertGQL extends Apollo.Mutation<CreateTransactionCustomerAlertMutation, CreateTransactionCustomerAlertMutationVariables> {
    document = CreateTransactionCustomerAlertDocument;
    
  }
export const GetExtraItemListsDocument = gql`
    query getExtraItemLists($deviceID: ID, $transactionID: ID, $locationID: ID) {
  getExtraItemLists(deviceID: $deviceID, transactionID: $transactionID, locationID: $locationID) {
    _id
    product_type
    Product {
      _id
      product_name
    }
    sell_line_product_type
    supplier_sku
    quantity
    serial_number
    reason
    Supplier {
      _id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetExtraItemListsGQL extends Apollo.Query<GetExtraItemListsQuery, GetExtraItemListsQueryVariables> {
    document = GetExtraItemListsDocument;
    
  }
export const AddExtraItemsDocument = gql`
    mutation addExtraItems($input: inputExtraItem) {
  addExtraItems(input: $input) {
    _id
    product_type
    sell_line_product_type
    Product {
      _id
      product_name
    }
    supplier_sku
    quantity
    serial_number
    Supplier {
      _id
    }
    serviceProduct {
      _id
      serviceProductType
      serviceProductId {
        _id
        product_name
        is_bundle_product
        bundle_products {
          total_selling_price
          total_avg_cost
          is_manufactured_qty
          bundleProduct {
            bundleProductID {
              _id
              product_name
              Brand {
                _id
                brand_name
              }
              DeviceModel {
                _id
                name
              }
              barcode
              sku
              compatilable_devices
              tags
              is_serial_number
              sale_item
              total_sale
              incoming_item
              max_bundle
              is_completed_product
              is_add_product_with_device
            }
            avg_cost
            quantity
            selling_price
          }
        }
        is_product
        is_track_stock
        alert_qty
        ideal_qty
        sell_price
        sell_price_inc_tax
        average_cost
        last_cost
        incoming_item
        ProductStockPrice {
          shelf_qty
        }
        Brand {
          _id
          brand_name
          description
        }
        DeviceModel {
          _id
          name
        }
        sku
        compatilable_devices
        is_serial_number
      }
      serviceProductSKU
      serviceProductSupplier
      serviceProductQuantity
      serviceCustomProductId {
        _id
        name
        quantity
        cost_price
        selling_price
        selling_price_include_tax
        note
        is_taxable
      }
      service_repair_room_item_type
      serviceReason
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddExtraItemsGQL extends Apollo.Mutation<AddExtraItemsMutation, AddExtraItemsMutationVariables> {
    document = AddExtraItemsDocument;
    
  }
export const EditExtraItemDocument = gql`
    mutation editExtraItem($input: inputExtraItem) {
  editExtraItem(input: $input) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EditExtraItemGQL extends Apollo.Mutation<EditExtraItemMutation, EditExtraItemMutationVariables> {
    document = EditExtraItemDocument;
    
  }
export const DeleteExtraItemDocument = gql`
    mutation deleteExtraItem($deviceID: ID, $transactionID: ID, $sellLineID: ID, $sellLineServiceModelID: ID, $isDirectDevice: Boolean) {
  deleteExtraItem(deviceID: $deviceID, transactionID: $transactionID, sellLineID: $sellLineID, sellLineServiceModelID: $sellLineServiceModelID, isDirectDevice: $isDirectDevice)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteExtraItemGQL extends Apollo.Mutation<DeleteExtraItemMutation, DeleteExtraItemMutationVariables> {
    document = DeleteExtraItemDocument;
    
  }
export const GetSupplierProductsAndSearchDocument = gql`
    query getSupplierProductsAndSearch($search: String, $locationId: ID) {
  getSupplierProductsAndSearch(search: $search, locationId: $locationId) {
    supplier {
      _id
      supplier_first_name
      supplier_last_name
      supplier_phone
      supplier_company
    }
    ProductID
    product_name
    supplier_sku
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSupplierProductsAndSearchGQL extends Apollo.Query<GetSupplierProductsAndSearchQuery, GetSupplierProductsAndSearchQueryVariables> {
    document = GetSupplierProductsAndSearchDocument;
    
  }
export const GetRepairDeviceServiceDocument = gql`
    query getRepairDeviceService($deviceId: ID!, $transactionId: ID!, $locationId: ID) {
  getRepairDeviceService(deviceId: $deviceId, transactionId: $transactionId, locationId: $locationId) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetRepairDeviceServiceGQL extends Apollo.Query<GetRepairDeviceServiceQuery, GetRepairDeviceServiceQueryVariables> {
    document = GetRepairDeviceServiceDocument;
    
  }
export const GetDeviceProductAndServiceDocument = gql`
    query getDeviceProductAndService($deviceID: ID!, $location_id: ID!, $is_product: Boolean!) {
  getDeviceProductAndService(deviceID: $deviceID, location_id: $location_id, is_product: $is_product) {
    _id
    product_name
    incoming_item
    max_bundle
    is_bundle_product
    is_product
    is_track_stock
    is_serial_number
    sell_price_inc_tax
    sku
    alert_qty
    ProductStockPrice {
      _id
      qty_available
      alert_quantity
      shelf_qty
      sell_price_inc_tax
      shelf_qty
      order_qty
    }
    bundle_products {
      total_selling_price
      total_avg_cost
      is_manufactured_qty
      bundleProduct {
        bundleProductID {
          _id
          product_name
          incoming_item
          max_bundle
          is_bundle_product
          is_product
          is_track_stock
          is_serial_number
          ProductStockPrice {
            _id
            qty_available
            alert_quantity
            shelf_qty
            sell_price_inc_tax
            shelf_qty
            order_qty
          }
        }
        avg_cost
        quantity
        selling_price
      }
    }
    Suppliers {
      supplier_id {
        _id
        supplier_company
        supplier_company_phone
        supplier_company_email
      }
      sku_number
      current_stock
      incoming_item
      instock
      ordered_qty
    }
    servicesBrandModel {
      ServiceBrand {
        _id
        brand_name
        description
      }
      ServiceDeviceModel {
        _id
        name
        brand {
          _id
          brand_name
          description
        }
      }
      service_max_price
      service_min_price
      ServiceItem {
        _id
        product_name
        incoming_item
        max_bundle
        is_bundle_product
        is_product
        is_track_stock
        is_serial_number
        sell_price_inc_tax
        sku
        alert_qty
        ProductStockPrice {
          _id
          qty_available
          alert_quantity
          shelf_qty
          sell_price_inc_tax
          shelf_qty
          order_qty
        }
        bundle_products {
          total_selling_price
          total_avg_cost
          is_manufactured_qty
          bundleProduct {
            bundleProductID {
              _id
              product_name
              incoming_item
              max_bundle
              is_bundle_product
              is_product
              is_track_stock
              is_serial_number
              ProductStockPrice {
                _id
                qty_available
                alert_quantity
                shelf_qty
                sell_price_inc_tax
                shelf_qty
                order_qty
              }
            }
            avg_cost
            quantity
            selling_price
          }
        }
        Suppliers {
          supplier_id {
            _id
            supplier_company
            supplier_company_phone
            supplier_company_email
          }
          sku_number
          current_stock
          incoming_item
          instock
          ordered_qty
        }
      }
    }
    Brand {
      _id
      brand_name
      description
    }
    DeviceModel {
      _id
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetDeviceProductAndServiceGQL extends Apollo.Query<GetDeviceProductAndServiceQuery, GetDeviceProductAndServiceQueryVariables> {
    document = GetDeviceProductAndServiceDocument;
    
  }
export const GetAllUsersDocument = gql`
    query getAllUsers {
  getUsers {
    id
    email
    first_name
    last_name
    phone
    avatar_location
    status
    business_id {
      _id
    }
    address_1
    address_2
    city
    state
    Country {
      _id
      name
    }
    zipcode
    user_keeping_unit
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllUsersGQL extends Apollo.Query<GetAllUsersQuery, GetAllUsersQueryVariables> {
    document = GetAllUsersDocument;
    
  }
export const GetAllTechnicianDocument = gql`
    query getAllTechnician($location_id: ID!) {
  TechnicianList(location_id: $location_id) {
    id
    email
    first_name
    last_name
    phone
    avatar_location
    status
    business_id {
      _id
    }
    address_1
    address_2
    city
    state
    Country {
      _id
      name
    }
    zipcode
    user_keeping_unit
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllTechnicianGQL extends Apollo.Query<GetAllTechnicianQuery, GetAllTechnicianQueryVariables> {
    document = GetAllTechnicianDocument;
    
  }
export const CreateUserDocument = gql`
    mutation createUser($file: Upload, $input: UserInput) {
  createUser(file: $file, input: $input) {
    id
    email
    first_name
    last_name
    phone
    avatar_location
    status
    business_id {
      _id
    }
    address_1
    address_2
    city
    state
    Country {
      _id
    }
    zipcode
    user_keeping_unit
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateUserGQL extends Apollo.Mutation<CreateUserMutation, CreateUserMutationVariables> {
    document = CreateUserDocument;
    
  }
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $input: UserUpdateInput) {
  UpdateUser(id: $id, input: $input) {
    id
    email
    first_name
    last_name
    phone
    avatar_location
    status
    business_id {
      _id
    }
    address_1
    address_2
    city
    state
    Country {
      _id
    }
    zipcode
    user_keeping_unit
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    document = UpdateUserDocument;
    
  }
export const RemoveUserDocument = gql`
    query removeUser($userId: ID!) {
  removeUser(userId: $userId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveUserGQL extends Apollo.Query<RemoveUserQuery, RemoveUserQueryVariables> {
    document = RemoveUserDocument;
    
  }
export const GetAllStoresDocument = gql`
    query getAllStores {
  userBusinessLocations {
    _id
    business_id {
      _id
    }
    store_type
    email
    sales_tax
    ein_ssn
    phone
    zip_code
    city
    state
    address_1
    address_2
    store_name
    store_legal_name
    location_keeping_unit
    store_nick_name
    provider_name
    identification_number
    identification_type
    logo
    status
    created_at
    Country {
      _id
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllStoresGQL extends Apollo.Query<GetAllStoresQuery, GetAllStoresQueryVariables> {
    document = GetAllStoresDocument;
    
  }
export const CreateBusinessLocationDocument = gql`
    mutation createBusinessLocation($input: BusinessLocationInput!) {
  createBusinessLocation(input: $input) {
    _id
    business_id {
      _id
    }
    email
    sales_tax
    ein_ssn
    phone
    zip_code
    city
    state
    address_1
    address_2
    store_name
    store_legal_name
    location_keeping_unit
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateBusinessLocationGQL extends Apollo.Mutation<CreateBusinessLocationMutation, CreateBusinessLocationMutationVariables> {
    document = CreateBusinessLocationDocument;
    
  }
export const UpdateBusinessLocationDocument = gql`
    mutation updateBusinessLocation($id: ID!, $input: BusinessLocationInput!) {
  updateBusinessLocation(id: $id, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateBusinessLocationGQL extends Apollo.Mutation<UpdateBusinessLocationMutation, UpdateBusinessLocationMutationVariables> {
    document = UpdateBusinessLocationDocument;
    
  }
export const GetBusinessInfoForUpdateDocument = gql`
    query getBusinessInfoForUpdate {
  GetBusinessByID {
    _id
    business_system_name
    store_type
    number_of_stores
    unique_code
    fy_end_month
    accounting_method
    currency_id
    logo
    created_at
    Country {
      name
      _id
    }
    owner_id {
      id
      email
      first_name
      last_name
      phone
      user_keeping_unit
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetBusinessInfoForUpdateGQL extends Apollo.Query<GetBusinessInfoForUpdateQuery, GetBusinessInfoForUpdateQueryVariables> {
    document = GetBusinessInfoForUpdateDocument;
    
  }
export const UdateBusinessDocument = gql`
    mutation udateBusiness($input: udateBusinessInput) {
  udateBusiness(input: $input) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UdateBusinessGQL extends Apollo.Mutation<UdateBusinessMutation, UdateBusinessMutationVariables> {
    document = UdateBusinessDocument;
    
  }
export const GetTodayCLockOfUsersDocument = gql`
    query getTodayCLockOfUsers {
  getTodayCLockOfUsers {
    status
    totaltime
    User {
      id
      first_name
      last_name
      user_keeping_unit
      last_name
      email
      user_keeping_unit
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTodayCLockOfUsersGQL extends Apollo.Query<GetTodayCLockOfUsersQuery, GetTodayCLockOfUsersQueryVariables> {
    document = GetTodayCLockOfUsersDocument;
    
  }
export const GetCLockOfUserByIdDocument = gql`
    query getCLockOfUserById($userId: ID!, $toDate: String, $fromDate: String, $location_id: ID!) {
  getUserClockInOutHistoryLogs(userId: $userId, toDate: $toDate, fromDate: $fromDate, location_id: $location_id) {
    User {
      first_name
      last_name
    }
    endDate
    startDate
    history {
      day
      date
      clocked_in_time
      clocked_out_time
      status
      totaltime
    }
    totalHours
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCLockOfUserByIdGQL extends Apollo.Query<GetCLockOfUserByIdQuery, GetCLockOfUserByIdQueryVariables> {
    document = GetCLockOfUserByIdDocument;
    
  }
export const GetAllChartOfAccountsDocument = gql`
    query GetAllChartOfAccounts {
  GetAllChartOfAccounts {
    _id
    account_code
    account_name
    account_type_Id {
      title
    }
    parent_account_Id {
      account_name
    }
    account_balance
    Opening_balance
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllChartOfAccountsGQL extends Apollo.Query<GetAllChartOfAccountsQuery, GetAllChartOfAccountsQueryVariables> {
    document = GetAllChartOfAccountsDocument;
    
  }
export const GetAllAccountTypesDocument = gql`
    query GetAllAccountTypes {
  GetAllAccountTypes {
    _id
    title
    parent_account_type_id {
      _id
      title
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllAccountTypesGQL extends Apollo.Query<GetAllAccountTypesQuery, GetAllAccountTypesQueryVariables> {
    document = GetAllAccountTypesDocument;
    
  }
export const CreateChartOfAccountDocument = gql`
    mutation createChartOfAccount($input: ChartOfAccountInput) {
  createChartOfAccount(input: $input) {
    _id
    account_code
    account_name
    account_type_Id {
      _id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateChartOfAccountGQL extends Apollo.Mutation<CreateChartOfAccountMutation, CreateChartOfAccountMutationVariables> {
    document = CreateChartOfAccountDocument;
    
  }
export const UpdateChartOfAccountDocument = gql`
    mutation updateChartOfAccount($_id: ID!, $input: ChartOfAccountInput) {
  updateChartOfAccount(_id: $_id, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateChartOfAccountGQL extends Apollo.Mutation<UpdateChartOfAccountMutation, UpdateChartOfAccountMutationVariables> {
    document = UpdateChartOfAccountDocument;
    
  }
export const GetAllAccountsByTypeDocument = gql`
    query GetAllAccountsByType($_id: ID!) {
  GetAllAccountsByType(_id: $_id) {
    _id
    account_code
    account_name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllAccountsByTypeGQL extends Apollo.Query<GetAllAccountsByTypeQuery, GetAllAccountsByTypeQueryVariables> {
    document = GetAllAccountsByTypeDocument;
    
  }
export const BusinessLocationSettingsDocument = gql`
    mutation businessLocationSettings($_id: ID!, $input: AccountSettingInput) {
  businessLocationSettings(_id: $_id, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class BusinessLocationSettingsGQL extends Apollo.Mutation<BusinessLocationSettingsMutation, BusinessLocationSettingsMutationVariables> {
    document = BusinessLocationSettingsDocument;
    
  }
export const UpdateBusinessAdminDocument = gql`
    mutation updateBusinessAdmin($_id: ID!, $input: BusinessInput) {
  updateBusinessAdmin(_id: $_id, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateBusinessAdminGQL extends Apollo.Mutation<UpdateBusinessAdminMutation, UpdateBusinessAdminMutationVariables> {
    document = UpdateBusinessAdminDocument;
    
  }
export const OwnerPasswordUpdateDocument = gql`
    mutation ownerPasswordUpdate($input: PasswordUpdateInput!) {
  OwnerPasswordUpdate(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class OwnerPasswordUpdateGQL extends Apollo.Mutation<OwnerPasswordUpdateMutation, OwnerPasswordUpdateMutationVariables> {
    document = OwnerPasswordUpdateDocument;
    
  }
export const BusinessLogoUploadDocument = gql`
    mutation businessLogoUpload($business_id: ID!, $logo: String!) {
  businessLogoUpload(business_id: $business_id, logo: $logo)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class BusinessLogoUploadGQL extends Apollo.Mutation<BusinessLogoUploadMutation, BusinessLogoUploadMutationVariables> {
    document = BusinessLogoUploadDocument;
    
  }
export const GetAllBusinessUsersDocument = gql`
    query getAllBusinessUsers($store_id: ID!, $filter: String!) {
  getAllBusinessUsers(store_id: $store_id, filter: $filter) {
    id
    is_clocked_in
    email
    created_at
    first_name
    last_name
    phone
    avatar_location
    status
    business_id {
      _id
    }
    address_1
    address_2
    city
    state
    Country {
      _id
      name
    }
    zipcode
    user_keeping_unit
    roles
    salaryHour
    is_deleted
    BusinessLocation {
      _id
      store_name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllBusinessUsersGQL extends Apollo.Query<GetAllBusinessUsersQuery, GetAllBusinessUsersQueryVariables> {
    document = GetAllBusinessUsersDocument;
    
  }
export const CreateBusinessUserDocument = gql`
    mutation createBusinessUser($input: UserInput!, $logo: String) {
  createBusinessUser(input: $input, logo: $logo) {
    id
    email
    first_name
    created_at
    last_name
    phone
    avatar_location
    status
    business_id {
      _id
    }
    address_1
    address_2
    city
    state
    Country {
      _id
      name
    }
    zipcode
    is_deleted
    user_keeping_unit
    roles
    salaryHour
    BusinessLocation {
      _id
      store_name
      store_nick_name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateBusinessUserGQL extends Apollo.Mutation<CreateBusinessUserMutation, CreateBusinessUserMutationVariables> {
    document = CreateBusinessUserDocument;
    
  }
export const StatusBusinessUserDocument = gql`
    mutation statusBusinessUser($_id: ID!, $status: businessStatus!) {
  statusBusinessUser(_id: $_id, status: $status)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class StatusBusinessUserGQL extends Apollo.Mutation<StatusBusinessUserMutation, StatusBusinessUserMutationVariables> {
    document = StatusBusinessUserDocument;
    
  }
export const DeleteBusinessUserDocument = gql`
    mutation deleteBusinessUser($_id: ID!) {
  deleteBusinessUser(_id: $_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteBusinessUserGQL extends Apollo.Mutation<DeleteBusinessUserMutation, DeleteBusinessUserMutationVariables> {
    document = DeleteBusinessUserDocument;
    
  }
export const UpdateBusinessUserDocument = gql`
    mutation updateBusinessUser($_id: ID!, $input: UserInput!) {
  updateBusinessUser(_id: $_id, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateBusinessUserGQL extends Apollo.Mutation<UpdateBusinessUserMutation, UpdateBusinessUserMutationVariables> {
    document = UpdateBusinessUserDocument;
    
  }
export const GetAllBusinessStoreAdminDocument = gql`
    query getAllBusinessStoreAdmin($business_id: ID!, $filter: String!) {
  getAllBusinessStoreAdmin(business_id: $business_id, filter: $filter) {
    _id
    store_name
    store_nick_name
    location_keeping_unit
    address_1
    address_2
    state
    city
    zip_code
    Country {
      _id
      name
    }
    sales_tax
    email
    phone
    store_type
    store_legal_name
    identification_type
    identification_number
    provider_name
    business_id {
      _id
    }
    ein_ssn
    logo
    status
    created_at
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllBusinessStoreAdminGQL extends Apollo.Query<GetAllBusinessStoreAdminQuery, GetAllBusinessStoreAdminQueryVariables> {
    document = GetAllBusinessStoreAdminDocument;
    
  }
export const CreateBusinessStoreAdminDocument = gql`
    mutation createBusinessStoreAdmin($business_id: ID!, $input: store!, $logo: String) {
  createBusinessStoreAdmin(business_id: $business_id, input: $input, logo: $logo) {
    _id
    store_name
    store_nick_name
    location_keeping_unit
    address_1
    address_2
    state
    city
    zip_code
    Country {
      _id
      name
    }
    sales_tax
    email
    phone
    store_type
    store_legal_name
    identification_type
    identification_number
    provider_name
    business_id {
      _id
    }
    ein_ssn
    logo
    status
    created_at
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateBusinessStoreAdminGQL extends Apollo.Mutation<CreateBusinessStoreAdminMutation, CreateBusinessStoreAdminMutationVariables> {
    document = CreateBusinessStoreAdminDocument;
    
  }
export const UpdateBusinessStoreAdminDocument = gql`
    mutation updateBusinessStoreAdmin($_id: ID!, $business_id: ID!, $input: store!) {
  updateBusinessStoreAdmin(_id: $_id, business_id: $business_id, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateBusinessStoreAdminGQL extends Apollo.Mutation<UpdateBusinessStoreAdminMutation, UpdateBusinessStoreAdminMutationVariables> {
    document = UpdateBusinessStoreAdminDocument;
    
  }
export const DeleteBusinessStoreAdminDocument = gql`
    mutation deleteBusinessStoreAdmin($_id: ID!) {
  deleteBusinessStoreAdmin(_id: $_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteBusinessStoreAdminGQL extends Apollo.Mutation<DeleteBusinessStoreAdminMutation, DeleteBusinessStoreAdminMutationVariables> {
    document = DeleteBusinessStoreAdminDocument;
    
  }
export const StatusBusinessStoreAdminDocument = gql`
    mutation statusBusinessStoreAdmin($_id: ID!, $status: businessStatus!) {
  statusBusinessStoreAdmin(_id: $_id, status: $status)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class StatusBusinessStoreAdminGQL extends Apollo.Mutation<StatusBusinessStoreAdminMutation, StatusBusinessStoreAdminMutationVariables> {
    document = StatusBusinessStoreAdminDocument;
    
  }
export const UserLogoUploadDocument = gql`
    mutation userLogoUpload($user_id: ID!, $logo: String!) {
  userLogoUpload(user_id: $user_id, logo: $logo)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserLogoUploadGQL extends Apollo.Mutation<UserLogoUploadMutation, UserLogoUploadMutationVariables> {
    document = UserLogoUploadDocument;
    
  }
export const UniqueUserEmailDocument = gql`
    query uniqueUserEmail($user_id: ID, $email: String!) {
  uniqueUserEmail(user_id: $user_id, email: $email) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UniqueUserEmailGQL extends Apollo.Query<UniqueUserEmailQuery, UniqueUserEmailQueryVariables> {
    document = UniqueUserEmailDocument;
    
  }
export const StoreLogoUploadDocument = gql`
    mutation storeLogoUpload($store_id: ID!, $logo: String!) {
  storeLogoUpload(store_id: $store_id, logo: $logo)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class StoreLogoUploadGQL extends Apollo.Mutation<StoreLogoUploadMutation, StoreLogoUploadMutationVariables> {
    document = StoreLogoUploadDocument;
    
  }
export const GetBusinessAdminDocument = gql`
    query getBusinessAdmin($_id: ID!) {
  getBusinessAdmin(_id: $_id) {
    _id
    business_keeping_unit
    business_system_name
    fy_end_month
    accounting_method
    logo
    date_format
    location_id {
      _id
    }
    owner_id {
      id
      email
      first_name
      last_name
      phone
      user_keeping_unit
    }
    status
    created_at
    unique_code
    store_type
    Country {
      _id
      name
    }
    number_of_stores
    currency_id
    store_types {
      independent_repair_store
      franchise
      franchise_OEM
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetBusinessAdminGQL extends Apollo.Query<GetBusinessAdminQuery, GetBusinessAdminQueryVariables> {
    document = GetBusinessAdminDocument;
    
  }
export const GetUserDetailDocument = gql`
    query getUserDetail {
  me {
    id
    is_clocked_in
    email
    created_at
    first_name
    last_name
    phone
    avatar_location
    status
    business_id {
      _id
    }
    address_1
    address_2
    city
    state
    Country {
      _id
      name
    }
    zipcode
    user_keeping_unit
    roles
    salaryHour
    is_deleted
    BusinessLocation {
      _id
      store_name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserDetailGQL extends Apollo.Query<GetUserDetailQuery, GetUserDetailQueryVariables> {
    document = GetUserDetailDocument;
    
  }
export const GetUsersLogsActivityDocument = gql`
    query getUsersLogsActivity($input: searchUserActivityLog) {
  getUsersLogsActivity(input: $input) {
    logs {
      User {
        id
        email
        first_name
        last_name
      }
      ip_address
      location
      access_type
      application
      date
      day
      time
    }
    last_login
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUsersLogsActivityGQL extends Apollo.Query<GetUsersLogsActivityQuery, GetUsersLogsActivityQueryVariables> {
    document = GetUsersLogsActivityDocument;
    
  }
export const BusinessLogoDeleteDocument = gql`
    mutation businessLogoDelete($business_id: ID!) {
  businessLogoDelete(business_id: $business_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class BusinessLogoDeleteGQL extends Apollo.Mutation<BusinessLogoDeleteMutation, BusinessLogoDeleteMutationVariables> {
    document = BusinessLogoDeleteDocument;
    
  }
export const UserLogoDeleteDocument = gql`
    mutation userLogoDelete($user_id: ID!) {
  userLogoDelete(user_id: $user_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserLogoDeleteGQL extends Apollo.Mutation<UserLogoDeleteMutation, UserLogoDeleteMutationVariables> {
    document = UserLogoDeleteDocument;
    
  }
export const StoreLogoDeleteDocument = gql`
    mutation storeLogoDelete($store_id: ID!) {
  storeLogoDelete(store_id: $store_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class StoreLogoDeleteGQL extends Apollo.Mutation<StoreLogoDeleteMutation, StoreLogoDeleteMutationVariables> {
    document = StoreLogoDeleteDocument;
    
  }
export const GeneratePinCodeDocument = gql`
    query generatePinCode {
  generatePinCode
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GeneratePinCodeGQL extends Apollo.Query<GeneratePinCodeQuery, GeneratePinCodeQueryVariables> {
    document = GeneratePinCodeDocument;
    
  }
export const CreatePinCodeDocument = gql`
    mutation createPinCode($input: createPincodeInput!) {
  createPinCode(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePinCodeGQL extends Apollo.Mutation<CreatePinCodeMutation, CreatePinCodeMutationVariables> {
    document = CreatePinCodeDocument;
    
  }
export const GetUserPinCodeByIdDocument = gql`
    query getUserPinCodeById($userId: ID!) {
  getUserPinCodeById(userId: $userId) {
    _id
    pincode
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserPinCodeByIdGQL extends Apollo.Query<GetUserPinCodeByIdQuery, GetUserPinCodeByIdQueryVariables> {
    document = GetUserPinCodeByIdDocument;
    
  }
export const UserPinCodeResendDocument = gql`
    mutation userPinCodeResend($userID: ID!, $method: AllowMethodPhoneVerify, $password: String) {
  userPinCodeResend(userID: $userID, method: $method, password: $password)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserPinCodeResendGQL extends Apollo.Mutation<UserPinCodeResendMutation, UserPinCodeResendMutationVariables> {
    document = UserPinCodeResendDocument;
    
  }
export const GetCashRegisterByIdDocument = gql`
    query getCashRegisterById($id: ID) {
  getCashRegisterById(id: $id) {
    name
    _id
    cash_register_keeping_unit
    opening_amount
    closing_amount
    closed_at
    status
    location_id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCashRegisterByIdGQL extends Apollo.Query<GetCashRegisterByIdQuery, GetCashRegisterByIdQueryVariables> {
    document = GetCashRegisterByIdDocument;
    
  }
export const GetCashDrawerLogsDocument = gql`
    query getCashDrawerLogs($businessLocation: ID, $cashRegisterID: ID) {
  getCashDrawerLogs(businessLocation: $businessLocation, cashRegisterID: $cashRegisterID) {
    CashRegisters {
      opening_amount
      closing_amount
      closed_at
    }
    User {
      first_name
      last_name
    }
    openCashDrawerType
    remarks
    amount
    created_at
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCashDrawerLogsGQL extends Apollo.Query<GetCashDrawerLogsQuery, GetCashDrawerLogsQueryVariables> {
    document = GetCashDrawerLogsDocument;
    
  }
export const UniquePinCodeVerifyDocument = gql`
    query uniquePinCodeVerify($pincode: Int!) {
  uniquePinCodeVerify(pincode: $pincode)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UniquePinCodeVerifyGQL extends Apollo.Query<UniquePinCodeVerifyQuery, UniquePinCodeVerifyQueryVariables> {
    document = UniquePinCodeVerifyDocument;
    
  }
export const CreateCashRegisterDocument = gql`
    mutation createCashRegister($input: cashRegisterInput) {
  createCashRegister(input: $input) {
    _id
    name
    cash_register_keeping_unit
    status
    opening_amount
    closing_amount
    closed_at
    business_id
    location_id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCashRegisterGQL extends Apollo.Mutation<CreateCashRegisterMutation, CreateCashRegisterMutationVariables> {
    document = CreateCashRegisterDocument;
    
  }
export const UpdateCashRegisterDocument = gql`
    mutation updateCashRegister($id: ID!, $input: cashRegisterInput) {
  updateCashRegister(id: $id, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCashRegisterGQL extends Apollo.Mutation<UpdateCashRegisterMutation, UpdateCashRegisterMutationVariables> {
    document = UpdateCashRegisterDocument;
    
  }
export const DeleteCashRegisterDocument = gql`
    mutation deleteCashRegister($id: ID!) {
  deleteCashRegister(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteCashRegisterGQL extends Apollo.Mutation<DeleteCashRegisterMutation, DeleteCashRegisterMutationVariables> {
    document = DeleteCashRegisterDocument;
    
  }
export const SearchSystemSupplierDocument = gql`
    query searchSystemSupplier($search: String!) {
  searchSystemSupplier(search: $search) {
    _id
    supplier_company
    supplier_company_phone
    website
    address_1
    address_2
    city
    state
    zip_code
    Country {
      _id
      name
      short_name
      is_active
      identification_types
    }
    supplier_first_name
    supplier_last_name
    supplier_phone
    supplier_mobile
    supplier_email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchSystemSupplierGQL extends Apollo.Query<SearchSystemSupplierQuery, SearchSystemSupplierQueryVariables> {
    document = SearchSystemSupplierDocument;
    
  }
export const CreateSupplierDocument = gql`
    mutation createSupplier($input: supplierInput) {
  createSupplier(input: $input) {
    _id
    supplier_company
    supplier_company_phone
    supplier_company_email
    website
    address_1
    address_2
    city
    state
    zip_code
    is_verify_supplier
    is_buyback
    supplier_keeping_unit
    Country {
      _id
      name
    }
    supplier_first_name
    supplier_last_name
    supplier_phone
    supplier_mobile
    supplier_email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSupplierGQL extends Apollo.Mutation<CreateSupplierMutation, CreateSupplierMutationVariables> {
    document = CreateSupplierDocument;
    
  }
export const SupplierChangeBuybackDocument = gql`
    mutation supplierChangeBuyback($id: ID!, $input: Boolean!) {
  SupplierChangeBuyBack(_id: $id, isBuyBack: $input) {
    _id
    supplier_company
    is_buyback
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SupplierChangeBuybackGQL extends Apollo.Mutation<SupplierChangeBuybackMutation, SupplierChangeBuybackMutationVariables> {
    document = SupplierChangeBuybackDocument;
    
  }
export const SupplierDocument = gql`
    query Supplier($location_id: ID, $limit: Int, $skip: Int) {
  suppliers(location_id: $location_id, limit: $limit, skip: $skip) {
    _id
    supplier_company
    supplier_company_phone
    supplier_company_email
    website
    address_1
    address_2
    city
    state
    zip_code
    supplier_keeping_unit
    is_verify_supplier
    is_buyback
    Country {
      _id
      name
    }
    supplier_first_name
    supplier_last_name
    supplier_phone
    supplier_mobile
    supplier_email
    payment_settings {
      paymentType {
        _id
        name
        icon
      }
      isActive
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SupplierGQL extends Apollo.Query<SupplierQuery, SupplierQueryVariables> {
    document = SupplierDocument;
    
  }
export const GetBrandWiseDevicesDocument = gql`
    query getBrandWiseDevices($search: String!, $location_id: ID!) {
  getBrandWiseDevices(search: $search, location_id: $location_id) {
    _id
    brand_name
    system_devices {
      _id
      product_name
      product_price
      is_system_created
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetBrandWiseDevicesGQL extends Apollo.Query<GetBrandWiseDevicesQuery, GetBrandWiseDevicesQueryVariables> {
    document = GetBrandWiseDevicesDocument;
    
  }
export const CompareSupplierWithSystemDocument = gql`
    query compareSupplierWithSystem($input: systemSupplierInput) {
  compareSupplierWithSystem(input: $input) {
    _id
    supplier_company
    supplier_company_phone
    supplier_company_email
    website
    address_1
    address_2
    city
    state
    zip_code
    Country {
      _id
      name
    }
    supplier_first_name
    supplier_last_name
    supplier_phone
    supplier_mobile
    supplier_email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CompareSupplierWithSystemGQL extends Apollo.Query<CompareSupplierWithSystemQuery, CompareSupplierWithSystemQueryVariables> {
    document = CompareSupplierWithSystemDocument;
    
  }
export const GetAllSupplierRestockDocument = gql`
    query getAllSupplierRestock($location_id: ID!, $search: String) {
  getAllSupplierRestock(location_id: $location_id, search: $search) {
    _id
    supplier_company
    supplier_company_phone
    supplier_company_email
    website
    address_1
    address_2
    city
    state
    zip_code
    supplier_keeping_unit
    is_verify_supplier
    is_buyback
    Country {
      _id
      name
    }
    supplier_first_name
    supplier_last_name
    supplier_phone
    supplier_mobile
    supplier_email
    payment_settings {
      paymentType {
        _id
        name
        icon
      }
      isActive
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllSupplierRestockGQL extends Apollo.Query<GetAllSupplierRestockQuery, GetAllSupplierRestockQueryVariables> {
    document = GetAllSupplierRestockDocument;
    
  }
export const ImportSuppliersDataDocument = gql`
    mutation importSuppliersData($input: [importSupplierInput]) {
  importSuppliersData(input: $input) {
    alreadyExistSuppliers {
      _id
      supplier_company
      supplier_company_phone
      supplier_company_email
      website
      address_1
      address_2
      city
      state
      zip_code
      Country {
        _id
        name
      }
      supplier_first_name
      supplier_last_name
      supplier_phone
      supplier_mobile
      supplier_email
    }
    suppliersInvalidData {
      _id
      supplier_company
      supplier_company_phone
      supplier_company_email
      website
      address_1
      address_2
      city
      state
      zip_code
      Country {
        _id
        name
      }
      supplier_first_name
      supplier_last_name
      supplier_phone
      supplier_mobile
      supplier_email
    }
    newlyAddedSuppliers {
      _id
      supplier_company
      supplier_company_phone
      supplier_company_email
      website
      address_1
      address_2
      city
      state
      zip_code
      Country {
        _id
        name
      }
      supplier_first_name
      supplier_last_name
      supplier_phone
      supplier_mobile
      supplier_email
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ImportSuppliersDataGQL extends Apollo.Mutation<ImportSuppliersDataMutation, ImportSuppliersDataMutationVariables> {
    document = ImportSuppliersDataDocument;
    
  }
export const CreateShippingTypeDocument = gql`
    mutation createShippingType($input: ShippingTypeInput!) {
  createShippingType(input: $input) {
    _id
    shipment_name
    shipment_price
    delivery_time_days
    threshold
    hours
    minutes
    am_pm
    time_zone
    icon
    BusinessLocation {
      _id
      store_name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateShippingTypeGQL extends Apollo.Mutation<CreateShippingTypeMutation, CreateShippingTypeMutationVariables> {
    document = CreateShippingTypeDocument;
    
  }
export const GetAllShippingTypeDocument = gql`
    query getAllShippingType($location_id: ID!, $limit: Int, $skip: Int, $supplierID: ID) {
  getAllShippingType(location_id: $location_id, limit: $limit, skip: $skip, supplierID: $supplierID) {
    _id
    shipment_name
    shipment_price
    delivery_time_days
    threshold
    icon
    hours
    minutes
    am_pm
    time_zone
    tracking_url
    BusinessLocation {
      _id
      store_name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllShippingTypeGQL extends Apollo.Query<GetAllShippingTypeQuery, GetAllShippingTypeQueryVariables> {
    document = GetAllShippingTypeDocument;
    
  }
export const UpdateShippingTypeDocument = gql`
    mutation updateShippingType($id: ID!, $input: ShippingTypeInput!) {
  updateShippingType(id: $id, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateShippingTypeGQL extends Apollo.Mutation<UpdateShippingTypeMutation, UpdateShippingTypeMutationVariables> {
    document = UpdateShippingTypeDocument;
    
  }
export const GetShippingTypeDocument = gql`
    query getShippingType($id: ID!) {
  getShippingType(id: $id) {
    _id
    shipment_name
    shipment_price
    delivery_time_days
    hours
    minutes
    am_pm
    time_zone
    threshold
    icon
    BusinessLocation {
      _id
      store_name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetShippingTypeGQL extends Apollo.Query<GetShippingTypeQuery, GetShippingTypeQueryVariables> {
    document = GetShippingTypeDocument;
    
  }
export const DeleteShippingTypeDocument = gql`
    mutation deleteShippingType($id: ID!) {
  deleteShippingType(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteShippingTypeGQL extends Apollo.Mutation<DeleteShippingTypeMutation, DeleteShippingTypeMutationVariables> {
    document = DeleteShippingTypeDocument;
    
  }
export const RemovedMultiSuppliersDocument = gql`
    mutation removedMultiSuppliers($id: [ID!]) {
  removedMultiSuppliers(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemovedMultiSuppliersGQL extends Apollo.Mutation<RemovedMultiSuppliersMutation, RemovedMultiSuppliersMutationVariables> {
    document = RemovedMultiSuppliersDocument;
    
  }
export const GetAllSuppliersDocument = gql`
    query getAllSuppliers {
  suppliers {
    _id
    supplier_company
    supplier_company_phone
    supplier_company_email
    website
    address_1
    address_2
    city
    state
    zip_code
    supplier_keeping_unit
    Country {
      _id
      name
    }
    supplier_first_name
    supplier_last_name
    supplier_phone
    supplier_mobile
    supplier_email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllSuppliersGQL extends Apollo.Query<GetAllSuppliersQuery, GetAllSuppliersQueryVariables> {
    document = GetAllSuppliersDocument;
    
  }
export const RemovedSupplierDocument = gql`
    mutation removedSupplier($id: ID!) {
  removedSupplier(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemovedSupplierGQL extends Apollo.Mutation<RemovedSupplierMutation, RemovedSupplierMutationVariables> {
    document = RemovedSupplierDocument;
    
  }
export const UpdateSupplierDocument = gql`
    mutation updateSupplier($id: ID!, $input: supplierInput) {
  updateSupplier(id: $id, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateSupplierGQL extends Apollo.Mutation<UpdateSupplierMutation, UpdateSupplierMutationVariables> {
    document = UpdateSupplierDocument;
    
  }
export const CheckSupplierEmailAndCompanyPhoneDocument = gql`
    query checkSupplierEmailAndCompanyPhone($supplierField: String!, $type: String!) {
  checkSupplierEmailAndCompanyPhone(supplierField: $supplierField, type: $type)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CheckSupplierEmailAndCompanyPhoneGQL extends Apollo.Query<CheckSupplierEmailAndCompanyPhoneQuery, CheckSupplierEmailAndCompanyPhoneQueryVariables> {
    document = CheckSupplierEmailAndCompanyPhoneDocument;
    
  }
export const CreateProductDocument = gql`
    mutation createProduct($input: productInput) {
  createProduct(input: $input) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateProductGQL extends Apollo.Mutation<CreateProductMutation, CreateProductMutationVariables> {
    document = CreateProductDocument;
    
  }
export const GetProductbyIdDocument = gql`
    query getProductbyID($id: ID, $locationId: ID!) {
  getProductbyID(id: $id, locationId: $locationId) {
    _id
    product_name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProductbyIdGQL extends Apollo.Query<GetProductbyIdQuery, GetProductbyIdQueryVariables> {
    document = GetProductbyIdDocument;
    
  }
export const ProductsBySupplierDocument = gql`
    query ProductsBySupplier($supplierId: ID!, $locationId: ID!, $stock: String) {
  ProductsBySupplier(supplierId: $supplierId, locationId: $locationId, stock: $stock) {
    _id
    product_name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ProductsBySupplierGQL extends Apollo.Query<ProductsBySupplierQuery, ProductsBySupplierQueryVariables> {
    document = ProductsBySupplierDocument;
    
  }
export const DeleteProductDocument = gql`
    mutation deleteProduct($productIds: [ID]) {
  deleteProduct(productIds: $productIds)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteProductGQL extends Apollo.Mutation<DeleteProductMutation, DeleteProductMutationVariables> {
    document = DeleteProductDocument;
    
  }
export const CreateBrandDocument = gql`
    mutation createBrand($input: brandInput) {
  createBrand(input: $input) {
    _id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateBrandGQL extends Apollo.Mutation<CreateBrandMutation, CreateBrandMutationVariables> {
    document = CreateBrandDocument;
    
  }
export const UpdateProductDocument = gql`
    mutation updateProduct($id: ID!, $input: productInput) {
  updateProduct(id: $id, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateProductGQL extends Apollo.Mutation<UpdateProductMutation, UpdateProductMutationVariables> {
    document = UpdateProductDocument;
    
  }
export const GetCountriesDocument = gql`
    query getCountries {
  countries {
    _id
    name
    short_name
    identification_types
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCountriesGQL extends Apollo.Query<GetCountriesQuery, GetCountriesQueryVariables> {
    document = GetCountriesDocument;
    
  }
export const GetPurchaseOrdersAndSearchDocument = gql`
    query getPurchaseOrdersAndSearch($input: searchInput) {
  getPurchaseOrdersAndSearch(input: $input) {
    transaction {
      _id
      order_status
      transaction_type
      transaction_keeping_unit
      shipping_tracking_no
      shipping_company_name
      created_at
      transaction_date
      arrival_Date
      remaining_amount
      total_amount
      dynamic_status {
        status_name
        status_font_color
        status_background_color
        status_icon
      }
      dynamic_status_list {
        status_name
        status_font_color
        status_background_color
        status_icon
      }
      sub_total_amount
      tax_amount
      ShippingType {
        _id
        shipment_name
        shipment_price
        delivery_time_days
        hours
        minutes
        am_pm
        time_zone
        threshold
        icon
      }
      Supplier {
        _id
        supplier_company
      }
      received_additional_cost
    }
    suppliers {
      _id
      supplier_company
    }
    available_status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetPurchaseOrdersAndSearchGQL extends Apollo.Query<GetPurchaseOrdersAndSearchQuery, GetPurchaseOrdersAndSearchQueryVariables> {
    document = GetPurchaseOrdersAndSearchDocument;
    
  }
export const ImportSearchProductsDocument = gql`
    query importSearchProducts($search: [String!], $locationId: ID!) {
  importSearchProducts(search: $search, locationId: $locationId) {
    _id
    product_name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ImportSearchProductsGQL extends Apollo.Query<ImportSearchProductsQuery, ImportSearchProductsQueryVariables> {
    document = ImportSearchProductsDocument;
    
  }
export const GetSupplierPurchaseHistoryDocument = gql`
    query GetSupplierPurchaseHistory($supplierID: ID!, $businessLocation: ID!) {
  GetSupplierPurchaseHistory(supplierID: $supplierID, businessLocation: $businessLocation) {
    totalAmount
    avgItemPerVisit
    totalVisiter
    avgPurchase
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSupplierPurchaseHistoryGQL extends Apollo.Query<GetSupplierPurchaseHistoryQuery, GetSupplierPurchaseHistoryQueryVariables> {
    document = GetSupplierPurchaseHistoryDocument;
    
  }
export const GetAllProductAccountsDocument = gql`
    query GetAllProductAccounts {
  GetAllProductAccounts {
    expenses {
      _id
      account_code
      account_name
      slug
      parent_account_Id {
        account_name
      }
    }
    income {
      _id
      account_code
      account_name
      slug
      parent_account_Id {
        account_name
      }
    }
    inventory {
      _id
      account_code
      account_name
      slug
      parent_account_Id {
        account_name
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllProductAccountsGQL extends Apollo.Query<GetAllProductAccountsQuery, GetAllProductAccountsQueryVariables> {
    document = GetAllProductAccountsDocument;
    
  }
export const GetSupplierPurchaseOrdersDocument = gql`
    query GetSupplierPurchaseOrders($supplierID: ID!, $businessLocation: ID!) {
  GetSupplierPurchaseOrders(supplierID: $supplierID, businessLocation: $businessLocation) {
    transaction_date
    order_status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSupplierPurchaseOrdersGQL extends Apollo.Query<GetSupplierPurchaseOrdersQuery, GetSupplierPurchaseOrdersQueryVariables> {
    document = GetSupplierPurchaseOrdersDocument;
    
  }
export const GetSupplierPurchasePaymentsDocument = gql`
    query GetSupplierPurchasePayments($supplierID: ID!, $businessLocation: ID!) {
  GetSupplierPurchasePayments(supplierID: $supplierID, businessLocation: $businessLocation) {
    amount
    method
    paid_on
    Transaction {
      order_status
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSupplierPurchasePaymentsGQL extends Apollo.Query<GetSupplierPurchasePaymentsQuery, GetSupplierPurchasePaymentsQueryVariables> {
    document = GetSupplierPurchasePaymentsDocument;
    
  }
export const GetSupplierPurchaseBillsDocument = gql`
    query GetSupplierPurchaseBills($supplierID: ID!, $businessLocation: ID!) {
  GetSupplierPurchaseBills(supplierID: $supplierID, businessLocation: $businessLocation) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSupplierPurchaseBillsGQL extends Apollo.Query<GetSupplierPurchaseBillsQuery, GetSupplierPurchaseBillsQueryVariables> {
    document = GetSupplierPurchaseBillsDocument;
    
  }
export const GetAllDeviceModelByBrandDocument = gql`
    query getAllDeviceModelByBrand($id: ID!) {
  getAllDeviceModelByBrand(brandId: $id) {
    _id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllDeviceModelByBrandGQL extends Apollo.Query<GetAllDeviceModelByBrandQuery, GetAllDeviceModelByBrandQueryVariables> {
    document = GetAllDeviceModelByBrandDocument;
    
  }
export const CreateDeviceModelDocument = gql`
    mutation createDeviceModel($input: deviceModelInput) {
  createDeviceModel(input: $input) {
    _id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateDeviceModelGQL extends Apollo.Mutation<CreateDeviceModelMutation, CreateDeviceModelMutationVariables> {
    document = CreateDeviceModelDocument;
    
  }
export const GetAllCompatibleDeviceTagsDocument = gql`
    query getAllCompatibleDeviceTags($search: String!) {
  searchDeviceTags(search: $search) {
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllCompatibleDeviceTagsGQL extends Apollo.Query<GetAllCompatibleDeviceTagsQuery, GetAllCompatibleDeviceTagsQueryVariables> {
    document = GetAllCompatibleDeviceTagsDocument;
    
  }
export const UniqueSkuNumberForProductDocument = gql`
    query uniqueSKUNumberForProduct($locationId: ID, $sku: String) {
  uniqueSKUNumberForProduct(locationId: $locationId, sku: $sku)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UniqueSkuNumberForProductGQL extends Apollo.Query<UniqueSkuNumberForProductQuery, UniqueSkuNumberForProductQueryVariables> {
    document = UniqueSkuNumberForProductDocument;
    
  }
export const UniqueSkUNumberForSupplierDocument = gql`
    query uniqueSkUNumberForSupplier($locationId: ID, $sku_number: String, $supplier_id: ID) {
  uniqueSkUNumberForSupplier(locationId: $locationId, sku_number: $sku_number, supplier_id: $supplier_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UniqueSkUNumberForSupplierGQL extends Apollo.Query<UniqueSkUNumberForSupplierQuery, UniqueSkUNumberForSupplierQueryVariables> {
    document = UniqueSkUNumberForSupplierDocument;
    
  }
export const GetAllAccountTypeWiseDocument = gql`
    query getAllAccountTypeWise($search: String, $type: Account_Type) {
  GetAllAccountTypeWise(search: $search, type: $type) {
    _id
    account_code
    account_name
    slug
    account_type_Id {
      _id
      title
    }
    parent_account_Id {
      _id
      account_name
    }
    Opening_balance
    account_balance
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllAccountTypeWiseGQL extends Apollo.Query<GetAllAccountTypeWiseQuery, GetAllAccountTypeWiseQueryVariables> {
    document = GetAllAccountTypeWiseDocument;
    
  }
export const GetProductsAndSearchDocument = gql`
    query getProductsAndSearch($locationId: ID, $search: String, $limit: Int, $skip: Int, $filterType: filterType, $is_deleted: Boolean, $productType: productTypes) {
  getProductsAndSearch(locationId: $locationId, search: $search, limit: $limit, skip: $skip, filterType: $filterType, is_deleted: $is_deleted, productType: $productType) {
    _id
    product_name
    description
    image
    is_bundle_product
    bundle_products {
      bundleProduct {
        bundleProductID {
          _id
          product_name
          is_product
          ProductStockPrice {
            qty_available
            alert_quantity
            average_cost
          }
        }
        quantity
        selling_price
        avg_cost
      }
      is_manufactured_qty
      total_selling_price
      total_avg_cost
    }
    max_bundle
    is_product
    is_track_stock
    alert_qty
    ideal_qty
    is_serial_number
    openingStock
    sell_price
    sell_price_inc_tax
    Brand {
      _id
      brand_name
    }
    DeviceModel {
      _id
      name
    }
    barcode
    sku
    is_completed_product
    compatilable_devices
    average_cost
    last_cost
    image
    Suppliers {
      supplier_id {
        _id
        supplier_company
        supplier_company_phone
        website
      }
      sku_number
      current_stock
    }
    Business {
      _id
      business_keeping_unit
      business_system_name
    }
    BusinessLocation {
      _id
      store_name
      store_nick_name
      location_keeping_unit
    }
    tags
    sale_item
    total_sale
    incoming_item
    ProductStockPrice {
      _id
      Product {
        _id
      }
      income_account {
        _id
        account_name
      }
      expense_account {
        _id
        account_name
      }
      inventory_account {
        _id
        account_name
      }
      discount_amount
      percentage_discount
      price_without_bundle
      default_sell_price
      total_cost
      ideal_quantity
      opening_stock
      qty_available
      alert_quantity
      shelf_qty
      order_qty
      is_profit_percentage
      profit_value
      profit_amount
      default_sell_price
      SellTax {
        _id
        name
        amount
        is_percentage
        is_tax_group
      }
      is_sell_tax_percentage
      sell_tax_value
      sell_tax_amount
      sell_price_inc_tax
      last_cost
      average_cost
    }
    servicesBrandModel {
      ServiceBrand {
        _id
        brand_name
      }
      ServiceDeviceModel {
        _id
        name
      }
      service_max_price
      service_min_price
      ServiceItem {
        _id
        product_name
      }
    }
    isAddedDeviceModel
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProductsAndSearchGQL extends Apollo.Query<GetProductsAndSearchQuery, GetProductsAndSearchQueryVariables> {
    document = GetProductsAndSearchDocument;
    
  }
export const GetProductsforAddBundleProductDocument = gql`
    query getProductsforAddBundleProduct($locationId: ID, $is_service: Boolean, $search: String, $brandID: ID, $modelID: ID) {
  getProductsforAddBundleProduct(locationId: $locationId, is_service: $is_service, search: $search, brandID: $brandID, modelID: $modelID) {
    _id
    is_product
    product_name
    sell_price
    ProductStockPrice {
      qty_available
      average_cost
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProductsforAddBundleProductGQL extends Apollo.Query<GetProductsforAddBundleProductQuery, GetProductsforAddBundleProductQueryVariables> {
    document = GetProductsforAddBundleProductDocument;
    
  }
export const GenerateSkuNumberDocument = gql`
    mutation generateSKUNumber {
  generateSKUNumber
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GenerateSkuNumberGQL extends Apollo.Mutation<GenerateSkuNumberMutation, GenerateSkuNumberMutationVariables> {
    document = GenerateSkuNumberDocument;
    
  }
export const CreateChartOfAccountByTypeDocument = gql`
    mutation createChartOfAccountByType($input: ChartOfAccountInput, $account_type: Account_Type) {
  createChartOfAccountByType(input: $input, account_type: $account_type) {
    _id
    account_code
    account_name
    slug
    account_type_Id {
      _id
      title
    }
    parent_account_Id {
      _id
      account_name
    }
    Opening_balance
    account_balance
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateChartOfAccountByTypeGQL extends Apollo.Mutation<CreateChartOfAccountByTypeMutation, CreateChartOfAccountByTypeMutationVariables> {
    document = CreateChartOfAccountByTypeDocument;
    
  }
export const CreatePurchaseOrderDocument = gql`
    mutation createPurchaseOrder($input: createPurchaseOrderInput, $transactionId: ID) {
  createPurchaseOrder(input: $input, transactionId: $transactionId) {
    _id
    transaction_keeping_unit
    transaction_type
    received_additional_cost
    discount_value
    discount_amount
    transaction_type
    transaction_date
    dynamic_status {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    Supplier {
      _id
      supplier_keeping_unit
      supplier_company
      supplier_company_phone
      payment_settings {
        paymentType {
          _id
          name
          icon
        }
        isActive
      }
    }
    refund_amount
    shipping_amount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePurchaseOrderGQL extends Apollo.Mutation<CreatePurchaseOrderMutation, CreatePurchaseOrderMutationVariables> {
    document = CreatePurchaseOrderDocument;
    
  }
export const SaveManufacturedBundleDocument = gql`
    mutation saveManufacturedBundle($input: [BundleInput]) {
  saveManufacturedBundle(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveManufacturedBundleGQL extends Apollo.Mutation<SaveManufacturedBundleMutation, SaveManufacturedBundleMutationVariables> {
    document = SaveManufacturedBundleDocument;
    
  }
export const CreateManufacturedBundleDocument = gql`
    mutation createManufacturedBundle($input: [BundleInput]) {
  createManufacturedBundle(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateManufacturedBundleGQL extends Apollo.Mutation<CreateManufacturedBundleMutation, CreateManufacturedBundleMutationVariables> {
    document = CreateManufacturedBundleDocument;
    
  }
export const PurchaseOrderReceivingDocument = gql`
    mutation purchaseOrderReceiving($transactionId: ID!, $extra_Items: [inputOrderReceivingProduct], $input: purchaseOrderReceivingInput, $btnCaption: String!) {
  purchaseOrderReceiving(transactionId: $transactionId, extra_Items: $extra_Items, input: $input, btnCaption: $btnCaption) {
    _id
    transaction_keeping_unit
    transaction_type
    received_additional_cost
    discount_value
    discount_amount
    transaction_type
    transaction_date
    supplier_rma_number
    cancel_by {
      first_name
      last_name
    }
    cancel_at
    updated_by {
      first_name
      last_name
    }
    arrival_Date
    updated_at
    supplier_order_number
    created_by {
      id
      first_name
      last_name
    }
    Tax {
      _id
      name
      amount
      tax_type
      is_percentage
    }
    tax_amount
    tax_value
    is_tax_percentage
    shipping_company_name
    shipping_tracking_no
    shipping_estimated_days
    dynamic_status {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    ShippingType {
      _id
      shipment_name
      shipment_price
      delivery_time_days
      threshold
      icon
    }
    total_amount
    sub_total_amount
    remaining_amount
    is_private
    additional_notes
    received_note
    TransactionPayment {
      _id
      amount
      method
      paid_on
      card_used_no
    }
    Supplier {
      _id
      supplier_keeping_unit
      supplier_company
      supplier_company_phone
      payment_settings {
        paymentType {
          _id
          name
          icon
        }
        isActive
      }
    }
    TransactionPurchaseLine {
      _id
      stock_sku_number
      quantity
      receiving_quantity
      receive_quantity
      Product {
        _id
        product_name
        description
        sku
      }
      product_cost_price
      is_extra_item
      total_amount
    }
    TransactionBuyBackLine {
      _id
      System_Device {
        _id
        product_name
        product_price
        product_brand {
          _id
          brand_name
        }
      }
      quantity
      device_price
      sub_total
      total_amount
      received_qty
      approve_qty
    }
    BusinessLocation {
      address_1
    }
    created_at
    dynamic_status_list {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    is_additional_cost
    is_extra_items
    is_missing_items
    order_estimate_amount
    ReceivingLogs {
      _id
      stock_sku_number
      Product {
        product_name
      }
      receivedDate
      quantity
      receive_quantity
      quantity_returned
    }
    refund_amount
    shipping_amount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PurchaseOrderReceivingGQL extends Apollo.Mutation<PurchaseOrderReceivingMutation, PurchaseOrderReceivingMutationVariables> {
    document = PurchaseOrderReceivingDocument;
    
  }
export const GetProductAndBundlebySupplierDocument = gql`
    query getProductAndBundlebySupplier($input: inputSearchProductWithSuppler) {
  getProductAndBundlebySupplier(input: $input) {
    Transaction {
      _id
      sub_total_amount
      Tax {
        _id
        name
        amount
        tax_type
        is_percentage
      }
      transaction_date
      transaction_keeping_unit
      remaining_amount
      arrival_Date
      discount_amount
      discount_value
      shipping_amount
      tax_amount
      tax_value
      is_discount_percentage
      transaction_hours
      transaction_minutes
      transaction_am_pm
      is_tax_percentage
      shipping_company_name
      shipping_tracking_no
      shipping_estimated_days
      ShippingType {
        _id
        shipment_name
        shipment_price
        delivery_time_days
        hours
        minutes
        am_pm
        time_zone
        threshold
        icon
      }
      TransactionPayment {
        _id
        amount
        method
        paid_on
        card_used_no
      }
      total_amount
      is_private
      additional_notes
      received_note
      Supplier {
        _id
        supplier_keeping_unit
        supplier_company
        supplier_company_phone
        payment_settings {
          paymentType {
            _id
            name
            icon
          }
          isActive
        }
      }
    }
    ProductList {
      _id
      product_name
      is_bundle_product
      sku
      incoming_item
      Suppliers {
        supplier_id {
          supplier_company
        }
        sku_number
        incoming_item
        instock
        ordered_qty
        price_purchase
        productPrices {
          bundle_order_qty
          qty_available
          average_cost
          alert_quantity
          default_sell_price
        }
      }
      sell_price_inc_tax
      average_cost
      max_bundle
      ProductStockPrice {
        bundle_order_qty
        qty_available
        average_cost
        alert_quantity
        default_sell_price
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProductAndBundlebySupplierGQL extends Apollo.Query<GetProductAndBundlebySupplierQuery, GetProductAndBundlebySupplierQueryVariables> {
    document = GetProductAndBundlebySupplierDocument;
    
  }
export const CreatePurchaseOrderpaymentDocument = gql`
    mutation createPurchaseOrderpayment($input: inputPurchaseOrderPaymentMethod) {
  createPurchaseOrderpayment(input: $input) {
    _id
    amount
    method
    paid_on
    card_used_no
    Transaction {
      dynamic_status {
        status_name
        status_font_color
        status_background_color
        status_icon
      }
      dynamic_status_list {
        status_name
        status_font_color
        status_background_color
        status_icon
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePurchaseOrderpaymentGQL extends Apollo.Mutation<CreatePurchaseOrderpaymentMutation, CreatePurchaseOrderpaymentMutationVariables> {
    document = CreatePurchaseOrderpaymentDocument;
    
  }
export const GetAllOrderStatusDocument = gql`
    query getAllOrderStatus {
  GetAllOrderStatus {
    status_name
    status_font_color
    status_background_color
    status_icon
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllOrderStatusGQL extends Apollo.Query<GetAllOrderStatusQuery, GetAllOrderStatusQueryVariables> {
    document = GetAllOrderStatusDocument;
    
  }
export const GetTaxsByLocationDocument = gql`
    query getTaxsByLocation($location_id: ID!, $taxType: TaxTypeEnum) {
  getTaxsByLocation(location_id: $location_id, taxType: $taxType) {
    _id
    name
    amount
    tax_type
    is_percentage
    is_tax_group
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTaxsByLocationGQL extends Apollo.Query<GetTaxsByLocationQuery, GetTaxsByLocationQueryVariables> {
    document = GetTaxsByLocationDocument;
    
  }
export const OrderStatusUpdateDocument = gql`
    mutation orderStatusUpdate($orderID: ID!, $order_status: String, $status_Input: statusInput) {
  OrderStatusUpdate(orderID: $orderID, order_status: $order_status, status_Input: $status_Input) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class OrderStatusUpdateGQL extends Apollo.Mutation<OrderStatusUpdateMutation, OrderStatusUpdateMutationVariables> {
    document = OrderStatusUpdateDocument;
    
  }
export const AddShippingDetailDocument = gql`
    mutation AddShippingDetail($orderID: ID!, $company_name: String!, $tracking_number: String!, $estimated_days: String!) {
  AddShippingDetail(orderID: $orderID, company_name: $company_name, tracking_number: $tracking_number, estimated_days: $estimated_days) {
    _id
    transaction_type
    transaction_status
    order_status
    shipping_tracking_no
    dynamic_status {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    dynamic_status_list {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    shipping_estimated_days
    shipping_company_name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddShippingDetailGQL extends Apollo.Mutation<AddShippingDetailMutation, AddShippingDetailMutationVariables> {
    document = AddShippingDetailDocument;
    
  }
export const GetPurchaseOrderbyIdDocument = gql`
    query getPurchaseOrderbyID($orderID: ID!) {
  getPurchaseOrderbyID(orderID: $orderID) {
    _id
    transaction_keeping_unit
    transaction_type
    received_additional_cost
    discount_value
    discount_amount
    transaction_type
    transaction_date
    supplier_rma_number
    cancel_by {
      first_name
      last_name
    }
    cancel_at
    updated_by {
      first_name
      last_name
    }
    arrival_Date
    updated_at
    supplier_order_number
    created_by {
      id
      first_name
      last_name
    }
    Tax {
      _id
      name
      amount
      tax_type
      is_percentage
    }
    tax_amount
    tax_value
    is_tax_percentage
    shipping_company_name
    shipping_tracking_no
    shipping_estimated_days
    dynamic_status {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    ShippingType {
      _id
      shipment_name
      tracking_url
      shipment_price
      delivery_time_days
      threshold
      icon
    }
    total_amount
    sub_total_amount
    remaining_amount
    is_private
    additional_notes
    received_note
    TransactionPayment {
      _id
      amount
      method
      paid_on
      card_used_no
    }
    Supplier {
      _id
      supplier_keeping_unit
      supplier_company
      supplier_company_phone
      payment_settings {
        paymentType {
          _id
          name
          icon
        }
        isActive
      }
    }
    TransactionPurchaseLine {
      _id
      stock_sku_number
      quantity
      receiving_quantity
      receive_quantity
      Product {
        _id
        product_name
        description
        sku
      }
      product_cost_price
      is_extra_item
      total_amount
    }
    TransactionBuyBackLine {
      _id
      System_Device {
        _id
        product_name
        product_price
        product_brand {
          _id
          brand_name
        }
      }
      quantity
      device_price
      sub_total
      total_amount
      received_qty
      approve_qty
    }
    BusinessLocation {
      address_1
    }
    created_at
    dynamic_status_list {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    is_additional_cost
    is_extra_items
    is_missing_items
    order_estimate_amount
    ReceivingLogs {
      _id
      stock_sku_number
      Product {
        product_name
      }
      receivedDate
      quantity
      receive_quantity
      quantity_returned
    }
    refund_amount
    shipping_amount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetPurchaseOrderbyIdGQL extends Apollo.Query<GetPurchaseOrderbyIdQuery, GetPurchaseOrderbyIdQueryVariables> {
    document = GetPurchaseOrderbyIdDocument;
    
  }
export const AddAdditionalCostDocument = gql`
    mutation addAdditionalCost($orderID: ID!, $amount: Float!) {
  addAdditionalCost(orderID: $orderID, amount: $amount) {
    _id
    transaction_keeping_unit
    transaction_type
    received_additional_cost
    discount_value
    discount_amount
    transaction_type
    transaction_date
    supplier_rma_number
    cancel_by {
      first_name
      last_name
    }
    cancel_at
    updated_by {
      first_name
      last_name
    }
    arrival_Date
    updated_at
    supplier_order_number
    created_by {
      id
      first_name
      last_name
    }
    Tax {
      _id
      name
      amount
      tax_type
      is_percentage
    }
    tax_amount
    tax_value
    is_tax_percentage
    shipping_company_name
    shipping_tracking_no
    shipping_estimated_days
    dynamic_status {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    ShippingType {
      _id
      shipment_name
      shipment_price
      delivery_time_days
      threshold
      icon
    }
    total_amount
    sub_total_amount
    remaining_amount
    is_private
    additional_notes
    received_note
    TransactionPayment {
      _id
      amount
      method
      paid_on
      card_used_no
    }
    Supplier {
      _id
      supplier_keeping_unit
      supplier_company
      supplier_company_phone
      payment_settings {
        paymentType {
          _id
          name
          icon
        }
        isActive
      }
    }
    TransactionPurchaseLine {
      _id
      stock_sku_number
      quantity
      receiving_quantity
      receive_quantity
      Product {
        _id
        product_name
        description
        sku
      }
      product_cost_price
      is_extra_item
      total_amount
    }
    TransactionBuyBackLine {
      _id
      System_Device {
        _id
        product_name
        product_price
        product_brand {
          _id
          brand_name
        }
      }
      quantity
      device_price
      sub_total
      total_amount
      received_qty
      approve_qty
    }
    BusinessLocation {
      address_1
    }
    created_at
    dynamic_status_list {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    is_additional_cost
    is_extra_items
    is_missing_items
    order_estimate_amount
    ReceivingLogs {
      _id
      stock_sku_number
      Product {
        product_name
      }
      receivedDate
      quantity
      receive_quantity
      quantity_returned
    }
    shipping_amount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddAdditionalCostGQL extends Apollo.Mutation<AddAdditionalCostMutation, AddAdditionalCostMutationVariables> {
    document = AddAdditionalCostDocument;
    
  }
export const SupplierPoListDocument = gql`
    query supplierPOList($input: SupplierOrderListingInput) {
  supplierPOList(input: $input) {
    transaction {
      _id
      transaction_keeping_unit
      received_additional_cost
      transaction_date
      transaction_type
      created_by {
        id
        first_name
        last_name
      }
      Tax {
        _id
        name
        amount
        tax_type
        is_percentage
      }
      tax_amount
      tax_value
      is_tax_percentage
      shipping_company_name
      shipping_tracking_no
      shipping_estimated_days
      dynamic_status {
        status_name
        status_font_color
        status_background_color
        status_icon
      }
      ShippingType {
        _id
        shipment_name
        shipment_price
        delivery_time_days
        threshold
        icon
      }
      total_amount
      sub_total_amount
      remaining_amount
      is_private
      additional_notes
      received_note
      TransactionPayment {
        _id
        amount
        method
        paid_on
      }
      Supplier {
        _id
        supplier_keeping_unit
        supplier_company
        supplier_company_phone
      }
      TransactionPurchaseLine {
        _id
        stock_sku_number
        quantity
        receiving_quantity
        receive_quantity
        Product {
          _id
          product_name
          description
          sku
        }
        product_cost_price
        total_amount
      }
      BusinessLocation {
        address_1
      }
      created_at
    }
    available_status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SupplierPoListGQL extends Apollo.Query<SupplierPoListQuery, SupplierPoListQueryVariables> {
    document = SupplierPoListDocument;
    
  }
export const PoSupplierOrderNumberDocument = gql`
    mutation poSupplierOrderNumber($orderID: ID!, $order_number: String!) {
  POSupplierOrderNumber(orderID: $orderID, order_number: $order_number) {
    _id
    transaction_keeping_unit
    transaction_type
    received_additional_cost
    transaction_type
    transaction_date
    supplier_order_number
    created_by {
      id
      first_name
      last_name
    }
    Tax {
      _id
      name
      amount
      tax_type
      is_percentage
    }
    tax_amount
    tax_value
    is_tax_percentage
    shipping_company_name
    shipping_tracking_no
    shipping_estimated_days
    dynamic_status {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    ShippingType {
      _id
      shipment_name
      shipment_price
      delivery_time_days
      threshold
      icon
    }
    total_amount
    sub_total_amount
    remaining_amount
    is_private
    additional_notes
    received_note
    TransactionPayment {
      _id
      amount
      method
      paid_on
    }
    Supplier {
      _id
      supplier_keeping_unit
      supplier_company
      supplier_company_phone
    }
    TransactionPurchaseLine {
      _id
      stock_sku_number
      quantity
      receiving_quantity
      receive_quantity
      Product {
        _id
        product_name
        description
        sku
      }
      product_cost_price
      is_extra_item
      total_amount
    }
    TransactionBuyBackLine {
      _id
      System_Device {
        _id
        product_name
        product_price
        product_brand {
          _id
          brand_name
        }
      }
      quantity
      device_price
      sub_total
      total_amount
    }
    BusinessLocation {
      address_1
    }
    created_at
    dynamic_status_list {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    is_additional_cost
    is_extra_items
    is_missing_items
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PoSupplierOrderNumberGQL extends Apollo.Mutation<PoSupplierOrderNumberMutation, PoSupplierOrderNumberMutationVariables> {
    document = PoSupplierOrderNumberDocument;
    
  }
export const DeletePaymentDocument = gql`
    mutation deletePayment($transactionId: ID!, $paymentId: ID!) {
  deletePayment(transactionId: $transactionId, paymentId: $paymentId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeletePaymentGQL extends Apollo.Mutation<DeletePaymentMutation, DeletePaymentMutationVariables> {
    document = DeletePaymentDocument;
    
  }
export const PoStatusUpdateDocument = gql`
    mutation POStatusUpdate($orderID: ID!, $status_type: POStatusName) {
  POStatusUpdate(orderID: $orderID, status_type: $status_type) {
    dynamic_status {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    dynamic_status_list {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PoStatusUpdateGQL extends Apollo.Mutation<PoStatusUpdateMutation, PoStatusUpdateMutationVariables> {
    document = PoStatusUpdateDocument;
    
  }
export const SupplierPaymentSettingListDocument = gql`
    query supplierPaymentSettingList($supplier_id: ID!) {
  supplierPaymentSettingList(supplier_id: $supplier_id) {
    payment_settings {
      paymentType {
        _id
        name
        icon
      }
      isActive
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SupplierPaymentSettingListGQL extends Apollo.Query<SupplierPaymentSettingListQuery, SupplierPaymentSettingListQueryVariables> {
    document = SupplierPaymentSettingListDocument;
    
  }
export const IsManufactureBunldeProductDocument = gql`
    query isManufactureBunldeProduct($location_id: ID!) {
  isManufactureBunldeProduct(location_id: $location_id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class IsManufactureBunldeProductGQL extends Apollo.Query<IsManufactureBunldeProductQuery, IsManufactureBunldeProductQueryVariables> {
    document = IsManufactureBunldeProductDocument;
    
  }
export const SupplierSortOrderDocument = gql`
    mutation SupplierSortOrder($_id: ID!, $sort_order: Int!) {
  SupplierSortOrder(_id: $_id, sort_order: $sort_order) {
    _id
    supplier_company
    supplier_company_phone
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SupplierSortOrderGQL extends Apollo.Mutation<SupplierSortOrderMutation, SupplierSortOrderMutationVariables> {
    document = SupplierSortOrderDocument;
    
  }
export const SupplierPaymentSettingsDocument = gql`
    mutation SupplierPaymentSettings($supplier_id: ID!, $payment_id: ID!, $is_active: Boolean!) {
  SupplierPaymentSettings(supplier_id: $supplier_id, payment_id: $payment_id, is_active: $is_active) {
    payment_settings {
      paymentType {
        _id
        name
        icon
      }
      isActive
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SupplierPaymentSettingsGQL extends Apollo.Mutation<SupplierPaymentSettingsMutation, SupplierPaymentSettingsMutationVariables> {
    document = SupplierPaymentSettingsDocument;
    
  }
export const GetCreditLineDocument = gql`
    query getCreditLine {
  getCreditLine {
    _id
    credit_line
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetCreditLineGQL extends Apollo.Query<GetCreditLineQuery, GetCreditLineQueryVariables> {
    document = GetCreditLineDocument;
    
  }
export const PoDeleteDocument = gql`
    mutation PODelete($orderID: ID!) {
  PODelete(orderID: $orderID)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PoDeleteGQL extends Apollo.Mutation<PoDeleteMutation, PoDeleteMutationVariables> {
    document = PoDeleteDocument;
    
  }
export const PoCancelDocument = gql`
    mutation POCancel($orderID: ID!, $refund_payment_type: RefundPaymentType!, $refund_date: String!, $username: String!, $password: String!, $refund_amount: Float) {
  POCancel(orderID: $orderID, refund_payment_type: $refund_payment_type, refund_date: $refund_date, username: $username, password: $password, refund_amount: $refund_amount)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PoCancelGQL extends Apollo.Mutation<PoCancelMutation, PoCancelMutationVariables> {
    document = PoCancelDocument;
    
  }
export const CreateBuyBackOrderDocument = gql`
    mutation createBuyBackOrder($transactionId: ID, $input: createBuyBackInput) {
  createBuyBackOrder(transactionId: $transactionId, input: $input) {
    _id
    ref_no
    transaction_keeping_unit
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateBuyBackOrderGQL extends Apollo.Mutation<CreateBuyBackOrderMutation, CreateBuyBackOrderMutationVariables> {
    document = CreateBuyBackOrderDocument;
    
  }
export const DeleteSystemDeviceDocument = gql`
    mutation deleteSystemDevice($ID: ID!) {
  deleteSystemDevice(id: $ID)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteSystemDeviceGQL extends Apollo.Mutation<DeleteSystemDeviceMutation, DeleteSystemDeviceMutationVariables> {
    document = DeleteSystemDeviceDocument;
    
  }
export const BuybackCancelDocument = gql`
    mutation BuybackCancel($orderID: ID!, $username: String!, $password: String!) {
  BuybackCancel(orderID: $orderID, username: $username, password: $password)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class BuybackCancelGQL extends Apollo.Mutation<BuybackCancelMutation, BuybackCancelMutationVariables> {
    document = BuybackCancelDocument;
    
  }
export const BuybackReceivingDocument = gql`
    mutation BuybackReceiving($orderID: ID!, $input: ReceivingBuyBackInput!) {
  BuybackReceiving(orderID: $orderID, input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class BuybackReceivingGQL extends Apollo.Mutation<BuybackReceivingMutation, BuybackReceivingMutationVariables> {
    document = BuybackReceivingDocument;
    
  }
export const GetProductBySupplierDocument = gql`
    query getProductBySupplier($input: inputSearchProductBySupplier) {
  getProductBySupplier(input: $input) {
    _id
    product_name
    description
    is_bundle_product
    max_bundle
    is_product
    is_track_stock
    alert_qty
    ideal_qty
    is_serial_number
    openingStock
    sell_price
    sell_price_inc_tax
    Brand {
      _id
      brand_name
    }
    DeviceModel {
      _id
      name
    }
    barcode
    sku
    compatilable_devices
    average_cost
    last_cost
    image
    Suppliers {
      supplier_id {
        _id
        supplier_company
        supplier_company_phone
        website
      }
      sku_number
      current_stock
    }
    Business {
      _id
      business_keeping_unit
      business_system_name
    }
    BusinessLocation {
      _id
      store_name
      store_nick_name
      location_keeping_unit
    }
    tags
    sale_item
    total_sale
    incoming_item
    ProductStockPrice {
      _id
      Product {
        _id
      }
      income_account {
        _id
        account_name
      }
      expense_account {
        _id
        account_name
      }
      inventory_account {
        _id
        account_name
      }
      discount_amount
      percentage_discount
      price_without_bundle
      default_sell_price
      total_cost
      ideal_quantity
      opening_stock
      qty_available
      alert_quantity
      shelf_qty
      order_qty
      is_profit_percentage
      profit_value
      profit_amount
      default_sell_price
      SellTax {
        _id
        name
        amount
        is_percentage
        is_tax_group
      }
      is_sell_tax_percentage
      sell_tax_value
      sell_tax_amount
      sell_price_inc_tax
      last_cost
      average_cost
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetProductBySupplierGQL extends Apollo.Query<GetProductBySupplierQuery, GetProductBySupplierQueryVariables> {
    document = GetProductBySupplierDocument;
    
  }
export const GetRmaOrderDocument = gql`
    query getRMAOrder($transactionId: ID) {
  getRMAOrder(transactionId: $transactionId) {
    _id
    transaction_type
    transaction_status
    order_status
    dynamic_status {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    transaction_payment_status
    transaction_keeping_unit
    ref_no
    supplier_order_number
    transaction_date
    sub_total_amount
    total_amount
    TransactionRMA {
      _id
      Supplier {
        _id
        supplier_company
        supplier_company_phone
        website
      }
      Product {
        _id
        product_name
        description
        ProductStockPrice {
          qty_available
        }
      }
      skuNo
      rma_quantity
      approved_quantity
      receiving_quantity
      productCostPrice
      sub_total
      total_amount
      created_at
    }
    supplier_rma_number
    created_at
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetRmaOrderGQL extends Apollo.Query<GetRmaOrderQuery, GetRmaOrderQueryVariables> {
    document = GetRmaOrderDocument;
    
  }
export const CreateRmaOrderDocument = gql`
    mutation createRMAOrder($transactionId: ID, $input: createRMAInput) {
  createRMAOrder(transactionId: $transactionId, input: $input) {
    _id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateRmaOrderGQL extends Apollo.Mutation<CreateRmaOrderMutation, CreateRmaOrderMutationVariables> {
    document = CreateRmaOrderDocument;
    
  }
export const UpdateRmaStatusDocument = gql`
    mutation updateRMAStatus($input: TransactionRMAStatusInput) {
  updateRMAStatus(input: $input) {
    _id
    dynamic_status {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    dynamic_status_list {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateRmaStatusGQL extends Apollo.Mutation<UpdateRmaStatusMutation, UpdateRmaStatusMutationVariables> {
    document = UpdateRmaStatusDocument;
    
  }
export const CreateReceivingRmaDocument = gql`
    mutation createReceivingRMA($input: TransactionReceivingRMAInput) {
  createReceivingRMA(input: $input) {
    _id
    transaction_type
    dynamic_status {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    dynamic_status_list {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateReceivingRmaGQL extends Apollo.Mutation<CreateReceivingRmaMutation, CreateReceivingRmaMutationVariables> {
    document = CreateReceivingRmaDocument;
    
  }
export const CreatePaymentRefundDocument = gql`
    mutation createPaymentRefund($input: refundInput) {
  createPaymentRefund(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePaymentRefundGQL extends Apollo.Mutation<CreatePaymentRefundMutation, CreatePaymentRefundMutationVariables> {
    document = CreatePaymentRefundDocument;
    
  }
export const RestoreProductDocument = gql`
    mutation restoreProduct($productIds: [ID]) {
  restoreProduct(productIds: $productIds)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RestoreProductGQL extends Apollo.Mutation<RestoreProductMutation, RestoreProductMutationVariables> {
    document = RestoreProductDocument;
    
  }
export const CreateDeviceTagDocument = gql`
    mutation createDeviceTag($tag: String!, $tag_version: String!) {
  createDeviceTag(tag: $tag, tag_version: $tag_version) {
    _id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateDeviceTagGQL extends Apollo.Mutation<CreateDeviceTagMutation, CreateDeviceTagMutationVariables> {
    document = CreateDeviceTagDocument;
    
  }
export const CreateSupplierManageCreditDocument = gql`
    mutation createSupplierManageCredit($input: SupplierManageStoreCreditInput!) {
  createSupplierManageCredit(input: $input) {
    order_id
    transaction_no
    date
    reason
    amount
    balance
    note
    is_increase
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSupplierManageCreditGQL extends Apollo.Mutation<CreateSupplierManageCreditMutation, CreateSupplierManageCreditMutationVariables> {
    document = CreateSupplierManageCreditDocument;
    
  }
export const CreateTransferStoreCreditDocument = gql`
    mutation createTransferStoreCredit($input: SupplierTransferStoreCreditInput) {
  createTransferStoreCredit(input: $input) {
    date
    is_increase
    transaction_no
    order_id
    amount
    balance
    note
    reason
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateTransferStoreCreditGQL extends Apollo.Mutation<CreateTransferStoreCreditMutation, CreateTransferStoreCreditMutationVariables> {
    document = CreateTransferStoreCreditDocument;
    
  }
export const GetSupplierTransferCreditlogsDocument = gql`
    query getSupplierTransferCreditlogs($supplierId: ID!, $locationId: ID, $limit: Int, $skip: Int) {
  getSupplierTransferCreditlogs(supplierId: $supplierId, locationId: $locationId, limit: $limit, skip: $skip) {
    order_id
    transaction_no
    date
    reason
    amount
    balance
    note
    is_increase
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSupplierTransferCreditlogsGQL extends Apollo.Query<GetSupplierTransferCreditlogsQuery, GetSupplierTransferCreditlogsQueryVariables> {
    document = GetSupplierTransferCreditlogsDocument;
    
  }
export const DeleteLogAndUpdateStockDocument = gql`
    mutation deleteLogAndUpdateStock($orderID: ID!, $logID: ID!, $location_id: ID!) {
  deleteLogAndUpdateStock(orderID: $orderID, logID: $logID, location_id: $location_id) {
    _id
    transaction_keeping_unit
    transaction_type
    received_additional_cost
    discount_value
    discount_amount
    transaction_type
    transaction_date
    supplier_rma_number
    cancel_by {
      first_name
      last_name
    }
    cancel_at
    updated_by {
      first_name
      last_name
    }
    arrival_Date
    updated_at
    supplier_order_number
    created_by {
      id
      first_name
      last_name
    }
    Tax {
      _id
      name
      amount
      tax_type
      is_percentage
    }
    tax_amount
    tax_value
    is_tax_percentage
    shipping_company_name
    shipping_tracking_no
    shipping_estimated_days
    dynamic_status {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    ShippingType {
      _id
      shipment_name
      shipment_price
      delivery_time_days
      threshold
      icon
    }
    total_amount
    sub_total_amount
    remaining_amount
    is_private
    additional_notes
    received_note
    TransactionPayment {
      _id
      amount
      method
      paid_on
      card_used_no
    }
    Supplier {
      _id
      supplier_keeping_unit
      supplier_company
      supplier_company_phone
      payment_settings {
        paymentType {
          _id
          name
          icon
        }
        isActive
      }
    }
    TransactionPurchaseLine {
      _id
      stock_sku_number
      quantity
      receiving_quantity
      receive_quantity
      Product {
        _id
        product_name
        description
        sku
      }
      product_cost_price
      is_extra_item
      total_amount
    }
    TransactionBuyBackLine {
      _id
      System_Device {
        _id
        product_name
        product_price
        product_brand {
          _id
          brand_name
        }
      }
      quantity
      device_price
      sub_total
      total_amount
      received_qty
      approve_qty
    }
    BusinessLocation {
      address_1
    }
    created_at
    dynamic_status_list {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    is_additional_cost
    is_extra_items
    is_missing_items
    order_estimate_amount
    ReceivingLogs {
      _id
      stock_sku_number
      Product {
        product_name
      }
      receivedDate
      quantity
      receive_quantity
      quantity_returned
    }
    refund_amount
    shipping_amount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteLogAndUpdateStockGQL extends Apollo.Mutation<DeleteLogAndUpdateStockMutation, DeleteLogAndUpdateStockMutationVariables> {
    document = DeleteLogAndUpdateStockDocument;
    
  }
export const PoTransactionFlowDocument = gql`
    mutation POTransactionFlow($orderID: ID!) {
  POTransactionFlow(orderID: $orderID) {
    _id
    transaction_keeping_unit
    transaction_type
    received_additional_cost
    discount_value
    discount_amount
    transaction_type
    transaction_date
    supplier_rma_number
    cancel_by {
      first_name
      last_name
    }
    cancel_at
    updated_by {
      first_name
      last_name
    }
    arrival_Date
    updated_at
    supplier_order_number
    created_by {
      id
      first_name
      last_name
    }
    Tax {
      _id
      name
      amount
      tax_type
      is_percentage
    }
    tax_amount
    tax_value
    is_tax_percentage
    shipping_company_name
    shipping_tracking_no
    shipping_estimated_days
    dynamic_status {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    ShippingType {
      _id
      shipment_name
      shipment_price
      delivery_time_days
      threshold
      icon
    }
    total_amount
    sub_total_amount
    remaining_amount
    is_private
    additional_notes
    received_note
    TransactionPayment {
      _id
      amount
      method
      paid_on
      card_used_no
    }
    Supplier {
      _id
      supplier_keeping_unit
      supplier_company
      supplier_company_phone
      payment_settings {
        paymentType {
          _id
          name
          icon
        }
        isActive
      }
    }
    TransactionPurchaseLine {
      _id
      stock_sku_number
      quantity
      receiving_quantity
      receive_quantity
      Product {
        _id
        product_name
        description
        sku
      }
      product_cost_price
      is_extra_item
      total_amount
    }
    TransactionBuyBackLine {
      _id
      System_Device {
        _id
        product_name
        product_price
        product_brand {
          _id
          brand_name
        }
      }
      quantity
      device_price
      sub_total
      total_amount
      received_qty
      approve_qty
    }
    BusinessLocation {
      address_1
    }
    created_at
    dynamic_status_list {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    is_additional_cost
    is_extra_items
    is_missing_items
    order_estimate_amount
    ReceivingLogs {
      _id
      stock_sku_number
      Product {
        product_name
      }
      receivedDate
      quantity
      receive_quantity
      quantity_returned
    }
    refund_amount
    shipping_amount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PoTransactionFlowGQL extends Apollo.Mutation<PoTransactionFlowMutation, PoTransactionFlowMutationVariables> {
    document = PoTransactionFlowDocument;
    
  }
export const CreatePoToRmaDocument = gql`
    mutation CreatePOToRMA($transactionId: ID!) {
  CreatePOToRMA(transactionId: $transactionId) {
    _id
    transaction_type
    transaction_date
    supplier_rma_number
    dynamic_status {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
    Supplier {
      _id
      supplier_keeping_unit
      supplier_company
      supplier_company_phone
      payment_settings {
        paymentType {
          _id
          name
          icon
        }
        isActive
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreatePoToRmaGQL extends Apollo.Mutation<CreatePoToRmaMutation, CreatePoToRmaMutationVariables> {
    document = CreatePoToRmaDocument;
    
  }
export const SearchSupplierDocument = gql`
    query searchSupplier($search: String!, $location_id: ID, $active: String!, $is_verify_supplier: Boolean!, $unlink_product: Boolean!, $limit: Int, $skip: Int) {
  searchSupplier(search: $search, location_id: $location_id, active: $active, is_verify_supplier: $is_verify_supplier, unlink_product: $unlink_product, limit: $limit, skip: $skip) {
    _id
    supplier_company
    supplier_company_phone
    supplier_company_email
    website
    address_1
    address_2
    city
    state
    zip_code
    supplier_keeping_unit
    supplier_store_credit {
      supplier_credit_amount
      storeLocation {
        _id
        store_name
      }
    }
    Country {
      _id
      name
      short_name
      is_active
    }
    supplier_first_name
    supplier_last_name
    supplier_phone
    supplier_mobile
    supplier_email
    BusinessLocation {
      _id
      store_name
      store_nick_name
      location_keeping_unit
    }
    Business {
      _id
    }
    Product {
      _id
      product_name
      description
      image
      is_bundle_product
    }
    is_verify_supplier
    is_buyback
    payment_settings {
      paymentType {
        _id
        name
        icon
      }
      isActive
    }
    Order
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchSupplierGQL extends Apollo.Query<SearchSupplierQuery, SearchSupplierQueryVariables> {
    document = SearchSupplierDocument;
    
  }
export const SupplierByIdDocument = gql`
    query supplierById($id: ID!, $location_id: ID) {
  supplierById(id: $id, location_id: $location_id) {
    _id
    supplier_company
    supplier_company_phone
    supplier_company_email
    website
    address_1
    address_2
    city
    state
    zip_code
    supplier_keeping_unit
    supplier_store_credit {
      supplier_credit_amount
      storeLocation {
        _id
        store_name
      }
    }
    Country {
      _id
      name
      short_name
      is_active
    }
    supplier_first_name
    supplier_last_name
    supplier_phone
    supplier_mobile
    supplier_email
    BusinessLocation {
      _id
      store_name
      store_nick_name
      location_keeping_unit
    }
    Business {
      _id
    }
    Product {
      _id
      product_name
      description
      image
      is_bundle_product
    }
    is_verify_supplier
    is_buyback
    payment_settings {
      paymentType {
        _id
        name
        icon
      }
      isActive
    }
    supplier_net_term {
      supplier_pay_term_number
      supplier_pay_term_type
      supplier_credit_limit
      supplier_interest_rate
    }
    supplier_store_credit {
      supplier_credit_amount
      storeLocation {
        _id
        store_name
      }
    }
    Order
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SupplierByIdGQL extends Apollo.Query<SupplierByIdQuery, SupplierByIdQueryVariables> {
    document = SupplierByIdDocument;
    
  }
export const ArchiveToActiveSupplierDocument = gql`
    mutation archiveToActiveSupplier($id: [ID!]) {
  archiveToActiveSupplier(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ArchiveToActiveSupplierGQL extends Apollo.Mutation<ArchiveToActiveSupplierMutation, ArchiveToActiveSupplierMutationVariables> {
    document = ArchiveToActiveSupplierDocument;
    
  }
export const PermanentDeleteSupplierDocument = gql`
    mutation permanentDeleteSupplier($id: [ID!]) {
  permanentDeleteSupplier(id: $id)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PermanentDeleteSupplierGQL extends Apollo.Mutation<PermanentDeleteSupplierMutation, PermanentDeleteSupplierMutationVariables> {
    document = PermanentDeleteSupplierDocument;
    
  }
export const SupplierSummaryDocument = gql`
    query supplierSummary($supplier_id: ID!) {
  supplierSummary(supplier_id: $supplier_id) {
    total_amount_spent
    total_number_of_po
    average_purchase_per_order
    average_items_per_po
    total_number_of_rma
    total_number_of_buyback
    store_credits
    net_terms
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SupplierSummaryGQL extends Apollo.Query<SupplierSummaryQuery, SupplierSummaryQueryVariables> {
    document = SupplierSummaryDocument;
    
  }
export const GetSupplierNettermLogsDocument = gql`
    query getSupplierNettermLogs($supplierId: ID!, $locationId: ID, $limit: Int, $skip: Int) {
  getSupplierNettermLogs(supplierId: $supplierId, locationId: $locationId, limit: $limit, skip: $skip) {
    User {
      id
      email
      first_name
    }
    transactionNo
    Supplier {
      _id
      supplier_company
    }
    is_increase
    pay_term_number
    pay_term_type
    credit_amount
    debit_amount
    interest_rate
    note
    created_at
    balance
    BusinessLocation {
      _id
      store_name
      store_nick_name
    }
    date
    is_overdue
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSupplierNettermLogsGQL extends Apollo.Query<GetSupplierNettermLogsQuery, GetSupplierNettermLogsQueryVariables> {
    document = GetSupplierNettermLogsDocument;
    
  }
export const CreateSupplierNettermDocument = gql`
    mutation createSupplierNetterm($input: SupplierNettermInput) {
  createSupplierNetterm(input: $input) {
    User {
      id
      email
      first_name
    }
    transactionNo
    Supplier {
      _id
      supplier_company
    }
    is_increase
    pay_term_number
    pay_term_type
    credit_amount
    debit_amount
    interest_rate
    note
    created_at
    balance
    BusinessLocation {
      _id
      store_name
      store_nick_name
    }
    date
    is_overdue
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSupplierNettermGQL extends Apollo.Mutation<CreateSupplierNettermMutation, CreateSupplierNettermMutationVariables> {
    document = CreateSupplierNettermDocument;
    
  }
export const SupplierNetTermDocument = gql`
    query supplierNetTerm($supplier_id: ID!, $location_id: ID!, $limit: Int!, $skip: Int!) {
  supplierNetTerm(supplier_id: $supplier_id, location_id: $location_id, limit: $limit, skip: $skip) {
    creditLimit
    usedCredit
    overDue
    supplierNetTerms {
      date
      day_left
      transaction_detail
      debit
      credit
      ledger_balance
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SupplierNetTermGQL extends Apollo.Query<SupplierNetTermQuery, SupplierNetTermQueryVariables> {
    document = SupplierNetTermDocument;
    
  }
export const SupplierNetTermRecordDocument = gql`
    query supplierNetTermRecord($supplier_id: ID!, $location_id: ID!, $limit: Int!, $skip: Int!) {
  supplierNetTermRecord(supplier_id: $supplier_id, location_id: $location_id, limit: $limit, skip: $skip) {
    transactionID
    date
    day_left
    order_no
    total
    amount_owed
    amount_pay
    balance
    is_overdue
    dynamic_status {
      status_name
      status_font_color
      status_background_color
      status_icon
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SupplierNetTermRecordGQL extends Apollo.Query<SupplierNetTermRecordQuery, SupplierNetTermRecordQueryVariables> {
    document = SupplierNetTermRecordDocument;
    
  }
export const SuppliersVerificationWithSystemDocument = gql`
    query SuppliersVerificationWithSystem($input: [systemSupplierInput]) {
  SuppliersVerificationWithSystem(input: $input) {
    supplier {
      supplier_company
      supplier_company_phone
      supplier_company_email
      website
      address_1
      address_2
      city
      state
      zip_code
      Country
      supplier_first_name
      supplier_last_name
      supplier_phone
      supplier_mobile
      supplier_email
    }
    postVerifyData {
      supplier_company
      supplier_company_phone
      supplier_company_email
      website
      address_1
      address_2
      city
      state
      zip_code
      Country {
        _id
        name
      }
      supplier_first_name
      supplier_last_name
      supplier_phone
      supplier_mobile
      supplier_email
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SuppliersVerificationWithSystemGQL extends Apollo.Query<SuppliersVerificationWithSystemQuery, SuppliersVerificationWithSystemQueryVariables> {
    document = SuppliersVerificationWithSystemDocument;
    
  }
export const SuppliersCheckDuplicationDataDocument = gql`
    query suppliersCheckDuplicationData($input: [importSupplierInput]) {
  suppliersCheckDuplicationData(input: $input) {
    alreadyExistSuppliers {
      supplier_company
      supplier_company_phone
      supplier_company_email
      website
      address_1
      address_2
      city
      state
      zip_code
      Country
      supplier_first_name
      supplier_last_name
      supplier_phone
      supplier_mobile
      supplier_email
    }
    suppliersInvalidData {
      supplier_company
      supplier_company_phone
      supplier_company_email
      website
      address_1
      address_2
      city
      state
      zip_code
      Country
      supplier_first_name
      supplier_last_name
      supplier_phone
      supplier_mobile
      supplier_email
    }
    newlyAddedSuppliers {
      supplier_company
      supplier_company_phone
      supplier_company_email
      website
      address_1
      address_2
      city
      state
      zip_code
      Country
      supplier_first_name
      supplier_last_name
      supplier_phone
      supplier_mobile
      supplier_email
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SuppliersCheckDuplicationDataGQL extends Apollo.Query<SuppliersCheckDuplicationDataQuery, SuppliersCheckDuplicationDataQueryVariables> {
    document = SuppliersCheckDuplicationDataDocument;
    
  }
export const CreateSupplierNetTermPaymentDocument = gql`
    mutation createSupplierNetTermPayment($input: inputSupplierNetTermPayment) {
  createSupplierNetTermPayment(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateSupplierNetTermPaymentGQL extends Apollo.Mutation<CreateSupplierNetTermPaymentMutation, CreateSupplierNetTermPaymentMutationVariables> {
    document = CreateSupplierNetTermPaymentDocument;
    
  }
export const ImportProductsDataDocument = gql`
    mutation importProductsData($input: [productImportInput]) {
  importProductsData(input: $input) {
    productsInvalidData {
      product_name
      description
    }
    newlyAddedProducts {
      product_name
      description
    }
    alreadyExistProducts {
      product_name
      description
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ImportProductsDataGQL extends Apollo.Mutation<ImportProductsDataMutation, ImportProductsDataMutationVariables> {
    document = ImportProductsDataDocument;
    
  }
export const GetAllDeviceDiagnoseDocument = gql`
    query getAllDeviceDiagnose {
  getAllDeviceDiagnose {
    _id
    deviceID
    deviceModel
    deviceVersion
    deviceImei
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllDeviceDiagnoseGQL extends Apollo.Query<GetAllDeviceDiagnoseQuery, GetAllDeviceDiagnoseQueryVariables> {
    document = GetAllDeviceDiagnoseDocument;
    
  }