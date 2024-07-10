import { getServerSession } from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import loginService from "./services/loginService";

export const authOptions = {
    providers: [
        Credentials({
            name: "Email and Password",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials
                return loginService.authenticate(email, password);
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (user) {
                token.user = user
                token.accessToken = user.access_token
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken
            session.user = token.user
            return session
        }
    }
}

export const getServerAuthSession = () => getServerSession(authOptions);