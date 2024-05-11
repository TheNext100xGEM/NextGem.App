import axios from "axios"

async function getGemaiPriceUsd() {
    const baseUrl: string = 'https://api.coingecko.com/api/v3/simple/price?ids=the-next-gem-ai&vs_currencies=usd';
    const url = baseUrl;
    try {
        const {data} = await axios.get(url);
        return data['the-next-gem-ai'].usd;
      } catch (error) {
        throw error; // Re-throw for proper error handling
      }
}

export default getGemaiPriceUsd;