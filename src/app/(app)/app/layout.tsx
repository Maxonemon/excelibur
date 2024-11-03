import React from "react";
import AppHeader from "../../../components/app-header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
