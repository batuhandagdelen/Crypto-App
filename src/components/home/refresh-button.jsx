import { RefreshCw } from "lucide-react";
import React from "react";

const RefreshButton = ({ fetchCoins }) => {
  console.log("render oldu");
  return (
    <button
      onClick={fetchCoins}
      className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
    >
      <RefreshCw className="size-5" />
    </button>
  );
};

export default React.memo(RefreshButton);
