import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Spinner from "../components/Spinner";
import { GoProjectSymlink } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { IoIosCopy } from "react-icons/io";
import { MdCreateNewFolder } from "react-icons/md";
import CreateProjectModal from "../components/CreateProjectModal";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const isAdmin = user?.role === "ADMIN";
  const [copied, setCopied] = useState(false);
  const [inviteData, setInviteData] = useState({ email: "", role: "STAFF" });
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
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

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/users`,
      );
      return res.data.data;
    },
  });

  const inviteMutation = useMutation({
    mutationFn: async (payload: { email: string; role: string }) => {
      const res = await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/auth/invite`,
        payload,
      );
      return res.data.data.link;
    },
    onSuccess: (data) => {
      setGeneratedLink(data);
      setInviteData({ email: "", role: "STAFF" });
    },
    onError: (error) => {
      console.error("Invite generation failed:", error);
    },
  });

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    inviteMutation.mutate(inviteData);
  };

  const handleCopy = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (projectsLoading || usersLoading) return <Spinner />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, {user?.name}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={projects.length}
          icon={<GoProjectSymlink size={15} />}
          color="bg-blue-500"
        />
        {isAdmin && (
          <StatCard
            title="Total Users"
            value={users.length}
            icon={<FaUsers size={20} />}
            color="bg-purple-500"
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {isAdmin && (
          <div className="bg-purple-50 rounded-xl border border-purple-100 p-6">
            <h3 className="font-bold text-purple-900 mb-4 flex items-center">
              <span className="mr-2 text-lg">
                <FaLink />
              </span>{" "}
              Generate Invite Link
            </h3>

            <form onSubmit={handleInviteSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Collaborator Email"
                required
                value={inviteData.email}
                onChange={(e) =>
                  setInviteData({ ...inviteData, email: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <select
                value={inviteData.role}
                onChange={(e) =>
                  setInviteData({ ...inviteData, role: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-white"
              >
                <option value="STAFF">STAFF</option>
                <option value="MANAGER">MANAGER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              <button
                type="submit"
                disabled={inviteMutation.isPending}
                className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-purple-700 transition disabled:bg-purple-300 cursor-pointer"
              >
                {inviteMutation.isPending ? "Generating..." : "Get Link"}
              </button>
            </form>

            {generatedLink && (
              <div className="mt-4 p-3 bg-white border border-purple-200 rounded-lg">
                <p className="text-[10px] text-purple-400 font-bold uppercase mb-1">
                  Invite URL
                </p>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={generatedLink}
                    className="text-xs text-gray-600 truncate flex-1 bg-transparent"
                  />
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded transition-all duration-200 cursor-pointer ${
                      copied
                        ? "text-green-600 bg-green-50"
                        : "text-purple-600 hover:bg-purple-100"
                    }`}
                  >
                    {copied ? (
                      <>
                        <IoIosCopy />
                        Copied!
                      </>
                    ) : (
                      <>
                        <IoIosCopy />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full flex items-center p-3 rounded-lg font-medium text-sm transition hover:opacity-80 cursor-pointer bg-blue-50 text-blue-600"
            >
              <span className="mr-3">
                <MdCreateNewFolder size={25} />
              </span>
              Create New Project
            </button>

            <CreateProjectModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
    <div
      className={`h-12 w-12 rounded-lg ${color} text-white flex items-center justify-center text-xl`}
    >
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default Dashboard;
