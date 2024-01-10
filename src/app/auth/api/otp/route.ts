/**
 * OTP Issuing endpoint
 */
import {
  OTPRequestBody,
  OTPRequestResponse,
  OTPRequestValidator,
} from "src/common/types/api/auth/otp.types";
import { Employee } from "src/entities/Employee";
import { OTP } from "src/entities/OTP";
import { DB } from "src/libs/server/db";
import { OTPEngine } from "src/libs/server/otp/engine";
import { SMSClientFactory } from "src/libs/server/sms/factory";

/**
 * given an employee ID, generates a
 * short lived OTP and sends to a pre-assigned
 * phone number using an SMS API
 * (Shoutout as of Jan/2024)
 * @param request
 * @returns
 * @throws validation_error
 * @throws invalid_employee_id_or_phone_number
 * @throws failed_to_deliver_otp
 * @throws active_otp_existss
 */
export async function POST(request: Request) {
  const body = (await request.json()) as OTPRequestBody;
  const db = new DB();
  const smsClient = SMSClientFactory.getClient();
  const otpEngine = new OTPEngine(db);

  try {
    OTPRequestValidator.parse(body);
    try {
      // Find if employee id x mobilePhone combination exists
      const employee = await db.findOne(
        {
          employeeId: body.employee_id,
          mobileNumber: body.mobile_number,
        },
        Employee
      );

      if (employee) {
        // Generate OTP;
        const otpGen = await otpEngine.generateOTP(employee);
        // Send OTP
        const otpSMSDeliveryRequest = await smsClient.sendOTP(
          body.mobile_number,
          otpGen.otp
        );

        if(otpSMSDeliveryRequest.status === 'OK') {
            db.save({
                requestId: otpGen.requestId,
                sentAt: otpSMSDeliveryRequest.sentAt
            },OTP)
    
            return Response.json({
              request_id: otpGen.requestId,
              employee_id: body.employee_id,
              lifetime: otpGen.lifetime,
              sent_at: otpSMSDeliveryRequest.sentAt,
            } as OTPRequestResponse);

        }else {
            db.save({
                requestId: otpGen.requestId,
                isSent: false
            },OTP)
            return Response.json("OTP_ERROR: failed to send OTP", {status:500})
        }
      } else {
        return Response.json(
          "VALIDATION_ERROR: Invalid 'employee_id' and 'mobile_number' combination",
          { status: 401 }
        );
      }
    } catch (error) {
      return Response.json(error);
    }
  } catch (error) {
    return Response.json(
      "VALIDATION_ERROR: 'employee_id' & 'mobile_number' are required ",
      { status: 400 }
    );
  }
}
