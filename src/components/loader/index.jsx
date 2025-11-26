import React from "react";
import { LoaderCircle } from "lucide-react";
const Loader = (designs) => {
  return (
    <div className={`flex justify-center my-[200px] ${designs}`}>
      <LoaderCircle className="animate-spin size-8  text-blue-500" />
    </div>
  );
};

export default Loader;
