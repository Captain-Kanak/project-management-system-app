import useAxiosSecure from "../hooks/useAxiosSecure";

export const getProjects = async () => {
  const res = await useAxiosSecure().get(
    `${import.meta.env.VITE_API_URL}/projects`,
  );

  return res.data;
};

export const getUsers = async () => {
  const res = await useAxiosSecure().get(
    `${import.meta.env.VITE_API_URL}/users`,
  );

  return res.data;
};
