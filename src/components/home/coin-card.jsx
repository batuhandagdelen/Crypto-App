import { Star, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import {
  formatPercentage,
  formatBigNumber,
  formatPrice,
} from "../../utils/helpers";

const CoinCard = ({ coin }) => {
  // fiyat değişikliği pozitif mi ?
  const isPositive = coin.market_cap_change_percentage_24h >= 0;

  return (
    <Link
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 cursor-pointer hover:scale-105 transform transition "
      to={`/coin/${coin.id}`}
    >
      {/* Ust kısım */}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <div className="relative">
            <img
              className="size-12 rounded-full"
              src={coin.image}
              alt={coin.name}
            />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white size-6 rounded-full flex items-center justify-center text-xs font-bold ">
              {coin.market_cap_rank}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              {coin.symbol}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[150px]">
              {coin.name}
            </p>
          </div>
        </div>

        <button className="p-2 rounded-full transition">
          <Star className="size-5" />
        </button>
        {/* fav */}
      </div>

      {/* Bilgiler */}
      <div className="space-y-3">
        <div className="flex-center">
          <span className="card-label">Fiyat</span>
          <p className="card-value text-xl font-bold">
            {formatPrice(coin.current_price)}
          </p>
        </div>
        <div className="flex-center">
          <span className="card-label">24s Değişim (%)</span>
          <p
            className={`card-value text-xl font-bold flex items-center gap-1 ${
              isPositive ? "text-green-500" : " text-red-500"
            }`}
          >
            {isPositive ? <TrendingUp /> : <TrendingDown />}
            {formatPercentage(coin.market_cap_change_percentage_24h)}
          </p>
        </div>
        <div className="flex-center">
          <span className="card-label">Market Cap</span>
          <p className="card-value text-xl font-bold">
            {formatBigNumber(coin.market_cap)}
          </p>
        </div>
        <div className="flex-center">
          <span className="card-label">24s Hacim</span>
          <p className="card-value text-xl font-bold">
            {formatBigNumber(coin.total_volume)}
          </p>
        </div>
      </div>
      {/*  alt kısım */}

      <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 text-xs text-gray-500 dark:text-gray-400">
        <span>#{coin.market_cap_rank}</span>
        <span>
          {" "}
          {new Date(coin.last_updated).toLocaleDateString("tr", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </Link>
  );
};

export default CoinCard;
