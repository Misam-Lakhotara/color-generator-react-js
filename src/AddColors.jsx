import { Modal, Button, TextInput } from "@mantine/core";
import { toast } from "sonner";
import React, { useState } from "react";
import axios from "axios";
import { API } from "./config/config";

export default function AddColor(props) {
  const [formState, setFormState] = useState({
    visible: false,
    colorValue: "",
    colorName: "",
    saving: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleAddColor = async (event) => {
    event.preventDefault();
    setFormState({ ...formState, saving: true });
    try {
      const data = {
        value: formState.colorValue,
        label: formState.colorName,
      };
      await axios.post(`${API.url}/api/colors`, data);
      setFormState({
        ...formState,
        visible: false,
        saving: false,
        colorValue: "",
        colorName: "",
      });
      props.fetchColors();
      toast.success("Color added successfully");
    } catch (error) {
      console.error("Error adding color:", error);
      toast.error("Failed to add color");
      setFormState({ ...formState, saving: false });
    }
  };

  return (
    <div>
      <button
        className="bg-slate-400 m-3 p-3 rounded-full hover:bg-slate-500 mt-10"
        onClick={() => setFormState({ ...formState, visible: true })}
      >
        Add Color
      </button>

      <Modal
        opened={formState.visible}
        title="Add Color"
        centered
        onClose={() => setFormState({ ...formState, visible: false })}
      >
        <form onSubmit={handleAddColor} className="space-y-4">
          <div>
            <label htmlFor="colorName">Color Name:</label>
            <TextInput
              type="text"
              name="colorName"
              value={formState.colorName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="colorValue">Color Value:</label>
            <TextInput
              type="color"
              name="colorValue"
              value={formState.colorValue}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            className="mt-10"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            type="submit"
            loading={formState.saving}
          >
            {formState.saving ? "Saving..." : "Save"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}