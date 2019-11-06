import {JsonObject, JsonProperty} from "json2typescript";
import {MasterInfo} from "./MasterInfo";

@JsonObject("masterInfos")
export class MasterInfos {

    @JsonProperty("masterInfo", [MasterInfo], true)
    masterInfo: MasterInfo[] = undefined;

}