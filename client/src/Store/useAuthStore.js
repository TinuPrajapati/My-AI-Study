import { create } from "zustand";
import Instance from "../api/Instance";
import toast from "react-hot-toast";

const useAuthStore = create((set, get) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null, // Persist user session
  isLoading: false,
  isError: false,

  // Register User
  register: async (data, navigate) => {
    set({ isLoading: true });

    try {
      const res = await Instance.post("/auth/register", data, {
        withCredentials: true,
      });
      set({
        authUser: {
          name: res.data.user.name,
          email: res.data.user.email,
          _id: res.data.user._id,
        },
      });
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          name: res.data.user.name,
          email: res.data.user.email,
          _id: res.data.user._id,
        })
      );
      navigate("/");
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  // Login User
  login: async (data, navigate) => {
    set({ isLoading: true, isError: false, errorMessage: "" });

    try {
      const res = await Instance.post("/auth/login", data,{withCredentials:true});
      set({
        authUser: {
          name: res.data.user.name,
          email: res.data.user.email,
          _id: res.data.user._id,
        },
      });
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          name: res.data.user.name,
          email: res.data.user.email,
          _id: res.data.user._id,
        })
      );
      toast.success(res.data.message);
      navigate("/quiz");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  // Logout User
  logout: async (navigate) => {
    set({ isLoading: true });

    try {
      const res = await Instance.post("/auth/logout", { withCredentials: true });
      set({ authUser: null });
      localStorage.removeItem("authUser");
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  // Check if user is authenticated
  checkAuthUser: async () => {
    set({ isLoading: true });

    try {
      const res = await Instance.get("/auth/check-user", { withCredentials: true });
      set({
        authUser: {
          name: res.data.user.name,
          email: res.data.user.email,
          _id: res.data.user._id,
        },
      });
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          name: res.data.user.name,
          email: res.data.user.email,
          _id: res.data.user._id,
        })
      );
    } catch (error) {
      set({ authUser: null });
      console.log(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
