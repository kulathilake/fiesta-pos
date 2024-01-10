/**
 * One Time Password Engine
 */
import crypto from 'crypto';
import short from 'short-uuid';
const OTP_LIFETIME_IN_MSEC = 300000;

import { Service } from 'typedi';
import { DB } from '../db';
import { OTP } from 'src/entities/OTP';
import { Employee } from 'src/entities/Employee';


export class OTPEngine {
    private db: DB;
    constructor(db:DB){
        this.db = db;
    }

    async generateOTP(employee: Employee):Promise<{
        requestId:string;
        otp:number;
        lifetime: number
    }>{
        const randomValue = crypto.randomBytes(3).readUIntBE(0, 3);
        const otp = randomValue % 1000000;
        const requestId = short().new();
        
        await this.db.save({
            requestId,
            employeeId:employee,
            lifetime:OTP_LIFETIME_IN_MSEC,
            otp
        },OTP)

        return {
            requestId: requestId,
            otp: otp,
            lifetime: OTP_LIFETIME_IN_MSEC
        }
    }
}