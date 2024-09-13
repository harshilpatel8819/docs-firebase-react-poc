import * as React from "react";
import { JSX } from "react/jsx-runtime";
const DropArrow = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <path
      d="M11.6199 5.22107L7.81655 9.0244C7.36738 9.47357 6.63238 9.47357 6.18322 9.0244L2.37988 5.22107"
      stroke="#1F2937"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export default DropArrow;
