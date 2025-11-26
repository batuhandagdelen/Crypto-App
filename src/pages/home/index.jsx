import React, { useCallback, useEffect, useMemo, useState } from "react";
import Searchbar from "../../components/home/searchbar";
import RefreshButton from "../../components/home/refresh-button";
import İnfoList from "../../components/home/info-list";
import coinApi from "../../services/coinApi";
import Loader from "../../components/loader";
import CoinCard from "../../components/home/coin-card";
import RefreshInfo from "../../components/home/refresh-info";
import Error from "../../components/error";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coins, setCoins] = useState([]);
  const [lastUpdated, setlastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");

  console.log(coins);

  const fetchCoins = useCallback((isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    coinApi
      .getTopCoins()
      .then((data) => {
        setCoins(data);
        setlastUpdated(new Date());
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setLoading(false), setRefreshing(false);
      });
  }, []);

  // sayfa yüklenince verileri çek
  useEffect(() => {
    fetchCoins();
  }, []);

  // 30 sn de bir otomati yenileme

  useEffect(() => {
    const id = setInterval(() => {
      fetchCoins(true);
    }, 30000);

    return () => clearInterval(id);
  }, []);

  // aratılan kelime her değiştiğinde filtrele

  const filteredCoins = useMemo(() => {
    // birşey aratılmadıysa filtreleme
    if (!searchTerms.trim()) return coins;
    // aratılan kelimeyi küçük harfe çevir
    const term = searchTerms.toLowerCase();

    // filtrele
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(term) ||
        coin.symbol.toLowerCase().includes(term)
    );
  }, [coins, searchTerms]);

  if (error) return <Error message={error} refetch={fetchCoins} />;
  return (
    <div className="space-y-6">
      {/* BAŞLIK */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Kripto Para Piyasası
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            En Popüler Kripto Para Birimleri
          </p>
        </div>
        {/* ARAMA VE YENİLEME */}
        <div className="flex items-center gap-5">
          <Searchbar onSearch={setSearchTerms} />
          <RefreshButton fetchCoins={fetchCoins} />
        </div>
      </div>
      {/* BİLGİLER */}
      <İnfoList
        total={coins.length}
        lastUpdate={lastUpdated?.toLocaleTimeString()}
      />

      {/* Coinleri Listeleme  */}

      {loading && coins.length < 1 ? (
        <Loader />
      ) : (
        <div className="grid md:grid-col-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}

      <RefreshInfo show={refreshing} />
    </div>
  );
};

export default Home;
