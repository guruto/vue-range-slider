import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("FraudDetectionAgResponseDto")
export class FraudDetectionAgResponseDto {

    @JsonProperty("decision", String, true)
    decision: string = undefined;

    @JsonProperty("hitRules", [String], true)
    hitRules: string[] = undefined;

    @JsonProperty("hitReasons", [String], true)
    hitReasons: string[] = undefined;

    @JsonProperty("errors", [String], true)
    errors: string[] = undefined;

    @JsonProperty("message", String, true)
    message: string = undefined;

}