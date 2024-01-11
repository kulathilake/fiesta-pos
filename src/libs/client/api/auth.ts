'use client'
/**
 * Authentication API Client
 */

import axios from "axios";
import { OTPRequestResponse, TokenResponse } from "src/common/types/api/auth/auth.types";

export class AuthAPIClient {
    private static instance: AuthAPIClient;
    private _token?: string;

    static getInstance(){
        if(this.instance){
            return this.instance;
        }else {
            this.instance = new AuthAPIClient();
            return this.instance;
        }
    }
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
            throw error;
        }
    }
    /**
     * requests a verification of a user provided OTP
     * against a request id and obtains an access token.
     * @param request_id 
     * @param otp 
     */
    static async requestToken(
        request_id: string,
        otp: number
    ){
        try {
            const tokenRes =  (await axios.post('/auth/api/token',{
                request_id,
                otp
            })).data as TokenResponse

            AuthAPIClient.getInstance()._token = tokenRes.accessToken;
            localStorage.setItem('0',tokenRes.accessToken);
            return tokenRes.accessToken;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async verifyLocalToken(token:string) {
        try {
            const res = (await axios.post('/auth/api/token/verify',{},{
                headers: {
                    'Authorization': token
                }
            }));
            return !!res;
        } catch (error) {
            return false;
        }
    }

    get token(){
        return this._token;
    }
}
