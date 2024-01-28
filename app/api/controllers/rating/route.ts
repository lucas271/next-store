import { NextRequest } from 'next/server'
import { boilerPlateResponse } from '../util/boilerPlateResponse';
import Rating, { RatingBodyInterface,  } from '../../models/RatingModel';

export async function GET(req: NextRequest){
try {
    const productId: string = req.nextUrl.searchParams.get('productId') || ''
    if(!productId) return new Response(JSON.stringify({errors: ['id do produto não recebido']}), {
        status: 400,
    })


    const rating = new Rating(undefined, {productId})
    return await boilerPlateResponse(rating, rating.getRatings.bind(rating), 'rating')
} 
catch (error) {
    return new Response(JSON.stringify({errors: ['erro no servidor']}), {
        status: 500,
    })}
}

export async function POST(req: NextRequest){
    try {
        const body: RatingBodyInterface = await req.json()
        if(!body) return new Response(JSON.stringify({errors: ['informações não recebidas']}), {
            status: 400,
        })
    
       
        const rating = new Rating(body)
        return await boilerPlateResponse(rating, rating.createNewRating.bind(rating), 'rating')
    } 
    
    catch (error) {
        return new Response(JSON.stringify({errors: ['erro no servidor']}), {
            status: 500,
        })  }
}

export async function DELETE(req: NextRequest){
    try {
        const body: RatingBodyInterface = await req.json()
        if(!body) return new Response(JSON.stringify({errors: ['informações não recebidas']}), {
            status: 400,
        })
    

        const rating = new Rating(body)

        return await boilerPlateResponse(rating, rating.deleteRating.bind(rating), 'rating')
    } 
    
    catch (error) {
        return new Response(JSON.stringify({errors: ['erro no servidor']}), {
            status: 500,
        })  
    }
}

export async function PUT(req: NextRequest){
    try {
        const body: RatingBodyInterface = await req.json()

        if(!body) return new Response(JSON.stringify({errors: ['informações não recebidas']}), {
            status: 400,
        })

        const rating = new Rating(body)

        return await boilerPlateResponse(rating, rating.updateRating.bind(rating), 'rating')

    } catch (error) {
        return new Response(JSON.stringify({errors: ['erro no servidor']}), {
            status: 500,
        })  
    }
}