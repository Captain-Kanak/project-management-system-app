import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { HiX } from "react-icons/hi";

interface EditProjectModalProps {
  isOpen: boolean;
  project: {
    id: string;
    name: string;
    description: string;
  };
  onClose: () => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  project,
  onClose,
}) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    if (project) {
      setFormData({ name: project.name, description: project.description });
    }
  }, [project]);

  const { mutate: updateProject, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/projects/${project.id}`,
        payload,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Changes saved!");
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Edit Project</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <HiX size={24} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateProject(formData);
          }}
          className="p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:bg-blue-300 cursor-pointer"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;
