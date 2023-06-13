import StyledButton from "@/app/components/styledButton/StyledButton";
import Image from "next/image";

export default function Item(){
  return<>
    <main className="w-[90%] h-screen-minus-nav m-auto relative py-5">
      <div className="p-3 h-full gap-3 w-full bg-yellow-300 rounded-lg flex flex-col justify-evenly items-center">
        <div className="h-4/6">
          <Image src={'/bottle.png'} width={300} height={300} alt={'bottle'}/>
        </div>
        <div className="h-2/6 relative">
          <article className="h-1/2">
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