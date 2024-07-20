import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteColor, fetchColors } from "./store/ColorSlice";
import DeleteIcon from "./Icons/DeleteIcon";

export default function DeleteColor({ id }) {
  console.log(id);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(deleteColor(id)).unwrap();
    dispatch(fetchColors());
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
      onConfirm: () => {
        handleDelete();
      },
    });
  };

  return (
    <div
      className="absolute -top-2 -right-3 z-50 bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
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
