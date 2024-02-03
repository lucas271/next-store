"use client"

import { BsSearch } from "react-icons/bs"
import StyledInput from "../styledInput/StyledInput"
import Image from "next/image"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { productSliceType } from "@/lib/services/slices/productSlice"
import axios from "axios"
import { useRouter } from "next/navigation"

const SearchItemsBar = ({className}: {className?: string}) => {
	const [isSearchActive, setIsSearchActive] = useState<boolean>(false)
	const searchRef = useRef<null | HTMLDivElement>(null)
	const route = useRouter()
	const [searchBarResult, setSearchBarResult] = useState<productSliceType[]>([])

	//searchRef is only if I decided to create a out animation for this after.
	//honestely I think it might be unnecessary here.
	const handleOutsideClick = (e: any) => {
		if (searchRef.current && !searchRef.current.contains(e.target)) {
			setIsSearchActive(false)
		}
	};
  
	useEffect(() => {
		if(!isSearchActive) return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		}
		document.addEventListener("mousedown", handleOutsideClick);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSearchActive]);

	//It needs to be done specifically here, so IT does not disturbs page specif redux logic. 
	//I could Also pass a reduxProvider specifically for this component on the parent component
	//but I wanted to try doing an api call inside the component so I took the oportunity : < )
	const handleSeachBarChange = async (e?: ChangeEvent<HTMLInputElement>): Promise<void> => {
		try {
			const response = await axios.get('/api/controllers/product?productCredencials='+JSON.stringify({
				type: 'products',
				limit: 5,
				startsWith: e?.target.value ? e.target.value: '',
				sortBy: {mostFavorites: true}
			})).then(res => res).catch(res => {
				throw JSON.stringify({errors: [...res.response.data]})
			})

			return setSearchBarResult(response.data.product)
		} catch (error) {
			setSearchBarResult([])
			throw new Error(String(error))
		} 
	}

	const HandleFocus = async (): Promise<void> => {

		//ensure you'll have some search result even when searchBar is first initialized, I need to further work on this to solver unnecesary recalling pbl.
		await handleSeachBarChange()
		setIsSearchActive(true)
	}

	return <>
		<div className="w-full relative" ref={searchRef}>
			<StyledInput Icon={BsSearch} className={`text-2xl w-full ${className}`} id="searchBar" onFocus={HandleFocus} name="searchBar" onChange={handleSeachBarChange}/>

			{isSearchActive && <ul className="absolute  w-full sm:w-[375%] md:w-[200%] sm:-left-[200%]  md:-left-[50%] z-50 bg-slate-200 rounded-md">
				{searchBarResult.slice(0, 5).map(searchResult => {
					return <div key={searchResult.id} className="w-full hover:bg-black cursor-pointer hover:bg-opacity-40  transition-all" onClick={() => route.push(searchResult && '/item/'+searchResult.id || '#')}> 
						<li className="border-b-2 flex border-slate-800 p-2 sm:p-4 h-[8.5vh] md:h-[10vh] relative justify-around items-center w-full gap-2">
							<div className="h-full w-1/5 relative">
								<Image src={'/' + (searchResult.img || "bottle.png")} alt="imagem de garrafa d'agua" fill className="h-full w-full" priority sizes="100%"/>
							</div>
							<div className=" break-words flex-grow h-full flex-shrink overflow-hidden">
								{searchResult.name}
							</div>
							<div className="hidden sm:block">
                R${(Number(searchResult.price)).toFixed(2).replace('.', ',')}
							</div>
						</li>
					</div>
				})}
			</ul>}
		</div>
	</>
}

export default SearchItemsBar