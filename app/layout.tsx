import type { Metadata } from 'next'
import { Geist, Geist_Mono, Pacifico, Dancing_Script } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _pacifico = Pacifico({ weight: '400', subsets: ["latin"], variable: '--font-pacifico' });
const _dancingScript = Dancing_Script({ subsets: ["latin"], variable: '--font-dancing-script' });

export const metadata: Metadata = {
  title: 'Romantic Interactive App',
  description: 'A playful, romantic, slightly sarcastic interactive experience',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_pacifico.variable} ${_dancingScript.variable}`}>
      <body className="font-sans antialiased bg-gradient-to-b from-pink-50 to-white">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
