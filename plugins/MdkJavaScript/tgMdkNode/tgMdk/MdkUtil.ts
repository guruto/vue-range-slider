import {JsonConvert, OperationMode, ValueCheckingMode} from "json2typescript"
import {IRequestDto} from "./IRequestDto";
import {PropertyMatchingRule} from "json2typescript/src/json2typescript/json-convert-enums";
import {MerchantConfig} from "./MerchantConfig";
import {IResponseDto} from "./IResponseDto";

export class MdkUtil {

    public static maskJson(obj: any) {
        if (Array.isArray(obj)) {
            this.parseArray(obj);
        } else if (typeof obj == "object") {
            this.parseObject(obj)
        }
    }

    private static parseObject(obj: object) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (Array.isArray(obj[key])) {
                    this.parseArray(obj[key]);
                } else if (typeof obj[key] == "object") {
                    this.parseObject(obj[key]);
                } else if (typeof obj[key] == "string") {
                    if (MerchantConfig.isNeedMask(key)) {
                        obj[key] = MdkUtil.getMaskedValue(key, obj[key])
                    }
                }
            }
        }
    }

    private static parseArray(obj: object) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (Array.isArray(obj[key])) {
                    this.parseArray(obj[key]);
                } else if (typeof obj[key] == "object") {
                    this.parseObject(obj[key]);
                } else {

                }
            }
        }
    }

    public static getMaskedValue(key: string, value: string) {
        if (value == null || value == "") {
            return "";
        }

        if (key.toLowerCase().indexOf("mailaddr") > -1) {
            let index = value.indexOf("@");
            if (index > 0) {
                return "*".repeat(index) + value.substr(index);
            } else {
                return value;
            }
        } else if (key.toLowerCase().indexOf("cardnumber") > -1) {
            let cardNumber = value.replace(/-/g, "");
            if (cardNumber.length >= 11) {
                return cardNumber.substr(0, 6) + ("*".repeat(cardNumber.length - 10)) + cardNumber.substr(-4);
            } else {
                return "*".repeat(cardNumber.length)
            }
        } else if (MerchantConfig.isNeedMask(key)) {
            return "*".repeat(value.length)
        } else {
            return value;
        }
    }

    public static convertDTOtoJsonObject(dto: IRequestDto) {
        let jsonConvert = new JsonConvert();
        jsonConvert.operationMode = OperationMode.ENABLE;
        jsonConvert.ignorePrimitiveChecks = false;
        jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
        jsonConvert.propertyMatchingRule = PropertyMatchingRule.CASE_INSENSITIVE;
        return jsonConvert.serializeObject<IRequestDto>(dto);
    }

    public static setResponseProperties<T extends IResponseDto>(resultJson: string, type: { new(): T }): T {
        let obj = JSON.parse(resultJson); // 応答JSONをデシリアライズ

        // resultという名前のプロパティが存在することを確認し、
        if (obj.hasOwnProperty("result")) {

            let result = obj["result"]; // resultを取り出す
            delete obj["result"]; // objからresultを削除

            // objからrootレベルのキーを取得(payNowIdResponse, viewResultなど)
            let rootKeys: string[] = [];
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    rootKeys.push(key);
                }
            }

            for (let key in result) {
                if (result.hasOwnProperty(key)) {
                    // rootレベルにキー重複がなければresultのプロパティをobjに追加
                    if (!rootKeys.some(value => value == key)) {
                        obj[key] = result[key];
                    }
                }
            }

            let jsonConvert = new JsonConvert();
            jsonConvert.operationMode = OperationMode.ENABLE;
            jsonConvert.ignorePrimitiveChecks = true;
            jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
            jsonConvert.propertyMatchingRule = PropertyMatchingRule.CASE_INSENSITIVE;

            let response = jsonConvert.deserializeObject<T>(obj, type); // T型にデシリアライズしてresponseに上書き
            MdkUtil.maskJson(obj);
            response.resultJson = JSON.stringify(obj); // resultJsonプロパティにマスクしたobjのJSONを詰める
            return response;
        }

        return new type();
    }


}