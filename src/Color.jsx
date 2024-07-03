import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Color() {
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("gray");

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/colors");
        setColors(response.data.colors);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchColors();
  }, []);

  const handleColorClick = (colorName) => {
    setSelectedColor(colorName);
  };

  return (
    <div className="flex flex-col mt-20 justify-center items-center space-x-10">
      <div className="flex flex-row">
        {colors.map((color) => (
          <button
            key={color.id}
            style={{
              backgroundColor: color.value,
            }}
            className="m-5 p-5"
            onClick={() => handleColorClick(color.label)}
          >
            {color.label}
          </button>
        ))}
      </div>
      {selectedColor && (
        <div className="flex-row mt-20">
          <div
            className="w-96 h-96"
            style={{ backgroundColor: selectedColor }}
          ></div>
        </div>
      )}
    </div>
  );
}
