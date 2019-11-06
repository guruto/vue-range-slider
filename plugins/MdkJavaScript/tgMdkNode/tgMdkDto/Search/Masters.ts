import {JsonObject, JsonProperty} from "json2typescript";
import {BankFinancialInstInfo} from "./BankFinancialInstInfo";

@JsonObject("masters")
export class Masters {

    @JsonProperty("bankFinancialInstInfo", [BankFinancialInstInfo], true)
    bankFinancialInstInfo: BankFinancialInstInfo[] = undefined;

}