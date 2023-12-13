import axios from "@/utils";
import { useMutation } from "react-query";

const inventory = (values) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return axios.post("/inventory/add", values, config);
};

export const useAddInventory = (onSuccess, onError) => {
  return useMutation(inventory, {
    onSuccess,
    onError,
  });
};
