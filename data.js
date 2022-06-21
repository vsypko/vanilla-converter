const getConverterTable = async (converter) => {
  if (converter === "measure") {
    const response = await fetch("./data/length-units.json")
    const data = await response.json()

    let stringifyedData = ""
    const dataToString = data.length.forEach((el) => {
      stringifyedData +=
        el.unit + ":   " + el.symbol + " = " + el.value + "m        "
    })

    return { data: data.length, stringifyedData }
  }

  if (converter === "currency") {
    const response = await fetch(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
    )
    const carrencyAll = await response.json()

    const res = await fetch("./data/currencies.json")
    const currencyUsed = await res.json()

    let data = []
    carrencyAll.forEach((el) => {
      if (currencyUsed.hasOwnProperty(el.cc)) {
        data.push({
          unit: el.cc,
          symbol: currencyUsed[el.cc].c_sign,
          value: el.rate,
        })
      }
    })
    data.push({
      unit: "UAH",
      symbol: "₴",
      value: 1,
    })

    const date = new Date()
    let stringifyedData = date.toLocaleString() + "     "
    const dataToString = data.forEach((el) => {
      stringifyedData +=
        el.unit + ":   " + el.symbol + " = " + el.value + "₴        "
    })

    return { data, stringifyedData }
  }
}
export default getConverterTable
