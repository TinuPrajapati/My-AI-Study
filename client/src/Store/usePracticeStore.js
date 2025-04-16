import { create } from "zustand";
import Instance from "../api/Instance";
import toast from "react-hot-toast";

const usePracticeStore = create((set, get) => ({
    problems: [], // Persist user session
    problem: {},
    isLoading: false,
    result: {},
    getProblems: async () => {
        set({ isLoading: true });
        try {
            const res = await Instance.get("/problems/all", { withCredentials: true });
            set({ problems: res.data.problems });
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({ isLoading: false });
        }
    },    
    createProblem: async (data) => {    
        set({ isLoading: true });
        try {
            const res = await Instance.post("/problems/create", data, { withCredentials: true });
            toast.success(res.data.message);
            get().getProblems();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoading: false });
        }
    },    
    getSingleTest: async (id) => {
        set({ isLoading: true });
        try {
            const res = await Instance.get(`/problems/${id}`, { withCredentials: true });
            set({ problem: res.data.problem });
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({ isLoading: false });
        }    
    },      

    checkProblem: async (data) => {
        set({ isLoading: true });
        try {
            const res = await Instance.post(`/problems/check`,data, { withCredentials: true });
            set({ result: res.data });
        } catch (error) {
            console.log(error.response);
        } finally {
            set({ isLoading: false });
        }    
    },      

}));

export default usePracticeStore;