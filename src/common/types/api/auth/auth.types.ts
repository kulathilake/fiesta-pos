/**
 * request and response types & validators for 'api/auth/otp' endpoint
 */
import {z} from 'zod';

export const OTPRequestValidator = z.object({
    employee_id: z.number(),
    mobile_number: z.number(),
    pin: z.string()
}); 
export type OTPRequestBody = z.infer<typeof OTPRequestValidator>;

export type OTPRequestResponse = {
    request_id:string;
    sent_at: number;
    expiresAt: number
    employee_id: number;
}

export const TokenRequestValidator = z.object({
    request_id: z.string(),
    otp: z.number()
})

export type TokenRequestBody = z.infer<typeof TokenRequestValidator>;

export type TokenResponse = {
    accessToken: string;
}