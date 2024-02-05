import { NextRequest } from 'next/server'
import Product, { ProductBodyInterface, ProductQueryInterface } from "../../_models/ProductModel";
import { boilerPlateResponse } from '../util/boilerPlateResponse';

export async function GET(req: NextRequest){
	try {
		const query: ProductQueryInterface & {type: 'products' | 'product'} = req.nextUrl.searchParams.get('productCredencials') && JSON.parse(String(req.nextUrl.searchParams.get('productCredencials')))
    
		if(!query) return new Response(JSON.stringify(['não foi possivel conectar']), {
			status: 400,
		})
		const product = new Product(undefined, query)

		if(query.type === 'product') return await boilerPlateResponse(product, product.getProduct.bind(product), 'product')
		else if(query.type ==='products') return await boilerPlateResponse(product, product.getProducts.bind(product), 'product')
		else{
			return new Response(JSON.stringify(['did not receive the type of the operation']), {
				status: 404,
			})
		}
	} 
	catch (error) {
		console.log(error)
		return new Response(JSON.stringify({errors: ['erro no servidor']}), {
			status: 500,
		})}
}

export async function POST(req: NextRequest){
	try {
		const body: ProductBodyInterface = await req.json()
		if(!body) return new Response(JSON.stringify({errors: ['informações não recebidas']}), {
			status: 400,
		})
    
		const product = new Product(body)
		return await boilerPlateResponse(product, product.createNewProduct.bind(product), 'product')
	} 
    
	catch (error) {
		return new Response(JSON.stringify({errors: ['erro no servidor']}), {
			status: 500,
		})  }
}

export async function DELETE(req: NextRequest){
	try {
		const body: {userId: string, productId: string} = await req.json()
		if(!body) return new Response(JSON.stringify({errors: ['informações não recebidas']}), {
			status: 400,
		})
    
		const product = new Product(body)
		return await boilerPlateResponse(product, product.deleteProduct.bind(product), 'product')
	} 
    
	catch (error) {
		return new Response(JSON.stringify({errors: ['erro no servidor']}), {
			status: 500,
		})  
	}
}

export async function PUT(req: NextRequest){
	try {
		const body: ProductBodyInterface & {type: 'updateProduct' | 'decreaseProductQuantByOne' | 'increaseProductQuant'} = await req.json()
		if(!body) return new Response(JSON.stringify({errors: ['informações não recebidas']}), {
			status: 400,
		})
		if(!body.type) return new Response(JSON.stringify(['did not receive the type of the operation']), {
			status: 404,
		})
		const product = new Product(body)

		if(body.type === 'updateProduct') return await boilerPlateResponse(product, product.updateProduct.bind(product), 'product')
		else if(body.type === 'increaseProductQuant') return await boilerPlateResponse(product, product.increaseProductQuant.bind(product), 'product')
		else if(body.type === 'decreaseProductQuantByOne') return await boilerPlateResponse(product, product.decreaseProductQuantByOne.bind(product), 'product')
		else{
			return new Response(JSON.stringify(['did not receive the type of the operation']), {
				status: 404,
			})
		}
	} catch (error) {
		return new Response(JSON.stringify({errors: ['erro no servidor']}), {
			status: 500,
		})  
	}
}