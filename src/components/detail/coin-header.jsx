import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { RefreshCcw } from "lucide-react";
import { Star } from "lucide-react";
const CoinHeader = ({ coin, refetch, refreshing }) => {
  return (
    <div className="flex items-center justify-between">
      {/* sol taraf */}
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
        >
          <ArrowLeft className="size-5 text-gray-600 dark:text-gray-400" />
        </Link>
        <div className="flex items-center space-x-3">
          <img
            className="size-12 rounded-full"
            src={coin?.image.small}
            alt={coin?.name}
          />

          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {coin?.name} ({coin?.symbol})
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              #{coin?.market_cap_rank}
            </p>
          </div>
        </div>
      </div>

      {/* sağ taraf */}

      <div className="flex items-center gap-2">
        <button
          onClick={refetch}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <RefreshCcw
            className={`size-5 text-gray-500 dark:text-text-gray-400 ${
              refreshing ? "animate-spin" : ""
            }`}
          />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
          <Star className="text-gray-600 dark:text-gray-400 size-5" />
        </button>
      </div>
    </div>
  );
};

export default CoinHeader;
