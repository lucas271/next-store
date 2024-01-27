import AuthProvider from './_providers/AuthProvider'
import Navbar from './_components/layout/navbar/Navbar'
import FooterNavbar from './_components/layout/footerNavbar/FooterNavbar'
import './globals.css'

import { Roboto } from 'next/font/google'
import ToTopIcon from './_components/layout/toTopIcon/ToTopIcon'
import ReduxProvider from './_providers/ReduxProvider'
import Footer from './_components/pages/home/Footer'
import NextTopLoader from 'nextjs-toploader';


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
         <AuthProvider>
            <ReduxProvider>   
               <body className={`${roboto.variable} font-wdc pb-[8vh] sm:pb-[0vh]`} style={{minHeight: '100vh'}}>
                  <NextTopLoader color='black' height={12}/>
                  <Navbar/>
                  {children}
                  <ToTopIcon/>
                  <Footer/>
                  <FooterNavbar/>
               </body>
            </ReduxProvider>

         </AuthProvider>
      </html>
   )
}

