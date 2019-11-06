import {JsonObject, JsonProperty} from "json2typescript";
import {CardParam} from "./CardParam";
import {RecurringChargeParam} from "./RecurringChargeParam";
import {BankAccountParam} from "./BankAccountParam";
import {AccountBasicParam} from "./AccountBasicParam";

@JsonObject("accountParam")
export class AccountParam {

    @JsonProperty("accountId", String)
    accountId: string;

    @JsonProperty("payNowId", String)
    payNowId: string;

    @JsonProperty("transData", String)
    transData: string;

    @JsonProperty("accountBasicParam", AccountBasicParam)
    accountBasicParam: AccountBasicParam;

    @JsonProperty("cardParam", CardParam)
    cardParam: CardParam;

    @JsonProperty("recurringChargeParam", RecurringChargeParam)
    recurringChargeParam: RecurringChargeParam;

    @JsonProperty("bankAccountParam", BankAccountParam)
    bankAccountParam: BankAccountParam;

}