import axios from "axios";

const API_KEY = "dLcECTPy0QT8DHVeAEzVxKCU7xHJaHJdgbuk1XIHKPo";
axios.defaults.baseURL = "https://api.unsplash.com/";

export type ImageType = {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
    [key: string]: string;
  };
  [key: string]: any;
};

type ApiResponseType = {
  results: ImageType[];
  total_pages: number;
};

export const fetchImages = async (
  query: string,
  page: number
): Promise<{
  images: ImageType[];
  total_pages: number;
}> => {
  const { data } = await axios.get<ApiResponseType>("search/photos", {
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
