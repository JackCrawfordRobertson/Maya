import React from 'react';

const CustomTooltip = ({ point }) => {
    return (
        <div style={{ padding: '5px', background: 'white', border: '1px solid #ccc' }}>
            <strong>Water Produced:</strong> {point.data.yFormatted}
        </div>
    );
};
