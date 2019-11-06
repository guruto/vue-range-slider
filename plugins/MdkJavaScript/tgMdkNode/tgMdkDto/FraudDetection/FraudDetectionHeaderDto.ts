import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject("headers")
export class FraudDetectionHeaderDto {

    constructor(headerName: string, headerValue: string) {
        this.headerName = headerName;
        this.headerValue = headerValue;
    }

    @JsonProperty("headerName", String)
    headerName: string;

    @JsonProperty("headerValue", String)
    headerValue: string;

}