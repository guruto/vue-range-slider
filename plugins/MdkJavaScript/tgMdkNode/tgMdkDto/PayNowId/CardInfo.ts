import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("CardInfo")
export class CardInfo {

    @JsonProperty("cardId", String)
    cardId: string;

    @JsonProperty("cardNumber", String)
    cardNumber: string;

    @JsonProperty("cardExpire", String)
    cardExpire: string;

    @JsonProperty("defaultCard", String)
    defaultCard: string;

}