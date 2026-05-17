/* eslint-disable no-unused-vars */
import {create} from 'zustand'
import {axiosInstance} from "../lib/axios.js"
import {toast} from 'react-hot-toast';

export const useAuthStore = create((set)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    checkAuth:async ()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data})
        } catch (error) {
            console.log("Error In authCheck",error);
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false}) 
        }
    },

    signup : async (data)=>{
        try {
            set({isSigningUp:true})
            const res = await axiosInstance.post('/auth/signup',data)
            set({authUser:res.data});
            //toast
            toast.success("Account Created Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
            set({isSigningUp:false})
        } finally{
             set({isSigningUp:false})
        }
    }

}))