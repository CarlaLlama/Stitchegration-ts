import Decimal from "decimal.js";
import { fetchGraphQL } from "src/services/fetch-gql";
import { Money, SupportedCurrency } from "src/utils/types";

export async function requestPayment(amount: Decimal, currency: SupportedCurrency){
const operationsDoc = `
    mutation CreatePaymentRequest($amount: MoneyInput!, $payerReference: String!, $beneficiaryReference: String!, $externalReference: String, $beneficiaryName: String!, $beneficiaryBankId: BankBeneficiaryBankId!, $beneficiaryAccountNumber: String!) {
    clientPaymentInitiationRequestCreate(input: {amount: $amount, payerReference: $payerReference, beneficiaryReference: $beneficiaryReference, externalReference: $externalReference, beneficiary: {bankAccount: {name: $beneficiaryName, bankId: $beneficiaryBankId, accountNumber: $beneficiaryAccountNumber}}}) {
        paymentInitiationRequest {
        id
        url
        }
    }
    }
`;

const variables = {
    "amount": {
        "quantity": amount,
        "currency": currency
    },
    "payerReference": "Stitch",
    "beneficiaryReference": "ReimbursedByCarla",
    "externalReference": "example-e32e5478-325b-4869-a53e-2021727d2afe",
    "beneficiaryName": "Pivendren Naik",
    "beneficiaryBankId": "absa",
    "beneficiaryAccountNumber": "4082314247",
}

let results = await fetchGraphQL(operationsDoc, 'CreatePaymentRequest', variables);
return results;
}


export async function requestUserConstrainedPayment(amount: Money, id){
const operationsDoc = `
mutation CreatePaymentRequest($amount: MoneyInput!, $payerReference: String!, $beneficiaryReference: String!, $beneficiaryName: String!, $beneficiaryBankId: BankBeneficiaryBankId!, $beneficiaryAccountNumber: String!, $payerBankAccountId: ID!) {
    userPaymentInitiationRequestCreate(input: {amount: $amount, payerReference: $payerReference, beneficiaryReference: $beneficiaryReference, beneficiary: {bankAccount: {name: $beneficiaryName, bankId: $beneficiaryBankId, accountNumber: $beneficiaryAccountNumber}}, payerConstraint: {bankAccount: {accountId: $payerBankAccountId}}}) {
    paymentInitiationRequest {
        id
        url
    }
    }
}
`;

const variables = {
    "amount": {
        "quantity": amount,
        "currency": "ZAR"
    },
    "payerReference": "Stitch",
    "beneficiaryReference": "ReimbursedByCarla",
    "beneficiaryName": "Pivendren Naik",
    "beneficiaryBankId": "absa",
    "beneficiaryAccountNumber": "4082314247",
    "payerBankAccountId": id
}

let results = await fetchGraphQL(operationsDoc, 'CreatePaymentRequest', variables);
return results;
}


export async function getPaymentStatus(id){
const operationsDoc = `
query GetPaymentRequestStatus($paymentRequestId: ID!) {
    node(id: $paymentRequestId) {
    ... on PaymentInitiationRequest {
        id
        url
        userReference
        state {
        __typename
        ... on PaymentInitiationRequestCompleted {
            date
            amount
            payer {
            ... on PaymentInitiationBankAccountPayer {
                accountNumber
                bankId
            }
            }
            beneficiary {
            ... on BankBeneficiary {
                bankId
            }
            }
            proofOfPayment
        }
        ... on PaymentInitiationRequestCancelled {
            date
            reason
        }
        ... on PaymentInitiationRequestPending {
            __typename
            paymentInitiationRequest {
            id
            }
        }
        }
    }
    }
}
`;

const variables = {
    "paymentRequestId": id
};

let results = await fetchGraphQL(operationsDoc, 'GetPaymentRequestStatus', variables);
return results;
}