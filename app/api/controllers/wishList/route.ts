import { NextRequest, NextResponse } from 'next/server'
import { boilerPlateResponse } from '../util/boilerPlateResponse';
import WishList, { WishListBodyInterface, WishListQueryInterface } from '../../models/WishListModel';
import { Console } from 'console';
import { getServerSession } from 'next-auth';
import { options } from '../../auth/[...nextauth]/options';



export async function GET(req: NextRequest){
try {
    const query: WishListQueryInterface & {type: 'items' | 'item'} = req.nextUrl.searchParams.get('wishListCredentials') && JSON.parse(String(req.nextUrl.searchParams.get('wishListCredentials')))
    if(!query) return new Response(JSON.stringify(['não foi possivel conectar']), {
        status: 400,
    })
    const wishList = new WishList(undefined, query)

    
    if(query.type === 'item') return await boilerPlateResponse(wishList, wishList.getWishListItem.bind(wishList), 'wishList')
    else if(query.type ==='items') return await boilerPlateResponse(wishList, wishList.getWishListItems.bind(wishList), 'wishList')
    else{
         return new Response(JSON.stringify(['did not receive the type of the operation']), {
            status: 404,
        })
    }
} 
catch (error) {
    return new Response(JSON.stringify({errors: ['erro no servidor']}), {
        status: 500,
    })}
}

export async function POST(req: NextRequest){
    try {
        const body: WishListBodyInterface = await req.json()
        if(!body) return new Response(JSON.stringify({errors: ['informações não recebidas']}), {
            status: 400,
        })
    
        const wishList = new WishList(body)
        return await boilerPlateResponse(wishList, wishList.addToWishList.bind(wishList), 'product')
    } 
    
    catch (error) {
        return new Response(JSON.stringify({errors: ['erro no servidor']}), {
            status: 500,
        })  }
}

export async function DELETE(req: NextRequest){
    try {
        const body: WishListBodyInterface & {type: 'product' | 'deleteAll'} = await req.json()
        if(!body) return new Response(JSON.stringify({errors: ['informações não recebidas']}), {
            status: 400,
        })
    
        const wishList = new WishList(body)
        if(body.type === 'product') return await boilerPlateResponse(wishList, wishList.removeFromWishList.bind(wishList), 'product')
        if(body.type === 'deleteAll') return await boilerPlateResponse(wishList,  wishList.removeAllFromWishList.bind(wishList), 'product')
    } 
    
    catch (error) {
        return new Response(JSON.stringify({errors: ['erro no servidor']}), {
            status: 500,
        })  
    }
}
