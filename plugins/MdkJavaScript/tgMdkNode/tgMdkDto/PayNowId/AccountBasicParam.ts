import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("accountBasicParam")
export class AccountBasicParam {

    @JsonProperty("createDate", String)
    createDate: string;

    @JsonProperty("deleteDate", String)
    deleteDate: string;

    @JsonProperty("forceDeleteDate", String)
    forceDeleteDate: string;

    @JsonProperty("deleteCardInfo", String)
    deleteCardInfo: string;

}