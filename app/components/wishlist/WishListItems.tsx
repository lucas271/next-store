import { BsTrash } from "react-icons/bs"
import StyledButton from "../utility/styledButton/StyledButton"
import Image from 'next/image'
import ProductRecommendation from "../ProductRecommendation/ProductRecommendation"

const WishListItems = ({className}: {className?: string}) => {
  return <>
    <section className={`m-auto px-3 w-full ${className} my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 box-border`}>
      <div className="flex flex-col h-[75vh] w-full rounded-md relative border-gray-200 border">
        <div className="absolute right-3 top-1 z-40">
            <button className="p-2 border-yellow rounded-full border-2 transition duration-200 text-gray-700 border-gray-700 hover:bg-gray-700 hover:text-white ">
              <BsTrash/>
            </button>
        </div>
        <div className="h-3/6  relative mt-4">
          <Image src='/bottle.png' alt="bottle" fill/>
        </div>
        <div  className="h-3/6 flex flex-col justify-evenly w-3/4 m-auto">
          <article className="text-gray-700 uppercase overflow-auto p-2">
            <h3 className="text-gray-900">tenis bla bla</h3>
            <p className="font-italic">bla bla</p>
            <span className="font-bold">R$45,00</span>
          </article>
          <div className="w-full flex flex-col gap-2"> 
            <StyledButton text="+ Carrinho" className={'w-full'}/>
            <StyledButton text="Comprar" className={'w-full'}/>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default WishListItems