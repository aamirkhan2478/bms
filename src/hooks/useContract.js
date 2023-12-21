import axios from "@/utils/axiosInstance";
import { useMutation } from "react-query";

const addContract = (values) => {
  return axios.post("/contract/add", values);
};

export const useAddContract = (onSuccess, onError) => {
  return useMutation(addContract, {
    onSuccess,
    onError,
  });
};
