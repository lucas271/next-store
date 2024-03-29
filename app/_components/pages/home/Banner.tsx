
"use client"
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineArrowDown } from 'react-icons/ai'
import StyledButton, { ButtonVariants } from '../../shared/styledButton/StyledButton'
import { useRouter } from 'next/navigation'

export default function Banner () {
	const route = useRouter()

	return <>
		<div className="relative z-10 h-screen-minus-nav bg-cover bg-banner overflow">
			<div className="absolute top w-full h-full bg-black bg-opacity-40"></div>
			<div className="w-[95%] sm:w-[90%] m-auto h-full relative pb-11 sm:pb-0">
				<section className="flex flex-col items-center justify-center w-full h-full sm:flex-row relative gap-6">
					<div className="justify-center items-center w-full h-1/2 sm:h-1/2 lg:h-2/3 sm:w-6/12 relative">
						<Image src="/bottle.png" alt="imagem de garrafa d'agua" sizes="100%" fill quality={100} className="md:h-auto" priority />
					</div>
					<section className="flex flex-col justify-center items-center w-11/12 sm:w-6/12 sm:h-full z-20 text-center text-white gap-8  sm:gap-16">
						<article className='w-full'>
							<h2 className="text-xl sm:text-4xl mb-4">AGUA É BOM BEBA</h2>
							<p className="text-sm sm:text-lg">Mantenha suas bebidas quentes ou geladas por muito mais tempo! Aproveite cada gole de café fresquinho ou desfrute de um refrescante suco gelado, não importa onde você esteja. Nosso design elegante e durável garante que você possa desfrutar da sua bebida favorita a qualquer hora, em qualquer lugar.</p>
						</article>
						<StyledButton onClick={() => route.push('/')} text='ver mais' className="w-36 from-transparent to-red-300 sm:w-48 p-2 capitalize rounded-md border-2 border-red-300" variant={ButtonVariants.GOPINKY}>
						</StyledButton>
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