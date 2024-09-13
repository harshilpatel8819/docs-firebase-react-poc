import * as React from "react";
import { JSX } from "react/jsx-runtime";
const ReloadIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="19"
    viewBox="0 0 18 19"
    fill="none"
    className="w-[18px] h-[18px]"
    {...props}
  >
    <path
      d="M6.83305 4.30993C7.48555 4.11493 8.20555 3.98743 9.00055 3.98743C12.593 3.98743 15.503 6.89743 15.503 10.4899C15.503 14.0824 12.593 16.9924 9.00055 16.9924C5.40805 16.9924 2.49805 14.0824 2.49805 10.4899C2.49805 9.15493 2.90305 7.90993 3.59305 6.87493"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.90234 4.49L8.06984 2"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.90234 4.48999L8.42984 6.33499"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export default ReloadIcon;
