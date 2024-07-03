import React, { useState, useEffect } from "react";

export default function Color() {
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/colors");
        if (!response.ok) {
          throw new Error("Failed to fetch colors");
        }
        const data = await response.json();
        if (!Array.isArray(data.colors)) {
          throw new Error("Expected an array of colors");
        }
        setColors(data.colors); // Set the fetched data into state
      } catch (error) {
        console.error("Error fetching colors:", error);
        // Handle error state if needed
      }
    };

    fetchColors();
  }, []); // Empty dependency array means this effect runs only once after initial render

  const handleColorClick = (colorName) => {
    setSelectedColor(colorName);
  };

  return (
    <div>
      <div>
        {colors.map((color) => (
          <button
            key={color.id}
            style={{
              backgroundColor: color.value,
              margin: "5px",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleColorClick(color.label)}
          >
            {color.label}
          </button>
        ))}
      </div>
      {selectedColor && (
        <div style={{ marginTop: "20px" }}>
          <h2>Selected Color: {selectedColor}</h2>
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: colors.find(
                (color) => color.label === selectedColor
              )?.value,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
p;
