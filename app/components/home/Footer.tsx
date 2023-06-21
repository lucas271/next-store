import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineSmile, AiOutlineTwitter } from "react-icons/ai";
import StyledButton from "../styledButton/StyledButton";

export default function Footer(){
  return <>
    <footer className="relative w-full bg-yellow-200 h-min-[50vh] sm:h-min-[70vh]">
      <div className="flex justify-evenly w-[95%] sm:w-[90%] m-auto h-full gap-6 py-12 relative">
        <div className="italic flex flex-col justify-evenly sm:text-md text-[0.70rem] sm:text-[1rem] sm:w-[50%] w-[35%] relative gap-2">
          <span>Nova iguaçu, bla bla</span>
          <span className="text-[0.75rem] sm:text-[1rem]">lapmrj@gmail.com</span>
          <div className="flex gap-4 text-lg sm:text-xl sm:justify-start justify-evenly">
            <span><AiOutlineFacebook/></span>
            <span><AiOutlineTwitter/></span>
            <span><AiOutlineInstagram/></span>
          </div>
          <StyledButton text="Enviar mensagem" className={"sm:w-2/4 ]"}/>
        </div>
        <article className="md:w-[50%] w-[65%] flex flex-col justify-evenly">
          <h2 className="font-bold text-md sm:text-lg">Conheça a VariTech</h2>
          <p className="text-sm sm:text-md max-h-[60vh] overflow-auto">Na era atual, onde a tecnologia se tornou uma 
            parte essencial de nossas vidas diárias, a TechSmart se destaca como uma empresa inovadora e líder no mercado de produtos tech. Com uma ampla gama de produtos, desde garrafas térmicas inteligentes até relógios smart variados, estamos empenhados em oferecer solu
            ções inovadoras e funcionais que facilitam sua vida.</p>
        </article>
      </div>
      <span className="absolute bottom-0 text-slate-800 w-full text-center">Feito por <a href="https://github.com/lucas271?tab=repositories" target="_blank" className="font-bold hover:text-slate-950 transition duration-200">Lucas <AiOutlineSmile className="inline-block"/></a> </span>
    </footer>
  </>
}