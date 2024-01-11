'use client'
/**
 * Authentication API Client
 */

import axios from "axios";
import { OTP_ERRORS } from "src/common/errors/otp.errors";
import { OTPRequestResponse } from "src/common/types/api/auth/auth.types";

export class AuthAPIClient {
    /**
     * Creates a POST request to 'auth/api/otp'
     * @param employee_id 
     * @throws otp_request_error
     */
    static async requestOtp(
        employee_id:number,
        mobile_number:number,
        pin: string
        ):Promise<OTPRequestResponse> {
        try {
            return (await axios.post('/auth/api/otp',{
                employee_id,
                mobile_number,
                pin
            })).data   
        } catch (error) {
            throw new Error(OTP_ERRORS.OTP_REQUEST_ERROR,{cause:error})
        }
    }
    /**
     * requests a verification of a user provided OTP
     * against a request id and obtains an access token.
     * @param request_id 
     * @param otp 
     */
    static async verifyOTP(
        request_id: string,
        otp: string
    ){
        try {
            return (await axios.post('/auth/api/token',{

            }))
        } catch (error) {
            
        }
    }
}
