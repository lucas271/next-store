import Hamburguer from "./Hamburguer";
import Categories from "./navbarLinks/CategoryItems";
import IconLinks from "./navbarLinks/IconLinkItems";
import Logo from "./navbarLinks/Logo";

export default function NavbarLinks() {
   return <>
         <Logo/>
         <Hamburguer />
         <div className="hidden sm:inline">
            <ul aria-label='navegação de categorias' className='flex items-center gap-5'>
               <Categories/>           
            </ul>
         </div>
         <div className="hidden sm:inline">
            <ul aria-label='navegação de Utilidade' className='flex items-center gap-8'>
               <IconLinks/>
            </ul>
         </div>
      </>
}