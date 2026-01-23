import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Spinner from "../components/Spinner";
import { HiOutlineDotsVertical, HiOutlinePlus } from "react-icons/hi";
import CreateProjectModal from "../components/CreateProjectModal";

const AllProjects: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/projects`,
      );
      return res.data.data;
    },
  });

  if (projectsLoading) return <Spinner size="lg" />;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Projects</h1>
          <p className="text-sm text-gray-500">
            Manage and monitor all organizational projects.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition shadow-sm cursor-pointer"
        >
          <HiOutlinePlus />
          <span>New Project</span>
        </button>

        <CreateProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs uppercase font-bold text-gray-600">
                  Project Info
                </th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-gray-600">
                  Created By
                </th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-gray-600">
                  Date
                </th>
                <th className="px-6 py-4 text-xs uppercase font-bold text-gray-600 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.length > 0 ? (
                projects.map((project: any) => (
                  <tr
                    key={project.id}
                    className="hover:bg-gray-50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        {project.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {project.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                          {project.user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {project.user.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {project.user.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 hover:bg-gray-200 rounded-full transition text-gray-400 hover:text-gray-600 cursor-pointer">
                        <HiOutlineDotsVertical />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No projects found. Create your first project to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* Helper Component for Status UI */
const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    ACTIVE: "bg-green-100 text-green-700 border-green-200",
    COMPLETED: "bg-blue-100 text-blue-700 border-blue-200",
    ON_HOLD: "bg-yellow-100 text-yellow-700 border-yellow-200",
    CANCELLED: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status] || styles.ACTIVE}`}
    >
      {status}
    </span>
  );
};

export default AllProjects;
