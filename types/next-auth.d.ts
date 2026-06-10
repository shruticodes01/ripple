// declarations only no runtime code, hence .d.ts

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userName: string;
    } & DefaultSession["user"];
  }

  interface User {
    userName: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userName: string;
  }
}
