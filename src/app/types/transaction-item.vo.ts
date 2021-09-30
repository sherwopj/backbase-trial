import { MerchantVO } from "./merchant.vo";
import { TransactionVO } from "./transaction.vo";

export interface TransactionItemVO extends TransactionItemShared{
    dates: {
        valueDate: Date
    },
    transaction: TransactionVO
}

export interface TransactionItemShared {
    categoryCode: string,
    merchant: MerchantVO,
    
}

export interface DirtyTransactionItemVO extends TransactionItemShared{
    dates: {
        valueDate: string | number
    }
    transaction: {
        amountCurrency: {
            amount: number | string,
            currencyCode: string
        },
        type: string,
        creditDebitIndicator: string
    }
}
