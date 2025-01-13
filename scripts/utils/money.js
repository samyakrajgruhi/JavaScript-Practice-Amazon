export function formatCurrency(priceCents){
    let priceDollar = (priceCents/100).toFixed(2);
    Number(priceDollar);
    return priceDollar;
}