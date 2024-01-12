import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { config } from 'src/config/app.config';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: config.app_display_name,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>{children}</body>
    </html>
  )
}
