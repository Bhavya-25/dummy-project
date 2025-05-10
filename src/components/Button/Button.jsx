import React from 'react';

const Button = ({ children, variant = 'default', className = '', ...props }) => {
  let styles = 'px-4 py-1 text-sm rounded-full';

  if (variant === 'outline') {
    styles += ' border border-gray-400 text-gray-800 bg-white';
  } else {
    styles += ' bg-teal-600 text-white';
  }

  return (
    <button className={`${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
