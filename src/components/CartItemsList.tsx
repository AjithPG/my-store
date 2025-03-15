import { useSelector } from "react-redux"
import CartItem from "./CartItem"

const CartItemList = () => {
  const cartItems = useSelector((state:any)=>state.cartState.cartItems)
  console.log('xyz',cartItems)
  return (
    <>
      {
        cartItems.map((item:any)=>{
          return <CartItem key={item.cartID} cartItem={item}/>
        })
      }
    </>
  )
}

export default CartItemList