import axios from "@/utils/axiosInstance";
import { useMutation, useQuery } from "react-query";

const addContract = (values) => {
  return axios.post("/contract/add", values);
};

const expireContracts = () => {
  return axios.get("/contract/expire-contract");
};

export const useAddContract = (onSuccess, onError) => {
  return useMutation(addContract, {
    onSuccess,
    onError,
  });
};

export const useExpireContracts = () => {
  return useQuery("expire-contracts", expireContracts);
};
