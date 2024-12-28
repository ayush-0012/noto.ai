import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user.model";
import connectDB from "@/utils/db";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      try {
        if (account && user) {
          await connectDB();
          const dbUser = await User.findOne({ email: token.email });
          if (dbUser) {
            token.userId = dbUser._id.toString();
          }
        }
        return token;
      } catch (error) {
        console.error("Error in jwt callback:", error);
        return token;
      }
    },
    async session({ session, token }) {
      if (token?.userId) {
        session.user = {
          ...session.user,
          id: token.userId,
        };
      }
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectDB();

        if (!profile?.email) {
          throw new Error("No profile email");
        }

        const userExists = await User.findOne({ email: profile.email });

        if (!userExists && profile.name) {
          await User.create({
            email: profile.email,
            userName: profile.name.replace(/\s+/g, "").toLowerCase(),
            image: profile.picture || "",
          });
        }
        return true;
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
