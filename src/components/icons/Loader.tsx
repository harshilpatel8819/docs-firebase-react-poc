import React from 'react';
import loader from "./loader.gif";

const Loader = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <div className="flex justify-center items-center w-full h-full">
    <img src={loader} alt="loading..." {...props} />
  </div>
);

export default Loader;
