import { useAppSelector } from '@/lib/services/reduxStore/storeHooks'
import './style.css'

export default function PriceSummary(){

	const cart = useAppSelector(state => state.cart)



	return <div className="price_summary px-2 lg:text-xl sm: text-lg">
		<div>
			<span>Frete </span>
			<span>R${0.00.toFixed(2).replace('.',',')}</span>
		</div>
		<div>
			<span>Cupom </span>
			<span>R${0.00.toFixed(2).replace('.',',')}</span>
		</div>
		<div>
			<span>Total</span>
			<span> R${
				cart.products.length > 0 ? (cart.products.reduce((pv, cv) => pv + (Number(cv.product.price)) * Number(cv.quantity), 0)).toFixed(2).replace('.',',') 
					: (0).toFixed(2).replace('.', ',')}</span>
		</div>
	</div>
}