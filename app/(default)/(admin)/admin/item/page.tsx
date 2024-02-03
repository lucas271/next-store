"use client"

import AddProductForm from "@/app/_components/forms/ProductForm"
import ProductsContainer from "@/app/_components/pages/products/ProductsContainer"
import { useAppDispatch } from "@/lib/services/reduxStore/storeHooks"
import { useState } from "react"
import { IoMdArrowBack } from "react-icons/io"
import { MdAdd } from "react-icons/md"

const ItemAdmin = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const dispatch = useAppDispatch()

	return <>
		<ProductsContainer isAdmin={true}>
			<div className="sm:h-[48vh] h-[40vh]">
				{isOpen ? <div className="h-full relative border-2  p-3  pt-9 overflow-auto">
					<span className=" absolute top-2 left-2 text-slate-600 hover:text-slate-900 p-0.5 cursor-pointer" onClick={() => setIsOpen(!isOpen)}><IoMdArrowBack /></span>
					<AddProductForm setIsOpen={setIsOpen}/> 
				</div>:
					<div className="h-full relative border-2 hover:text-slate-900 text-slate-600 duration-200 transition-all cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
						<MdAdd className=" h-full text-3xl mx-auto" />
					</div>}
			</div>
		</ProductsContainer>
	</>
}

export default ItemAdmin