/**
 * request and response types & validators for 'api/auth/otp' endpoint
 */
import {z} from 'zod';

export const OTPRequestValidator = z.object({
    employee_id: z.string(),
    mobile_number: z.string()
}); 
export type OTPRequestBody = z.infer<typeof OTPRequestValidator>;

export type OTPRequestResponse = {
    request_id:string;
    sent_at: number;
    lifetime: number
    employee_id: string;
}