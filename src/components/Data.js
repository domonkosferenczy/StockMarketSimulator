import {createContext} from "react";

const initialData = {
    dates: ["2020-01-01", "2020-01-02", "2020-01-03", "2020-01-04", "2020-01-05", "2020-01-06", "2020-01-07", "2020-01-08", "2020-01-09", "2020-01-10"],
    stocks: {
        "AAPL": {
          meta: {
            name: "Apple",
            startDate: "2020-01-01",
            endDate: "2020-01-05"
          },
          datapoints: {
            "2020-01-01": {
              close: 210.0,
              high: 220.0,
              low: 180.0,
              open: 190.0
            },
            "2020-01-02": {
              close: 220.0,
              high: 230.0,
              low: 190.0,
              open: 200.0
            },
            "2020-01-03": {
              close: 230.0,
              high: 240.0,
              low: 200.0,
              open: 210.0
            },
            "2020-01-04": {
              close: 240.0,
              high: 250.0,
              low: 230.0,
              open: 220.0
            },
            "2020-01-05": {
              close: 250.0,
              high: 260.0,
              low: 220.0,
              open: 230.0
            },
            "2020-01-06": {
              close: 210.0,
              high: 220.0,
              low: 180.0,
              open: 190.0
            },
            "2020-01-07": {
              close: 220.0,
              high: 230.0,
              low: 190.0,
              open: 200.0
            },
            "2020-01-08": {
              close: 230.0,
              high: 240.0,
              low: 200.0,
              open: 210.0
            },
            "2020-01-09": {
              close: 240.0,
              high: 250.0,
              low: 230.0,
              open: 220.0
            },
            "2020-01-10": {
              close: 250.0,
              high: 260.0,
              low: 220.0,
              open: 230.0
            },
          }
        },
        "AMAZ": {
          meta: {
            name: "Amazon",
            startDate: "2020-01-01",
            endDate: "2020-01-05"
          },
          datapoints: {
            "2020-01-01": {
              close: 210.0,
              high: 220.0,
              low: 180.0,
              open: 190.0
            },
            "2020-01-02": {
              close: 220.0,
              high: 230.0,
              low: 190.0,
              open: 200.0
            },
            "2020-01-03": {
              close: 230.0,
              high: 240.0,
              low: 200.0,
              open: 210.0
            },
            "2020-01-04": {
              close: 240.0,
              high: 250.0,
              low: 230.0,
              open: 220.0
            },
            "2020-01-05": {
              close: 250.0,
              high: 260.0,
              low: 220.0,
              open: 230.0
            },
            "2020-01-06": {
              close: 210.0,
              high: 220.0,
              low: 180.0,
              open: 190.0
            },
            "2020-01-07": {
              close: 220.0,
              high: 230.0,
              low: 190.0,
              open: 200.0
            },
            "2020-01-08": {
              close: 230.0,
              high: 240.0,
              low: 200.0,
              open: 210.0
            },
            "2020-01-09": {
              close: 240.0,
              high: 250.0,
              low: 230.0,
              open: 220.0
            },
            "2020-01-10": {
              close: 250.0,
              high: 260.0,
              low: 220.0,
              open: 230.0
            },
          }
        }
    }
}


export const DataContext = createContext(initialData);

