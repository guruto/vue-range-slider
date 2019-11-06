import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("session")
export class FraudDetectionSessionDto {

    constructor(id: string) {
        this.id = id;
    }

    @JsonProperty("id", String)
    id: string;

    @JsonProperty("itemsRemoved", String)
    itemsRemoved: string;

    @JsonProperty("durationInMillis", String)
    durationInMillis: string;

    @JsonProperty("activityPageCode", String)
    activityPageCode: string;

    @JsonProperty("failedLoginAttempts", String)
    failedLoginAttempts: string;

    @JsonProperty("thirdPartySessionId", String)
    thirdPartySessionId: string;

    @JsonProperty("loggedIn", String)
    loggedIn: string;

    @JsonProperty("multiFactorAuthenticated", String)
    multiFactorAuthenticated: string;

    @JsonProperty("challengeAttempts", String)
    challengeAttempts: string;

}