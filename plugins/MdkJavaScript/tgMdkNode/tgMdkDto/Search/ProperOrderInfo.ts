import {JsonObject, JsonProperty} from "json2typescript";
import {Masters} from "./Masters";

@JsonObject("properOrderInfo")
export class ProperOrderInfo {

    @JsonProperty("settlementMethod", String, true)
    settlementMethod: string = undefined;

    @JsonProperty("settlementType", String, true)
    settlementType: string = undefined;

    @JsonProperty("amount", String, true)
    amount: string = undefined;

    @JsonProperty("authorizeAmount", String, true)
    authorizeAmount: string = undefined;

    @JsonProperty("balance", String, true)
    balance: string = undefined;

    @JsonProperty("usedPoint", String, true)
    usedPoint: string = undefined;

    @JsonProperty("usePoint", String, true)
    usePoint: string = undefined;

    @JsonProperty("givePoint", String, true)
    givePoint: string = undefined;

    @JsonProperty("recruitCoupon", String, true)
    recruitCoupon: string = undefined;

    @JsonProperty("merchantCoupon", String, true)
    merchantCoupon: string = undefined;

    @JsonProperty("settlementLimit", String, true)
    settlementLimit: string = undefined;

    @JsonProperty("forwardMailFlag", String, true)
    forwardMailFlag: string = undefined;

    @JsonProperty("merchantMailAddr", String, true)
    merchantMailAddr: string = undefined;

    @JsonProperty("cancelMailAddr", String, true)
    cancelMailAddr: string = undefined;

    @JsonProperty("requestMailAddInfo", String, true)
    requestMailAddInfo: string = undefined;

    @JsonProperty("completeMailAddInfo", String, true)
    completeMailAddInfo: string = undefined;

    @JsonProperty("shopName", String, true)
    shopName: string = undefined;

    @JsonProperty("completeMailFlag", String, true)
    completeMailFlag: string = undefined;

    @JsonProperty("confirmScreenAddInfo", String, true)
    confirmScreenAddInfo: string = undefined;

    @JsonProperty("completeScreenAddInfo", String, true)
    completeScreenAddInfo: string = undefined;

    @JsonProperty("screenTitle", String, true)
    screenTitle: string = undefined;

    @JsonProperty("completeReturnKind", String, true)
    completeReturnKind: string = undefined;

    @JsonProperty("completeReturnUrl", String, true)
    completeReturnUrl: string = undefined;

    @JsonProperty("completeNoticeUrl", String, true)
    completeNoticeUrl: string = undefined;

    @JsonProperty("salesType", String, true)
    salesType: string = undefined;

    @JsonProperty("free", String, true)
    free: string = undefined;

    @JsonProperty("refundOrderCtlId", String, true)
    refundOrderCtlId: string = undefined;

    @JsonProperty("appUrl", String, true)
    appUrl: string = undefined;

    @JsonProperty("orderKind", String, true)
    orderKind: string = undefined;

    @JsonProperty("completeDatetime", String, true)
    completeDatetime: string = undefined;

    @JsonProperty("reAuthorizeRedirectionUrl", String, true)
    reAuthorizeRedirectionUrl: string = undefined;

    @JsonProperty("transactionKind", String, true)
    transactionKind: string = undefined;

    @JsonProperty("userId", String, true)
    userId: string = undefined;

    @JsonProperty("settlementId", String, true)
    settlementId: string = undefined;

    @JsonProperty("reAuthAppUrl", String, true)
    reAuthAppUrl: string = undefined;

    @JsonProperty("cvsType", String, true)
    cvsType: string = undefined;

    @JsonProperty("name1", String, true)
    name1: string = undefined;

    @JsonProperty("name2", String, true)
    name2: string = undefined;

    @JsonProperty("kana", String, true)
    kana: string = undefined;

    @JsonProperty("telNo", String, true)
    telNo: string = undefined;

    @JsonProperty("mailAddr", String, true)
    mailAddr: string = undefined;

    @JsonProperty("free1", String, true)
    free1: string = undefined;

    @JsonProperty("free2", String, true)
    free2: string = undefined;

    @JsonProperty("payLimit", String, true)
    payLimit: string = undefined;

    @JsonProperty("payLimitDatetime", String, true)
    payLimitDatetime: string = undefined;

    @JsonProperty("receiptNo", String, true)
    receiptNo: string = undefined;

    @JsonProperty("paidDatetime", String, true)
    paidDatetime: string = undefined;

    @JsonProperty("receivedDatetime", String, true)
    receivedDatetime: string = undefined;

    @JsonProperty("startTxn", String, true)
    startTxn: string = undefined;

    @JsonProperty("dddMessageVersion", String, true)
    dddMessageVersion: string = undefined;

    @JsonProperty("requestCurrencyUnit", String, true)
    requestCurrencyUnit: string = undefined;

    @JsonProperty("cardExpire", String, true)
    cardExpire: string = undefined;

    @JsonProperty("tradUrl", String, true)
    tradUrl: string = undefined;

    @JsonProperty("invoiceId", String, true)
    invoiceId: string = undefined;

    @JsonProperty("payerId", String, true)
    payerId: string = undefined;

    @JsonProperty("paymentDatetime", String, true)
    paymentDatetime: string = undefined;

    @JsonProperty("merchantRedirectUri", String, true)
    merchantRedirectUri: string = undefined;

    @JsonProperty("totalAmount", String, true)
    totalAmount: string = undefined;

    @JsonProperty("walletAmount", String, true)
    walletAmount: string = undefined;

    @JsonProperty("cardAmount", String, true)
    cardAmount: string = undefined;

    @JsonProperty("cardOrderId", String, true)
    cardOrderId: string = undefined;


    @JsonProperty("crServiceType", String, true)
    crServiceType: string = undefined;

    @JsonProperty("withCapture", String, true)
    withCapture: string = undefined;

    @JsonProperty("accountingType", String, true)
    accountingType: string = undefined;

    @JsonProperty("itemInfo", String, true)
    itemInfo: string = undefined;

    @JsonProperty("itemId", String, true)
    itemId: string = undefined;

    @JsonProperty("itemType", String, true)
    itemType: string = undefined;

    @JsonProperty("terminalKind", String, true)
    terminalKind: string = undefined;

    @JsonProperty("authorizeDatetime", String, true)
    authorizeDatetime: string = undefined;

    @JsonProperty("captureDatetime", String, true)
    captureDatetime: string = undefined;

    @JsonProperty("cancelDatetime", String, true)
    cancelDatetime: string = undefined;

    @JsonProperty("mpFirstDate", String, true)
    mpFirstDate: string = undefined;

    @JsonProperty("mpDay", String, true)
    mpDay: string = undefined;

    @JsonProperty("mpStatus", String, true)
    mpStatus: string = undefined;

    @JsonProperty("mpOrderId", String, true)
    mpOrderId: string = undefined;

    @JsonProperty("mpTxnStatusType", String, true)
    mpTxnStatusType: string = undefined;

    @JsonProperty("mpCaptureDatetime", String, true)
    mpCaptureDatetime: string = undefined;

    @JsonProperty("mpCancelDatetime", String, true)
    mpCancelDatetime: string = undefined;

    @JsonProperty("mpTerminateDatetime", String, true)
    mpTerminateDatetime: string = undefined;

    @JsonProperty("crOrderId", String, true)
    crOrderId: string = undefined;

    @JsonProperty("d3Flag", String, true)
    d3Flag: string = undefined;

    @JsonProperty("fletsArea", String, true)
    fletsArea: string = undefined;


    @JsonProperty("merchantRedirectionUrl", String, true)
    merchantRedirectionUrl: string = undefined;

    @JsonProperty("oricoOrderNo", String, true)
    oricoOrderNo: string = undefined;

    @JsonProperty("userNo", String, true)
    userNo: string = undefined;

    @JsonProperty("itemName", String, true)
    itemName: string = undefined;

    @JsonProperty("itemName1", String, true)
    itemName1: string = undefined;

    @JsonProperty("itemCount1", String, true)
    itemCount1: string = undefined;

    @JsonProperty("itemAmount1", String, true)
    itemAmount1: string = undefined;

    @JsonProperty("itemName2", String, true)
    itemName2: string = undefined;

    @JsonProperty("itemCount2", String, true)
    itemCount2: string = undefined;

    @JsonProperty("itemAmount2", String, true)
    itemAmount2: string = undefined;

    @JsonProperty("itemName3", String, true)
    itemName3: string = undefined;

    @JsonProperty("itemCount3", String, true)
    itemCount3: string = undefined;

    @JsonProperty("itemAmount3", String, true)
    itemAmount3: string = undefined;

    @JsonProperty("itemName4", String, true)
    itemName4: string = undefined;

    @JsonProperty("itemCount4", String, true)
    itemCount4: string = undefined;

    @JsonProperty("itemAmount4", String, true)
    itemAmount4: string = undefined;

    @JsonProperty("itemName5", String, true)
    itemName5: string = undefined;

    @JsonProperty("itemCount5", String, true)
    itemCount5: string = undefined;

    @JsonProperty("itemAmount5", String, true)
    itemAmount5: string = undefined;

    @JsonProperty("totalItemAmount", String, true)
    totalItemAmount: string = undefined;

    @JsonProperty("totalCarriage", String, true)
    totalCarriage: string = undefined;

    @JsonProperty("deposit", String, true)
    deposit: string = undefined;

    @JsonProperty("shippingZipCode", String, true)
    shippingZipCode: string = undefined;

    @JsonProperty("handlingContractNo", String, true)
    handlingContractNo: string = undefined;

    @JsonProperty("memberStoreNo", String, true)
    memberStoreNo: string = undefined;

    @JsonProperty("contractDocumentKbn", String, true)
    contractDocumentKbn: string = undefined;

    @JsonProperty("webDescriptionId", String, true)
    webDescriptionId: string = undefined;

    @JsonProperty("rakutenOrderId", String, true)
    rakutenOrderId: string = undefined;

    @JsonProperty("recruitOrderId", String, true)
    recruitOrderId: string = undefined;

    @JsonProperty("linepayOrderId", String, true)
    linepayOrderId: string = undefined;

    @JsonProperty("itemAmount", String, true)
    itemAmount: string = undefined;

    @JsonProperty("masterpassOrderId", String, true)
    masterpassOrderId: string = undefined;

    @JsonProperty("acquirerCode", String, true)
    acquirerCode: string = undefined;

    @JsonProperty("cardNumber", String, true)
    cardNumber: string = undefined;

    @JsonProperty("jpoInformation", String, true)
    jpoInformation: string = undefined;

    @JsonProperty("vaccDepositStatusType", String, true)
    vaccDepositStatusType: string = undefined;

    @JsonProperty("transferExpiredDate", String, true)
    transferExpiredDate: string = undefined;

    @JsonProperty("reconcileDate", String, true)
    reconcileDate: string = undefined;

    @JsonProperty("totalDepositAmount", String, true)
    totalDepositAmount: string = undefined;

    @JsonProperty("entryTransferName", String, true)
    entryTransferName: string = undefined;

    @JsonProperty("entryTransferNumber", String, true)
    entryTransferNumber: string = undefined;

    @JsonProperty("accountNumber", String, true)
    accountNumber: string = undefined;

    @JsonProperty("accountManageType", String, true)
    accountManageType: string = undefined;

    @JsonProperty("tenpayServiceType", String, true)
    tenpayServiceType: string = undefined;

    @JsonProperty("itemDetail", String, true)
    itemDetail: string = undefined;

    @JsonProperty("itemLabel", String, true)
    itemLabel: string = undefined;

    @JsonProperty("tenpayOrderId", String, true)
    tenpayOrderId: string = undefined;

    @JsonProperty("bitcoinServiceType", String, true)
    bitcoinServiceType: string = undefined;

    @JsonProperty("itemDescription", String, true)
    itemDescription: string = undefined;

    @JsonProperty("currency", String, true)
    currency: string = undefined;

    @JsonProperty("paymentAmount", String, true)
    paymentAmount: string = undefined;

    @JsonProperty("paymentAmountBtc", String, true)
    paymentAmountBtc: string = undefined;

    @JsonProperty("paymentFixDatetime", String, true)
    paymentFixDatetime: string = undefined;

    @JsonProperty("balanceBtc", String, true)
    balanceBtc: string = undefined;

    @JsonProperty("bitcoinOrderId", String, true)
    bitcoinOrderId: string = undefined;

    @JsonProperty("properTransactionInfo", String, true)
    properTransactionInfo: string = undefined;

}