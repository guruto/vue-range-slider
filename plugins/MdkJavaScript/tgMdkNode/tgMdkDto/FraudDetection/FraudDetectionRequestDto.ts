import {JsonObject, JsonProperty} from "json2typescript";
import {FraudDetectionOrderDto} from "./FraudDetectionOrderDto";
import {FraudDetectionTransactionDto} from "./FraudDetectionTransactionDto";
import {FraudDetectionTotalDto} from "./FraudDetectionTotalDto";
import {FraudDetectionSessionDto} from "./FraudDetectionSessionDto";
import {FraudDetectionUserAccountDto} from "./FraudDetectionUserAccountDto";
import {FraudDetectionContactDto} from "./FraudDetectionContactDto";
import {FraudDetectionExternalRiskResultDto} from "./FraudDetectionExternalRiskResultDto";
import {FraudDetectionDeviceDto} from "./FraudDetectionDeviceDto";

@JsonObject("fraudDetectionRequest")
export class FraudDetectionRequestDto {

    constructor(device: FraudDetectionDeviceDto) {
        this.device = device;
    }

    @JsonProperty("orgCode", String)
    orgCode: string;

    @JsonProperty("modelCode", String)
    modelCode: string;

    @JsonProperty("merchantId", String)
    merchantId: string;

    @JsonProperty("bruceSector", String)
    bruceSector: string;

    @JsonProperty("customField1", String)
    customField1: string;

    @JsonProperty("customField2", String)
    customField2: string;

    @JsonProperty("customField3", String)
    customField3: string;

    @JsonProperty("ebtUserData1", String)
    ebtUserData1: string;

    @JsonProperty("ebtUserData2", String)
    ebtUserData2: string;

    @JsonProperty("ebtUserData3", String)
    ebtUserData3: string;

    @JsonProperty("ebtUserData4", String)
    ebtUserData4: string;

    @JsonProperty("ebtUserData5", String)
    ebtUserData5: string;

    @JsonProperty("ebtUserData6", String)
    ebtUserData6: string;

    @JsonProperty("ebtUserData7", String)
    ebtUserData7: string;

    @JsonProperty("ebtUserData8", String)
    ebtUserData8: string;

    @JsonProperty("ebtUserData9", String)
    ebtUserData9: string;

    @JsonProperty("ebtUserData10", String)
    ebtUserData10: string;

    @JsonProperty("ebtUserData11", String)
    ebtUserData11: string;

    @JsonProperty("ebtUserData12", String)
    ebtUserData12: string;

    @JsonProperty("ebtUserData13", String)
    ebtUserData13: string;

    @JsonProperty("ebtUserData14", String)
    ebtUserData14: string;

    @JsonProperty("ebtUserData15", String)
    ebtUserData15: string;

    @JsonProperty("ebtUserData16", String)
    ebtUserData16: string;

    @JsonProperty("ebtUserData17", String)
    ebtUserData17: string;

    @JsonProperty("ebtUserData18", String)
    ebtUserData18: string;

    @JsonProperty("ebtUserData19", String)
    ebtUserData19: string;

    @JsonProperty("ebtUserData20", String)
    ebtUserData20: string;

    @JsonProperty("ebtUserData21", String)
    ebtUserData21: string;

    @JsonProperty("ebtUserData22", String)
    ebtUserData22: string;

    @JsonProperty("ebtUserData23", String)
    ebtUserData23: string;

    @JsonProperty("ebtUserData24", String)
    ebtUserData24: string;

    @JsonProperty("ebtUserData25", String)
    ebtUserData25: string;

    @JsonProperty("actCd", String)
    actCd: string;

    @JsonProperty("divNum", String)
    divNum: string;

    @JsonProperty("SKeyId", String)
    SKeyId: string;

    @JsonProperty("ebtService", String)
    ebtService: string;

    @JsonProperty("ebtName", String)
    ebtName: string;

    @JsonProperty("userId", String)
    userId: string;

    @JsonProperty("id", String)
    id: string;

    @JsonProperty("time", String)
    time: string;

    @JsonProperty("source", String)
    source: string;

    @JsonProperty("device", FraudDetectionDeviceDto)
    device: FraudDetectionDeviceDto;

    @JsonProperty("externalRiskResults", [FraudDetectionExternalRiskResultDto])
    externalRiskResults: FraudDetectionExternalRiskResultDto[];

    @JsonProperty("contacts", [FraudDetectionContactDto])
    contacts: FraudDetectionContactDto[];

    @JsonProperty("userAccount", FraudDetectionUserAccountDto)
    userAccount: FraudDetectionUserAccountDto;

    @JsonProperty("session", FraudDetectionSessionDto)
    session: FraudDetectionSessionDto;

    @JsonProperty("total", FraudDetectionTotalDto)
    total: FraudDetectionTotalDto;

    @JsonProperty("transaction", FraudDetectionTransactionDto)
    transaction: FraudDetectionTransactionDto;

    @JsonProperty("order", FraudDetectionOrderDto)
    order: FraudDetectionOrderDto;

}