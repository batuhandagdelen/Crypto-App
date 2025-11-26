import React from "react";
import {
  formatBigNumber,
  formatPercentage,
  formatPrice,
} from "../../utils/helpers";
import { TrendingDown, TrendingUp } from "lucide-react";

const CoinPrice = ({ coin }) => {
  const isPositive = coin?.market_data.price_change_percentage_24h > 0;

  return (
    <div className="detail-container">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Güncel Fiyat
          </p>
          <p className="font-bold text-4xl text-gray-900 dark:text-white">
            {formatPrice(coin?.market_data.current_price.usd)}
          </p>
        </div>
        <div
          className={`flex items-center space-x-2 ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? <TrendingUp /> : <TrendingDown />}

          <div className="text-rigt">
            <p className="text-lg font-semibold">
              {formatPercentage(coin?.market_data?.price_change_percentage_24h)}
            </p>
            <p className="text-sm">
              {formatPrice(coin?.market_data.price_change_24h)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinPrice;
