import './style.css'

export default function PriceSummary(){
  return <div className="price_summary px-2 lg:text-xl sm: text-lg">
    <div>
      <span >Subtotal </span>
      <span>R${(3102930129).toFixed(2).replace('.',',')}</span>
    </div>
    <div>
      <span>Frete </span>
      <span>R${(3102930129).toFixed(2).replace('.',',')}</span>
    </div>
    <div>
      <span>Cupom </span>
      <span>R${(3102930129).toFixed(2).replace('.',',')}</span>
    </div>
    <div>
      <span>Total</span>
      <span> R${(3102930129).toFixed(2).replace('.',',')}</span>
    </div>
  </div>
}