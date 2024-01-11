'use client'
/**
 * Authentication API Client
 */

import axios from "axios";
import { OTPRequestResponse } from "src/common/types/api/auth/otp.types";

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
            throw new Error("OTP_REQUEST_ERROR:",{cause:error})
        }
    }
}
