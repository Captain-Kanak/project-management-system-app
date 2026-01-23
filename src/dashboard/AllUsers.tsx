import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";

const AllUsers: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/users`,
      );
      return res.data.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      userId,
      field,
      value,
    }: {
      userId: string;
      field: "role" | "status";
      value: string;
    }) => {
      setUpdatingId(userId);
      const res = await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/${field}`,
        { [field]: value },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Update successful");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Update failed");
    },
    onSettled: () => {
      setUpdatingId(null);
    },
  });

  const handleUpdate = (
    userId: string,
    field: "role" | "status",
    value: string,
  ) => {
    updateMutation.mutate({ userId, field, value });
  };

  if (usersLoading) return <Spinner size="lg" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
        <p className="text-slate-500">
          Update user roles and account statuses.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-600">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Current Role</th>
                <th className="px-6 py-4">Account Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user: any) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold border border-slate-200 uppercase">
                        {user.name ? user.name.substring(0, 2) : "P"}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {user.name || "Pending Name"}
                        </p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      disabled={updateMutation.isPending}
                      onChange={(e) =>
                        handleUpdate(user.id, "role", e.target.value)
                      }
                      className="text-sm bg-white border border-slate-300 rounded-md px-2 py-1.5 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="MANAGER">MANAGER</option>
                      <option value="STAFF">STAFF</option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={user.status}
                      disabled={updateMutation.isPending}
                      onChange={(e) =>
                        handleUpdate(user.id, "status", e.target.value)
                      }
                      className={`text-xs font-bold border rounded-full px-3 py-1 outline-none cursor-pointer transition-colors ${
                        user.status === "ACTIVE"
                          ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                          : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                      }`}
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-center">
                    {updatingId === user.id ? (
                      <BiLoaderAlt
                        className="animate-spin text-blue-600 mx-auto"
                        size={20}
                      />
                    ) : (
                      <span className="text-xs text-slate-400">Synced</span>
                    )}
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

export default AllUsers;
