// Real-world Exchange Rate Conversion service
// Uses the free Frankfurter API

export async function convertCurrency(
  amount,
  from = 'EUR',
  to = 'INR'
) {
  const normalizedFrom = from.toUpperCase();
  const normalizedTo = to.toUpperCase();

  if (normalizedFrom === normalizedTo) {
    return Math.round(amount);
  }

  try {
    const response = await fetch(
      `https://api.frankfurter.dev/v2/rate/${normalizedFrom}/${normalizedTo}`
    );

    if (!response.ok) {
      throw new Error(
        `Currency API failed: ${response.status}`
      );
    }

    const data = await response.json();

    if (!data.rate) {
      throw new Error('Exchange rate not available');
    }

    const convertedAmount =
      Number(amount) * Number(data.rate);

    console.log(
      `Currency conversion: ${amount} ${normalizedFrom} → ${convertedAmount} ${normalizedTo}`
    );

    return Math.round(convertedAmount);

  } catch (error) {
    console.error(
      'Currency API error:',
      error
    );

    // Return original amount instead of fake exchange rate
    return Math.round(amount);
  }
}