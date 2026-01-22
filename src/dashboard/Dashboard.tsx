import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Spinner from "../components/Spinner";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const isAdmin = user?.role === "ADMIN";
  const [copied, setCopied] = useState(false);

  const [inviteData, setInviteData] = useState({ email: "", role: "STAFF" });
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

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

      // Reset the "Copied" state after 2 seconds
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
          icon="📁"
          color="bg-blue-500"
        />
        {isAdmin && (
          <StatCard
            title="Total Users"
            value={users.length}
            icon="👤"
            color="bg-purple-500"
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {isAdmin && (
          <div className="bg-purple-50 rounded-xl border border-purple-100 p-6">
            <h3 className="font-bold text-purple-900 mb-4 flex items-center">
              <span className="mr-2 text-lg">🔗</span> Generate Invite Link
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
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3"
                          />
                        </svg>
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
            <ActionButton label="Create New Project" icon="➕" />
            <ActionButton
              label="Account Settings"
              icon="⚙️"
              color="bg-gray-50 text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* Helper Components remained mostly the same but ensure props are clean */
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

const ActionButton = ({
  label,
  icon,
  color = "bg-blue-50 text-blue-600",
}: any) => (
  <button
    className={`w-full flex items-center p-3 rounded-lg font-medium text-sm transition hover:opacity-80 ${color}`}
  >
    <span className="mr-3">{icon}</span> {label}
  </button>
);

export default Dashboard;
