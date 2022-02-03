import { Request } from "polka";
import { ServerResponse } from "http";
import cookie from "cookie";

export const cookieMiddleware = (
  req: Request,
  _res: ServerResponse,
  next: Function
) => {
  req.cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  next();
};
