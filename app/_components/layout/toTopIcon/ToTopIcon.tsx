"use client"

import { useEffect, useRef } from "react";
import { BsArrowUp } from "react-icons/bs";

export default function ToTopIcon(){
	function scrollToTop (){
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}
	const iconRef = useRef<HTMLDivElement>(null)

	function iconActive(){
		iconRef.current?.classList.remove('hidden', 'animate-aside-slide-in-opposite')
		iconRef.current?.classList.add('fixed', 'active', 'flex', 'animate-aside-slide-in-opposite')
	}



	useEffect(() => {
		//you need this to handle the specific use case where the user already enters in a scrollYPosition that should have the icon 
		if(window.scrollY >= 900) iconActive()
		function handleScroll(){
			if(iconRef.current?.classList.contains('active') && window.scrollY >= 900 || !iconRef.current?.classList.contains('active') && window.scrollY < 900) return 
                
			if(window.scrollY >= 900) return iconActive()
			if(window.scrollY < 900){
				iconRef.current?.classList.remove("animate-aside-slide-in-opposite", "active")
				iconRef.current?.classList.add('animate-aside-slide-off')
				iconRef.current?.addEventListener('animationend', () => {
					iconRef.current?.classList.add('hidden')
					iconRef.current?.classList.remove('animate-aside-slide-off')
				}, {once: true})
    
			}
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll);

	}, [])

	return <>
		<div ref={iconRef} className="fixed cursor-pointer z-30  hidden top-[86%] sm:top-[94%] lg:top-[91%]  left-2 sm:left-6 font-bold bg-slate-300 hover:bg-slate-400 rounded-full sm:w-12 sm:h-12 w-8 h-8  items-center justify-center text-slate-800 hover:text-slate-900 transition-all animate-aside-slide-in-opposite" onClick={scrollToTop} >
			<BsArrowUp/>
		</div>
	</>
}