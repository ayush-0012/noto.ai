import "./global.css";
import Provider from "@/components/Provider";
import { handler } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import NotesLinkProvider from "@/components/Context/NotesLinkProvider";

export const metadata = {
  title: "Noto.ai",
  description:
    "Generate notes with one click, just go to your site from wherever you want to take/create notes and click on generate",
};
const AppProviders = ({ children, session }) => (
  <Provider session={session}>
    <NotesLinkProvider>{children}</NotesLinkProvider>
  </Provider>
);
const RootLayout = async ({ children }) => {
  const session = await getServerSession(handler);
  return (
    <html lang="en">
      <body>
        <AppProviders session={session}>
          <main className="app">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
