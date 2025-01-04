"use client";

import { signIn } from "next-auth/react";
import { GoogleSvg } from "../../../public/google";

export function LoginBtn() {
  return (
    <button
      onClick={() => signIn("google")} // Inicia o login com o Google
      className="flex gap-2 items-center"
    >
      <GoogleSvg />
      <span>Sign in with Google</span>
    </button>
  );
}
