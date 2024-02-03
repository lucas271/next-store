import Link from "next/link";
import './globals.css'
import { BiSad } from "react-icons/bi";
import StyledButton from "./_components/shared/styledButton/StyledButton";
import FooterNavbar from "./_components/layout/footerNavbar/FooterNavbar";
import Navbar from "./_components/layout/navbar/Navbar";

export default function NotFound() {
	return (
		<>
			<Navbar/>
			<div className="w-full h-full flex justify-center items-center min-h-screen-minus-nav">
				<article className="text-3xl text-slate-700 transition-all flex sm:flex-row flex-col justify-center items-center gap-3">
					<BiSad/>
					<div className="flex justify-center items-center flex-col gap-1 text-center">
						<h2>Não Encontrada 404</h2>
						<p className="text-slate-400 text-xl"><Link href={'/'}><StyledButton text="voltar para pagina inicial" className={'p-2'}/></Link></p>
					</div>

				</article>

			</div>
			<FooterNavbar/>
		</>
	)
}