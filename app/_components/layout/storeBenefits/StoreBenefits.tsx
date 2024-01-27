"use client"

import { useEffect, useState } from "react";
import { BsCreditCardFill } from "react-icons/bs";
import { MdPix } from "react-icons/md";
import { RiTruckFill } from "react-icons/ri";

export default function StoreBenefits(){
    const [carrouselPosition, setCarrouselPosition] = useState<number[]>([1, 2, 3])
    const [screenSize, setScreenSize] = useState<number>(0)



    useEffect(() => {
        //need to add the slideoff animation later on
     window.addEventListener('resize', () => screenSize !== window.innerWidth && setScreenSize(window.innerWidth))
     if(screenSize >= 640) return 
     const interval = setInterval(() => {
        setCarrouselPosition(() => {
            const newCarrousel = [carrouselPosition[1], carrouselPosition[2], carrouselPosition[0]]

            return newCarrousel
        })
     }, 6000)

     return () => clearInterval(interval)
    }, [carrouselPosition, screenSize])

    return <>
        <header className="flex w-full  justify-start sm:justify-around items-center border-b-2 border-slate-300 h-20 mb-6 overflow-hidden">
            <span className={((carrouselPosition.indexOf(1) + 1) !== 1  ? 'hidden ' : 'flex ') + 'order-'+(carrouselPosition.indexOf(1) + 1) +" sm:order-1 sm:flex w-full shrink-0 sm:shrink items-center justify-center h-1/2 animate-aside-slide-in"}>
                <div className="text-slate-800 hover:text-slate-600 flex justify-center items-center  gap-2 md:gap-4 md:text-lg sm:text-sm cursor-pointer p-4">
                    <BsCreditCardFill className={"sm:text-xl  md:text-3xl text-3xl"}/>

                    <div className="text-sm uppercase">
                        <h4 className=""> 3 X SEM JUROS </h4>
                        <p className="font-bold"> Nas principais bandeiras </p>
                    </div>
                </div>
            </span>
            <span className={((carrouselPosition.indexOf(2) + 1) !== 1 ? 'hidden ' : 'flex ')  + "order-"+(carrouselPosition.indexOf(2) + 1) + " sm:order-2 sm:flex w-full shrink-0 sm:shrink justify-center items-center  h-1/2 animate-aside-slide-in "}>
                <div className="text-slate-800 hover:text-slate-600 flex justify-center items-center  gap-2 md:gap-4 md:text-lg sm:text-sm cursor-pointer p-4">
                    <RiTruckFill className="sm:text-xl  md:text-3xl text-3xl"/>

                    <div className="text-sm uppercase">
                        <h4 className="">Entrega Garantida </h4>
                        <p className="font-bold">Em todo Brasil</p>
                    </div>
                </div>
            </span>

            <span className={((carrouselPosition.indexOf(3) + 1) !== 1 ? 'hidden ' : 'flex ') + 'order-'+(carrouselPosition.indexOf(3) + 1) +" sm:order-3 sm:flex w-full shrink-0 sm:shrink justify-center items-center  h-1/2 animate-aside-slide-in"}>
                <div className="text-slate-800 hover:text-slate-600 flex justify-center items-center  gap-2 md:gap-4 md:text-lg sm:text-sm cursor-pointer p-4">
                    <MdPix className="sm:text-xl  md:text-3xl text-3xl"/>

                    <div className="text-sm uppercase">
                        <h4 className=""> 4% de desconto </h4>
                        <p className="font-bold">No pix</p>
                    </div>
                </div>
            </span>
        </header>
    </>
}