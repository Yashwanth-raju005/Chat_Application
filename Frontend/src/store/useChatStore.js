import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedUser: (selectedUser) => set({ selectedUser: selectedUser }),

  getAllContacts: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },


  getMessagesByUserId:async (userId)=>{
    set({isMessagesLoading:true})
    try {
      const res = await axiosInstance.get(`/messages/${userId}`)
      set({messages:res.data})
      
    } catch (error) {
      toast.error("error in getting messages",error)
      set({isMessagesLoading:false})
    }finally{
      set({isMessagesLoading:false})
    }
  },

  sendMessage : async(messageData)=>{
    try {
      const res = await axiosInstance.post(`/messages/send/${get().selectedUser._id}`,messageData)
      set({messages:get().messages.concat(res.data)})
    } catch (error) {
      toast.error(error.response?.dataa?.message || "Something Went Wrong")
    }
  }

}));
