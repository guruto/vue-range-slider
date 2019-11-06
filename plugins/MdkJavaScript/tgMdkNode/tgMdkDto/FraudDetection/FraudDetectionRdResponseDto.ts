import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("FraudDetectionRdResponseDto")
export class FraudDetectionRdResponseDto {

    @JsonProperty("code", String, true)
    code: string = undefined;

    @JsonProperty("requestId", String, true)
    requestId: string = undefined;

    @JsonProperty("orderId", String, true)
    orderId: string = undefined;

    @JsonProperty("riskStatusCode", String, true)
    riskStatusCode: string = undefined;

    @JsonProperty("riskFraudStatusCode", String, true)
    riskFraudStatusCode: string = undefined;

    @JsonProperty("riskResponseCode", String, true)
    riskResponseCode: string = undefined;

    @JsonProperty("riskOrderId", String, true)
    riskOrderId: string = undefined;

    @JsonProperty("riskNeuralScore", String, true)
    riskNeuralScore: string = undefined;

    @JsonProperty("riskRuleCategory", String, true)
    riskRuleCategory: string = undefined;

}