import {JsonObject, JsonProperty} from "json2typescript";
import {FraudDetectionCbWarningDto} from "./FraudDetectionCbWarningDto";

@JsonObject("FraudDetectionCbResponseDto")
export class FraudDetectionCbResponseDto {

    @JsonProperty("id", String, true)
    id: string = undefined;

    @JsonProperty("modelCode", String, true)
    modelCode: string = undefined;

    @JsonProperty("modelVersion", String, true)
    modelVersion: string = undefined;

    @JsonProperty("orgCode", String, true)
    orgCode: string = undefined;

    @JsonProperty("time", String, true)
    time: string = undefined;

    @JsonProperty("score", String, true)
    score: string = undefined;

    @JsonProperty("deviceId", String, true)
    deviceId: string = undefined;

    @JsonProperty("tdl", String, true)
    tdl: string = undefined;

    @JsonProperty("systemResponse", String, true)
    systemResponse: string = undefined;

    @JsonProperty("fulfillmentAction", String, true)
    fulfillmentAction: string = undefined;

    @JsonProperty("auditTrail", String, true)
    auditTrail: string = undefined;

    @JsonProperty("riskLevel", String, true)
    riskLevel: string = undefined;

    @JsonProperty("warnings", [FraudDetectionCbWarningDto], true)
    warnings: FraudDetectionCbWarningDto[] = undefined;

}