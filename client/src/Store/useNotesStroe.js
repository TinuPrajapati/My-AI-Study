import {create} from "zustand";
import Instance from "../api/Instance";
import toast from "react-hot-toast";

const useNotesStore = create((set, get) => ({
    notes: [],
    singleNote: {},
    notesLoader: false,   
    createNotes: async (data) => {
        set({notesLoader: true})
        try {
            const res = await Instance.post("/notes/create", data, {withCredentials: true});
            toast.success(res.data.message);
            get().getAllNotes();
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }finally{
            set({notesLoader: false})
        }
    },

    getAllNotes:async()=>{
        set({notesLoader: true})
        try {
            const res = await Instance.get("/notes/all", {withCredentials: true});
            set({notes: res.data.notes})
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }finally{
            set({notesLoader: false})
        }
    },

    deleteNote:async(id)=>{
        set({notesLoader: true})
        try {
            const res = await Instance.delete(`/notes/${id}`, {withCredentials: true});
            toast.success(res.data.message);
            get().getAllNotes();
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }finally{
            set({notesLoader: false})
        }
    }


}));

export default useNotesStore;