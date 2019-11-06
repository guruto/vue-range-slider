import {JsonObject, JsonProperty} from "json2typescript";
import {FraudDetectionLineItemDto} from "./FraudDetectionLineItemDto";
import {FraudDetectionShipmentDto} from "./FraudDetectionShipmentDto";

@JsonObject("order")
export class FraudDetectionOrderDto {

    @JsonProperty("id", String)
    id: string;

    @JsonProperty("source", String)
    source: string;

    @JsonProperty("promoCode", String)
    promoCode: string;

    @JsonProperty("failedPaymentAttempts", String)
    failedPaymentAttempts: string;

    @JsonProperty("oiRepeat", String)
    oiRepeat: string;

    @JsonProperty("lineItems", [FraudDetectionLineItemDto])
    lineItems: FraudDetectionLineItemDto[];

    @JsonProperty("shipment", FraudDetectionShipmentDto)
    shipment: FraudDetectionShipmentDto;

}