import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import { getUser } from '@/app/auth/actions'

export const metadata: Metadata = {
  title: 'Runkiez - Berlin Running Community',
  description: 'Discover local running clubs, book sessions with coaches, and join group runs in Berlin',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  return (
    <html lang="en">
      <body>
        <Navigation isAuthenticated={!!user} userName={user?.name} />
        <main>{children}</main>
      </body>
    </html>
  )
}
