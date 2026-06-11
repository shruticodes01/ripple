import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  },

  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },

  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
      },
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        identifier: {
          label: "Email or Username",
          type: "text",
          placeholder: "email or username",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          await connectDB();
          const user = await User.findOne({
            $or: [
              { email: credentials.identifier },
              { userName: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("Invalid Credentials");
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!passwordMatch) {
            throw new Error("Invalid Credentials");
          }

          return {
            id: user._id.toString(),
            fullName: user.fullName,
            email: user.email,
            userName: user.userName,
          };
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : "Something went wrong",
          );
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userName = user.userName;
      }
      console.log(token);
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.userName = token.userName;
      }
      console.log(session, token);
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
