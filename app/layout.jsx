import "./global.css";
import Provider from "@/components/Provider";

export const metadata = {
  title: "Noto.ai",
  description:
    "Generate notes with one click, just go to your site from wherever you want to take/create notes and click on generate",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
