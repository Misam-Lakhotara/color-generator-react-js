import axios from "axios";
import React, { useState, useEffect } from "react";
import { API } from "./config/config";

export default function Colors() {
  const [color, setColor] = useState("bg-gray-400");
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("gray");

  const changeColor = (newColor) => {
    setColor(newColor);
  };

  const changeRandomColor = () => {
    const colors = [
      "bg-red-800",
      "bg-green-800",
      "bg-blue-800",
      "bg-yellow-800",
      "bg-purple-800",
      "bg-pink-800",
      "bg-indigo-800",
      "bg-gray-800",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    changeColor(randomColor);
  };

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get(`${API.url}/api/colors`);
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
    <div className="flex flex-col justify-center items-center">
      <h1 className="bg-gray-200 m-5 p-5 text-black">Demo Color Project</h1>
      <div className="flex flex-row items-center justify-around">
        <button
          onClick={() => changeColor("bg-red-800")}
          className="box-border border-2 m-5 p-4 bg-red-800"
        >
          Red
        </button>
        <button
          onClick={() => changeColor("bg-green-800")}
          className="box-border border-2 m-5 p-4 bg-green-800"
        >
          Green
        </button>
        <button
          onClick={() => changeColor("bg-blue-800")}
          className="box-border border-2 m-5 p-4 bg-blue-800"
        >
          Blue
        </button>
        <button
          onClick={changeRandomColor}
          className="box-border border-2 m-5 p-5"
        >
          Random Color
        </button>
      </div>
      <div className={`w-40 h-40 ${color}`}></div>
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
    </div>
  );
}
