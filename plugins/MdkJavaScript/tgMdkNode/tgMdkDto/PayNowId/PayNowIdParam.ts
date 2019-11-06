import {JsonObject, JsonProperty} from "json2typescript";
import {AccountParam} from "./AccountParam";
import {ChargeParam} from "./ChargeParam";
import {OrderParam} from "./OrderParam";

@JsonObject("payNowIdParam")
export class PayNowIdParam {

    @JsonProperty("accountParam", AccountParam)
    accountParam: AccountParam;

    @JsonProperty("chargeParam", ChargeParam)
    chargeParam: ChargeParam;

    @JsonProperty("orderParam", OrderParam)
    orderParam: OrderParam;

    @JsonProperty("tanking", String)
    tanking: string;

    @JsonProperty("freeKey", String)
    freeKey: string;

    @JsonProperty("memo1", String)
    memo1: string;

    @JsonProperty("receiptData", String)
    receiptData: string;

    @JsonProperty("token", String)
    token: string;

}