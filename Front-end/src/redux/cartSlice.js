import { createSlice } from '@reduxjs/toolkit';
import produce from 'immer'
export default createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        add: (state, action) => {
            const existingItemIndex = state.findIndex(item => item.ProID === action.payload.ProID);
            if (existingItemIndex !== -1) {
                // Nếu sản phẩm đã tồn tại, cộng thêm quantity
                state[existingItemIndex].orderQuantity += action.payload.orderQuantity;
                if (state[existingItemIndex].orderQuantity <= 0) {
                    state.splice(existingItemIndex, 1);
                }
            } else {
                state.push(action.payload);
            }
        },
        remove: (state,action) => {
            state.splice(0,state.length);
        }
    }
    // switch (action.type) {
    //     case 'add':
    //         console.log(state);
    //         const existingItemIndex = state.findIndex(item => item.ProID === action.payload.ProID);
    //         if (existingItemIndex !== -1) {
    //             // Nếu sản phẩm đã tồn tại, cộng thêm quantity
    //             return state.map(item =>
    //                 item.ProID === action.payload.ProID
    //                     ? { ...item, Quantity: item.Quantity + action.payload.Quantity }
    //                     : item
    //             )
    //         } else {
    //             return [
    //                 ...state,
    //                 action.payload,
    //             ]
    //         }
    //     default:
    //         return state;
    // }
})