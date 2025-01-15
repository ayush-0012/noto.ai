// layout.jsx
"use client";
import "./global.css";
import { useState, useEffect } from "react";
import Provider from "@/components/Provider";
import NotesLinkProvider from "@/components/Context/NotesLinkProvider";
import FileLinkProvider from "@/components/Context/FileLinkProvider";

const AppProviders = ({ children, session }) => (
  <Provider session={session}>
    <NotesLinkProvider>
      <FileLinkProvider>{children}</FileLinkProvider>
    </NotesLinkProvider>
  </Provider>
);

const RootLayout = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/session`,
          {
            credentials: "include",
            headers: {
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setSession(data);
      } catch (error) {
        console.error("Failed to fetch session:", error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  // Helper function to update session
  const updateSession = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/session`,
        {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setSession(data);
    } catch (error) {
      console.error("Failed to update session:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  // Modify your Provider component to accept updateSession
  return (
    <html lang="en">
      <body>
        <AppProviders session={{ ...session, update: updateSession }}>
          <main className="app">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
