import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import userSlicer from "../slices/userSlicer";
import cartSlice from "../slices/cartSlicer"
import productSlice from "../slices/productSlice";
import wishListSlicer from "../slices/wishListSlicer";
import reviewSlicer from "../slices/reviewSlicer";
import ratingSlicer from "../slices/ratingSlicer";

export const makeStore = () => {
    return configureStore({
      reducer: {
        user: userSlicer,
        cart: cartSlice,
        product: productSlice,
        wishList: wishListSlicer,
        review: reviewSlicer,
        rating: ratingSlicer
      }
    })
  }
  
  export type AppStore = ReturnType<typeof makeStore>
  export type RootState = ReturnType<AppStore['getState']>
  export type AppDispatch = AppStore['dispatch']
  export type ThunkDispatch<S, E, A extends Action> = ThunkAction<void, S, E, A>;
  export type AppThunkDispatch = ThunkDispatch<RootState, null,  any>;


  export const wrapper = createWrapper<AppStore>(makeStore)

  