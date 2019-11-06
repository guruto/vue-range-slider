import {Logger} from "log4js";
import {MdkErrorMessages} from "./MdkErrorMessages";

export class MdkLocalException {

    static readonly CONFIG_MISSING: string = "MA01";
    static readonly CONFIG_VALUE_INVALID: string = "MA02";
    static readonly FILE_NO_EXIST: string = "MA03";
    static readonly ENCRYPTION_ERROR: string = "MA04";
    static readonly DECRYPTION_ERROR: string = "MA06";
    static readonly TYPE_A_INTERNAL_ERROR: string = "MA99";
    static readonly NO_CONFIG_FILE: string = "MB01";
    static readonly CONFIG_READ_ERROR: string = "MB02";
    static readonly SOCKET_FACTORY_CREATION_ERROR: string = "MB03";
    static readonly TYPE_B_INTERNAL_ERROR: string = "MB99";
    static readonly PROXY_CONNECT_ERROR: string = "MF01";
    static readonly GW_CONNECT_ERROR: string = "MF02";
    static readonly SERVER_TIMEOUT: string = "MF03";
    static readonly SOCKET_IO_ERROR: string = "MF04";
    static readonly INTERNAL_SERVER_ERROR: string = "MF05";
    static readonly BAD_GW: string = "MF06";
    static readonly SERVICE_UNAVAILABLE: string = "MF07";
    static readonly TYPE_F_INTERNAL_ERROR: string = "MF99";

    private _logger: Logger = undefined;
    private readonly _error: Error = undefined;
    private readonly _errorCode: string = undefined;
    private _errorMessage: string = undefined;

    constructor(logger: Logger, errorCode: string, replaceStr: Array<string> = undefined, error: Error = undefined) {
        this._logger = logger;
        this._error = error;
        this._errorCode = errorCode;
        this.setErrorMessage(errorCode, replaceStr);
    }

    get errorMessage(): string {
        return this._errorMessage;
    }

    get errorCode(): string{
        return this._errorCode;
    }

    private setErrorMessage(errorCode: string, replaceStr: Array<string>){
        this._errorMessage = MdkErrorMessages.getValue(errorCode, replaceStr);
        if( this._error == null ){
            this._logger.error(this._errorMessage)
        }
        else{
            this._logger.error(this._errorMessage, this._error)
        }
    }

}