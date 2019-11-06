import {JsonObject, JsonProperty} from "json2typescript";
import {MdkDtoBase} from "../MdkDtoBase";
import {IResponseDto} from "../../tgMdk/IResponseDto";
import {MasterInfos} from "./MasterInfos";
import {OrderInfos} from "./OrderInfos";

@JsonObject("SearchResponseDto")
export class SearchResponseDto extends MdkDtoBase implements IResponseDto {

    private _resultJson: string;

    @JsonProperty("serviceType", String, true)
    serviceType: string = undefined;

    @JsonProperty("mstatus", String, true)
    mstatus: string = undefined;

    @JsonProperty("vResultCode", String, true)
    vResultCode: string = undefined;

    @JsonProperty("merrMsg", String, true)
    merrMsg: string = undefined;

    @JsonProperty("orderId", String, true)
    orderId: string = undefined;

    @JsonProperty("marchTxn", String, true)
    marchTxn: string = undefined;

    @JsonProperty("custTxn", String, true)
    custTxn: string = undefined;

    @JsonProperty("txnVersion", String, true)
    txnVersion: string = undefined;

    @JsonProperty("overMaxCountFlag", String, true)
    overMaxCountFlag: string = undefined;

    @JsonProperty("masterInfos", MasterInfos, true)
    masterInfos: MasterInfos = undefined;

    @JsonProperty("searchCount", String, true)
    searchCount: string = undefined;

    @JsonProperty("orderInfos", OrderInfos, true)
    orderInfos: OrderInfos = undefined;

    get resultJson(): string {
        return this._resultJson;
    }

    set resultJson(value: string) {
        this._resultJson = value;
    }

}