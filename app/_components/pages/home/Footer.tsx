import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineSmile, AiOutlineTwitter } from "react-icons/ai";
import StyledButton from "../../shared/styledButton/StyledButton";
import Link from "next/link";

export default function Footer(){
  return <>
    <footer className="text-center sm:text-left relative w-full bg-white h-min-[50vh] sm:h-min-[70vh] text-gray-600 ">
      <div className="flex flex-col-reverse sm:flex-row justify-evenly w-[95%] sm:w-[90%] m-auto h-full gap-6 py-12 relative">
        <div className="flex-col flex gap-4 sm:text-xl text-lg">
          <div className="w-[70%] sm:w-full m-auto sm:m-0  flex flex-col gap-3">
            <span>Cidade, bla bla</span>
            <span >gmaillala@gmail.com</span>
          </div>
          <div className="flex sm:justify-start justify-center gap-6">
              <Link href={"#"}>
                <span className="hover:text-gray-800 transition duration-200 cursor-pointer">
                  <AiOutlineFacebook/>
                </span>
              </Link>
              <Link href={"#"}>
                <span className="hover:text-gray-800 transition duration-200 cursor-pointer">
                  <AiOutlineTwitter/>
                </span>
              </Link>

              <Link href={"#"}>
                <span className="hover:text-slate-800 transition duration-200 cursor-pointer">
                  <AiOutlineInstagram/>
                </span>
              </Link>
          </div>
        </div>
        
        <article className="md:w-[50%] w-[75%] flex flex-col justify-evenly m-auto">
          <h2 className="font-bold text-xl">Conheça a VariTech</h2>
          <p className="text-sm sm:text-md max-h-[60vh] overflow-auto">Na era atual, onde a tecnologia se tornou uma 
            parte essencial de nossas vidas diárias, a TechSmart se destaca como uma empresa inovadora e líder no mercado de produtos tech. Com uma ampla gama de produtos, desde garrafas térmicas inteligentes até relógios smart variados, estamos empenhados em oferecer solu
            ções inovadoras e funcionais que facilitam sua vida.
          </p>
        </article>
      </div>
      <span className="absolute bottom-2 text-slate-800 w-full text-center left-0">Feito por <a href="https://github.com/lucas271?tab=repositories" target="_blank" className="font-bold hover:text-slate-950 transition duration-200">Lucas <AiOutlineSmile className="inline-block"/></a> </span>
    </footer>
  </>
}