import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("recurringChargeParam")
export class RecurringChargeParam {

    @JsonProperty("groupId", String)
    groupId: string;

    @JsonProperty("startDate", String)
    startDate: string;

    @JsonProperty("endDate", String)
    endDate: string;

    @JsonProperty("finalCharge", String)
    finalCharge: string;

    @JsonProperty("oneTimeAmount", String)
    oneTimeAmount: string;

    @JsonProperty("amount", String)
    amount: string;

    @JsonProperty("recurringMemo1", String)
    recurringMemo1: string;

    @JsonProperty("recurringMemo2", String)
    recurringMemo2: string;

    @JsonProperty("recurringMemo3", String)
    recurringMemo3: string;

    @JsonProperty("useChargeOption", String)
    useChargeOption: string;

    @JsonProperty("salesDay", String)
    salesDay: string;

    @JsonProperty("acquireCode", String)
    acquireCode: string;

}