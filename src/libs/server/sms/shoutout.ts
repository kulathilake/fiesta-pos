/**
 * SMS Client for Shoutout SDK
 */
import { SMSClient } from "./client.interface";

export class ShoutoutSMSClient implements SMSClient{
    sendOTP(mobile: string, otp: number): Promise<{ status: any; sentAt:number}> {
        throw new Error('method not implemented')
    }
}