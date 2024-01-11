export interface SMSClient {
    sendOTP(mobile:number,otp:number):Promise<{status:any,sentAt:number}>
}