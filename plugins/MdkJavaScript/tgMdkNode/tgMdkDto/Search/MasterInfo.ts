import {JsonObject, JsonProperty} from "json2typescript";
import {Masters} from "./Masters";

@JsonObject("masterInfo")
export class MasterInfo {

    @JsonProperty("name", String, true)
    name: string = undefined;

    @JsonProperty("masters", Masters, true)
    masters: Masters = undefined;

}