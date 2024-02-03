import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { WritableDraft } from "immer/dist/internal";
import { getSession } from "next-auth/react";

export type wishListProductType = {
    product: {
        name: string,
        description: string,
        title: string,
        price: number,
        img?: string,
        quantity: number,
        id?: string,
    },
    id: string
}

type stateType = {
    loading: boolean,
    products: wishListProductType[],
    errors: string[]
}

const initialState: stateType = {
	loading: true,
	products: [],
	errors: []
}

export const getWishListItem = createAsyncThunk('wishList/getWishListItem', async (productId: string) => {
	try {
		const session = await getSession()
		const user = session?.user
		if(!user) throw {errors: ['did not receive a user']}


		const response = await axios.get('/api/controllers/wishList?wishListCredentials='+JSON.stringify({userId: user.id, productId, type: 'item'})).then(res => res).catch(res => {
			throw JSON.stringify({errors: [...res.response.data.errors]})
		})
		if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}

		return []
	} catch (error) {
		throw new Error(String(error))

	}
})


export const removeFromWishList = createAsyncThunk('wishList/removeFromWishList', async (wishListItemId: string) => {
	try {
		const session = await getSession()
		const user = session?.user
		if(!user) throw {errors: ['did not receive a user']}
		const response = await axios.delete('/api/controllers/wishList', {data: {userId: user.id, wishListItemId, type: 'product'}}).then(res => res).catch(res => {
			throw JSON.stringify({errors: [...res.response.data.errors]})
		})
		if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}


		return response.data.product
	} catch (error) {
		throw new Error(String(error))

	}
})

export const removeAllFromWishList = createAsyncThunk('wishList/removeAllFromWishList', async () => {
	try {
		const session = await getSession()
		const user = session?.user
		if(!user) throw {errors: ['did not receive a user']}
		const response = await axios.delete('/api/controllers/wishList', {data: {userId: user.id, type: 'deleteAll'}}).then(res => res).catch(res => {
			throw JSON.stringify({errors: [...res.response.data.errors]})
		})
		if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}


		return response.data.product
	} catch (error) {
		console.log(error)
		throw new Error(String(error))

	}
})


export const addToWishList = createAsyncThunk('wishList/AddToWishList', async (productId: string ) => {
	try {
		const session = await getSession()
		const user = session?.user
		if(!user) throw {errors: ['did not receive a user']}
		const response = await axios.post('/api/controllers/wishList', {productId, userId: user.id || ''}).then(res => res).catch(res => {
			throw JSON.stringify({errors: [...res.response.data.errors]})
		})
		if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}
		return response.data.product
	} catch (error) {
		throw new Error(String(error))

	}

}) 

export const getWishListItems = createAsyncThunk('wishList/getWishListItems', async () => {
	try {
		const session = await getSession()
		const user = session?.user
		console.log(session)

		if(!user) throw JSON.stringify({errors: ['No user logged']})
		else{
			const response = await axios.get('/api/controllers/wishList?wishListCredentials='+JSON.stringify({userId: user.id, type: 'items'})).then(res => res).catch(res => {
				throw JSON.stringify({errors: [...res.response.data.errors]})
			})
			if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}

			return response.data.wishList
		}  
	} catch (error) {
		throw new Error(String(error))
	}

})

const wishListSlicer = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(getWishListItem.pending, (state): void => pendingBoilerPlate(state))
		builder.addCase(getWishListItem.rejected, (state, action): void => rejectBoilerPlate(state, action))
		builder.addCase(getWishListItem.fulfilled, (state, action): void => {
			state.loading = false
			if(!action.payload) return state.errors.push('server did not return anything') && void 0 || void 0
			state.products = action.payload
		})

		builder.addCase(getWishListItems.pending, (state): void => pendingBoilerPlate(state))
		builder.addCase(getWishListItems.rejected, (state, action): void => rejectBoilerPlate(state, action))
		builder.addCase(getWishListItems.fulfilled, (state, action): void => {
			state.loading = false
			if(!action.payload) return state.errors.push('server did not return anything') && void 0 || void 0
			state.products = action.payload
		})

		builder.addCase(addToWishList.pending, (state): void => pendingBoilerPlate(state))
		builder.addCase(addToWishList.rejected, (state, action): void => rejectBoilerPlate(state, action))
		builder.addCase(addToWishList.fulfilled, (state, action): void => {
			state.loading = false
			if(!action.payload) return state.errors.push('server did not return anything') && void 0 || void 0

			state.products= [action.payload, ...state.products]
		})
        
		builder.addCase(removeFromWishList.pending, (state): void => pendingBoilerPlate(state))
		builder.addCase(removeFromWishList.rejected, (state, action): void => rejectBoilerPlate(state, action))
		builder.addCase(removeFromWishList.fulfilled, (state, action): void => {
			//I could have individual loading here, but I think it does not make as much sense as in the cart slicer, smt That I might consider later on.
			state.loading = false
			if(!action.payload?.product?.id) return state.errors.push('server did not return anything') && void 0 || void 0

			state.products = state.products.filter(product => product.product.id !== action.payload.product.id) 

		})
		builder.addCase(removeAllFromWishList.pending, (state): void => pendingBoilerPlate(state))
		builder.addCase(removeAllFromWishList.rejected, (state, action): void => rejectBoilerPlate(state, action))
		builder.addCase(removeAllFromWishList.fulfilled, (state, action): void => {
			//I could have individual loading here, but I think it does not make as much sense as in the cart slicer, smt That I might consider later on.
			state.loading = false

			if(!action.payload) return state.errors.push('server did not return anything') && void 0 || void 0
			state.products = []

		})}
})

//I was not able to find the type for the action property from builder object, so I "hard typed" it. Take a look on this later.
const rejectBoilerPlate = (state: WritableDraft<stateType>, action: {error: {message?: string}}): void => {
	const getErrors: string[] | null = ((): string[] | null => {
		try {
			return action.error?.message ? JSON.parse(action.error?.message || '')?.errors : null
		} catch (error) {
			return null
		}
	} )()

	state.loading = false
	!getErrors ? state.errors.push('Client rejected info'): getErrors.forEach(error => {
		state.errors.push(error)
	})
}

const pendingBoilerPlate = (state: WritableDraft<stateType>): void => {
	state.errors = []
	state.loading = true
}

export default wishListSlicer.reducer