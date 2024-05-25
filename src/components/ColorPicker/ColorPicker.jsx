import React from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ getColor,currentColor }) => {
  const handleChange = (color) => {
    getColor(color.hex);
  };

  return (
    <div className="absolute left-full ml-3 "style={{ position: 'absolute',top: '100%', right: '0', zIndex:'999' }}>
      <SketchPicker 
      
        color={currentColor}
        disableAlpha
        onChange={handleChange}
      />
    </div>
  );
};

export default ColorPicker;