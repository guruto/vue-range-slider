import {JsonObject, JsonProperty} from "json2typescript";
import {FraudDetectionCbResponseDto} from "./FraudDetectionCbResponseDto";
import {FraudDetectionRdResponseDto} from "./FraudDetectionRdResponseDto";
import {FraudDetectionAgResponseDto} from "./FraudDetectionAgResponseDto";

@JsonObject("FraudDetectionResponseDto")
export class FraudDetectionResponseDto {

    @JsonProperty("result", String, true)
    result: string = undefined;

    @JsonProperty("service", String, true)
    service: string = undefined;

    @JsonProperty("cbResponse", String, true)
    cbResponse: FraudDetectionCbResponseDto = undefined;

    @JsonProperty("rdResponse", String, true)
    rdResponse: FraudDetectionRdResponseDto = undefined;

    @JsonProperty("agResponse", String, true)
    agResponse: FraudDetectionAgResponseDto = undefined;

}