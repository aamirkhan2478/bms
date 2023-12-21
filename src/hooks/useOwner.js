import axios from "@/utils/axiosInstance";
import { useMutation, useQuery } from "react-query";

const owner = (values) => {
  return axios.post("/owner/add", values);
};

const showOwners = () => {
  return axios.get("/owner/all");
};

const showInventories = ({ queryKey }) => {
  const ownerIds = queryKey[1];
  return axios.get(`/owner/show-inventories/?ownerIds=${ownerIds}`);
};

export const useAddOwner = (onSuccess, onError) => {
  return useMutation(owner, {
    onSuccess,
    onError,
  });
};

export const useShowOwners = () => {
  return useQuery("show-owners", showOwners);
};

export const useShowOwnerInventories = (ownerIds) => {
  return useQuery(["show-owner-inventories", ownerIds], showInventories);
};
