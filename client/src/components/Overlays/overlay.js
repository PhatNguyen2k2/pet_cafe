import React from 'react';

const Overlay = (props) => {
  const classes = `xl:px-[100px] xl:py-[25px] md:px-[50px] md:py-[50px] sm:px-[30px] sm:py-[10px] bg-dark-01 mobile:px-[10px] mobile:py-[10px] ${
    props.className ? props.className : ''
  }`;
  return (
    <div className={classes} style={props.style}>
      {props.children}
    </div>
  );
};

export default Overlay;
