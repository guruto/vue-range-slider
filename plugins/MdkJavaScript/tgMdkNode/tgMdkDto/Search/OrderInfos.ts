import {JsonObject, JsonProperty} from "json2typescript";
import {MasterInfo} from "./MasterInfo";
import {OrderInfo} from "./OrderInfo";

@JsonObject("orderInfos")
export class OrderInfos {

    @JsonProperty("orderInfo", [OrderInfo], true)
    masterInfo: OrderInfo[] = undefined;

}