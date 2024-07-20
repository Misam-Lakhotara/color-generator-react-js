import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddColor from "./AddColor";
import DeleteColor from "./DeleteColor";
import EditColor from "./EditColor";
import EditIcon from "./Icons/EditIcon";
import Atropos from "atropos/react";
import { fetchColors } from "./store/ColorSlice";

export default function DynamicColors() {
  const [selectedColor, setSelectedColor] = useState("gray");

  const editColorModalRef = useRef();
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.colors.colors);

  useEffect(() => {
    dispatch(fetchColors());
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center flex-col">
      <AddColor />
      <EditColor ref={editColorModalRef} />

      <div className="flex flex-row m-16 p-16 space-x-4 mt-10">
        {colors.map((color) => (
          <button
            key={color.id}
            style={{ backgroundColor: color.value }}
            className="p-5 m-5 relative"
            onClick={() => setSelectedColor(color.value)}
          >
            {color.label}
            <DeleteColor id={color.id} />

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
        <div
          className="w-96 h-96 box-border border-2"
          style={{ backgroundColor: selectedColor }}
        ></div>
      </Atropos>
    </div>
  );
}
