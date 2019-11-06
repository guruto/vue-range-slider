import {JsonObject, JsonProperty} from "json2typescript";
import {IRequestDto} from "../../tgMdk/IRequestDto";
import {AbstractPaymentRequestDto} from "../AbstractPaymentRequestDto";

@JsonObject("CvsAuthorizeRequestDto")
export class CvsAuthorizeRequestDto extends AbstractPaymentRequestDto implements IRequestDto {
    readonly serviceType: string = "cvs";
    readonly serviceCommand: string = "Authorize";

    @JsonProperty("serviceOptionType", String, true)
    serviceOptionType: string;

    @JsonProperty("orderId", String, true)
    orderId: string;

    @JsonProperty("amount", String, true)
    amount: string;

    @JsonProperty("name1", String, true)
    name1: string;

    @JsonProperty("name2", String, true)
    name2: string;

    @JsonProperty("kana", String, true)
    kana: string;

    @JsonProperty("telNo", String, true)
    telNo: string;

    @JsonProperty("payLimit", String, true)
    payLimit: string;

    @JsonProperty("paymentType", String, true)
    paymentType: string;

    @JsonProperty("free1", String, true)
    free1: string;

    @JsonProperty("free2", String, true)
    free2: string;

    @JsonProperty("pushUrl", String, true)
    pushUrl: string;

    @JsonProperty("payLimitHhmm", String, true)
    payLimitHhmm: string;

    private _maskedLog: string;

    get maskedLog(): string {
        return this._maskedLog;
    }

    set maskedLog(value: string) {
        this._maskedLog = value;
    }

}