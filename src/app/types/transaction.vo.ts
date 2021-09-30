import { AmountCurrencyVO } from "./amount-currency.vo"

export interface TransactionVO {
    type: string,
    creditDebitIndicator: 'CRDT' | 'DBIT',
    amountCurrency: AmountCurrencyVO
}
