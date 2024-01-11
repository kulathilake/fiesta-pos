/**
 * One Time Password Engine
 */
import crypto from 'crypto';
import short from 'short-uuid';
import { PrismaClient } from '@prisma/client';
import {DateTime} from 'luxon';

const OTP_LIFETIME_IN_MSEC = 300000;


export class OTPEngine {
    private db: PrismaClient;
    constructor(){
        this.db = new PrismaClient();
    }

    async generateOTP(employeeId: number):Promise<{
        requestId:string;
        otp:number;
        expiresAt: number
    }>{
        const randomValue = crypto.randomBytes(3).readUIntBE(0, 3);
        const otp = randomValue % 1000000;
        const requestId = short().new();

        const expiresAt = DateTime.now().plus({
            milliseconds: OTP_LIFETIME_IN_MSEC
        }).toJSDate()
    
        // TODO: Persist OTP
        await this.db.oTP.create({
            data: {
                requestId,
                otp,
                expiresAt,
                isSent: false,
                isUsed: false,
                employeeId,
            }
        })

        return {
            requestId: requestId,
            otp: otp,
            expiresAt: +expiresAt
        }
    }
}