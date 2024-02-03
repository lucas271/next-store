import dynamic from 'next/dynamic'
import Banner from '../_components/pages/home/Banner'


const RecommendationComponent = dynamic(() => import('@/app/_components/pages/home/Recommendation'))
const CarrouselComponent = dynamic(() => import("@/app/_components/pages/home/Carrousel"))

export default async function Home() {
	return (
		<main className=" font-def3">
			<Banner/>
			<CarrouselComponent/>
			<RecommendationComponent/>
		</main>
	)
}