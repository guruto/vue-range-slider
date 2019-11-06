import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("AccountInfo")
export class AccountInfo {

    @JsonProperty("accountInfoId", String, true)
    accountInfoId: string = undefined;

    @JsonProperty("accountType", String, true)
    accountType: string = undefined;

    @JsonProperty("defaultAccount", String, true)
    defaultAccount: string = undefined;

    @JsonProperty("recipient", String, true)
    recipient: string = undefined;

    @JsonProperty("zip", String, true)
    zip: string = undefined;

    @JsonProperty("address", String, true)
    address: string = undefined;

    @JsonProperty("tel", String, true)
    tel: string = undefined;

}