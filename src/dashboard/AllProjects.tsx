import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Spinner from "../components/Spinner";
import {
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlinePencilAlt,
} from "react-icons/hi";
import CreateProjectModal from "../components/CreateProjectModal";
import EditProjectModal from "../components/EditProjectModal";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useAuth } from "../auth/AuthContext";

const AllProjects: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/projects`,
      );
      return res.data.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (projectId: string) => {
      return await axiosSecure.delete(
        `${import.meta.env.VITE_API_URL}/projects/${projectId}`,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully");
    },
    onError: () => toast.error("Failed to delete project"),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      return await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/projects/${id}`,
        payload,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated");
    },
  });

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This project will be moved to the trash!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleEditClick = (project: any) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  if (projectsLoading) return <Spinner size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Projects</h1>
          <p className="text-sm text-gray-500">
            Manage and monitor organizational projects.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition cursor-pointer"
        >
          <HiOutlinePlus />
          <span>New Project</span>
        </button>
      </div>

      {/* Modals */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {selectedProject && (
        <EditProjectModal
          isOpen={isEditModalOpen}
          project={selectedProject}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedProject(null);
          }}
        />
      )}

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
                <th className="px-6 py-4 text-xs uppercase font-bold text-gray-600 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((project: any) => (
                <tr
                  key={project.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">
                      {project.name}
                    </div>
                    <div className="text-xs text-gray-500 line-clamp-1">
                      {project.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {isAdmin ? (
                      <select
                        value={project.status}
                        onChange={(e) =>
                          updateMutation.mutate({
                            id: project.id,
                            payload: { status: e.target.value },
                          })
                        }
                        className="text-xs font-bold bg-white border border-gray-200 rounded-lg p-1 outline-none cursor-pointer"
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                        <option value="DELETED">DELETED</option>
                      </select>
                    ) : (
                      <StatusBadge status={project.status} />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {project.user.name}
                    </div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                      {project.user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => handleEditClick(project)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                            title="Edit Project"
                          >
                            <HiOutlinePencilAlt size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            disabled={deleteMutation.isPending}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                            title="Delete Project"
                          >
                            <HiOutlineTrash size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    ACTIVE: "bg-green-100 text-green-700 border-green-200",
    ARCHIVED: "bg-gray-100 text-gray-700 border-gray-200",
    DELETED: "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default AllProjects;
