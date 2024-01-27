export default function formatPrice(price: number, ): string{
    if(!Number(price)) return 'R$00,00'
    return `R$${price.toFixed(2).replace('.', ',')}`
}