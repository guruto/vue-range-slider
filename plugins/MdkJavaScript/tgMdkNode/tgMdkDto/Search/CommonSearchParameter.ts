import {JsonObject, JsonProperty} from "json2typescript";
import {SearchRange} from "./SearchRange";

@JsonObject("common")
export class CommonSearchParameter {

    constructor(orderId: string) {
        this.orderId = orderId;
    }

    @JsonProperty("orderId", String)
    orderId: string;

    @JsonProperty("orderStatus", [String])
    orderStatus: string[];

    @JsonProperty("command", [String])
    command: string[];

    @JsonProperty("mstatus", [String])
    mstatus: string[];

    @JsonProperty("txnDatetime", SearchRange)
    txnDatetime: SearchRange;

    @JsonProperty("amount", SearchRange)
    masterNames: SearchRange;

}