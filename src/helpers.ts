import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SECRET;
const EXPIRES_IN = 3600 * 24;

export function generateJwt(data: any): string {
    return jwt.sign(data, JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: EXPIRES_IN,
    });
};

export function decodeJwt(token): any {
    return jwt.verify(token, JWT_SECRET);
};