import {describe} from "mocha"
import assert = require('power-assert');
import {MerchantConfig} from "../tgMdk/MerchantConfig";
import {Transaction} from "../tgMdk/Transaction";
import {CardAuthorizeRequestDto} from "../tgMdkDto/Card/CardAuthorizeRequestDto";
import * as Log4js from "log4js";
import {CardAuthorizeResponseDto} from "../tgMdkDto/Card/CardAuthorizeResponseDto";
import {Mock, It, Times} from "moq.ts";
import {IHttpClient} from "../tgMdk/IHttpClient";
import {Response} from "request";
import {IncomingMessage} from "http";
import {Socket} from "net";

describe('Transaction Test', () => {

    const merchantCcId: string = "some_merchant_ccid";
    const merchantSecret: string = "some_merchant_secret_key";

    it("Card url Test", () => {

        let request = new CardAuthorizeRequestDto();
        request.amount = "100";
        request.orderId = 'some_order_id';
        request.accountId = 'some_account_id';
        request.token = 'abcdef01-2345-6789-abcd-ef0123456789';
        request.birthday = "0526";
        request.tel = "1234";
        request.firstKanaName = "ﾃｽﾄﾀﾛｳ";
        request.lastKanaName = "ﾃｽﾄｽｽﾞｷ";

        let config = new MerchantConfig(merchantCcId, merchantSecret);

        let url = Transaction.createSendUrl(request, config.host, MerchantConfig.ADD_URL_PAYMENT,
            MerchantConfig.ADD_URL_PAYMENT_VERSION, MerchantConfig.PAYNOWID_SERVICE_TYPE,
            MerchantConfig.ADD_URL_VTID, MerchantConfig.ADD_URL_VTID_VERSION,
            MerchantConfig.SERVICE_COMMAND_SEARCH, MerchantConfig.SEARCH_SERVER,
            config.dummyRequest, MerchantConfig.DUMMY_SERVER);

        assert.equal(url, "https://api.veritrans.co.jp:443/paynow/v2/Authorize/card");

        url = Transaction.createSendUrl(request, config.host, MerchantConfig.ADD_URL_PAYMENT,
            MerchantConfig.ADD_URL_PAYMENT_VERSION, MerchantConfig.PAYNOWID_SERVICE_TYPE,
            MerchantConfig.ADD_URL_VTID, MerchantConfig.ADD_URL_VTID_VERSION,
            MerchantConfig.SERVICE_COMMAND_SEARCH, MerchantConfig.SEARCH_SERVER,
            "1", MerchantConfig.DUMMY_SERVER);

        assert.equal(url, "https://api.veritrans.co.jp:443/test-paynow/v2/Authorize/card");

    });

    it("Card request Test success", async () => {
        Log4js.configure(
            {
                appenders: {system: {type: 'stdout'}}, categories: {default: {appenders: ['system'], level: 'info'}}
            }
        );
        let logger = Log4js.getLogger("default");
        let config = new MerchantConfig(merchantCcId, merchantSecret);

        let responseMock = new Mock<Response>("Response mock");
        responseMock.setup(instance => instance.body).returns("{\"result\":{\"vResultCode\":\"A001000000000000\",\"custTxn\":\"30446978\",\"acquirerCode\":\"05\",\"cardTransactiontype\":\"a\",\"centerRequestDate\":\"20190531140107\",\"centerResponseDate\":\"20190531140107\",\"connectedCenterId\":\"jcn\",\"fraudDetectionResponse\":{\"agResponse\":{\"decision\":\"accept\",\"hitReasons\":[\"DUMMY-REASON\"],\"hitRules\":[\"DUMMY-RULE\"]},\"result\":\"accept\",\"service\":\"ag\"},\"gatewayRequestDate\":\"20190531140107\",\"gatewayResponseDate\":\"20190531140107\",\"loopback\":\"0\",\"pending\":\"0\",\"reqAcquirerCode\":\"05\",\"reqAmount\":\"100\",\"reqCardExpire\":\"*****\",\"reqCardNumber\":\"411111********11\",\"reqItemCode\":\"0990\",\"resActionCode\":\"000\",\"resAuthCode\":\"000000\",\"resCenterErrorCode\":\"   \",\"resReturnReferenceNumber\":\"012345678901\",\"marchTxn\":\"30446978\",\"merrMsg\":\"処理が成功しました。\",\"mstatus\":\"success\",\"optionResults\":[],\"orderId\":\"order-1559278058\",\"serviceType\":\"card\",\"txnVersion\":\"1.0.1\"}}");
        responseMock.setup(instance => instance.statusCode).returns(200);

        let httpClientMock = new Mock<IHttpClient>("HttpClient mock");
        httpClientMock.setup(
            instance => instance.execute(
                It.Is<string>(value => value === "https://api.veritrans.co.jp:443/paynow/v2/Authorize/card"),
                It.IsAny<string>())
        ).returns(
            await new Promise<Response>(resolve => resolve(responseMock.object())));

        let transaction = new Transaction(logger, config, httpClientMock.object());
        let request = genDto();

        let responseDto = await transaction.execute(request, CardAuthorizeResponseDto);
        httpClientMock.verify(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>()), Times.Once());
        assert.equal(responseDto.mstatus, "success");
        assert.equal(responseDto.orderId, request.orderId);

    });

    it("Card request Test 500", async () => {
        Log4js.configure(
            {
                appenders: {system: {type: 'stdout'}}, categories: {default: {appenders: ['system'], level: 'info'}}
            }
        );
        let logger = Log4js.getLogger("default");
        let config = new MerchantConfig(merchantCcId, merchantSecret);

        let response = new IncomingMessage(new Socket());
        response.statusCode = 500;

        let httpClientMock: Mock<IHttpClient>;
        httpClientMock = new Mock<IHttpClient>("HttpClient mock 2");
        httpClientMock.setup(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>())).throws(response);

        let transaction = new Transaction(logger, config, httpClientMock.object());

        let request = genDto();

        let responseDto = await transaction.execute(request, CardAuthorizeResponseDto);
        httpClientMock.verify(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>()), Times.Once());
        assert.equal(responseDto.vResultCode, "MF05000000000000");
    });

    it("Card request Test 502", async () => {
        Log4js.configure(
            {
                appenders: {system: {type: 'stdout'}}, categories: {default: {appenders: ['system'], level: 'info'}}
            }
        );
        let logger = Log4js.getLogger("default");
        let config = new MerchantConfig(merchantCcId, merchantSecret);

        let response = new IncomingMessage(new Socket());
        response.statusCode = 502;

        let httpClientMock: Mock<IHttpClient>;
        httpClientMock = new Mock<IHttpClient>("HttpClient mock 2");
        httpClientMock.setup(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>())).throws(response);

        let transaction = new Transaction(logger, config, httpClientMock.object());

        let request = genDto();

        let responseDto = await transaction.execute(request, CardAuthorizeResponseDto);
        httpClientMock.verify(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>()), Times.Once());
        assert.equal(responseDto.vResultCode, "MF06000000000000");
    });

    it("Card request Test 503", async () => {
        Log4js.configure(
            {
                appenders: {system: {type: 'stdout'}}, categories: {default: {appenders: ['system'], level: 'info'}}
            }
        );
        let logger = Log4js.getLogger("default");
        let config = new MerchantConfig(merchantCcId, merchantSecret);

        let response = new IncomingMessage(new Socket());
        response.statusCode = 503;

        let httpClientMock: Mock<IHttpClient>;
        httpClientMock = new Mock<IHttpClient>("HttpClient mock 2");
        httpClientMock.setup(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>())).throws(response);

        let transaction = new Transaction(logger, config, httpClientMock.object());

        let request = genDto();

        let responseDto = await transaction.execute(request, CardAuthorizeResponseDto);
        httpClientMock.verify(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>()), Times.Once());
        assert.equal(responseDto.vResultCode, "MF07000000000000");
    });

    it("Card request Test 505", async () => {
        Log4js.configure(
            {
                appenders: {system: {type: 'stdout'}}, categories: {default: {appenders: ['system'], level: 'info'}}
            }
        );
        let logger = Log4js.getLogger("default");
        let config = new MerchantConfig(merchantCcId, merchantSecret);

        let response = new IncomingMessage(new Socket());
        response.statusCode = 505;

        let httpClientMock: Mock<IHttpClient>;
        httpClientMock = new Mock<IHttpClient>("HttpClient mock 2");
        httpClientMock.setup(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>())).throws(response);

        let transaction = new Transaction(logger, config, httpClientMock.object());

        let request = genDto();
        let responseDto = await transaction.execute(request, CardAuthorizeResponseDto);
        httpClientMock.verify(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>()), Times.Once());
        assert.equal(responseDto.vResultCode, "MF02000000000000");
    });

    it("Card request Test ETIMEDOUT", async () => {
        Log4js.configure(
            {
                appenders: {system: {type: 'stdout'}}, categories: {default: {appenders: ['system'], level: 'info'}}
            }
        );
        let logger = Log4js.getLogger("default");
        let config = new MerchantConfig(merchantCcId, merchantSecret);

        let response = new Error();
        response["code"] = "ETIMEDOUT";

        let httpClientMock: Mock<IHttpClient>;
        httpClientMock = new Mock<IHttpClient>("HttpClient mock 2");
        httpClientMock.setup(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>())).throws(response);

        let transaction = new Transaction(logger, config, httpClientMock.object());

        let request = genDto();

        let responseDto = await transaction.execute(request, CardAuthorizeResponseDto);
        httpClientMock.verify(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>()), Times.Once());
        assert.equal(responseDto.vResultCode, "MF03000000000000");
    });

    it("Card request Test ENOTFOUND", async () => {
        Log4js.configure(
            {
                appenders: {system: {type: 'stdout'}}, categories: {default: {appenders: ['system'], level: 'info'}}
            }
        );
        let logger = Log4js.getLogger("default");
        let config = new MerchantConfig(merchantCcId, merchantSecret);

        let response = new Error();
        response["code"] = "ENOTFOUND";

        let httpClientMock: Mock<IHttpClient>;
        httpClientMock = new Mock<IHttpClient>("HttpClient mock 2");
        httpClientMock.setup(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>())).throws(response);

        let transaction = new Transaction(logger, config, httpClientMock.object());

        let request = genDto();

        let responseDto = await transaction.execute(request, CardAuthorizeResponseDto);
        httpClientMock.verify(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>()), Times.Once());
        assert.equal(responseDto.vResultCode, "MF04000000000000");
    });

    it("Card request Test other code", async () => {
        Log4js.configure(
            {
                appenders: {system: {type: 'stdout'}}, categories: {default: {appenders: ['system'], level: 'info'}}
            }
        );
        let logger = Log4js.getLogger("default");
        let config = new MerchantConfig(merchantCcId, merchantSecret);

        let response = new Error();
        response["code"] = "OTHER";

        let httpClientMock: Mock<IHttpClient>;
        httpClientMock = new Mock<IHttpClient>("HttpClient mock 2");
        httpClientMock.setup(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>())).throws(response);

        let transaction = new Transaction(logger, config, httpClientMock.object());

        let request = genDto();

        let responseDto = await transaction.execute(request, CardAuthorizeResponseDto);
        httpClientMock.verify(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>()), Times.Once());
        assert.equal(responseDto.vResultCode, "MF99000000000000");
    });

    it("Card request Test SSL Error", async () => {
        Log4js.configure(
            {
                appenders: {system: {type: 'stdout'}}, categories: {default: {appenders: ['system'], level: 'info'}}
            }
        );
        let logger = Log4js.getLogger("default");
        let config = new MerchantConfig(merchantCcId, merchantSecret);

        let response = new Error("SSL Error");

        let httpClientMock: Mock<IHttpClient>;
        httpClientMock = new Mock<IHttpClient>("HttpClient mock 2");
        httpClientMock.setup(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>())).throws(response);

        let transaction = new Transaction(logger, config, httpClientMock.object());

        let request = genDto();

        let responseDto = await transaction.execute(request, CardAuthorizeResponseDto);
        httpClientMock.verify(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>()), Times.Once());
        assert.equal(responseDto.vResultCode, "MB03000000000000");
    });

    it("Card request Test other message", async () => {
        Log4js.configure(
            {
                appenders: {system: {type: 'stdout'}}, categories: {default: {appenders: ['system'], level: 'info'}}
            }
        );
        let logger = Log4js.getLogger("default");
        let config = new MerchantConfig(merchantCcId, merchantSecret);

        let response = new Error("Some Error Message");

        let httpClientMock: Mock<IHttpClient>;
        httpClientMock = new Mock<IHttpClient>("HttpClient mock 2");
        httpClientMock.setup(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>())).throws(response);

        let transaction = new Transaction(logger, config, httpClientMock.object());

        let request = genDto();

        let responseDto = await transaction.execute(request, CardAuthorizeResponseDto);
        httpClientMock.verify(instance => instance.execute(It.IsAny<string>(), It.IsAny<string>()), Times.Once());
        assert.equal(responseDto.vResultCode, "MF99000000000000");
    });

    function genDto(): CardAuthorizeRequestDto {
        let request = new CardAuthorizeRequestDto();
        request.amount = "100";
        request.orderId = 'order-1559278058';
        request.token = 'abcdef01-2345-6789-abcd-ef0123456789';
        return request;
    }

});