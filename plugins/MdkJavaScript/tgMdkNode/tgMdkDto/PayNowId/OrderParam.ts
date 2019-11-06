import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("orderParam")
export class OrderParam {

    @JsonProperty("originalOrderId", String)
    originalOrderId: string;

    @JsonProperty("cleaningMerchantId", String)
    cleaningMerchantId: string;

}