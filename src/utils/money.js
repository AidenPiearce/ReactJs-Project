export function formatMoney(amountCents) {
 return  `$${(amountCents / 100).toFixed(2)}`
}

export function FormatDeliveryMoney(amountCents) {
  return amountCents === 0 
    ? ('Free')
    :  `$${(amountCents / 100).toFixed(2)}`
}