import {JsonObject, JsonProperty} from "json2typescript";
import {FraudDetectionLastActionTimesDto} from "./FraudDetectionLastActionTimesDto";

@JsonObject("userAccount")
export class FraudDetectionUserAccountDto {

    @JsonProperty("id", String)
    id: string;

    @JsonProperty("enrollmentTime", String)
    enrollmentTime: string;

    @JsonProperty("accountHolder", String)
    accountHolder: string;

    @JsonProperty("returnCustomer", String)
    returnCustomer: string;

    @JsonProperty("username", String)
    username: string;

    @JsonProperty("tof", String)
    tof: string;

    @JsonProperty("lastActionTimes", FraudDetectionLastActionTimesDto)
    lastActionTimes: FraudDetectionLastActionTimesDto;

}