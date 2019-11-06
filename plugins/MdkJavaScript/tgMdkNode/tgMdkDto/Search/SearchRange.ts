import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("searchRange")
export class SearchRange {

    @JsonProperty("from", String)
    from: string;

    @JsonProperty("to", [String])
    to: string[];

}