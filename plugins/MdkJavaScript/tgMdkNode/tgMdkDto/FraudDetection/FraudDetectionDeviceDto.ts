import {JsonObject, JsonProperty} from "json2typescript";
import {FraudDetectionHeaderDto} from "./FraudDetectionHeaderDto";
import {FraudDetectionUserIdentityCookieDto} from "./FraudDetectionUserIdentityCookieDto";

@JsonObject("device")
export class FraudDetectionDeviceDto {

    constructor(ip: string, headers: FraudDetectionHeaderDto[]) {
        this.ip = ip;
        this.headers = headers;
    }

    @JsonProperty("ip", String)
    ip: string;

    @JsonProperty("headers", [FraudDetectionHeaderDto])
    headers: FraudDetectionHeaderDto[];

    @JsonProperty("userIdentityCookies", [FraudDetectionUserIdentityCookieDto])
    userIdentityCookies: FraudDetectionUserIdentityCookieDto[];

    @JsonProperty("devicePrint", String)
    devicePrint: string;

}