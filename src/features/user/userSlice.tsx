import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify';

type userProps = {
    username:string;
}

type userDetailsProp = {
    user:userProps | null;
    theme:string;
}

const themes = {
    light: 'light',
    dark: 'dark',
}

const getThemeFromLocalStorage = () => {
    const theme =  localStorage.getItem('theme') || themes.light;
    document.documentElement.setAttribute('data-theme', theme);
    return theme
  };

const defaultState:userDetailsProp = {
    user:{username:'Ajith'},
    theme:getThemeFromLocalStorage() 
}

const userSlice = createSlice({
    name:'user',
    initialState:defaultState,
    reducers:{
        loginUser:(state,action)=>{
          console.log('Login')
        },
        logoutUser:(state)=>{
            state.user = null
            localStorage.removeItem('user');
            toast.success('Logout Successfully');

        },
        toggleTheme:(state)=>{
            const {light,dark} = themes;
            state.theme = state.theme === light ? dark : light;
            document.documentElement.setAttribute('data-theme',state.theme);
            localStorage.setItem('theme',state.theme)
        },

    }
}) 

export const {loginUser,logoutUser,toggleTheme}  = userSlice.actions

export default userSlice.reducer