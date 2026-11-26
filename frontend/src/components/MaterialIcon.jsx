import React from 'react';

export const MaterialIcon = ({ name, fill = false, className = '', size }) => {
  return (
    <span
      className={`material-symbols-outlined select-none ${fill ? 'fill-1' : ''} ${className}`}
      style={{
        fontSize: size ? (typeof size === 'number' ? `${size}px` : size) : undefined,
        fontVariationSettings: fill ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"
      }}
    >
      {name}
    </span>
  );
};

export default MaterialIcon;

