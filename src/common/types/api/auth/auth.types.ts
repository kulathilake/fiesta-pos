/**
 * request and response types & validators for 'api/auth/otp' endpoint
 */
import { Employee } from '@prisma/client';
import {z} from 'zod';

export const TokenRequestValidator = z.object({
    employee_id: z.number(),
    pin: z.string()
}); 
export type TokenRequestBody = z.infer<typeof TokenRequestValidator>;

// export type OTPRequestResponse = {
//     request_id:string;
//     sent_at: number;
//     expiresAt: number
//     employee_id: number;
// }

// export const TokenRequestValidator = z.object({
//     request_id: z.string(),
//     otp: z.number()
// })

// export type TokenRequestBody = z.infer<typeof TokenRequestValidator>;

export type TokenResponse = {
    accessToken: string;
    employee: Employee
}