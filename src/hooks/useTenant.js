import axios from "@/utils/axiosInstance";
import { useMutation, useQuery } from "react-query";

const tenant = (values) => {
  return axios.post("/tenant/add", values);
};

const showTenants = () => {
  return axios.get("/tenant/all");
};

export const useAddTenant = (onSuccess, onError) => {
  return useMutation(tenant, {
    onSuccess,
    onError,
  });
};

export const useShowTenants = () => {
  return useQuery("show-tenants", showTenants);
};
