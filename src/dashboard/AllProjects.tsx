import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Spinner from "../components/Spinner";

const AllProjects = () => {
  const axiosSecure = useAxiosSecure();

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/projects`,
      );
      return res.data.data;
    },
  });

  console.log(projects);

  if (projectsLoading) return <Spinner />;

  return (
    <>
      <div>
        <h1>All Projects</h1>
      </div>
    </>
  );
};

export default AllProjects;
