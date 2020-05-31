const serverAPI = "http://localhost:3000/api/";

const requestAll = async () => {
  const response = await fetch(`${serverAPI}all`);
  const data = await response.json();

  const tickers = data.tickers;

  const allData = {
    dates: [],
    stocks: {},
  };
  let lastDate = "0000-00-00";
  for (let i = 0; i <= tickers.length - 1; i++) {
    const requestStockData = await requestStock(tickers[i]);
    console.log(requestStockData.dates[requestStockData.dates.length - 1]);

    if (lastDate < requestStockData.dates[requestStockData.dates.length - 1]) {
      lastDate = requestStockData.dates[requestStockData.dates.length - 1];
      allData.dates = requestStockData.dates;
    }
    Object.assign(allData.stocks, requestStockData.stocks);
  }

  return allData;
};

const requestStock = async (ticker) => {
  const response = await fetch(`${serverAPI}ticker_data/${ticker}`);
  const data = await response.json();

  const responseMeta = await fetch(`${serverAPI}ticker_meta/${ticker}`);
  const meta = await responseMeta.json();

  const datapoints = {};

  const dates = data.map((date) => {
    const object = {};
    object[date["date"].substring(0, 10)] = {
      close: date["close"],
      high: date["high"],
      low: date["low"],
      open: date["open"],
    };
    Object.assign(datapoints, object);
    return date["date"].substring(0, 10);
  });

  const firstDate = dates[0];
  const lastDate = dates[dates.length - 1];
  const tickerName = meta["ticker"];
  const fullName = meta["name"];

  const readyData = {
    dates,
    stocks: {
      [tickerName]: {
        meta: {
          name: fullName,
          startDate: firstDate,
          endDate: lastDate,
        },
        datapoints: {
          ...datapoints,
        },
      },
    },
  };
  console.log(readyData);

  return readyData;
};

export default requestAll;
