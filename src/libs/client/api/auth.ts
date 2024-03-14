'use client'
import { Role } from "@prisma/client";
/**
 * Authentication API Client
 */

import axios from "axios";
import { TokenResponse } from "src/common/types/api/auth/auth.types";

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
     * requests a verification of a user provided OTP
     * against a request id and obtains an access token.
     * @param request_id 
     * @param otp 
     */
    static async requestToken(
        employee_id: number,
        pin: string
    ){
        try {
            const tokenRes =  (await axios.post('/auth/api/token',{
                employee_id,
                pin
            })).data as TokenResponse

            AuthAPIClient.getInstance()._token = tokenRes.accessToken;
            localStorage.setItem('0',tokenRes.accessToken);
            return tokenRes.accessToken;
        } catch (error) {
            throw error;
        }
    }

    static async logout() {
        localStorage.removeItem('0');
        window.location.reload();
    }

    static async verifyLocalToken(token:string):Promise<{token:string, employee:string, role: Role}> {
        try {
            const res = (await axios.post('/auth/api/token/verify',{},{
                headers: {
                    'Authorization': token
                }
            }));
            if(res){
                this.getInstance()._token = token;
            }
            return res.data as any;
        } catch (error) {
            throw error;
        }
    }

    get token(){
        return this._token;
    }
}
