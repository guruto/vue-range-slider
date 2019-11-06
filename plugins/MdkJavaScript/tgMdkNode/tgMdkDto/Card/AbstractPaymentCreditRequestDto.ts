import {AbstractPaymentRequestDto} from "../AbstractPaymentRequestDto";

export abstract class AbstractPaymentCreditRequestDto extends AbstractPaymentRequestDto {

    get cardId(): string {
        this.existCardParam();
        return this.payNowIdParam.accountParam.cardParam.cardId;
    }

    set cardId(value: string) {
        this.existCardParam();
        this.payNowIdParam.accountParam.cardParam.cardId = value;
    }

    get defaultCard(): string {
        this.existCardParam();
        return this.payNowIdParam.accountParam.cardParam.defaultCard;
    }

    set defaultCard(value: string) {
        this.existCardParam();
        this.payNowIdParam.accountParam.cardParam.defaultCard = value;
    }

    get groupId(): string {
        this.existRecurringChargeParam();
        return this.payNowIdParam.accountParam.recurringChargeParam.groupId;
    }

    set groupId(value: string) {
        this.existRecurringChargeParam();
        this.payNowIdParam.accountParam.recurringChargeParam.groupId = value;
    }

    get startDate(): string {
        this.existRecurringChargeParam();
        return this.payNowIdParam.accountParam.recurringChargeParam.startDate;
    }

    set startDate(value: string) {
        this.existRecurringChargeParam();
        this.payNowIdParam.accountParam.recurringChargeParam.startDate = value;
    }

    get endDate(): string {
        this.existRecurringChargeParam();
        return this.payNowIdParam.accountParam.recurringChargeParam.endDate;
    }

    set endDate(value: string) {
        this.existRecurringChargeParam();
        this.payNowIdParam.accountParam.recurringChargeParam.endDate = value;
    }

    get oneTimeAmount(): string {
        this.existRecurringChargeParam();
        return this.payNowIdParam.accountParam.recurringChargeParam.oneTimeAmount;
    }

    set oneTimeAmount(value: string) {
        this.existRecurringChargeParam();
        this.payNowIdParam.accountParam.recurringChargeParam.oneTimeAmount = value;
    }

    get recurringAmount(): string {
        this.existRecurringChargeParam();
        return this.payNowIdParam.accountParam.recurringChargeParam.amount;
    }

    set recurringAmount(value: string) {
        this.existRecurringChargeParam();
        this.payNowIdParam.accountParam.recurringChargeParam.amount = value;
    }

    get recurringMemo1(): string {
        this.existRecurringChargeParam();
        return this.payNowIdParam.accountParam.recurringChargeParam.recurringMemo1;
    }

    set recurringMemo1(value: string) {
        this.existRecurringChargeParam();
        this.payNowIdParam.accountParam.recurringChargeParam.recurringMemo1 = value;
    }

    get recurringMemo2(): string {
        this.existRecurringChargeParam();
        return this.payNowIdParam.accountParam.recurringChargeParam.recurringMemo2;
    }

    set recurringMemo2(value: string) {
        this.existRecurringChargeParam();
        this.payNowIdParam.accountParam.recurringChargeParam.recurringMemo2 = value;
    }

    get recurringMemo3(): string {
        this.existRecurringChargeParam();
        return this.payNowIdParam.accountParam.recurringChargeParam.recurringMemo3;
    }

    set recurringMemo3(value: string) {
        this.existRecurringChargeParam();
        this.payNowIdParam.accountParam.recurringChargeParam.recurringMemo3 = value;
    }

    get useChargeOption(): string {
        this.existRecurringChargeParam();
        return this.payNowIdParam.accountParam.recurringChargeParam.useChargeOption;
    }

    set useChargeOption(value: string) {
        this.existRecurringChargeParam();
        this.payNowIdParam.accountParam.recurringChargeParam.useChargeOption = value;
    }

    get recurringSalesDay(): string {
        this.existRecurringChargeParam();
        return this.payNowIdParam.accountParam.recurringChargeParam.salesDay;
    }

    set recurringSalesDay(value: string) {
        this.existRecurringChargeParam();
        this.payNowIdParam.accountParam.recurringChargeParam.salesDay = value;
    }

    get recurringAcquireCode(): string {
        this.existRecurringChargeParam();
        return this.payNowIdParam.accountParam.recurringChargeParam.acquireCode;
    }

    set recurringAcquireCode(value: string) {
        this.existRecurringChargeParam();
        this.payNowIdParam.accountParam.recurringChargeParam.acquireCode = value;
    }

    get tanking(): string {
        this.existPayNowIdParam();
        return this.payNowIdParam.tanking;
    }

    set tanking(value: string) {
        this.existPayNowIdParam();
        this.payNowIdParam.tanking = value;
    }

    get updater(): string {
        this.existPayNowIdParam();
        return this.payNowIdParam.accountParam.cardParam.updater;
    }

    set updater(value: string) {
        this.existPayNowIdParam();
        this.payNowIdParam.accountParam.cardParam.updater = value;
    }

    get token(): string {
        this.existPayNowIdParam();
        return this.payNowIdParam.token;
    }

    set token(value: string) {
        this.existPayNowIdParam();
        this.payNowIdParam.token = value;
    }

}