"use client";

import { signOut } from "next-auth/react";

const Genearate = () => {
  function handleSignOut() {
    signOut({ callbackUrl: "/" });
    localStorage.removeItem("userId");
  }

  return (
    <>
      <div className="">generate</div>
      <button onClick={() => handleSignOut()}>signOut</button>
    </>
  );
};

export default Genearate;
