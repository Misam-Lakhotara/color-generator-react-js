import { Modal, Button, TextInput } from "@mantine/core";
import Atropos from "atropos/react";
import "atropos/css";
import React, { useState } from "react";
import useColorStore from "./store/useColorStore";

export default function AddColor(props) {
  const [visible, setVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    colorValue: "",
    colorName: "",
  });

  const colorStore = useColorStore();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddColor = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      await colorStore.addColor({
        label: formData.colorName,
        value: formData.colorValue,
      });
      await colorStore.fetchColors();
      setVisible(false);
      setFormData({
        colorValue: "",
        colorName: "",
      });
    } catch (error) {
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Atropos
        activeOffset={40}
        shadowScale={1.05}
        duration={500}
        rotate={true}
        rotateTouch={true}
        rotateXMax={15}
        rotateYMax={15}
        stretchX={2}
      >
        <button
          className="bg-slate-400 m-3 p-3 rounded-full hover:bg-slate-500 mt-10"
          onClick={() => setVisible(true)}
        >
          <span>Add Color</span>
        </button>

        <Modal
          opened={visible}
          title="Add Color"
          centered
          onClose={() => setVisible(false)}
        >
          <form onSubmit={handleAddColor} className="space-y-4">
            <div>
              <label htmlFor="colorName">Color Name:</label>
              <TextInput
                type="text"
                name="colorName"
                value={formData.colorName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="colorValue">Color Value:</label>
              <TextInput
                type="color"
                name="colorValue"
                value={formData.colorValue}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              className="mt-10"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              type="submit"
              loading={saving}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </form>
        </Modal>
      </Atropos>
    </div>
  );
}
