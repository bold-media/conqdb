import { AppShellMain } from '@mantine/core'

interface PageProps {
  children?: React.ReactNode
}

export const Page: React.FC<PageProps> = ({ children }) => {
  return <AppShellMain>{children}</AppShellMain>
}
