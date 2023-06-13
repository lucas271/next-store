import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";

export default function HamburguerIcon({setHamburguerIsOpen, hamburguerIsOpen, ref}: {setHamburguerIsOpen: Dispatch<SetStateAction<boolean>>, hamburguerIsOpen: boolean, ref:MutableRefObject<HTMLElement | null>}){
  const [hamburguerAnimateOut, setHamburguerAnimateOut] = useState<boolean>(false)
  
  const handleHamburguer = (): void => {
     if (hamburguerIsOpen) {
      
        const aside: HTMLElement | null = ref.current;
        if (aside) {
           aside.className += " animate-aside-slide-off";
           setHamburguerAnimateOut(true)
           aside.addEventListener("animationend", () => {
              setHamburguerIsOpen(false);
              aside.classList.remove("overflow-hidden");
              setHamburguerAnimateOut(false)
           });
        }
        return;
     }
     document.body.classList.add("overflow-hidden");
     setHamburguerIsOpen(true);
  };

  return <>
    <div
      aria-label={"0"}
      className="sm:hidden group cursor-pointer flex flex-col items-center justify-center p-1 py-1.5 space-y-1 z-50"
      onClick={handleHamburguer}
    >
      <span
        className={`block w-8 h-1 bg-gray-400 transition transition-duration-400 ${
            hamburguerIsOpen && !hamburguerAnimateOut ? "rotate-45 max-w-0 max-h-0" : ""
        } group-hover:bg-gray-600`}
      ></span>
      <span
        className={`block w-8 h-1 bg-gray-400 transition transition-duration-400 ${
            hamburguerIsOpen && !hamburguerAnimateOut ? "rotate-45" : ""
        } group-hover:bg-gray-600`}
      ></span>
      <span
        className={`block w-8 h-1 bg-gray-400 transition transition-duration-400 ${
            hamburguerIsOpen && !hamburguerAnimateOut ? "-rotate-45 -translate-y-2" : ""
        } group-hover:bg-gray-600`}
      ></span>
    </div>
  </>
}