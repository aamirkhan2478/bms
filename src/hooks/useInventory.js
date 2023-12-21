import axios from "@/utils/axiosInstance";
import { useMutation, useQuery } from "react-query";

const inventory = (values) => {
  return axios.post("/inventory/add", values);
};

const showInventories = () => {
  return axios.get("/inventory/all");
};

const sellInventory = (values) => {
  return axios.put("/inventory/sell", values);
};

const showOwners = () => {
  return axios.get("/inventory/show-owners");
};

export const useAddInventory = (onSuccess, onError) => {
  return useMutation(inventory, {
    onSuccess,
    onError,
  });
};

export const useShowInventories = () => {
  return useQuery("show-inventories", showInventories);
};

export const useSellInventory = (onSuccess, onError) => {
  return useMutation(sellInventory, {
    onSuccess,
    onError,
  });
};

export const useShowInventoryOwners = () => {
  return useQuery("show-owners", showOwners);
};