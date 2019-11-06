import {MerchantConfig} from "./MerchantConfig";
import {IHttpClient} from "./IHttpClient";
import {Response} from "request";

export class HttpClient implements IHttpClient {

    private _config: MerchantConfig;

    constructor(config: MerchantConfig) {
        this._config = config;
    }

    execute(uri: string, json: string): Promise<Response> {

        const request = require("request");

        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': MerchantConfig.userAgent
        };

        let options = {
            url: uri,
            method: 'POST',
            headers: headers,
            body: encodeURIComponent(json),
            timeout: this._config.timeout * 1000,
        };

        return new Promise(
            (resolve, reject) => {
                request.post(uri, options,
                    (error: any, response: Response) => {
                        if (error != null) {
                            reject(error);
                        } else {
                            let statusCode = response.statusCode;
                            if (statusCode == null) {
                                reject(response);
                            }
                            if (!error && statusCode == 200) {
                                resolve(response);
                            } else {
                                reject(response);
                            }
                        }
                    });
            });


    }

}