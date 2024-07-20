import { Modal, Button, TextInput } from "@mantine/core";
import { toast } from "sonner";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import { updateColor } from "./store/ColorSlice";

const EditColor = forwardRef((props, ref) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ label: "", value: "" });
  const dispatch = useDispatch();

  const onChangeInput = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const openModal = (colorData) => {
    setFormData(colorData);
    setIsOpen(true);
  };

  const editColor = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await dispatch(
        updateColor({ id: formData.id, updatedColor: formData })
      ).unwrap();
      setIsOpen(false);
      toast.success("Color updated successfully");
    } catch (error) {
      toast.error("Failed to update color");
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  return (
    <Modal
      opened={modalIsOpen}
      title="Edit Color"
      centered
      onClose={() => setIsOpen(false)}
    >
      <form className="space-y-4" onSubmit={editColor}>
        <div>
          <label>Color Name:</label>
          <TextInput
            type="text"
            name="colorName"
            value={formData.label}
            required
            onChange={(e) => onChangeInput("label", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="colorValue">Color Value:</label>
          <TextInput
            type="color"
            required
            value={formData.value}
            onChange={(e) => onChangeInput("value", e.target.value)}
          />
        </div>
        <Button
          className="!mt-10"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          type="submit"
          loading={loading}
        >
          Save
        </Button>
      </form>
    </Modal>
  );
});
export default EditColor;
