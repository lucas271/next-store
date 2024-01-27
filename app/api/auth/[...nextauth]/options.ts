import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '../../models/UserModel'
import { Provider } from 'react-redux'



export const options: NextAuthOptions = {
    pages: {
        signIn: '/signIn',
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
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
                try {
                    if(!credentials?.email || !credentials.password) return 
                    const user = new User(credentials)
                    await user.loginUser()
                    if(user.errors.length > 0) return null
                    console.log(user.response)
                    if(user.response) return user.response
                    else{
                        return null
                    }

                } catch (error) {
                    console.log(error)
                }
                return null
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
        async jwt({token, user}){
            return {...token, ...user}
        },
        async session({session, token}){
            session.user = token as any
            return session
        }

    },
    secret: process.env.NEXTAUTH_SECRET
}