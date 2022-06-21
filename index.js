import getConverterTable from "./data.js"
import converter from "./converter.js"

let converterTable = "measure"

const selects = document.getElementsByTagName("select")
const input = document.getElementById("input")
const convertSelector = document.querySelector("fieldset")

const setOptionsForSelects = async (selects, converterTable) => {
  const { data, stringifyedData } = await getConverterTable(converterTable)
  document.getElementById("ticker-headline").textContent = stringifyedData

  while (selects[0].firstChild) {
    selects[0].removeChild(selects[0].firstChild)
  }

  while (selects[1].firstChild) {
    selects[1].removeChild(selects[1].firstChild)
  }

  data.forEach((i) => {
    const leftSelectOption = document.createElement("option")
    leftSelectOption.value = JSON.stringify(i)
    leftSelectOption.text = i.unit
    selects[0].appendChild(leftSelectOption)

    const rightSelectOption = document.createElement("option")
    rightSelectOption.value = JSON.stringify(i)
    rightSelectOption.text = i.unit
    selects[1].appendChild(rightSelectOption)
  })
  converter(selects, input, converterTable)
  selects[0].onchange = () => converter(selects, input, converterTable)
  selects[1].onchange = () => converter(selects, input, converterTable)
  input.oninput = () => converter(selects, input, converterTable)
}

await setOptionsForSelects(selects, converterTable)

convertSelector.onchange = async (e) => {
  await setOptionsForSelects(selects, e.target.value)
}
