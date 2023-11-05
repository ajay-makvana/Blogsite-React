import React from "react";

function Button({
  children, // this is button text not more than that
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props // all other propery passed by user as we don't know all passed by user eg. placeholder
}) {
  return (
    <>
      <button
        className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}
        {...props}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
