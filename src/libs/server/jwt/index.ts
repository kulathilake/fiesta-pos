/**
 * functions to sign and verify jwt tokens using a server secret.
 */
import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

const SECRET = process.env.SERVER_SECRET || 'secret'

export function signJWT(employeeId: number, role: Role){
    return jwt.sign({
        employee: employeeId,
        role
    },SECRET, {expiresIn: '18h'})
}


export function verifyJWT(token:string){
    return jwt.verify(token,SECRET);
}