import crypto from 'crypto';

export function hashPin(pin:string) {
    const hash = crypto.createHash('sha256').update(pin).digest('hex');
    return hash;
}