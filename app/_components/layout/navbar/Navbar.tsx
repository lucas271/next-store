import NavbarLinks from './NavbarLinks';

export default async function Navbar() {

   return <>
         <header className="navbar h-[10vh] z-50 font-def2">
            <div className={`fixed z-50 w-screen h-[10vh] py-3 text-gray-500 shadow-sm bg-white transition duration-200`}>
               <nav className="flex h-full  items-center px-8 gap-8 capitalize justify-between sm:justify-around lg:gap-0  sm:px-5 md:px-3 lg:px-4">
                 <NavbarLinks />
               </nav>
            </div>
         </header>
      </>
}