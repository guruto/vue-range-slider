import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("bankAccountParam")
export class BankAccountParam {

    @JsonProperty("bankCode", String)
    bankCode: string;

    @JsonProperty("branchCode", String)
    branchCode: string;

    @JsonProperty("accountType", String)
    accountType: string;

    @JsonProperty("accountNumber", String)
    accountNumber: string;

    @JsonProperty("accountManageType", String)
    accountManageType: string;

    @JsonProperty("rejectBankAccount", String)
    rejectBankAccount: string;

}