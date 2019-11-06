export class MerchantConfig {

    host: string = undefined;

    timeout: number = undefined;

    merchantCcId: string = undefined;

    merchantSecretKey: string = undefined;

    dummyRequest: string = undefined;

    mdkErrorMode: boolean = false;

    allowHttp: boolean = false;

    constructor(merchantCcId: string, merchantSecretKey: string,
                dummyRequest: string = "0", host: string = "https://api.veritrans.co.jp:443", timeout: number = 60,
                mdkErrorMode: boolean = false, allowHttp: boolean = false) {
        this.host = host;
        this.timeout = timeout;
        this.merchantCcId = merchantCcId;
        this.merchantSecretKey = merchantSecretKey;
        this.dummyRequest = dummyRequest;
        this.mdkErrorMode = mdkErrorMode;
        this.allowHttp = allowHttp;
    }

    private static readonly MASK_ITEM: Array<string> = ["cardNumber", "cardExpire", "birthday", "tel", "firstKanaName",
        "lastKanaName", "mailAddr", "merchantMailAddr", "cancelMailAddr", "name1", "name2", "kana", "kana1", "kana2",
        "telNo", "address1", "address2", "address3", "post1", "post2", "customerNo", "pan", "settleAmount",
        "exchangeRate", "paymentDate", "paymentStatus", "centerTxnId", "shipName", "shipStreet1", "shipStreet2",
        "shipCity", "shipState", "shipCountry", "shipPostalCode", "shipPhone", "reqFirstKanaName", "reqLastKanaName",
        "reqTel", "reqBirthday", "reqCardNumber", "reqCardExpire", "securityCode", "pin", "jis1SecondTrack",
        "jis2Track", "mailAddress", "firstName", "lastName", "recipient", "address", "zip", "emvData",
        "company", "emailAddress", "phoneNumber", "streetLine", "streetLine2", "city", "postal", "birthDate",
        "mothersMaidenName", "cardHolderName", "hashedCardNumber", "expireDate", "comment"];

    public static readonly ADD_URL_PAYMENT_VERSION: string = "v2";
    public static readonly ADD_URL_VTID_VERSION: string = "v1";
    public static readonly ADD_URL_PAYMENT: string = "paynow";
    public static readonly ADD_URL_VTID: string = "paynowid";
    public static readonly PAYNOWID_SERVICE_TYPE: Array<string> =
        ["account", "charge", "recurring", "cardinfo", "bankAccount"];
    public static readonly SERVICE_COMMAND_SEARCH: string = "Search";
    public static readonly SEARCH_SERVER: string = "search";
    public static readonly DUMMY_SERVER: string = "test";
    public static readonly MDK_VERSION: string = "1.0.1";
    public static readonly MDK_DTO_VERSION: string = "1.0.1";

    public static isNeedMask(name: string): boolean {
        if (name == null) return false;
        return MerchantConfig.MASK_ITEM.map(value => value.toLowerCase()).some(value => value == name.toLowerCase());
    }

    public static get userAgent(): string {
        return `VeriTrans 4G MDK/${MerchantConfig.MDK_VERSION}/${MerchantConfig.MDK_DTO_VERSION} (TypeScript)`;
    }
}