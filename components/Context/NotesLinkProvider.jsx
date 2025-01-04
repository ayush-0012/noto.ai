"use client";

import { createContext, useState } from "react";

export const notesLinkContext = createContext();

const NotesLinkProvider = ({ children }) => {
  const [notesLink, setNotesLink] = useState("");
  return (
    <notesLinkContext.Provider value={{ notesLink, setNotesLink }}>
      {children}
    </notesLinkContext.Provider>
  );
};

export default NotesLinkProvider;
