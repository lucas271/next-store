import { NextRequest } from 'next/server'
import User, { UserBodyInterface } from "../../models/UserModel";
import { signIn } from 'next-auth/react';
import { boilerPlateResponse } from '../util/boilerPlateResponse';

export async function GET(req: NextRequest){
	try {
		const query: UserBodyInterface = req.nextUrl.searchParams.get('user') && JSON.parse(String(req.nextUrl.searchParams.get('user')))
		if(!query) return new Response(JSON.stringify(['não foi possivel conectar']), {
			status: 400,
		})
		const user = new User(query)

		return await boilerPlateResponse(user, user.loginUser.bind(user), 'user')
	} 

	catch (error) {
		return new Response(JSON.stringify({errors: ['erro no servidor']}), {
			status: 500,
		})}
}

export async function POST(req: NextRequest){
	try {
		//this cant use the boilerplate function for now 
		const body: UserBodyInterface = await req.json()
		if(!body) return new Response(JSON.stringify({errors: ['não foi possivel conectar']}), {
			status: 400,
		})
    
		const user = new User(body)
		await user.createUser()
		if(user.errors.length > 0) return new Response(JSON.stringify({errors: user.errors}), {
			status: 404,
		})

		signIn('credentials', {
			redirect: false,
			email: user.response?.email,
			name: user.response?.name,
			password: body.password
		})

		return new Response(JSON.stringify({user: user.response}), {
			status: 200,
		})
	} 
    
	catch (error) {
		console.log(error)
		return new Response(JSON.stringify({errors: ['erro no servidor']}), {
			status: 500,
		})  }
}