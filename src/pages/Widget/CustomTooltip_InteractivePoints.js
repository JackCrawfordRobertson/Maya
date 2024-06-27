import React from 'react';

const CustomTooltip = ({ point }) => {
  if (!point || !point.data) {
    // Handle the case where point or point.data is undefined
    return <div style={{ padding: '5px', background: 'white', border: '1px solid #ccc' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '5px', background: 'white', border: '1px solid #ccc' }}>
      <strong>Water Produced:</strong> {point.data.yFormatted}
    </div>
  );
};

export default CustomTooltip;
