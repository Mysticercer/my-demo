export const filters = {
  unitConversion: (val: any, divisor = 0.0001) => {
    if (val === undefined) return ''
    if (typeof val === 'string') return val
    // if (!val) return 0
    return val * divisor
  },
  toFixed: (val: any, number = 2, fix = false) => {
    if (val === undefined) return ''
    if (typeof val === 'string') return val
    // if (!val) return 0

    const data: any = parseFloat(val).toFixed(number)
    return fix ? data : data - 0
  },
  toFloat: (val: any, number = 2) => {
    const payload = parseFloat(val)
    if (isNaN(payload)) {
      return 0
    }
    return +val.toFixed(number)
  }
}
