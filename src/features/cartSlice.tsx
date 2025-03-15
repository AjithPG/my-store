import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

interface cartItem {
   cartID:string;
   productID:string;
   image:string;
   title:string;
   price:number;
   amount:number;
   productColor:string;
   company:string;
}

interface cartState {
    cartItems:cartItem[],
    numItemsInCart:number,
    cartTotal:number,
    shipping:number,
    tax:number,
    orderTotal:number
}

const defaultState:cartState = {
    cartItems:[],
    numItemsInCart:0,
    cartTotal:0,
    shipping:500,
    tax:0,
    orderTotal:0 
}

const getCartFromLocalStorage = ():cartState=>{
    return JSON.parse(localStorage?.getItem('cart')|| 'null') || defaultState
}

const cartSlice = createSlice({
    name:'cart',
    initialState:getCartFromLocalStorage,
    reducers:{
        addItem: (state, action) => {
            const { product } = action.payload;
            // Check if product already exists in the cart
            const item = state.cartItems.find((i:any) => i.cartID === product.cartID);
            if (item) {
              item.amount += product.amount;
            } else {
              state.cartItems.push(product)
            }
            state.numItemsInCart += product.amount;
            state.cartTotal += product.price * product.amount;
            cartSlice.caseReducers.calculateTotal(state)
            toast.success('Item added to cart');
        },      
        clearCart:()=>{
            localStorage.setItem('cart',JSON.stringify(defaultState))
            return defaultState;
        },
        removeItem:(state,action)=>{
            const {cartID} = action.payload;
            const product:cartItem | undefined = state.cartItems.find((i)=>i.cartID == cartID)
            state.cartItems = state.cartItems.filter((i)=>i.cartID != cartID)
            if(product){
                state.numItemsInCart -= product?.amount;
                state.cartTotal -= product?.price * product?.amount;
            }
            cartSlice.caseReducers.calculateTotal(state)
            toast.error('Item removed from cart');
        },
        editItem:(state,action)=>{
            const {cartID,amount} = action.payload;
            const item = state.cartItems.find((i:any) => i.cartID === cartID);
            if(item){
                state.numItemsInCart += amount - item?.amount
                state.cartTotal += item.price * (amount - item?.amount)
                item.amount = amount
            }
            cartSlice.caseReducers.calculateTotal(state)
            toast.error('Cart Updated');
            
        },
        calculateTotal:(state)=>{
            state.tax = 0.1 * state.cartTotal;
            state.orderTotal = state.cartTotal + state.shipping + state.tax;
            localStorage.setItem('cart', JSON.stringify(state));
        }
    },
})

export const {addItem,clearCart,removeItem,editItem} = cartSlice.actions;

export default  cartSlice.reducer;

