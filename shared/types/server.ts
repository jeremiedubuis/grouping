import { ServerResponse } from "http";
import type { CookieSerializeOptions } from "cookie";
import { Request as PolkaRequest } from "polka";
import { SessionType } from "./general";

export type Cookie = {
  name: string;
  value: string;
  options?: CookieSerializeOptions;
};

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type Validation = {
  body?: { [key: string]: any };
  params?: { [key: string]: any };
  query?: { [key: string]: any };
  allowDisconnected?: boolean;
  ignoreOrigin?: boolean;
};
export type Request = PolkaRequest & { session: SessionType };

export type RequestHandler = (
  req: Request,
  res: ServerResponse,
  next: () => Promise<void>
) => any;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      SESSION_DURATION: string;
      CORS?: string;
      HOST: string;
    }
  }
}
