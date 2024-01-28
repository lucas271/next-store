import { NextRequest } from 'next/server'
import Cart, { CartBodyInterface } from '../../models/CartModel'
import { boilerPlateResponse } from '../util/boilerPlateResponse'
import { getServerSession } from 'next-auth'
import { options } from '../../auth/[...nextauth]/options'

export async function GET(req: NextRequest){
try {
    const query: CartBodyInterface = req.nextUrl.searchParams.get('cartCredentials') && JSON.parse(String(req.nextUrl.searchParams.get('cartCredentials')))
    if(!query) return new Response(JSON.stringify(['did not receive data']), {
        status: 400,
    })
    const cart = new Cart(query)

    return await boilerPlateResponse(cart, cart.getCart.bind(cart), 'cart')
} 

catch (error) {
    return new Response(JSON.stringify({errors: ['erro no servidor']}), {
        status: 500,
    })}
}

export async function POST(req: NextRequest){
    try {
        const body: CartBodyInterface  = await req.json()
        
        if(!body) return new Response(JSON.stringify({errors: ['não foi possivel conectar']}), {
            status: 400,
        })
    
        const cart = new Cart(body)

        return await boilerPlateResponse(cart, cart.handleCart.bind(cart), 'cart')
    } 
    
    catch (error) {
        console.log(error)
        return new Response(JSON.stringify({errors: ['erro no servidor']}), {
            status: 500,
        })  
    }
}


export async function PUT(req: NextRequest){
    try {
        const body: CartBodyInterface & {type: 'deleteSingleProductFromcart' | 'addProduct'} = await req.json()
        
        if(!body) return new Response(JSON.stringify({errors: ['não foi possivel conectar']}), {
            status: 400,
        })

        const cart = new Cart(body)
        if(body.type === 'deleteSingleProductFromcart') return await boilerPlateResponse(cart, cart.deleteSingleProductFromCart.bind(cart), 'cart')
        else if(body.type === 'addProduct') return await boilerPlateResponse(cart, cart.addProduct.bind(cart), 'cart')
        else{
            return new Response(JSON.stringify(['did not receive the type of the operation']), {
                status: 404,
            })
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({errors: ['erro no servidor']}), {
            status: 500,
        })
    }

    
}

export async function DELETE(req: NextRequest){
    try {
        const body: CartBodyInterface & {type: 'deleteProductFromCart' | 'deleteCart'} = await req.json()
        
        if(!body) return new Response(JSON.stringify({errors: ['não foi possivel conectar']}), {
            status: 400,
        })
    
        const cart = new Cart(body)

        if(body.type === "deleteProductFromCart") return await boilerPlateResponse(cart, cart.deleteProductFromCart.bind(cart), 'cart')
        else if(body.type === 'deleteCart') return await boilerPlateResponse(cart, cart.deleteCart.bind(cart), 'cart')
        else{
            return new Response(JSON.stringify(['did not receive the type of the operation']), {
                status: 404,
            })
        }

    } 
    
    catch (error) {
        return new Response(JSON.stringify({errors: ['erro no servidor']}), {
            status: 500,
        })  
    }
}