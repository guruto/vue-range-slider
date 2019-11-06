import {JsonObject, JsonProperty} from "json2typescript";
import {MdkDtoBase} from "../MdkDtoBase";
import {PayNowIdResponse} from "../PayNowId/PayNowIdResponse";
import {IResponseDto} from "../../tgMdk/IResponseDto";
import {FraudDetectionResponseDto} from "../FraudDetection/FraudDetectionResponseDto";

@JsonObject("CardReAuthorizeResponseDto")
export class CardReAuthorizeResponseDto extends MdkDtoBase implements IResponseDto {

    private _resultJson: string;

    @JsonProperty("serviceType", String, true)
    serviceType: string = undefined;

    @JsonProperty("mstatus", String, true)
    mstatus: string = undefined;

    @JsonProperty("vResultCode", String, true)
    vResultCode: string = undefined;

    @JsonProperty("merrMsg", String, true)
    merrMsg: string = undefined;

    @JsonProperty("marchTxn", String, true)
    marchTxn: string = undefined;

    @JsonProperty("orderId", String, true)
    orderId: string = undefined;

    @JsonProperty("custTxn", String, true)
    custTxn: string = undefined;

    @JsonProperty("txnVersion", String, true)
    txnVersion: string = undefined;

    @JsonProperty("cardTransactiontype", String, true)
    cardTransactiontype: string = undefined;

    @JsonProperty("gatewayRequestDate", String, true)
    gatewayRequestDate: string = undefined;

    @JsonProperty("gatewayResponseDate", String, true)
    gatewayResponseDate: string = undefined;

    @JsonProperty("centerRequestDate", String, true)
    centerRequestDate: string = undefined;

    @JsonProperty("centerResponseDate", String, true)
    centerResponseDate: string = undefined;

    @JsonProperty("pending", String, true)
    pending: string = undefined;

    @JsonProperty("loopback", String, true)
    loopback: string = undefined;

    @JsonProperty("connectedCenterId", String, true)
    connectedCenterId: string = undefined;

    @JsonProperty("centerRequestNumber", String, true)
    centerRequestNumber: string = undefined;

    @JsonProperty("centerReferenceNumber", String, true)
    centerReferenceNumber: string = undefined;

    @JsonProperty("reqCardNumber", String, true)
    reqCardNumber: string = undefined;

    @JsonProperty("reqCardExpire", String, true)
    reqCardExpire: string = undefined;

    @JsonProperty("reqCardOptionType", String, true)
    reqCardOptionType: string = undefined;

    @JsonProperty("reqAmount", String, true)
    reqAmount: string = undefined;

    @JsonProperty("reqMerchantTransaction", String, true)
    reqMerchantTransaction: string = undefined;

    @JsonProperty("reqReturnReferenceNumber", String, true)
    reqReturnReferenceNumber: string = undefined;

    @JsonProperty("reqAuthCode", String, true)
    reqAuthCode: string = undefined;

    @JsonProperty("reqAcquirerCode", String, true)
    reqAcquirerCode: string = undefined;

    @JsonProperty("reqItemCode", String, true)
    reqItemCode: string = undefined;

    @JsonProperty("reqCardCenter", String, true)
    reqCardCenter: string = undefined;

    @JsonProperty("reqJpoInformation", String, true)
    reqJpoInformation: string = undefined;

    @JsonProperty("reqSalesDay", String, true)
    reqSalesDay: string = undefined;

    @JsonProperty("reqCancelDay", String, true)
    reqCancelDay: string = undefined;

    @JsonProperty("reqWithCapture", String, true)
    reqWithCapture: string = undefined;

    @JsonProperty("reqWithDirect", String, true)
    reqWithDirect: string = undefined;

    @JsonProperty("req3dMessageVersion", String, true)
    req3dMessageVersion: string = undefined;

    @JsonProperty("req3dTransactionId", String, true)
    req3dTransactionId: string = undefined;

    @JsonProperty("req3dTransactionStatus", String, true)
    req3dTransactionStatus: string = undefined;

    @JsonProperty("req3dCavvAlgorithm", String, true)
    req3dCavvAlgorithm: string = undefined;

    @JsonProperty("req3dCavv", String, true)
    req3dCavv: string = undefined;

    @JsonProperty("req3dEci", String, true)
    req3dEci: string = undefined;

    @JsonProperty("reqSecurityCode", String, true)
    reqSecurityCode: string = undefined;

    @JsonProperty("reqAuthFlag", String, true)
    reqAuthFlag: string = undefined;

    @JsonProperty("reqBirthday", String, true)
    reqBirthday: string = undefined;

    @JsonProperty("reqTel", String, true)
    reqTel: string = undefined;

    @JsonProperty("reqFirstKanaName", String, true)
    reqFirstKanaName: string = undefined;

    @JsonProperty("reqLastKanaName", String, true)
    reqLastKanaName: string = undefined;

    @JsonProperty("resMerchantTransaction", String, true)
    resMerchantTransaction: string = undefined;

    @JsonProperty("resReturnReferenceNumber", String, true)
    resReturnReferenceNumber: string = undefined;

    @JsonProperty("resAuthCode", String, true)
    resAuthCode: string = undefined;

    @JsonProperty("resActionCode", String, true)
    resActionCode: string = undefined;

    @JsonProperty("resCenterErrorCode", String, true)
    resCenterErrorCode: string = undefined;

    @JsonProperty("resAuthTerm", String, true)
    resAuthTerm: string = undefined;

    @JsonProperty("resItemCode", String, true)
    resItemCode: string = undefined;

    @JsonProperty("resResponseData", String, true)
    resResponseData: string = undefined;

    @JsonProperty("reqCurrencyUnit", String, true)
    reqCurrencyUnit: string = undefined;

    @JsonProperty("reqWithNew", String, true)
    reqWithNew: string = undefined;

    @JsonProperty("acquirerCode", String, true)
    acquirerCode: string = undefined;

    @JsonProperty("terminalId", String, true)
    terminalId: string = undefined;

    @JsonProperty("fraudDetectionResponse", FraudDetectionResponseDto, true)
    fraudDetectionResponse: FraudDetectionResponseDto = undefined;

    get resultJson(): string {
        return this._resultJson;
    }

    set resultJson(value: string) {
        this._resultJson = value;
    }

}