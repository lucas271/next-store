import Footer from '../_components/pages/home/Footer'
import dynamic from 'next/dynamic'

const ToTopIconComponent = dynamic(() => import("@/app/_components/layout/toTopIcon/ToTopIcon"), {ssr: false})
const FooterNavbarComponent = dynamic(() => import("@/app/_components/layout/footerNavbar/FooterNavbar"), {ssr: false})
const NavbarComponent = dynamic(() => import("@/app/_components/layout/navbar/Navbar"))

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	return (
		<>	
			{/*
				Reason Navbar is lazy loaded is because it has a lot of CSR stuff inside it. 
				Since the way next/dynamic works is lazing only csr stuff within the selected component 
				things like logo, and the static category part of the navbar should still be initially rendered, not impacting SEO.
			*/}	
			<NavbarComponent/>
			{children}
			<Footer/>
			
			<ToTopIconComponent/>
			<FooterNavbarComponent/>
		</>
	)
}

