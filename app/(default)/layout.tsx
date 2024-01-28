import Navbar from '../_components/layout/navbar/Navbar'
import FooterNavbar from '../_components/layout/footerNavbar/FooterNavbar'

import ToTopIcon from '../_components/layout/toTopIcon/ToTopIcon'
import Footer from '../_components/pages/home/Footer'


export default function RootLayout({
   children,
}: {
  children: React.ReactNode
}) {
   return (
      <>
         <Navbar/>
         {children}
         <ToTopIcon/>
         <Footer/>
         <FooterNavbar/>
      </>
   )
}

