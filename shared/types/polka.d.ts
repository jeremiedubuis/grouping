declare module "polka" {
  import type { IncomingMessage } from "http";

  export interface Request extends IncomingMessage {
    body?: any;
    cookies: {
      [name: string]: string;
    };
    params: {
      [name: string]: string;
    };
    query: {
      [name: string]: string;
    };
    url: string;
  }

  export type Polka = any;

  export default function polka(options?: any): Polka;
}
