export const useApi = () => {
  const baseURL = "http://localhost:8080";

  const request = (url, options = {}) => {
    return $fetch(baseURL + url, options);
  };

  return { request };
};
