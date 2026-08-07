// Real-world Exchange Rate Conversion service using the free Frankfurter API.

export async function convertCurrency(amount, from = 'INR', to = 'JPY') {
  const normalizedFrom = from.toUpperCase();
  const normalizedTo = to.toUpperCase();

  if (normalizedFrom === normalizedTo) return amount;

  const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${normalizedFrom}&to=${normalizedTo}`);
  if (!res.ok) throw new Error('Exchange rate service unavailable');
  
  const data = await res.json();
  return Math.round(data.rates[normalizedTo]);
}
