import {JsonObject, JsonProperty} from "json2typescript";
import {MdkDtoBase} from "../MdkDtoBase";
import {IRequestDto} from "../../tgMdk/IRequestDto";
import {SearchParameters} from "./SearchParameters";

@JsonObject("SearchRequestDto")
export class SearchRequestDto extends MdkDtoBase implements IRequestDto {
    readonly serviceType: string = "search";
    readonly serviceCommand: string = "Search";

    @JsonProperty("requestId", String)
    requestId: string;

    @JsonProperty("serviceTypeCd", [String])
    serviceTypeCd: string[];

    @JsonProperty("newerFlag", String)
    newerFlag: string;

    @JsonProperty("containDummyFlag", String)
    containDummyFlag: string;

    @JsonProperty("maxCount", String)
    maxCount: string;

    @JsonProperty("masterNames", [String])
    masterNames: string[];

    @JsonProperty("searchParameters", SearchParameters)
    searchParameters: SearchParameters;

    private _maskedLog: string;

    get maskedLog(): string {
        return this._maskedLog;
    }

    set maskedLog(value: string) {
        this._maskedLog = value;
    }

}