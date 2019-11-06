import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("RecurringCharge")
export class RecurringCharge {

    @JsonProperty("groupId", String, true)
    groupId: string = undefined;

    @JsonProperty("cardId", String, true)
    cardId: string = undefined;

}