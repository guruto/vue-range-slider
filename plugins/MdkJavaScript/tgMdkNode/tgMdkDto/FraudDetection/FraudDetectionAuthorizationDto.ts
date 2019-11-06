import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("authorization")
export class FraudDetectionAuthorizationDto {

    @JsonProperty("declined", String)
    declined: string;

    @JsonProperty("approvalCode", String)
    approvalCode: string;

    @JsonProperty("avsAddr", String)
    avsAddr: string;

    @JsonProperty("avsZip", String)
    avsZip: string;

    @JsonProperty("cvv2", String)
    cvv2: string;

    @JsonProperty("ddds", String)
    ddds: string;

    @JsonProperty("eci", String)
    eci: string;

    @JsonProperty("xid", String)
    xid: string;

    @JsonProperty("bank", String)
    bank: string;

    @JsonProperty("type", String)
    type: string;

    @JsonProperty("enhAuthPhone", String)
    enhAuthPhone: string;

    @JsonProperty("enhAuthName", String)
    enhAuthName: string;

    @JsonProperty("enhAuthEmail", String)
    enhAuthEmail: string;

    @JsonProperty("psAddr", String)
    psAddr: string;

    @JsonProperty("psPayer", String)
    psPayer: string;

}