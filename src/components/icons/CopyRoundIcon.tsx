import * as React from "react";
import { JSX } from "react/jsx-runtime";
const CopyRoundIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <path
      d="M14.6668 11.825V15.675C14.6668 18.8834 13.3835 20.1667 10.1752 20.1667H6.32516C3.11683 20.1667 1.8335 18.8834 1.8335 15.675V11.825C1.8335 8.61671 3.11683 7.33337 6.32516 7.33337H10.1752C13.3835 7.33337 14.6668 8.61671 14.6668 11.825Z"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20.1668 6.32504V10.175C20.1668 13.3834 18.8835 14.6667 15.6752 14.6667H14.6668V11.825C14.6668 8.61671 13.3835 7.33337 10.1752 7.33337H7.3335V6.32504C7.3335 3.11671 8.61683 1.83337 11.8252 1.83337H15.6752C18.8835 1.83337 20.1668 3.11671 20.1668 6.32504Z"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
export default CopyRoundIcon;
