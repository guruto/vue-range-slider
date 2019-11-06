import {describe} from "mocha"
import assert = require('power-assert');
import {MdkUtil} from "../tgMdk/MdkUtil";
import {CardAuthorizeRequestDto} from "../tgMdkDto/Card/CardAuthorizeRequestDto";
import {FraudDetectionRequestDto} from "../tgMdkDto/FraudDetection/FraudDetectionRequestDto";
import {FraudDetectionDeviceDto} from "../tgMdkDto/FraudDetection/FraudDetectionDeviceDto";
import {FraudDetectionHeaderDto} from "../tgMdkDto/FraudDetection/FraudDetectionHeaderDto";
import {FraudDetectionTransactionDto} from "../tgMdkDto/FraudDetection/FraudDetectionTransactionDto";
import {FraudDetectionContactDto} from "../tgMdkDto/FraudDetection/FraudDetectionContactDto";
import {FraudDetectionSessionDto} from "../tgMdkDto/FraudDetection/FraudDetectionSessionDto";
import {FraudDetectionMethodCardDto} from "../tgMdkDto/FraudDetection/FraudDetectionMethodCardDto";
import {FraudDetectionUserAccountDto} from "../tgMdkDto/FraudDetection/FraudDetectionUserAccountDto";
import {FraudDetectionOrderDto} from "../tgMdkDto/FraudDetection/FraudDetectionOrderDto";
import {FraudDetectionLineItemDto} from "../tgMdkDto/FraudDetection/FraudDetectionLineItemDto";
import {FraudDetectionShipmentDto} from "../tgMdkDto/FraudDetection/FraudDetectionShipmentDto";
import {FraudDetectionCostDto} from "../tgMdkDto/FraudDetection/FraudDetectionCostDto";

import {JsonConvert, OperationMode, ValueCheckingMode} from "json2typescript"
import {PropertyMatchingRule} from "json2typescript/src/json2typescript/json-convert-enums";
import {CardAuthorizeResponseDto} from "../tgMdkDto/Card/CardAuthorizeResponseDto";

describe('MdkUtil Test', () => {


    it("Mask test", () => {
            assert.equal(MdkUtil.getMaskedValue("test", "test"), "test");

            assert.equal(MdkUtil.getMaskedValue("cardNumber", "2342-3423-4234-2341"), "234234******2341");
            assert.equal(MdkUtil.getMaskedValue("cardNumber", "2342342342342341"), "234234******2341");
            assert.equal(MdkUtil.getMaskedValue("cardNumber", "378282246310005"), "378282*****0005");
            assert.equal(MdkUtil.getMaskedValue("cardNumber", "3782-822463-10005"), "378282*****0005");
            assert.equal(MdkUtil.getMaskedValue("cardNumber", "36666666666660"), "366666****6660");
            assert.equal(MdkUtil.getMaskedValue("cardNumber", "3666-666666-6660"), "366666****6660");
            assert.equal(MdkUtil.getMaskedValue("cardNumber", "1234567890"), "**********");
            assert.equal(MdkUtil.getMaskedValue("cardNumber", "12345678901"), "123456*8901");
            assert.equal(MdkUtil.getMaskedValue("CardNumber", "4111111111111111"), "411111******1111");
            assert.equal(MdkUtil.getMaskedValue("cardnumber", "4111111111111111"), "411111******1111");
            assert.equal(MdkUtil.getMaskedValue("card_number", "4111111111111111"), "4111111111111111");

            assert.equal(MdkUtil.getMaskedValue("mailaddr", "foo@example.com"), "***@example.com");
            assert.equal(MdkUtil.getMaskedValue("mailaddr", "f@example.com"), "*@example.com");
            assert.equal(MdkUtil.getMaskedValue("mailaddr", "@example.com"), "@example.com");
            assert.equal(MdkUtil.getMaskedValue("mailaddr", "@example@.com"), "@example@.com");
            assert.equal(MdkUtil.getMaskedValue("mailaddr", "foo.example.com"), "foo.example.com");
            assert.equal(MdkUtil.getMaskedValue("mailaddr", "foo@t.co"), "***@t.co");
            assert.equal(MdkUtil.getMaskedValue("mailaddr", "foo@c"), "***@c");
            assert.equal(MdkUtil.getMaskedValue("mailaddr", "1@c"), "*@c");
            assert.equal(MdkUtil.getMaskedValue("mailaddr", "@"), "@");
            assert.equal(MdkUtil.getMaskedValue("mailaddr", "1@"), "*@");

            assert.equal(MdkUtil.getMaskedValue("mailAddress", "foo@example.com"), "***@example.com");
            assert.equal(MdkUtil.getMaskedValue("Mailaddr", "foo@example.com"), "***@example.com");
            assert.equal(MdkUtil.getMaskedValue("mail_addr", "foo@example.com"), "foo@example.com");
        }
    );


    let request = new CardAuthorizeRequestDto();
    request.amount = "100";
    request.cardNumber = '4111111111111111';
    request.orderId = 'someorderid';
    request.accountId = 'tarou';
    request.cardExpire = '12/25';
    request.token = '43c23d46-f5dc-4527-a21b-0646d61db7b3';
    request.birthday = "0526";
    request.tel = "08000000000";
    request.firstKanaName = "ﾃｽﾄﾀﾛｳ";
    request.lastKanaName = "ﾃｽﾄｽｽﾞｷ";

    it("Serialize and mask CardAuthorizeRequestDto ", () => {
        let obj = MdkUtil.convertDTOtoJsonObject(request);
        MdkUtil.maskJson(obj);
        assert.equal(obj["cardNumber"], "411111******1111");
        assert.equal(obj["cardExpire"], "*****");
        assert.equal(obj["birthday"], "****");
        assert.equal(obj["tel"], "***********");
        assert.equal(obj["firstKanaName"], "******");
        assert.equal(obj["lastKanaName"], "*******");
        assert.equal(obj["orderId"], "someorderid");
    });

    it("Serialize and mask CardAuthorizeRequestDto with FraudDetection params", () => {
        let fraud = new FraudDetectionRequestDto(
            new FraudDetectionDeviceDto(
                "192.168.1.1",
                [
                    new FraudDetectionHeaderDto("testName", "testValue")
                ]
            )
        );

        fraud.contacts = [
            new FraudDetectionContactDto("1", "テスト", "タロウ", "JP"),
            new FraudDetectionContactDto("2", "テスト", "ハナコ", "JP")
        ];

        fraud.userAccount = new FraudDetectionUserAccountDto();
        fraud.userAccount.id = "EC0000123";

        fraud.transaction = new FraudDetectionTransactionDto();
        fraud.transaction.payer = "1";
        fraud.transaction.methodCard = new FraudDetectionMethodCardDto();
        fraud.transaction.methodCard.cardHolderName = "TAROU TEST";

        fraud.session = new FraudDetectionSessionDto("kjlsd9234jd0jse902pjsdfu0a23");

        fraud.order = new FraudDetectionOrderDto();
        fraud.order.lineItems = [
            new FraudDetectionLineItemDto("item1"),
            new FraudDetectionLineItemDto("item2"),
        ];
        fraud.order.shipment = new FraudDetectionShipmentDto();
        fraud.order.shipment.recipient = "2";
        fraud.order.shipment.cost = new FraudDetectionCostDto("300");
        fraud.order.shipment.lineItems = ["item1", "item2"];

        request.fraudDetectionRequest = fraud;

        let obj = MdkUtil.convertDTOtoJsonObject(request);
        MdkUtil.maskJson(obj);

        assert.equal(obj["fraudDetectionRequest"]["contacts"][0]["firstName"], "***");
        assert.equal(obj["fraudDetectionRequest"]["contacts"][0]["lastName"], "***");
        assert.equal(obj["fraudDetectionRequest"]["contacts"][1]["firstName"], "***");
        assert.equal(obj["fraudDetectionRequest"]["contacts"][1]["lastName"], "***");


    });


    it("deSerialize CardAuthorizeResponseDto", () => {

        let resultJson = "{\n" +
            "  \"vResultCode\": \"A001000000000000\",\n" +
            "  \"custTxn\": \"30065281\",\n" +
            "  \"acquirerCode\": \"05\",\n" +
            "  \"cardTransactiontype\": \"a\",\n" +
            "  \"centerRequestDate\": \"20190527113315\",\n" +
            "  \"centerResponseDate\": \"20190527113315\",\n" +
            "  \"connectedCenterId\": \"jcn\",\n" +
            "  \"fraudDetectionResponse\": {\n" +
            "    \"agResponse\": {\n" +
            "      \"decision\": \"accept\",\n" +
            "      \"hitReasons\": [\n" +
            "        \"DUMMY-REASON\"\n" +
            "      ],\n" +
            "      \"hitRules\": [\n" +
            "        \"DUMMY-RULE\"\n" +
            "      ]\n" +
            "    },\n" +
            "    \"result\": \"accept\",\n" +
            "    \"service\": \"ag\"\n" +
            "  },\n" +
            "  \"gatewayRequestDate\": \"20190527113315\",\n" +
            "  \"gatewayResponseDate\": \"20190527113315\",\n" +
            "  \"loopback\": \"0\",\n" +
            "  \"pending\": \"0\",\n" +
            "  \"reqAcquirerCode\": \"05\",\n" +
            "  \"reqAmount\": \"100\",\n" +
            "  \"reqCardExpire\": \"*****\",\n" +
            "  \"reqCardNumber\": \"411111********11\",\n" +
            "  \"reqItemCode\": \"0990\",\n" +
            "  \"resActionCode\": \"000\",\n" +
            "  \"resAuthCode\": \"000000\",\n" +
            "  \"resCenterErrorCode\": \"   \",\n" +
            "  \"resReturnReferenceNumber\": \"012345678901\",\n" +
            "  \"marchTxn\": \"30065281\",\n" +
            "  \"merrMsg\": \"処理が成功しました。\",\n" +
            "  \"mstatus\": \"success\",\n" +
            "  \"optionResults\": [],\n" +
            "  \"orderId\": \"order-1558924394\",\n" +
            "  \"serviceType\": \"card\",\n" +
            "  \"txnVersion\": \"1.0.1\"\n" +
            "}";

        try {
            let jsonConvert = new JsonConvert();
            jsonConvert.operationMode = OperationMode.ENABLE;
            jsonConvert.ignorePrimitiveChecks = true;
            jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
            jsonConvert.propertyMatchingRule = PropertyMatchingRule.CASE_INSENSITIVE;

            let obj = JSON.parse(resultJson);
            let response: CardAuthorizeResponseDto = jsonConvert.deserializeObject<CardAuthorizeResponseDto>(obj, CardAuthorizeResponseDto);

            assert.equal(response.orderId, "order-1558924394");
        } catch (e) {
            assert.fail();
        }


    });

});