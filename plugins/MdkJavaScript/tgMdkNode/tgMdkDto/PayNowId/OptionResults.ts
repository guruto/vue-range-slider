import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("optionResults")
export class OptionResults {

    @JsonProperty("options", [String])
    options: [string];

}