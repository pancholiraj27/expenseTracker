import React, { useState } from "react";
import "./ColorChange.css";
const ColorChanger = ({ bgColors, setBgColors, showColors, setShowColors }) => {
  const colors = ["cyan", "black", "white"];

  return (
    <>
      <div className={`colorBoxes ${bgColors}`}>
        <div className="showColors" onClick={() => setShowColors(!showColors)}>
          <span>Change Theme</span>
        </div>
        {showColors
          ? colors.map((col, ind) => {
              return (
                <div
                  key={ind}
                  className="color"
                  onClick={() => {
                    setBgColors(col);
                    setShowColors(false);
                  }}
                  style={{ backgroundColor: col }}
                ></div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default ColorChanger;
