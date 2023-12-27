import axios from "@/utils/axiosInstance";
import { useMutation, useQuery } from "react-query";

const inventory = (values) => {
  return axios.post("/inventory/add", values);
};

const showInventories = ({ queryKey }) => {
  const search = queryKey[1];
  const limit = queryKey[2];
  const page = queryKey[3];
  return axios.get(
    `/inventory/all?search=${search}&limit=${limit}&page=${page}`
  );
};

const showInventory = ({ queryKey }) => {
  const id = queryKey[1];
  return axios.get(`/inventory/${id}`);
};

const sellInventory = (values) => {
  return axios.post("/inventory/sell", values);
};

const shownInventoriesWithOwners = () => {
  return axios.get("/inventory/show-inventories-with-owners");
};

export const useAddInventory = (onSuccess, onError) => {
  return useMutation(inventory, {
    onSuccess,
    onError,
  });
};

export const useShowInventories = (search = "", limit = 5, page = 1) => {
  return useQuery(["show-inventories", search, limit, page], showInventories);
};

export const useShowInventory = (id) => {
  return useQuery(["show-inventory", id], showInventory);
};

export const useSellInventory = (onSuccess, onError) => {
  return useMutation(sellInventory, {
    onSuccess,
    onError,
  });
};

export const useShowInventoryOwners = () => {
  return useQuery("show-inventories-with-owners", shownInventoriesWithOwners);
};
