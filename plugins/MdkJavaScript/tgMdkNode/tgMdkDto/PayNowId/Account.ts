import {JsonObject, JsonProperty} from "json2typescript";
import {AccountBasic} from "./AccountBasic";
import {AccountInfo} from "./AccountInfo";
import {RecurringCharge} from "./RecurringCharge";
import {BankAccountInfo} from "./BankAccountInfo";
import {CardInfo} from "./CardInfo";

@JsonObject("Account")
export class Account {

    @JsonProperty("accountId", String, true)
    accountId: string = undefined;

    @JsonProperty("transData", String, true)
    transData: string = undefined;

    @JsonProperty("accountBasic", String, true)
    accountBasic: AccountBasic = undefined;

    @JsonProperty("accountInfo", [AccountInfo], true)
    accountInfo: [AccountInfo] = undefined;

    @JsonProperty("cardInfo", [CardInfo], true)
    cardInfo: [CardInfo] = undefined;

    @JsonProperty("recurringCharge", [RecurringCharge], true)
    recurringCharge: [RecurringCharge] = undefined;

    @JsonProperty("bankAccountInfo", String, true)
    bankAccountInfo: BankAccountInfo = undefined;

}