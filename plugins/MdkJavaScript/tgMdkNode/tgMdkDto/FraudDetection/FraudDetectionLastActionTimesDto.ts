import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("lastActionTimes")
export class FraudDetectionLastActionTimesDto {

    @JsonProperty("previousSuccessfulLogin", String)
    previousSuccessfulLogin: string;

    @JsonProperty("transferThresholdUpdated", String)
    transferThresholdUpdated: string;

}