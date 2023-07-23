import Hamburguer from "./Hamburguer";
import CategoryItems from "./navbarLinks/CategoryItems";
import IconLinks from "./navbarLinks/IconLinkItems";
import Logo from "./navbarLinks/Logo";
import NavSearch from "./navbarLinks/NavSearch";

export default function NavbarLinks() {
   return <>
         <Logo/>
         <Hamburguer />
         <div className="hidden sm:inline">
            <ul aria-label='navegação de categorias' className='flex items-center gap-5 md:gap-4 sm:gap-3 lg:gap-5'>
               <CategoryItems className="text-2xl sm:text-lg md:text-xl lg:text-2xl"/>           
            </ul>
         </div>
         <div className="hidden sm:inline">
            <NavSearch className="text-2xl sm:text-sm md:text-lg lg:text-xl"/>
         </div>
         <div className="hidden sm:inline">
            <ul aria-label='navegação de Utilidade' className='flex items-center gap-8 sm:gap-6 md:gap-7 lg:gap-8'>
               <IconLinks className="text-2xl sm:text-lg md:text-xl lg:text-2xl"/>
            </ul>
         </div>
      </>
}