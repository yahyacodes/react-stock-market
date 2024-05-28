import { useEffect, useState } from "react";
import "./App.css";
import Plot from "react-plotly.js";

const apikey = import.meta.env.VITE_API_KEY;

function App() {
  // const [stockValue, setStockValue] = useState([]);
  const [stockXValue, setStockXValue] = useState({});
  const [stockYValue, setStockYValue] = useState({});

  useEffect(() => {
    handleStockMarket();
    // fetch(
    //   )
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  }, []);

  const handleStockMarket = async () => {
    try {
      const apiCall = `https://api.iex.cloud/v1/data/core/intraday_prices/spy?token=${apikey}`;
      const response = await fetch(apiCall);
      const data = await response.json();
      console.log(data);

      let xValues = [];
      let yValues = [];

      for (let key in data["INTRADAY_PRICES"]) {
        xValues.push(key);
        yValues.push(data["INTRADAY_PRICES"][key]["1. open"]);
      }

      setStockXValue(xValues);
      setStockYValue(yValues);
    } catch (err) {
      console.error("Error Fetching  Stock data", err);
    }
  };

  // const handleStockSearch = (e) => {
  //   setSearchStock(e.target.value);
  // };

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      {/* {stockValue.map((stock, index) => (
        <div className="flex gap-12" key={index}>
          <p>MIC: {stock.high}</p>
          <p>Volume: {stock.low}</p>
          <p>TapeA: {stock.date}</p>
          <p>TapeB: {stock.minute}</p>
          <p>TapeC: {stock.label}</p>
          <p>MarketPercent: {stock.volume}</p>
        </div>
      ))} */}

      <Plot
        data={[
          {
            x: stockXValue,
            y: stockYValue,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
        ]}
        layout={{ width: 920, height: 640, title: "A Fancy Plot" }}
      />
    </>
  );
}

export default App;
