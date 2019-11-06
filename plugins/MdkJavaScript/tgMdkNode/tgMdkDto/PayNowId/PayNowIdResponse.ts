import {JsonObject, JsonProperty} from "json2typescript";
import {Account} from "./Account";
import {OptionResults} from "./OptionResults";

@JsonObject("PayNowIdResponse")
export class PayNowIdResponse {

    @JsonProperty("processId", String, true)
    processId: string = undefined;

    @JsonProperty("status", String, true)
    status: string = undefined;

    @JsonProperty("message", String, true)
    message: string = undefined;

    @JsonProperty("account", String, true)
    account: Account = undefined;

    @JsonProperty("optionResults", [OptionResults], true)
    optionResults: [OptionResults] = undefined;

}