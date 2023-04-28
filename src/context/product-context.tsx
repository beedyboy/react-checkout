import { createContext, ReactNode, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

const api_base_url = "https://jtechmw.onrender.com/v3/";

interface ApiContextType {
  data: any;
  isLoaded: boolean;
  error: Error | null;
}

const initialApiContext: ApiContextType = {
  data: [],
  isLoaded: false,
  error: null,
};

interface Props {
  children: ReactNode;
}

export const ApiContext = createContext<ApiContextType>(initialApiContext);

export const ApiProvider = ({ children }: Props) => {
  const [apiData, setApiData] = useState(initialApiContext);

  useEffect(() => {
    const fetchData = async () => {
      setApiData((prevState) => ({ ...prevState, isLoaded: true }));
      try {
        const response: AxiosResponse = await axios.get(
          `${api_base_url}product/test`
        );
        localStorage.setItem("products", JSON.stringify(response.data.data))
        setApiData({
          data: response.data.data,
          isLoaded: true,
          error: null,
        });
      } catch (error) {
        setApiData({
          data: [],
          isLoaded: false,
          error: null,
        });
      }
    };
    fetchData();
  }, []);

  return <ApiContext.Provider value={apiData}>{children}</ApiContext.Provider>;
};
