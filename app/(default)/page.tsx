import ProductRecommendation from '../components/ProductRecommendation/ProductRecommendation'
import Banner from '../components/home/Banner'
import Carrousel from '../components/home/Carrousel'
import Footer from '../components/home/Footer'
import StyledButton from '../components/utility/styledButton/StyledButton'


export default function Home() {
   return (
      <main className="">
         <Banner/>

         <Carrousel/>
         <div className='h-screen-minus-nav flex flex-col justify-evenly items-center'>
            <h2 className='text-xl font-bold'>Recomendações</h2>
            <ProductRecommendation/>
            <StyledButton text='Outros produtos'/>
         </div>
         <Footer/>
      </main>
   )
}