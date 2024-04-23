'use client'
import { Link } from '@/navigation'
import { Anchor, Box, Container, Stack, Text, Title } from '@mantine/core'
import React from 'react'
import { DiscordButton } from '@/modules/common/components/DiscordButton'

import classes from './ComingSoon.module.css'
import Image from 'next/image'

export const ComingSoon = () => {
  return (
    <Box className={classes.root}>
      <Image
        src="/hero.jpg"
        alt="castle siege"
        fill={true}
        className={classes.image}
        draggable={false}
      />
      <Box className={classes.overlay}>
        <Container h="100%">
          <Stack align="center" justify="center" h="100%">
            <Title fw={400}>Coming Soon</Title>
            <Container size="xs">
              <Text ta="center">
                This site will be an alternative to{' '}
                <Anchor href="https://conqhub.com/" target="_blank" rel="noreferrer">
                  conqhub
                </Anchor>{' '}
                and provide many more features that make managing raids and territory wars easier.
              </Text>
              <Text ta="center" size="sm" mt="sm" c="dimmed">
                If you'd like updates, to help with maintaing the site, or translations, please join
                our Discord.
              </Text>
            </Container>
            <DiscordButton
              component={Link}
              href="https://discord.gg/6TbZVddQNy"
              target="_blank"
              size="sm"
            >
              Join our Discord
            </DiscordButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
