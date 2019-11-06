import {JsonObject, JsonProperty} from "json2typescript";
import {FraudDetectionCashValueDto} from "./FraudDetectionCashValueDto";
import {FraudDetectionMethodCardDto} from "./FraudDetectionMethodCardDto";

@JsonObject("transaction")
export class FraudDetectionTransactionDto {

    @JsonProperty("type", String)
    type: string;

    @JsonProperty("id", String)
    id: string;

    @JsonProperty("cashValue", FraudDetectionCashValueDto)
    cashValue: FraudDetectionCashValueDto;

    @JsonProperty("comment", String)
    comment: string;

    @JsonProperty("time", String)
    time: string;

    @JsonProperty("payer", String)
    payer: string;

    @JsonProperty("category", String)
    category: string;

    @JsonProperty("methodCard", FraudDetectionMethodCardDto)
    methodCard: FraudDetectionMethodCardDto;

}