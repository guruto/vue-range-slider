import {Response} from "request";

export interface IHttpClient {

    execute(uri: string, json: string): Promise<Response>;

}