import React from "react";

const Spinner = ({ size = 40, color = "#0BA42D" }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full h-[size]px w-[size]px border-t-4 border-b-4 border-[color]"
        style={{
          borderColor: `${color} transparent ${color} transparent`,
          height: `${size}px`,
          width: `${size}px`,
        }}
      ></div>
    </div>
  );
};

export default Spinner;
