import { PrismaClient } from "@prisma/client";
import { TOKEN_ISSUE_ERRORS } from "src/common/errors/auth.errors";
import { TokenRequestBody, TokenRequestValidator, TokenResponse } from "src/common/types/api/auth/auth.types";
import { signJWT } from "src/libs/server/jwt";

/**
 * Token Issuing Endpoint
 */
export async function POST(request: Request) {
    try {
        const body = (await request.json()) as TokenRequestBody;
        const db = new PrismaClient();
        TokenRequestValidator.parse(body);
        try {
            const validOtp = await db.oTP.findUnique({
                where: {
                    requestId: body.request_id,
                    otp: body.otp,
                    isUsed: false,
                }
            });

            if(validOtp){
                if(+validOtp.expiresAt > Date.now()) {
                    await db.oTP.update({
                        data: {
                            isUsed: true,
                            usedAt: new Date(),
                        },
                        where: {
                            requestId: validOtp.requestId
                        }
                    })
                    const accessToken = signJWT(validOtp.employeeId);
                    return Response.json({
                        accessToken
                    } as TokenResponse);
                }else {
                    return Response.json(TOKEN_ISSUE_ERRORS.OTP_EXPIRED_ERROR, {status:401});
                }
            }else{
                return Response.json(TOKEN_ISSUE_ERRORS.INVALID_OTP_ERROR,{status:401});
            }
        } catch (error) {
            console.log(error);
            return Response.json(error,{status:500})
        }
    } catch (error) {
        return Response.json(TOKEN_ISSUE_ERRORS.INVALID_PAYLOAD_ERROR,{status:400});
    }
}