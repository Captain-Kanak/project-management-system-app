import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  fullScreen?: boolean; // Added this prop
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "text-blue-600",
  fullScreen = true,
}) => {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-10 w-10 border-[3px]",
    lg: "h-16 w-16 border-4",
  };

  return (
    <div
      className={`flex flex-col justify-center items-center gap-4 ${
        fullScreen
          ? "fixed inset-0 z-9999 bg-white/80 backdrop-blur-sm"
          : "w-full py-20"
      }`}
    >
      <div
        className={`${sizeClasses[size]} ${color} animate-spin rounded-full border-t-transparent border-current shadow-sm`}
        role="status"
        aria-label="loading"
      />
      {fullScreen && (
        <p className="text-sm font-medium text-gray-500 animate-pulse">
          Loading...
        </p>
      )}
    </div>
  );
};

export default Spinner;
