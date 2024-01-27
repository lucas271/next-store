import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { error } from "console";
import { WritableDraft } from "immer/dist/internal";
import { addRating } from "./ratingSlicer";

type review = {
    title: string,
    message: string,
    userId?: string,
    productId?: string,
    id?: string,
}

type stateType = {
    loading: boolean,
    reviews: review[],
    errors: string[], 
}

const initialState: stateType = {
    loading: true,
    reviews: [],
    errors: [],
}

export const updateReview = createAsyncThunk('review/updateReview', async ({reviewId, title, text}: {reviewId: string, title: string, text:string}) => {
    try {
        const user = JSON.parse(String(localStorage.getItem('user')))

        if(!user) throw {errors: ['did not receive a user']}


        const response = await axios.put('/api/controllers/review', {data: { userId: user.id, reviewId, title, text}}).then(res => res).catch(res => {
            throw JSON.stringify({errors: [...res.response.data]})
        })
        if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}

        return response.data.review
    } catch (error) {
        throw new Error(String(error))

    }
})


export const removeReview = createAsyncThunk('review/removeReview', async (productId: string) => {
    try {
        const user = JSON.parse(String(localStorage.getItem('user')))
        if(!user) throw {errors: ['did not receive a user']}
        const response = await axios.delete('/api/controllers/review', {data: {userId: user.id, productId}}).then(res => res).catch(res => {
            throw JSON.stringify({errors: [...res.response.data]})
        })
        if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}


        return response.data.review
    } catch (error) {
        console.log(error)
        throw new Error(String(error))

    }
})


export const addReview = createAsyncThunk('review/addReview', async (review: review & {rating: number}, {dispatch}) => {
    try {
        if(!Number(review.rating)) throw JSON.stringify({errors: ['Avaliação Invalida, problema no rating']})
        if(!review.productId) throw JSON.stringify({errors: ['Avaliação Invalida, problema no productId']})
        dispatch(addRating({ratingValue: review.rating, productId: review.productId}))

        const user = JSON.parse(String(localStorage.getItem('user')))
        if(!user.id) throw {errors: ['did not receive a userId']}
        const response = await axios.post('/api/controllers/review', {...review, userId: user.id}).then(res => res).catch(res => {
            console.log(res.response)
            throw JSON.stringify({errors: [...res.response.data]})
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
            throw JSON.stringify({errors: [...res.response.data]})
        })
        if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}
        localStorage.setItem('cart', JSON.stringify(response.data.product))
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
            if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0
            state.reviews= [action.payload, ...state.reviews]

        })

        builder.addCase(updateReview.pending, (state): void => pendingBoilerPlate(state))
        builder.addCase(updateReview.rejected, (state, action): void => rejectBoilerPlate(state, action))
        builder.addCase(updateReview.fulfilled, (state, action): void => {
            state.loading = false
            if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0

            const reviewIndex = state.reviews.map(review => review.id).indexOf(action.payload.review.id)
            state.reviews[reviewIndex >= 0 ? reviewIndex : state.reviews.length] = action.payload

        })
        
        builder.addCase(removeReview.pending, (state): void => pendingBoilerPlate(state))
        builder.addCase(removeReview.rejected, (state, action): void => rejectBoilerPlate(state, action))
        builder.addCase(removeReview.fulfilled, (state, action): void => {
            state.loading = false
            if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0
            state.reviews = action.payload
            state.reviews = state.reviews.filter(review => review.id !== action.payload.review.id) 

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

export default reviewSlice.reducer