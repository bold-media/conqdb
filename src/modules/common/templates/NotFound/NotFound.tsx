'use client'
import React from 'react'
import classes from './NotFound.module.css'
import { Box, Button, Container, Stack, Text, Title } from '@mantine/core'
import Image from 'next/image'
import { Link } from '@/navigation'

export const NotFound = () => {
  return (
    <Box className={classes.root}>
      <Image
        src="/not-found.png"
        alt="Knight infront of a castle"
        fill={true}
        className={classes.image}
      />
      <Box className={classes.overlay}>
        <Container h="100%">
          <Stack
            align="center"
            justify="center"
            h="100%"
            gap={0}
            pb={'var(--app-shell-header-height)'}
          >
            <Title fw={400}>404: Not Found</Title>
            <Text my="md" c="dimmed">
              The page you are looking for does not exist.
            </Text>
            <Button component={Link} href="/" color="black">
              Go to Homepage
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
