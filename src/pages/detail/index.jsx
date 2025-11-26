import React, { useCallback, useEffect, useState } from "react";
import coinApi from "../../services/coinApi";
import { useParams } from "react-router-dom";
import CoinHeader from "../../components/detail/coin-header";
import CoinPrice from "../../components/detail/coin-price";
import CoinChartSection from "../../components/detail/coin-chart-section";
import CoinStats from "../../components/detail/coin-stats";
import CoinDescription from "../../components/detail/coin-description";

const Detail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [priceHistory, setPriceHistory] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(7);

  // coin detaylarını çek

  const fetchCoinDetails = useCallback(
    (isRefreshing = false) => {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      coinApi
        .getCoinDetails(id)
        .then((data) => {
          setCoin(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
          setRefreshing(false);
        });
    },
    [id]
  );

  // coin fiyat geçmişini getirecek fonksiyon

  const fetchPriceHistory = useCallback(() => {
    setHistoryLoading(true);

    coinApi
      .getPriceHistory(id, selectedPeriod)
      .then((data) => setPriceHistory(data))
      .catch((err) => {
        setPriceHistory([]);
      })
      .finally(() => {
        setHistoryLoading(false);
      });
  }, [id, selectedPeriod]);

  // sayfa yüklenince coin detay verilerini al
  useEffect(() => {
    fetchCoinDetails();
    fetchPriceHistory();
  }, []);

  // seçili zaman periyodu her değişitiğinde güncel değerleri al
  useEffect(() => {
    if (coin) {
      // seçili periyoda göre fiyat geçmişini al
      fetchPriceHistory();

      // coin detay verilini tekrar çek
      fetchCoinDetails(true);
    }
  }, [selectedPeriod]);

  return (
    <div className="space-y-6">
      <CoinHeader
        coin={coin}
        refetch={() => fetchCoinDetails(true)}
        refreshing={refreshing}
      />

      <CoinPrice coin={coin} />
      <CoinChartSection
        coin={coin}
        setSelectedPeriod={setSelectedPeriod}
        selectedPeriod={selectedPeriod}
        historyLoading={historyLoading}
        priceHistory={priceHistory}
      />

      <CoinStats coin={coin} />

      <CoinDescription coin={coin} />
    </div>
  );
};

export default Detail;
