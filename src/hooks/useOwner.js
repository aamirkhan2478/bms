import axios from "@/utils/axiosInstance";
import { useMutation, useQuery } from "react-query";

const owner = (values) => {
  return axios.post("/owner/add", values);
};

const showOwners = () => {
  return axios.get("/owner/all");
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
