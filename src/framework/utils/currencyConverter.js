import { currencies } from '../constants/currencies'
export const getCurrencyLabel = (value) => {
  const currency = currencies.find((currency) => currency.value === value)
  return currency ? currency.label : ''
}
