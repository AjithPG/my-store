import { redirect,useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import { OrdersList, PaginationContainer, SectionTitle} from "../components";

export const loader = (store: any) => async ({ request }: { request: Request }) => {
  const user = store.getState().userState.user;
  if(!user){
    toast.warn("You must be logged in to view orders")
    return redirect('/login')
  }
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])
   try {
        const response = await customFetch.get("/orders",{
          params,
            headers:{
              Authorization: `Bearer ${user.token}`,
            }
        }
        );
        return { orders: response.data.data, meta: response.data.meta };
      } catch (error) {
        console.error(error);
        const errorMessage =
          error?.response?.data?.error?.message || "There was an error accessing your order";
        toast.error(errorMessage);
        if(error?.response?.status === 401 || 403) return redirect("/login");
        return null;
      }
}

const Orders = () => {
  const {meta} = useLoaderData();
  if(meta.pagination.total <1){
    return <SectionTitle text="Please make an order"/>
  }
  return (
    <>
    <SectionTitle text="Orders"/>
    <OrdersList/>
    <PaginationContainer/>
    </>
  )
}

export default Orders