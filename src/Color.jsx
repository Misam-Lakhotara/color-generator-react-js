import React, { useState } from "react";

export default function Color() {
  const [color, setColor] = useState("bg-gray-400");
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
      <div>
        <div className={`w-40 h-40 ${color}`}> </div>
      </div>
    </div>
  );
}
