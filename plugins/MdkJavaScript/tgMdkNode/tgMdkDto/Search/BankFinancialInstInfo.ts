import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("bankFinancialInstInfo")
export class BankFinancialInstInfo {

    @JsonProperty("bankCode", String, true)
    bankCode: string = undefined;

    @JsonProperty("deviceCode", String, true)
    deviceCode: string = undefined;

    @JsonProperty("bankName", String, true)
    bankName: string = undefined;

    @JsonProperty("bankKana", String, true)
    bankKana: string = undefined;

    @JsonProperty("bankIndexChar1", String, true)
    bankIndexChar1: string = undefined;

    @JsonProperty("bankIndexChar2", String, true)
    bankIndexChar2: string = undefined;

    @JsonProperty("startDatetime", String, true)
    startDatetime: string = undefined;

}