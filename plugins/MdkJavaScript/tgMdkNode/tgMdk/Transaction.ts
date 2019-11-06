import {IRequestDto} from "./IRequestDto";
import {MerchantConfig} from "./MerchantConfig";
import {Logger} from "log4js";
import {MdkLocalException} from "./MdkLocalException";
import {MdkUtil} from "./MdkUtil";
import {HttpClient} from "./HttpClient";
import {IResponseDto} from "./IResponseDto";
import {IncomingMessage} from "http";
import {IHttpClient} from "./IHttpClient";

export class Transaction {

    private readonly _logger: Logger;
    private readonly _config: MerchantConfig;
    private _httpClient: IHttpClient;

    constructor(logger: Logger, config: MerchantConfig, httpClient?: IHttpClient) {
        this._logger = logger;
        this._config = config;
        this._httpClient = httpClient || new HttpClient(config);
    }

    public async execute<T extends IResponseDto>(requestDto: IRequestDto, type: { new(): T }): Promise<T> {
        try {
            this._logger.info("Transaction.execute() start");
            let url = Transaction.createSendUrl(requestDto, this._config.host, MerchantConfig.ADD_URL_PAYMENT,
                MerchantConfig.ADD_URL_PAYMENT_VERSION, MerchantConfig.PAYNOWID_SERVICE_TYPE, MerchantConfig.ADD_URL_VTID,
                MerchantConfig.ADD_URL_VTID_VERSION, MerchantConfig.SERVICE_COMMAND_SEARCH, MerchantConfig.SEARCH_SERVER,
                this._config.dummyRequest, MerchantConfig.DUMMY_SERVER);

            this._logger.info("========== connect url       ==> " + url);
            this._logger.info("========== user agent        ==> " + MerchantConfig.userAgent);

            if (this._config.mdkErrorMode) {
                this._logger.info("Transaction.execute() end");
                let exception = new MdkLocalException(this._logger, MdkLocalException.TYPE_A_INTERNAL_ERROR);
                return Transaction.getErrorResponse<T>(exception.errorCode, exception.errorMessage, type);
            }

            let obj = MdkUtil.convertDTOtoJsonObject(requestDto);

            let maskedCopy = JSON.parse(JSON.stringify(obj));
            MdkUtil.maskJson(maskedCopy);
            let maskedLog = JSON.stringify(maskedCopy);

            this._logger.info("========== request mct data  ==> " + maskedLog);

            let bodyJson = Transaction.appendConnectParam(obj, this._config.merchantCcId,
                this._config.merchantSecretKey, this._config.dummyRequest, this._logger);

            requestDto.maskedLog = maskedLog;

            return this.sendRequest(url, bodyJson, type);
        } catch (e) {
            this._logger.info("Transaction.execute() end");
            if (e instanceof MdkLocalException) {
                return Transaction.getErrorResponse<T>(e.errorCode, e.errorMessage, type);
            } else {
                let exception = new MdkLocalException(this._logger, MdkLocalException.TYPE_A_INTERNAL_ERROR);
                return Transaction.getErrorResponse<T>(exception.errorCode, exception.errorMessage, type);
            }
        }
    }

    private async sendRequest<T extends IResponseDto>(url: string, bodyJson: string, type: { new(): T }): Promise<T> {
        try {
            let response = await this._httpClient.execute(url, bodyJson);
            this._logger.info("========== response json     ==> " + response.body);
            let responseDto: T;
            if (response.body != null) {
                responseDto = MdkUtil.setResponseProperties<T>(response.body, type);
            } else {
                let exception = new MdkLocalException(this._logger, MdkLocalException.TYPE_B_INTERNAL_ERROR);
                responseDto = Transaction.getErrorResponse<T>(exception.errorCode, exception.errorMessage, type);
            }
            this._logger.info("Transaction.execute() end");
            return responseDto;
        } catch (e) {
            this._logger.info("Transaction.execute() end");
            let code: string = undefined;
            if (e.hasOwnProperty("code")) {
                code = e.code;
            }
            if (e instanceof Error) {
                let exception: MdkLocalException;
                if (code != null) {
                    if (code == "ESOCKETTIMEDOUT" || code == "ETIMEDOUT") {
                        exception = new MdkLocalException(this._logger, MdkLocalException.SERVER_TIMEOUT);
                    } else if (code == "ECONNRESET" || code == "ECONNREFUSED" || code == "ENOTFOUND") {
                        exception = new MdkLocalException(this._logger, MdkLocalException.SOCKET_IO_ERROR);
                    } else {
                        exception = new MdkLocalException(this._logger, MdkLocalException.TYPE_F_INTERNAL_ERROR);
                    }
                } else {
                    if (e.message.startsWith("SSL Error") || e.message.startsWith("Invalid protocol") ||
                        e.message.startsWith("Hostname/IP does not match certificate's altnames")) {
                        exception = new MdkLocalException(this._logger, MdkLocalException.SOCKET_FACTORY_CREATION_ERROR);
                    } else {
                        exception = new MdkLocalException(this._logger, MdkLocalException.TYPE_F_INTERNAL_ERROR);
                    }
                }
                return Transaction.getErrorResponse<T>(exception.errorCode, exception.errorMessage, type);
            } else if (e instanceof IncomingMessage) {
                let exception: MdkLocalException;
                switch (e.statusCode) {
                    case 500:
                        exception = new MdkLocalException(this._logger, MdkLocalException.INTERNAL_SERVER_ERROR);
                        break;
                    case 502:
                        exception = new MdkLocalException(this._logger, MdkLocalException.BAD_GW);
                        break;
                    case 503:
                        exception = new MdkLocalException(this._logger, MdkLocalException.SERVICE_UNAVAILABLE);
                        break;
                    default:
                        exception = new MdkLocalException(this._logger, MdkLocalException.GW_CONNECT_ERROR);
                }
                return Transaction.getErrorResponse<T>(exception.errorCode, exception.errorMessage, type);
            } else {
                let exception = new MdkLocalException(this._logger, MdkLocalException.TYPE_B_INTERNAL_ERROR);
                return Transaction.getErrorResponse<T>(exception.errorCode, exception.errorMessage, type);
            }
        }
    }

    public static createSendUrl(requestDto: IRequestDto, host: string, addUrlPayment: string,
                                addUrlPaymentVersion: string, payNowIdServiceType: Array<string>, addUrlVtId: string,
                                addUrlVtIdVersion: string, serviceCommandSearch: string, searchServer: string,
                                dummyRequest: string, dummyServer: string): string {
        let url = host;
        let serviceType = requestDto.serviceType;
        let serviceCommand = requestDto.serviceCommand;
        let serviceName = addUrlPayment;
        let version = addUrlPaymentVersion;
        if (payNowIdServiceType.some(value => value == serviceType)) {
            serviceName = addUrlVtId;
            version = addUrlVtIdVersion;
        }
        if (serviceName == addUrlPayment && serviceCommand == serviceCommandSearch) {
            serviceName = serviceName + "-" + searchServer;
        }
        if (dummyRequest == "1") {
            serviceName = dummyServer + "-" + serviceName
        }
        return url + "/" + serviceName + "/" + version + "/" + serviceCommand + "/" + serviceType;
    }

    public static appendConnectParam(requestDto: IRequestDto, merchantCcId: string, merchantSecretKey: string,
                                     dummyRequest: string, logger: Logger): string {

        requestDto["txnVersion"] = MerchantConfig.MDK_DTO_VERSION;
        requestDto["dummyRequest"] = dummyRequest;
        requestDto["merchantCcid"] = merchantCcId;

        let jsonValue = JSON.stringify(requestDto);
        let maskedCopy = JSON.parse(jsonValue);
        MdkUtil.maskJson(maskedCopy);
        let maskedLog = JSON.stringify(maskedCopy);

        logger.info("========== request mdk data  ==> " + maskedLog);

        let crypto = require("crypto");
        let sha256 = crypto.createHash("sha256");
        sha256.update(merchantCcId + jsonValue + merchantSecretKey);
        let authHash = sha256.digest('hex');

        let obj = {
            "params": requestDto,
            "authHash": authHash
        };
        return JSON.stringify(obj);
    }

    public static getErrorResponse<T extends IResponseDto>(vResultCode: string, errorMessage: string, type: { new(): T }): T {
        let responseDto = new type();
        if (vResultCode != null && vResultCode.length == 4) {
            vResultCode += "000000000000";
        }
        if (vResultCode != null) {
            responseDto["vResultCode"] = vResultCode;
        }
        if (errorMessage != null) {
            responseDto["MerrMsg"] = errorMessage;
        }
        return responseDto;
    }

}