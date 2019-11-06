import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("AccountBasic")
export class AccountBasic {

    @JsonProperty("lastName", String, true)
    lastName: string = undefined;

    @JsonProperty("lastKanaName", String, true)
    lastKanaName: string = undefined;

    @JsonProperty("firstName", String, true)
    firstName: string = undefined;

    @JsonProperty("firstKanaName", String, true)
    firstKanaName: string = undefined;

    @JsonProperty("mailAddress", String, true)
    mailAddress: string = undefined;

    @JsonProperty("createDate", String, true)
    createDate: string = undefined;

    @JsonProperty("deleteDate", String, true)
    deleteDate: string = undefined;

}