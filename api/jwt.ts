import jwt from 'jsonwebtoken';
import { SessionType } from '$types/general';

export const sign = (payload: SessionType) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.SESSION_DURATION)
    });
};

export const verify = (token: string): SessionType => {
    return jwt.verify(token, process.env.JWT_SECRET) as SessionType;
};
