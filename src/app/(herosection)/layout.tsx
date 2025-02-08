import Navbar from "@/components/global/Navbar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />

      {children}
    </>
  );
};

export default layout;
