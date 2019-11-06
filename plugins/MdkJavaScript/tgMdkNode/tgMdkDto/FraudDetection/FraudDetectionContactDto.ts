import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("contacts")
export class FraudDetectionContactDto {

    constructor(refId: string, firstName: string, lastName: string, countryCode: string) {
        this.refId = refId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.countryCode = countryCode;
    }

    @JsonProperty("refId", String)
    refId: string;

    @JsonProperty("firstName", String)
    firstName: string;

    @JsonProperty("lastName", String)
    lastName: string;

    @JsonProperty("company", String)
    company: string;

    @JsonProperty("emailAddress", String)
    emailAddress: string;

    @JsonProperty("emailAddressType", String)
    emailAddressType: string;

    @JsonProperty("phoneNumber", String)
    phoneNumber: string;

    @JsonProperty("phoneNumberType", String)
    phoneNumberType: string;

    @JsonProperty("streetLine", String)
    streetLine: string;

    @JsonProperty("streetLine2", String)
    streetLine2: string;

    @JsonProperty("city", String)
    city: string;

    @JsonProperty("postal", String)
    postal: string;

    @JsonProperty("stateProvinceCode", String)
    stateProvinceCode: string;

    @JsonProperty("countryCode", String)
    countryCode: string;

    @JsonProperty("birthDate", String)
    birthDate: string;

    @JsonProperty("mothersMaidenName", String)
    mothersMaidenName: string;

}