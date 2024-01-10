/**
 * Dummy SMS Client for Non-Prod environment
 */
import { SMSClient } from "./client.interface";

export class DummySMSClient implements SMSClient {

  private printTitleLine(method:string) {
    console.log(">>>> DummySMSClient -> "+method);
  }
  
  sendOTP(
    mobile: string,
    otp: number
  ): Promise<{ status: any; sentAt: number }> {
    this.printTitleLine("sendOTP");
    console.table([
      {
        mobile,
        otp,
      },
    ]);
    return Promise.resolve({ status: "SUCCESS", sentAt: Date.now() });
  }
}
