import { fetcher, logger } from "netwrap";
import axios from "axios";

const createFetcher = ({
  method,
  url,
  params = {},
  data = {},
  query = {},
  headers = {},
  timeout = 60 * 9 * 1000,
  onError,
  onRetry,
  maxRetries = 3,
}) => {
  const serializeQueryParams = (params) => {
    return Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");
  };

  const fetchWithRetries = async (config, retries) => {
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      if (retries > 0 && onRetry) {
        console.warn("Retrying request...", { retriesLeft: retries });
        onRetry(error, retries);
        return fetchWithRetries(config, retries - 1);
      }
      throw error;
    }
  };

  return fetcher({
    queryFn: async () => {
      let fullUrl = url;

      // Replace params in the URL
      Object.keys(params).forEach((key) => {
        fullUrl = fullUrl.replace(`:${key}`, encodeURIComponent(params[key]));
      });

      // Append query parameters to the URL
      if (Object.keys(query).length > 0) {
        const queryString = serializeQueryParams(query);
        fullUrl = `${fullUrl}?${queryString}`;
      }

      const config = {
        method,
        url: fullUrl,
        headers,
        timeout,
      };

      if (!["get", "delete"].includes(method.toLowerCase())) {
        config.data = data;
      }

      try {
        logger(config);
        return await fetchWithRetries(config, maxRetries);
      } catch (error) {
        if (onError) {
          onError(error);
        }
        throw error;
      }
    },
    onStartQuery: () => console.log(`${method.toUpperCase()} query started`),
    onSuccess: (data) =>
      console.log(`${method.toUpperCase()} query successful`, data),
    onError: (error) =>
      console.error(`${method.toUpperCase()} query failed`, error),
    onFinal: () => console.log(`${method.toUpperCase()} query completed`),
  });
};

export { createFetcher };

// const {
//   trigger: handleSignup,
//   isLoading,
//   data,
//   error,
// } = createFetcher({
//   method: "POST",
//   url: "http://localhost:5000/api/users/add",
//   data: {
//     email,
//     fullName,
//     password,
//     password2,
//     roomNumber,
//     phoneNumber,
//     deviceId,
//   },
//   headers: { "Content-Type": "application/json" },
//   onSuccess: () => {
//     console.log("Signup successful");
//     navigate("/login");
//   },
//   onError: (err) => {
//     console.error("Error during signup:", err.message);
//     throw err;
//   },
// });
