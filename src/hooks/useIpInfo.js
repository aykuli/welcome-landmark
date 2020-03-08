import { useState, useEffect } from 'react';

const useDataApi = (initUrl, initData) => {
  const [data, setData] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await fetch(initUrl);
        const json = await response.json();
        setData(json);
      } catch (e) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [initUrl]);
  return { data, isLoading, isError };
};
export default useDataApi;
