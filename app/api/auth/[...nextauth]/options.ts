import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '../../_models/UserModel'

export const options: NextAuthOptions = {
	pages: {
		signIn: '/signIn',

	},
	session: {
		strategy: 'jwt'
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				name: {},
				password: {},
				email: {},
			},
			async authorize(credentials) {
				if(!credentials?.email || !credentials.password) throw new Error(JSON.stringify({errors: ['erro no servidor']}))
				const user = new User(credentials)
				await user.handleProviderCredentials().catch(() => {throw new Error(JSON.stringify({errors: ['erro no servidor']}))})
				if(user.errors.length > 0) throw new Error(JSON.stringify({errors: [...user.errors]}))
				if(user.response) return user.response
				else{
					throw new Error(JSON.stringify({errors: ['Erro no servidor']}))
				}

			}
		})
	],
	callbacks: {
		async signIn({user, account}){
			if(account?.provider === 'credentials'){
				if(!user.email || !user.id  || !user.name) return false 
				return true
			}
			if(account?.provider === 'google') {
				if(!user.email || !user.name) return false
				//@ts-ignore
				//remember to pass bcrypt in the user.id later on.  
				const userDB = new User({id: user.id, email: user.email, name: user.name, password:'', profilePic: user.image || user.picture || '' })
                
				//add the user to the database
				await userDB.handleProviderUser()
				//since I'm using credentials Provider together with other providers, I need to make sure that a google provider
				//with the same email as a credentials provider is not able to acess the credentials provider info.
				//so we'll check if the provider's id matches with the user.id(a.k.a. response.id) from the database.
				if(userDB.errors.length > 0 || userDB.response.id !== user.id) return false

				//it might be worth asking the user if he wants to associate accounts if the id's are different (you can request the password for that)
				return true
			}
			return true
		},
		async redirect({ baseUrl }){
			return  baseUrl 
		},
		async jwt({token, user, account}){
			const customUser = user as unknown as any
			if(user){
				return {
					...token,
					...customUser
				}
			}
			return token
		},
		async session({session, token}){
			return {
				...session,
				user: {
					...token
				}
			}
		}

	},
	secret: process.env.NEXTAUTH_SECRET
}