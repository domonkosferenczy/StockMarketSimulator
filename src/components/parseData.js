const request = async () => {
    const response = await fetch("aapl.json")
    const data = await response.json()

    const responseMeta = await fetch("aapl_meta.json")
    const meta = await responseMeta.json()

    const datapoints = {}

    const dates = data.map((date) => {
        const object = {}
        object[date["date"].substring(0, 10)] = {
            close: date["close"],
            high: date["high"],
            low: date["low"],
            open: date["open"]
        }
        Object.assign(datapoints, object)
        return date["date"].substring(0, 10)
    })


const firstDate = dates[0]
const lastDate = dates[dates.length -1]
const tickerName = meta["ticker"]
const fullName = meta["name"]

const readyData = {
    dates,
    stocks: {
        [tickerName]: {
            meta: {
                name: fullName,
                startDate: firstDate,
                endDate: lastDate
            },
            datapoints: {
                ...datapoints
            }
        }
    }
}

return readyData


}

export default request
