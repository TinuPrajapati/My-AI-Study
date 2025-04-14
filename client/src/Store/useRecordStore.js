import { create } from "zustand";
import Instance from "../api/Instance"; 
import toast from "react-hot-toast";

const useRecordStore = create((set, get) => ({
    records: [],
    record: {}, // Persist user session
    isLoading: false,
    isError: false,

    // Register User
    createRecrd: async (data) => {
        set({ isLoading: true });

        try {
            const res = await Instance.post("/record/create", data,{withCredentials:true});
            toast.success(res.data.message)
            get().allRecord();
        } catch (error) {
            console.log(error.response.data.message)
        } finally {
            set({ isLoading: false });
        }
    },

    // Login User
    allRecord: async () => {
        set({ isLoading: true, isError: false, errorMessage: "" });
        try {
            const res = await Instance.get("/record/all",{withCredentials:true});
            set({ records: res.data.records });
        } catch (error) {
            console.log(error.response.data.message)
        } finally {
            set({ isLoading: false });
        }
    },

    getRecordById: async (id) => {
        set({ isLoading: true });
        try {
            const res = await Instance.get(`/record/${id}`,{withCredentials:true});
            set({ record: res.data });
        } catch (error) {
            console.log(error.response.data.message)
        } finally {
            set({ isLoading: false });  
        }
    }

}));

export default useRecordStore;
