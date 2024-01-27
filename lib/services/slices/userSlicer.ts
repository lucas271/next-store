import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SignInType, SignUpType } from "@/util/authValidation";
import { WritableDraft } from "immer/dist/internal";

type stateType = {
    loading: boolean,
    userInfo: { username: string;
        id: string;
        createdAt: string;
        email: string;
        role: string;
        avatarImg: string,
        name: string
    },
    userToken: {accessToken: string, refreshToken: string},
    errors: string[]
}

const initialState: stateType = {
    loading: false,
    userInfo: {username: '', id: '', createdAt: '', email: '', role: '', avatarImg: '', name: ''},
    userToken: {accessToken: '', refreshToken: ''},
    errors: [],
}

export const loginUser = createAsyncThunk('auth/login', async (data: SignInType) => {
    try {
        const response = await axios.get('/api/controllers/user?user='+`${JSON.stringify({...data})}`).then(res => res).catch(res => {
            throw JSON.stringify({errors: [...res.response.data]})
        })
        if(response.data.errors?.length > 0) throw JSON.stringify({errors: [...response.data.errors]})
        const user = response.data.user
        localStorage.setItem('user', JSON.stringify(user))
        return user
    } catch (error) {
        throw new Error(String(error))
    }
})

export const registerUser = createAsyncThunk('auth/register', async (data: SignUpType) => {
    try {
        const response = await axios.post('/api/controllers/user', {...data}).then(res => res).catch(res => {
            throw JSON.stringify({errors: [...res.response.data]})
        })
        if(response.data.errors?.length > 0) throw JSON.stringify({errors: [...response.data.errors]})
        const user = response.data.user
        localStorage.setItem('user', JSON.stringify(user))
        return user
    } catch (error) {
        throw new Error(String(error))
    }
})

export const getUser = createAsyncThunk('auth/getUser', async () => {
    try {
        const user = JSON.parse(String(localStorage.getItem('user')))
        if(!user) throw ['No user logged']
        else{
            const response = await axios.get('/api/controllers/user', {...user}).then(res => res).catch(res => {
                throw JSON.stringify({errors: [...res.response.data]})
            })
            if(response.data.errors?.length > 0) throw JSON.stringify({errors: [...response.data.errors]})
    
            localStorage.setItem('user', response.data)
            return response.data
        }
    } catch (error) {
        throw new Error(String(error))
    }

})

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state): void => pendingBoilerPlate(state))
        builder.addCase(loginUser.rejected, (state, action): void => rejectBoilerPlate(state, action))
        builder.addCase(loginUser.fulfilled, (state, action): void => {
            state.loading = false
            if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0
            state.userInfo = action.payload
        })


        builder.addCase(registerUser.pending, (state): void => pendingBoilerPlate(state))
        builder.addCase(registerUser.rejected, (state, action): void => rejectBoilerPlate(state, action))
        builder.addCase(registerUser.fulfilled, (state, action): void => {
            state.loading = false
            if(!action.payload) return state.errors.push('client did not return anything') && void 0 || void 0
            state.userInfo = action.payload
        })
    }
})

//I was not able to find the type for the action property from builder object, so I "hard typed" it. Take a look on this later.
const rejectBoilerPlate = (state: WritableDraft<stateType>, action: {error: {message?: string}}): void => {
    const getErrors: string[] = JSON.parse(action.error?.message || '')?.errors
    state.loading = false
    !getErrors ? state.errors.push('Client rejected info'): getErrors.forEach(error => {
        state.errors.push(error)
    })
}

const pendingBoilerPlate = (state: WritableDraft<stateType>): void => {
    state.errors = []
    state.userInfo = initialState.userInfo
    state.loading = true
}

export default authSlice.reducer