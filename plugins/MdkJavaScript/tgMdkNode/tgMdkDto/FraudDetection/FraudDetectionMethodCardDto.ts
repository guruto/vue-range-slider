import {JsonObject, JsonProperty} from "json2typescript";
import {FraudDetectionAuthorizationDto} from "./FraudDetectionAuthorizationDto";

@JsonObject("methodCard")
export class FraudDetectionMethodCardDto {

    @JsonProperty("type", String)
    type: string;

    @JsonProperty("brand", String)
    brand: string;

    @JsonProperty("cardHolderName", String)
    cardHolderName: string;

    @JsonProperty("cardBin", String)
    cardBin: string;

    @JsonProperty("cardLastFour", String)
    cardLastFour: string;

    @JsonProperty("hashedCardNumber", String)
    hashedCardNumber: string;

    @JsonProperty("expireDate", String)
    expireDate: string;

    @JsonProperty("tof", String)
    tof: string;

    @JsonProperty("authorization", FraudDetectionAuthorizationDto)
    authorization: FraudDetectionAuthorizationDto;

}