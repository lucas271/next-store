import StyledButton from "@/app/components/utility/styledButton/StyledButton";
import Image from "next/image";

export default function Item(){
  return<>
    <main className="w-[90%] h-screen-minus-nav m-auto relative py-5">
      <div className="p-3 h-full gap-3 w-full bg-yellow-300 rounded-lg flex flex-col sm:flex-row justify-evenly items-center">
        <div className="">

        </div>
        <div className="h-full sm:h-4/6 w-1/3 sm:w-full relative">
          <Image src={'/bottle.png'} fill alt="bottle"/>
        </div>
        <div className="h-full sm:h-2/6 w-2/3 sm:w-full relative flex justify-evenly flex-col overflow-auto">
          <article className="h-fit h-max-1/2 flex flex-col justify-center text-xl sm:text-lg">
            <h2>Item blabla</h2>
            <p>esse item faz bla bla bla bla</p>
          </article>
          <div className="flex gap-2 h-1/2 font-bold justify-center items-center">
            <StyledButton text="comprar" className='h-4/5 text-sm w-2/5 p-1'/>
            <StyledButton text="adicionar ao carrinho" className='h-4/5 text-sm w-3/5 p-1'/>
          </div>
        </div>

      </div>
    </main>
  </>
}