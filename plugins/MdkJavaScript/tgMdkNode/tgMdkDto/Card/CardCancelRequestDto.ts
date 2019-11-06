import {AbstractPaymentCreditRequestDto} from "./AbstractPaymentCreditRequestDto";
import {JsonObject, JsonProperty} from "json2typescript";
import {OptionParam} from "../OptionParam";
import {IRequestDto} from "../../tgMdk/IRequestDto";

@JsonObject("CardCancelRequestDto")
export class CardCancelRequestDto extends AbstractPaymentCreditRequestDto implements IRequestDto {
    readonly serviceType: string = "card";
    readonly serviceCommand: string = "Cancel";

    @JsonProperty("orderId", String, true)
    orderId: string;

    @JsonProperty("originalOrderId", String, true)
    originalOrderId: string;

    @JsonProperty("amount", String, true)
    amount: string;

    @JsonProperty("cardNumber", String, true)
    cardNumber: string;

    @JsonProperty("cardExpire", String, true)
    cardExpire: string;

    @JsonProperty("cardOptionType", String, true)
    cardOptionType: string;

    @JsonProperty("cardCenter", String, true)
    cardCenter: string;

    @JsonProperty("acquirerCode", String, true)
    acquirerCode: string;

    @JsonProperty("withNew", String, true)
    withNew: string;

    @JsonProperty("withDirect", String, true)
    withDirect: string;

    @JsonProperty("cancelDay", String, true)
    cancelDay: string;

    @JsonProperty("itemCode", String, true)
    itemCode: string;

    @JsonProperty("currencyUnit", String, true)
    currencyUnit: string;

    @JsonProperty("salesDay", String, true)
    salesDay: string;

    @JsonProperty("pin", String, true)
    pin: string;

    @JsonProperty("paymentType", String, true)
    paymentType: string;

    @JsonProperty("jis1SecondTrack", String, true)
    jis1SecondTrack: string;

    @JsonProperty("jis2Track", String, true)
    jis2Track: string;

    @JsonProperty("useOriginalOrder", String, true)
    useOriginalOrder: string;

    @JsonProperty("jpo", String, true)
    jpo: string;

    @JsonProperty("firstPayment", String, true)
    firstPayment: string;

    @JsonProperty("bonusFirstPayment", String, true)
    bonusFirstPayment: string;

    @JsonProperty("withDirectOnFailure", String, true)
    withDirectOnFailure: string;

    @JsonProperty("mcAmount", String, true)
    mcAmount: string;

    @JsonProperty("posDataCode", String, true)
    posDataCode: string;

    @JsonProperty("terminalId", String, true)
    terminalId: string;

    @JsonProperty("chipConditionCode", String, true)
    chipConditionCode: string;

    @JsonProperty("optionParams", [OptionParam])
    optionParams: OptionParam[];

    private _maskedLog: string;

    get maskedLog(): string {
        return this._maskedLog;
    }

    set maskedLog(value: string) {
        this._maskedLog = value;
    }

}