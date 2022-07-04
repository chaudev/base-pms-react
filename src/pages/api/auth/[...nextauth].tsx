import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/Credentials";
import { authenticate } from "~src/api";

export default NextAuth({
  // @link https://next-auth.js.org/configuration/providers
  providers: [
    CredentialsProvider({
      id: "credentials-signin",
      name: "credentials-signin",
      credentials: {
        userName: { label: "username" },
        password: { label: "password" },
      },
      // @ts-ignore
      authorize: async (credentials: any) => {
        try {
          const { data } = credentials;

          const res = await authenticate.login(JSON.parse(data));

          console.log("---------- res: ", res);

          console.log("res lk", res);
          const { userInfo, exp } = parseJwt(res.token);
          console.log(userInfo);
          return Promise.resolve({
            ...userInfo,
            accessToken: res.token,
            accessTokenExp: exp,
            Roles:
              userInfo.Roles?.filter((role: any) => role.IsView)?.map(
                (role: any) => role.RoleName
              ) || [],
          });
          // return { accesToken: res.data.data.token };
        } catch (error) {
          console.log("authorize error", error);
          return Promise.reject(
            new Error(encodeURIComponent(JSON.stringify(error)))
          );
        }
      },
    }),
  ],

  session: {
    maxAge: 86400, //1 day
    strategy: "jwt",
  },

  // @link https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    //   async encode() {},
    //   async decode() {},
  },

  // @link https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
    async jwt({ token, user }) {
      user && (token.user = user);

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      console.log("session: ", session);
      console.log("token: ", token);

      session.token = token.user.accesToken;
      token.user && (session.user = token.user as Session["user"]);
      return session;
    },
  },

  //Events are asynchronous functions that do not return a response, they are useful for audit logs / reporting.
  // You can specify a handler for any of these events below, for debugging or for an audit log.
  // @link https://next-auth.js.org/configuration/events
  events: {
    async signIn(message) {
      /* on successful sign in */
    },
    async signOut(message: any) {
      /* on signout */
    },
    async createUser(message) {
      /* user created */
    },
    async linkAccount(message) {
      /* account linked to a user */
    },
    async session(message: any) {
      /* session is active */
    },
    // async error(message) {
    //   /* error in authentication flow */
    // },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  debug: true, // Use this option to enable debug messages in the console
});

function parseJwt(token: string) {
  console.log("parseJwt token: ", token);

  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const buf = Buffer.from(base64, "base64").toString("utf-8");
  const payload = JSON.parse(buf);

  return {
    userInfo: JSON.parse(jsonPayload),
    exp: payload.exp,
  };
}
