import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { WritableDraft } from "immer/dist/internal";
import { useAppDispatch } from "../reduxStore/storeHooks";

type product = {
    product: {
        name: string,
        description: string,
        title: string,
        price: string,
        img: string,
        quantity: number,
        is_available: boolean,
        id: string,
        loading?: boolean
    },
    quantity: number
}

type stateType = {
    loading: boolean,
    id: string | null | undefined,
    status: string | null | undefined,
    products: product[],
    errors: string[]
}

const initialState: stateType = {
    loading: true,
    id: null,
    status: null,
    products: [],
    errors: []
}

const addLoadingToProduct = createAction<string>('addLoading')

export const deleteCart = createAsyncThunk('cart/deleteCart', async (productId: string) => {
    try {
        const user = JSON.parse(String(localStorage.getItem('user')))        

        if(!user) throw {errors: ['did not receive a user']}


        const response = await axios.delete('/api/controllers/cart', {data: {type: 'deleteCart', userId: user.id, productId}}).then(res => res).catch(res => {
            throw JSON.stringify({errors: [...res.response.data]})
        })
        if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}

        return response.data.cart
    } catch (error) {
        throw new Error(String(error))

    }
})


export const removeProduct = createAsyncThunk('cart/removeProduct', async (productId: string, {dispatch}) => {
    try {
        dispatch(addLoadingToProduct(productId))

        const user = JSON.parse(String(localStorage.getItem('user')))
        if(!user) throw {errors: ['did not receive a user']}
        const response = await axios.delete('/api/controllers/cart', {data: {type: 'deleteProductFromCart', userId: user.id, productId}}).then(res => res).catch(res => {
            console.log(res)
            throw JSON.stringify({errors: [...res.response.data]})
        })
        if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}


        return response.data.cart
    } catch (error) {
        console.log(error)
        throw new Error(String(error))

    }
})

export const removeSingleProduct = createAsyncThunk('cart/removeSingleProduct', async (productId: string, {dispatch}) => {
    try {
        dispatch(addLoadingToProduct(productId))

        const user = JSON.parse(String(localStorage.getItem('user')))
        if(!user) throw {errors: ['did not receive a user']}
        const response = await axios.put('/api/controllers/cart', {type: 'deleteSingleProductFromcart', userId: user.id, productId}).then(res => res).catch(res => {
            throw JSON.stringify({errors: [...res.response.data]})
        })
        if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}

        return response.data.cart
    } catch (error) {
        console.log(error)
        throw new Error(String(error))

    }
})

export const addProduct = createAsyncThunk('cart/AddProduct', async (productId: string, {dispatch}) => {
    try {
        dispatch(addLoadingToProduct(productId))
        const user = JSON.parse(String(localStorage.getItem('user')))
        if(!user) throw {errors: ['did not receive a user']}
        const response = await axios.put('/api/controllers/cart', {type: 'addProduct', userId: user.id, productId}).then(res => res).catch(res => {
            throw JSON.stringify({errors: [...res.response.data]})
        })
        if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}

        return response.data.cart
    } catch (error) {
        throw new Error(String(error))

    }

}) 

export const getCart = createAsyncThunk('cart/getCart', async () => {
    try {
        console.log('a')
        const user = JSON.parse(String(localStorage.getItem('user')))
        if(!user) throw JSON.stringify({errors: ['No user logged']})
        else{
            const response = await axios.get('/api/controllers/cart?cartCredentials='+JSON.stringify({userId: user.id})).then(res => res).catch(res => {
                throw JSON.stringify({errors: [...res.response.data]})
            })
            if(response.data.errors?.length > 0) throw {errors: [...response.data.errors]}
            
            return response.data.cart
        }  
    } catch (error) {
        throw new Error(String(error))
    }

})

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addLoadingToProduct, (state, action) => {
            state.products = state.products.map(product => product.product.id !== action.payload ? product : {product: {...product.product, loading: true}, quantity: product.quantity})
        })
        builder.addCase(getCart.pending, (state): void => pendingBoilerPlate(state))
        builder.addCase(getCart.rejected, (state, action): void => rejectBoilerPlate(state, action))
        builder.addCase(getCart.fulfilled, (state, action): void => {
            state.loading = false
            if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0

            state.products = action.payload
        })

        builder.addCase(deleteCart.pending, (state): void => pendingBoilerPlate(state))
        builder.addCase(deleteCart.rejected, (state, action): void => rejectBoilerPlate(state, action))
        builder.addCase(deleteCart.fulfilled, (state, action): void => {
            state.loading = false
            if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0

            state.products = []
        })

        builder.addCase(removeSingleProduct.pending, (state): void => pendingBoilerPlate(state))
        builder.addCase(removeSingleProduct.rejected, (state, action): void => rejectBoilerPlate(state, action))
        builder.addCase(removeSingleProduct.fulfilled, (state, action): void => {
            state.loading = false
            if(!action.payload?.product?.id) {
                //set all products loading state to false since if you did not receive payload response you can not find the individual item
                state.products = state.products.map(product => {return {product: {...product.product, loading: false}, quantity: product.quantity}})

                return state.errors.push('client did not return anything') && void 0 || void 0
            }
            //no need to set product loading to false since the item itself gonna be deleted
            if(action.payload.quantity < 1) return (state.products = state.products.filter(product => product.product.id !== action.payload.product.id)) && void 0 || void 0
            const productsResponse = state.products.map(product => product.product.id === action.payload.product.id ? {product: {...product.product, loading: false}, quantity: product.quantity} : product)
            const indexOfElementToBeReplaced = productsResponse.map(product => product.product.id).indexOf(action.payload.product.id)
            productsResponse[indexOfElementToBeReplaced >= 0 ? indexOfElementToBeReplaced : productsResponse.length] = action.payload
            state.products = productsResponse
        })
        
        builder.addCase(removeProduct.pending, (state): void => pendingBoilerPlate(state))
        builder.addCase(removeProduct.rejected, (state, action): void => rejectBoilerPlate(state, action))
        builder.addCase(removeProduct.fulfilled, (state, action): void => {
            state.loading = false
            if(!action.payload?.product?.id) {
                //set all products loading state to false since if you did not receive payload response you can not find the individual item
                state.products = state.products.map(product => {return {product: {...product.product, loading: false}, quantity: product.quantity}})

                return state.errors.push('client did not return anything') && void 0 || void 0
            }
            //no need to set product loading to false since the item itself gonna be deleted
            console.log(state.products.filter(product => product.product.id !== action.payload.product.id || product.quantity > 0) )
            state.products = state.products.filter(product => product.product.id !== action.payload.product.id || product.quantity > 0) 
        })


        builder.addCase(addProduct.pending, (state): void => pendingBoilerPlate(state))
        builder.addCase(addProduct.rejected, (state, action): void => rejectBoilerPlate(state, action))
        builder.addCase(addProduct.fulfilled, (state, action): void => {
            state.loading = false

            if(!action.payload?.product?.id) {
                //set all products loading state to false since if you did not receive payload response you can not find the individual item
                state.products = state.products.map(product => {return {product: {...product.product, loading: false}, quantity: product.quantity}})

                return state.errors.push('client did not return anything') && void 0 || void 0
            }

            const productsResponse = state.products.map(product => product.product.id === action.payload.product.id ? {product: {...product.product, loading: false}, quantity: product.quantity} : product)
            const indexOfElementToBeReplaced = productsResponse.map(product => product.product.id).indexOf(action.payload.product.id)
            productsResponse[indexOfElementToBeReplaced >= 0 ? indexOfElementToBeReplaced : productsResponse.length] = action.payload
            state.products = productsResponse
        })
    }
})

//I was not able to find the type for the action property from builder object, so I "hard typed" it. Take a look on this later.
const rejectBoilerPlate = (state: WritableDraft<stateType>, action: {error: {message?: string}}): void => {
    const getErrors: string[] | null = ((): string[] | null => {
        try {
            //set all products loading state to false since if you did not receive payload response you can not find the individual item
            state.products = state.products.map(product => {return {product: {...product.product, loading: false}, quantity: product.quantity}})

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

export default cartSlice.reducer