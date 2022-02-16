import Decimal from "decimal.js";

export type SupportedCurrency = 'ZAR' | 'NGN';

export type Money = {
    currency: SupportedCurrency,
    quantity: Decimal
};