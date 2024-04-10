import React, { useState } from 'react';
import { ButtonBase } from '@mui/material';
import { animated, useSpring } from 'react-spring';

const ExpandableButton = ({ icon, label, onClick }) => {
  const [isHovered, setHovered] = useState(false);

  const animationStyle = useSpring({
    width: isHovered ? 150 : 40, // Adjust width as necessary
    height: 40, // Keep height fixed or make it dynamic as per your design
    borderRadius: isHovered ? '10px' : '30px',
    backgroundColor: '#3DA9DE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    config: { tension: 300, friction: 10 },
  });

  const handleButtonClick = () => {
    console.log('Button clicked');
    onClick(); // Trigger the onClick function passed from the parent component
  };

  return (
    <animated.div style={animationStyle}>
      <ButtonBase
        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        onMouseEnter={() => {
          console.log('Mouse entered');
          setHovered(true);
        }}
        onMouseLeave={() => {
          console.log('Mouse left');
          setHovered(false);
        }}
        onClick={handleButtonClick} // Handle click event
      >
        {isHovered ? (
          <span style={{ color: '#fff', display: 'flex', alignItems: 'center' }}>
            {icon && React.cloneElement(icon, { style: { marginRight: 10, color: '#fff' } })}
            {label}
          </span>
        ) : (
          icon && React.cloneElement(icon, { style: { color: '#fff' } })
        )}
      </ButtonBase>
    </animated.div>
  );
};

export default ExpandableButton;
