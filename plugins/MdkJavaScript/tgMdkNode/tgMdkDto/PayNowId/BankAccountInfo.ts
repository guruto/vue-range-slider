import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("BankAccountInfo")
export class BankAccountInfo {

    @JsonProperty("bankCode", String, true)
    bankCode: string = undefined;

    @JsonProperty("branchCode", String, true)
    branchCode: string = undefined;

    @JsonProperty("accountType", String, true)
    accountType: string = undefined;

    @JsonProperty("accountNumber", String, true)
    accountNumber: string = undefined;

    @JsonProperty("accountName", String, true)
    accountName: string = undefined;

}