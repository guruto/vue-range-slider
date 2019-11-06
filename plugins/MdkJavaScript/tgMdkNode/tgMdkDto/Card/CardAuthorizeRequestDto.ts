import {AbstractPaymentCreditRequestDto} from "./AbstractPaymentCreditRequestDto";
import {JsonObject, JsonProperty} from "json2typescript";
import {OptionParam} from "../OptionParam";
import {FraudDetectionRequestDto} from "../FraudDetection/FraudDetectionRequestDto";
import {IRequestDto} from "../../tgMdk/IRequestDto";

@JsonObject("CardAuthorizeRequestDto")
export class CardAuthorizeRequestDto extends AbstractPaymentCreditRequestDto implements IRequestDto {
    readonly serviceType: string = "card";
    readonly serviceCommand: string = "Authorize";

    @JsonProperty("orderId", String)
    orderId: string;

    @JsonProperty("amount", String)
    amount: string;

    @JsonProperty("cardNumber", String)
    cardNumber: string;

    @JsonProperty("cardExpire", String)
    cardExpire: string;

    @JsonProperty("cardOptionType", String)
    cardOptionType: string;

    @JsonProperty("cardCenter", String)
    cardCenter: string;

    @JsonProperty("acquirerCode", String)
    acquirerCode: string;

    @JsonProperty("jpo", String)
    jpo: string;

    @JsonProperty("withCapture", String)
    withCapture: string;

    @JsonProperty("salesDay", String)
    salesDay: string;

    @JsonProperty("itemCode", String)
    itemCode: string;

    @JsonProperty("dddMessageVersion", String)
    dddMessageVersion: string;

    @JsonProperty("dddTransactionId", String)
    dddTransactionId: string;

    @JsonProperty("dddTransactionStatus", String)
    dddTransactionStatus: string;

    @JsonProperty("dddCavvAlgorithm", String)
    dddCavvAlgorithm: string;

    @JsonProperty("dddCavv", String)
    dddCavv: string;

    @JsonProperty("dddEci", String)
    dddEci: string;

    @JsonProperty("securityCode", String)
    securityCode: string;

    @JsonProperty("authFlag", String)
    authFlag: string;

    @JsonProperty("birthday", String)
    birthday: string;

    @JsonProperty("tel", String)
    tel: string;

    @JsonProperty("firstKanaName", String)
    firstKanaName: string;

    @JsonProperty("lastKanaName", String)
    lastKanaName: string;

    @JsonProperty("currencyUnit", String)
    currencyUnit: string;

    @JsonProperty("pin", String)
    pin: string;

    @JsonProperty("paymentType", String)
    paymentType: string;

    @JsonProperty("jis1SecondTrack", String)
    jis1SecondTrack: string;

    @JsonProperty("jis2Track", String)
    jis2Track: string;

    @JsonProperty("firstPayment", String)
    firstPayment: string;

    @JsonProperty("bonusFirstPayment", String)
    bonusFirstPayment: string;

    @JsonProperty("mcAmount", String)
    mcAmount: string;

    @JsonProperty("posDataCode", String)
    posDataCode: string;

    @JsonProperty("terminalId", String)
    terminalId: string;

    @JsonProperty("fraudDetectionRequest", FraudDetectionRequestDto)
    fraudDetectionRequest: FraudDetectionRequestDto;

    @JsonProperty("withFraudDetection", String)
    withFraudDetection: string;

    @JsonProperty("chipConditionCode", String)
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