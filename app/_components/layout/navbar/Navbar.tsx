import SearchItemsBar from "../../shared/searchItemsBar/SearchItemsBar";
import Hamburguer from "../navbarHamburguer/Hamburguer";
import IconLinks from "./IconLinkItems";
import Logo from "../../shared/logo/Logo";
export default async function Navbar() {
	return <>
		<header className="navbar h-[10vh] z-50 font-def2">
			<div className={`fixed z-50 w-screen h-[10vh] py-3 text-gray-500 shadow-sm bg-white transition duration-200`}>
				<nav className="flex h-full  items-center px-8 gap-8 capitalize justify-between sm:justify-around lg:gap-0  sm:px-5 md:px-3 lg:px-4">
					<Logo/>
					<Hamburguer />
					<div className="hidden sm:inline">
						<SearchItemsBar className="text-2xl sm:text-sm md:text-lg lg:text-xl w-full"/>
					</div>
					<div className="hidden sm:inline">
						<ul aria-label='navegação de Utilidade' className='flex items-center gap-8 sm:gap-6 md:gap-7 lg:gap-8'>
							<IconLinks className="text-2xl sm:text-lg md:text-xl lg:text-2xl"/>
						</ul>
					</div>
				</nav>
			</div>
		</header>
	</>
}