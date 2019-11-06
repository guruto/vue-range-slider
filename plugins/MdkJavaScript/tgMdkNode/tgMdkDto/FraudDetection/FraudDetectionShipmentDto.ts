import {JsonObject, JsonProperty} from "json2typescript";
import {FraudDetectionCostDto} from "./FraudDetectionCostDto";

@JsonObject("shipment")
export class FraudDetectionShipmentDto {

    @JsonProperty("recipient", String)
    recipient: string;

    @JsonProperty("shipTypeCd", String)
    shipTypeCd: string;

    @JsonProperty("scheduledShipTime", String)
    scheduledShipTime: string;

    @JsonProperty("insured", String)
    insured: string;

    @JsonProperty("method", String)
    method: string;

    @JsonProperty("comment", String)
    comment: string;

    @JsonProperty("trackingNumber", String)
    trackingNumber: string;

    @JsonProperty("cost", FraudDetectionCostDto)
    cost: FraudDetectionCostDto;

    @JsonProperty("lineItems", [String])
    lineItems: string[];

}