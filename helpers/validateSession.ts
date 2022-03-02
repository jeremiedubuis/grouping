import type { Request } from '$types/server';
import { ApiError } from '../api/ApiError';

export const validateSession = (req: Request, allowDisconnected?: boolean) => {
    if (!allowDisconnected && !req.session) {
        throw new ApiError('Unauthorized session', 401);
    }
};
