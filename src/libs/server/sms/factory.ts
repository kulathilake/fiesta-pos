import { config } from "src/config/app.config";
import { SMSClient } from "./client.interface";
import { DummySMSClient } from "./dummy";
import { ShoutoutSMSClient } from "./shoutout";

export class SMSClientFactory{
    static getClient():SMSClient {
        if(config.flags.useActualSmsGateway){
            return new ShoutoutSMSClient();
        }else{
            return new DummySMSClient();
        }
    }
}