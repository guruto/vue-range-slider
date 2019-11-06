import {JsonObject, JsonProperty} from "json2typescript";
import {Masters} from "./Masters";
import {ProperOrderInfo} from "./ProperOrderInfo";
import {TransactionInfos} from "./TransactionInfos";

@JsonObject("orderInfo")
export class OrderInfo {

    @JsonProperty("memo1", String, true)
    memo1: string = undefined;

    @JsonProperty("memo2", String, true)
    memo2: string = undefined;

    @JsonProperty("memo3", String, true)
    memo3: string = undefined;

    @JsonProperty("freeKey", String, true)
    freeKey: string = undefined;

    @JsonProperty("accountId", String, true)
    accountId: string = undefined;

    @JsonProperty("index", String, true)
    index: string = undefined;

    @JsonProperty("serviceTypeCd", String, true)
    serviceTypeCd: string = undefined;

    @JsonProperty("orderId", String, true)
    orderId: string = undefined;

    @JsonProperty("orderStatus", String, true)
    orderStatus: string = undefined;

    @JsonProperty("lastSuccessTxnType", String, true)
    lastSuccessTxnType: string = undefined;

    @JsonProperty("properOrderInfo", ProperOrderInfo, true)
    properOrderInfo: ProperOrderInfo = undefined;

    @JsonProperty("transactionInfos", TransactionInfos, true)
    transactionInfos: TransactionInfos = undefined;

}