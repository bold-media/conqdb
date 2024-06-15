import { PageTemplate } from "@/modules/layout/templates/PageTemplate";
import { Container, Title } from "@mantine/core";
import React from "react";

const StyleGuidePage = () => {
  return (
    <PageTemplate>
      <Container>
        <Title mt="xl">Style Guide</Title>
      </Container>
    </PageTemplate>
  );
};

export default StyleGuidePage;
