/**
 * OTP Issuing endpoint
 */

/**
 * given an employee ID, generates a
 * short lived OTP and sends to a pre-assigned
 * phone number using an SMS API 
 * (Shoutout as of Jan/2024)
 * @param request 
 * @returns 
 * @throws invalid_employee_id
 * @throws invalid_phone_number
 * @throws failed_to_deliver_otp
 * @throws active_otp_existss
 */
export function GET(request:Request) {
 return Response.json({foo:"bar"})   
}