export interface SMSClient {
    sendOTP(mobile:string,otp:number):Promise<{status:any,sentAt:number}>
}