import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("total")
export class FraudDetectionTotalDto {

    @JsonProperty("amount", String)
    amount: string;

    @JsonProperty("currencyCode", String)
    currencyCode: string;

}