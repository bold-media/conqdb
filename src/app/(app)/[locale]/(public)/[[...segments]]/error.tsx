'use client'

import { Page } from '@/modules/layout/templates/Page'
import { Container, Text, Title } from '@mantine/core'

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Page>
      <Container>
        <Title>Error</Title>
        <Text>{error?.message}</Text>
      </Container>
    </Page>
  )
}
