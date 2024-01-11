/**
 * verifies an access to be valid.
 */

import { TOKEN_VERIFY_ERRORS } from "src/common/errors/auth.errors";
import { verifyJWT } from "src/libs/server/jwt";

export async function POST(request: Request) {
    try {
        const token = request.headers.get('Authorization')
        if(token){
            const verification = verifyJWT(token);
            return Response.json(verification);
        }else {
            return Response.json(TOKEN_VERIFY_ERRORS.MISSING_TOKEN_ERROR,{status:403})
        }
    } catch (error) {
        return Response.json(TOKEN_VERIFY_ERRORS.INVALID_TOKEN_ERROR, {status:401})
    }
}