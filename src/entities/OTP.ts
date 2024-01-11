/**
 * OTP Entity
 */

import { Employee } from "./Employee";

export class OTP {
    requestId: string;

    employeeId: Employee;

    otp: number

    lifetime: number

    isSent: boolean

    sentAt: number

    isUsed: boolean;

    isExpired: boolean;
    
    usedAt: Date

}