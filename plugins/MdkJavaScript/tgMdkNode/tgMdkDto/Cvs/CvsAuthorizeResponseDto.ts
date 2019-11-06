import {JsonObject, JsonProperty} from "json2typescript";
import {MdkDtoBase} from "../MdkDtoBase";
import {IResponseDto} from "../../tgMdk/IResponseDto";

@JsonObject("CvsAuthorizeResponseDto")
export class CvsAuthorizeResponseDto extends MdkDtoBase implements IResponseDto {

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

    @JsonProperty("receiptNo", String, true)
    receiptNo: string = undefined;

    @JsonProperty("haraikomiUrl", String, true)
    haraikomiUrl: string = undefined;

    @JsonProperty("txnVersion", String, true)
    txnVersion: string = undefined;

    get resultJson(): string {
        return this._resultJson;
    }

    set resultJson(value: string) {
        this._resultJson = value;
    }

}