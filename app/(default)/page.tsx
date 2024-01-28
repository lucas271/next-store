import Banner from '../_components/pages/home/Banner'
import Carrousel from '../_components/pages/home/Carrousel'
import Recommendation from '../_components/pages/home/Recommendation'


export default async function Home() {
   return (
      <main className=" font-def3">
         <Banner/>

         <Carrousel/>
         <Recommendation/>

      </main>
   )
}