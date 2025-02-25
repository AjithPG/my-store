import { Outlet } from "react-router-dom";
import { Header,Navbar } from "../components";


const HomeLayout = () => {
  return (
    <>
      <Header/>
      <Navbar/>
      <section className="w-full mx-auto max-w-6xl px-8 py-8">
        <Outlet />
      </section>
    </>
  );
};

export default HomeLayout;
