import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";
import { config } from "../config/config";

const useColorStore = create((set) => ({
  colors: [],
  fetchColors: async () => {
    try {
      const response = await axios.get(`${config.API_URL}/api/colors/`);
      set({ colors: response.data.colors });
    } catch (error) {
      console.error("Error fetching colors:", error);
      toast.error("Failed to fetch colors");
    }
  },
  addColor: async (data) => {
    try {
      await axios.post(`${config.API_URL}/api/colors`, data);
      toast.success("Color added successfully");
    } catch (error) {
      console.error("Error adding color:", error);
      toast.error("Failed to add color");
    }
  },
  deleteColor: async (id) => {
    try {
      await axios.delete(`${config.API_URL}/api/colors/${id}`);
      toast.success("Color deleted successfully");
    } catch (error) {
      console.error("Error deleting color:", error);
      toast.error("Failed to delete color");
    }
  },
  updateColor: async (data) => {
    try {
      const { id } = data;
      await axios.put(`${config.API_URL}/api/colors/${id}`, data);
      toast.success("Color updated successfully");
    } catch (error) {
      console.error("Error updating color:", error);
      toast.error("Failed to update color");
    }
  },
}));

export default useColorStore;
