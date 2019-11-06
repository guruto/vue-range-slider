import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("chargeParam")
export class ChargeParam {

    @JsonProperty("groupId", String)
    groupId: string;

    @JsonProperty("groupName", String)
    groupName: string;

    @JsonProperty("type", String)
    type: string;

    @JsonProperty("oneTimeAmount", String)
    oneTimeAmount: string;

    @JsonProperty("amount", String)
    amount: string;

    @JsonProperty("chargeType", String)
    chargeType: string;

    @JsonProperty("schedule", String)
    schedule: string;

    @JsonProperty("salesDay", String)
    salesDay: string;

    @JsonProperty("acquireCode", String)
    acquireCode: string;

}