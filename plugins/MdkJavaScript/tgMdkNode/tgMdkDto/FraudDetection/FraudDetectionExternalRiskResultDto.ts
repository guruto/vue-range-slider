import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("externalRiskResults")
export class FraudDetectionExternalRiskResultDto {

    @JsonProperty("source", String)
    source: string;

    @JsonProperty("score", String)
    score: string;

    @JsonProperty("code", String)
    code: string;

}