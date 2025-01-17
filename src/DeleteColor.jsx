import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { toast } from "sonner";
import axios from "axios";
import React from "react";
import DeleteIcon from "./Icons/DeleteIcon";
import { config } from "./config/config";

export default function DeleteColor(props) {
  const { id, fetchColors } = props;

  const handleDelete = async () => {
    try {
      await axios.delete(`${config.API_URL}/api/colors/${id}`);
      fetchColors();
      toast.success("Color deleted successfully");
    } catch (error) {
      console.error("Error deleting color:", error);
      toast.error("Failed to delete color");
    }
  };

  const openConfirmModal = () => {
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          Are you sure you want to delete this color? This action cannot be
          undone.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleDelete(),
    });
  };

  return (
    <div
      className="absolute -top-2 -right-3 z-50 bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openConfirmModal();
      }}
    >
      <DeleteIcon />
    </div>
  );
}
