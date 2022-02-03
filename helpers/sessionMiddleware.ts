import type { Request } from "polka";
import { ServerResponse } from "http";
import { UserHandler } from "../api/handlers/UserHandler";
import { SessionType } from "$types/general";

export const sessionMiddleware = async (
  req: Request & { session: SessionType | null },
  _res: ServerResponse,
  next: Function
) => {
  if (!req.cookies.token) req.session = null;
  else {
    try {
      req.session = UserHandler.checkToken(req.cookies.token);
    } catch (e) {
      console.log(e);
    }
  }
  next();
};
