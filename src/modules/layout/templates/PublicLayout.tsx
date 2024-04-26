import { AppShell } from '@mantine/core'
import { Header } from '../components/Header'
import { Layout } from 'payload-types'

interface PublicLayoutProps {
  children?: React.ReactNode
  data: Layout
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children, data }) => {
  return (
    <>
      <AppShell header={{ height: 68 }}>
        <Header data={data?.header} />
        {children}
      </AppShell>
      {/* <Footer/> */}
    </>
  )
}
