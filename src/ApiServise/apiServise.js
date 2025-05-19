import axios from "axios";

const API_KEY = "dLcECTPy0QT8DHVeAEzVxKCU7xHJaHJdgbuk1XIHKPo";
axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImages = async (query, page) => {
  const { data } = await axios.get("search/photos", {
    params: {
      client_id: API_KEY,
      query,
      page,
      per_page: 12,
    },
  });

  return {
    images: data.results,
    total_pages: data.total_pages,
  };
};
