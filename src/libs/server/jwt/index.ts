/**
 * functions to sign and verify jwt tokens using a server secret.
 */
import jwt from 'jsonwebtoken';

const SECRET = process.env.SERVER_SECRET || 'secret'

export function signJWT(employeeId: number){
    return jwt.sign({
        employee: employeeId
    },SECRET, {expiresIn: '2h'})
}


export function verifyJWT(token:string){
    return jwt.verify(token,SECRET)
}