"use client";

import { useState, createContext } from "react";

export const fileLinkContext = createContext();

const FileLinkProvider = ({ children }) => {
  const [fileLink, setFileLink] = useState("");
  return (
    <fileLinkContext.Provider value={{ fileLink, setFileLink }}>
      {children}
    </fileLinkContext.Provider>
  );
};

export default FileLinkProvider;
