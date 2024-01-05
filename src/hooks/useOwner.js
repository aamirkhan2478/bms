import axios from "@/utils/axiosInstance";
import { useMutation, useQuery } from "react-query";

const owner = (values) => {
  return axios.post("/owner/add", values);
};

const showOwners = ({ queryKey }) => {
  const search = queryKey[1];
  const limit = queryKey[2];
  const page = queryKey[3];
  return axios.get(`/owner/all?search=${search}&limit=${limit}&page=${page}`);
};

const showOwner = ({ queryKey }) => {
  const id = queryKey[1];
  return axios.get(`/owner/${id}/show`);
};

const updateOwner = (id) => (values) => {
  return axios.patch(`/owner/${id}/update`, values);
};

const updateImage = (id) => (values) => {
  return axios.patch(`/owner/${id}/update-images`, values);
};

const expiredCnic = () => {
  return axios.get("/owner/expired-cnic");
};

export const useAddOwner = (onSuccess, onError) => {
  return useMutation(owner, {
    onSuccess,
    onError,
  });
};

export const useShowOwners = (search = "", limit = 5, page = 1) => {
  return useQuery(["show-owners", search, limit, page], showOwners);
};

export const useShowOwner = (id) => {
  return useQuery(["show-owner", id], showOwner);
};

export const useUpdateOwner = (onSuccess, onError, id) => {
  return useMutation(updateOwner(id), {
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

export const useOwnerExpiredCnic = () => {
  return useQuery("expired-cnic", expiredCnic);
};
