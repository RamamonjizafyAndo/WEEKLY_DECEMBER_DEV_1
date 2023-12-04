import axios, { AxiosInstance } from "axios";

export const apiUrl = "https://localhost:4200/api";

const useHttps = (): {
  url: string;
  httpsMultipart: AxiosInstance;
  https: AxiosInstance;
  imgSrc: (src: string) => string;
} => {

  const https = axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: "test",
    },
  });

  const httpsMultipart = axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "test",
    },
  });

  const imgSrc = (src: string): string => {
    if (src) {
      if (src.indexOf("https") > -1) {
        return src[0] === "/" ? src.substring(1) : src;
      } else {
        return `${apiUrl}${src}`;
      }
    }
    return "";
  };

  return {
    url: apiUrl,
    httpsMultipart,
    https,
    imgSrc,
  };
};

export default useHttps;
