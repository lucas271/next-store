import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { WritableDraft } from "immer/dist/internal";
import { addRating, updateRating } from "./ratingSlicer";
import { getSession } from "next-auth/react";
import { error } from "console";

type review = {
    title: string,
    message: string,
    userId?: string,
    productId?: string,
    id?: string,
    userName?: string,
    Rating? : {rate: number}
}

type stateType = {
    loading: boolean,
    reviews: review[],
    errors: string[], 
}

const initialState: stateType = {
	loading: false,
	reviews: [],
	errors: [],
}

const addLoadingToProduct = createAction('addLoading')


export const updateReview = createAsyncThunk('review/updateReview', async ({commentId, title, message, rating}: {commentId: string, title: string, message:string, rating: number | undefined}, {dispatch, getState}) => {
	try {
		const session = await getSession()
		const user = session?.user

		if(!user) throw {errors: ['did not receive a user']}

		const response = await axios.put('/api/controllers/review', { userId: user.id, commentId, title, message, rate: rating}).then(res => res).catch(res => {
			throw JSON.stringify({errors: [...res.response.data.errors]})
		})
		if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}
		//further logic needs to have deeper thought

		//Make sure that the rating value for review will update Other ways to do that but I think they are unnecessary more complex
		return response.data.review
	} catch (error) {
		throw new Error(String(error))

	}
})


export const removeReview = createAsyncThunk('review/removeReview', async (commentId: string) => {
	try {
        
		const session = await getSession()
		const user = session?.user
		if(!user) throw {errors: ['did not receive a user']}
		const response = await axios.delete('/api/controllers/review', {data: {userId: user.id, commentId}}).then(res => res).catch(res => {
			throw JSON.stringify({errors: [...res.response.data.errors]})
		})
		if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}


		return response.data.review
	} catch (error) {
		throw new Error(String(error))

	}
})


export const addReview = createAsyncThunk('review/addReview', async (review: review & {rating: number}, {dispatch}) => {
	try {
		if(!review.productId) throw JSON.stringify({errors: ['Avaliação Invalida, Um id para o produto nao foi fornecido.']})

		const session = await getSession()
		const user = session?.user
		if(!user?.id) throw {errors: ['Usuário não recebido']}
		const response = await axios.post('/api/controllers/review', {...review, rate: review.rating,userId: user.id, userName: user.name}).then(res => res).catch(res => {
			throw JSON.stringify({errors: [...res.response.data.errors]})
		})
        
		if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}
		return response.data.review
	} catch (error) {
		throw new Error(String(error))

	}

}) 

export const getReviews = createAsyncThunk('reviews/getReviews', async (productId: string) => {
	try {
		const response = await axios.get('/api/controllers/review?reviewCredentials='+JSON.stringify({productId: productId})).then(res => res).catch(res => {
			throw JSON.stringify({errors: [...res.response.data.errors]})
		})
		if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}
		return response.data.review
	} catch (error) {
		throw new Error(String(error))
	}

})



const reviewSlice = createSlice({
	name: 'review',
	initialState: initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(addLoadingToProduct, (state) => {
			state.loading = true
		})
		builder.addCase(getReviews.pending, (state): void => pendingBoilerPlate(state))
		builder.addCase(getReviews.rejected, (state, action): void => rejectBoilerPlate(state, action))
		builder.addCase(getReviews.fulfilled, (state, action): void => {
			state.loading = false

			if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0
			state.reviews = action.payload

		})

		builder.addCase(addReview.pending, (state): void => pendingBoilerPlate(state))
		builder.addCase(addReview.rejected, (state, action): void => rejectBoilerPlate(state, action))
		builder.addCase(addReview.fulfilled, (state, action): void => {
			state.loading = false
			console.log(action.payload)       

			if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0
			state.reviews= [action.payload, ...state.reviews]

		})

		builder.addCase(updateReview.pending, (state): void => pendingBoilerPlate(state))
		builder.addCase(updateReview.rejected, (state, action): void => rejectBoilerPlate(state, action))
		builder.addCase(updateReview.fulfilled, (state, action): void => {
			state.loading = false

			if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0

			const reviewIndex = state.reviews.map(review => review.id).indexOf(action.payload.id)
			state.reviews[reviewIndex >= 0 ? reviewIndex : state.reviews.length] = action.payload

		})
        
		builder.addCase(removeReview.pending, (state): void => pendingBoilerPlate(state))
		builder.addCase(removeReview.rejected, (state, action): void => rejectBoilerPlate(state, action))
		builder.addCase(removeReview.fulfilled, (state, action): void => {

			state.loading = false

			if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0   
			console.log(action.payload)       
			state.reviews = state.reviews.filter(review => review.id !== action.payload.id) 

		})
	}
})

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

export default reviewSlice.reducer