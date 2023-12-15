import axios from "@/utils/axiosInstance";
import { useMutation } from "react-query";

const tenant = (values) => {
  return axios.post("/tenant/add", values);
};

export const useAddTenant = (onSuccess, onError) => {
  return useMutation(tenant, {
    onSuccess,
    onError,
  });
};
