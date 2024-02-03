import StoreBenefits from "@/app/_components/shared/storeBenefits/StoreBenefits";
import ProductsContainer from "@/app/_components/pages/products/ProductsContainer";

export default function Item() {
	return <>
		<div>
			<StoreBenefits/>
			<ProductsContainer/>
		</div>
	</>
}