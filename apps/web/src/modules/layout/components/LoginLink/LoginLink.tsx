"use client";
import { useAuthMe } from "@/modules/auth/hooks/useAuthMe";
import { Link } from "@/navigation";
import { Anchor } from "@mantine/core";
import React from "react";
import classes from "./LoginLink.module.css";
import clsx from "clsx";

export const LoginLink = ({ label }: { label: string }) => {
  const { data: user } = useAuthMe();

  if (user) {
    return null;
  }

  return (
    <Anchor
      component={Link}
      href="/signin"
      underline="never"
      className={clsx(classes.root, "mantine-active")}
    >
      {label}
    </Anchor>
  );
};
