import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("lineItems")
export class FraudDetectionLineItemDto {

    constructor(refId: string) {
        this.refId = refId;
    }

    @JsonProperty("refId", String)
    refId: string;

    @JsonProperty("name", String)
    name: string;

    @JsonProperty("description", String)
    description: string;

    @JsonProperty("sku", String)
    sku: string;

    @JsonProperty("eanCode", String)
    eanCode: string;

    @JsonProperty("promoCode", String)
    promoCode: string;

    @JsonProperty("category", String)
    category: string;

    @JsonProperty("brand", String)
    brand: string;

    @JsonProperty("sellerId", String)
    sellerId: string;

    @JsonProperty("unitWeight", String)
    unitWeight: string;

    @JsonProperty("unit", String)
    unit: string;

    @JsonProperty("quantity", String)
    quantity: string;

    @JsonProperty("unitAmount", String)
    unitAmount: string;

    @JsonProperty("unitCurrencyCode", String)
    unitCurrencyCode: string;

    @JsonProperty("totalAmount", String)
    totalAmount: string;

    @JsonProperty("totalCurrencyCode", String)
    totalCurrencyCode: string;

}