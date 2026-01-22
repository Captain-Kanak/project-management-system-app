import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="flex items-center justify-center h-16">
        <span className="text-xl font-bold text-blue-600 cursor-pointer">
          Project MS
        </span>
      </div>
    </Link>
  );
};

export default Logo;
