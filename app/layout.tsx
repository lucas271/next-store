import AuthProvider from './_providers/AuthProvider'
import './globals.css'

import { Roboto } from 'next/font/google'
import ReduxProvider from './_providers/ReduxProvider'
import NextTopLoader from 'nextjs-toploader'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Varitech',
  description: 'Produto tecnologicos com o melhor preço de mercado',
}
 

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
					<body className={`${roboto.variable} font-wdc`}>
						<NextTopLoader color='black' height={12}/>
						{children}
					</body>
				</ReduxProvider>

			</AuthProvider>
		</html>
	)
}

