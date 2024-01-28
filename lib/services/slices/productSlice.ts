import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { WritableDraft } from "immer/dist/internal";
import { getSession, useSession } from "next-auth/react";

export type productSliceType = {

    name: string,
    description: string,
    title: string,
    price: number,
    img?: string,
    quantity: number,
    id?: string,

}

type stateType = {
    loading: boolean,
    products: productSliceType[],
    errors: string[], 
    product: productSliceType | null | undefined
}

const initialState: stateType = {
    loading: true,
    products: [],
    errors: [],
    product: null,
}

export const updateProduct = createAsyncThunk('product/updateProduct', async (productId: string) => {
    try {
        const session = await getSession()
        const user = session?.user

        if(!user) throw {errors: ['did not receive a user']}


        const response = await axios.delete('/api/controllers/cart', {data: {type: 'deleteCart', userId: user.id, productId}}).then(res => res).catch(res => {
            throw JSON.stringify({errors: [...res.response.data]})
        })
        if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}

        return response.data.product

    } catch (error) {
        throw new Error(String(error))

    }
})


export const removeProduct = createAsyncThunk('product/removeProduct', async (productId: string) => {
    try {
        const session = await getSession()
        const user = session?.user
        if(!user) throw {errors: ['did not receive a user']}
        const response = await axios.delete('/api/controllers/cart', {data: {type: 'deleteProductFromCart', userId: user.id, productId}}).then(res => res).catch(res => {
            console.log(res)
            throw JSON.stringify({errors: [...res.response.data]})
        })
        if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}


        return response.data.product
    } catch (error) {
        console.log(error)
        throw new Error(String(error))

    }
})


export const addProduct = createAsyncThunk('product/AddProduct', async (product: productSliceType) => {
    try {


        const session = await getSession()
        const user = session?.user
        if(!user) throw {errors: ['did not receive a user']}
        const response = await axios.post('/api/controllers/product', {...product}).then(res => res).catch(res => {
            throw JSON.stringify({errors: [...res.response.data]})
        })


        if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}

        return response.data.product
    } catch (error) {
        throw new Error(String(error))

    }

}) 

export const getProducts = createAsyncThunk('product/getProducts', async ({limit, sortBy}: {limit?: number, sortBy?: {mostFavourites?: true}}) => {
    try {


        

        const response = await axios.get('/api/controllers/product?productCredencials='+JSON.stringify({type: 'products', limit, sortBy})).then(res => res).catch(res => {
            throw JSON.stringify({errors: [...res.response.data]})
        })
        if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}

        return response.data.product
    } catch (error) {
        throw new Error(String(error))
    }

})

export const getProduct = createAsyncThunk('product/getProduct', async (itemId: string) => {
    try {
        const response = await axios.get('/api/controllers/product?productCredencials='+JSON.stringify({productId: itemId, type: 'product'})).then(res => res).catch(res => {
            throw JSON.stringify({errors: [...res.response.data]})
        }) 
        if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}

        return response.data.product
    } catch (error) {
        throw new Error(String(error))
    }

})

const productSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state): void => pendingBoilerPlate(state))
        builder.addCase(getProduct.rejected, (state, action): void => rejectBoilerPlate(state, action))
        builder.addCase(getProduct.fulfilled, (state, action): void => {
            state.loading = false
            if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0
            state.product = action.payload

        })

        builder.addCase(getProducts.pending, (state): void => pendingBoilerPlate(state))
        builder.addCase(getProducts.rejected, (state, action): void => rejectBoilerPlate(state, action))
        builder.addCase(getProducts.fulfilled, (state, action): void => {
            state.loading = false
            if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0
            state.products = action.payload

        })

        builder.addCase(addProduct.pending, (state): void => pendingBoilerPlate(state))
        builder.addCase(addProduct.rejected, (state, action): void => rejectBoilerPlate(state, action))
        builder.addCase(addProduct.fulfilled, (state, action): void => {
            state.loading = false
            if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0
            state.products = [action.payload, ...state.products]


        })

        builder.addCase(updateProduct.pending, (state): void => pendingBoilerPlate(state))
        builder.addCase(updateProduct.rejected, (state, action): void => rejectBoilerPlate(state, action))
        builder.addCase(updateProduct.fulfilled, (state, action): void => {
            state.loading = false
            if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0

            const productIndex = state.products.map(product => product.id).indexOf(action.payload.product.id)
            state.products[productIndex >= 0 ? productIndex : state.products.length] = action.payload


        })
        
        builder.addCase(removeProduct.pending, (state): void => pendingBoilerPlate(state))
        builder.addCase(removeProduct.rejected, (state, action): void => rejectBoilerPlate(state, action))
        builder.addCase(removeProduct.fulfilled, (state, action): void => {
            state.loading = false
            if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0
            state.products = state.products.filter(product => product.id !== action.payload.product.id) 

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

export default productSlice.reducer