import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("FraudDetectionCbWarningDto")
export class FraudDetectionCbWarningDto {

    @JsonProperty("path", String, true)
    path: string = undefined;

    @JsonProperty("message", String, true)
    message: string = undefined;

    @JsonProperty("value", String, true)
    value: string = undefined;

}