import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import axios from "../helpers/axios";

const useApiRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const apiRequest = useCallback(async (options, successMessage) => {
    try {
      setIsError(null);
      setIsLoading(true);
      const res = await axios(options);
      if (res.status >= 200 && res.status < 300) {
        if (successMessage) {
          toast.success(successMessage);
        }
        return res.data;
      }
    } catch (error) {
      setIsError(error.response?.data || "An error occurred");
      toast.error(error.response?.data?.message || "An error occurred");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, isError, apiRequest };
};
export default useApiRequest;
