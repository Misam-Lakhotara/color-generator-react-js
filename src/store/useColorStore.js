import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";
import { config } from "../config/config";

const useColorStore = create((set) => ({
  colors: [],
  fetchColors: (params) =>
    new Promise((resolve, reject) => {
      axios
        .get(`${config.API_URL}/api/colors/`, { params })
        .then((response) => {
          set({ colors: response.data.colors });
          resolve(response.data.colors);
        })
        .catch((error) => {
          console.error("Error fetching colors:", error);
          toast.error("Failed to fetch colors");
          reject(error);
        });
    }),

  addColor: (newColor) =>
    new Promise((resolve, reject) => {
      axios
        .post(`${config.API_URL}/api/colors`, newColor)
        .then(() => {
          toast.success("Color added successfully");
          resolve();
        })
        .catch((error) => {
          console.error("Error adding color:", error);
          toast.error("Failed to add color");
          reject(error);
        });
    }),

  deleteColor: (id) =>
    new Promise((resolve, reject) => {
      axios
        .delete(`${config.API_URL}/api/colors/${id}`)
        .then(() => {
          toast.success("Color deleted successfully");
          resolve();
        })
        .catch((error) => {
          console.error("Error deleting color:", error);
          toast.error("Failed to delete color");
          reject(error);
        });
    }),

  updateColor: (id, updatedColor) =>
    new Promise((resolve, reject) => {
      axios
        .put(`${config.API_URL}/api/colors/${id}`, updatedColor)
        .then(() => {
          toast.success("Color updated successfully");
          resolve();
        })
        .catch((error) => {
          console.error("Error updating color:", error);
          toast.error("Failed to update color");
          reject(error);
        });
    }),
}));

export default useColorStore;
