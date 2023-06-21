"use client"
import { useEffect, useRef, useState } from "react";
import HamburguerIcon from "./hamburguer/HamburguerIcon";
import Aside from "./hamburguer/Aside";
import {usePathname} from 'next/navigation';

export default function Hamburguer() {
   const [hamburguerIsOpen, setHamburguerIsOpen] = useState<boolean>(false);
   const asideRef = useRef<HTMLElement | null>(null);
   const router = usePathname()
   useEffect(() => {
     setHamburguerIsOpen(false)
   }, [router])

   return <>
    <HamburguerIcon hamburguerIsOpen={hamburguerIsOpen} setHamburguerIsOpen={setHamburguerIsOpen} asideRef={asideRef}/>
    {hamburguerIsOpen && <Aside ref={asideRef}/>}
  </>
}
