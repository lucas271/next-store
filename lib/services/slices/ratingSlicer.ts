import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { WritableDraft } from "immer/dist/internal";
import { getSession } from "next-auth/react";

type rating = {
    id: string,
    rate: number,
    productId: string,
    userId: string,
}

type stateType = {
    loading: boolean,
    UserGivenRatings: rating[],
    errors: string[], 
    productRating: rating | null
}

const initialState: stateType = {
	loading: true,
	UserGivenRatings: [],
	errors: [],
	productRating: null
}

export const updateRating = createAsyncThunk('review/updateRating', async ({ratingValue, productId, ratingId}: {ratingValue: number, productId: string, ratingId: string}) => {
	try {
		const session = await getSession()
		const user = session?.user
		if(!user) throw {errors: ['did not receive a user']}


		const response = await axios.put('/api/controllers/rating', {ratingValue, productId, userId: user.id ,ratingId}).then(res => res).catch(res => {
			throw JSON.stringify({errors: [...res.response.data.errors]})
		})

		if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}

		return response.data.rating
        
	} catch (error) {
		throw new Error(String(error))

	}
})


export const removeRating = createAsyncThunk('review/removeRating', async ({productId, ratingId} : {productId: string, ratingId: string}) => {
	try {
		const session = await getSession()
		const user = session?.user
		if(!user) throw {errors: ['did not receive a user']}
		
		const response = await axios.delete('/api/controllers/rating', {data: {userId: user.id, productId, ratingId}}).then(res => res).catch(res => {
			console.log(res.response.data.errors)
			throw JSON.stringify({errors: [...res.response.data.errors]})
		})
		if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}


		return response.data.review
	} catch (error) {
		console.log(error)
		throw new Error(String(error))

	}
})


export const addRating = createAsyncThunk('review/addRating', async ({ratingValue, productId, reviewId}: {ratingValue: number, productId: string, reviewId: string}) => {
	try {
		if(!ratingValue || !productId || !reviewId) throw {erros: ['didnt receive rating value or product id']}
		const session = await getSession()

		const user = session?.user
		if(!user?.id) throw {errors: ['did not receive a userId']}

		const response = await axios.post('/api/controllers/rating', {ratingValue: ratingValue, productId, userId: user.id, reviewId}).then(res => res).catch(res => {
			throw JSON.stringify({errors: [...res.response.data.errors]})
		})
		if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}
		return response.data.rating
	} catch (error) {
		throw new Error(String(error))

	}

}) 

export const getProductRatings = createAsyncThunk('reviews/getProductRatings', async (productId: string) => {
	try {
		const response = await axios.get('/api/controllers/rating?productId='+productId).then(res => res).catch(res => {
			throw JSON.stringify({errors: [...res.response.data.errors]})
		})
		if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}
		return response.data.rating
	} catch (error) {
		throw new Error(String(error))
	}

})



const ratingSlice = createSlice({
	name: 'rating',
	initialState: initialState,
	reducers: {

	},
	extraReducers: (builder) => {

		builder.addCase(getProductRatings.pending, (state): void => pendingBoilerPlate(state))
		builder.addCase(getProductRatings.rejected, (state, action): void => rejectBoilerPlate(state, action))
		builder.addCase(getProductRatings.fulfilled, (state, action): void => {
			state.loading = false
			if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0
			state.UserGivenRatings = action.payload

		})

		builder.addCase(addRating.pending, (state): void => pendingBoilerPlate(state))
		builder.addCase(addRating.rejected, (state, action): void => rejectBoilerPlate(state, action))
		builder.addCase(addRating.fulfilled, (state, action): void => {
			state.loading = false
			if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0
			state.UserGivenRatings = [action.payload, ...state.UserGivenRatings]

		})

		builder.addCase(updateRating.pending, (state): void => pendingBoilerPlate(state))
		builder.addCase(updateRating.rejected, (state, action): void => rejectBoilerPlate(state, action))
		builder.addCase(updateRating.fulfilled, (state, action): void => {
			state.loading = false
			if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0

			const reviewIndex = state.UserGivenRatings.map(rating => rating.id).indexOf(action.payload.id)
			state.UserGivenRatings[reviewIndex >= 0 ? reviewIndex : state.UserGivenRatings.length] = action.payload

		})
        
		builder.addCase(removeRating.pending, (state): void => pendingBoilerPlate(state))
		builder.addCase(removeRating.rejected, (state, action): void => rejectBoilerPlate(state, action))
		builder.addCase(removeRating.fulfilled, (state, action): void => {
			state.loading = false
			console.log(state.UserGivenRatings)
			console.log(action.payload)
			if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0
			state.UserGivenRatings = state.UserGivenRatings.filter(review => review.id !== action.payload.id) 

		})
	}
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

export default ratingSlice.reducer