import {AbstractPaymentCreditRequestDto} from "./AbstractPaymentCreditRequestDto";
import {JsonObject, JsonProperty} from "json2typescript";
import {OptionParam} from "../OptionParam";
import {FraudDetectionRequestDto} from "../FraudDetection/FraudDetectionRequestDto";
import {IRequestDto} from "../../tgMdk/IRequestDto";

@JsonObject("CardReAuthorizeRequestDto")
export class CardReAuthorizeRequestDto extends AbstractPaymentCreditRequestDto implements IRequestDto {
    readonly serviceType: string = "card";
    readonly serviceCommand: string = "ReAuthorize";

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

    @JsonProperty("jpo", String, true)
    jpo: string;


    @JsonProperty("withCapture", String, true)
    withCapture: string;


    @JsonProperty("salesDay", String, true)
    salesDay: string;

    @JsonProperty("itemCode", String, true)
    itemCode: string;

    @JsonProperty("dddMessageVersion", String, true)
    dddMessageVersion: string;

    @JsonProperty("dddTransactionId", String, true)
    dddTransactionId: string;


    @JsonProperty("dddTransactionStatus", String, true)
    dddTransactionStatus: string;


    @JsonProperty("dddCavvAlgorithm", String, true)
    dddCavvAlgorithm: string;

    @JsonProperty("dddCavv", String, true)
    dddCavv: string;


    @JsonProperty("dddEci", String, true)
    dddEci: string;

    @JsonProperty("securityCode", String, true)
    securityCode: string;

    @JsonProperty("authFlag", String, true)
    authFlag: string;

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
    @JsonProperty("pin", String, true)
    pin: string;

    @JsonProperty("firstPayment", String, true)
    firstPayment: string;

    @JsonProperty("bonusFirstPayment", String, true)
    bonusFirstPayment: string;

    @JsonProperty("mcAmount", String, true)
    mcAmount: string;

    @JsonProperty("posDataCode", String, true)
    posDataCode: string;

    @JsonProperty("terminalId", String, true)
    terminalId: string;

    @JsonProperty("fraudDetectionRequest", String, true)
    fraudDetectionRequest: FraudDetectionRequestDto;

    @JsonProperty("withFraudDetection", String, true)
    withFraudDetection: string;

    private _maskedLog: string;

    get maskedLog(): string {
        return this._maskedLog;
    }

    set maskedLog(value: string) {
        this._maskedLog = value;
    }

}