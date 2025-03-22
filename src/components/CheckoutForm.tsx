import { Form, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { toast } from "react-toastify";
import { customFetch, formatPrice } from "../utils";
import { clearCart } from "../features/cartSlice";

export const action =
  (store: any) =>
  async ({ request }: any) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    }
    
    try {
      const response = await customFetch.post("/orders", {data:info},
        {
          headers:{
            Authorization: `Bearer ${user.token}`,
          }
        }
      );
      store.dispatch(clearCart());
      toast.success("Order Placed successfully");
      return redirect("/orders");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error?.response?.data?.error?.message || "There was an error placing your order";
      toast.error(errorMessage);
      if(error?.response?.status === 401 || 403) return redirect("/login");
      return null;
    }
  };

const CheckoutForm = () => {
  return (

      <Form method="post" className="flex flex-col gap-y-4 w-full">
        <h4 className="font-medium text-xl">Shipping Information</h4>
        <FormInput name="name" label="Name" type="text" size="w-full" />
        <FormInput name="address" label="Address" type="text" size="w-full"/>
        <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
        </div>
      </Form>
  );
};

export default CheckoutForm;
