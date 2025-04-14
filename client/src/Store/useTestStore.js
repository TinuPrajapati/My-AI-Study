import { create } from "zustand";
import Instance from "../api/Instance"; 
import toast from "react-hot-toast";

const useTestStore = create((set, get) => ({
    Tests: [], // Persist user session
    test: null,
    isLoading: false,
    isError: false,

    // Register User
    generate: async (data,form) => {
        set({ isLoading: true });

        try {
            const res = await Instance.post("/test/create", data,{withCredentials:true});
            toast.success(res.data.message)
            get().show();
            form(false)
        } catch (error) {
            console.log(error.response.data.message)
            toast.error("Try again, Due to some error")
        } finally {
            set({ isLoading: false });
        }
    },

    // Login User
    show: async () => {
        set({ isLoading: true, isError: false, errorMessage: "" });

        try {
            const res = await Instance.get("/test/all",{withCredentials:true});
            set({ Tests: res.data.tests });
        } catch (error) {
            console.log(error.response.data.message)
        } finally {
            set({ isLoading: false });
        }
    },

    getTest: async (id) => {
        set({ isLoading: true });
        try {
            const res = await Instance.get(`/test/${id}`,{withCredentials:true});
            set({ test: res.data });
        } catch (error) {
            console.log(error.response.data.message)
        } finally {
            set({ isLoading: false });  
        }
    }

}));

export default useTestStore;
