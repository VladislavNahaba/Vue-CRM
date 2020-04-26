export default function currencyFilter(value, currency = 'MDL') {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency
  }).format(value);
}
