import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { loader as landingLoader } from './pages/Landing';
import {loader as singleProductLoader } from './pages/SingleProduct';
import {loader as ProductsLoader} from './pages/Products';
import {action as RegisterAction} from './pages/Register';
import {action as  loginAction} from './pages/Login';
import "./App.css";
import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "./pages";
import { ErrorElement } from "./components";
import { store } from "./store";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
          loader:landingLoader,
          errorElement:<ErrorElement/>
        },
        {
          path:'products',
          element:<Products/>,
          loader:ProductsLoader
        },
        {
          path:'products/:id',
          element:<SingleProduct/>,
          loader:singleProductLoader
        },
        {
          path:'cart',
          element:<Cart/>
        },
        {
          path:'about',
          element:<About/>
        },
        {
          path:'checkout',
          element:<Checkout/>
        },
        {
          path:'orders',
          element:<Orders/>
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
      action:loginAction(store)
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <Error />,
      action:RegisterAction
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
