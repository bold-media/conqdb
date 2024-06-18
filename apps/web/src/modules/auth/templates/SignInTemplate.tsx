"use client";
import React, { useEffect } from "react";
import { PrefixWithBG } from "../components/PrefixWithBG";
import { Anchor, Card, Container, Text } from "@mantine/core";
import { DiscordButton } from "@/modules/common/components/DiscordButton";
import { Link, useRouter } from "@/navigation";
import { useAuthMe } from "../hooks/useAuthMe";

export const SignInTemplate = () => {
  const { data: user } = useAuthMe();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user]);

  return (
    <PrefixWithBG>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Card p="xl" maw={442}>
          <Text component="h1" ta="center" fw={500} fz="xl">
            Sign in
          </Text>
          <Text maw={372} miw={324} ta="center" c="dimmed" mx="auto" mb="lg">
            Manage your profile and join a raid.
          </Text>
          <DiscordButton
            size="md"
            component={Link}
            href={`${process.env.NEXT_PUBLIC_API_URL}/auth/login/discord?redirect=${process.env.NEXT_PUBLIC_WEB_URL}/profile`}
            style={{ alignSelf: "center" }}
          >
            Sign in with Discord
          </DiscordButton>
          <Text ta="center" mt="lg" c="dimmed" size="xs">
            By signing in, you agree to our{" "}
            <Anchor c="dimmed" underline="always">
              privacy policy
            </Anchor>
            .
          </Text>
        </Card>
        <Text maw={372} ta="center" c="dimmed" mt="lg" size="sm">
          If you have concerns about security, please visit our{" "}
          <Anchor
            c="dimmed"
            underline="always"
            component={Link}
            href="/security"
          >
            security page
          </Anchor>
          .
        </Text>
      </Container>
    </PrefixWithBG>
  );
};
