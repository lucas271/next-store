import { NextRequest } from 'next/server'
import { boilerPlateResponse } from '../util/boilerPlateResponse';
import Review, { ReviewBodyInterface, ReviewQueryInterface } from '../../models/ReviewModel';

export async function GET(req: NextRequest){
try {
    const query: ReviewQueryInterface = req.nextUrl.searchParams.get('reviewCredentials') && JSON.parse(String(req.nextUrl.searchParams.get('reviewCredentials')))
    if(!query) return new Response(JSON.stringify(['não foi possivel conectar']), {
        status: 400,
    })
    const review = new Review(undefined, query)

    return await boilerPlateResponse(review, review.getReviews.bind(review), 'review')
} 
catch (error) {
    return new Response(JSON.stringify({errors: ['erro no servidor']}), {
        status: 500,
    })}
}

export async function POST(req: NextRequest){
    try {
        const body: ReviewBodyInterface = await req.json()
        if(!body) return new Response(JSON.stringify({errors: ['informações não recebidas']}), {
            status: 400,
        })
    
        const review = new Review(body)
        return await boilerPlateResponse(review, review.createNewReview.bind(review), 'review')
    } 
    
    catch (error) {
        return new Response(JSON.stringify({errors: ['erro no servidor']}), {
            status: 500,
        })  
    }
}

export async function DELETE(req: NextRequest){
    try {
        const body: ReviewBodyInterface = await req.json()
        if(!body) return new Response(JSON.stringify({errors: ['informações não recebidas']}), {
            status: 400,
        })
    
        const review = new Review(body)
        await boilerPlateResponse(review, review.deleteReview.bind(review), 'review')
    } 
    
    catch (error) {
        return new Response(JSON.stringify({errors: ['erro no servidor']}), {
            status: 500,
        })  
    }
}

export async function PUT(req: NextRequest){
    try {
        const body: ReviewBodyInterface = await req.json()

        if(!body) return new Response(JSON.stringify({errors: ['informações não recebidas']}), {
            status: 400,
        })

        const review = new Review(body)

        return await boilerPlateResponse(review, review.updateMessage.bind(review), 'review')

    } catch (error) {
        return new Response(JSON.stringify({errors: ['erro no servidor']}), {
            status: 500,
        })  
    }
}