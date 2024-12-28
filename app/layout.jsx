import "./global.css";
import Provider from "@/components/Provider";
import { handler } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Noto.ai",
  description:
    "Generate notes with one click, just go to your site from wherever you want to take/create notes and click on generate",
};

const RootLayout = async ({ children }) => {
  const session = await getServerSession(handler);
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
