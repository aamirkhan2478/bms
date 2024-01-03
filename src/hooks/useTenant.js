import axios from "@/utils/axiosInstance";
import { useMutation, useQuery } from "react-query";

const tenant = (values) => {
  return axios.post("/tenant/add", values);
};

const showTenants = ({queryKey}) => {
  const search = queryKey[1];
  const limit = queryKey[2];
  const page = queryKey[3];
  return axios.get(`/tenant/all?search=${search}&limit=${limit}&page=${page}`);
};

const showTenant = ({ queryKey }) => {
  const id = queryKey[1];
  return axios.get(`/tenant/${id}`);
};

const updateTenant = (id) => (values) => {
  return axios.patch(`/tenant/${id}/update`, values);
};

const updateImage = (id) => (values) => {
  return axios.patch(`/tenant/${id}/update-images`, values);
};

export const useAddTenant = (onSuccess, onError) => {
  return useMutation(tenant, {
    onSuccess,
    onError,
  });
};

export const useShowTenants = (search="", limit=5, page=1) => {
  return useQuery(["show-tenants", search, limit, page], showTenants);
};

export const useShowTenant = (id) => {
  return useQuery(["show-tenant", id], showTenant);
};

export const useUpdateTenant = (onSuccess, onError, id) => {
  return useMutation(updateTenant(id), {
    onSuccess,
    onError,
  });
};

export const useUpdateImage = (onSuccess, onError, id) => {
  return useMutation(updateImage(id), {
    onSuccess,
    onError,
  });
};
