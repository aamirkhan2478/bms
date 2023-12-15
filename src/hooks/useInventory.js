import axios from "@/utils/axiosInstance";
import { useMutation } from "react-query";

const inventory = (values) => {
  return axios.post("/inventory/add", values);
};

export const useAddInventory = (onSuccess, onError) => {
  return useMutation(inventory, {
    onSuccess,
    onError,
  });
};
