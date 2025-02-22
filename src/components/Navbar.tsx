import { useState } from "react";
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Links = [
  {
    id: 1,
    url: "/",
    text: "Home",
  },
  {
    id: 2,
    url: "about",
    text: "About",
  },
  {
    id: 3,
    url: "products",
    text: "Products",
  },
  {
    id: 4,
    url: "cart",
    text: "Cart",
  },
  {
    id: 5,
    url: "checkout",
    text: "Checkout",
  },
  {
    id: 6,
    url: "orders",
    text: "Orders",
  },
];

const themes = {
    light:'light',
    dark:'dark'
    
}

const Navbar = () => {
  const [theme,setTheme]  = useState<string>(themes.light)

  const handleTheme = ()=>{
    const {light,dark} = themes;
    const newTheme = theme === light ? dark : light
    document.documentElement.setAttribute('data-theme',newTheme)
    setTheme(newTheme)
  }
  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          <NavLink to="/" className="hidden lg:flex btn btn-primary text-3xl">
            My Store
          </NavLink>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              {Links?.map(({id,url,text}) => {
                return (
                  <li key={id}>
                    <NavLink  to={url}>
                      {text}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
          {Links?.map(({id,url,text}) => {
                return (
                  <li key={id}>
                    <NavLink  to={url}>
                      {text}
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="navbar-end">
        <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme}/>
            <BsSunFill className="swap-on h-4 w-4"/>
            <BsMoonFill className="swap-off h-4 w-4"/>
        </label>
          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator">
              <BsCart3 className="w-6 h-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                2
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
