import { BsCart, BsPerson, BsSearch } from "react-icons/bs";
import Categories from "../navbarLinks/CategoryItems";
import IconLinks from "../navbarLinks/IconLinkItems";
import { MutableRefObject } from "react";

export default function Aside({ref}: {ref: MutableRefObject<HTMLBaseElement | null>}){
  return <>
  <aside
     ref={ref}
     className={`fixed top-0 left-0 w-screen h-screen bg-white z-40 animate-aside-slide-in`}
  >
     <div className="h-[10vh] w-screen"></div>
     <ul className="flex flex-col items-center min-h-screen-minus-nav capitalize">
        <li className="w-full p-8 border-b-2 border-gray-300 text-center relative">
           <div className="relative w-3/4 m-auto hover:text-gray-800">
              <BsSearch className="absolute h-full ml-1" />
              <input
                 type="text"
                 className="w-full py-1 pl-8 rounded-md focus:outline-gray-200"
              />
           </div>
        </li>
        <li className="w-full p-8 border-b-2 border-gray-300 text-center relative mt-auto cursor-pointer hover:text-gray-800">
           <BsPerson className="absolute h-full top-0" /> Entrar
        </li>
        <li className="w-full p-8 border-b-2 border-gray-300 text-center relative cursor-pointer hover:text-gray-800">
           <BsCart className="absolute h-full top-0" /> carrinho
        </li>
        <IconLinks/>
        <Categories/>
     </ul>
  </aside>
</>
}