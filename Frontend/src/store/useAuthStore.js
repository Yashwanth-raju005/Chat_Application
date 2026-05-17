/* eslint-disable no-unused-vars */
import {create} from 'zustand'

export const useAuthStore = create((set)=>({
    authUser :{name:"yash",_id:123,age:20},
    isLoading:false,
    login:()=>{
        console.log("Just Logged In")
        set({isLoading:true})
    }
}))