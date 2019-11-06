import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("cardParam")
export class CardParam {

    @JsonProperty("cardId", String)
    cardId: string;

    @JsonProperty("defaultCard", String)
    defaultCard: string;

    @JsonProperty("defaultCardId", String)
    defaultCardId: string;

    @JsonProperty("updater", String)
    updater: string;

    @JsonProperty("cardNumber", String)
    cardNumber: string;

    @JsonProperty("cardExpire", String)
    cardExpire: string;

    @JsonProperty("securityCode", String)
    securityCode: string;

    @JsonProperty("token", String)
    token: string;

    @JsonProperty("cardNumberMaskType", String)
    cardNumberMaskType: string;

}