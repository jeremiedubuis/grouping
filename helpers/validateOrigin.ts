import type { Request } from "polka";
import { ApiError } from "../api/ApiError";

export const validateOrigin = (req: Request, ignoreOrigin?: boolean) => {
  if (ignoreOrigin) return;

  if (
    req.headers.origin &&
    req.headers.origin !== process.env.HOST &&
    !process.env.CORS?.includes(req.headers.origin)
  ) {
    throw new ApiError("Unauthorized", 401);
  }
};
