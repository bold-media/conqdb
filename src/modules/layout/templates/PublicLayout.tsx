import { AppShell } from '@mantine/core'
import { Header } from '../components/Header'

interface PublicLayoutProps {
  children?: React.ReactNode
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <>
      <AppShell header={{ height: 68 }}>
        <Header />
        {children}
      </AppShell>
      {/* <Footer/> */}
    </>
  )
}
