import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("userIdentityCookies")
export class FraudDetectionUserIdentityCookieDto {

    constructor(cookieName: string, cookieValue: string) {
        this.cookieName = cookieName;
        this.cookieValue = cookieValue;
    }

    @JsonProperty("cookieName", String)
    cookieName: string;

    @JsonProperty("cookieValue", String)
    cookieValue: string;

}