import '../globals.css'
import { Roboto } from 'next/font/google'

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
            <main className="h w-screen flex items-center max-w-screen max-h-screen relative h-screen">
               <section className="container text-gray-800 m-auto w-5/6 md:w-3/4 shadow-2xl p-4 relative flex flex-col gap-4 h-[90%]">
                  {children}
               </section>
            </main>         
         </body>
      </html>
   )
}

