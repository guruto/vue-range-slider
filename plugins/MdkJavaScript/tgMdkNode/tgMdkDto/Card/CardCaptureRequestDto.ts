import {AbstractPaymentCreditRequestDto} from "./AbstractPaymentCreditRequestDto";
import {JsonObject, JsonProperty} from "json2typescript";
import {OptionParam} from "../OptionParam";
import {IRequestDto} from "../../tgMdk/IRequestDto";

@JsonObject("CardCaptureRequestDto")
export class CardCaptureRequestDto extends AbstractPaymentCreditRequestDto implements IRequestDto {
    readonly serviceType: string = "card";
    readonly serviceCommand: string = "Capture";

    @JsonProperty("orderId", String, true)
    orderId: string;

    @JsonProperty("amount", String, true)
    amount: string;

    @JsonProperty("cardNumber", String, true)
    cardNumber: string;

    @JsonProperty("cardExpire", String, true)
    cardExpire: string;

    @JsonProperty("cardOptionType", String, true)
    cardOptionType: string;

    @JsonProperty("acquirerCode", String, true)
    acquirerCode: string;

    @JsonProperty("salesDay", String, true)
    salesDay: string;

    @JsonProperty("itemCode", String, true)
    itemCode: string;

    @JsonProperty("withDirect", String, true)
    withDirect: string;

    @JsonProperty("authCode", String, true)
    authCode: string;

    @JsonProperty("currencyUnit", String, true)
    currencyUnit: string;

    @JsonProperty("jpo", String, true)
    jpo: string;

    @JsonProperty("firstPayment", String, true)
    firstPayment: string;

    @JsonProperty("bonusFirstPayment", String, true)
    bonusFirstPayment: string;

    @JsonProperty("mcAmount", String, true)
    mcAmount: string;

    @JsonProperty("terminalId", String, true)
    terminalId: string;

    private _maskedLog: string;

    get maskedLog(): string {
        return this._maskedLog;
    }

    set maskedLog(value: string) {
        this._maskedLog = value;
    }

}