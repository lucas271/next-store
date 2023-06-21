import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineArrowDown } from 'react-icons/ai'

export default function Banner () {
   return <>
      <div className="relative z-10 h-auto min-h-screen-minus-nav bg-cover bg-banner overflow">
         <div className="absolute top w-full h-full bg-black bg-opacity-40"></div>
         <div className="container m-auto min-h-screen-minus-nav relative pb-11 sm:pb-0">
            <section className="flex flex-col items-center justify-center min-h-screen-minus-nav w-full h-full sm:flex-row">
               <div className="flex justify-center items-center w-11/12 h-full sm:w-6/12 md:w-5/12">
                  <Image src="/bottle.png" alt="imagem de garrafa d'agua" width={1000} height={1200} quality={100} className="md:h-auto" />
               </div>
               <section className="flex flex-col justify-center items-center w-11/12 sm:w-6/12 md:w-7/12 h-full z-20 text-center text-white gap-4 md:gap-16">
                  <article className="w-6/7">
                     <h2 className="text-xl sm:text-4xl mb-4">AGUA É BOM BEBA</h2>
                     <p className="text-sm sm:text-lg">Mantenha suas bebidas quentes ou geladas por muito mais tempo! Aproveite cada gole de café fresquinho ou desfrute de um refrescante suco gelado, não importa onde você esteja. Nosso design elegante e durável garante que você possa desfrutar da sua bebida favorita a qualquer hora, em qualquer lugar.</p>
                  </article>
                  <button className="w-36 sm:w-48 p-2 capitalize rounded-md border-2 border-red-300 hover:bg-red-300 focus:bg-red-200 transition duration-200">
                    ver mais
                  </button>
               </section>
            </section>
            <footer className="absolute bottom-2 w-full h-8 flex items-center justify-center sm:-bottom-2">
               <Link href='#carrousel' tabIndex={-1}>
                  <div className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-red-200 focus:bg-red-200 transition duration-200 border border-red-200 shadow-2xl rounded-full sm:w-14 sm:h-14 z-50" tabIndex={0}>
                     <AiOutlineArrowDown className="text-xl text-white sm:text-2xl text-center" />
                  </div>
               </Link>
            </footer>
         </div>
      </div>
   </>
}