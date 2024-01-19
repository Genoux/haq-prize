import React from 'react';

const WheelLabel = ({ color, label }: { color: string, label: string }) => {
  const style = {
    backgroundColor: color,
  };

  return (
    <div className='flex gap-2 items-center'>
      <div className="w-6 h-6 rounded-full" style={style}></div>
      <p>{label}</p>
    </div>
  );
};

export default WheelLabel;
