import {JsonObject, JsonProperty} from "json2typescript";
import {MdkDtoBase} from "../MdkDtoBase";
import {PayNowIdResponse} from "../PayNowId/PayNowIdResponse";
import {IResponseDto} from "../../tgMdk/IResponseDto";

@JsonObject("MpiReAuthorizeResponseDto")
export class MpiReAuthorizeResponseDto extends MdkDtoBase implements IResponseDto {

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

    @JsonProperty("mpiTransactiontype", String, true)
    mpiTransactiontype: string = undefined;

    @JsonProperty("reqCardNumber", String, true)
    reqCardNumber: string = undefined;

    @JsonProperty("reqCardExpire", String, true)
    reqCardExpire: string = undefined;

    @JsonProperty("reqAmount", String, true)
    reqAmount: string = undefined;

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

    @JsonProperty("reqWithCapture", String, true)
    reqWithCapture: string = undefined;

    @JsonProperty("reqSecurityCode", String, true)
    reqSecurityCode: string = undefined;

    @JsonProperty("reqBirthday", String, true)
    reqBirthday: string = undefined;

    @JsonProperty("reqTel", String, true)
    reqTel: string = undefined;

    @JsonProperty("reqFirstKanaName", String, true)
    reqFirstKanaName: string = undefined;

    @JsonProperty("reqLastKanaName", String, true)
    reqLastKanaName: string = undefined;

    @JsonProperty("reqCurrencyUnit", String, true)
    reqCurrencyUnit: string = undefined;

    @JsonProperty("reqRedirectionUri", String, true)
    reqRedirectionUri: string = undefined;

    @JsonProperty("reqHttpUserAgent", String, true)
    reqHttpUserAgent: string = undefined;

    @JsonProperty("reqHttpAccept", String, true)
    reqHttpAccept: string = undefined;

    @JsonProperty("resResponseContents", String, true)
    resResponseContents: string = undefined;

    @JsonProperty("resCorporationId", String, true)
    resCorporationId: string = undefined;

    @JsonProperty("resBrandId", String, true)
    resBrandId: string = undefined;

    @JsonProperty("res3dMessageVersion", String, true)
    res3dMessageVersion: string = undefined;

    @JsonProperty("authRequestDatetime", String, true)
    authRequestDatetime: string = undefined;

    @JsonProperty("authResponseDatetime", String, true)
    authResponseDatetime: string = undefined;

    @JsonProperty("payNowIdResponse", PayNowIdResponse, true)
    payNowIdResponse: PayNowIdResponse = undefined;

    get resultJson(): string {
        return this._resultJson;
    }

    set resultJson(value: string) {
        this._resultJson = value;
    }

}