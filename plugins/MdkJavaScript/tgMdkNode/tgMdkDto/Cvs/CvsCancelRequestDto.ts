import {JsonObject, JsonProperty} from "json2typescript";
import {IRequestDto} from "../../tgMdk/IRequestDto";
import {AbstractPaymentRequestDto} from "../AbstractPaymentRequestDto";

@JsonObject("CvsCancelRequestDto")
export class CvsCancelRequestDto extends AbstractPaymentRequestDto implements IRequestDto {
    readonly serviceType: string = "cvs";
    readonly serviceCommand: string = "Cancel";

    @JsonProperty("serviceOptionType", String, true)
    serviceOptionType: string;

    @JsonProperty("orderId", String, true)
    orderId: string;

    private _maskedLog: string;

    get maskedLog(): string {
        return this._maskedLog;
    }

    set maskedLog(value: string) {
        this._maskedLog = value;
    }

}