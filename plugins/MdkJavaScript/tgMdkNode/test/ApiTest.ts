import {describe} from "mocha"
import assert = require('power-assert');
import {MerchantConfig} from "../tgMdk/MerchantConfig";
import {Transaction} from "../tgMdk/Transaction";
import {CardAuthorizeRequestDto} from "../tgMdkDto/Card/CardAuthorizeRequestDto";
import * as Log4js from "log4js";
import {CardAuthorizeResponseDto} from "../tgMdkDto/Card/CardAuthorizeResponseDto";
import {SearchRequestDto} from "../tgMdkDto/Search/SearchRequestDto";
import {CommonSearchParameter} from "../tgMdkDto/Search/CommonSearchParameter";
import {SearchParameters} from "../tgMdkDto/Search/SearchParameters";
import {SearchResponseDto} from "../tgMdkDto/Search/SearchResponseDto";
import {CardCaptureRequestDto} from "../tgMdkDto/Card/CardCaptureRequestDto";
import {CardCaptureResponseDto} from "../tgMdkDto/Card/CardCaptureResponseDto";
import {CardCancelRequestDto} from "../tgMdkDto/Card/CardCancelRequestDto";
import {CardCancelResponseDto} from "../tgMdkDto/Card/CardCancelResponseDto";
import {CardReAuthorizeRequestDto} from "../tgMdkDto/Card/CardReAuthorizeRequestDto";
import {CardReAuthorizeResponseDto} from "../tgMdkDto/Card/CardReAuthorizeResponseDto";
import {MpiAuthorizeRequestDto} from "../tgMdkDto/Mpi/MpiAuthorizeRequestDto";
import {MpiAuthorizeResponseDto} from "../tgMdkDto/Mpi/MpiAuthorizeResponseDto";
import {CvsAuthorizeRequestDto} from "../tgMdkDto/Cvs/CvsAuthorizeRequestDto";
import {CvsAuthorizeResponseDto} from "../tgMdkDto/Cvs/CvsAuthorizeResponseDto";
import {CvsCancelRequestDto} from "../tgMdkDto/Cvs/CvsCancelRequestDto";
import {CvsCancelResponseDto} from "../tgMdkDto/Cvs/CvsCancelResponseDto";
import {Logger} from "log4js";


function getConfig(): MerchantConfig {
    return new MerchantConfig("Set Merchant CcId here.",
        "Set Merchant Secret Key here.", "1");
}

function getLogger(): Logger {
    Log4js.configure(
        {
            appenders: {system: {type: 'stdout'}}, categories: {default: {appenders: ['system'], level: 'info'}}
        }
    );
    return Log4js.getLogger("default");
}

describe('Card Api Test', () => {

    let orderId: string;
    let transaction: Transaction;

    it("Card Authorize Test", async () => {
        let logger = getLogger();
        let config = getConfig();

        transaction = new Transaction(logger, config);

        orderId = 'order-' + Math.floor(((new Date()).getTime()) / 1000).toString();

        let request = new CardAuthorizeRequestDto();
        request.amount = "100";
        request.token = 'abcdef01-2345-6789-abcd-ef0123456789';
        //request.cardNumber = '4111111111111111';
        //request.cardExpire = '12/25';
        request.orderId = orderId;
        request.withCapture = "false";

        let responseDto = await transaction.execute(request, CardAuthorizeResponseDto);

        let requestLog = request.maskedLog;
        let resultJson = responseDto.resultJson;

        assert.equal(responseDto.orderId, request.orderId);
        assert.equal(responseDto.mstatus, "success");

        assert.notEqual(requestLog, null);
        assert.notEqual(resultJson, null);
    });

    it("Order Search Test", async () => {
        let searchRequest = new SearchRequestDto();
        searchRequest.serviceTypeCd = ["card"];
        searchRequest.containDummyFlag = "true";
        searchRequest.searchParameters = new SearchParameters(new CommonSearchParameter(orderId));
        let searchResponseDto = await transaction.execute(searchRequest, SearchResponseDto);
        assert.equal(searchResponseDto.vResultCode, "N001000000000000");
        assert.equal(searchResponseDto.searchCount, "1");
    });

    it("Card Capture Test", async () => {
        let captureRequestDto = new CardCaptureRequestDto();
        captureRequestDto.orderId = orderId;
        captureRequestDto.amount = "100";
        let captureResponseDto = await transaction.execute(captureRequestDto, CardCaptureResponseDto);
        assert.equal(captureResponseDto.mstatus, "success");
    });

    it("Card Cancel Test", async () => {
        let cancelRequestDto = new CardCancelRequestDto();
        cancelRequestDto.orderId = orderId;
        cancelRequestDto.amount = "100";
        let cancelResponseDto = await transaction.execute(cancelRequestDto, CardCancelResponseDto);
        assert.equal(cancelResponseDto.mstatus, "success");
    });

    it("Card ReAuthorize Test", async () => {
        let reAuthorizeRequestDto = new CardReAuthorizeRequestDto();
        reAuthorizeRequestDto.originalOrderId = orderId;
        reAuthorizeRequestDto.orderId = orderId + "-2";
        reAuthorizeRequestDto.amount = "100";
        let cardReAuthorizeResponseDto = await transaction.execute(reAuthorizeRequestDto, CardReAuthorizeResponseDto);
        assert.equal(cardReAuthorizeResponseDto.mstatus, "success");
    });

});

describe('Mpi Api Test', () => {

    let orderId: string;
    let transaction: Transaction;
    let requestId: string;

    it("Mpi Authorize Test", async () => {
        let logger = getLogger();
        let config = getConfig();

        transaction = new Transaction(logger, config);

        orderId = 'order-' + Math.floor(((new Date()).getTime()) / 1000).toString();

        let request = new MpiAuthorizeRequestDto();
        request.serviceOptionType = "mpi-complete";
        request.orderId = orderId;
        request.amount = "100";
        request.token = 'abcdef01-2345-6789-abcd-ef0123456789';
        //request.cardNumber = '4111111111111111';
        //request.cardExpire = '12/25';
        request.withCapture = "false";
        request.redirectionUri = "http://localhost/index.php";
        request.httpUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3800.0 Safari/537.36 Edg/76.0.172.0";
        request.httpAccept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3";

        let responseDto = await transaction.execute(request, MpiAuthorizeResponseDto);

        let requestLog = request.maskedLog;
        let resultJson = responseDto.resultJson;

        assert.equal(responseDto.orderId, request.orderId);
        assert.equal(responseDto.mstatus, "success");

        assert.notEqual(requestLog, null);
        assert.notEqual(resultJson, null);
    });

    /*    it("Mpi Search Test", async () => {
            let searchRequest = new SearchRequestDto();
            searchRequest.requestId = requestId;
            searchRequest.serviceTypeCd = ["card"];
            searchRequest.containDummyFlag = "true";
            let searchResponseDto = await transaction.execute(searchRequest, SearchResponseDto);
            assert.equal(searchResponseDto.vResultCode, "N001000000000000");
            assert.equal(searchResponseDto.searchCount, "1");
        });*/

});


describe('Cvs Api Test', () => {

    let orderId: string;
    let transaction: Transaction;

    it("Cvs Authorize Test", async () => {
        let logger = getLogger();
        let config = getConfig();

        transaction = new Transaction(logger, config);

        orderId = 'order-' + Math.floor(((new Date()).getTime()) / 1000).toString();

        let request = new CvsAuthorizeRequestDto();
        request.serviceOptionType = "sej";
        request.orderId = orderId;
        request.amount = "100";
        request.name1 = "支払い";
        request.name2 = "太郎";
        request.serviceOptionType = "sej";
        request.telNo = "090-0000-0000";
        request.payLimit = "2019/08/01";
        request.paymentType = "0";

        let responseDto = await transaction.execute(request, CvsAuthorizeResponseDto);

        let requestLog = request.maskedLog;
        let resultJson = responseDto.resultJson;

        assert.equal(responseDto.orderId, request.orderId);
        assert.equal(responseDto.mstatus, "success");

        assert.notEqual(requestLog, null);
        assert.notEqual(resultJson, null);
    });

    it("Cvs Cancel Test", async () => {
        let cvsCancelRequestDto = new CvsCancelRequestDto();
        cvsCancelRequestDto.serviceOptionType = "sej";
        cvsCancelRequestDto.orderId = orderId;
        let cancelResponseDto = await transaction.execute(cvsCancelRequestDto, CvsCancelResponseDto);
        assert.equal(cancelResponseDto.mstatus, "success");
    });

});