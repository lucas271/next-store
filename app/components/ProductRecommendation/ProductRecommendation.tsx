import StyledButton from "../utility/styledButton/StyledButton"
import Image from 'next/image'

const ProductRecommendation = () => {
  return <>
    <section className="lg:w-[70%] md:w-[80%] w-[95%] overflow-auto flex gap-2 m-auto my-2 relative">
      <div className="w-1/2 sm:w-1/3 md:w-1/4 sm:h-[48vh] h-[40vh]  flex-shrink-0">
        <div className="h-3/6  relative">
          <Image src='/bottle.png' alt="bottle" fill/>
        </div>
        <div  className="h-3/6 flex flex-col justify-evenly w-3/4 m-auto">
          <div className="text-gray-700 uppercase overflow-auto pt-1 flex flex-col justify-between w-full text-sm sm:text-lg">
            <div className="text-gray-900 w-full whitespace-no-wrap">tenis bla bla</div>
            <div className="font-bold w-full">R$45,00</div>
          </div>
          <div className="w-full text-sm sm:text-lg"> 
            <StyledButton text="Ver mais" className={'w-full'}/>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default ProductRecommendation