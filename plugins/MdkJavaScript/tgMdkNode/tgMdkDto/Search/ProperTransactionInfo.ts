import {JsonObject, JsonProperty} from "json2typescript";
import {MasterInfo} from "./MasterInfo";
import {TransactionInfo} from "./TransactionInfo";

@JsonObject("properTransactionInfo")
export class ProperTransactionInfo {

    @JsonProperty("txnKind", String, true)
    txnKind: string = undefined;

    @JsonProperty("emTxnType", String, true)
    emTxnType: string = undefined;

    @JsonProperty("centerProcDatetime", String, true)
    centerProcDatetime: string = undefined;

    @JsonProperty("cardType", String, true)
    cardType: string = undefined;

    @JsonProperty("cardNo", String, true)
    cardNo: string = undefined;

    @JsonProperty("cardBrandCode", String, true)
    cardBrandCode: string = undefined;

    @JsonProperty("settlementStatus", String, true)
    settlementStatus: string = undefined;

    @JsonProperty("cvsTxnType", String, true)
    cvsTxnType: string = undefined;

    @JsonProperty("peTxnType", String, true)
    peTxnType: string = undefined;

    @JsonProperty("receiptNo", String, true)
    receiptNo: string = undefined;

    @JsonProperty("startDatetime", String, true)
    startDatetime: string = undefined;

    @JsonProperty("cardTransactionType", String, true)
    cardTransactionType: string = undefined;

    @JsonProperty("gatewayRequestDate", String, true)
    gatewayRequestDate: string = undefined;

    @JsonProperty("gatewayResponseDate", String, true)
    gatewayResponseDate: string = undefined;

    @JsonProperty("centerRequestDate", String, true)
    centerRequestDate: string = undefined;

    @JsonProperty("centerResponseDate", String, true)
    centerResponseDate: string = undefined;

    @JsonProperty("centerRequestNumber", String, true)
    centerRequestNumber: string = undefined;

    @JsonProperty("centerReferenceNumber", String, true)
    centerReferenceNumber: string = undefined;

    @JsonProperty("reqItemCode", String, true)
    reqItemCode: string = undefined;

    @JsonProperty("resItemCode", String, true)
    resItemCode: string = undefined;

    @JsonProperty("reqReturnReferenceNumber", String, true)
    reqReturnReferenceNumber: string = undefined;

    @JsonProperty("responsedata", String, true)
    responsedata: string = undefined;

    @JsonProperty("pending", String, true)
    pending: string = undefined;

    @JsonProperty("loopback", String, true)
    loopback: string = undefined;

    @JsonProperty("connectedCenterId", String, true)
    connectedCenterId: string = undefined;

    @JsonProperty("reqCardNumber", String, true)
    reqCardNumber: string = undefined;

    @JsonProperty("reqCardExpire", String, true)
    reqCardExpire: string = undefined;

    @JsonProperty("reqAmount", String, true)
    reqAmount: string = undefined;

    @JsonProperty("reqCardOptionType", String, true)
    reqCardOptionType: string = undefined;

    @JsonProperty("reqMerchantTransaction", String, true)
    reqMerchantTransaction: string = undefined;

    @JsonProperty("reqAuthCode", String, true)
    reqAuthCode: string = undefined;

    @JsonProperty("reqAcquirerCode", String, true)
    reqAcquirerCode: string = undefined;

    @JsonProperty("reqCardCenter", String, true)
    reqCardCenter: string = undefined;

    @JsonProperty("reqJpoInformation", String, true)
    reqJpoInformation: string = undefined;

    @JsonProperty("reqSalesDay", String, true)
    reqSalesDay: string = undefined;

    @JsonProperty("reqCancelDay", String, true)
    reqCancelDay: string = undefined;

    @JsonProperty("reqWithCapture", String, true)
    reqWithCapture: string = undefined;

    @JsonProperty("reqWithDirect", String, true)
    reqWithDirect: string = undefined;

    @JsonProperty("req3dMessageVersion", String, true)
    req3dMessageVersion: string = undefined;

    @JsonProperty("req3dTransactionId", String, true)
    req3dTransactionId: string = undefined;

    @JsonProperty("req3dTransactionStatus", String, true)
    req3dTransactionStatus: string = undefined;

    @JsonProperty("req3dCavvAlgorithm", String, true)
    req3dCavvAlgorithm: string = undefined;

    @JsonProperty("req3dCavv", String, true)
    req3dCavv: string = undefined;

    @JsonProperty("req3dEci", String, true)
    req3dEci: string = undefined;

    @JsonProperty("reqSecurityCode", String, true)
    reqSecurityCode: string = undefined;

    @JsonProperty("reqAuthFlag", String, true)
    reqAuthFlag: string = undefined;

    @JsonProperty("reqBirthday", String, true)
    reqBirthday: string = undefined;

    @JsonProperty("reqTel", String, true)
    reqTel: string = undefined;

    @JsonProperty("reqFirstKanaName", String, true)
    reqFirstKanaName: string = undefined;

    @JsonProperty("reqLastKanaName", String, true)
    reqLastKanaName: string = undefined;

    @JsonProperty("resMerchantTransaction", String, true)
    resMerchantTransaction: string = undefined;

    @JsonProperty("resReturnReferenceNumber", String, true)
    resReturnReferenceNumber: string = undefined;

    @JsonProperty("resAuthCode", String, true)
    resAuthCode: string = undefined;

    @JsonProperty("resActionCode", String, true)
    resActionCode: string = undefined;

    @JsonProperty("resCenterErrorCode", String, true)
    resCenterErrorCode: string = undefined;

    @JsonProperty("resAuthTerm", String, true)
    resAuthTerm: string = undefined;

    @JsonProperty("reqWithNew", String, true)
    reqWithNew: string = undefined;

    @JsonProperty("amount", String, true)
    amount: string = undefined;

    @JsonProperty("txnFixed", String, true)
    txnFixed: string = undefined;

    @JsonProperty("ppTxnType", String, true)
    ppTxnType: string = undefined;

    @JsonProperty("centerTxnId", String, true)
    centerTxnId: string = undefined;

    @JsonProperty("feeAmount", String, true)
    feeAmount: string = undefined;

    @JsonProperty("exchangeRate", String, true)
    exchangeRate: string = undefined;

    @JsonProperty("netRefundAmount", String, true)
    netRefundAmount: string = undefined;

    @JsonProperty("mpiTransactionType", String, true)
    mpiTransactionType: string = undefined;

    @JsonProperty("reqRedirectionUri", String, true)
    reqRedirectionUri: string = undefined;

    @JsonProperty("corporationId", String, true)
    corporationId: string = undefined;

    @JsonProperty("brandId", String, true)
    brandId: string = undefined;

    @JsonProperty("acquirerBinary", String, true)
    acquirerBinary: string = undefined;

    @JsonProperty("dsLoginId", String, true)
    dsLoginId: string = undefined;

    @JsonProperty("crresStatus", String, true)
    crresStatus: string = undefined;

    @JsonProperty("veresStatus", String, true)
    veresStatus: string = undefined;

    @JsonProperty("paresStatus", String, true)
    paresStatus: string = undefined;

    @JsonProperty("paresSign", String, true)
    paresSign: string = undefined;

    @JsonProperty("paresEci", String, true)
    paresEci: string = undefined;

    @JsonProperty("authResponseCode", String, true)
    authResponseCode: string = undefined;

    @JsonProperty("verifyResponseCode", String, true)
    verifyResponseCode: string = undefined;

    @JsonProperty("res3dMessageVersion", String, true)
    res3dMessageVersion: string = undefined;

    @JsonProperty("res3dTransactionId", String, true)
    res3dTransactionId: string = undefined;

    @JsonProperty("res3dTransactionStatus", String, true)
    res3dTransactionStatus: string = undefined;

    @JsonProperty("res3dCavvAlgorithm", String, true)
    res3dCavvAlgorithm: string = undefined;

    @JsonProperty("res3dCavv", String, true)
    res3dCavv: string = undefined;

    @JsonProperty("res3dEci", String, true)
    res3dEci: string = undefined;

    @JsonProperty("authRequestDatetime", String, true)
    authRequestDatetime: string = undefined;

    @JsonProperty("authResponseDatetime", String, true)
    authResponseDatetime: string = undefined;

    @JsonProperty("verifyRequestDatetime", String, true)
    verifyRequestDatetime: string = undefined;

    @JsonProperty("verifyResponseDatetime", String, true)
    verifyResponseDatetime: string = undefined;

    @JsonProperty("reqCurrencyUnit", String, true)
    reqCurrencyUnit: string = undefined;

    @JsonProperty("aqAqfWalletBalance", String, true)
    aqAqfWalletBalance: string = undefined;

    @JsonProperty("aqAqfPointBalance", String, true)
    aqAqfPointBalance: string = undefined;

    @JsonProperty("aqAvailableValue", String, true)
    aqAvailableValue: string = undefined;

    @JsonProperty("upopTxnType", String, true)
    upopTxnType: string = undefined;

    @JsonProperty("resUpopSettleAmount", String, true)
    resUpopSettleAmount: string = undefined;

    @JsonProperty("resUpopSettleDate", String, true)
    resUpopSettleDate: string = undefined;

    @JsonProperty("resUpopSettleCurrency", String, true)
    resUpopSettleCurrency: string = undefined;

    @JsonProperty("resUpopExchangeDate", String, true)
    resUpopExchangeDate: string = undefined;

    @JsonProperty("resUpopExchangeRate", String, true)
    resUpopExchangeRate: string = undefined;

    @JsonProperty("resUpopOrderId", String, true)
    resUpopOrderId: string = undefined;


    @JsonProperty("centerTradeId", String, true)
    centerTradeId: string = undefined;

    @JsonProperty("alipayTxnType", String, true)
    alipayTxnType: string = undefined;

    @JsonProperty("settleAmount", String, true)
    settleAmount: string = undefined;

    @JsonProperty("settleCurrency", String, true)
    settleCurrency: string = undefined;

    @JsonProperty("paymentTime", String, true)
    paymentTime: string = undefined;

    @JsonProperty("settlementTime", String, true)
    settlementTime: string = undefined;

    @JsonProperty("payType", String, true)
    payType: string = undefined;


    @JsonProperty("crResultCode", String, true)
    crResultCode: string = undefined;

    @JsonProperty("detailCommandType", String, true)
    detailCommandType: string = undefined;

    @JsonProperty("crRequestDatetime", String, true)
    crRequestDatetime: string = undefined;

    @JsonProperty("crResponseDatetime", String, true)
    crResponseDatetime: string = undefined;

    @JsonProperty("oricoTxnType", String, true)
    oricoTxnType: string = undefined;

    @JsonProperty("orderStateCode", String, true)
    orderStateCode: string = undefined;

    @JsonProperty("approvalNo", String, true)
    approvalNo: string = undefined;

    @JsonProperty("requestDate", String, true)
    requestDate: string = undefined;

    @JsonProperty("loanPrincipal", String, true)
    loanPrincipal: string = undefined;

    @JsonProperty("paymentCount", String, true)
    paymentCount: string = undefined;

    @JsonProperty("jpyAmount", String, true)
    jpyAmount: string = undefined;

    @JsonProperty("resMcpResponseCode", String, true)
    resMcpResponseCode: string = undefined;

    @JsonProperty("rakutenApiErrorCode", String, true)
    rakutenApiErrorCode: string = undefined;

    @JsonProperty("rakutenOrderErrorCode", String, true)
    rakutenOrderErrorCode: string = undefined;

    @JsonProperty("rakutenRequestDatetime", String, true)
    rakutenRequestDatetime: string = undefined;

    @JsonProperty("rakutenResponseDatetime", String, true)
    rakutenResponseDatetime: string = undefined;

    @JsonProperty("recruitErrorCode", String, true)
    recruitErrorCode: string = undefined;

    @JsonProperty("recruitRequestDatetime", String, true)
    recruitRequestDatetime: string = undefined;

    @JsonProperty("recruitResponseDatetime", String, true)
    recruitResponseDatetime: string = undefined;

    @JsonProperty("linepayErrorCode", String, true)
    linepayErrorCode: string = undefined;

    @JsonProperty("linepayRequestDatetime", String, true)
    linepayRequestDatetime: string = undefined;

    @JsonProperty("linepayResponseDatetime", String, true)
    linepayResponseDatetime: string = undefined;

    @JsonProperty("authCode", String, true)
    authCode: string = undefined;

    @JsonProperty("referenceNumber", String, true)
    referenceNumber: string = undefined;

    @JsonProperty("cardVResultCode", String, true)
    cardVResultCode: string = undefined;

    @JsonProperty("masterpassRequestDatetime", String, true)
    masterpassRequestDatetime: string = undefined;

    @JsonProperty("masterpassResponseDatetime", String, true)
    masterpassResponseDatetime: string = undefined;

    @JsonProperty("withReconcile", String, true)
    withReconcile: string = undefined;

    @JsonProperty("depositId", String, true)
    depositId: string = undefined;

    @JsonProperty("registrationMethod", String, true)
    registrationMethod: string = undefined;

    @JsonProperty("depositDate", String, true)
    depositDate: string = undefined;

    @JsonProperty("transferName", String, true)
    transferName: string = undefined;

    @JsonProperty("tenpayErrorCode", String, true)
    tenpayErrorCode: string = undefined;

    @JsonProperty("tenpayRequestDatetime", String, true)
    tenpayRequestDatetime: string = undefined;

    @JsonProperty("tenpayResponseDatetime", String, true)
    tenpayResponseDatetime: string = undefined;

    @JsonProperty("amountBtc", String, true)
    amountBtc: string = undefined;

    @JsonProperty("bitcoinRequestDatetime", String, true)
    bitcoinRequestDatetime: string = undefined;

    @JsonProperty("bitcoinResponseDatetime", String, true)
    bitcoinResponseDatetime: string = undefined;

    @JsonProperty("resCenterProcessNumber", String, true)
    resCenterProcessNumber: string = undefined;

    @JsonProperty("resCenterSendDateTime", String, true)
    resCenterSendDateTime: string = undefined;


}