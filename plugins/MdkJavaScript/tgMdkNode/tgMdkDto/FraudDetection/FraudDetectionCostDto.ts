import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("cost")
export class FraudDetectionCostDto {

    constructor(amount: string) {
        this.amount = amount;
    }

    @JsonProperty("amount", String)
    amount: string;

    @JsonProperty("currencyCode", String)
    currencyCode: string;

}