import {AbstractPaymentCreditRequestDto} from "../Card/AbstractPaymentCreditRequestDto";
import {JsonObject, JsonProperty} from "json2typescript";
import {OptionParam} from "../OptionParam";
import {FraudDetectionRequestDto} from "../FraudDetection/FraudDetectionRequestDto";
import {IRequestDto} from "../../tgMdk/IRequestDto";

@JsonObject("MpiAuthorizeRequestDto")
export class MpiAuthorizeRequestDto extends AbstractPaymentCreditRequestDto implements IRequestDto {
    readonly serviceType: string = "mpi";
    readonly serviceCommand: string = "Authorize";

    @JsonProperty("serviceOptionType", String, true)
    serviceOptionType: string;

    @JsonProperty("orderId", String, true)
    orderId: string;

    @JsonProperty("amount", String, true)
    amount: string;

    @JsonProperty("cardNumber", String, true)
    cardNumber: string;

    @JsonProperty("cardExpire", String, true)
    cardExpire: string;

    @JsonProperty("cardCenter", String, true)
    cardCenter: string;

    @JsonProperty("acquirerCode", String, true)
    acquirerCode: string;

    @JsonProperty("jpo", String, true)
    jpo: string;

    @JsonProperty("withCapture", String, true)
    withCapture: string;

    @JsonProperty("salesDay", String, true)
    salesDay: string;

    @JsonProperty("itemCode", String, true)
    itemCode: string;

    @JsonProperty("securityCode", String, true)
    securityCode: string;

    @JsonProperty("birthday", String, true)
    birthday: string;

    @JsonProperty("tel", String, true)
    tel: string;

    @JsonProperty("firstKanaName", String, true)
    firstKanaName: string;

    @JsonProperty("lastKanaName", String, true)
    lastKanaName: string;

    @JsonProperty("currencyUnit", String, true)
    currencyUnit: string;

    @JsonProperty("redirectionUri", String, true)
    redirectionUri: string;

    @JsonProperty("httpUserAgent", String, true)
    httpUserAgent: string;

    @JsonProperty("httpAccept", String, true)
    httpAccept: string;

    @JsonProperty("firstPayment", String, true)
    firstPayment: string;

    @JsonProperty("bonusFirstPayment", String, true)
    bonusFirstPayment: string;

    @JsonProperty("mcAmount", String, true)
    mcAmount: string;

    @JsonProperty("pushUrl", String, true)
    pushUrl: string;

    @JsonProperty("browserDeviceCategory", String, true)
    browserDeviceCategory: string;

    @JsonProperty("tempRegistration", String, true)
    tempRegistration: string;

    @JsonProperty("verifyTimeout", String, true)
    verifyTimeout: string;

    @JsonProperty("fraudDetectionRequest", FraudDetectionRequestDto, true)
    fraudDetectionRequest: FraudDetectionRequestDto;

    @JsonProperty("withFraudDetection", String, true)
    withFraudDetection: string;

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