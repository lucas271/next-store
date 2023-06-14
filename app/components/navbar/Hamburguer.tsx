"use client"
import { useRef, useState } from "react";
import HamburguerIcon from "./hamburguer/HamburguerIcon";
import Aside from "./hamburguer/Aside";

export default function Hamburguer() {
   const [hamburguerIsOpen, setHamburguerIsOpen] = useState<boolean>(false);
   const asideRef = useRef<HTMLElement | null>(null);

   return <>
    <HamburguerIcon hamburguerIsOpen={hamburguerIsOpen} setHamburguerIsOpen={setHamburguerIsOpen} asideRef={asideRef}/>
    {hamburguerIsOpen && <Aside ref={asideRef}/>}
  </>
}
