import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";

export default function HamburguerIcon({setHamburguerIsOpen, hamburguerIsOpen, asideRef}: {setHamburguerIsOpen: Dispatch<SetStateAction<boolean>>, hamburguerIsOpen: boolean, asideRef:MutableRefObject<HTMLElement | null>}){
  const [hamburguerAnimateOut, setHamburguerAnimateOut] = useState<boolean>(false)
  
  const handleHamburguer = (): void => {
    const body = document.body
    if (hamburguerIsOpen) {
      const aside: HTMLElement | null = asideRef?.current;
      if (aside) {
          aside.classList.add("animate-aside-slide-off")
          setHamburguerAnimateOut(true)
          body.classList.remove("overflow-hidden")
          aside.classList.add("overflow-hidden")
          aside.addEventListener("animationend", () => {
            setHamburguerIsOpen(false);
            aside.classList.add("hidden")
            setHamburguerAnimateOut(false)
          })
      }else{
        setHamburguerIsOpen(false)
      }
      return
     }
     body.classList.add("overflow-hidden")

     //if the client changes screen size while the hamburguer is open prevent overflow to be hidden
     body.classList.add("sm:overflow-auto")
     setHamburguerIsOpen(true)
  };

  return <>
    <div
      aria-label={"0"}
      tabIndex={0}
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