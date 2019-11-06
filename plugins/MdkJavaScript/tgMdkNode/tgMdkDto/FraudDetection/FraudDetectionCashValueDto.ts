import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("cashValue")
export class FraudDetectionCashValueDto {

    @JsonProperty("amount", String)
    amount: string;

    @JsonProperty("currencyCode", String)
    currencyCode: string;

}