import React from "react";

const ReviewStar = ({ color = "#2563EB" }) => {
  return (
    <svg
      className="custom-icon"
      width="23"
      height="21"
      viewBox="0 0 23 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.7902 15.9798L16.5569 14.7606L18.5485 20.9549L11.7902 15.9798ZM22.7602 7.97343H14.3695L11.7902 0L9.21102 7.97343H0.820312L7.61119 12.9156L5.03197 20.8889L11.8228 15.9468L16.0019 12.9156L22.7602 7.97343Z"
        fill={color}
      />
    </svg>
  );
};

export default ReviewStar;
