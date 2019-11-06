import {JsonObject, JsonProperty} from "json2typescript";
import {MasterInfo} from "./MasterInfo";
import {TransactionInfo} from "./TransactionInfo";

@JsonObject("transactionInfos")
export class TransactionInfos {

    @JsonProperty("transactionInfo", [TransactionInfo], true)
    transactionInfo: TransactionInfo[] = undefined;

}