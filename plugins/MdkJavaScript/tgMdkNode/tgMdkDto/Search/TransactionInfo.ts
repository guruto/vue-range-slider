import {JsonObject, JsonProperty} from "json2typescript";
import {Masters} from "./Masters";
import {ProperTransactionInfo} from "./ProperTransactionInfo";

@JsonObject("transactionInfo")
export class TransactionInfo {

    @JsonProperty("txnId", String, true)
    txnId: string = undefined;

    @JsonProperty("command", String, true)
    command: string = undefined;

    @JsonProperty("mstatus", String, true)
    mstatus: string = undefined;

    @JsonProperty("vResultCode", String, true)
    vResultCode: string = undefined;

    @JsonProperty("txnDatetime", String, true)
    txnDatetime: string = undefined;

    @JsonProperty("amount", String, true)
    amount: string = undefined;

    @JsonProperty("properTransactionInfo", ProperTransactionInfo, true)
    properTransactionInfo: ProperTransactionInfo = undefined;

}