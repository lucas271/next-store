import Navbar from '../components/navbar/Navbar'
import '../globals.css'

import { Roboto, Goblin_One } from 'next/font/google'

const roboto= Roboto({
   subsets: ['latin'],
   weight: ['400', '700'],
   variable: "--font-roboto"
})

export default function RootLayout({
   children,
}: {
  children: React.ReactNode
}) {
   return (
      <html lang="en">
         <body className={`${roboto.variable} font-wdc`}>
            <Navbar/>
            {children}
         </body>
      </html>
   )
}

