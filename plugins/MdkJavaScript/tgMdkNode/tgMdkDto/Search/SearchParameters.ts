import {JsonObject, JsonProperty} from "json2typescript";
import {CommonSearchParameter} from "./CommonSearchParameter";

@JsonObject("searchParameters")
export class SearchParameters {

    constructor(common: CommonSearchParameter) {
        this.common = common;
    }

    @JsonProperty("common", CommonSearchParameter)
    common: CommonSearchParameter;

}