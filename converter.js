const converter = (selects, input, type) => {
  const leftSelect = JSON.parse(selects[0].value).value
  const rightSelect = JSON.parse(selects[1].value).value
  const inputted = input.valueAsNumber
  const result = document.getElementById("output")

  result.value = ((inputted * leftSelect) / rightSelect).toFixed(
    type === "currency" ? 2 : 4
  )
}

export default converter
