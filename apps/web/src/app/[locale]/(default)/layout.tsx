import { DefaultLayoutTemplate } from "@/modules/layout/templates/DefaultLayoutTemplate";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return <DefaultLayoutTemplate>{children}</DefaultLayoutTemplate>;
};

export default PublicLayout;
