import cookie from 'cookie';
import { Cookie, RequestHandler } from '$types/server';
import { ServerResponse } from 'http';
import type { Request } from 'polka';
import { ApiError } from '../ApiError';

type SuccessOptions = { cookie?: Cookie };

export class Handler {
    res: ServerResponse;

    constructor(res: ServerResponse) {
        this.res = res;
    }
    static handle(method: string) {
        return async (req: Request, res: ServerResponse) => {
            const instance: any = new this(res);
            if (typeof instance[method] !== 'function')
                throw `${method} is not implemented on Handler ${instance.constructor.name}`;

            const success = async (
                response: any,
                code: number = 200,
                successOptions?: SuccessOptions
            ) => {
                return instance.success(response, code, successOptions);
            };

            try {
                return (await instance[method](req, { success })) as RequestHandler;
            } catch (e) {
                return await instance.error(e);
            }
        };
    }

    success(response: any, code: number = 200, options?: SuccessOptions) {
        this.res.statusCode = code;
        if (options?.cookie) {
            this.res.setHeader(
                'Set-Cookie',
                cookie.serialize(options.cookie.name, options.cookie.value, options.cookie.options)
            );
        }
        const str = JSON.stringify(response);
        this.res.end(str);
        return response;
    }

    error(err: Error | ApiError, code: number = 500) {
        if (!(err instanceof ApiError)) {
            console.log(err);

            err = new ApiError('UNKNOWN', code || 500);
        }

        this.res.statusMessage = `Error: ${err.name}`;
        this.res.statusCode = (err as ApiError).code;
        this.res.setHeader('content-type', 'application/json');
        this.res.end(JSON.stringify({ message: err.message }));
        return;
    }
}
