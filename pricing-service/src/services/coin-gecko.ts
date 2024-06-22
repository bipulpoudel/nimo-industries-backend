import axios from "axios";

axios.defaults.baseURL = "https://api.coingecko.com/api/v3";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["x-cg-pro-api-key"] =
  process.env.COIN_GECKO_API_KEY;

const getCoinPrice = async (id: string) => {
  try {
    const response = await axios.get(
      `/simple/price?ids=${id}&vs_currencies=aud`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getCoinData = async (coinId: string) => {
  try {
    const response = await axios.get(`/coins/${coinId}`);
    return response.data;
  } catch (error) {
    console.error(error.response);
    return null;
  }
};

const getCoinMarketData = async (coinId: string) => {
  try {
    const { data } = await axios.get(
      `/coins/markets?ids=${coinId}&vs_currency=aud`
    );
    return data[0] || null;
  } catch (error) {
    console.error(error.response);
    return null;
  }
};

export default { getCoinPrice, getCoinData, getCoinMarketData };
