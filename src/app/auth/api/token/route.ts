import { PrismaClient } from "@prisma/client";
import { TOKEN_ISSUE_ERRORS } from "src/common/errors/auth.errors";
import { TokenRequestBody, TokenRequestValidator, TokenResponse } from "src/common/types/api/auth/auth.types";
import { signJWT } from "src/libs/server/jwt";
import { hashPin } from "src/libs/utils/crypto";

/**
 * Token Issuing Endpoint
 */
export async function POST(request: Request) {
    try {
        const body = (await request.json()) as TokenRequestBody;
        const db = new PrismaClient();
        TokenRequestValidator.parse(body);
        try {
            const employee = await db.employee.findUnique({
                where: {
                  id: body.employee_id,
                  hashedPin: hashPin(body.pin)
                }
              })

            if(employee){
                const accessToken = signJWT(employee.id);
                return Response.json({
                    accessToken,
                    employee
                } as TokenResponse);
            }else{
                return Response.json(TOKEN_ISSUE_ERRORS.INVALID_PIN_ERROR,{status:401});
            }
        } catch (error) {
            console.log(error);
            return Response.json(error,{status:500})
        }
    } catch (error) {
        return Response.json(TOKEN_ISSUE_ERRORS.INVALID_PAYLOAD_ERROR,{status:400});
    }
}