"use client"
import { BsBag, BsHeart, BsPerson } from "react-icons/bs";
import Link from "next/link";

import { BiExit } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";
import CartCountIcon from "@/app/_components/layout/cartOnNavbar/CartCountIcon";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import CartPreview from "../cartOnNavbar/CartPreview";


export default function IconLinkItems({isHamburguer=false, className, type='default'} : {type?: 'default' | 'footer',isHamburguer?: boolean, className?:string}){
	const {data: session, status} = useSession()
	const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
	const route = useRouter()
	const cartShowdownRef = useRef<HTMLDivElement | null>(null)
	const pathName = usePathname()

	function handleCartOutAnimation(): void{
		if(isCartOpen === false) {
			setIsCartOpen(true)
			cartShowdownRef.current && cartShowdownRef.current.removeEventListener('animationend', handleAnimationOut)
			return void 0
		}
		if(!cartShowdownRef.current) return
  
		cartShowdownRef.current.classList.add('animate-slide-in-to-top')
		function handleAnimationOut () {
			cartShowdownRef.current?.classList.add('hidden')
			setIsCartOpen(false)
		}
		cartShowdownRef.current.addEventListener('animationend', handleAnimationOut)
	}
	const handleOutsideClick = (e: any) => {
		if (cartShowdownRef.current && !cartShowdownRef.current.contains(e.target)) {
			handleCartOutAnimation()
		}
	};

	useEffect(() => {
		if(!isCartOpen) return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		}

		document.addEventListener("mousedown", handleOutsideClick);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isCartOpen]);
	useEffect(() => {
		setIsCartOpen(false)
	}, [pathName])


	//need to use usessesion instead of useSessionServer because Hamburguer is a client component, worth trying to make it a server component later on.
	if(status === 'loading') return <></>
	return <>
		{session?.user &&  <>
			<li className={className}>
				<Link href={'/wishList'} className="hover:text-gray-700 h-full w-full">                     
					<BsHeart
						className={`cursor-pointer transition duration-200 sm:inline ${isHamburguer && 'absolute'} h-full top-0`}
						aria-label='Login'
					/>
					{isHamburguer ? 'Favoritos': ''}
				</Link>
			</li>
			<li className={className + ' relative'} >
				<div onClick={() => type === 'default' ? handleCartOutAnimation() : type === 'footer' ? route.push('/cart') :  void 0}  className="hover:text-gray-700 cursor-pointer h-full w-full relative">
					<div className={'relative'}>
						<BsBag
							className={`transition duration-200 h-full top-0`}
							aria-label='Carrinho de compras'
						/>
						<CartCountIcon className='-bottom-4 left-2 h-7 w-7 p-2 text-sm'/>
					</div>


					{isHamburguer && "carrinho"}
				</div>
				{
					type === 'default' && isCartOpen === true && <CartPreview ref={cartShowdownRef}/>
				}
			</li>
		</>}
		<li className={className}>
			{      !session?.user ? <Link href={'/signIn'} className="hover:text-gray-700 h-full w-full">                     
				<BsPerson
					className={`cursor-pointer transition duration-200 sm:inline ${isHamburguer && 'absolute'} h-full top-0`}
					aria-label='Login'
				/>
				{isHamburguer ? 'Entrar': ''}
			</Link>:
				<span className="hover:text-gray-700 h-full w-full" onClick={() => {
					signOut({callbackUrl: '/'})
				}}>                     
					<BiExit
						className={`cursor-pointer transition duration-200 sm:inline ${isHamburguer && 'absolute'} h-full top-0`}
						aria-label='Logout'
					/>
					{isHamburguer ? 'Sair': ''}
				</span>
			}

		</li>

	</>
}