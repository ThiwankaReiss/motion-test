import React from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = ({ setColor, currentColor, top }) => {
  if(currentColor==null){
    currentColor='#0000ff'
  }
  const handleChange = (color) => {
    setColor(color.hex);
  };

  const handleEdit = (color) => {
    const newGeos = [...setColor.array];
    newGeos[setColor.edit] = {
      ...newGeos[setColor.edit],
      color: color.hex
    };
    setColor.func(newGeos);
  };

  return (
    <>
      {top && (
        <div className="absolute left-full ml-3 " style={{ position: 'absolute', top: '100%', right: '0', zIndex: '999' }}>
          <SketchPicker

            color={currentColor}
            disableAlpha
            onChange={handleChange}
          />
        </div>
      ) || (
          <div className="absolute left-full ml-3 " >
            <SketchPicker

              color={currentColor}
              disableAlpha
              onChange={handleEdit}
            />
          </div>
        )}

    </>

  );
};

export default ColorPicker;