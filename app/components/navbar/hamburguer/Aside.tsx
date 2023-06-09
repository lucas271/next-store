/* eslint-disable react/display-name */
import { BsSearch } from "react-icons/bs";
import { MutableRefObject, forwardRef } from "react";
import IconLinkItems from "../navbarLinks/IconLinkItems";
import CategoryItems from "../navbarLinks/CategoryItems";

export default forwardRef<HTMLElement | null, {}>((_props, ref) => {
   return <>
   <aside
    ref={ref}
    className={`fixed top-0 left-0 w-screen h-screen bg-white z-40 animate-aside-slide-in overflow-auto`}
    >
      <div className="h-[10vh] w-full"></div>
      <ul className="flex flex-col items-center min-h-screen-minus-nav capitalize ">
        <li className="w-full p-8 border-b-2 border-gray-300 text-center relative">
            <div className="relative w-3/4 m-auto hover:text-gray-800">
              <BsSearch className="absolute h-full ml-1" />
              <input
                  type="text"
                  className="w-full py-1 pl-8 rounded-md focus:outline-gray-200"
              />
            </div>
        </li>
        <IconLinkItems className="w-full p-8 border-b-2 border-gray-300 text-center relative cursor-pointer hover:text-gray-800" isHamburguer={true}/>
        <CategoryItems className="w-full p-8 border-b-2 border-gray-300 text-center relative cursor-pointer hover:text-gray-800"/>
      </ul>
    </aside>
</>
})