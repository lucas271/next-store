/* eslint-disable react/display-name */
import { forwardRef } from "react";
import IconLinkItems from "../navbarLinks/IconLinkItems";
import CategoryItems from "../navbarLinks/CategoryItems";
import SearchBar from "../../utility/searchBar/SearchBar";

export default forwardRef<HTMLElement | null, {}>((_props, ref) => {
   return <>
   <aside
    ref={ref}
    className={`fixed top-0 left-0 w-screen h-screen bg-white z-40 animate-aside-slide-in overflow-auto sm:hidden`}
    >
      <div className="h-[10vh] w-full"></div>
      <ul className="flex flex-col items-center min-h-screen-minus-nav capitalize ">
        <li className="w-full p-8 border-b-2 border-gray-300 text-center relative">
          <div className="w-3/4 m-auto">
            <SearchBar/>
          </div>
        </li>
        <IconLinkItems className="w-full p-8 border-b-2 border-gray-300 text-center relative cursor-pointer text-2xl hover:text-gray-800" isHamburguer={true}/>
        <CategoryItems className="w-full p-8 border-b-2 border-gray-300 text-center relative cursor-pointer text-2xl hover:text-gray-800"/>
      </ul>
    </aside>
</>
})