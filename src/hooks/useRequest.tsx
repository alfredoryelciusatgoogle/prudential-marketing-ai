import { useState } from "react";

const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);

  const runRequest = async (func: () => Promise<any>) => {
    setIsLoading(true);
    const response = await func();
    setIsLoading(false);
    return response;
  };

  return {
    isLoading,
    runRequest,
  };
};

export default useRequest;
