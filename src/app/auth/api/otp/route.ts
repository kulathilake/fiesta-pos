/**
 * OTP Issuing endpoint
 */
import {
  OTPRequestBody,
  OTPRequestResponse,
  OTPRequestValidator,
} from "src/common/types/api/auth/auth.types";
import { PrismaClient } from '@prisma/client'
import { OTPEngine } from "src/libs/server/otp/engine";
import { SMSClientFactory } from "src/libs/server/sms/factory";
import { hashPin } from "src/libs/utils/crypto";
import { OTP_ERRORS } from "src/common/errors/otp.errors";

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
  const smsClient = SMSClientFactory.getClient();
  const otpEngine = new OTPEngine();
  const db = new PrismaClient();
  try {
    OTPRequestValidator.parse(body);
    try {
      const employee = await db.employee.findUnique({
        where: {
          id: body.employee_id,
          mobile: body.mobile_number,
          hashedPin: hashPin(body.pin)
        }
      })
      console.log(employee)

      if (employee) {
        // Generate OTP;
        const otpGen = await otpEngine.generateOTP(employee.id);
        // Send OTP
        const otpSMSDeliveryRequest = await smsClient.sendOTP(
          body.mobile_number,
          otpGen.otp
        );

        if(otpSMSDeliveryRequest.status === 'OK') {
            // TODO: Update OTP in DB
            await db.oTP.update({
              data: {
                isSent: true,
                sentAt: new Date(otpSMSDeliveryRequest.sentAt)
              },
              where: {
                requestId: otpGen.requestId
              }
            });
            return Response.json({
              request_id: otpGen.requestId,
              employee_id: body.employee_id,
              lifetime: otpGen.lifetime,
              sent_at: otpSMSDeliveryRequest.sentAt,
            } as OTPRequestResponse);

        }else {
          await db.oTP.update({
            data: {
              isSent: false,
            },
            where: {
              requestId: otpGen.requestId
            }
          })
            return Response.json(OTP_ERRORS.TRANSPORT_ERROR, {status:500})
        }
      } else {
        console.log("errrrr")
        return Response.json(
          OTP_ERRORS.INVALID_EMPID_PIN_MOBILE_COMB_ERROR,
          { status: 401 }
        );
      }
    } catch (error) {
      return Response.json('Server Error',{status:500});
    }
  } catch (error) {
    return Response.json(
      OTP_ERRORS.INVALID_PAYLOAD_ERROR,
      { status: 400 }
    );
  }
}
