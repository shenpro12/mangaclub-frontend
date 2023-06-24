"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

export interface Props {
  children?: React.ReactNode;
}

export default function NextauthSessionProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
