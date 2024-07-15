import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AddColors from "./AddColors";
import DeleteColor from "./DeleteColor";
import EditColor from "./EditColor";
import EditIcon from "./Icons/EditIcon";
import { API } from "./config/config";

export default function DynamicColors() {
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("gray");

  const editColorModalRef = useRef();

  const fetchColors = async (event) => {
    try {
      const response = await axios.get(`${API.url}/api/colors/`);

      setColors(response.data.colors);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col">
      <AddColors fetchColors={fetchColors} />
      <EditColor ref={editColorModalRef} fetchColors={fetchColors} />

      <div className="flex flex-row m-16 p-16 space-x-4 mt-10">
        {colors.map((color) => (
          <button
            key={color.id}
            style={{ backgroundColor: color.value }}
            className=" p-5 m-5 relative"
            onClick={() => setSelectedColor(color.value)}
          >
            {color.label}
            <DeleteColor id={color.id} fetchColors={fetchColors} />
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                editColorModalRef.current.openModal(color);
              }}
            >
              <EditIcon />
            </button>
          </button>
        ))}
      </div>
      <div
        className="w-96 h-96 box-border border-2"
        style={{ backgroundColor: selectedColor }}
      ></div>
    </div>
  );
}
