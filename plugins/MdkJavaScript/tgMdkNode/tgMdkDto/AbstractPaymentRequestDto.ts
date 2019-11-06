import {JsonProperty} from "json2typescript";
import {MdkDtoBase} from "./MdkDtoBase";
import {PayNowIdParam} from "./PayNowId/PayNowIdParam";
import {AccountParam} from "./PayNowId/AccountParam";
import {AccountBasicParam} from "./PayNowId/AccountBasicParam";
import {CardParam} from "./PayNowId/CardParam";
import {RecurringChargeParam} from "./PayNowId/RecurringChargeParam";
import {BankAccountParam} from "./PayNowId/BankAccountParam";

export abstract class AbstractPaymentRequestDto extends MdkDtoBase  {

    @JsonProperty("payNowIdParam", PayNowIdParam)
    payNowIdParam: PayNowIdParam;

    get accountId(): string {
        this.existAccountParam();
        return this.payNowIdParam.accountParam.accountId;
    }

    set accountId(value: string) {
        this.existAccountParam();
        this.payNowIdParam.accountParam.accountId = value;
    }

    get createDate(): string {
        this.existAccountBasicParam();
        return this.payNowIdParam.accountParam.accountBasicParam.createDate;
    }

    set createDate(value: string) {
        this.existAccountBasicParam();
        this.payNowIdParam.accountParam.accountBasicParam.createDate = value;
    }

    get freeKey(): string {
        this.existPayNowIdParam();
        return this.payNowIdParam.freeKey;
    }

    set freeKey(value: string) {
        this.existPayNowIdParam();
        this.payNowIdParam.freeKey = value;
    }

    get memo1(): string {
        this.existPayNowIdParam();
        return this.payNowIdParam.memo1;
    }

    set memo1(value: string) {
        this.existPayNowIdParam();
        this.payNowIdParam.memo1 = value;
    }

    get receiptData(): string {
        this.existPayNowIdParam();
        return this.payNowIdParam.receiptData;
    }

    set receiptData(value: string) {
        this.existPayNowIdParam();
        this.payNowIdParam.receiptData = value;
    }

    protected existPayNowIdParam() {
        if (this.payNowIdParam == null) {
            this.payNowIdParam = new PayNowIdParam();
        }
    }

    protected existAccountParam() {
        this.existPayNowIdParam();
        if (this.payNowIdParam.accountParam == null) {
            this.payNowIdParam.accountParam = new AccountParam();
        }
    }

    protected existAccountBasicParam() {
        this.existAccountParam();
        if (this.payNowIdParam.accountParam.accountBasicParam == null) {
            this.payNowIdParam.accountParam.accountBasicParam = new AccountBasicParam();
        }
    }

    protected existCardParam() {
        this.existAccountParam();
        if (this.payNowIdParam.accountParam.cardParam == null) {
            this.payNowIdParam.accountParam.cardParam = new CardParam();
        }
    }

    protected existRecurringChargeParam() {
        this.existAccountParam();
        if (this.payNowIdParam.accountParam.recurringChargeParam == null) {
            this.payNowIdParam.accountParam.recurringChargeParam = new RecurringChargeParam();
        }
    }

    protected existBankAccountParam() {
        this.existAccountParam();
        if (this.payNowIdParam.accountParam.bankAccountParam == null) {
            this.payNowIdParam.accountParam.bankAccountParam = new BankAccountParam();
        }
    }

}