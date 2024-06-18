import { SignInTemplate } from "@/modules/auth/templates/SignInTemplate";
import { PageTemplate } from "@/modules/layout/templates/PageTemplate";
import React from "react";

const SignInPage = () => {
  return (
    <PageTemplate>
      <SignInTemplate />
    </PageTemplate>
  );
};

export default SignInPage;
