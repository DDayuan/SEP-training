import React, { useState, useEffect } from "react";

const StockComponent: React.FC = () => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const getStockData = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=4KIGZ92ZMLT9UNFE`
        );

        const data = await response.json();
        const timeSeriesData = data['Time Series (Daily)'];
        const latestTradingDay = Object.keys(timeSeriesData)[0]; 
        const latestStockData = timeSeriesData[latestTradingDay];

        setStockData({
          date: latestTradingDay,
          open: latestStockData['1. open'],
          high: latestStockData['2. high'],
          low: latestStockData['3. low'],
          close: latestStockData['4. close'],
          volume: latestStockData['5. volume']
        });
      } catch (error) {
        console.error("Error fetching stock data", error);
      }
    };

    getStockData();
  }, []);

  return (
    <div>
      {stockData ? (
        <div>
          <h1>Microsoft Stock Price</h1>
          <p>Date: {stockData.date}</p>
          <p>Open: {stockData.open}</p>
          <p>High: {stockData.high}</p>
          <p>Low: {stockData.low}</p>
          <p>Close: {stockData.close}</p>
          <p>Volume: {stockData.volume}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StockComponent;
