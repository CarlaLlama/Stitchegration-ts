import Decimal from "decimal.js";

export type TokenResponseBody = {
    access_token: string,
    expires_in: number,
    token_type: string,
    scope: string
}

export type SupportedCurrency = 'ZAR' | 'NGN';

export type Money = {
    currency: SupportedCurrency,
    quantity: Decimal
};