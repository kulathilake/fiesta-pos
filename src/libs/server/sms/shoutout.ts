/**
 * SMS Client for Shoutout SDK
 */


import axios from "axios";
import { SMSClient } from "./client.interface";
const SOURCE = process.env.SHOUTD_SOURCE || 'ShoutDEMO';
export class ShoutoutSMSClient implements SMSClient{
    async sendOTP(mobile: number, otp: number): Promise<{ status: any; sentAt:number}> {
       try {
            const smsRes = (await axios.post("https://api.getshoutout.com/coreservice/messages",{
                source: SOURCE,
                destinations: [`${mobile}`],
                transports: ['sms'],
                content: {
                    "sms": `Your Fiesta POS OTP is ${otp}`
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Apikey ${process.env.SHOUTOUT_API_KEY}`
                    }
                }
            )).data;

            return {
                status: smsRes.status === '1001' ? "OK" : "FAILED",
                sentAt: Date.now()
            }

       } catch (error) {
            throw new Error("OTP_TRANSPORT_ERROR")
       }
    }
}